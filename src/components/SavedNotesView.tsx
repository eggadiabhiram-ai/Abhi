import React, { useState } from "react";
import { Folder, Search, Trash2, BookOpen, BookmarkCheck, Calendar, ArrowRight, Copy, Check, FolderPlus, Tag } from "lucide-react";
import { ExamAnswerData, SavedNote } from "../types";

interface SavedNotesViewProps {
  notes: SavedNote[];
  folders: string[];
  onOpenNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
  onCreateFolder: (name: string) => void;
}

export const SavedNotesView: React.FC<SavedNotesViewProps> = ({
  notes,
  folders,
  onOpenNote,
  onDeleteNote,
  onCreateFolder,
}) => {
  const [activeFolder, setActiveFolder] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [showAddFolder, setShowAddFolder] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNotes = notes.filter((n) => {
    const matchesFolder = activeFolder === "All" || n.folder === activeFolder;
    const matchesSearch =
      !searchQuery.trim() ||
      n.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.subject && n.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      n.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.criticalKeywords && n.criticalKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFolder && matchesSearch;
  });

  const handleCopyNote = (e: React.MouseEvent, note: SavedNote) => {
    e.stopPropagation();
    const text = `${note.question}\n\n[Definition]\n${note.definition}\n\n[Key Terms]: ${note.criticalKeywords?.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this saved note?")) {
      onDeleteNote(id);
    }
  };

  const handleAddFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setActiveFolder(newFolderName.trim());
      setNewFolderName("");
      setShowAddFolder(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Offline Accessible Library</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              🔖 Saved Notes & Exam Folders
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Review your saved questions, exam-ready notes, formulas, and diagrams anytime even without internet.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved answers & keywords..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Folder Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFolder("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFolder === "All"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Notes ({notes.length})
          </button>

          {folders.map((f) => {
            const count = notes.filter((n) => n.folder === f).length;
            return (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFolder === f
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Folder className="w-3 h-3" />
                <span>{f}</span>
                {count > 0 && <span className="opacity-80 text-[10px]">({count})</span>}
              </button>
            );
          })}

          <button
            onClick={() => setShowAddFolder(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 text-sky-700 hover:bg-sky-50 border border-dashed border-sky-300 transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>New Folder</span>
          </button>
        </div>

        {/* Inline Create Folder Form */}
        {showAddFolder && (
          <form onSubmit={handleAddFolderSubmit} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter new folder name (e.g. Electrical Machines)"
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 w-64"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-bold bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddFolder(false)}
              className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => onOpenNote(note)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-400 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100">
                    {note.folder || "General"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {note.marksTarget || "Exam Note"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCopyNote(e, note)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Copy text"
                    >
                      {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, note.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-900 line-clamp-2 leading-snug">
                  {note.question}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {note.definition}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(note.savedAt).toLocaleDateString()}</span>
                </div>
                <span className="font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Answer <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No Saved Notes in this Folder</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No saved answers match "${searchQuery}".`
              : "When you generate answers, click the 'Save Note' button to store them offline in your custom folders."}
          </p>
        </div>
      )}
    </div>
  );
};
