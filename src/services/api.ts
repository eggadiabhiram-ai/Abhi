import { AnswerLength, ExamAnswerData, ScanResult } from "../types";

export interface GenerateAnswerParams {
  question: string;
  subject?: string;
  branch?: string;
  year?: string;
  semester?: string;
  unit?: string;
  topic?: string;
  answerLength: AnswerLength;
  easyMode?: boolean;
}

function extractErrorMessage(errorData: any, fallback: string): string {
  if (!errorData) return fallback;
  const raw = errorData.error || errorData.message || fallback;
  if (typeof raw === "string" && raw.trim().startsWith("{") && raw.includes('"message"')) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.error?.message) {
        return parsed.error.message;
      }
    } catch {
      // ignore
    }
  }
  return typeof raw === "string" ? raw : fallback;
}

async function safeFetch(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (err: any) {
    if (!navigator.onLine) {
      throw new Error("Network connection lost. Please check your internet connection.");
    }
    throw new Error("Could not reach the server. The server may be restarting or momentarily busy. Please try again in a few seconds.");
  }
}

export async function checkServerHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  try {
    const res = await safeFetch("/api/health", { method: "GET" });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    return { status: "offline", hasApiKey: false };
  }
}

export async function scanQuestionImage(imageBase64: string, mimeType: string = "image/jpeg"): Promise<ScanResult> {
  if (!navigator.onLine) {
    throw new Error("You appear to be offline. Please connect to the internet to scan images with AI Vision.");
  }

  const res = await safeFetch("/api/scan-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64, mimeType }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, "Failed to analyze question photo."));
  }

  const json = await res.json();
  return json.data as ScanResult;
}

export async function generateExamAnswer(params: GenerateAnswerParams): Promise<ExamAnswerData> {
  if (!navigator.onLine) {
    throw new Error("Network connection unavailable. AI answer generation requires an active internet connection.");
  }

  const res = await safeFetch("/api/generate-answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, "Failed to generate exam answer."));
  }

  const json = await res.json();
  return json.data as ExamAnswerData;
}

export async function runQuickAction(
  action: "viva" | "mcqs" | "important_questions" | "easy_mode",
  topic: string,
  subject?: string,
  branch?: string,
  currentContent?: string
): Promise<any> {
  if (!navigator.onLine) {
    throw new Error("Network connection unavailable. Quick actions require an active internet connection.");
  }

  const res = await safeFetch("/api/quick-action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, topic, subject, branch, currentContent }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, "Failed to execute quick action."));
  }

  const json = await res.json();
  return json.data;
}
