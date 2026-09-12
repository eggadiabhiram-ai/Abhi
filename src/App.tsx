import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ScanQuestionTab } from "./components/ScanQuestionTab";
import { AskQuestionTab } from "./components/AskQuestionTab";
import { AnswerViewer } from "./components/AnswerViewer";
import { SavedNotesView } from "./components/SavedNotesView";
import { SearchModal } from "./components/SearchModal";
import { SettingsModal } from "./components/SettingsModal";
import {
  AnswerLength,
  ExamAnswerData,
  SavedNote,
  StudentProfile,
} from "./types";
import {
  DEFAULT_PROFILE,
  deleteSavedNote,
  ensureFolderExists,
  loadFolders,
  loadSavedNotes,
  loadStudentProfile,
  saveNoteToStorage,
  saveStudentProfile,
} from "./services/storage";
import { generateExamAnswer } from "./services/api";
import { Camera, Edit3, Sparkles, AlertCircle, RotateCcw } from "lucide-react";

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<"scan" | "ask" | "saved">("scan");

  // Active answer view state
  const [currentAnswer, setCurrentAnswer] = useState<ExamAnswerData | null>(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Analyzing question against JNTUH R22 syllabus...");
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastGenerationParams, setLastGenerationParams] = useState<{
    question: string;
    subject?: string;
    unit?: string;
    topic?: string;
    answerLength: AnswerLength;
    easyMode?: boolean;
    marksTarget?: string;
  } | null>(null);

  // Pre-filled question from search/quick-pills
  const [prefilledQuestion, setPrefilledQuestion] = useState<string>("");
  const [prefilledSubject, setPrefilledSubject] = useState<string>("");

  // Persistent storage state
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [folders, setFolders] = useState<string[]>([]);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const p = loadStudentProfile();
    setProfile(p);
    setSavedNotes(loadSavedNotes());
    setFolders(loadFolders());
  }, []);

  const handleProfileUpdate = (updated: Partial<StudentProfile>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);
    saveStudentProfile(newProfile);
    showToast(`Updated to ${newProfile.branch} - Sem ${newProfile.semester}`);
  };

  // Generation flow
  const handleGenerateAnswer = async (params: {
    question: string;
    subject?: string;
    unit?: string;
    topic?: string;
    answerLength: AnswerLength;
    easyMode?: boolean;
    marksTarget?: string;
  }) => {
    setIsLoadingAnswer(true);
    setApiError(null);
    setLastGenerationParams(params);
    setLoadingMessage("Identifying technical terminology and JNTUH mark rubric...");

    try {
      const result = await generateExamAnswer({
        question: params.question,
        subject: params.subject,
        branch: profile.branch,
        year: profile.year,
        semester: profile.semester,
        unit: params.unit,
        topic: params.topic,
        answerLength: params.answerLength,
        easyMode: params.easyMode,
      });

      // Augment with marks target if suggested
      if (params.marksTarget && !result.marksTarget) {
        result.marksTarget = params.marksTarget;
      }

      setCurrentAnswer(result);
    } catch (err: any) {
      console.error("Answer generation failed:", err);
      setApiError(err.message || "Failed to generate exam answer. Please check connection and try again.");
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  // Regeneration for different marks (e.g. 5-mark vs 10-mark button in AnswerViewer)
  const handleRegenerateLength = (newLength: AnswerLength) => {
    if (!currentAnswer) return;
    handleGenerateAnswer({
      question: currentAnswer.question,
      subject: currentAnswer.subject,
      unit: currentAnswer.unit,
      topic: currentAnswer.topic,
      answerLength: newLength,
    });
  };

  // Save note action
  const handleSaveAnswer = (answerToSave: ExamAnswerData, folderName: string) => {
    const saved = saveNoteToStorage(answerToSave, folderName);
    setSavedNotes(loadSavedNotes());
    setFolders(loadFolders());
    setCurrentAnswer(saved);
    showToast(`Saved to folder "${folderName}"`);
  };

  const handleDeleteSavedNote = (id: string) => {
    const updated = deleteSavedNote(id);
    setSavedNotes(updated);
    if (currentAnswer?.id === id) {
      setCurrentAnswer(null);
    }
    showToast("Answer removed from saved list");
  };

  const handleCreateFolder = (name: string) => {
    const updated = ensureFolderExists(name);
    setFolders(updated);
    showToast(`Folder "${name}" created`);
  };

  const handleSelectSearchResult = (params: { question: string; subject?: string; unit?: string }) => {
    handleGenerateAnswer({
      question: params.question,
      subject: params.subject,
      unit: params.unit,
      answerLength: profile.preferredAnswerLength || "5_marks",
    });
  };

  const isCurrentAnswerSaved = Boolean(
    currentAnswer && savedNotes.some((n) => n.id === currentAnswer.id || (n.question === currentAnswer.question && n.subject === currentAnswer.subject))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <Header
        profile={profile}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentAnswer(null);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onProfileUpdate={handleProfileUpdate}
        savedCount={savedNotes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error Alert Banner */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-0.5">Could not generate answer</p>
                <p className="leading-relaxed">{apiError}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {lastGenerationParams && (
                <button
                  onClick={() => handleGenerateAnswer(lastGenerationParams)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry
                </button>
              )}
              <button
                onClick={() => setApiError(null)}
                className="px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:text-rose-900 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Global Loading Overlay */}
        {isLoadingAnswer && (
          <div className="mb-6 bg-white border border-sky-200 rounded-2xl p-8 shadow-sm text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 mx-auto animate-pulse">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Generating Exam-Ready Notes...
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                {loadingMessage}
              </p>
            </div>
            <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-sky-500 to-indigo-600 animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* If an answer is currently loaded, display AnswerViewer */}
        {currentAnswer ? (
          <div className="space-y-4">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setCurrentAnswer(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl border border-sky-200 transition-colors shadow-2xs cursor-pointer"
              >
                <span>← Ask or Scan Another Question</span>
              </button>
            </div>

            <AnswerViewer
              answer={currentAnswer}
              onReGenerateWithLength={handleRegenerateLength}
              onSaveAnswer={handleSaveAnswer}
              isSaved={isCurrentAnswerSaved}
              folders={folders}
              onBack={() => setCurrentAnswer(null)}
              isLoadingAction={isLoadingAnswer}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Mode Switcher for Scan vs Ask */}
            {activeTab !== "saved" && (
              <div className="flex items-center justify-center">
                <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-300/80 shadow-2xs">
                  <button
                    onClick={() => setActiveTab("scan")}
                    id="subtab-scan-btn"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "scan"
                        ? "bg-white text-sky-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>📷 Scan Photo Copy</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("ask")}
                    id="subtab-ask-btn"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "ask"
                        ? "bg-white text-sky-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>✍️ Ask / Type Question</span>
                  </button>
                </div>
              </div>
            )}

            {/* View 1: Scan Question Photo */}
            {activeTab === "scan" && (
              <ScanQuestionTab
                profile={profile}
                onSelectQuestionToAnswer={handleGenerateAnswer}
                onSwitchToManual={() => setActiveTab("ask")}
              />
            )}

            {/* View 2: Ask / Type Question */}
            {activeTab === "ask" && (
              <AskQuestionTab
                profile={profile}
                onGenerateAnswer={handleGenerateAnswer}
                isLoading={isLoadingAnswer}
                initialQuestion={prefilledQuestion}
                initialSubject={prefilledSubject}
              />
            )}

            {/* View 3: Saved Answers */}
            {activeTab === "saved" && (
              <SavedNotesView
                notes={savedNotes}
                folders={folders}
                onOpenNote={(note) => {
                  setCurrentAnswer(note);
                }}
                onDeleteNote={handleDeleteSavedNote}
                onCreateFolder={handleCreateFolder}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            JNTUH R22 Study AI — Instant Exam Answers & Photo Copy Scanner
          </p>
          <p className="text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Scan any exam question photo copy or type questions for complete JNTUH evaluation-ready answers with diagrams and technical specifications.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        savedNotes={savedNotes}
        onSelectResult={handleSelectSearchResult}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => {
          setProfile(updated);
          saveStudentProfile(updated);
          showToast("Profile & branch settings saved");
        }}
      />

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
