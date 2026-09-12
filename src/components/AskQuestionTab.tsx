import React, { useState, useEffect } from "react";
import { Edit3, Sparkles, BookOpen, Layers, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { AnswerLength, JntuhSubject, StudentProfile } from "../types";
import { JNTUH_SUBJECTS } from "../data/jntuhSyllabus";

interface AskQuestionTabProps {
  profile: StudentProfile;
  onGenerateAnswer: (params: {
    question: string;
    subject?: string;
    unit?: string;
    topic?: string;
    answerLength: AnswerLength;
    easyMode?: boolean;
  }) => void;
  isLoading: boolean;
  initialQuestion?: string;
  initialSubject?: string;
}

export const AskQuestionTab: React.FC<AskQuestionTabProps> = ({
  profile,
  onGenerateAnswer,
  isLoading,
  initialQuestion = "",
  initialSubject = "",
}) => {
  const [questionText, setQuestionText] = useState<string>(initialQuestion);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [answerLength, setAnswerLength] = useState<AnswerLength>(profile.preferredAnswerLength || "5_marks");
  const [easyMode, setEasyMode] = useState<boolean>(false);

  // Filter subjects by current student branch
  const branchSubjects = JNTUH_SUBJECTS.filter((s) => s.branch === profile.branch);
  const currentSubject = JNTUH_SUBJECTS.find((s) => s.id === selectedSubjectId) || branchSubjects[0] || JNTUH_SUBJECTS[0];

  useEffect(() => {
    if (initialQuestion) {
      setQuestionText(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (initialSubject) {
      const match = JNTUH_SUBJECTS.find((s) => s.name.toLowerCase() === initialSubject.toLowerCase());
      if (match) setSelectedSubjectId(match.id);
    } else if (branchSubjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(branchSubjects[0].id);
    }
  }, [profile.branch, initialSubject]);

  const handleQuickPill = (text: string, length?: AnswerLength) => {
    if (length) setAnswerLength(length);
    if (!questionText.trim()) {
      setQuestionText(text);
    } else {
      setQuestionText(`${questionText.trim()} (${text})`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    onGenerateAnswer({
      question: questionText.trim(),
      subject: currentSubject?.name,
      unit: selectedUnit,
      answerLength,
      easyMode,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30 mb-2.5">
            <Edit3 className="w-3.5 h-3.5 text-sky-300" />
            <span>✍️ Ask a Question or Topic • JNTUH R22</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Ask Any Engineering Question or Topic
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Type an exam question, derivation, numerical problem, or just a topic name (e.g. <em>“Townsend breakdown criterion”</em>, <em>“Thermal breakdown in solid dielectrics”</em>). Get a structured, mark-focused university answer in simple English with technical terms intact.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
        {/* Main Question Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="question-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>What do you want to study?</span>
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Simple English with Technical Keywords
            </span>
          </div>

          <div className="relative">
            <textarea
              id="question-input"
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. Explain thermal breakdown in solid dielectrics with neat sketch. OR Enter only a topic: 'Townsend breakdown criterion' or 'Bode plot gain margin'."
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-500/20 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all outline-hidden resize-y"
              required
            />
          </div>

          {/* Quick Modifier Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Prompts:</span>
            {[
              { label: "5-Mark Answer", text: "Give me a 5-mark answer", len: "5_marks" as AnswerLength },
              { label: "10-Mark Detailed", text: "Give me a 10-mark detailed answer with diagrams", len: "10_marks" as AnswerLength },
              { label: "Simple English", text: "Explain this topic in simple English preserving technical words" },
              { label: "Numerical Steps", text: "Solve step by step with given data and formula" },
              { label: "⚡ Quick Revision", text: "Quick revision summary", len: "revision" as AnswerLength },
            ].map((pill, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickPill(pill.text, pill.len)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 transition-colors cursor-pointer"
              >
                + {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Row: Subject & Unit Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Select Subject</span>
            </label>
            <select
              value={selectedSubjectId || currentSubject?.id}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedUnit("");
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              {JNTUH_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.branch}] {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Unit (Optional context)</span>
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="">Auto-detect from syllabus</option>
              {currentSubject?.units?.map((u) => (
                <option key={u.unitNumber} value={`Unit ${u.unitNumber}: ${u.title}`}>
                  Unit {u.unitNumber}: {u.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Answer Length Options */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Desired Answer Length:
            </label>
            <span className="text-[11px] text-slate-500">Tailored to JNTUH evaluation scheme</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              {
                id: "very_short",
                title: "Very Short",
                marks: "1–2 Marks",
                desc: "Definitions & formulas",
              },
              {
                id: "short",
                title: "Short",
                marks: "3–5 Marks",
                desc: "Concise points",
              },
              {
                id: "5_marks",
                title: "5 Marks",
                marks: "5 Marks",
                desc: "Structured exam answer",
              },
              {
                id: "10_marks",
                title: "10 Marks",
                marks: "10 Marks",
                desc: "Detailed with diagrams",
              },
              {
                id: "revision",
                title: "⚡ Quick Revision",
                marks: "High Yield",
                desc: "Last-minute points",
              },
            ].map((opt) => {
              const isSelected = answerLength === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setAnswerLength(opt.id as AnswerLength)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                    isSelected
                      ? "border-sky-600 bg-sky-50/70 ring-1 ring-sky-500"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${isSelected ? "text-sky-700" : "text-slate-500"}`}>
                    {opt.marks}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{opt.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Easy Mode Toggle & Language notice */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="easy-mode-toggle"
              checked={easyMode}
              onChange={(e) => setEasyMode(e.target.checked)}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="easy-mode-toggle" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
              <span>🧠 Easy to Remember Mode</span>
              <span className="text-[10px] font-normal text-slate-500">(Short logical bullet points, preserving all technical keywords)</span>
            </label>
          </div>

          <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Language: Simple English (Technical terms intact)</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !questionText.trim()}
          id="generate-answer-submit-btn"
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Synthesizing JNTUH Exam Answer...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>GENERATE EXAM ANSWER</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
