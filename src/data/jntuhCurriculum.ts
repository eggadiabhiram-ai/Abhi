import { EEE_R22_OFFICIAL_CURRICULUM } from "./eeeOfficialR22";
import { AllocatedSubject, EngineeringBranch, Semester, Year } from "../types";

export interface YearStructure {
  year: Year;
  semesters: {
    semester: Semester;
    label: string;
    totalCredits: number;
    subjects: AllocatedSubject[];
  }[];
}

export const JNTUH_R22_CURRICULUM: Record<EngineeringBranch, YearStructure[]> = {
  EEE: EEE_R22_OFFICIAL_CURRICULUM,
  CSE: [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "I-I",
          label: "1st Year 1st Semester (I-I)",
          totalCredits: 19.5,
          subjects: [
            { id: "cse-1-1-ma101", code: "MA101BS", name: "Matrices and Calculus", branch: "CSE", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Matrices, linear systems, eigenvalues, calculus." },
            { id: "cse-1-1-ap102", code: "AP102BS", name: "Applied Physics", branch: "CSE", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Semiconductors, lasers, quantum mechanics." },
            { id: "cse-1-1-cs103", code: "CS103ES", name: "Programming for Problem Solving", branch: "CSE", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "C programming, control flows, pointers." },
            { id: "cse-1-1-ee104", code: "EE104ES", name: "Basic Electrical Engineering", branch: "CSE", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "DC & AC circuits, Transformers, Machines." },
            { id: "cse-1-1-me105", code: "ME105ES", name: "Computer Aided Engineering Drawing", branch: "CSE", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "1-0-4", type: "Theory", hasFullSyllabus: false, description: "CAD projections and 3D modeling." },
          ],
        },
        {
          semester: "I-II",
          label: "1st Year 2nd Semester (I-II)",
          totalCredits: 20.5,
          subjects: [
            { id: "cse-1-2-ma201", code: "MA201BS", name: "Ordinary Differential Equations & Vector Calculus", branch: "CSE", year: "1st Year", semester: "I-II", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Differential equations and vector theorems." },
            { id: "cse-1-2-ch202", code: "CH202BS", name: "Engineering Chemistry", branch: "CSE", year: "1st Year", semester: "I-II", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Polymers, electrochemistry, water treatment." },
            { id: "cse-1-2-cs203", code: "CS203PC", name: "Data Structures", branch: "CSE", year: "1st Year", semester: "I-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Stacks, Queues, Linked Lists, Trees, Graphs, Sorting." },
          ],
        },
      ],
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "II-I",
          label: "2nd Year 1st Semester (II-I)",
          totalCredits: 20,
          subjects: [
            { id: "cse-os", code: "CS301PC", name: "Operating Systems", branch: "CSE", year: "2nd Year", semester: "II-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Processes, threads, CPU scheduling, deadlocks, paging." },
            { id: "cse-2-1-dms", code: "CS302PC", name: "Discrete Mathematics", branch: "CSE", year: "2nd Year", semester: "II-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Sets, relations, recurrence relations, graph theory." },
            { id: "cse-2-1-coa", code: "CS303PC", name: "Computer Organization & Architecture", branch: "CSE", year: "2nd Year", semester: "II-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Pipelining, instruction set architecture, memory." },
          ],
        },
        {
          semester: "II-II",
          label: "2nd Year 2nd Semester (II-II)",
          totalCredits: 20,
          subjects: [
            { id: "cse-dbms", code: "CS401PC", name: "Database Management Systems (DBMS)", branch: "CSE", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Relational model, SQL, normalization (BCNF), ACID, indexing." },
            { id: "cse-2-2-java", code: "CS402PC", name: "Java Programming", branch: "CSE", year: "2nd Year", semester: "II-II", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "OOP concepts, exception handling, multithreading, collections." },
            { id: "cse-2-2-daa", code: "CS403PC", name: "Design and Analysis of Algorithms", branch: "CSE", year: "2nd Year", semester: "II-II", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Divide & conquer, greedy, dynamic programming." },
          ],
        },
      ],
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "III-I",
          label: "3rd Year 1st Semester (III-I)",
          totalCredits: 21,
          subjects: [
            { id: "cse-3-1-cn", code: "CS501PC", name: "Computer Networks", branch: "CSE", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "OSI & TCP/IP layers, routing algorithms, congestion control." },
            { id: "cse-3-1-se", code: "CS502PC", name: "Software Engineering", branch: "CSE", year: "3rd Year", semester: "III-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Agile, SDLC, requirements, testing." },
          ],
        },
        {
          semester: "III-II",
          label: "3rd Year 2nd Semester (III-II)",
          totalCredits: 21,
          subjects: [
            { id: "cse-3-2-cd", code: "CS601PC", name: "Compiler Design", branch: "CSE", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Lexical analysis, parsers (LL, LR), code optimization." },
            { id: "cse-3-2-ml", code: "CS602PC", name: "Machine Learning", branch: "CSE", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Supervised and unsupervised learning, SVM, neural nets." },
          ],
        },
      ],
    },
    {
      year: "4th Year",
      semesters: [
        {
          semester: "IV-I",
          label: "4th Year 1st Semester (IV-I)",
          totalCredits: 20,
          subjects: [
            { id: "cse-4-1-cc", code: "CS701PC", name: "Cloud Computing", branch: "CSE", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Virtualization, AWS, GCP, serverless architecture." },
            { id: "cse-4-1-cns", code: "CS702PC", name: "Cryptography and Network Security", branch: "CSE", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "AES, RSA, SHA, digital signatures, firewalls." },
          ],
        },
        {
          semester: "IV-II",
          label: "4th Year 2nd Semester (IV-II)",
          totalCredits: 18,
          subjects: [
            { id: "cse-4-2-pr", code: "CS801PR", name: "Project Stage - II & Seminar", branch: "CSE", year: "4th Year", semester: "IV-II", category: "PC", credits: 10, ltp: "0-0-20", type: "Practical", hasFullSyllabus: false, description: "Final Year Capstone Project." },
          ],
        },
      ],
    },
  ],
  ECE: [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "I-I",
          label: "1st Year 1st Semester (I-I)",
          totalCredits: 19.5,
          subjects: [
            { id: "ece-1-1-ma101", code: "MA101BS", name: "Matrices and Calculus", branch: "ECE", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Linear algebra, calculus." },
            { id: "ece-1-1-ap102", code: "AP102BS", name: "Applied Physics", branch: "ECE", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Semiconductors, lasers." },
            { id: "ece-1-1-cs103", code: "CS103ES", name: "Programming for Problem Solving", branch: "ECE", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "C programming basics." },
            { id: "ece-1-1-ee104", code: "EE104ES", name: "Basic Electrical Engineering", branch: "ECE", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "DC & AC Circuits, Transformers." },
          ],
        },
        {
          semester: "I-II",
          label: "1st Year 2nd Semester (I-II)",
          totalCredits: 20.5,
          subjects: [
            { id: "ece-1-2-ma201", code: "MA201BS", name: "Ordinary Differential Equations", branch: "ECE", year: "1st Year", semester: "I-II", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Differential equations and vector calculus." },
            { id: "ece-1-2-edc", code: "EC203PC", name: "Electronic Devices and Circuits (EDC)", branch: "ECE", year: "1st Year", semester: "I-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Diodes, BJTs, FETs, rectifiers." },
          ],
        },
      ],
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "II-I",
          label: "2nd Year 1st Semester (II-I)",
          totalCredits: 20,
          subjects: [
            { id: "ece-2-1-dld", code: "EC301PC", name: "Digital Logic Design", branch: "ECE", year: "2nd Year", semester: "II-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "K-maps, combinational and sequential logic." },
            { id: "ece-2-1-ss", code: "EC302PC", name: "Signals and Systems", branch: "ECE", year: "2nd Year", semester: "II-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Fourier, Laplace, Z-transforms." },
          ],
        },
        {
          semester: "II-II",
          label: "2nd Year 2nd Semester (II-II)",
          totalCredits: 20,
          subjects: [
            { id: "ece-2-2-emw", code: "EC401PC", name: "Electromagnetic Fields and Waves", branch: "ECE", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Maxwell's equations, wave propagation." },
            { id: "ece-2-2-ac", code: "EC402PC", name: "Analog Communications", branch: "ECE", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "AM, FM, PM, superheterodyne receivers." },
          ],
        },
      ],
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "III-I",
          label: "3rd Year 1st Semester (III-I)",
          totalCredits: 21,
          subjects: [
            { id: "ece-dsp", code: "EC501PC", name: "Digital Signal Processing", branch: "ECE", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "DFT, FFT, IIR/FIR filter design." },
            { id: "ece-3-1-mpmc", code: "EC502PC", name: "Microprocessors and Microcontrollers", branch: "ECE", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "8086, 8051, ARM." },
          ],
        },
        {
          semester: "III-II",
          label: "3rd Year 2nd Semester (III-II)",
          totalCredits: 21,
          subjects: [
            { id: "ece-3-2-vlsi", code: "EC601PC", name: "VLSI Design", branch: "ECE", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "CMOS layout, stick diagrams, Verilog." },
          ],
        },
      ],
    },
    {
      year: "4th Year",
      semesters: [
        {
          semester: "IV-I",
          label: "4th Year 1st Semester (IV-I)",
          totalCredits: 20,
          subjects: [
            { id: "ece-4-1-mwe", code: "EC701PC", name: "Microwave Engineering", branch: "ECE", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Waveguides, Klystron, Magnetron, S-parameters." },
          ],
        },
        {
          semester: "IV-II",
          label: "4th Year 2nd Semester (IV-II)",
          totalCredits: 18,
          subjects: [
            { id: "ece-4-2-project", code: "EC801PR", name: "Major Project Stage-II", branch: "ECE", year: "4th Year", semester: "IV-II", category: "PC", credits: 10, ltp: "0-0-20", type: "Practical", hasFullSyllabus: false, description: "Final Year Capstone Project." },
          ],
        },
      ],
    },
  ],
  Mechanical: [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "I-I",
          label: "1st Year 1st Semester (I-I)",
          totalCredits: 19.5,
          subjects: [
            { id: "me-1-1-ma101", code: "MA101BS", name: "Matrices and Calculus", branch: "Mechanical", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Linear algebra, calculus." },
            { id: "me-1-1-ch102", code: "CH102BS", name: "Engineering Chemistry", branch: "Mechanical", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Fuels, lubricants, combustion." },
            { id: "me-1-1-cs103", code: "CS103ES", name: "Programming for Problem Solving", branch: "Mechanical", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "C programming fundamentals." },
            { id: "me-1-1-ee104", code: "EE104ES", name: "Basic Electrical Engineering", branch: "Mechanical", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "Circuits, Transformers, Machines." },
          ],
        },
        {
          semester: "I-II",
          label: "1st Year 2nd Semester (I-II)",
          totalCredits: 20.5,
          subjects: [
            { id: "me-1-2-em", code: "ME202ES", name: "Engineering Mechanics", branch: "Mechanical", year: "1st Year", semester: "I-II", category: "ES", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Statics, dynamics, friction, centroids." },
          ],
        },
      ],
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "II-I",
          label: "2nd Year 1st Semester (II-I)",
          totalCredits: 20,
          subjects: [
            { id: "me-td", code: "ME301PC", name: "Thermodynamics", branch: "Mechanical", year: "2nd Year", semester: "II-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Laws of thermodynamics, entropy, power cycles." },
            { id: "me-2-1-som", code: "ME302PC", name: "Mechanics of Solids", branch: "Mechanical", year: "2nd Year", semester: "II-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Stress-strain, shear force & bending moments, torsion." },
          ],
        },
        {
          semester: "II-II",
          label: "2nd Year 2nd Semester (II-II)",
          totalCredits: 20,
          subjects: [
            { id: "me-2-2-fm", code: "ME401PC", name: "Fluid Mechanics & Hydraulic Machinery", branch: "Mechanical", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Bernoulli theorem, Pelton wheel, Francis turbine." },
          ],
        },
      ],
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "III-I",
          label: "3rd Year 1st Semester (III-I)",
          totalCredits: 21,
          subjects: [
            { id: "me-3-1-dme", code: "ME501PC", name: "Design of Machine Elements", branch: "Mechanical", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Fatigue, shafts, keys, bolted and welded joints." },
          ],
        },
        {
          semester: "III-II",
          label: "3rd Year 2nd Semester (III-II)",
          totalCredits: 21,
          subjects: [
            { id: "me-3-2-ht", code: "ME601PC", name: "Heat Transfer", branch: "Mechanical", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Conduction, convection, radiation, heat exchangers." },
          ],
        },
      ],
    },
    {
      year: "4th Year",
      semesters: [
        {
          semester: "IV-I",
          label: "4th Year 1st Semester (IV-I)",
          totalCredits: 20,
          subjects: [
            { id: "me-4-1-cad", code: "ME701PC", name: "CAD/CAM", branch: "Mechanical", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "CNC programming, geometric modeling, robotics." },
          ],
        },
        {
          semester: "IV-II",
          label: "4th Year 2nd Semester (IV-II)",
          totalCredits: 18,
          subjects: [
            { id: "me-4-2-project", code: "ME801PR", name: "Major Project & Seminar", branch: "Mechanical", year: "4th Year", semester: "IV-II", category: "PC", credits: 10, ltp: "0-0-20", type: "Practical", hasFullSyllabus: false, description: "Final Year Capstone Project." },
          ],
        },
      ],
    },
  ],
  Civil: [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "I-I",
          label: "1st Year 1st Semester (I-I)",
          totalCredits: 19.5,
          subjects: [
            { id: "ce-1-1-ma101", code: "MA101BS", name: "Matrices and Calculus", branch: "Civil", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Matrices and single/multivariable calculus." },
            { id: "ce-1-1-ap102", code: "AP102BS", name: "Applied Physics", branch: "Civil", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Acoustics, elasticity, ultrasonics." },
            { id: "ce-1-1-cs103", code: "CS103ES", name: "Programming for Problem Solving", branch: "Civil", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "C programming." },
            { id: "ce-1-1-ee104", code: "EE104ES", name: "Basic Electrical Engineering", branch: "Civil", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "Circuits, Transformers, Machines." },
          ],
        },
        {
          semester: "I-II",
          label: "1st Year 2nd Semester (I-II)",
          totalCredits: 20.5,
          subjects: [
            { id: "ce-1-2-em", code: "CE202ES", name: "Engineering Mechanics", branch: "Civil", year: "1st Year", semester: "I-II", category: "ES", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Statics, dynamics, friction." },
          ],
        },
      ],
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "II-I",
          label: "2nd Year 1st Semester (II-I)",
          totalCredits: 20,
          subjects: [
            { id: "ce-fm", code: "CE301PC", name: "Fluid Mechanics", branch: "Civil", year: "2nd Year", semester: "II-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Fluid statics, dynamics, pipe flow, boundary layers." },
            { id: "ce-2-1-survey", code: "CE302PC", name: "Surveying and Geomatics", branch: "Civil", year: "2nd Year", semester: "II-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Theodolite, leveling, total station, GIS." },
          ],
        },
        {
          semester: "II-II",
          label: "2nd Year 2nd Semester (II-II)",
          totalCredits: 20,
          subjects: [
            { id: "ce-2-2-sm", code: "CE401PC", name: "Structural Analysis", branch: "Civil", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Moment distribution, slope deflection, energy methods." },
          ],
        },
      ],
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "III-I",
          label: "3rd Year 1st Semester (III-I)",
          totalCredits: 21,
          subjects: [
            { id: "ce-3-1-rcc", code: "CE501PC", name: "Design of Reinforced Concrete Structures", branch: "Civil", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Limit state design of beams, slabs, columns, footings." },
          ],
        },
        {
          semester: "III-II",
          label: "3rd Year 2nd Semester (III-II)",
          totalCredits: 21,
          subjects: [
            { id: "ce-3-2-ge", code: "CE601PC", name: "Geotechnical Engineering", branch: "Civil", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Soil mechanics, permeability, shear strength." },
          ],
        },
      ],
    },
    {
      year: "4th Year",
      semesters: [
        {
          semester: "IV-I",
          label: "4th Year 1st Semester (IV-I)",
          totalCredits: 20,
          subjects: [
            { id: "ce-4-1-te", code: "CE701PC", name: "Transportation Engineering", branch: "Civil", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Highway alignment, pavement design, traffic control." },
          ],
        },
        {
          semester: "IV-II",
          label: "4th Year 2nd Semester (IV-II)",
          totalCredits: 18,
          subjects: [
            { id: "ce-4-2-project", code: "CE801PR", name: "Major Project & Seminar", branch: "Civil", year: "4th Year", semester: "IV-II", category: "PC", credits: 10, ltp: "0-0-20", type: "Practical", hasFullSyllabus: false, description: "Final Year Capstone Project." },
          ],
        },
      ],
    },
  ],
  IT: [
    {
      year: "1st Year",
      semesters: [
        {
          semester: "I-I",
          label: "1st Year 1st Semester (I-I)",
          totalCredits: 19.5,
          subjects: [
            { id: "it-1-1-ma101", code: "MA101BS", name: "Matrices and Calculus", branch: "IT", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Matrices and calculus." },
            { id: "it-1-1-ap102", code: "AP102BS", name: "Applied Physics", branch: "IT", year: "1st Year", semester: "I-I", category: "BS", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Semiconductors and quantum physics." },
            { id: "it-1-1-cs103", code: "CS103ES", name: "Programming for Problem Solving", branch: "IT", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "C programming fundamentals." },
            { id: "it-1-1-ee104", code: "EE104ES", name: "Basic Electrical Engineering", branch: "IT", year: "1st Year", semester: "I-I", category: "ES", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: true, description: "DC & AC Circuits, Transformers." },
          ],
        },
        {
          semester: "I-II",
          label: "1st Year 2nd Semester (I-II)",
          totalCredits: 20.5,
          subjects: [
            { id: "it-1-2-ds", code: "IT203PC", name: "Data Structures", branch: "IT", year: "1st Year", semester: "I-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Linear and non-linear data structures." },
          ],
        },
      ],
    },
    {
      year: "2nd Year",
      semesters: [
        {
          semester: "II-I",
          label: "2nd Year 1st Semester (II-I)",
          totalCredits: 20,
          subjects: [
            { id: "it-2-1-os", code: "IT301PC", name: "Operating Systems", branch: "IT", year: "2nd Year", semester: "II-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Operating system concepts." },
          ],
        },
        {
          semester: "II-II",
          label: "2nd Year 2nd Semester (II-II)",
          totalCredits: 20,
          subjects: [
            { id: "it-2-2-dbms", code: "IT401PC", name: "Database Management Systems", branch: "IT", year: "2nd Year", semester: "II-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: true, description: "Relational database concepts." },
          ],
        },
      ],
    },
    {
      year: "3rd Year",
      semesters: [
        {
          semester: "III-I",
          label: "3rd Year 1st Semester (III-I)",
          totalCredits: 21,
          subjects: [
            { id: "it-3-1-cn", code: "IT501PC", name: "Computer Networks", branch: "IT", year: "3rd Year", semester: "III-I", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "Network protocols." },
          ],
        },
        {
          semester: "III-II",
          label: "3rd Year 2nd Semester (III-II)",
          totalCredits: 21,
          subjects: [
            { id: "it-3-2-wt", code: "IT601PC", name: "Web Technologies", branch: "IT", year: "3rd Year", semester: "III-II", category: "PC", credits: 4, ltp: "3-1-0", type: "Theory", hasFullSyllabus: false, description: "HTML, CSS, JS, Servlets, JSP." },
          ],
        },
      ],
    },
    {
      year: "4th Year",
      semesters: [
        {
          semester: "IV-I",
          label: "4th Year 1st Semester (IV-I)",
          totalCredits: 20,
          subjects: [
            { id: "it-4-1-is", code: "IT701PC", name: "Information Security", branch: "IT", year: "4th Year", semester: "IV-I", category: "PC", credits: 3, ltp: "3-0-0", type: "Theory", hasFullSyllabus: false, description: "Cryptography and network security." },
          ],
        },
        {
          semester: "IV-II",
          label: "4th Year 2nd Semester (IV-II)",
          totalCredits: 18,
          subjects: [
            { id: "it-4-2-project", code: "IT801PR", name: "Project Stage-II", branch: "IT", year: "4th Year", semester: "IV-II", category: "PC", credits: 10, ltp: "0-0-20", type: "Practical", hasFullSyllabus: false, description: "Final Year Project." },
          ],
        },
      ],
    },
  ],
};
