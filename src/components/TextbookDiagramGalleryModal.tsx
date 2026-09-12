import React from "react";
import { X, Sparkles, BookOpen, GraduationCap, ArrowRight, HelpCircle } from "lucide-react";
import { TRANSFORMER_DIAGRAM_COLLECTION } from "../data/transformerDiagrams";
import { ExamDiagramViewer } from "./ExamDiagramViewer";

interface TextbookDiagramGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const TextbookDiagramGalleryModal: React.FC<TextbookDiagramGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  if (!isOpen) return null;

  const quickQuestions = [
    "Explain the construction and working principle of a single phase core-type transformer with neat sketch and derive EMF equation.",
    "Draw and explain the exact equivalent circuit of a single phase transformer referred to primary side.",
    "Draw the complete phasor diagram of a practical single phase transformer on inductive (lagging) load.",
    "Explain Open Circuit (O.C.) and Short Circuit (S.C.) tests on a single phase transformer to predetermine efficiency.",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Textbook Vector Diagrams: Transformer Schematics
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                  Book Quality
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Accurate Indian & Global Textbook standard (B.L. Theraja & P.S. Bimbhra) with multi-views and 2-min exam sketches.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Diagram Viewer with all 4 views */}
          <ExamDiagramViewer
            diagram={TRANSFORMER_DIAGRAM_COLLECTION}
            questionText="Transformer Construction and Working Principle"
            topicText="Single Phase Transformer"
          />

          {/* Quick Study Questions for JNTUH Exams */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Frequently Asked JNTUH Transformer Questions (10 & 5 Marks)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Click to generate full exam notes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectQuestion(q);
                  }}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-sky-400 hover:bg-sky-50/50 text-left transition-all text-xs font-semibold text-slate-800 flex items-start justify-between gap-2 group cursor-pointer shadow-2xs"
                >
                  <span className="leading-snug">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Available in 1st Year (BEE - EE104ES) and 2nd Year (EM-I - EE301PC).</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
