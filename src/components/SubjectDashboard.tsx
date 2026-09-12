import React, { useState } from "react";
import {
  BookOpen,
  Layers,
  CheckCircle2,
  Clock,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  HelpCircle,
  Calendar,
  GraduationCap,
  ArrowRight,
  Eye,
  FileText,
} from "lucide-react";
import {
  JntuhSubject,
  JntuhTopic,
  JntuhUnit,
  StudentProfile,
  TopicProgressRecord,
  EngineeringBranch,
} from "../types";
import { JNTUH_SUBJECTS } from "../data/jntuhSyllabus";
import { YearWiseCurriculumView } from "./YearWiseCurriculumView";
import { TextbookDiagramGalleryModal } from "./TextbookDiagramGalleryModal";
import { TRANSFORMER_DIAGRAM_COLLECTION } from "../data/transformerDiagrams";
import { ExamDiagramViewer } from "./ExamDiagramViewer";

interface SubjectDashboardProps {
  profile: StudentProfile;
  topicProgress: TopicProgressRecord;
  onUpdateProgress: (topicId: string, status: "not_started" | "learning" | "completed") => void;
  onSelectTopicToStudy: (topic: JntuhTopic, unit: JntuhUnit, subject: JntuhSubject) => void;
  onSelectQuestionToAnswer: (question: string, subject: JntuhSubject, unit: JntuhUnit) => void;
}

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({
  profile,
  topicProgress,
  onUpdateProgress,
  onSelectTopicToStudy,
  onSelectQuestionToAnswer,
}) => {
  // Top view mode: "allocation" (Year-Wise Scheme) | "syllabus" (5-Unit Deep Dive) | "diagrams" (Textbook Diagrams)
  const [activeViewMode, setActiveViewMode] = useState<"allocation" | "syllabus" | "diagrams">("allocation");

  // Selected branch for curriculum view (defaults to student's profile branch)
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(profile.branch || "EEE");

  // Filter subjects for current active branch
  const availableSubjects = JNTUH_SUBJECTS.filter((s) => s.branch === selectedBranch);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    availableSubjects.some((s) => s.id === profile.selectedSubjectId)
      ? profile.selectedSubjectId!
      : availableSubjects[0]?.id || JNTUH_SUBJECTS[0].id
  );

  const [openUnitIdx, setOpenUnitIdx] = useState<{ [unitNum: number]: boolean }>({ 1: true });
  const [openImpQuestionsUnit, setOpenImpQuestionsUnit] = useState<{ [unitNum: number]: boolean }>({});
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState<boolean>(false);

  // Current selected subject object
  const currentSubject =
    JNTUH_SUBJECTS.find((s) => s.id === selectedSubjectId) ||
    availableSubjects[0] ||
    JNTUH_SUBJECTS[0];

  // Calculate syllabus completion percentage
  const allSubjectTopics = currentSubject.units.flatMap((u) => u.topics);
  const totalTopics = allSubjectTopics.length;
  const completedTopics = allSubjectTopics.filter((t) => topicProgress[t.id] === "completed").length;
  const learningTopics = allSubjectTopics.filter((t) => topicProgress[t.id] === "learning").length;
  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const toggleUnit = (num: number) => {
    setOpenUnitIdx((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleImpQuestions = (num: number) => {
    setOpenImpQuestionsUnit((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  // Handler when user selects a subject from the Year-Wise Allocation tree
  const handleSelectSubjectFromAllocation = (subjectId: string) => {
    // Try exact id, code, or alias match (e.g. EE304PC -> EE301PC Electrical Machines - I)
    const match = JNTUH_SUBJECTS.find((s) => {
      if (s.id === subjectId) return true;
      if (s.code.toLowerCase() === subjectId.toLowerCase()) return true;
      if (subjectId.toLowerCase().includes("ee304") && s.code === "EE301PC") return true;
      if (subjectId.toLowerCase().includes("ee104") && s.code === "EE104ES") return true;
      if (subjectId.toLowerCase().includes("ee106") && s.code === "EE104ES") return true;
      return false;
    });

    if (match) {
      setSelectedSubjectId(match.id);
      setSelectedBranch(match.branch);
    } else {
      // If full 5 units not in local array, fallback to nearest or current
      setSelectedSubjectId(availableSubjects[0]?.id || JNTUH_SUBJECTS[0].id);
    }
    setActiveViewMode("syllabus");
  };

  const hasTransformerUnit =
    currentSubject.name.toLowerCase().includes("transformer") ||
    currentSubject.code === "EE104ES" ||
    currentSubject.code === "EE106ES" ||
    currentSubject.code === "EE301PC" ||
    currentSubject.code === "EE304PC";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. Main Navigation View Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1">
          <button
            type="button"
            onClick={() => setActiveViewMode("allocation")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeViewMode === "allocation"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Year-Wise Subject Allocation (R22)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode("syllabus")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeViewMode === "syllabus"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Subject Units & Questions (1 to 5)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode("diagrams")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeViewMode === "diagrams"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Textbook Diagrams (Transformer)</span>
          </button>
        </div>

        {/* Branch indicator */}
        <div className="px-3 py-1 text-[11px] font-semibold text-slate-500 self-end sm:self-auto">
          Regulation: <span className="font-bold text-slate-900">JNTUH R22</span> • Branch:{" "}
          <span className="font-bold text-sky-700">{selectedBranch}</span>
        </div>
      </div>

      {/* VIEW 1: YEAR-WISE SUBJECT ALLOCATION */}
      {activeViewMode === "allocation" && (
        <YearWiseCurriculumView
          currentBranch={selectedBranch}
          onChangeBranch={(b) => setSelectedBranch(b)}
          onSelectSubjectForStudy={handleSelectSubjectFromAllocation}
          onViewTextbookDiagram={() => setIsDiagramModalOpen(true)}
        />
      )}

      {/* VIEW 2: SUBJECT SYLLABUS & IMPORTANT QUESTIONS (5 UNITS) */}
      {activeViewMode === "syllabus" && (
        <div className="space-y-6">
          {/* Header & Subject Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200 mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>JNTUH R22 Curriculum Syllabus</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentSubject.name} ({currentSubject.code})
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Sem {currentSubject.semester} • {currentSubject.branch} Branch • Units 1 to 5 with Exam Questions
                </p>
              </div>

              {/* Subject Switcher Dropdown */}
              <div className="sm:w-72">
                <label className="block text-xs font-bold text-slate-700 mb-1">Switch Subject:</label>
                <select
                  value={currentSubject.id}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-hidden cursor-pointer"
                >
                  {availableSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code}) - Sem {sub.semester}
                    </option>
                  ))}
                  {JNTUH_SUBJECTS.filter((s) => s.branch !== selectedBranch).map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      [{sub.branch}] {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Highlight for Transformer Unit in BEE / EM-I */}
            {hasTransformerUnit && (
              <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950 block">
                      Textbook Vector Schematics Available for Transformers
                    </span>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      Includes 4 high-yield figures: Core-Type Working Schematic, Exact Equivalent Circuit, Lagging Phasor Diagram, and 2-Min Exam Hall Sketch.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDiagramModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors whitespace-nowrap shadow-2xs self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Diagrams</span>
                </button>
              </div>
            )}

            {/* Progress Bar Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  {currentSubject.name} Syllabus Progress
                </span>
                <span className="font-extrabold text-sky-700 text-sm">{percentage}% Completed</span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                  title={`Completed: ${completedTopics}`}
                />
                <div
                  className="h-full bg-amber-400 transition-all duration-500"
                  style={{
                    width: `${totalTopics > 0 ? (learningTopics / totalTopics) * 100 : 0}%`,
                  }}
                  title={`In Progress: ${learningTopics}`}
                />
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-600 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>{completedTopics} Completed</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span>{learningTopics} Learning</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                  <span>{totalTopics - completedTopics - learningTopics} Not Started</span>
                </span>
              </div>
            </div>
          </div>

          {/* Units 1 to 5 Accordions */}
          <div className="space-y-4">
            {currentSubject.units.map((unit) => {
              const isOpen = Boolean(openUnitIdx[unit.unitNumber]);
              const isImpQuestionsOpen = Boolean(openImpQuestionsUnit[unit.unitNumber]);

              return (
                <div
                  key={unit.unitNumber}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                >
                  {/* Unit Header */}
                  <div
                    onClick={() => toggleUnit(unit.unitNumber)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                        U{unit.unitNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Unit {unit.unitNumber}: {unit.title}
                        </h3>
                        <p className="text-xs text-slate-500">{unit.topics.length} Syllabus Topics</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {isOpen ? "Collapse" : "Expand Topics"}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Unit Topics and Important Questions */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
                      {/* Topic Items Checklist */}
                      <div className="space-y-2">
                        {unit.topics.map((topic) => {
                          const status = topicProgress[topic.id] || "not_started";
                          return (
                            <div
                              key={topic.id}
                              className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900">{topic.name}</span>
                                  {topic.isImportant && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                      Important
                                    </span>
                                  )}
                                  {topic.marksWeightage && (
                                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200/60 text-slate-700">
                                      {topic.marksWeightage}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-1 text-[10px] text-slate-500">
                                  {topic.keywords.slice(0, 4).map((kw, i) => (
                                    <span key={i} className="text-slate-500">
                                      #{kw}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Actions: Progress Status & Study Button */}
                              <div className="flex items-center gap-2 self-end sm:self-center">
                                {/* Status cycle pills */}
                                <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg text-[10px] font-semibold">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateProgress(topic.id, "not_started")}
                                    className={`px-2 py-1 rounded-md transition-all ${
                                      status === "not_started"
                                        ? "bg-white text-slate-800 shadow-2xs"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    ☐ To-Do
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateProgress(topic.id, "learning")}
                                    className={`px-2 py-1 rounded-md transition-all ${
                                      status === "learning"
                                        ? "bg-amber-400 text-amber-950 font-bold shadow-2xs"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    🟡 Learning
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateProgress(topic.id, "completed")}
                                    className={`px-2 py-1 rounded-md transition-all ${
                                      status === "completed"
                                        ? "bg-emerald-500 text-white font-bold shadow-2xs"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    🟢 Done
                                  </button>
                                </div>

                                {/* Study / Generate Answer */}
                                <button
                                  type="button"
                                  onClick={() => onSelectTopicToStudy(topic, unit, currentSubject)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-2xs transition-colors whitespace-nowrap"
                                >
                                  <span>Generate Notes</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Important Exam Questions for this Unit */}
                      {unit.importantQuestions && (
                        <div className="pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => toggleImpQuestions(unit.unitNumber)}
                            className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 cursor-pointer py-1"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>
                              {isImpQuestionsOpen ? "Hide" : "Show"} JNTUH Exam Questions for Unit {unit.unitNumber}
                            </span>
                            {isImpQuestionsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isImpQuestionsOpen && (
                            <div className="mt-3 p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-3">
                              {/* 10 Marks / 5 Marks Questions */}
                              {unit.importantQuestions.tenMarks && unit.importantQuestions.tenMarks.length > 0 && (
                                <div>
                                  <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Part-B (10 Marks / 5 Marks Descriptive Questions)
                                  </h5>
                                  <div className="space-y-1">
                                    {unit.importantQuestions.tenMarks.map((q, i) => (
                                      <div
                                        key={i}
                                        onClick={() => onSelectQuestionToAnswer(q, currentSubject, unit)}
                                        className="p-2 rounded-lg hover:bg-sky-100/70 text-xs text-slate-800 cursor-pointer flex items-center justify-between group"
                                      >
                                        <span>• {q}</span>
                                        <span className="text-[10px] font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                          Generate Answer →
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 2 Marks Short Questions */}
                              {unit.importantQuestions.twoMarks && unit.importantQuestions.twoMarks.length > 0 && (
                                <div>
                                  <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Part-A (2 Marks Short Questions)
                                  </h5>
                                  <div className="space-y-1">
                                    {unit.importantQuestions.twoMarks.map((q, i) => (
                                      <div
                                        key={i}
                                        onClick={() => onSelectQuestionToAnswer(q, currentSubject, unit)}
                                        className="p-2 rounded-lg hover:bg-sky-100/70 text-xs text-slate-800 cursor-pointer flex items-center justify-between group"
                                      >
                                        <span>• {q}</span>
                                        <span className="text-[10px] font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                          Generate Answer →
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Numerical Problems */}
                              {unit.importantQuestions.numerical && unit.importantQuestions.numerical.length > 0 && (
                                <div>
                                  <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Numerical Problems
                                  </h5>
                                  <div className="space-y-1">
                                    {unit.importantQuestions.numerical.map((q, i) => (
                                      <div
                                        key={i}
                                        onClick={() => onSelectQuestionToAnswer(q, currentSubject, unit)}
                                        className="p-2 rounded-lg hover:bg-sky-100/70 text-xs text-slate-800 cursor-pointer flex items-center justify-between group"
                                      >
                                        <span>• {q}</span>
                                        <span className="text-[10px] font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                          Solve Problem →
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: TEXTBOOK DIAGRAMS GALLERY */}
      {activeViewMode === "diagrams" && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Textbook Grade Vector Graphics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Single Phase Transformer Textbook Schematics
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Modeled after university engineering textbooks (B.L. Theraja, P.S. Bimbhra, Alexander & Sadiku) for JNTUH R22 Basic Electrical Engineering (1st Year) and Electrical Machines - I (2nd Year).
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectQuestionToAnswer(
                  "Explain the construction and working principle of a single phase transformer with neat sketch and derive EMF equation.",
                  currentSubject,
                  currentSubject.units[0]
                );
              }}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black transition-colors self-start sm:self-auto cursor-pointer"
            >
              Generate Full Exam Notes →
            </button>
          </div>

          {/* Render ExamDiagramViewer with the Transformer collection */}
          <ExamDiagramViewer
            diagram={TRANSFORMER_DIAGRAM_COLLECTION}
            questionText="Single Phase Transformer Working Principle and Equivalent Circuit"
            topicText="Transformers"
          />
        </div>
      )}

      {/* Modal for viewing Transformer diagrams from anywhere */}
      <TextbookDiagramGalleryModal
        isOpen={isDiagramModalOpen}
        onClose={() => setIsDiagramModalOpen(false)}
        onSelectQuestion={(q) => onSelectQuestionToAnswer(q, currentSubject, currentSubject.units[0])}
      />
    </div>
  );
};
