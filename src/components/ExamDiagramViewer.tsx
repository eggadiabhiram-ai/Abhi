import React, { useState, useRef } from "react";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Copy,
  Check,
  BookOpen,
  FileText,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";
import { DiagramData } from "../types";
import { TRANSFORMER_DIAGRAM_COLLECTION } from "../data/transformerDiagrams";

interface ExamDiagramViewerProps {
  diagram: DiagramData;
  questionText?: string;
  topicText?: string;
}

export const ExamDiagramViewer: React.FC<ExamDiagramViewerProps> = ({
  diagram,
  questionText = "",
  topicText = "",
}) => {
  // Detect if question or topic is related to Transformer
  const isTransformerRelated =
    diagram.diagramType === "transformer" ||
    questionText.toLowerCase().includes("transformer") ||
    topicText.toLowerCase().includes("transformer") ||
    (diagram.title && diagram.title.toLowerCase().includes("transformer"));

  // Merge with rich transformer textbook diagrams if transformer-related and no subViews provided
  const effectiveDiagram: DiagramData =
    isTransformerRelated && (!diagram.subViews || diagram.subViews.length === 0)
      ? {
          ...TRANSFORMER_DIAGRAM_COLLECTION,
          title: diagram.title || TRANSFORMER_DIAGRAM_COLLECTION.title,
          howToDrawInExam: diagram.howToDrawInExam || TRANSFORMER_DIAGRAM_COLLECTION.howToDrawInExam,
        }
      : diagram;

  const subViews = effectiveDiagram.subViews || [];
  const [activeSubViewId, setActiveSubViewId] = useState<string>(
    subViews[0]?.id || "default"
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Active SVG code to display
  const activeSubView = subViews.find((v) => v.id === activeSubViewId);
  const activeSvg = activeSubView?.svgCode || effectiveDiagram.svgCode;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleCopySvg = async () => {
    if (!activeSvg) return;
    try {
      await navigator.clipboard.writeText(activeSvg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadSvg = () => {
    if (!activeSvg) return;
    const blob = new Blob([activeSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `${(activeSubView?.label || effectiveDiagram.title || "exam-diagram")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}.svg`;
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 ${
        isFullscreen ? "fixed inset-4 z-50 overflow-y-auto max-h-[96vh] p-6 shadow-2xl bg-white/98 backdrop-blur-md" : "p-5 sm:p-6"
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Textbook Vector Schematic</span>
              {isTransformerRelated && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold border border-sky-200">
                  Textbook Standard (B.L. Theraja / Bimbhra)
                </span>
              )}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {effectiveDiagram.title} • JNTUH Exam High-Scoring Visual
          </p>
        </div>

        {/* View Controls toolbar */}
        <div className="flex items-center flex-wrap gap-1.5 self-start sm:self-auto">
          {/* Theme switcher (Light textbook / Dark blueprint) */}
          <button
            type="button"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold flex items-center gap-1"
            title={isDarkTheme ? "Switch to White Textbook Paper" : "Switch to Blueprint Mode"}
          >
            {isDarkTheme ? "Paper Theme" : "Blueprint"}
          </button>

          {/* Zoom In / Out / Reset */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 text-[11px] font-mono font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy SVG */}
          <button
            type="button"
            onClick={handleCopySvg}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Copy SVG Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Download SVG */}
          <button
            type="button"
            onClick={handleDownloadSvg}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Download Vector Graphic"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Maximize Diagram"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Multi-View SubView Tabs (e.g. Schematic, Equivalent Circuit, Phasor Diagram, Exam Sketch) */}
      {subViews.length > 1 && (
        <div className="pt-3 pb-2 flex flex-wrap gap-2">
          {subViews.map((sv) => {
            const isActive = sv.id === activeSubViewId;
            return (
              <button
                key={sv.id}
                type="button"
                onClick={() => {
                  setActiveSubViewId(sv.id);
                  setSelectedPartId(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm ring-2 ring-sky-300"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{sv.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* SubView Description */}
      {activeSubView?.description && (
        <p className="text-xs text-slate-600 py-1.5 font-medium leading-relaxed">
          {activeSubView.description}
        </p>
      )}

      {/* Main Diagram Canvas */}
      <div
        className={`rounded-2xl p-4 my-3 overflow-hidden flex items-center justify-center transition-colors ${
          isDarkTheme ? "bg-slate-950 border border-slate-800 text-slate-100" : "bg-slate-50 border border-slate-200 text-slate-900"
        }`}
        style={{ minHeight: isFullscreen ? "520px" : "340px" }}
      >
        <div
          className="w-full max-w-4xl mx-auto transition-transform duration-200 origin-center select-none"
          style={{ transform: `scale(${zoomLevel})` }}
          dangerouslySetInnerHTML={{ __html: activeSvg || "" }}
        />
      </div>

      {/* Key Formulas Box (if available) */}
      {effectiveDiagram.keyFormulas && effectiveDiagram.keyFormulas.length > 0 && (
        <div className="mt-4 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
          <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Key Governing Equations & JNTUH Derivation Markers:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {effectiveDiagram.keyFormulas.map((formula, idx) => (
              <div
                key={idx}
                className="bg-white/90 p-2.5 rounded-lg border border-emerald-200 font-mono font-semibold text-emerald-900 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{formula}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Parts & Labels Legend */}
      {effectiveDiagram.partsLegend && effectiveDiagram.partsLegend.length > 0 && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-600" />
              <span>Diagram Labels & Parts Legend (Exam Key Points)</span>
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              {effectiveDiagram.partsLegend.length} Critical Components
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
            {effectiveDiagram.partsLegend.map((part, pIdx) => {
              const name = part.partName || part.part || `Part ${pIdx + 1}`;
              const desc = part.description || part.function;
              const isSelected = selectedPartId === name;
              return (
                <div
                  key={name}
                  onClick={() => setSelectedPartId(isSelected ? null : name)}
                  className={`p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer transition-colors ${
                    isSelected ? "bg-sky-50/80" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      <span>{name}</span>
                    </span>
                    <p className="text-slate-600 text-[11px] pl-4">{desc}</p>
                  </div>
                  {part.examImportance && (
                    <span className="self-start sm:self-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">
                      {part.examImportance}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step-by-Step 2-Minute Exam Hall Drawing Guide */}
      {effectiveDiagram.howToDrawInExam && (
        <div className="mt-4 p-4 bg-amber-50/80 rounded-xl border border-amber-200/90 text-xs space-y-1.5">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>How to Draw in Exam (Step-by-Step in 2 mins):</span>
          </div>
          <div className="text-slate-800 leading-relaxed whitespace-pre-line pl-1 font-medium text-xs">
            {effectiveDiagram.howToDrawInExam}
          </div>
        </div>
      )}
    </div>
  );
};
