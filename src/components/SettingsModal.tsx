import React from "react";
import { Settings, X, GraduationCap, Check, AlertCircle, ShieldAlert } from "lucide-react";
import { AnswerLength, EngineeringBranch, Semester, StudentProfile, Year } from "../types";
import { JNTUH_BRANCHES, JNTUH_SEMESTERS } from "../data/jntuhSyllabus";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = React.useState<StudentProfile>(profile);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Personalization & JNTUH R22 Profile</h3>
              <p className="text-[11px] text-slate-500">Configure your engineering branch, semester & defaults</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          {/* Branch */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Engineering Branch:</label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value as EngineeringBranch })}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              {JNTUH_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.id} - Code {b.code})
                </option>
              ))}
            </select>
          </div>

          {/* Year & Semester Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Current Year:</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value as Year })}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
              >
                {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Semester:</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as Semester })}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
              >
                {JNTUH_SEMESTERS.map((s) => (
                  <option key={s.id} value={s.id}>
                    Semester {s.id} ({s.year})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Default Answer Length */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Default Answer Length:</label>
            <select
              value={formData.preferredAnswerLength}
              onChange={(e) => setFormData({ ...formData, preferredAnswerLength: e.target.value as AnswerLength })}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="5_marks">5 Marks (Standard University Exam Answer)</option>
              <option value="10_marks">10 Marks (Detailed with Derivations & Diagrams)</option>
              <option value="short">Short (3-5 Marks)</option>
              <option value="very_short">Very Short (1-2 Marks definitions)</option>
              <option value="revision">Quick Revision (Last-minute bullets)</option>
            </select>
          </div>

          {/* Disclaimer as required by prompt */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Academic Transparency Note</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              This application utilizes the JNTUH R22 regulation syllabus framework to structure exam-ready revision notes. It does not falsely claim official endorsement by JNTUH. Always verify official university circulars and textbooks for final exams.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-xs transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
