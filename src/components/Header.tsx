import React, { useState, useEffect } from "react";
import { GraduationCap, Search, Settings, Wifi, WifiOff, Camera, Edit3, BookmarkCheck } from "lucide-react";
import { EngineeringBranch, Semester, StudentProfile } from "../types";
import { JNTUH_BRANCHES, JNTUH_SEMESTERS } from "../data/jntuhSyllabus";

interface HeaderProps {
  profile: StudentProfile;
  activeTab: "scan" | "ask" | "saved";
  onTabChange: (tab: "scan" | "ask" | "saved") => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onProfileUpdate: (updated: Partial<StudentProfile>) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  onTabChange,
  onOpenSearch,
  onOpenSettings,
  onProfileUpdate,
  savedCount,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const branchObj = JNTUH_BRANCHES.find((b) => b.id === profile.branch);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Regulation Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-sky-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">JNTUH R22 Study AI</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200/60">
                  R22
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Exam-Ready Answers & AI Vision OCR</p>
            </div>
          </div>

          {/* Branch & Semester Fast Selectors */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <select
              value={profile.branch}
              onChange={(e) => onProfileUpdate({ branch: e.target.value as EngineeringBranch })}
              className="bg-transparent text-xs font-semibold text-slate-700 py-1.5 px-2.5 rounded-lg hover:bg-white focus:bg-white focus:outline-hidden transition-all cursor-pointer"
            >
              {JNTUH_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} - {b.name}
                </option>
              ))}
            </select>
            <div className="w-px h-4 bg-slate-300" />
            <select
              value={profile.semester}
              onChange={(e) => onProfileUpdate({ semester: e.target.value as Semester })}
              className="bg-transparent text-xs font-semibold text-slate-700 py-1.5 px-2.5 rounded-lg hover:bg-white focus:bg-white focus:outline-hidden transition-all cursor-pointer"
            >
              {JNTUH_SEMESTERS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sem {s.id}
                </option>
              ))}
            </select>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Online/Offline indicator */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOnline
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                  : "bg-amber-50 text-amber-700 border-amber-200/80"
              }`}
              title={isOnline ? "Connected to internet (AI Active)" : "Offline Mode (Saved notes accessible)"}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isOnline ? "Online" : "Offline"}</span>
            </div>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              id="header-search-btn"
              className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-slate-200/60"
              title="Search subjects, topics, or questions (fuzzy match)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              id="header-settings-btn"
              className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-slate-200/60"
              title="Settings & Branch Selection"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 border-t border-slate-100 pt-1 pb-1.5">
          <button
            onClick={() => onTabChange("scan")}
            id="nav-tab-scan"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "scan"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>📷 Scan Photo Copy</span>
          </button>

          <button
            onClick={() => onTabChange("ask")}
            id="nav-tab-ask"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "ask"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>✍️ Ask / Type Question</span>
          </button>

          <button
            onClick={() => onTabChange("saved")}
            id="nav-tab-saved"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Saved Answers</span>
            {savedCount > 0 && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === "saved" ? "bg-white/25 text-white" : "bg-sky-100 text-sky-800"
                }`}
              >
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
