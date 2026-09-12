import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Brain,
  FileText,
  BookOpen,
  Zap,
  Mic,
  CheckSquare,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  FolderPlus,
  ArrowLeft,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";
import { AnswerLength, ExamAnswerData, McqItem, VivaItem } from "../types";
import { ExamDiagramViewer } from "./ExamDiagramViewer";

interface AnswerViewerProps {
  answer: ExamAnswerData;
  onReGenerateWithLength: (length: AnswerLength) => void;
  onSaveAnswer: (answer: ExamAnswerData, folder: string) => void;
  isSaved: boolean;
  folders: string[];
  onBack: () => void;
  isLoadingAction?: boolean;
}

export const AnswerViewer: React.FC<AnswerViewerProps> = ({
  answer,
  onReGenerateWithLength,
  onSaveAnswer,
  isSaved,
  folders,
  onBack,
  isLoadingAction = false,
}) => {
  const [activeSubView, setActiveSubView] = useState<"standard" | "easy" | "revision" | "viva" | "mcqs">("standard");
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string>(answer.folder || folders[0] || "General Engineering");
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");

  // MCQs state
  const [mcqSelections, setMcqSelections] = useState<{ [qIndex: number]: number }>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false);

  // Viva open/closed state
  const [openVivaIdx, setOpenVivaIdx] = useState<{ [idx: number]: boolean }>({ 0: true });

  const handleCopy = () => {
    const textToCopy = `JNTUH R22 Exam Notes
Question: ${answer.question}
Subject: ${answer.subject || "Engineering"} (${answer.marksTarget || "Exam Answer"})

[DEFINITION]
${answer.definition}

${answer.principle ? `[PRINCIPLE]\n${answer.principle}\n` : ""}
[EXPLANATION]
${answer.explanation}

${answer.workingProcess ? `[WORKING / PROCESS]\n${answer.workingProcess}\n` : ""}
${answer.formula?.hasFormula ? `[FORMULA]\n${answer.formula.equations.join("\n")}\n` : ""}
[CRITICAL KEYWORDS]
${answer.criticalKeywords?.join(", ") || ""}

${
  answer.technicalSection
    ? `[TECHNICAL SECTION]
${answer.technicalSection.governingLaws ? `Governing Laws: ${answer.technicalSection.governingLaws.join("; ")}\n` : ""}${
        answer.technicalSection.specifications
          ? `Specifications:\n${answer.technicalSection.specifications.map((s) => `• ${s.parameter}: ${s.value}${s.significance ? ` (${s.significance})` : ""}`).join("\n")}\n`
          : ""
      }${answer.technicalSection.engineeringSignificance ? `Engineering Significance: ${answer.technicalSection.engineeringSignificance}\n` : ""}`
    : ""
}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${answer.question} - JNTUH R22 Exam Notes`,
          text: `${answer.question}\n\nDefinition: ${answer.definition}\n\nCritical Keywords: ${answer.criticalKeywords?.join(", ")}`,
        })
        .catch(() => handleCopy());
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToFolder = () => {
    const targetFolder = newFolderName.trim() || selectedFolder;
    onSaveAnswer(answer, targetFolder);
    setShowFolderModal(false);
    setNewFolderName("");
  };

  const handleSelectMcqOption = (qIdx: number, optIdx: number) => {
    if (mcqSubmitted) return;
    setMcqSelections((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    if (!answer.practiceMcqs) return 0;
    return answer.practiceMcqs.reduce((score, item, idx) => {
      return score + (mcqSelections[idx] === item.correctIndex ? 1 : 0);
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-lg border border-sky-200 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ask or Scan Another Question</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
            title="Copy entire answer text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
            title="Share Answer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
            title="Print or Export PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={() => setShowFolderModal(true)}
            id="save-answer-action-btn"
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg border shadow-2xs transition-colors ${
              isSaved
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-sky-600 hover:bg-sky-700 text-white border-sky-600"
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? "Saved" : "Save Note"}</span>
          </button>
        </div>
      </div>

      {/* Main Question Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {answer.subject && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                {answer.subject}
              </span>
            )}
            {answer.unit && (
              <span className="text-xs font-medium text-slate-500">
                {answer.unit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {answer.marksTarget || (answer.answerLength === "10_marks" ? "10 Marks" : "5 Marks")}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              JNTUH R22
            </span>
          </div>
        </div>

        <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
          {answer.question}
        </h1>

        {/* Action Toolbar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 no-print">
          <button
            onClick={() => setActiveSubView("standard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubView === "standard"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            📋 Exam Answer
          </button>

          <button
            onClick={() => setActiveSubView("easy")}
            id="action-make-easy-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubView === "easy"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>🧠 Make It Easy</span>
          </button>

          <button
            onClick={() => onReGenerateWithLength("5_marks")}
            disabled={isLoadingAction}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            📝 5-Mark Version
          </button>

          <button
            onClick={() => onReGenerateWithLength("10_marks")}
            disabled={isLoadingAction}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            📖 10-Mark Version
          </button>

          <button
            onClick={() => setActiveSubView("revision")}
            id="action-quick-revision-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubView === "revision"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/80"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Quick Revision</span>
          </button>

          <button
            onClick={() => setActiveSubView("viva")}
            id="action-viva-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubView === "viva"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/80"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>🎤 Viva Qs</span>
          </button>

          <button
            onClick={() => setActiveSubView("mcqs")}
            id="action-mcqs-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubView === "mcqs"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>📝 Practice MCQs</span>
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: Easy to Remember View */}
      {activeSubView === "easy" && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">🧠 Easy to Remember Mode</h3>
                <p className="text-xs text-amber-800">
                  Concept broken into short, sequential points with all technical terminology preserved.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubView("standard")}
              className="text-xs font-bold text-amber-900 hover:underline"
            >
              Back to Full Answer →
            </button>
          </div>

          <div className="space-y-3">
            {answer.easyToRemember && answer.easyToRemember.length > 0 ? (
              answer.easyToRemember.map((point, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    <ReactMarkdown>{point}</ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-white rounded-xl text-xs text-slate-700 leading-relaxed">
                <ReactMarkdown>{answer.explanation}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Quick Revision View */}
      {activeSubView === "revision" && (
        <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-sky-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-sky-950">⚡ 1-Minute Quick Revision Sheet</h3>
                <p className="text-xs text-sky-800">Ideal for reviewing just before entering the examination hall.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubView("standard")}
              className="text-xs font-bold text-sky-900 hover:underline"
            >
              Full Answer →
            </button>
          </div>

          {answer.quickRevisionSummary ? (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-sky-200">
                <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">One-Line Core Definition</h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  {answer.quickRevisionSummary.oneLineDefinition}
                </p>
              </div>

              {answer.quickRevisionSummary.keyFormula && (
                <div className="p-4 bg-white rounded-xl border border-sky-200 font-mono text-xs sm:text-sm text-indigo-900 font-bold bg-slate-50">
                  <span className="text-slate-500 font-sans text-xs uppercase block mb-1">Critical Formula:</span>
                  {answer.quickRevisionSummary.keyFormula}
                </div>
              )}

              <div className="p-4 bg-white rounded-xl border border-sky-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">High-Yield Exam Points</h4>
                <ul className="space-y-2">
                  {answer.quickRevisionSummary.highYieldPoints.map((pt, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-xl border border-sky-200">
                <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Essential Keywords to Write</h4>
                <div className="flex flex-wrap gap-1.5">
                  {answer.quickRevisionSummary.criticalKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      ★ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white rounded-xl text-xs">
              <p className="font-semibold text-slate-800 mb-2">Definition: {answer.definition}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {answer.criticalKeywords?.map((k, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 rounded">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 3: Viva Questions */}
      {activeSubView === "viva" && (
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-purple-950">🎤 Viva Voce & Lab Exam Questions</h3>
                <p className="text-xs text-purple-800">Crisp, technically exact answers expected by external examiners.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubView("standard")}
              className="text-xs font-bold text-purple-900 hover:underline"
            >
              Full Answer →
            </button>
          </div>

          <div className="space-y-3">
            {answer.vivaQuestions && answer.vivaQuestions.length > 0 ? (
              answer.vivaQuestions.map((viva: VivaItem, idx: number) => {
                const isOpen = Boolean(openVivaIdx[idx]);
                return (
                  <div key={idx} className="bg-white rounded-xl border border-purple-200 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setOpenVivaIdx((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-purple-50/40 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-purple-700 text-xs">Q{idx + 1}:</span>
                        <span className="font-semibold text-xs sm:text-sm text-slate-900">{viva.q}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-1 pb-4 border-t border-purple-100 bg-purple-50/20 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <span className="font-bold text-emerald-700 mr-2">Answer:</span>
                        {viva.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-6 bg-white rounded-xl text-center text-xs text-slate-500">
                No specific viva questions configured. Review core definitions and formulas below.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: Practice MCQs Quiz */}
      {activeSubView === "mcqs" && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950">📝 Practice Multiple Choice Questions</h3>
                <p className="text-xs text-emerald-800">Test your mastery of this JNTUH syllabus topic.</p>
              </div>
            </div>
            {mcqSubmitted && (
              <div className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-2xs">
                Score: {calculateScore()} / {answer.practiceMcqs?.length || 0}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {answer.practiceMcqs && answer.practiceMcqs.length > 0 ? (
              answer.practiceMcqs.map((mcq: McqItem, qIdx: number) => {
                const userSelected = mcqSelections[qIdx];
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-2xs space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      <span className="text-emerald-700 mr-1.5">{qIdx + 1}.</span> {mcq.question}
                    </p>

                    <div className="space-y-2">
                      {mcq.options.map((opt: string, optIdx: number) => {
                        let btnStyle = "border-slate-200 hover:bg-slate-50 text-slate-700";
                        if (userSelected === optIdx) {
                          btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-400";
                        }
                        if (mcqSubmitted) {
                          if (optIdx === mcq.correctIndex) {
                            btnStyle = "border-emerald-600 bg-emerald-100/80 text-emerald-950 font-bold";
                          } else if (userSelected === optIdx) {
                            btnStyle = "border-rose-300 bg-rose-50 text-rose-800 line-through";
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectMcqOption(qIdx, optIdx)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>
                              <strong className="mr-2">{String.fromCharCode(65 + optIdx)}.</strong>
                              {opt}
                            </span>
                            {mcqSubmitted && optIdx === mcq.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-700" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {mcqSubmitted && (
                      <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-200">
                        <strong className="text-emerald-800">Explanation: </strong>
                        {mcq.explanation}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-500">
                No MCQs generated for this snippet yet.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!mcqSubmitted ? (
              <button
                type="button"
                onClick={() => setMcqSubmitted(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
              >
                Submit & Check Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMcqSubmitted(false);
                  setMcqSelections({});
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              >
                Reset & Try Again
              </button>
            )}

            <button
              onClick={() => setActiveSubView("standard")}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              Back to Full Notes
            </button>
          </div>
        </div>
      )}

      {/* SUB-VIEW 0: Standard Full Exam-Ready Notes */}
      {activeSubView === "standard" && (
        <div className="space-y-6">
          {/* 1. Definition */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-2">
            <h2 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span>Definition</span>
            </h2>
            <div className="text-sm font-medium text-slate-900 leading-relaxed bg-sky-50/40 p-4 rounded-xl border border-sky-100">
              <ReactMarkdown>{answer.definition}</ReactMarkdown>
            </div>
          </section>

          {/* 2. Principle (if applicable) */}
          {answer.principle && (
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-2">
              <h2 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Fundamental Principle</span>
              </h2>
              <div className="text-sm text-slate-800 leading-relaxed">
                <ReactMarkdown>{answer.principle}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* 3. Step-by-Step Explanation */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-3">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span>Step-by-Step Explanation</span>
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed space-y-3 prose prose-slate max-w-none">
              <ReactMarkdown>{answer.explanation}</ReactMarkdown>
            </div>
          </section>

          {/* 4. Working / Process (if applicable) */}
          {answer.workingProcess && (
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-3">
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Working / Process</span>
              </h2>
              <div className="text-sm text-slate-800 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <ReactMarkdown>{answer.workingProcess}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* 5. Formulas & Numerical steps */}
          {answer.formula && answer.formula.hasFormula && (
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-3">
              <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span>Relevant Formulas & Equations</span>
              </h2>
              <div className="space-y-2">
                {answer.formula.equations.map((eq, i) => (
                  <div
                    key={i}
                    className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 font-mono text-xs sm:text-sm text-purple-950 font-bold overflow-x-auto"
                  >
                    {eq}
                  </div>
                ))}

                {answer.formula.symbolMeanings && answer.formula.symbolMeanings.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-600 block mb-1">Where:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                      {answer.formula.symbolMeanings.map((sym, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="font-mono font-bold text-purple-700">{sym.symbol}</span>
                          <span className="text-slate-400">=</span>
                          <span>{sym.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Numerical problem steps if present */}
          {answer.numerical && answer.numerical.isNumerical && (
            <section className="bg-white rounded-2xl border border-indigo-200 shadow-xs p-6 space-y-3">
              <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Numerical Solution Step-by-Step</span>
              </h2>

              {answer.numerical.givenData && answer.numerical.givenData.length > 0 && (
                <div className="text-xs text-slate-800">
                  <strong className="block text-slate-900 mb-1">1. Given Data:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    {answer.numerical.givenData.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {answer.numerical.toFind && (
                <div className="text-xs text-slate-800">
                  <strong className="text-slate-900">2. Required Quantity: </strong>
                  <span>{answer.numerical.toFind}</span>
                </div>
              )}

              {answer.numerical.formulaUsed && (
                <div className="text-xs text-slate-800">
                  <strong className="text-slate-900">3. Formula Used: </strong>
                  <span className="font-mono font-bold text-indigo-800">{answer.numerical.formulaUsed}</span>
                </div>
              )}

              {answer.numerical.calculationSteps && answer.numerical.calculationSteps.length > 0 && (
                <div className="text-xs text-slate-800 space-y-1">
                  <strong className="block text-slate-900">4. Step-by-Step Substitution:</strong>
                  {answer.numerical.calculationSteps.map((step, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded border border-slate-200 font-mono text-xs">
                      {step}
                    </div>
                  ))}
                </div>
              )}

              {answer.numerical.finalAnswer && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-950">
                  <span>5. Final Answer: </span>
                  <span className="underline decoration-emerald-500 font-mono">{answer.numerical.finalAnswer}</span>
                </div>
              )}
            </section>
          )}

          {/* 6. Diagram & "How to draw in exam" */}
          {answer.diagram && answer.diagram.needed && (
            <ExamDiagramViewer
              diagram={answer.diagram}
              questionText={answer.question}
              topicText={answer.topic}
            />
          )}

          {/* 7. Advantages / Disadvantages / Applications (if relevant) */}
          {(answer.advantages?.length || answer.disadvantages?.length || answer.applications?.length) ? (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {answer.advantages && answer.advantages.length > 0 && (
                <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-5 space-y-2">
                  <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Advantages</h3>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {answer.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {answer.disadvantages && answer.disadvantages.length > 0 && (
                <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-5 space-y-2">
                  <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Disadvantages</h3>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {answer.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {answer.applications && answer.applications.length > 0 && (
                <div className="bg-sky-50/50 rounded-2xl border border-sky-200 p-5 space-y-2">
                  <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider">Applications</h3>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {answer.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold">▸</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ) : null}

          {/* 8. Critical Keywords (Crucial Exam Feature) */}
          <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span>⭐ Critical Keywords (University Evaluator Target)</span>
              </h2>
              <span className="text-[11px] text-slate-300">Include these exact terms to score full marks</span>
            </div>
            <p className="text-xs text-slate-300">
              The following technical terms must not be skipped or replaced with colloquial language:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {answer.criticalKeywords?.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-indigo-100 border border-indigo-400/30 transition-colors shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>

          {/* 9. Technical Section (Specifications, Operating Boundaries, Governing Laws) */}
          {answer.technicalSection && (
            <section className="bg-white rounded-2xl border border-indigo-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Technical Section: Specifications & Engineering Parameters</span>
                </h2>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  Standard JNTUH Technical Scheme
                </span>
              </div>

              {/* Governing Laws & Theorems */}
              {answer.technicalSection.governingLaws && answer.technicalSection.governingLaws.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Governing Laws & Principles:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {answer.technicalSection.governingLaws.map((law, lIdx) => (
                      <span
                        key={lIdx}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>{law}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications / Numerical Parameters Table */}
              {answer.technicalSection.specifications && answer.technicalSection.specifications.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Key Technical Specifications & Operating Parameters:
                  </span>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <tr>
                          <th className="py-2.5 px-3">Parameter</th>
                          <th className="py-2.5 px-3">Standard / Value</th>
                          <th className="py-2.5 px-3">Engineering Significance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {answer.technicalSection.specifications.map((spec, sIdx) => (
                          <tr key={sIdx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-slate-900">{spec.parameter}</td>
                            <td className="py-2.5 px-3 font-mono text-indigo-700 bg-indigo-50/30 font-medium">
                              {spec.value}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{spec.significance || "Operating boundary"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Standard Derivation / Procedural Steps */}
              {answer.technicalSection.standardDerivationSteps &&
                answer.technicalSection.standardDerivationSteps.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Standard Derivation & Procedural Sequence:
                    </span>
                    <ol className="space-y-1.5 text-xs text-slate-800 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 list-decimal list-inside font-medium">
                      {answer.technicalSection.standardDerivationSteps.map((step, stIdx) => (
                        <li key={stIdx} className="leading-relaxed">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              {/* Engineering Significance */}
              {answer.technicalSection.engineeringSignificance && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 space-y-1 border border-slate-800">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                    Industrial & Engineering Significance:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {answer.technicalSection.engineeringSignificance}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* Save Note to Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Save Answer to Folder</h3>
              <button
                onClick={() => setShowFolderModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Choose Existing Folder:</label>
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800"
              >
                {folders.map((f) => (
                  <option key={f} value={f}>
                    📁 {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Or Create a New Folder:</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. High Voltage Engineering"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowFolderModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveToFolder}
                id="save-confirm-modal-btn"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
