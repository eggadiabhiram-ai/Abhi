import React, { useState, useRef } from "react";
import { Camera, Upload, AlertTriangle, CheckCircle2, Sparkles, RefreshCw, FileText, ChevronRight, Image as ImageIcon } from "lucide-react";
import { AnswerLength, EngineeringBranch, ScanResult, ScannedQuestionItem, StudentProfile } from "../types";
import { scanQuestionImage } from "../services/api";

interface ScanQuestionTabProps {
  profile: StudentProfile;
  onSelectQuestionToAnswer: (params: {
    question: string;
    subject?: string;
    unit?: string;
    answerLength: AnswerLength;
    marksTarget?: string;
  }) => void;
  onSwitchToManual: () => void;
}

// Sample realistic exam question images/cards for quick demo
const SAMPLE_EXAM_SNIPPETS = [
  {
    title: "High Voltage Engineering (EEE 4-1)",
    question: "Explain Townsend breakdown criterion for gases and derive the condition for spark breakdown.",
    marks: "10 Marks",
    subject: "High Voltage Engineering",
    type: "Theory & Derivation",
    color: "from-sky-500/10 to-indigo-500/10 border-sky-200",
  },
  {
    title: "Power Electronics (EEE 3-1)",
    question: "Explain the two-transistor analogy of SCR with a neat diagram and derive the equation for anode current.",
    marks: "5 Marks",
    subject: "Power Electronics",
    type: "Circuit & Working",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200",
  },
  {
    title: "Database Management Systems (CSE 2-2)",
    question: "Define Functional Dependency. Explain 1NF, 2NF, 3NF and BCNF with suitable examples.",
    marks: "10 Marks",
    subject: "Database Management Systems",
    type: "Theory & Normalization",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
  },
  {
    title: "Digital Signal Processing (ECE 3-1)",
    question: "Derive 8-point Radix-2 DIT FFT algorithm and draw the complete butterfly signal flow graph.",
    marks: "10 Marks",
    subject: "Digital Signal Processing",
    type: "Algorithm & Signal Flow",
    color: "from-purple-500/10 to-pink-500/10 border-purple-200",
  },
];

export const ScanQuestionTab: React.FC<ScanQuestionTabProps> = ({
  profile,
  onSelectQuestionToAnswer,
  onSwitchToManual,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [targetLength, setTargetLength] = useState<AnswerLength>(profile.preferredAnswerLength || "5_marks");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }
    setErrorMessage(null);
    setScanResult(null);
    setSelectedQuestionId(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      processImageOCR(result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const processImageOCR = async (base64: string, type: string) => {
    setIsScanning(true);
    setErrorMessage(null);
    try {
      const result = await scanQuestionImage(base64, type);
      setScanResult(result);
      if (result.questions && result.questions.length > 0) {
        setSelectedQuestionId(result.questions[0].id);
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      setErrorMessage(err.message || "Could not analyze the question photo. Check network and try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleGenerateFromScan = (question: ScannedQuestionItem) => {
    onSelectQuestionToAnswer({
      question: question.text,
      subject: question.suggestedSubject,
      answerLength: targetLength,
      marksTarget: question.marksSuggestion,
    });
  };

  const activeQuestion = scanResult?.questions?.find((q) => q.id === selectedQuestionId) || scanResult?.questions?.[0];

  return (
    <div className="space-y-6">
      {/* Feature banner */}
      <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-sky-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30 mb-3">
            <Camera className="w-3.5 h-3.5 text-sky-300" />
            <span>AI Vision OCR • JNTUH R22 Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Scan Question from Photo
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take a photo of an exam paper, question bank, assignment, or textbook. Our AI reads the question, fixes OCR typos, and prepares a university exam-ready answer with diagrams and key terms.
          </p>
        </div>
      </div>

      {/* Upload Box / Action Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upload and Preview Area */}
        <div className="lg:col-span-6 space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all bg-white flex flex-col items-center justify-center min-h-[260px] relative ${
              isDragging
                ? "border-sky-500 bg-sky-50/50"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            {selectedImage ? (
              <div className="w-full space-y-4">
                <div className="relative rounded-xl overflow-hidden max-h-64 border border-slate-200 bg-slate-900/5">
                  <img
                    src={selectedImage}
                    alt="Question capture"
                    className="w-full h-auto max-h-60 object-contain mx-auto"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <RefreshCw className="w-8 h-8 animate-spin text-sky-400 mb-2" />
                      <p className="text-sm font-semibold">Reading question with AI Vision...</p>
                      <p className="text-xs text-slate-300">Correcting OCR typos and structuring question</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedImage) processImageOCR(selectedImage, mimeType);
                    }}
                    disabled={isScanning}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
                    Re-scan Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setScanResult(null);
                      setErrorMessage(null);
                    }}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-3 shadow-xs">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Upload or Capture Question Photo
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mb-4">
                  Drag & drop a screenshot, select from gallery, or capture directly with your camera.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Gallery upload */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    id="scan-upload-file-btn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Browse Photo / Screenshot
                  </button>

                  {/* Camera direct capture */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    id="scan-camera-btn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-slate-600" />
                    Take Camera Photo
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                  }}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                  }}
                />
              </>
            )}
          </div>

          {/* Or switch to manual */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs">
            <span className="text-slate-600">Want to type your question directly?</span>
            <button
              onClick={onSwitchToManual}
              className="font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              ✍️ Type Question Instead <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Demo Samples */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Quick Test: Try with Real JNTUH Exam Questions
            </h4>
            <div className="space-y-2">
              {SAMPLE_EXAM_SNIPPETS.map((snippet, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectQuestionToAnswer({
                      question: snippet.question,
                      subject: snippet.subject,
                      answerLength: targetLength,
                      marksTarget: snippet.marks,
                    });
                  }}
                  className="group p-3 rounded-lg border border-slate-100 hover:border-sky-300 hover:bg-sky-50/50 cursor-pointer transition-all flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-sky-700">{snippet.title}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {snippet.marks}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 group-hover:text-sky-950 line-clamp-2">
                      "{snippet.question}"
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-sky-600 whitespace-nowrap mt-1 group-hover:translate-x-0.5 transition-transform">
                    Use →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: OCR Result and Multi-Question Selector */}
        <div className="lg:col-span-6 space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Scanning Notice</p>
                <p className="text-xs leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* If Image is Blurry / Unreadable as requested */}
          {scanResult && scanResult.unreadable && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-900">Image Blurry or Unclear</h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    {scanResult.message || "The question could not be recognized with sufficient confidence. Rather than inventing an answer, please upload a clearer or closer photo."}
                  </p>
                </div>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                <p className="font-semibold text-slate-800">Tips for Best Vision Recognition:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1">
                  <li>Hold the camera steady with adequate lighting.</li>
                  <li>Ensure the entire question text is inside the frame.</li>
                  <li>Avoid heavy glare or extreme angled shots.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Detected Questions List (handles single or multiple questions) */}
          {scanResult && !scanResult.unreadable && scanResult.questions && scanResult.questions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    {scanResult.questions.length === 1
                      ? "Question Identified"
                      : `Detected ${scanResult.questions.length} Questions in Image`}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  OCR Corrected
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {scanResult.questions.length > 1
                  ? "Select the question you would like to generate an exam answer for:"
                  : "We've corrected OCR artifacts and identified the question context:"}
              </p>

              {/* Questions Radio/Selection Stack */}
              <div className="space-y-3">
                {scanResult.questions.map((q) => {
                  const isSelected = selectedQuestionId === q.id;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-50/60 shadow-xs ring-1 ring-sky-400"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {q.number || 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            Question {q.number || 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {q.suggestedSubject && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {q.suggestedSubject}
                            </span>
                          )}
                          {q.marksSuggestion && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {q.marksSuggestion}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs font-medium text-slate-900 pl-8 leading-relaxed">
                        {q.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Target Mark / Length Selector */}
              {activeQuestion && (
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Desired Answer Format:</label>
                    <span className="text-[11px] text-slate-500">JNTUH R22 Structure</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: "very_short", label: "2 Marks", desc: "1-2 Marks" },
                      { id: "short", label: "3-5 Marks", desc: "Short" },
                      { id: "5_marks", label: "5 Marks", desc: "Standard" },
                      { id: "10_marks", label: "10 Marks", desc: "Detailed" },
                      { id: "revision", label: "⚡ Revision", desc: "Points" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTargetLength(opt.id as AnswerLength)}
                        className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                          targetLength === opt.id
                            ? "border-sky-600 bg-sky-600 text-white shadow-xs"
                            : "border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className={`text-[10px] ${targetLength === opt.id ? "text-sky-100" : "text-slate-400"}`}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    onClick={() => handleGenerateFromScan(activeQuestion)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-sky-200" />
                    <span>Generate Exam Answer for Question {activeQuestion.number || 1}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty State when no image selected */}
          {!selectedImage && (
            <div className="border border-slate-200/80 rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50/50 text-slate-600 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">How JNTUH R22 AI Vision Works</h4>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Detects Question Text:</strong> Accurately parses printed examination papers, handwriting, or phone screenshots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Corrects OCR Typos:</strong> Fixes broken words (e.g. "Townsend break down" → "Townsend breakdown") using technical context.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Preserves Technical Terminology:</strong> Uses Simple English while strictly retaining terms like dielectric strength, electron avalanche, and ionization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <span><strong>Exam Blueprint:</strong> Formats answers with Definition, Principle, Diagrams ("How to draw in exam"), Formulas, and Critical Keywords.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
