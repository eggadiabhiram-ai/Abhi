import { EngineeringBranch, JntuhSubject, Semester } from "../types";

export const JNTUH_BRANCHES: { id: EngineeringBranch; name: string; code: string }[] = [
  { id: "EEE", name: "Electrical & Electronics Engineering", code: "02" },
  { id: "ECE", name: "Electronics & Communication Engineering", code: "04" },
  { id: "CSE", name: "Computer Science & Engineering", code: "05" },
  { id: "IT", name: "Information Technology", code: "12" },
  { id: "Mechanical", name: "Mechanical Engineering", code: "03" },
  { id: "Civil", name: "Civil Engineering", code: "01" },
];

export const JNTUH_SEMESTERS: { id: Semester; label: string; year: string }[] = [
  { id: "I-I", label: "1st Year 1st Sem", year: "1st Year" },
  { id: "I-II", label: "1st Year 2nd Sem", year: "1st Year" },
  { id: "II-I", label: "2nd Year 1st Sem", year: "2nd Year" },
  { id: "II-II", label: "2nd Year 2nd Sem", year: "2nd Year" },
  { id: "III-I", label: "3rd Year 1st Sem", year: "3rd Year" },
  { id: "III-II", label: "3rd Year 2nd Sem", year: "3rd Year" },
  { id: "IV-I", label: "4th Year 1st Sem", year: "4th Year" },
  { id: "IV-II", label: "4th Year 2nd Sem", year: "4th Year" },
];

export const JNTUH_SUBJECTS: JntuhSubject[] = [
  // EEE: 1st Year 1st Sem (I-I) - Basic Electrical Engineering
  {
    id: "eee-1-1-ee104es",
    code: "EE104ES",
    name: "Basic Electrical Engineering (BEE)",
    branch: "EEE",
    year: "1st Year",
    semester: "I-I",
    category: "ES",
    credits: 3,
    ltp: "3-0-0",
    folderName: "Basic Electrical Engineering",
    units: [
      {
        unitNumber: 1,
        title: "D.C. Circuits",
        topics: [
          {
            id: "bee-u1-t1",
            name: "Kirchhoff's Laws (KCL & KVL) & Nodal/Mesh Analysis",
            keywords: ["KCL", "KVL", "Mesh analysis", "Nodal analysis", "Supermesh", "Supernode", "Current source", "Voltage source"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u1-t2",
            name: "Thevenin's and Norton's Theorems",
            keywords: ["Thevenin voltage Vth", "Thevenin resistance Rth", "Norton current IN", "Equivalence", "Independent and Dependent sources"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
          {
            id: "bee-u1-t3",
            name: "Superposition and Maximum Power Transfer Theorems",
            keywords: ["Superposition theorem", "Linear bilateral network", "Max power transfer theorem", "RL = Rth", "50% efficiency"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "State Kirchhoff's Current Law and Kirchhoff's Voltage Law.",
            "Define active and passive circuit elements with two examples each.",
            "State Maximum Power Transfer Theorem for DC resistive circuits.",
            "What is the condition for maximum power transfer in a DC network?",
          ],
          fiveMarks: [
            "Explain the steps to find Thevenin's equivalent circuit across a given load resistor.",
            "State and prove Superposition theorem with an illustrative DC network.",
            "Differentiate between mesh current method and nodal voltage method.",
          ],
          tenMarks: [
            "State Thevenin's and Norton's theorems. Find the load current through a 10 ohm resistor in a bridge circuit using Thevenin's theorem.",
            "Prove that the maximum power transfer efficiency is 50% when load resistance equals Thevenin resistance.",
          ],
          numerical: [
            "For a bridge network with R1=2Ω, R2=4Ω, R3=3Ω, R4=5Ω connected to a 20V DC source, find the current through a 10Ω detector branch using Thevenin's theorem.",
          ],
          viva: [
            "Can Superposition theorem be applied to power calculations? Why not? (Power is non-linear P = I^2 R).",
            "What is the internal resistance of an ideal voltage source and ideal current source? (Zero and Infinity).",
          ],
        },
      },
      {
        unitNumber: 2,
        title: "1-Phase A.C. Circuits",
        topics: [
          {
            id: "bee-u2-t1",
            name: "Sinusoidal Alternating Quantities (RMS, Average & Form Factor)",
            keywords: ["Peak value", "RMS value", "Average value", "Form factor 1.11", "Peak factor 1.414", "Phase difference", "Phasor representation"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u2-t2",
            name: "Series R-L-C Circuit and Power Factor",
            keywords: ["Series RLC", "Inductive reactance XL", "Capacitive reactance XC", "Impedance Z", "Active power P = VI cosφ", "Reactive power Q = VI sinφ", "Apparent power S = VI"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
          {
            id: "bee-u2-t3",
            name: "Series and Parallel Resonance",
            keywords: ["Resonance condition", "Resonant frequency fr = 1/(2π√LC)", "Quality factor Q", "Bandwidth", "Half-power frequencies"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Define RMS value and Form factor of an alternating sinusoidal waveform.",
            "Why is power factor improvement necessary in power systems?",
            "Define resonance in series RLC circuits and state resonant frequency.",
          ],
          fiveMarks: [
            "Derive the relationship between RMS value and peak value for a sinusoidal current waveform.",
            "Explain active, reactive and apparent power with the power triangle.",
            "Draw the phasor diagram of a series R-L circuit and write impedance equation.",
          ],
          tenMarks: [
            "A series RLC circuit with R=10Ω, L=0.1H, C=50μF is connected to a 230V, 50Hz AC supply. Calculate impedance, current, power factor, active power, reactive power and draw the phasor diagram.",
            "Derive the expression for resonant frequency, bandwidth and quality factor (Q-factor) for a series R-L-C circuit.",
          ],
          numerical: [
            "A resistance of 12Ω and an inductance of 0.15H are connected in series across 230V, 50Hz supply. Find (i) inductive reactance, (ii) impedance, (iii) current, (iv) power factor, (v) voltage drop across R and L.",
          ],
          viva: [
            "What is the form factor of a pure sine wave? (1.11)",
            "What happens to current at resonance in a series RLC circuit? (It reaches maximum value I = V/R).",
          ],
        },
      },
      {
        unitNumber: 3,
        title: "Transformers (Single-Phase)",
        topics: [
          {
            id: "bee-u3-t1",
            name: "Working Principle, Construction & EMF Equation of Transformer",
            keywords: ["Faraday's law of mutual induction", "Laminated silicon steel core", "Core type vs Shell type", "Primary winding N1", "Secondary winding N2", "EMF equation E = 4.44 f N Φm", "Transformation ratio k = V2/V1"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u3-t2",
            name: "Ideal Transformer, Practical Transformer & Phasor Diagram on Load",
            keywords: ["Ideal transformer assumptions", "No-load current I0", "Magnetizing current Im", "Core loss current Iw", "Phasor diagram on lagging load", "Voltage drop I1R1 and jI1X1"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u3-t3",
            name: "Equivalent Circuit of Transformer",
            keywords: ["Equivalent circuit referred to primary", "R01 = R1 + R2/k^2", "X01 = X1 + X2/k^2", "Shunt branch R0 and Xm", "Approximate equivalent circuit"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u3-t4",
            name: "Open Circuit (O.C.) and Short Circuit (S.C.) Tests",
            keywords: ["OC test at rated voltage", "Iron losses Pi (hysteresis + eddy current)", "SC test at rated current", "Full load copper losses Pcu", "Calculation of equivalent circuit parameters"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
          {
            id: "bee-u3-t5",
            name: "Efficiency, Maximum Efficiency Condition & Voltage Regulation",
            keywords: ["Efficiency formula", "Condition for max efficiency: Pi = Pcu", "Voltage regulation formula", "Lagging vs leading power factor regulation", "All-day efficiency"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "State the working principle of a single-phase transformer.",
            "Why is the core of a transformer laminated? (To minimize eddy current loss).",
            "State the EMF equation of a single-phase transformer and define each term.",
            "What is the condition for maximum efficiency in a transformer? (Iron loss = Copper loss).",
            "Why is transformer rating expressed in kVA rather than kW? (Losses depend on voltage and current, independent of power factor).",
            "Distinguish between core-type and shell-type transformers.",
          ],
          fiveMarks: [
            "Derive the EMF equation of a single-phase transformer E = 4.44 f N Φm.",
            "Explain the difference between an ideal transformer and a practical transformer.",
            "Describe the Open Circuit (OC) test on a single-phase transformer and how iron loss is determined.",
            "Describe the Short Circuit (SC) test on a single-phase transformer and how full-load copper loss is determined.",
            "Define voltage regulation of a transformer. Write expressions for lagging, leading, and unity power factors.",
          ],
          tenMarks: [
            "Explain the construction and working principle of a single-phase transformer with neat textbook sketches of core-type and shell-type construction, windings, and mutual flux path. Derive the EMF equation.",
            "Draw and explain the exact equivalent circuit of a single-phase transformer referred to primary side. How are the circuit parameters obtained from OC and SC test data?",
            "Draw the complete phasor diagram of a practical single-phase transformer on inductive (lagging) load. Explain all vector relations step-by-step.",
            "A 20 kVA, 2000/200 V, 50 Hz single phase transformer has iron loss of 250 W and full-load copper loss of 400 W. Calculate (i) efficiency at full-load 0.8 pf lagging, (ii) efficiency at half-load 0.8 pf lagging, (iii) load kVA for maximum efficiency, (iv) maximum efficiency at 0.8 pf.",
          ],
          numerical: [
            "A 25 kVA, 2200/220 V, 50 Hz transformer gave the following test results:\nO.C. Test (LV side): 220 V, 1.2 A, 110 W\nS.C. Test (HV side): 90 V, 10 A, 350 W\nCalculate the parameters of equivalent circuit referred to HV side and find efficiency at full load 0.8 pf lagging.",
            "A 50 kVA transformer has an efficiency of 98% at full-load, 0.8 pf lagging and also at half-load, 0.8 pf lagging. Determine its iron loss and full-load copper loss.",
          ],
          viva: [
            "Can a transformer operate on DC supply? (No! Without alternating flux dΦ/dt = 0, no back-EMF is induced, primary draws dangerously high DC current and burns).",
            "What type of steel is used for transformer cores? (Cold Rolled Grain Oriented (CRGO) silicon steel).",
            "What is the function of the conservator tank and silica gel breather?",
            "What is Buchholz relay and where is it installed?",
          ],
        },
      },
      {
        unitNumber: 4,
        title: "Electrical Machines",
        topics: [
          {
            id: "bee-u4-t1",
            name: "D.C. Generator Working Principle and EMF Equation",
            keywords: ["Faraday's law of electromagnetic induction", "Fleming's right-hand rule", "Commutator action", "Armature winding", "EMF equation Eg = (Φ Z N P) / (60 A)"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u4-t2",
            name: "D.C. Motor Principle, Back EMF and Torque Equation",
            keywords: ["Fleming's left-hand rule", "Lorentz force F = BIL", "Back EMF Eb = V - IaRa", "Torque equation T = (1 / 2π) * (Φ Z P Ia / A)", "Characteristics of DC Shunt & Series motors"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u4-t3",
            name: "Three-Phase Induction Motor Principle & Slip",
            keywords: ["Rotating Magnetic Field (RMF)", "Synchronous speed Ns = 120f/P", "Slip s = (Ns - N)/Ns", "Squirrel cage vs Slip ring rotor", "Torque-slip characteristics"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "State Fleming's Left Hand Rule and Right Hand Rule.",
            "What is the significance of Back EMF in a DC Motor?",
            "Define slip of a 3-phase induction motor.",
            "Why is 3-phase induction motor called a generalized transformer?",
          ],
          fiveMarks: [
            "Derive the EMF equation of a DC generator.",
            "Explain the production of rotating magnetic field (RMF) in a 3-phase induction motor.",
            "Draw and explain the torque-slip characteristics of a 3-phase induction motor.",
          ],
          tenMarks: [
            "Explain the construction and working principle of a DC motor with neat diagram. Derive the torque equation.",
            "Describe the principle of operation of a 3-phase squirrel cage and slip ring induction motor with neat sketches.",
          ],
          numerical: [
            "A 4-pole DC generator having wave-wound armature with 51 slots and 20 conductors per slot runs at 1500 rpm. If flux per pole is 0.01 Wb, calculate generated EMF.",
          ],
          viva: [
            "Why cannot an induction motor run at synchronous speed? (If N = Ns, relative speed is zero, no EMF is induced in rotor, and torque drops to zero).",
            "What is the function of split-ring commutator in DC machine? (Converts AC generated in armature to unidirectional DC in external circuit).",
          ],
        },
      },
      {
        unitNumber: 5,
        title: "Electrical Installations & Switchgear",
        topics: [
          {
            id: "bee-u5-t1",
            name: "Components of Low Tension (LT) Switchgear (MCB, MCCB, ELCB)",
            keywords: ["Switch Fuse Unit (SFU)", "Miniature Circuit Breaker (MCB)", "Molded Case Circuit Breaker (MCCB)", "Earth Leakage Circuit Breaker (ELCB)", "Residual Current Circuit Breaker (RCCB)"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u5-t2",
            name: "Earthing and Safety Measures (Pipe & Plate Earthing)",
            keywords: ["Pipe earthing", "Plate earthing", "GI pipe and electrode", "Charcoal and salt layers", "Earth resistance measurement", "Electric shock prevention"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "bee-u5-t3",
            name: "Batteries (Lead-Acid & Lithium-Ion Characteristics)",
            keywords: ["Lead-acid battery chemical reactions", "Specific gravity of electrolyte", "Ah and Wh efficiency", "Lithium-ion battery charging cycles"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
        ],
        importantQuestions: {
          twoMarks: [
            "What is the necessity of equipment earthing?",
            "Differentiate between MCB and fuse.",
            "What is the purpose of charcoal and salt in an earthing pit?",
            "Define Ampere-hour (Ah) efficiency of a storage battery.",
          ],
          fiveMarks: [
            "Explain the construction and working of an Earth Leakage Circuit Breaker (ELCB).",
            "Compare Lead-Acid and Lithium-Ion batteries based on energy density, cycle life, and maintenance.",
          ],
          tenMarks: [
            "Explain pipe earthing and plate earthing with neat, labelled engineering diagrams as per Indian Electricity (IE) rules.",
            "Describe the construction and working of a thermal-magnetic Miniature Circuit Breaker (MCB) with neat diagram.",
          ],
        },
      },
    ],
  },

  // EEE: 2nd Year 1st Sem (II-I) - Electrical Machines - I (DC Machines & Transformers)
  {
    id: "eee-2-1-ee301pc",
    code: "EE301PC",
    name: "Electrical Machines - I (DC Machines & Transformers)",
    branch: "EEE",
    year: "2nd Year",
    semester: "II-I",
    category: "PC",
    credits: 4,
    ltp: "3-1-0",
    folderName: "Electrical Machines - I",
    units: [
      {
        unitNumber: 1,
        title: "Single Phase Transformers",
        topics: [
          {
            id: "em1-u1-t1",
            name: "Construction, Types of Core & Principle of Transformer",
            keywords: ["Core type transformer", "Shell type transformer", "Berry type", "Silicon steel stampings (0.35-0.5 mm)", "Laminations & insulation varnish", "Windings (concentric vs sandwich)", "Faraday's law of mutual induction"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u1-t2",
            name: "EMF Equation & Transformation Ratio (k)",
            keywords: ["EMF equation E = 4.44 f N Φm", "Maximum flux density Bm", "Core area A", "Turns ratio N1/N2", "Voltage ratio V1/V2", "Current ratio I2/I1", "Transformation ratio k"],
            isImportant: true,
            marksWeightage: "5 Marks",
            isNumerical: true,
          },
          {
            id: "em1-u1-t3",
            name: "Transformer on No-Load & Phasor Diagram",
            keywords: ["No-load current I0", "Magnetizing current Im", "Core loss component Iw", "No-load power factor cos φ0", "No-load phasor diagram", "Core hysteresis and eddy currents"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u1-t4",
            name: "Transformer on Load & Phasor Diagram (Lagging, Leading, Unity)",
            keywords: ["Primary mmf balances secondary mmf N1 I2' = N2 I2", "Total primary current I1 = I0 + I2'", "Primary impedance drop I1(R1 + jX1)", "Secondary terminal voltage V2 = E2 - I2(R2 + jX2)", "Phasor diagram lagging pf", "Phasor diagram leading pf"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u1-t5",
            name: "Equivalent Circuit Referred to Primary and Secondary",
            keywords: ["Exact equivalent circuit", "Approximate equivalent circuit", "Equivalent resistance R01 & R02", "Equivalent reactance X01 & X02", "Shunt branch R0 and Xm"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Why is the core of a transformer made of high silicon steel stampings?",
            "What is meant by 'all-day efficiency' of a distribution transformer?",
            "What is the physical meaning of leakage reactance in a transformer winding?",
            "Why does a transformer draw no-load current I0 at low power factor?",
          ],
          fiveMarks: [
            "Derive the EMF equation of a single-phase transformer and find the ratio of EMF per turn.",
            "Compare core-type and shell-type transformers in terms of construction, cooling, mechanical strength, and leakage reactance.",
            "Draw the complete phasor diagram of a transformer supplying a capacitive (leading power factor) load.",
          ],
          tenMarks: [
            "Explain the construction and working principle of a core-type and shell-type transformer with neat diagrams. Highlight magnetic core construction, lamination thickness, and winding arrangements.",
            "Develop the exact equivalent circuit of a single-phase transformer. Show how it can be simplified to the approximate equivalent circuit referred to primary and secondary windings.",
            "Draw the complete phasor diagram of a single-phase practical transformer on inductive (lagging) load with full explanation of every vector and voltage drop equation.",
          ],
          numerical: [
            "A 100 kVA, 6600/330 V, 50 Hz single-phase transformer has 80 turns on the secondary. Calculate (i) primary turns, (ii) maximum flux in core, (iii) primary and secondary full-load currents.",
          ],
          viva: [
            "What is the frequency of flux in the core if supply frequency is 50 Hz? (50 Hz).",
            "Why are transformer windings called high voltage (HV) and low voltage (LV) rather than primary and secondary? (Either side can act as primary depending on whether it steps up or steps down).",
          ],
        },
      },
      {
        unitNumber: 2,
        title: "Testing & Performance of Transformers",
        topics: [
          {
            id: "em1-u2-t1",
            name: "Open Circuit (O.C.) and Short Circuit (S.C.) Tests",
            keywords: ["OC test on LV side rated voltage", "Core losses Pi", "SC test on HV side rated current", "Full-load copper loss Pcu", "Determination of R0, Xm, R01, X01"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
          {
            id: "em1-u2-t2",
            name: "Sumpner's (Back-to-Back) Test",
            keywords: ["Two identical transformers", "Primaries in parallel across rated voltage", "Secondaries in phase opposition", "Regulating transformer for full load current", "Heat run test without loading"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u2-t3",
            name: "Efficiency, Maximum Efficiency & All-Day Efficiency",
            keywords: ["Efficiency formula", "Condition for maximum efficiency Wcu = Wi", "Fraction of full load for max efficiency x = √(Wi / Wcu_fl)", "All-day efficiency = (Output in kWh) / (Input in kWh) over 24 hours"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
          {
            id: "em1-u2-t4",
            name: "Voltage Regulation & Parallel Operation",
            keywords: ["Voltage regulation % = (V02 - V2)/V02 * 100", "Regulation expression (I2 R02 cos φ ± I2 X02 sin φ)/V02", "Zero regulation condition tan φ = -R02/X02 (leading pf)", "Conditions for parallel operation of 1-phase transformers"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Why is the OC test conducted on the LV side of a transformer?",
            "Why is the SC test conducted on the HV side of a transformer?",
            "What is Sumpner's test and what is its main advantage?",
            "What are the essential conditions for parallel operation of two single-phase transformers?",
          ],
          fiveMarks: [
            "Derive the condition for zero voltage regulation in a single phase transformer.",
            "Explain why all-day efficiency is lower than ordinary commercial efficiency for a distribution transformer.",
            "Explain how polarity test is carried out on a single phase transformer.",
          ],
          tenMarks: [
            "Describe the Sumpner's (back-to-back) test on two identical single-phase transformers with neat circuit diagram. Explain how iron losses and copper losses are measured simultaneously under full-load conditions with minimal power consumption.",
            "A 40 kVA, 2000/250 V, 50 Hz transformer has iron loss of 450 W and full-load copper loss of 850 W. Calculate (i) efficiency at full load and 0.8 pf lagging, (ii) efficiency at 3/4 load and 0.8 pf lagging, (iii) maximum efficiency and the load at which it occurs.",
          ],
          numerical: [
            "A 10 kVA, 200/400 V, 50 Hz single-phase transformer gave the following results:\nOC test: 200 V, 1.3 A, 120 W (LV side)\nSC test: 22 V, 30 A, 200 W (HV side)\nCalculate the parameters of equivalent circuit referred to LV side and calculate efficiency at full load and half load at 0.8 pf lagging.",
          ],
          viva: [
            "Why does zero regulation occur only at leading power factor? (Because capacitive current produces voltage rise compensating IR and IX drops).",
            "What happens if two transformers with unequal voltage ratios are operated in parallel? (Circulating current flows between them even at no load, overheating windings).",
          ],
        },
      },
      {
        unitNumber: 3,
        title: "Auto-Transformers & 3-Phase Transformers",
        topics: [
          {
            id: "em1-u3-t1",
            name: "Auto-Transformer Principle & Copper Saving",
            keywords: ["Single winding shared between primary & secondary", "Conducted and transformed power", "Copper saving formula (Weight of Cu in auto / Weight of Cu in 2-winding) = 1 - k", "Applications of variac and motor starters"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u3-t2",
            name: "Three-Phase Transformer Connections",
            keywords: ["Star-Star (Y-Y)", "Delta-Delta (Δ-Δ)", "Star-Delta (Y-Δ)", "Delta-Star (Δ-Y)", "Open delta (V-V) connection", "30° phase shift in Y-Δ"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u3-t3",
            name: "Scott Connection (3-Phase to 2-Phase Conversion)",
            keywords: ["Scott connection", "Main transformer with center tap (50%)", "Teaser transformer with 86.6% (√3/2) tapping", "Balanced 2-phase supply from balanced 3-phase supply", "Electric furnace applications"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u3-t4",
            name: "Tertiary Windings & Tap Changers",
            keywords: ["Tertiary winding functions: suppress 3rd harmonics, supply substation auxiliary load", "No-load tap changers", "On-load tap changer (OLTC) with transition resistors"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "What is an auto-transformer? State one advantage and one disadvantage over a two-winding transformer.",
            "Write the expression for saving of copper in an auto-transformer.",
            "What is the purpose of a tertiary winding in a star-star 3-phase transformer?",
            "What is the tapping percentage of the teaser transformer in Scott connection? (86.6% or √3/2).",
          ],
          fiveMarks: [
            "Prove that the saving of copper in an auto-transformer compared to a two-winding transformer is k times the weight of copper in two-winding transformer.",
            "Explain open-delta (V-V) connection. What is the capacity of a V-V bank compared to a Δ-Δ bank? (57.7% of Δ-Δ bank).",
            "Explain the working of an On-Load Tap Changer (OLTC) with neat diagram.",
          ],
          tenMarks: [
            "Explain Scott connection of two single-phase transformers for converting 3-phase to 2-phase with neat circuit diagram and phasor diagrams. Prove that balanced 2-phase voltages are obtained when 3-phase balanced supply is applied.",
            "Describe the various 3-phase transformer connections (Star-Star, Delta-Delta, Star-Delta, Delta-Star) with neat wiring and phasor diagrams. Mention advantages, disadvantages, and applications of each.",
          ],
        },
      },
      {
        unitNumber: 4,
        title: "D.C. Generators",
        topics: [
          {
            id: "em1-u4-t1",
            name: "Construction, Armature Windings (Lap & Wave) and EMF Equation",
            keywords: ["Yoke, pole core, pole shoe, field winding, armature core, commutator and brushes", "Lap winding (A = P)", "Wave winding (A = 2)", "EMF equation Eg = (Φ Z N P) / (60 A)"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u4-t2",
            name: "Armature Reaction & Commutation",
            keywords: ["Armature reaction", "Cross-magnetizing effect", "Demagnetizing effect", "Brush shift angle θ", "Compensating windings", "Interpoles / Commutating poles", "Reactance voltage"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u4-t3",
            name: "Characteristics of DC Generators & Critical Resistance",
            keywords: ["No load magnetization curve (OCC)", "Critical field resistance Rc", "Critical speed Nc", "External and internal characteristics of Shunt, Series and Compound generators"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Distinguish between lap and wave windings.",
            "Define armature reaction in a DC machine.",
            "What are commutating poles (interpoles) and how are they connected?",
            "What is critical field resistance of a DC shunt generator?",
          ],
          fiveMarks: [
            "Explain the demagnetizing and cross-magnetizing effects of armature reaction with flux distribution diagrams.",
            "Explain the process of commutation in a DC generator and methods to improve commutation.",
          ],
          tenMarks: [
            "Explain the construction of a DC generator with a neat, labelled cross-sectional diagram showing all major parts. Derive the EMF equation.",
            "Explain the conditions for voltage build-up in a DC shunt generator. Show how critical field resistance and critical speed are determined from the open circuit characteristic (OCC).",
          ],
        },
      },
      {
        unitNumber: 5,
        title: "D.C. Motors",
        topics: [
          {
            id: "em1-u5-t1",
            name: "Principle, Back EMF and Torque Equation",
            keywords: ["Lorentz force rule", "Back EMF Eb = V - Ia Ra", "Significance of back EMF as regulating mechanism", "Torque equation Ta = (1/2π) (Φ Z P Ia / A)", "Shaft torque Tsh = Output / (2π N / 60)"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u5-t2",
            name: "Characteristics and Starters (3-Point & 4-Point)",
            keywords: ["Torque-Armature current characteristic", "Speed-Armature current characteristic", "Speed-Torque characteristic of Shunt, Series, Compound motors", "Necessity of starter", "3-point starter (NVC, OLR)", "4-point starter"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u5-t3",
            name: "Speed Control Methods & Ward-Leonard System",
            keywords: ["Armature resistance control", "Field flux control", "Ward-Leonard speed control system (M-G set)", "Wide range smooth speed control in both directions"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "em1-u5-t4",
            name: "Testing of DC Machines (Swinburne & Hopkinson Tests)",
            keywords: ["Swinburne's test (no-load test for shunt machine)", "Predetermination of efficiency", "Hopkinson's test (regenerative back-to-back full-load test)", "Field's test for series motors"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Why is a DC series motor never started without load?",
            "What is the function of No-Volt Coil (NVC) and Overload Release (OLR) in a 3-point starter?",
            "Why is Ward-Leonard speed control preferred for elevators and rolling mills?",
            "What is the main limitation of Swinburne's test?",
          ],
          fiveMarks: [
            "Explain the working of a 3-point starter for a DC shunt motor with neat diagram.",
            "Explain the field flux control and armature voltage control methods for a DC shunt motor.",
            "Compare Swinburne's test and Hopkinson's test.",
          ],
          tenMarks: [
            "Describe the Ward-Leonard system of speed control for a DC motor with neat schematic diagram. Explain its advantages, disadvantages, and industrial applications.",
            "Explain Hopkinson's regenerative test on two identical DC shunt machines with neat circuit diagram. Show how the efficiency of each machine as generator and motor is calculated.",
          ],
        },
      },
    ],
  },

  // EEE: 1st Year 1st Sem (I-I) - Matrices and Calculus
  {
    id: "eee-1-1-ma101bs",
    code: "MA101BS",
    name: "Matrices and Calculus",
    branch: "EEE",
    year: "1st Year",
    semester: "I-I",
    category: "BS",
    credits: 4,
    ltp: "3-1-0",
    folderName: "Matrices and Calculus",
    units: [
      {
        unitNumber: 1,
        title: "Matrices & Systems of Linear Equations",
        topics: [
          {
            id: "mc-u1-t1",
            name: "Rank of a Matrix (Echelon and Normal Form)",
            keywords: ["Rank", "Echelon form", "Normal form", "Elementary row transformations", "Nullity"],
            isImportant: true,
            marksWeightage: "5 Marks",
            isNumerical: true,
          },
          {
            id: "mc-u1-t2",
            name: "System of Linear Equations (Gauss Elimination & Gauss-Seidel)",
            keywords: ["Homogeneous systems", "Non-homogeneous AX = B", "Consistency criterion", "Gauss elimination", "Gauss-Seidel iterative method"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Define rank of a matrix.",
            "State the condition for consistency of a non-homogeneous system AX = B.",
          ],
          fiveMarks: [
            "Find the rank of a 3x4 matrix by reducing it to echelon form.",
            "Solve the system of equations using Gauss elimination method.",
          ],
          tenMarks: [
            "Investigate for what values of λ and μ the system x + y + z = 6, x + 2y + 3z = 10, x + 2y + λz = μ has (i) no solution, (ii) unique solution, (iii) infinite solutions.",
          ],
        },
      },
      {
        unitNumber: 2,
        title: "Eigenvalues and Eigenvectors",
        topics: [
          {
            id: "mc-u2-t1",
            name: "Eigenvalues, Eigenvectors and Diagonalization",
            keywords: ["Characteristic equation", "Eigenvalues", "Eigenvectors", "Diagonalization of matrix", "Modal matrix P", "P^-1 A P = D"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
          {
            id: "mc-u2-t2",
            name: "Cayley-Hamilton Theorem & Quadratic Forms",
            keywords: ["Cayley-Hamilton theorem", "Inverse matrix calculation", "Higher powers A^n", "Quadratic forms", "Canonical form & signature"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "State Cayley-Hamilton theorem.",
            "State two properties of eigenvalues of a real symmetric matrix.",
          ],
          tenMarks: [
            "Verify Cayley-Hamilton theorem for matrix A and hence find A^-1 and A^4.",
            "Find the eigenvalues and eigenvectors of a 3x3 matrix and diagonalize it.",
          ],
        },
      },
      {
        unitNumber: 3,
        title: "Calculus (Mean Value Theorems & Series)",
        topics: [
          {
            id: "mc-u3-t1",
            name: "Mean Value Theorems (Rolle's, Lagrange's & Cauchy's MVT)",
            keywords: ["Rolle's theorem", "Lagrange's Mean Value Theorem", "Cauchy's Mean Value Theorem", "Taylor's theorem", "Maclaurin's series"],
            isImportant: true,
            marksWeightage: "10 Marks",
          },
        ],
        importantQuestions: {
          fiveMarks: [
            "Verify Rolle's theorem for f(x) = x^2 - 4x + 3 in [1, 3].",
            "Verify Lagrange's Mean Value Theorem for f(x) = log x in [1, e].",
          ],
        },
      },
      {
        unitNumber: 4,
        title: "Multivariable Calculus (Partial Differentiation & Maxima/Minima)",
        topics: [
          {
            id: "mc-u4-t1",
            name: "Partial Derivatives, Total Derivatives and Jacobians",
            keywords: ["Partial differentiation", "Euler's theorem for homogeneous functions", "Total derivative", "Jacobians J(u,v/x,y)", "Functional dependence"],
            isImportant: true,
            marksWeightage: "10 Marks",
          },
          {
            id: "mc-u4-t2",
            name: "Maxima and Minima of Two Variables (Lagrange Multipliers)",
            keywords: ["Stationary points", "rt - s^2 condition", "Saddle point", "Lagrange multiplier method with constraints"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          tenMarks: [
            "Find the maximum and minimum values of f(x, y) = x^3 + y^3 - 3axy.",
            "Find the dimensions of a rectangular box of maximum volume with a given surface area using Lagrange multipliers.",
          ],
        },
      },
      {
        unitNumber: 5,
        title: "Multiple Integrals",
        topics: [
          {
            id: "mc-u5-t1",
            name: "Double and Triple Integrals (Change of Order of Integration)",
            keywords: ["Double integrals in Cartesian & Polar coordinates", "Change of order of integration", "Triple integrals", "Volume enclosed by surfaces"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          tenMarks: [
            "Evaluate the double integral by changing the order of integration.",
            "Find the volume bounded by cylinder x^2 + y^2 = 4 and planes y + z = 4 and z = 0.",
          ],
        },
      },
    ],
  },
  {
    id: "eee-hve",
    code: "EE701PC",
    name: "High Voltage Engineering",
    branch: "EEE",
    year: "4th Year",
    semester: "IV-I",
    category: "PC",
    credits: 3,
    ltp: "3-0-0",
    folderName: "High Voltage Engineering",
    units: [
      {
        unitNumber: 1,
        title: "Breakdown in Gases & Liquid Dielectrics",
        topics: [
          {
            id: "eee-hve-u1-t1",
            name: "Townsend Breakdown Criterion for Gases",
            keywords: ["Townsend", "ionization", "electron avalanche", "secondary emission", "breakdown voltage", "primary ionization coefficient"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u1-t2",
            name: "Streamer Theory of Breakdown in Gases",
            keywords: ["Streamer", "Raether", "Meek", "space charge", "photo-ionization", "spark channel"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u1-t3",
            name: "Paschen's Law and Minimum Breakdown Voltage",
            keywords: ["Paschen's law", "V = f(pd)", "pressure", "gap distance", "minimum breakdown voltage", "stoletow point"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u1-t4",
            name: "Breakdown in Pure and Commercial Liquids",
            keywords: ["Liquid dielectrics", "suspended particle theory", "cavitation and bubble mechanism", "transformer oil", "dielectric strength"],
            isImportant: false,
            marksWeightage: "5 Marks",
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Define Townsend's primary ionization coefficient (α).",
            "State Paschen's Law and its mathematical expression.",
            "What is dielectric strength of transformer oil?",
            "Distinguish between non-attaching and electron-attaching gases.",
          ],
          fiveMarks: [
            "Explain Streamer theory of breakdown in gases with neat sketches.",
            "Discuss Paschen's curve and explain why minimum breakdown voltage exists.",
            "Explain the suspended particle mechanism of breakdown in commercial liquid dielectrics.",
          ],
          tenMarks: [
            "Derive Townsend's current growth equation taking primary and secondary ionization processes into account and deduce the Townsend breakdown criterion.",
            "Explain the cavitation and bubble theory of liquid breakdown in detail with neat diagrams.",
          ],
          numerical: [
            "In an experiment for determining Townsend's coefficients, current between parallel electrodes was 1.2 x 10^-8 A at d = 0.5 cm. Calculate α and γ if breakdown occurs at d = 1.8 cm with 50 kV applied.",
          ],
          viva: [
            "What is electron avalanche?",
            "What is the dielectric strength of atmospheric air at NTP? (30 kV/cm or 21.2 kV/cm rms)",
            "Why is SF6 gas widely used as an arc quenching medium?",
          ],
        },
      },
      {
        unitNumber: 2,
        title: "Breakdown in Solid Dielectrics",
        topics: [
          {
            id: "eee-hve-u2-t1",
            name: "Thermal Breakdown in Solid Dielectrics",
            keywords: ["Thermal breakdown", "dielectric loss", "heat generation", "heat dissipation", "critical voltage", "thermal equilibrium"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u2-t2",
            name: "Intrinsic and Avalanche Breakdown in Solids",
            keywords: ["Intrinsic breakdown", "lattice vibrations", "Frohlich theory", "electron collision", "conduction band"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
          {
            id: "eee-hve-u2-t3",
            name: "Treeing, Tracking and Partial Discharges",
            keywords: ["Treeing", "tracking", "partial discharges", "voids", "erosion", "insulation degradation"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "What is thermal breakdown in solid insulation?",
            "Define 'Tracking' and 'Treeing' in solid dielectrics.",
            "What causes partial discharges inside solid voids?",
          ],
          fiveMarks: [
            "Explain the intrinsic breakdown mechanism in solid dielectrics.",
            "Differentiate between thermal breakdown and electrical breakdown.",
          ],
          tenMarks: [
            "Explain the mechanism of thermal breakdown in solid dielectrics. Derive the condition under which thermal instability occurs.",
            "Describe the phenomena of treeing and tracking in solid insulating materials and methods to prevent them.",
          ],
          numerical: [
            "A solid specimen of dielectric has dielectric constant εr = 4.2 and loss angle tan δ = 0.002. If applied field is 40 kV/cm at 50 Hz, calculate heat generated per unit volume.",
          ],
          viva: [
            "What happens when heat generated exceeds heat dissipated in a solid dielectric?",
            "Which solid insulating material is used in high voltage bushings?",
          ],
        },
      },
      {
        unitNumber: 3,
        title: "Generation of High Voltages & Currents",
        topics: [
          {
            id: "eee-hve-u3-t1",
            name: "Marx Multistage Impulse Voltage Generator",
            keywords: ["Marx generator", "impulse voltage", "standard lightning impulse", "1.2/50 μs", "spark gaps", "charging resistors"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u3-t2",
            name: "Cockcroft-Walton Voltage Multiplier Circuit",
            keywords: ["Cockcroft-Walton", "cascaded rectifier", "voltage drop", "voltage ripple", "HVDC generation"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u3-t3",
            name: "Cascaded Transformers for HVAC",
            keywords: ["Cascaded transformer", "insulating cylinder", "tertiary winding", "high voltage AC testing"],
            isImportant: false,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "What is standard lightning impulse wave specification as per IS/IEC? (1.2 / 50 μs)",
            "Why is cascading used in testing transformers?",
          ],
          fiveMarks: [
            "Draw and explain the standard impulse wave shape and define front and tail times.",
            "Explain Cockcroft-Walton voltage multiplier circuit with neat diagram.",
          ],
          tenMarks: [
            "Describe the multistage Marx impulse generator circuit. Explain its operation during charging and discharging with waveforms.",
          ],
          numerical: [
            "An 8-stage impulse generator has 0.12 μF capacitors per stage charged to 125 kV. Find total energy stored in the generator.",
          ],
          viva: [
            "What is the front time (t1) and tail time (t2) for standard lightning impulse? (1.2 μs ± 30% and 50 μs ± 20%)",
            "What is the function of sphere gaps in Marx circuit?",
          ],
        },
      },
      {
        unitNumber: 4,
        title: "Measurement of High Voltages and Currents",
        topics: [
          {
            id: "eee-hve-u4-t1",
            name: "Sphere Gaps for Voltage Measurement",
            keywords: ["Sphere gaps", "sparkover voltage", "temperature correction factor", "humidity factor", "peak voltage"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u4-t2",
            name: "Electrostatic Voltmeters and Potential Dividers",
            keywords: ["Electrostatic voltmeter", "capacitive divider", "resistive divider", "response time"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: [
            "State the factors influencing sparkover voltage of sphere gaps.",
            "What is the advantage of electrostatic voltmeters?",
          ],
          fiveMarks: [
            "Explain the construction and working of sphere gap for high voltage peak measurement.",
            "Describe high voltage capacitive potential divider for impulse voltage recording.",
          ],
          tenMarks: [
            "Explain the principle, construction and working of generating voltmeter for high DC voltages.",
          ],
        },
      },
      {
        unitNumber: 5,
        title: "High Voltage Testing and Insulation Coordination",
        topics: [
          {
            id: "eee-hve-u5-t1",
            name: "Testing of Insulators, Bushings and Cables",
            keywords: ["Impulse test", "power frequency withstand test", "loss factor measurement", "Schering bridge"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-hve-u5-t2",
            name: "Insulation Coordination and Surge Arresters",
            keywords: ["Insulation coordination", "BIL", "basic impulse insulation level", "lightning arrester", "ZnO varistor"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Define Basic Impulse Insulation Level (BIL).",
            "Why are zinc oxide (ZnO) surge arresters preferred over silicon carbide arresters?",
          ],
          fiveMarks: [
            "Explain the principle of insulation coordination in an electrical power substation.",
            "Describe Schering Bridge for measurement of capacitance and dielectric loss angle.",
          ],
          tenMarks: [
            "Explain high voltage testing procedures on insulators as per Indian Standards (IS), including dry flashover, wet flashover, and impulse tests.",
          ],
        },
      },
    ],
  },
  {
    id: "eee-pe",
    code: "EE502PC",
    name: "Power Electronics",
    branch: "EEE",
    semester: "III-I",
    folderName: "Power Electronics",
    units: [
      {
        unitNumber: 1,
        title: "Power Semiconductor Switches",
        topics: [
          {
            id: "eee-pe-u1-t1",
            name: "Silicon Controlled Rectifier (SCR) V-I Characteristics",
            keywords: ["SCR", "thyristor", "latching current", "holding current", "forward breakover voltage", "reverse breakdown"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-pe-u1-t2",
            name: "Two-Transistor Analogy of SCR",
            keywords: ["Two-transistor analogy", "regeneration", "alpha1 + alpha2 = 1", "gate triggering"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "eee-pe-u1-t3",
            name: "Power MOSFET vs IGBT Comparison",
            keywords: ["MOSFET", "IGBT", "voltage controlled", "switching speed", "conduction loss", "safe operating area"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
        ],
        importantQuestions: {
          twoMarks: [
            "Distinguish between latching current and holding current of an SCR.",
            "Why is IGBT preferred for high-voltage and medium-frequency switching?",
          ],
          fiveMarks: [
            "Explain the two-transistor model of SCR and derive the anode current equation.",
            "Compare Power BJT, MOSFET and IGBT with respect to ratings and switching characteristics.",
          ],
          tenMarks: [
            "Explain the static V-I characteristics of SCR with neat diagram. Clearly show forward blocking, forward conduction, and reverse blocking states.",
          ],
        },
      },
      {
        unitNumber: 2,
        title: "Phase Controlled Converters",
        topics: [
          {
            id: "eee-pe-u2-t1",
            name: "Single Phase Fully Controlled Bridge Rectifier (RL Load)",
            keywords: ["Full bridge converter", "firing angle alpha", "continuous conduction", "average output voltage", "freewheeling diode"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["What is the role of a freewheeling diode in converter circuits?"],
          tenMarks: ["Explain the operation of 1-phase full converter with RL load. Derive expressions for average and RMS output voltages with relevant waveforms."],
          numerical: ["A 1-phase full converter is fed from 230V, 50Hz supply with a load R=10Ω. If firing angle is 45°, calculate average output voltage and load current."],
        },
      },
      {
        unitNumber: 3,
        title: "DC-DC Choppers",
        topics: [
          {
            id: "eee-pe-u3-t1",
            name: "Step-Down (Buck) and Step-Up (Boost) Converters",
            keywords: ["Buck converter", "Boost converter", "duty cycle D", "inductor volt-second balance", "ripple voltage"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define duty ratio of a DC chopper."],
          tenMarks: ["Explain the principle of operation of Step-up (Boost) chopper with neat circuit and waveforms. Derive Vout/Vin = 1/(1-D)."],
          numerical: ["A buck chopper has input voltage 48V, output voltage 18V, and switching frequency 25 kHz. If load resistance is 10Ω, find duty ratio and inductor value for critical conduction."],
        },
      },
      {
        unitNumber: 4,
        title: "Inverters",
        topics: [
          {
            id: "eee-pe-u4-t1",
            name: "Sinusoidal Pulse Width Modulation (SPWM) Inverter",
            keywords: ["SPWM", "carrier wave", "modulation index", "harmonic reduction", "full bridge inverter"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain the technique of Sinusoidal PWM for inverters with neat waveforms."],
          tenMarks: ["Describe the operation of 3-phase bridge inverter in 180° conduction mode with neat gating signals, phase and line voltage waveforms."],
        },
      },
      {
        unitNumber: 5,
        title: "AC Voltage Controllers and Cycloconverters",
        topics: [
          {
            id: "eee-pe-u5-t1",
            name: "Single Phase AC Voltage Controller and Cycloconverter",
            keywords: ["AC voltage controller", "TRIAC", "cycloconverter", "frequency changer", "integral cycle control"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["What is a cycloconverter?"],
          tenMarks: ["Explain the operation of single-phase mid-point cycloconverter with resistive load for step-down frequency (fo = fs/3)."],
        },
      },
    ],
  },
  {
    id: "eee-cs",
    code: "EE404PC",
    name: "Control Systems",
    branch: "EEE",
    semester: "II-II",
    folderName: "Control Systems",
    units: [
      {
        unitNumber: 1,
        title: "Introduction and Mathematical Modeling",
        topics: [
          {
            id: "eee-cs-u1-t1",
            name: "Transfer Function and Block Diagram Reduction",
            keywords: ["Transfer function", "block diagram reduction", "Mason's gain formula", "signal flow graph", "summing point"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define transfer function of a linear time-invariant (LTI) system."],
          tenMarks: ["State and explain Mason's Gain Formula. Use it to determine overall transfer function of a given signal flow graph."],
        },
      },
      {
        unitNumber: 2,
        title: "Time Response Analysis",
        topics: [
          {
            id: "eee-cs-u2-t1",
            name: "Time Domain Specifications of Second Order System",
            keywords: ["Damping ratio zeta", "natural frequency wn", "rise time tr", "peak time tp", "peak overshoot Mp", "settling time ts"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define peak overshoot and settling time for a second order underdamped system."],
          tenMarks: ["Derive the expressions for peak time (tp) and maximum peak overshoot (%Mp) for a second order underdamped system subjected to unit step input."],
          numerical: ["A unity feedback system has open loop transfer function G(s) = 25 / [s(s + 6)]. Find natural frequency, damping ratio, rise time, peak overshoot, and settling time."],
        },
      },
      {
        unitNumber: 3,
        title: "Stability Analysis and Root Locus",
        topics: [
          {
            id: "eee-cs-u3-t1",
            name: "Routh-Hurwitz Stability Criterion",
            keywords: ["Routh array", "stability", "sign change", "auxiliary equation", "marginal stability"],
            isImportant: true,
            marksWeightage: "5 Marks",
            isNumerical: true,
          },
          {
            id: "eee-cs-u3-t2",
            name: "Construction of Root Locus",
            keywords: ["Root locus", "asymptotes", "centroid", "breakaway point", "angle of departure", "imaginary axis crossing"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["State necessary and sufficient conditions for stability as per Routh-Hurwitz criterion."],
          tenMarks: ["State the general rules for constructing Root Locus. Sketch the root locus for G(s)H(s) = K / [s(s+2)(s+4)]."],
        },
      },
      {
        unitNumber: 4,
        title: "Frequency Response Analysis",
        topics: [
          {
            id: "eee-cs-u4-t1",
            name: "Bode Plot and Gain/Phase Margin Calculation",
            keywords: ["Bode plot", "gain margin", "phase margin", "gain crossover frequency", "phase crossover frequency", "corner frequency"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
          {
            id: "eee-cs-u4-t2",
            name: "Nyquist Stability Criterion",
            keywords: ["Nyquist plot", "encirclement N = P - Z", "mapping theorem", "polar plot"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define Gain Margin (GM) and Phase Margin (PM)."],
          tenMarks: ["Draw the Bode magnitude and phase plots for the open loop transfer function G(s) = 100 / [s(s+1)(s+10)] and determine gain margin and phase margin."],
        },
      },
      {
        unitNumber: 5,
        title: "State Space Analysis",
        topics: [
          {
            id: "eee-cs-u5-t1",
            name: "State Space Representation and Controllability/Observability",
            keywords: ["State transition matrix", "Cayley-Hamilton theorem", "Kalman test", "controllability matrix", "observability matrix"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["What is state transition matrix and write its properties?"],
          tenMarks: ["Explain Kalman's tests for controllability and observability with an illustrative numerical problem."],
        },
      },
    ],
  },

  // CSE
  {
    id: "cse-dbms",
    code: "CS403PC",
    name: "Database Management Systems",
    branch: "CSE",
    semester: "II-II",
    folderName: "Database Management Systems",
    units: [
      {
        unitNumber: 1,
        title: "Database System Concepts and Architecture",
        topics: [
          {
            id: "cse-dbms-u1-t1",
            name: "Three-Schema Architecture and Data Independence",
            keywords: ["Three-schema", "physical schema", "logical schema", "view level", "physical data independence", "logical data independence"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
          {
            id: "cse-dbms-u1-t2",
            name: "Entity Relationship (ER) Model to Relational Mapping",
            keywords: ["ER model", "entity", "relationship", "cardinality ratio", "weak entity", "foreign key mapping"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define physical and logical data independence.", "What is a weak entity set? How is it represented in an ER diagram?"],
          tenMarks: ["Explain the Three-Schema Architecture of a DBMS with a neat diagram. Discuss how it provides data independence."],
        },
      },
      {
        unitNumber: 2,
        title: "Relational Algebra, Calculus and SQL",
        topics: [
          {
            id: "cse-dbms-u2-t1",
            name: "Relational Algebra Operations and Joins",
            keywords: ["Select", "Project", "Cartesian Product", "Natural Join", "Outer Join", "Set operations"],
            isImportant: true,
            marksWeightage: "10 Marks",
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain the different types of Join operations in relational algebra with suitable examples."],
          tenMarks: ["Discuss basic and derived operators in Relational Algebra with suitable schema and queries."],
        },
      },
      {
        unitNumber: 3,
        title: "Database Design and Normalization",
        topics: [
          {
            id: "cse-dbms-u3-t1",
            name: "Functional Dependencies and Normal Forms (1NF, 2NF, 3NF, BCNF)",
            keywords: ["Functional dependency", "1NF", "2NF", "3NF", "BCNF", "prime attribute", "transitive dependency", "lossless join"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["State Armstrong's Axioms for functional dependencies.", "Define Boyce-Codd Normal Form (BCNF)."],
          tenMarks: ["Define Functional Dependency. Explain 1NF, 2NF, 3NF and BCNF with suitable relational examples and anomalous side effects."],
          numerical: ["Given relation R(A,B,C,D,E) with FDs F = { A->BC, CD->E, B->D, E->A }. Find the candidate keys and highest normal form of R."],
        },
      },
      {
        unitNumber: 4,
        title: "Transaction Management and Concurrency Control",
        topics: [
          {
            id: "cse-dbms-u4-t1",
            name: "ACID Properties and Serializability",
            keywords: ["ACID properties", "atomicity", "consistency", "isolation", "durability", "conflict serializability", "precedence graph"],
            isImportant: true,
            marksWeightage: "10 Marks",
          },
          {
            id: "cse-dbms-u4-t2",
            name: "Two-Phase Locking (2PL) Protocol",
            keywords: ["2PL", "growing phase", "shrinking phase", "strict 2PL", "deadlock", "cascadeless"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain ACID properties of a database transaction with practical banking examples."],
          tenMarks: ["What is conflict serializability? How do you test a schedule for serializability using a precedence graph? Explain with an example schedule."],
        },
      },
      {
        unitNumber: 5,
        title: "Recovery System and Indexing",
        topics: [
          {
            id: "cse-dbms-u5-t1",
            name: "Log-Based Recovery and Checkpoints",
            keywords: ["WAL", "write-ahead logging", "deferred update", "immediate update", "checkpoint", "redo", "undo"],
            isImportant: true,
            marksWeightage: "5 Marks",
          },
          {
            id: "cse-dbms-u5-t2",
            name: "B and B+ Trees Indexing",
            keywords: ["B-tree", "B+ tree", "leaf nodes", "index search", "node insertion", "dense index"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Distinguish between B-Tree and B+ Tree indexing structures."],
          tenMarks: ["Explain the log-based recovery mechanism using immediate database modification and checkpointing."],
        },
      },
    ],
  },
  {
    id: "cse-os",
    code: "CS402PC",
    name: "Operating Systems",
    branch: "CSE",
    semester: "II-II",
    folderName: "Operating Systems",
    units: [
      {
        unitNumber: 1,
        title: "OS Overview and Process Management",
        topics: [
          {
            id: "cse-os-u1-t1",
            name: "Process Control Block (PCB) and Process States",
            keywords: ["PCB", "process state", "ready", "running", "waiting", "context switch", "inter-process communication"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["What is Context Switching?", "List fields present in a Process Control Block."],
          tenMarks: ["Explain the five-state process transition model with a neat diagram. Describe the contents of PCB."],
        },
      },
      {
        unitNumber: 2,
        title: "CPU Scheduling and Synchronization",
        topics: [
          {
            id: "cse-os-u2-t1",
            name: "CPU Scheduling Algorithms (FCFS, SJF, Round Robin)",
            keywords: ["FCFS", "SJF", "Round Robin", "turnaround time", "waiting time", "Gantt chart", "time quantum"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
          {
            id: "cse-os-u2-t2",
            name: "Critical Section Problem and Semaphores",
            keywords: ["Critical section", "mutual exclusion", "progress", "bounded waiting", "counting semaphore", "wait and signal"],
            isImportant: true,
            marksWeightage: "10 Marks",
          },
        ],
        importantQuestions: {
          fiveMarks: ["Define critical section. What requirements must a solution to the critical-section problem satisfy?"],
          tenMarks: ["Solve average waiting time and turnaround time for given processes using SJF (preemptive) and Round Robin (quantum=2ms)."],
        },
      },
      {
        unitNumber: 3,
        title: "Deadlocks",
        topics: [
          {
            id: "cse-os-u3-t1",
            name: "Banker's Algorithm for Deadlock Avoidance",
            keywords: ["Deadlock", "mutual exclusion", "hold and wait", "no preemption", "circular wait", "Banker's algorithm", "safe state", "allocation matrix"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["List the four necessary conditions for deadlock occurrence."],
          tenMarks: ["Explain Banker's Algorithm for deadlock avoidance with Safety and Resource Request algorithms with a numerical example."],
        },
      },
      {
        unitNumber: 4,
        title: "Memory Management",
        topics: [
          {
            id: "cse-os-u4-t1",
            name: "Paging, Segmentation and TLB",
            keywords: ["Paging", "page table", "frame", "internal fragmentation", "TLB", "translation lookaside buffer", "segmentation"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain hardware address translation using paging with a neat diagram."],
          tenMarks: ["Differentiate between Paging and Segmentation. Describe how TLB enhances address translation efficiency."],
        },
      },
      {
        unitNumber: 5,
        title: "Virtual Memory and File Systems",
        topics: [
          {
            id: "cse-os-u5-t1",
            name: "Page Replacement Algorithms (FIFO, LRU, Optimal)",
            keywords: ["Page fault", "FIFO", "LRU", "Optimal page replacement", "Belady's anomaly", "thrashing"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["What is Belady's Anomaly? Which algorithm exhibits it?"],
          tenMarks: ["Consider reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2. For 3 frames, find page faults using FIFO, LRU, and Optimal algorithms."],
        },
      },
    ],
  },

  // ECE
  {
    id: "ece-dsp",
    code: "EC502PC",
    name: "Digital Signal Processing",
    branch: "ECE",
    semester: "III-I",
    folderName: "Digital Signal Processing",
    units: [
      {
        unitNumber: 1,
        title: "Discrete Fourier Transform (DFT) and FFT",
        topics: [
          {
            id: "ece-dsp-u1-t1",
            name: "Radix-2 FFT Algorithms (DIT and DIF)",
            keywords: ["DFT", "twiddle factor WN", "decimation in time", "decimation in frequency", "butterfly diagram", "computational complexity"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["Define twiddle factor and state its symmetry and periodicity properties."],
          tenMarks: ["Derive the 8-point Radix-2 Decimation-In-Time (DIT) FFT algorithm and draw the complete butterfly signal flow graph."],
        },
      },
      {
        unitNumber: 2,
        title: "IIR Filter Design",
        topics: [
          {
            id: "ece-dsp-u2-t1",
            name: "Bilinear Transformation Method and Butterworth Filters",
            keywords: ["Bilinear transformation", "frequency warping", "Butterworth filter", "Chebyshev filter", "analog to digital mapping"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["What is frequency warping in Bilinear Transformation and how is pre-warping performed?"],
          tenMarks: ["Design a digital Butterworth low-pass filter using Bilinear Transformation satisfying given passband and stopband attenuation specifications."],
        },
      },
      {
        unitNumber: 3,
        title: "FIR Filter Design",
        topics: [
          {
            id: "ece-dsp-u3-t1",
            name: "FIR Filter Design using Windowing Techniques",
            keywords: ["Window techniques", "Rectangular window", "Hamming window", "Hanning window", "linear phase", "Gibbs phenomenon"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["State conditions for symmetric and anti-symmetric FIR filters to exhibit linear phase response."],
          tenMarks: ["Design a low-pass FIR filter with cutoff frequency 0.2π rad/sample using a Hamming window with filter length N=7."],
        },
      },
      {
        unitNumber: 4,
        title: "Realization of Digital Filters",
        topics: [
          {
            id: "ece-dsp-u4-t1",
            name: "Direct Form I, Direct Form II, Cascade and Parallel Realization",
            keywords: ["Direct Form I", "Direct Form II", "Cascade", "Parallel", "canonic realization", "signal flow diagram"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Draw the Direct Form II realization for a given discrete-time transfer function."],
        },
      },
      {
        unitNumber: 5,
        title: "Multirate Digital Signal Processing",
        topics: [
          {
            id: "ece-dsp-u5-t1",
            name: "Decimation, Interpolation and Sampling Rate Conversion",
            keywords: ["Decimation", "downsampling", "Interpolation", "upsampling", "anti-aliasing filter", "anti-imaging filter"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain the process of decimation by factor D in frequency domain with spectra diagrams."],
        },
      },
    ],
  },

  // Mechanical
  {
    id: "me-td",
    code: "ME302PC",
    name: "Thermodynamics",
    branch: "Mechanical",
    semester: "II-I",
    folderName: "Thermodynamics",
    units: [
      {
        unitNumber: 1,
        title: "Basic Concepts and First Law of Thermodynamics",
        topics: [
          {
            id: "me-td-u1-t1",
            name: "First Law of Thermodynamics for Steady Flow Process (SFEE)",
            keywords: ["First Law", "closed system", "SFEE", "enthalpy", "internal energy", "nozzle", "turbine", "compressor"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["State the First Law of Thermodynamics for a closed system executing a cycle."],
          tenMarks: ["Derive the Steady Flow Energy Equation (SFEE) from first principles and apply it to (a) Steam Turbine, (b) Centrifugal Water Pump."],
        },
      },
      {
        unitNumber: 2,
        title: "Second Law of Thermodynamics and Entropy",
        topics: [
          {
            id: "me-td-u2-t1",
            name: "Kelvin-Planck and Clausius Statements & Carnot Cycle",
            keywords: ["Second Law", "Kelvin-Planck", "Clausius", "heat engine", "refrigerator", "heat pump", "COP", "Carnot efficiency", "Clausius inequality"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Prove the equivalence of Kelvin-Planck and Clausius statements of the Second Law of Thermodynamics."],
          tenMarks: ["Describe Carnot Heat Engine cycle on P-v and T-s diagrams. Derive the expression for its thermal efficiency."],
        },
      },
      {
        unitNumber: 3,
        title: "Pure Substances and Vapor Power Cycles",
        topics: [
          {
            id: "me-td-u3-t1",
            name: "Rankine Cycle with Reheat and Regeneration",
            keywords: ["Rankine cycle", "Mollier diagram", "steam power plant", "reheat factor", "feedwater heater", "thermal efficiency"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          tenMarks: ["Explain the working of Simple Rankine Cycle. Sketch it on P-v and T-s diagrams and derive expression for its thermal efficiency."],
        },
      },
      {
        unitNumber: 4,
        title: "Air Standard Cycles (IC Engine Cycles)",
        topics: [
          {
            id: "me-td-u4-t1",
            name: "Otto, Diesel and Dual Combustion Cycles",
            keywords: ["Otto cycle", "Diesel cycle", "compression ratio r", "cutoff ratio rc", "air standard efficiency"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          tenMarks: ["Derive the expression for air standard efficiency of an Otto cycle with P-v and T-s diagrams."],
        },
      },
      {
        unitNumber: 5,
        title: "Psychrometry and Gas Mixtures",
        topics: [
          {
            id: "me-td-u5-t1",
            name: "Psychrometric Properties and Processes",
            keywords: ["Dry bulb temperature", "wet bulb temperature", "relative humidity", "dew point", "sensible heating", "cooling with dehumidification"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Define Relative Humidity and Specific Humidity with expressions."],
        },
      },
    ],
  },

  // Civil
  {
    id: "ce-fm",
    code: "CE303PC",
    name: "Fluid Mechanics & Hydraulics",
    branch: "Civil",
    semester: "II-I",
    folderName: "Fluid Mechanics",
    units: [
      {
        unitNumber: 1,
        title: "Fluid Properties and Fluid Statics",
        topics: [
          {
            id: "ce-fm-u1-t1",
            name: "Pascal's Law and Hydrostatic Forces on Submerged Surfaces",
            keywords: ["Viscosity", "surface tension", "Pascal's law", "center of pressure", "metacentric height"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["State Pascal's law and explain its application in hydraulic press."],
          tenMarks: ["Derive an expression for total hydrostatic force and depth of center of pressure on an inclined plane surface submerged in liquid."],
        },
      },
      {
        unitNumber: 2,
        title: "Fluid Kinematics and Dynamics",
        topics: [
          {
            id: "ce-fm-u2-t1",
            name: "Bernoulli's Equation and Venturimeter",
            keywords: ["Euler equation", "Bernoulli's equation", "Venturimeter", "coefficient of discharge Cd", "pitot tube"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
            isNumerical: true,
          },
        ],
        importantQuestions: {
          twoMarks: ["State assumptions made in the derivation of Bernoulli's equation."],
          tenMarks: ["Derive Bernoulli's equation from Euler's equation of motion. Explain how discharge through a pipe is measured using a Venturimeter."],
          numerical: ["A horizontal venturimeter with inlet diameter 20 cm and throat diameter 10 cm is used to measure flow of water. If differential mercury manometer reading is 15 cm, find rate of flow (Cd = 0.98)."],
        },
      },
      {
        unitNumber: 3,
        title: "Flow Through Pipes and Losses",
        topics: [
          {
            id: "ce-fm-u3-t1",
            name: "Darcy-Weisbach Equation and Major/Minor Losses",
            keywords: ["Darcy-Weisbach", "friction factor f", "major loss", "minor loss", "sudden enlargement", "hydraulic gradient line (HGL)"],
            isImportant: true,
            marksWeightage: "10 Marks",
            isNumerical: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Derive Darcy-Weisbach equation for head loss due to friction in a pipe."],
        },
      },
      {
        unitNumber: 4,
        title: "Boundary Layer Theory and Drag/Lift",
        topics: [
          {
            id: "ce-fm-u4-t1",
            name: "Boundary Layer Growth and Separation",
            keywords: ["Boundary layer thickness", "displacement thickness", "momentum thickness", "separation", "adverse pressure gradient"],
            isImportant: true,
            marksWeightage: "5 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          fiveMarks: ["Explain the phenomenon of boundary layer separation and methods to prevent it."],
        },
      },
      {
        unitNumber: 5,
        title: "Hydraulic Turbines and Pumps",
        topics: [
          {
            id: "ce-fm-u5-t1",
            name: "Pelton Wheel and Francis Turbine",
            keywords: ["Pelton wheel", "bucket", "Francis turbine", "draft tube", "specific speed", "cavitation"],
            isImportant: true,
            marksWeightage: "10 Marks",
            hasDiagram: true,
          },
        ],
        importantQuestions: {
          tenMarks: ["Explain the construction and working of Pelton wheel impulse turbine with a neat sketch and velocity triangles."],
        },
      },
    ],
  },
];

// Fuzzy search utility to tolerate minor spelling mistakes
export function searchSyllabus(query: string) {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ").trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

  const results: {
    type: "subject" | "topic" | "question";
    subject: JntuhSubject;
    unit?: number;
    unitTitle?: string;
    topicName?: string;
    title: string;
    matchScore: number;
    marksTag?: string;
  }[] = [];

  for (const subject of JNTUH_SUBJECTS) {
    const subjectText = `${subject.name} ${subject.code} ${subject.branch}`.toLowerCase();
    let score = 0;
    for (const token of queryTokens) {
      if (subjectText.includes(token)) score += 2;
    }
    if (score > 0) {
      results.push({
        type: "subject",
        subject,
        title: `${subject.name} (${subject.code}) - ${subject.branch}`,
        matchScore: score,
      });
    }

    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        const topicText = `${topic.name} ${topic.keywords.join(" ")}`.toLowerCase();
        let topicScore = 0;
        for (const token of queryTokens) {
          if (topicText.includes(token)) topicScore += 3;
          // Substring partial matching for typos
          if (token.length > 4 && topicText.includes(token.slice(0, token.length - 1))) topicScore += 2;
        }
        if (topicScore > 0) {
          results.push({
            type: "topic",
            subject,
            unit: unit.unitNumber,
            unitTitle: unit.title,
            topicName: topic.name,
            title: `${topic.name} [Unit ${unit.unitNumber}]`,
            matchScore: topicScore,
            marksTag: topic.marksWeightage,
          });
        }
      }

      // Check unit important questions
      if (unit.importantQuestions) {
        const allQuestions = [
          ...(unit.importantQuestions.twoMarks || []).map((q) => ({ q, marks: "2 Marks" })),
          ...(unit.importantQuestions.fiveMarks || []).map((q) => ({ q, marks: "5 Marks" })),
          ...(unit.importantQuestions.tenMarks || []).map((q) => ({ q, marks: "10 Marks" })),
          ...(unit.importantQuestions.numerical || []).map((q) => ({ q, marks: "Numerical" })),
          ...(unit.importantQuestions.viva || []).map((q) => ({ q, marks: "Viva" })),
        ];

        for (const item of allQuestions) {
          const qText = item.q.toLowerCase();
          let qScore = 0;
          for (const token of queryTokens) {
            if (qText.includes(token)) qScore += 4;
          }
          if (qScore > 0) {
            results.push({
              type: "question",
              subject,
              unit: unit.unitNumber,
              unitTitle: unit.title,
              title: item.q,
              matchScore: qScore,
              marksTag: item.marks,
            });
          }
        }
      }
    }
  }

  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 15);
}
