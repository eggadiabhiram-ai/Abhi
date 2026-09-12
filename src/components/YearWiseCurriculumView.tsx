import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Zap,
  Clock,
  Award,
} from "lucide-react";
import { AllocatedSubject, EngineeringBranch, Semester, SubjectCategory, Year } from "../types";
import { JNTUH_R22_CURRICULUM } from "../data/jntuhCurriculum";

interface YearWiseCurriculumViewProps {
  currentBranch: EngineeringBranch;
  onChangeBranch: (branch: EngineeringBranch) => void;
  onSelectSubjectForStudy: (subjectId: string) => void;
  onViewTextbookDiagram: () => void;
}

const CATEGORY_STYLES: Record<SubjectCategory, { bg: string; text: string; label: string }> = {
  BS: { bg: "bg-purple-100 text-purple-800 border-purple-200", text: "text-purple-800", label: "Basic Sciences (BS)" },
  ES: { bg: "bg-blue-100 text-blue-800 border-blue-200", text: "text-blue-800", label: "Engineering Science (ES)" },
  PC: { bg: "bg-emerald-100 text-emerald-800 border-emerald-200", text: "text-emerald-800", label: "Professional Core (PC)" },
  PE: { bg: "bg-amber-100 text-amber-800 border-amber-200", text: "text-amber-800", label: "Professional Elective (PE)" },
  OE: { bg: "bg-indigo-100 text-indigo-800 border-indigo-200", text: "text-indigo-800", label: "Open Elective (OE)" },
  HS: { bg: "bg-rose-100 text-rose-800 border-rose-200", text: "text-rose-800", label: "Humanities (HS)" },
  MC: { bg: "bg-slate-100 text-slate-800 border-slate-200", text: "text-slate-800", label: "Mandatory Non-Credit (MC)" },
};

export const YearWiseCurriculumView: React.FC<YearWiseCurriculumViewProps> = ({
  currentBranch,
  onChangeBranch,
  onSelectSubjectForStudy,
  onViewTextbookDiagram,
}) => {
  const branches: EngineeringBranch[] = ["EEE", "CSE", "ECE", "Mechanical", "Civil", "IT"];
  const [selectedYear, setSelectedYear] = useState<Year>("1st Year");

  // Get current year structure for this branch
  const branchStructure = JNTUH_R22_CURRICULUM[currentBranch] || JNTUH_R22_CURRICULUM.EEE;
  const currentYearObj = branchStructure.find((y) => y.year === selectedYear) || branchStructure[0];

  const [selectedSemester, setSelectedSemester] = useState<Semester>(
    currentYearObj.semesters[0]?.semester || "I-I"
  );

  // When year changes, update semester to first semester of that year
  const handleYearChange = (year: Year) => {
    setSelectedYear(year);
    const yr = branchStructure.find((y) => y.year === year);
    if (yr && yr.semesters[0]) {
      setSelectedSemester(yr.semesters[0].semester);
    }
  };

  const currentSemObj =
    currentYearObj.semesters.find((s) => s.semester === selectedSemester) ||
    currentYearObj.semesters[0];

  return (
    <div className="space-y-6">
      {/* 1. Branch & Regulation Banner */}
      <div className="bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>JNTUH R22 Academic Regulation (B.Tech 4-Year Scheme)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Year-Wise Subject Allocation</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Complete official subject curriculum for all 4 years and 8 semesters with course codes, credits, lecture-tutorial-practical (L-T-P) distribution, and instant syllabus access.
            </p>
          </div>

          {/* Quick Transformer Diagram Showcase Action */}
          <button
            type="button"
            onClick={onViewTextbookDiagram}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-950" />
            <span>View Textbook Diagrams (Transformer)</span>
          </button>
        </div>

        {/* Branch Selector Pills */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Branch:</span>
          {branches.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onChangeBranch(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentBranch === b
                  ? "bg-sky-500 text-white shadow-sm ring-2 ring-sky-300"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {b} {b === "EEE" && <span className="text-[10px] text-amber-300 font-normal">• Selected</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Year Tabs Selector (1st Year, 2nd Year, 3rd Year, 4th Year) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(["1st Year", "2nd Year", "3rd Year", "4th Year"] as Year[]).map((yr) => {
          const isSelected = selectedYear === yr;
          return (
            <button
              key={yr}
              type="button"
              onClick={() => handleYearChange(yr)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-sky-50 border-sky-400 ring-2 ring-sky-200 shadow-xs"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? "text-sky-900" : "text-slate-800"}`}>
                  {yr}
                </span>
                <Calendar className={`w-3.5 h-3.5 ${isSelected ? "text-sky-600" : "text-slate-400"}`} />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {yr === "1st Year" && "Sem I-I & I-II"}
                {yr === "2nd Year" && "Sem II-I & II-II"}
                {yr === "3rd Year" && "Sem III-I & III-II"}
                {yr === "4th Year" && "Sem IV-I & IV-II"}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. Semester Sub-Tabs */}
      {currentYearObj && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {currentYearObj.semesters.map((sem) => {
            const isSemActive = selectedSemester === sem.semester;
            return (
              <button
                key={sem.semester}
                type="button"
                onClick={() => setSelectedSemester(sem.semester)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSemActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{sem.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSemActive ? "bg-sky-400 text-slate-950 font-extrabold" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {sem.totalCredits} Credits
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Semester Summary Header */}
      {currentSemObj && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentSemObj.semester}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {currentBranch} • {currentSemObj.label} Subjects
              </h2>
              <p className="text-xs text-slate-500">
                {currentSemObj.subjects.length} subjects allocated • {currentSemObj.totalCredits} Total Credits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold">
              Theory + Lab Integrated
            </span>
          </div>
        </div>
      )}

      {/* 5. Allocated Subject Cards Grid */}
      {currentSemObj && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSemObj.subjects.map((subj) => {
            const catInfo = CATEGORY_STYLES[subj.category] || CATEGORY_STYLES.PC;
            const hasTransformers =
              subj.name.toLowerCase().includes("transformer") ||
              subj.code === "EE104ES" ||
              subj.code === "EE301PC";

            return (
              <div
                key={subj.id}
                className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  hasTransformers
                    ? "border-sky-300 ring-1 ring-sky-200 shadow-xs hover:shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-slate-900 text-white">
                        {subj.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${catInfo.bg}`}>
                        {catInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span>{subj.credits} Credits</span>
                      <span>•</span>
                      <span>L-T-P: {subj.ltp}</span>
                    </div>
                  </div>

                  {/* Subject Name */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {subj.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {subj.description}
                    </p>
                  </div>

                  {/* Elective Options List */}
                  {subj.electiveOptions && subj.electiveOptions.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block">
                        Elective Tracks (Choose 1):
                      </span>
                      <ul className="space-y-1">
                        {subj.electiveOptions.map((opt, oIdx) => (
                          <li key={oIdx} className="text-xs font-semibold text-slate-800 flex items-start gap-1.5">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Special Notes (e.g. Lateral Entry) */}
                  {subj.notes && (
                    <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-900">
                      ℹ️ {subj.notes}
                    </div>
                  )}

                  {/* Key Topics tags */}
                  {subj.keyTopics && subj.keyTopics.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Core Syllabus Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {subj.keyTopics.slice(0, 4).map((top, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlight for Transformer Topic in EEE */}
                  {hasTransformers && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Includes Single & 3-Phase Transformers Unit</span>
                      </span>
                      <button
                        type="button"
                        onClick={onViewTextbookDiagram}
                        className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Diagram</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {subj.type} Course
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectSubjectForStudy(subj.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Open Syllabus & Qs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. JNTUH Academic & Credit Rules Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Award className="w-4 h-4 text-sky-600" />
          <span>JNTUH R22 Degree Completion & Credit Distribution Guide</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Total Degree Credits</span>
            <span className="text-lg font-black text-sky-700">160 Credits</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Required for B.Tech award across 8 semesters.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Evaluation Scheme</span>
            <span className="text-lg font-black text-slate-800">40 : 60</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Continuous Internal (40M) + Semester End (60M).</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Pass Criterion</span>
            <span className="text-lg font-black text-emerald-700">35% SEE / 40% Tot</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Min 21/60 in Semester exam & 40/100 aggregate.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Attendance Requirement</span>
            <span className="text-lg font-black text-amber-700">75% Minimum</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Condonation allowed 65%-75% on medical grounds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
