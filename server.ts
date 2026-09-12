import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Lazy GoogleGenAI initialization
let genAiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in AI Studio settings.");
    }
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAiClient;
}

function parseJsonSafely(rawText: string): any {
  let cleaned = (rawText || "").trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  }
  return JSON.parse(cleaned);
}

function isTransientError(err: any): boolean {
  const status = err?.status || err?.code || "";
  const message = (err?.message || "").toLowerCase();
  return (
    status === 503 ||
    status === "UNAVAILABLE" ||
    status === 429 ||
    status === "RESOURCE_EXHAUSTED" ||
    message.includes("high demand") ||
    message.includes("unavailable") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("temporarily overloaded") ||
    message.includes("econnreset") ||
    message.includes("etimedout")
  );
}

function formatErrorMessage(error: any): string {
  if (!error) return "An unexpected error occurred.";
  const msg = error?.message || String(error);
  if (msg.includes("503") || msg.includes("high demand") || msg.includes("UNAVAILABLE")) {
    return "The AI engine is currently experiencing high demand. Automatic retries were attempted. Please click 'Retry' in a few moments.";
  }
  if (msg.includes("GEMINI_API_KEY")) {
    return "GEMINI_API_KEY is not configured or invalid. Please check your project settings.";
  }
  if (typeof msg === "string" && msg.startsWith("{") && msg.includes('"message"')) {
    try {
      const parsed = JSON.parse(msg);
      if (parsed?.error?.message) {
        return parsed.error.message;
      }
    } catch {
      // ignore
    }
  }
  return msg;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithResilience(
  ai: GoogleGenAI,
  options: {
    contents: any;
    config?: any;
    primaryModel?: string;
    fallbackModels?: string[];
  }
) {
  const primaryModel = options.primaryModel || "gemini-3.1-flash-lite";
  const fallbackModels = options.fallbackModels || ["gemini-flash-latest", "gemini-3.8-flash"];
  const candidateModels = [primaryModel, ...fallbackModels];

  let lastError: any = null;

  for (let mIndex = 0; mIndex < candidateModels.length; mIndex++) {
    const currentModel = candidateModels[mIndex];
    const maxRetries = 1;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const delay = attempt * 1000 + Math.floor(Math.random() * 300);
          console.log(`[AI] Retrying with model ${currentModel} (attempt ${attempt + 1}) after ${delay}ms...`);
          await sleep(delay);
        }

        const response = await ai.models.generateContent({
          model: currentModel,
          contents: options.contents,
          config: options.config,
        });

        return response;
      } catch (err: any) {
        lastError = err;
        console.log(`[AI] Transient demand note for model ${currentModel} (attempt ${attempt + 1}), proceeding with retry/fallback.`);

        if (!isTransientError(err)) {
          throw err;
        }
      }
    }
  }

  throw lastError;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Endpoint 1: Scan Question from Image (Camera photo, Screenshot, Gallery)
app.post("/api/scan-question", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const ai = getGenAI();
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");

    const prompt = `You are an expert engineering examination assistant specialized in the JNTUH R22 curriculum.
Examine this image containing one or more engineering exam questions, textbook problems, assignment sheets, or notes.

Perform OCR and question extraction with high technical precision:
1. Detect all text in the image.
2. Correct obvious OCR mistakes using technical context (e.g. "Townsend break down" -> "Townsend breakdown", "elec trons" -> "electrons", "die-lectric" -> "dielectric").
3. Determine if the image is too blurry, cropped, or unreadable to identify any question with confidence. If so, return { "unreadable": true, "message": "The uploaded photo is too blurry or unclear. Please retake or upload a sharper image." }.
4. Identify if there are multiple questions. If so, extract each question separately as Question 1, Question 2, etc.
5. For each question, identify the likely subject, branch (EEE, ECE, CSE, IT, Mechanical, Civil), unit, and question type (Theoretical, Derivation, Numerical, Definition).

Output STRICT JSON matching this schema:
{
  "unreadable": false,
  "detectedText": "raw OCR summary",
  "questions": [
    {
      "id": "q1",
      "number": 1,
      "text": "Full cleanly corrected question text",
      "marksSuggestion": "5 Marks",
      "suggestedSubject": "Subject name if identifiable or best match",
      "suggestedBranch": "EEE / ECE / CSE / IT / Mechanical / Civil",
      "topic": "Key topic name",
      "isNumerical": false
    }
  ],
  "notes": "Any observation regarding diagram requirement or question paper section"
}`;

    const response = await generateWithResilience(ai, {
      primaryModel: "gemini-3.1-flash-lite",
      fallbackModels: ["gemini-flash-latest", "gemini-3.8-flash"],
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const text = response.text || "{}";
    const data = parseJsonSafely(text);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in /api/scan-question:", error);
    const friendly = formatErrorMessage(error);
    return res.status(503).json({
      error: friendly,
    });
  }
});

// Endpoint 2: Generate Exam-Ready Answer
app.post("/api/generate-answer", async (req, res) => {
  try {
    const {
      question,
      subject = "",
      branch = "",
      year = "",
      semester = "",
      unit = "",
      topic = "",
      answerLength = "5_marks", // 'very_short' (1-2 marks), 'short' (3-5 marks), '5_marks', '10_marks', 'revision'
      easyMode = false,
    } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question text is required" });
    }

    const ai = getGenAI();

    const systemPrompt = `You are a distinguished university engineering professor and examiner for Jawaharlal Nehru Technological University Hyderabad (JNTUH) R22 Regulation.
Your objective: "Turn engineering questions into simple, technically correct, exam-ready notes."

CRITICAL QUALITY & LANGUAGE RULES:
1. SIMPLE ENGLISH WITH UNCOMPROMISING TECHNICAL ACCURACY:
   - Use clear, straightforward English that an engineering student can immediately understand and recall in the exam hall.
   - NEVER dilute, replace, or drop vital technical terminology. Keep critical terms intact (e.g., "Insulating property", "Dielectric strength", "Ionization", "Electron avalanche", "Thermal breakdown", "Electric field", "Critical voltage", "Breakdown voltage", "Heat generation", "Heat dissipation", "Transfer function", "Bode plot", "State variable", "Paging", "Deadlock", "Rankine cycle").
   - When a technical term is introduced or difficult, provide a simple in-line explanation. Example: "Ionization is the process in which a neutral atom or molecule gains enough energy to produce charged particles."

2. JNTUH R22 ANSWER LENGTH & MARKS WEIGHTAGE:
   - "very_short" (1-2 marks): Crisp 2-4 lines containing exact formal definition or core equation and 1 key point.
   - "short" (3-5 marks): Definition, core principle, 3-5 concise bullet points, and formula/diagram if applicable.
   - "5_marks": Properly structured university answer: Definition, basic principle, step-by-step explanation, key formula/diagram guide, advantages/applications where relevant, and critical keywords.
   - "10_marks": Detailed university exam answer with comprehensive breakdown, full derivation/working process, labelled exam diagram description & how to draw, numerical substitutions if applicable, applications, critical keywords, and conclusion.
   - "revision": Ultra-condensed high-yield points for last-minute reading before entering the exam hall.
   Do not unnecessarily pad or inflate the answer beyond the target mark weightage.

3. ANSWER SECTIONS (Use only what is relevant to the question):
   - Definition: Precise, technically sound.
   - Principle: Fundamental physics or engineering rule.
   - Explanation: Step-by-step concept in simple English.
   - Working / Process: Clear chronological steps or mechanism.
   - Formula: Explicit equations with standard symbols and SI units.
   - Numerical steps: If question is numerical, provide:
     a. Given data
     b. Required quantity
     c. Relevant formula
     d. Step-by-step substitution
     e. Final answer with explicit units
     f. Brief physical interpretation
   - Diagram: If question warrants a diagram, provide:
     a. "needed": true/false
     b. "title": Diagram title
     c. "howToDrawInExam": Step-by-step instructions on how a student should sketch it on an answer booklet in 2 minutes (shapes, labels, arrows).
     d. "svgCode": A clean, valid SVG string (viewBox="0 0 500 300", white/dark-mode compatible, labeled elements, no artistic fluff, just clear educational schematic).
   - Advantages / Disadvantages / Applications: Include only when domain-relevant.
   - Critical Keywords: List 5 to 10 crucial technical keywords that university evaluators look for when awarding marks.
    - Technical Section: Explicit engineering technical parameters, operating specifications, governing laws/theorems, and engineering significance (DO NOT include generic conclusions).
   - Easy To Remember Mode: A simplified bulleted memory version preserving all technical keywords.
   - Viva Questions: 3 to 5 common viva/lab questions with crisp answers.
   - Practice MCQs: 3 to 5 high-yield multiple choice questions with 4 options, correct answer index, and explanations.

${easyMode ? "NOTE: User requested 'Easy to Remember' focus: Format explanation into short, sequential, memory-friendly bullet points while strictly retaining all technical terms." : ""}`;

    const userPrompt = `Generate a complete JNTUH R22 exam-ready answer for:
Question: "${question}"
Subject Context: "${subject || "Engineering Subject"}"
Branch: "${branch || "Engineering"}"
Year/Semester: "${year} ${semester}"
Unit: "${unit}"
Topic: "${topic}"
Target Answer Length: "${answerLength}"

Respond with ONLY valid JSON adhering to this structure:
{
  "question": "Verified question statement",
  "subject": "Subject name",
  "unit": "Unit number/name",
  "topic": "Identified core topic",
  "answerLength": "${answerLength}",
  "marksTarget": "2 Marks / 5 Marks / 10 Marks",
  "definition": "Precise technical definition with simple English explanation of tough terms",
  "principle": "Fundamental principle behind the concept (if applicable, else empty string)",
  "explanation": "Markdown formatted step-by-step explanation using simple English and preserved technical vocabulary",
  "workingProcess": "Step-by-step working/mechanism (if applicable, else empty string)",
  "formula": {
    "hasFormula": true,
    "equations": ["E = V / d", "α = A * P * e^(-B*P/E)"],
    "symbolMeanings": [
      { "symbol": "E", "meaning": "Electric field intensity (V/m)" }
    ]
  },
  "numerical": {
    "isNumerical": false,
    "givenData": [],
    "toFind": "",
    "formulaUsed": "",
    "calculationSteps": [],
    "finalAnswer": "",
    "resultInterpretation": ""
  },
  "diagram": {
    "needed": true,
    "title": "Diagram Title",
    "howToDrawInExam": "1. Draw two parallel plates representing anode and cathode. 2. Draw electrons originating from cathode...",
    "svgCode": "<svg viewBox='0 0 500 240' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>...</svg>"
  },
  "advantages": ["Advantage 1", "Advantage 2"],
  "disadvantages": ["Disadvantage 1"],
  "applications": ["Application 1", "Application 2"],
  "criticalKeywords": ["Term 1", "Term 2", "Term 3", "Term 4", "Term 5"],
  "technicalSection": {
    "specifications": [
      { "parameter": "Operating Voltage / Range", "value": "e.g. 230V / 50Hz or Nominal Limit", "significance": "Operating boundary" }
    ],
    "governingLaws": ["Faraday's Law of Electromagnetic Induction", "Lenz's Law"],
    "standardDerivationSteps": ["Step 1: Apply KVL to loop", "Step 2: Relate flux to current"],
    "engineeringSignificance": "Detailed technical and practical engineering implications in power systems and industrial machinery."
  },
  "easyToRemember": [
    "Point 1 with technical keywords bolded",
    "Point 2 with step-by-step logic",
    "Point 3 with final takeaway"
  ],
  "quickRevisionSummary": {
    "oneLineDefinition": "...",
    "keyFormula": "...",
    "highYieldPoints": ["Point 1", "Point 2", "Point 3", "Point 4"],
    "criticalKeywords": ["..."]
  },
  "vivaQuestions": [
    {
      "q": "Viva question?",
      "a": "Direct, 1-2 sentence technically exact answer."
    }
  ],
  "practiceMcqs": [
    {
      "question": "MCQ Question statement",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why Option A is correct in technical terms"
    }
  ]
}`;

    const response = await generateWithResilience(ai, {
      primaryModel: "gemini-3.1-flash-lite",
      fallbackModels: ["gemini-flash-latest", "gemini-3.8-flash"],
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text || "{}";
    const data = parseJsonSafely(text);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in /api/generate-answer:", error);
    const friendly = formatErrorMessage(error);
    return res.status(503).json({
      error: friendly,
    });
  }
});

// Endpoint 3: Quick Action (Viva, MCQs, Easy to remember rewrite, or Important Questions)
app.post("/api/quick-action", async (req, res) => {
  try {
    const { action, topic, subject, branch, currentContent } = req.body;
    if (!action || !topic) {
      return res.status(400).json({ error: "Action and topic are required" });
    }

    const ai = getGenAI();
    let prompt = "";

    if (action === "viva") {
      prompt = `For JNTUH R22 engineering curriculum on "${topic}" in subject "${subject || "Engineering"}" (${branch || ""}):
Generate 6-8 rapid viva/lab oral questions with punchy, technically exact, 1-to-2 sentence answers that an external examiner would appreciate.
Output JSON:
{
  "topic": "${topic}",
  "vivaQuestions": [
    { "q": "Question?", "a": "Concise answer with technical terms explained." }
  ]
}`;
    } else if (action === "mcqs") {
      prompt = `For JNTUH R22 engineering on topic "${topic}" in subject "${subject || "Engineering"}":
Generate 6 university exam-standard multiple choice questions. No ambiguous questions.
Output JSON:
{
  "topic": "${topic}",
  "mcqs": [
    {
      "question": "Clear question stem?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Clear reason why this is correct."
    }
  ]
}`;
    } else if (action === "important_questions") {
      prompt = `For JNTUH R22 engineering curriculum subject "${subject}" (Branch: ${branch}), specifically Unit/Topic "${topic}":
Categorize important, frequently tested university exam questions.
Output JSON:
{
  "subject": "${subject}",
  "topic": "${topic}",
  "categories": {
    "twoMarks": ["Define ...", "State ...", "List two ..."],
    "fiveMarks": ["Explain with diagram ...", "Differentiate between ... and ..."],
    "tenMarks": ["Derive the expression for ... and explain its working", "Describe the complete process of ... with neat circuit/block diagram"],
    "numerical": ["A dielectric has ... calculate the breakdown voltage ..."],
    "viva": ["What is ...?", "Why is ... used?"]
  }
}`;
    } else {
      prompt = `Rewrite this engineering note into an "Easy to Remember" format. Use short, simple sentences, logical sequential bullet points, but retain all critical technical terms:
Topic: "${topic}"
Subject: "${subject}"
Content: "${typeof currentContent === "string" ? currentContent.slice(0, 1000) : topic}"
Output JSON:
{
  "topic": "${topic}",
  "easyPoints": ["Point 1...", "Point 2..."],
  "memoryAids": ["Memory tip/acronym or analogy"],
  "criticalTermsPreserved": ["Term 1", "Term 2"]
}`;
    }

    const response = await generateWithResilience(ai, {
      primaryModel: "gemini-3.1-flash-lite",
      fallbackModels: ["gemini-flash-latest", "gemini-3.8-flash"],
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text || "{}";
    const data = parseJsonSafely(text);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in /api/quick-action:", error);
    const friendly = formatErrorMessage(error);
    return res.status(503).json({
      error: friendly,
    });
  }
});

// Vite middleware / static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JNTUH R22 Study AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
