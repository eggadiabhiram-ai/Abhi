import { EngineeringBranch, ExamAnswerData, SavedNote, StudentProfile, TopicProgressRecord } from "../types";

const PROFILE_KEY = "jntuh_student_profile";
const SAVED_NOTES_KEY = "jntuh_saved_notes";
const FOLDERS_KEY = "jntuh_saved_folders";
const PROGRESS_KEY = "jntuh_topic_progress";

export const DEFAULT_PROFILE: StudentProfile = {
  branch: "EEE",
  year: "4th Year",
  semester: "IV-I",
  preferredAnswerLength: "5_marks",
  selectedSubjectId: "eee-hve",
};

export const DEFAULT_FOLDERS: string[] = [
  "High Voltage Engineering",
  "Power Electronics",
  "Control Systems",
  "Database Management Systems",
  "Operating Systems",
  "General Engineering",
];

export const INITIAL_SAVED_NOTES: SavedNote[] = [
  {
    id: "sample-townsend",
    question: "Explain Townsend breakdown criterion for gases.",
    subject: "High Voltage Engineering",
    unit: "Unit 1: Breakdown in Gases",
    topic: "Townsend Breakdown Criterion",
    answerLength: "10_marks",
    marksTarget: "10 Marks",
    savedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    folder: "High Voltage Engineering",
    definition:
      "Townsend breakdown criterion defines the critical condition under which the current in a gas becomes self-sustaining without depending on an external initiating source of electrons. (*Self-sustaining means the discharge can continue on its own without needing external light or radiation to supply starting electrons*).",
    principle:
      "Based on cumulative electron avalanche and secondary electron emission. An energetic electron accelerates under a high electric field, collides with neutral gas atoms, and knocks out more electrons (*ionization*). Positive ions produced drift back to the cathode and eject secondary electrons.",
    explanation:
      "### Mechanism of Current Growth\n\n1. **Primary Ionization (Townsend's First Coefficient, $\\alpha$):**\n   - $\\alpha$ is defined as the number of ionizing collisions produced by a single electron moving through a distance of 1 cm in the direction of the electric field.\n   - When an initial photo-current $I_0$ leaves the cathode, the number of electrons grows exponentially across gap distance $d$:\n     $$n = n_0 e^{\\alpha d}$$\n   - Therefore, the current reaching the anode due to primary ionization alone is:\n     $$I = I_0 e^{\\alpha d}$$\n\n2. **Secondary Ionization (Townsend's Second Coefficient, $\\gamma$):**\n   - As the primary avalanche advances, positive ions are formed and move toward the cathode.\n   - When these positive ions strike the cathode with sufficient kinetic energy, they knock out secondary electrons (*secondary emission*).\n   - Taking both primary and secondary processes into account, the total anode current is:\n     $$I = \\frac{I_0 e^{\\alpha d}}{1 - \\gamma (e^{\\alpha d} - 1)}$$\n\n3. **The Townsend Breakdown Criterion:**\n   - In the denominator, as the applied voltage and gap spacing increase, the term $\\gamma(e^{\\alpha d} - 1)$ approaches unity (1).\n   - When:\n     $$\\gamma (e^{\\alpha d} - 1) = 1$$\n   - The denominator becomes zero, which means the current theoretically approaches infinity ($I \\to \\infty$).\n   - Since $e^{\\alpha d} \\gg 1$ in practical high fields, the criterion simplifies to:\n     $$\\gamma e^{\\alpha d} = 1$$\n   - At this exact point, spark breakdown occurs, transitioning the insulating gas into a conducting plasma channel.",
    workingProcess:
      "1. Free electrons accelerated by high electric field collide with gas molecules.\n2. Ionization occurs, multiplying electrons exponentially into an avalanche.\n3. Heavy positive ions drift toward cathode at a lower velocity.\n4. Bombardment of cathode releases secondary electrons.\n5. When 1 primary avalanche creates at least 1 secondary electron to regenerate the process, breakdown is triggered.",
    formula: {
      hasFormula: true,
      equations: [
        "I = \\frac{I_0 e^{\\alpha d}}{1 - \\gamma(e^{\\alpha d} - 1)}",
        "\\gamma(e^{\\alpha d} - 1) = 1 \\quad \\text{(Townsend Criterion)}",
        "\\gamma e^{\\alpha d} \\approx 1 \\quad (\\text{for } e^{\\alpha d} \\gg 1)",
      ],
      symbolMeanings: [
        { symbol: "I_0", meaning: "Initial photoelectric current emitted at cathode (A)" },
        { symbol: "I", meaning: "Total steady anode current (A)" },
        { symbol: "α (alpha)", meaning: "Townsend's primary ionization coefficient (ion pairs/cm)" },
        { symbol: "γ (gamma)", meaning: "Townsend's secondary ionization coefficient" },
        { symbol: "d", meaning: "Electrode gap spacing (cm)" },
      ],
    },
    diagram: {
      needed: true,
      title: "Townsend Current Growth and Avalanche Generation",
      howToDrawInExam:
        "1. Draw two vertical parallel plates: label the left as Cathode (-) and the right as Anode (+).\n2. Draw a dot at the cathode representing initial electron (e-).\n3. Draw diverging dashed arrows toward the anode showing exponential multiplication (avalanche cone).\n4. Draw circular plus signs (+) drifting backwards to the cathode with arrows.\n5. Label α (alpha in the gas gap) and γ (gamma at the cathode surface).",
      svgCode: `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="540" height="220" fill="#0f172a" rx="8" />
        <rect x="40" y="30" width="16" height="160" fill="#3b82f6" rx="3" />
        <text x="48" y="25" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">Cathode (-)</text>
        
        <rect x="484" y="30" width="16" height="160" fill="#ef4444" rx="3" />
        <text x="492" y="25" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">Anode (+)</text>
        
        <!-- Electric field lines -->
        <line x1="56" y1="50" x2="484" y2="50" stroke="#334155" stroke-dasharray="4" />
        <line x1="56" y1="170" x2="484" y2="170" stroke="#334155" stroke-dasharray="4" />
        <text x="270" y="45" fill="#64748b" font-size="11" text-anchor="middle">Electric Field (E = V/d) ───►</text>
        
        <!-- Electron Avalanche Cone -->
        <path d="M 56 110 L 484 70 L 484 150 Z" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="3 3" />
        
        <!-- Electrons in cone -->
        <circle cx="90" cy="110" r="4" fill="#60a5fa" />
        <circle cx="160" cy="102" r="4" fill="#60a5fa" />
        <circle cx="160" cy="118" r="4" fill="#60a5fa" />
        <circle cx="280" cy="95" r="4" fill="#60a5fa" />
        <circle cx="280" cy="110" r="4" fill="#60a5fa" />
        <circle cx="280" cy="125" r="4" fill="#60a5fa" />
        <circle cx="420" cy="85" r="4" fill="#60a5fa" />
        <circle cx="420" cy="100" r="4" fill="#60a5fa" />
        <circle cx="420" cy="115" r="4" fill="#60a5fa" />
        <circle cx="420" cy="135" r="4" fill="#60a5fa" />
        
        <text x="270" y="114" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">Primary Avalanche: n = n₀ e^(αd)</text>
        
        <!-- Secondary feedback -->
        <path d="M 400 165 C 270 200, 150 190, 60 145" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#arrow)" />
        <text x="250" y="195" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Positive Ions drift to Cathode → Secondary emission (γ)</text>
      </svg>`,
    },
    advantages: [
      "Provides analytical mathematical derivation of breakdown in low-pressure, uniform field gas gaps.",
      "Accurately explains dark current, self-sustained glow discharge, and Geiger-Muller tube counter operation.",
    ],
    disadvantages: [
      "Fails to explain rapid breakdown observed at atmospheric pressure (1 atm) where breakdown occurs in 10^-8 seconds (Streamer mechanism is needed instead).",
      "Assumes strictly uniform electric field; does not directly hold for highly divergent point-plane gaps.",
    ],
    applications: [
      "Design of gas-insulated substations (GIS) using SF6 gas.",
      "Voltage calibration and surge arresters.",
      "High voltage spark gap switches.",
    ],
    criticalKeywords: [
      "Townsend breakdown criterion",
      "Primary ionization coefficient (α)",
      "Secondary ionization coefficient (γ)",
      "Electron avalanche",
      "Self-sustaining discharge",
      "Dielectric strength",
      "Spark breakdown",
      "Gas gap spacing (d)",
    ],
    conclusion:
      "The Townsend breakdown criterion $\\gamma(e^{\\alpha d}-1)=1$ establishes the transition threshold from a non-self-sustaining current to a self-sustaining electric spark discharge in gases under uniform electric fields.",
    easyToRemember: [
      "**1. Electric Field creates acceleration**: An energetic electron gets pulled by the electric field toward the positive anode.",
      "**2. Ionization doubles electrons**: The fast electron hits neutral gas atoms, freeing more electrons. This is **Townsend's First Ionization (α)**.",
      "**3. Avalanche forms**: Electrons rapidly multiply in number like a snow avalanche ($e^{\\alpha d}$).",
      "**4. Positive ions hit cathode**: Created positive ions drift back and strike the negative cathode, ejecting new secondary electrons. This is **Secondary Ionization (γ)**.",
      "**5. Self-sustaining spark**: When **γ(e^(αd) - 1) = 1**, the discharge produces enough replacement electrons to sustain itself indefinitely without external light.",
    ],
    quickRevisionSummary: {
      oneLineDefinition:
        "Townsend breakdown criterion is the condition γ(e^(αd)-1)=1 where gas ionization becomes self-sustaining and forms an electric spark.",
      keyFormula: "γ(e^(αd) - 1) = 1  or  γ e^(αd) ≈ 1",
      highYieldPoints: [
        "α = Townsend's primary coefficient (electrons knocked out per cm of path).",
        "γ = Townsend's secondary coefficient (electrons knocked out from cathode per positive ion impact).",
        "Valid primarily for uniform fields and low pressure (pd < 1000 torr-cm).",
        "At atmospheric pressure, Townsend mechanism is superseded by Streamer theory.",
      ],
      criticalKeywords: [
        "Electron avalanche",
        "Primary ionization (α)",
        "Secondary emission (γ)",
        "Self-sustaining discharge",
        "Breakdown voltage",
      ],
    },
    vivaQuestions: [
      {
        q: "What is Townsend's primary ionization coefficient (α)?",
        a: "It is the average number of ionizing collisions produced by an electron moving through a distance of 1 cm along the electric field.",
      },
      {
        q: "What is the Townsend breakdown criterion equation?",
        a: "γ(e^(αd) - 1) = 1, which means at least one secondary electron is produced to replace the original electron.",
      },
      {
        q: "Why does Townsend theory fail at atmospheric pressures?",
        a: "Because observed breakdown times are much faster (~10 ns) than the slow drift time of positive ions back to the cathode. Streamer theory explains high-pressure breakdown.",
      },
    ],
    practiceMcqs: [
      {
        question: "Townsend's first ionization coefficient α represents:",
        options: [
          "Number of electrons emitted from cathode per incident ion",
          "Number of ionizing collisions per cm of travel in the field direction",
          "Ratio of secondary to primary electrons",
          "Current density across the gas gap",
        ],
        correctIndex: 1,
        explanation:
          "Townsend's α is defined as the number of electron-ion pairs generated by one electron per centimeter of drift path.",
      },
      {
        question: "The condition for Townsend breakdown in a uniform gas gap is:",
        options: [
          "α * d = 1",
          "γ * (e^(αd) - 1) = 1",
          "γ * α = d",
          "e^(αd) = 0",
        ],
        correctIndex: 1,
        explanation:
          "When γ(e^(αd) - 1) = 1, the denominator of the current equation becomes zero, signifying an infinite self-sustaining current.",
      },
      {
        question: "Townsend's breakdown mechanism is most applicable under which condition?",
        options: [
          "High gas pressures and long gaps",
          "Uniform field and low gas pressures (low pd values)",
          "Non-uniform divergent fields like lightning",
          "Liquid dielectrics at freezing temperature",
        ],
        correctIndex: 1,
        explanation:
          "Townsend mechanism holds for uniform fields at lower pressure-distance (pd < 1000 torr-cm) products.",
      },
    ],
  },
  {
    id: "sample-thermal-breakdown",
    question: "Explain thermal breakdown in solid dielectrics.",
    subject: "High Voltage Engineering",
    unit: "Unit 2: Breakdown in Solid Dielectrics",
    topic: "Thermal Breakdown in Solid Dielectrics",
    answerLength: "5_marks",
    marksTarget: "5 Marks",
    savedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    folder: "High Voltage Engineering",
    definition:
      "Thermal breakdown occurs in solid dielectrics when the heat generated inside the insulation due to dielectric losses exceeds the heat dissipated to the surroundings, causing localized melting, decomposition, and electrical failure.",
    principle:
      "Governed by thermal equilibrium: $W_{gen} = W_{diss}$. When applied electric field or temperature increases, heat generation increases exponentially. If heat cannot escape, temperature runs away (*thermal runaway*), destroying the dielectric.",
    explanation:
      "### Detailed Mechanism\n\n1. **Heat Generation ($W_{gen}$):**\n   - When an alternating voltage is applied to a solid dielectric, dielectric loss occurs due to dipole polarization and conduction currents.\n   - Heat generated per unit volume is:\n     $$W_{gen} = E^2 \\cdot \\omega \\cdot \\varepsilon_0 \\varepsilon_r \\cdot \\tan \\delta$$\n   - Because electrical conductivity and $\\tan \\delta$ increase exponentially with temperature, $W_{gen}$ rises sharply as the material heats up.\n\n2. **Heat Dissipation ($W_{diss}$):**\n   - Heat is conducted away to the surrounding electrodes and cooling medium according to Fourier's law:\n     $$W_{diss} = k \\cdot A \\cdot (T - T_0)$$\n   - Heat dissipation increases only linearly with temperature difference.\n\n3. **Thermal Instability & Breakdown:**\n   - At lower electric fields, heat generated equals heat dissipated at an equilibrium operating temperature $T_1$.\n   - Above a critical voltage ($V_c$), heat generated exceeds maximum possible heat dissipation at all temperatures. Temperature accelerates uncontrollably until the solid melts or chars, forming a permanent short circuit.",
    formula: {
      hasFormula: true,
      equations: [
        "W_{gen} = E^2 \\cdot \\omega \\cdot \\varepsilon_0 \\varepsilon_r \\cdot \\tan \\delta",
        "W_{diss} = k \\cdot A \\cdot (T - T_0)",
        "\\text{Equilibrium condition: } W_{gen} = W_{diss}",
      ],
      symbolMeanings: [
        { symbol: "E", meaning: "Applied electric field (V/m)" },
        { symbol: "ω", meaning: "Angular frequency = 2πf (rad/s)" },
        { symbol: "εr", meaning: "Relative permittivity of dielectric" },
        { symbol: "tan δ", meaning: "Dielectric loss tangent (dissipation factor)" },
        { symbol: "k", meaning: "Thermal conductivity of the solid (W/m·K)" },
      ],
    },
    diagram: {
      needed: true,
      title: "Heat Generated vs Heat Dissipated Curves in Thermal Breakdown",
      howToDrawInExam:
        "1. Draw X-axis as Temperature (T) and Y-axis as Heat Energy (W).\n2. Draw a straight line starting from ambient temperature T0 showing Heat Dissipated (W_diss).\n3. Draw exponential curves showing Heat Generated (W_gen) for different voltages V1, V2, and Vc (critical voltage).\n4. Mark point of tangency for Vc as the thermal breakdown threshold.",
      svgCode: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="500" height="220" fill="#0f172a" rx="8" />
        <!-- Axes -->
        <line x1="60" y1="180" x2="460" y2="180" stroke="#94a3b8" stroke-width="2" />
        <line x1="60" y1="180" x2="60" y2="20" stroke="#94a3b8" stroke-width="2" />
        <text x="460" y="200" fill="#cbd5e1" font-size="12" text-anchor="end">Temperature (T) ──►</text>
        <text x="40" y="25" fill="#cbd5e1" font-size="12" text-anchor="start" transform="rotate(-90 40 25)">Heat Rate (W) ──►</text>
        
        <!-- Dissipation line -->
        <line x1="100" y1="180" x2="420" y2="40" stroke="#22c55e" stroke-width="2.5" />
        <text x="360" y="35" fill="#4ade80" font-size="11" font-weight="bold">W_diss (Heat Dissipated)</text>
        <text x="100" y="195" fill="#94a3b8" font-size="10">T₀ (Ambient)</text>
        
        <!-- Stable curve V1 -->
        <path d="M 60 170 Q 200 160, 380 90" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4" />
        <text x="390" y="95" fill="#93c5fd" font-size="10">V₁ &lt; Vc (Stable at T₁)</text>
        
        <!-- Critical curve Vc (tangent) -->
        <path d="M 60 160 Q 240 145, 390 40" fill="none" stroke="#f59e0b" stroke-width="2.5" />
        <text x="290" y="70" fill="#fcd34d" font-size="11" font-weight="bold">Vc (Critical Voltage - Tangent)</text>
        
        <!-- Unstable curve V2 > Vc -->
        <path d="M 60 145 Q 220 120, 360 20" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3" />
        <text x="360" y="18" fill="#f87171" font-size="10">V₂ &gt; Vc (Thermal Runaway!)</text>
      </svg>`,
    },
    criticalKeywords: [
      "Thermal breakdown",
      "Dielectric loss",
      "Loss tangent (tan δ)",
      "Heat generation",
      "Heat dissipation",
      "Thermal equilibrium",
      "Critical voltage (Vc)",
      "Thermal runaway",
    ],
    technicalSection: {
      governingLaws: [
        "Fourier's Law of Heat Conduction (dQ/dt = -k·A·dT/dx)",
        "Dielectric Heating Formulation (W_d = E² · ω · ε₀εr · tan δ)",
        "Newton's Law of Cooling",
      ],
      specifications: [
        { parameter: "Dielectric Loss Equation", value: "W = V² · ω · C · tan δ (Watts)", significance: "Internal volumetric heat generation rate" },
        { parameter: "Critical Voltage (Vc)", value: "Vc = √[8k / (ω·ε₀εr·tan δ) · f(T)]", significance: "Upper voltage limit above which thermal equilibrium is impossible" },
        { parameter: "Loss Tangent (tan δ)", value: "0.0005 to 0.005 for XLPE / Oil-impregnated paper", significance: "Key design metric for power cables" },
        { parameter: "Permissible Temperature Limit", value: "90°C continuous (XLPE)", significance: "Safe thermal operating envelope" },
      ],
      standardDerivationSteps: [
        "1. Equate heat generated W_gen = V²·ω·C·tan δ with heat dissipated W_diss = λ(T - T₀)",
        "2. Differentiate both with respect to temperature T to find tangency point: dW_gen/dT = dW_diss/dT",
        "3. Determine the intersection point T₁ (stable equilibrium) and T₂ (unstable threshold)",
        "4. Derive the critical voltage formula Vc where tangency is reached, leading to thermal runaway when V > Vc",
      ],
      engineeringSignificance:
        "Dictates maximum allowable conductor current rating (ampacity) and insulation wall thickness in high-voltage underground cables (e.g. 132kV, 220kV XLPE) and power transformers.",
    },
    easyToRemember: [
      "**1. Insulation heats up**: High AC voltage causes dielectric friction and loss, generating internal heat.",
      "**2. Hotter means more loss**: As the material heats up, its loss factor (tan δ) increases, making it generate heat even faster.",
      "**3. Equilibrium or Explosion**: If cooling surfaces can carry away the heat, temperature stabilizes at $T_1$.",
      "**4. Critical threshold**: If voltage exceeds critical voltage $V_c$, heat generation beats cooling rate. Temperature skyrockets (**thermal runaway**) and melts the insulation.",
    ],
    vivaQuestions: [
      {
        q: "What causes heat generation in a solid dielectric under AC voltage?",
        a: "Dielectric losses given by W = E² · ω · ε₀εr · tan δ, caused by dipole orientation friction and small leakage currents.",
      },
      {
        q: "How does AC breakdown voltage compare to DC breakdown voltage for solid dielectrics?",
        a: "AC breakdown voltage is usually significantly lower than DC because dielectric loss (tan δ) occurs primarily under alternating fields.",
      },
    ],
  },
];

export function loadStudentProfile(): StudentProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error loading profile:", e);
  }
  return DEFAULT_PROFILE;
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile:", e);
  }
}

export function loadSavedNotes(): SavedNote[] {
  try {
    const data = localStorage.getItem(SAVED_NOTES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error loading saved notes:", e);
  }
  // If first time, return initial pre-populated sample notes
  return INITIAL_SAVED_NOTES;
}

export function saveNoteToStorage(note: ExamAnswerData, folderName?: string): SavedNote {
  const notes = loadSavedNotes();
  const folder = folderName || note.folder || note.subject || "General Engineering";
  const newNote: SavedNote = {
    ...note,
    id: note.id || `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: new Date().toISOString(),
    folder,
  };

  const existingIndex = notes.findIndex((n) => n.id === newNote.id || (n.question === newNote.question && n.subject === newNote.subject));
  let updatedNotes: SavedNote[];
  if (existingIndex >= 0) {
    updatedNotes = [...notes];
    updatedNotes[existingIndex] = newNote;
  } else {
    updatedNotes = [newNote, ...notes];
  }

  try {
    localStorage.setItem(SAVED_NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (e) {
    console.error("Error persisting note:", e);
  }

  // Also auto-add folder if new
  ensureFolderExists(folder);
  return newNote;
}

export function deleteSavedNote(id: string): SavedNote[] {
  const notes = loadSavedNotes().filter((n) => n.id !== id);
  try {
    localStorage.setItem(SAVED_NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error("Error deleting note:", e);
  }
  return notes;
}

export function loadFolders(): string[] {
  try {
    const data = localStorage.getItem(FOLDERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error loading folders:", e);
  }
  return DEFAULT_FOLDERS;
}

export function ensureFolderExists(folderName: string): string[] {
  const folders = loadFolders();
  if (!folders.includes(folderName)) {
    const updated = [...folders, folderName];
    try {
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving folders:", e);
    }
    return updated;
  }
  return folders;
}

export function loadTopicProgress(): TopicProgressRecord {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error loading progress:", e);
  }
  // Pre-seed sample topics
  return {
    "eee-hve-u1-t1": "completed",
    "eee-hve-u2-t1": "learning",
    "eee-pe-u1-t1": "not_started",
  };
}

export function updateTopicProgress(topicId: string, status: "not_started" | "learning" | "completed"): TopicProgressRecord {
  const current = loadTopicProgress();
  const updated = { ...current, [topicId]: status };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving topic progress:", e);
  }
  return updated;
}
