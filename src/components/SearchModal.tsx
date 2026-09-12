import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, Layers, HelpCircle, ArrowRight, Star } from "lucide-react";
import { searchSyllabus } from "../data/jntuhSyllabus";
import { JntuhSubject, SavedNote } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedNotes: SavedNote[];
  onSelectResult: (params: {
    question: string;
    subject?: string;
    unit?: string;
  }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  savedNotes,
  onSelectResult,
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const syllabusMatches = searchSyllabus(query);

  const savedMatches = query.trim().length > 1
    ? savedNotes.filter(
        (n) =>
          n.question.toLowerCase().includes(query.toLowerCase()) ||
          n.definition.toLowerCase().includes(query.toLowerCase()) ||
          (n.subject && n.subject.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, topics, or questions (e.g. 'Townsend break down', 'thermal breakdown')..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-hidden placeholder:text-slate-400"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200/60 rounded-lg"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          {/* Typo Tolerance Suggestion Hint */}
          {query.trim().length > 2 && (
            <div className="text-[11px] font-semibold text-slate-500 px-2">
              Fuzzy matching enabled: Minor spelling variations like "break down" are matched automatically.
            </div>
          )}

          {/* Syllabus Matches */}
          {syllabusMatches.length > 0 && (
            <div className="pt-2 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                JNTUH R22 Syllabus Matches
              </div>
              <div className="space-y-1">
                {syllabusMatches.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onSelectResult({
                        question: res.type === "question" ? res.title : `Explain ${res.topicName || res.title} in detail.`,
                        subject: res.subject.name,
                        unit: res.unit ? `Unit ${res.unit}: ${res.unitTitle || ""}` : undefined,
                      });
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-sky-900">
                          {res.title}
                        </span>
                        {res.marksTag && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">
                            {res.marksTag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {res.subject.name} ({res.subject.code}) • {res.subject.branch}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Study <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Notes Matches */}
          {savedMatches.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider px-2">
                Your Saved Notes
              </div>
              <div className="space-y-1">
                {savedMatches.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => {
                      onSelectResult({
                        question: note.question,
                        subject: note.subject,
                        unit: note.unit,
                      });
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-950">
                        {note.question}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        📁 {note.folder} • {note.marksTarget || "Exam Note"}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty search prompt */}
          {!query && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">
                Type any JNTUH R22 engineering topic, question, or keyword
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {["Townsend breakdown", "Thermal breakdown", "Bode plot", "Radix-2 FFT", "Banker's algorithm", "Bernoulli equation"].map(
                  (ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setQuery(ex)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200"
                    >
                      {ex}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* No results */}
          {query.trim().length > 1 && syllabusMatches.length === 0 && savedMatches.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching topics found for "{query}". You can still type this question directly into the manual ask tab to generate an answer with AI.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
