export type EngineeringBranch = "EEE" | "ECE" | "CSE" | "IT" | "Mechanical" | "Civil";

export type Year = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";

export type Semester = "I-I" | "I-II" | "II-I" | "II-II" | "III-I" | "III-II" | "IV-I" | "IV-II";

export type AnswerLength = "very_short" | "short" | "5_marks" | "10_marks" | "revision";

export type TopicStatus = "not_started" | "learning" | "completed";

export interface StudentProfile {
  branch: EngineeringBranch;
  year: Year;
  semester: Semester;
  preferredAnswerLength: AnswerLength;
  selectedSubjectId?: string;
}

export interface JntuhTopic {
  id: string;
  name: string;
  description?: string;
  keywords: string[];
  isImportant?: boolean;
  marksWeightage?: "2 Marks" | "5 Marks" | "10 Marks";
  hasDiagram?: boolean;
  isNumerical?: boolean;
}

export type SubjectCategory = "BS" | "ES" | "PC" | "HS" | "PE" | "OE" | "MC";

export interface AllocatedSubject {
  id: string;
  code: string;
  name: string;
  branch: EngineeringBranch;
  year: Year;
  semester: Semester;
  category: SubjectCategory;
  credits: number;
  ltp: string;
  type: "Theory" | "Practical" | "Mandatory Course";
  hasFullSyllabus?: boolean;
  description?: string;
  keyTopics?: string[];
  electiveOptions?: string[];
  notes?: string;
}

export interface JntuhUnit {
  unitNumber: number;
  title: string;
  topics: JntuhTopic[];
  importantQuestions?: {
    twoMarks?: string[];
    fiveMarks?: string[];
    tenMarks?: string[];
    numerical?: string[];
    viva?: string[];
  };
}

export interface JntuhSubject {
  id: string;
  code: string;
  name: string;
  branch: EngineeringBranch;
  year?: Year;
  semester: Semester;
  category?: SubjectCategory;
  credits?: number;
  ltp?: string;
  units: JntuhUnit[];
  folderName: string;
}

export interface FormulaData {
  hasFormula: boolean;
  equations: string[];
  symbolMeanings?: { symbol: string; meaning: string }[];
}

export interface NumericalData {
  isNumerical: boolean;
  givenData?: string[];
  toFind?: string;
  formulaUsed?: string;
  calculationSteps?: string[];
  finalAnswer?: string;
  resultInterpretation?: string;
}

export interface DiagramSubView {
  id: string;
  label: string;
  svgCode: string;
  description: string;
  howToDrawNotes?: string;
}

export interface DiagramData {
  needed: boolean;
  title: string;
  howToDrawInExam: string;
  svgCode?: string;
  diagramType?: "transformer" | "schematic" | "circuit" | "flowchart" | "generic";
  subViews?: DiagramSubView[];
  keyFormulas?: string[];
  partsLegend?: {
    part: string;
    function: string;
    examImportance?: string;
    partName?: string;
    description?: string;
  }[];
}

export interface VivaItem {
  q: string;
  a: string;
}

export interface McqItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuickRevisionSummary {
  oneLineDefinition: string;
  keyFormula?: string;
  highYieldPoints: string[];
  criticalKeywords: string[];
}

export interface ExamAnswerData {
  id?: string;
  question: string;
  subject?: string;
  unit?: string;
  topic?: string;
  answerLength: AnswerLength;
  marksTarget?: string;
  definition: string;
  principle?: string;
  explanation: string;
  workingProcess?: string;
  formula?: FormulaData;
  numerical?: NumericalData;
  diagram?: DiagramData;
  advantages?: string[];
  disadvantages?: string[];
  applications?: string[];
  criticalKeywords: string[];
  technicalSection?: {
    specifications?: { parameter: string; value: string; significance?: string }[];
    governingLaws?: string[];
    standardDerivationSteps?: string[];
    engineeringSignificance?: string;
  };
  conclusion?: string;
  easyToRemember?: string[];
  quickRevisionSummary?: QuickRevisionSummary;
  vivaQuestions?: VivaItem[];
  practiceMcqs?: McqItem[];
  savedAt?: string;
  folder?: string;
  notes?: string;
}

export interface ScannedQuestionItem {
  id: string;
  number: number;
  text: string;
  marksSuggestion?: string;
  suggestedSubject?: string;
  suggestedBranch?: EngineeringBranch;
  topic?: string;
  isNumerical?: boolean;
}

export interface ScanResult {
  unreadable: boolean;
  message?: string;
  detectedText?: string;
  questions: ScannedQuestionItem[];
  notes?: string;
}

export interface SavedNote extends ExamAnswerData {
  id: string;
  savedAt: string;
  folder: string;
}

export interface TopicProgressRecord {
  [topicId: string]: TopicStatus;
}
