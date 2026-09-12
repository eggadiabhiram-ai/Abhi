import { DiagramData } from "../types";

/**
 * Authentic textbook-grade vector schematics for Transformers,
 * modeled after classical Indian & international university engineering textbooks
 * (B.L. Theraja, P.S. Bimbhra, Alexander & Sadiku, JNTUH Exam Answer Key).
 */

export const TRANSFORMER_CONSTRUCTION_SVG = `<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto select-none" style="font-family: 'JetBrains Mono', 'Plus Jakarta Sans', system-ui, sans-serif;">
  <defs>
    <!-- Arrow marker for current and flux -->
    <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#0284c7" />
    </marker>
    <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
    </marker>
    <marker id="arrow-flux" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L0,7 L9,3.5 z" fill="#16a34a" />
    </marker>
    <marker id="arrow-dark" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L7,2.5 z" fill="#334155" />
    </marker>

    <!-- Core lamination stripe pattern -->
    <pattern id="coreLaminations" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" stroke-width="1.2" />
    </pattern>

    <!-- Linear gradient for 3D metallic iron core -->
    <linearGradient id="coreMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="50%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Copper gradient for primary winding -->
    <linearGradient id="copperGradPrimary" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="50%" stop-color="#fb923c" />
      <stop offset="100%" stop-color="#9a3412" />
    </linearGradient>

    <!-- Copper gradient for secondary winding -->
    <linearGradient id="copperGradSecondary" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="50%" stop-color="#fcd34d" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>

  <!-- Technical Figure Background / Border -->
  <rect x="10" y="10" width="780" height="460" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  
  <!-- Subtle Header Bar like textbook -->
  <rect x="10" y="10" width="780" height="32" rx="8" fill="#f8fafc" />
  <text x="30" y="31" font-size="12" font-weight="700" fill="#1e293b" letter-spacing="0.5">FIG 1.1: CORE-TYPE SINGLE-PHASE TRANSFORMER WORKING SCHEMATIC</text>
  <text x="660" y="31" font-size="11" font-weight="600" fill="#64748b">JNTUH R22 [BEE & EM-I]</text>
  <line x1="10" y1="42" x2="790" y2="42" stroke="#e2e8f0" stroke-width="1" />

  <!-- 1. MAGNETIC CORE (LAMINATED SILICON STEEL) -->
  <!-- Outer core rectangle -->
  <rect x="250" y="70" width="300" height="320" rx="4" fill="url(#coreMetal)" stroke="#334155" stroke-width="2.5" />
  <rect x="250" y="70" width="300" height="320" rx="4" fill="url(#coreLaminations)" opacity="0.6" />
  
  <!-- Inner window (cut-out) -->
  <rect x="340" y="145" width="120" height="170" rx="3" fill="#ffffff" stroke="#334155" stroke-width="2.5" />

  <!-- Core Component Labels & Dimensional callouts -->
  <!-- Top Yoke -->
  <text x="400" y="105" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">TOP YOKE</text>
  <!-- Bottom Yoke -->
  <text x="400" y="355" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">BOTTOM YOKE</text>
  <!-- Left Limb (Primary Limb) -->
  <text x="295" y="235" text-anchor="middle" font-size="10" font-weight="700" fill="#475569" transform="rotate(-90 295 235)">PRIMARY LIMB</text>
  <!-- Right Limb (Secondary Limb) -->
  <text x="505" y="235" text-anchor="middle" font-size="10" font-weight="700" fill="#475569" transform="rotate(90 505 235)">SECONDARY LIMB</text>

  <!-- 2. MUTUAL MAGNETIC FLUX LOOP (Phi_m) -->
  <!-- Closed path clockwise with dashed line -->
  <rect x="295" y="107" width="210" height="246" rx="12" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="6,4" />
  <!-- Flux Direction Arrows -->
  <line x1="390" y1="107" x2="425" y2="107" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-flux)" />
  <line x1="505" y1="210" x2="505" y2="245" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-flux)" />
  <line x1="420" y1="353" x2="385" y2="353" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-flux)" />
  <line x1="295" y1="250" x2="295" y2="215" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrow-flux)" />
  
  <!-- Flux Label Badge -->
  <rect x="360" y="117" width="80" height="22" rx="4" fill="#dcfce7" stroke="#86efac" stroke-width="1" />
  <text x="400" y="132" text-anchor="middle" font-size="11" font-weight="800" fill="#15803d">Mutual Flux Φ</text>

  <!-- 3. PRIMARY WINDING (LEFT LIMB) - Copper Coils N1 turns -->
  <g id="primary-winding">
    <!-- Coil turns overlapping limb -->
    <!-- Turn 1 -->
    <path d="M 230 160 C 230 152, 360 152, 360 160 C 360 168, 230 168, 230 160 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="160" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="160" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 2 -->
    <path d="M 230 185 C 230 177, 360 177, 360 185 C 360 193, 230 193, 230 185 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="185" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="185" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 3 -->
    <path d="M 230 210 C 230 202, 360 202, 360 210 C 360 218, 230 218, 230 210 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="210" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="210" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 4 -->
    <path d="M 230 235 C 230 227, 360 227, 360 235 C 360 243, 230 243, 230 235 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="235" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="235" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 5 -->
    <path d="M 230 260 C 230 252, 360 252, 360 260 C 360 268, 230 268, 230 260 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="260" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="260" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 6 -->
    <path d="M 230 285 C 230 277, 360 277, 360 285 C 360 293, 230 293, 230 285 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="285" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="285" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Turn 7 -->
    <path d="M 230 310 C 230 302, 360 302, 360 310 C 360 318, 230 318, 230 310 Z" fill="url(#copperGradPrimary)" stroke="#9a3412" stroke-width="1.8" />
    <ellipse cx="230" cy="310" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />
    <ellipse cx="360" cy="310" rx="6" ry="9" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5" />

    <!-- Primary Leads & Terminals -->
    <!-- Top terminal wire -->
    <line x1="120" y1="155" x2="230" y2="155" stroke="#0284c7" stroke-width="2.5" />
    <!-- Bottom terminal wire -->
    <line x1="120" y1="315" x2="230" y2="315" stroke="#0284c7" stroke-width="2.5" />

    <!-- Dot Polarity Convention (Top lead) -->
    <circle cx="215" cy="144" r="5" fill="#0f172a" />
    <text x="215" y="134" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">DOT (•)</text>

    <!-- AC Voltage Source Generator Circle -->
    <circle cx="80" cy="235" r="24" fill="#f0f9ff" stroke="#0284c7" stroke-width="2.5" />
    <!-- Sine wave inside circle -->
    <path d="M 68 235 Q 74 223 80 235 Q 86 247 92 235" fill="none" stroke="#0284c7" stroke-width="2.5" />
    
    <!-- Source connection lines -->
    <line x1="80" y1="211" x2="80" y2="155" stroke="#0284c7" stroke-width="2.5" />
    <line x1="80" y1="155" x2="120" y2="155" stroke="#0284c7" stroke-width="2.5" />
    <line x1="80" y1="259" x2="80" y2="315" stroke="#0284c7" stroke-width="2.5" />
    <line x1="80" y1="315" x2="120" y2="315" stroke="#0284c7" stroke-width="2.5" />

    <!-- Input voltage V1 label -->
    <text x="40" y="240" font-size="13" font-weight="800" fill="#0369a1">V₁ ~</text>
    <text x="75" y="145" font-size="10" font-weight="600" fill="#64748b">AC Supply</text>

    <!-- Primary Current I1 Arrow -->
    <line x1="140" y1="155" x2="185" y2="155" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="165" y="142" font-size="12" font-weight="800" fill="#dc2626">I₁ →</text>

    <!-- Induced EMF E1 -->
    <text x="205" y="235" font-size="12" font-weight="800" fill="#0284c7">E₁</text>
    <line x1="212" y1="220" x2="212" y2="190" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arrow-blue)" />
    <line x1="212" y1="242" x2="212" y2="272" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arrow-blue)" />

    <!-- Primary Turns label -->
    <rect x="235" y="325" width="85" height="20" rx="3" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
    <text x="277" y="339" text-anchor="middle" font-size="10.5" font-weight="700" fill="#92400e">N₁ Turns</text>
  </g>

  <!-- 4. SECONDARY WINDING (RIGHT LIMB) - N2 turns -->
  <g id="secondary-winding">
    <!-- Turn 1 -->
    <path d="M 440 165 C 440 157, 570 157, 570 165 C 570 173, 440 173, 440 165 Z" fill="url(#copperGradSecondary)" stroke="#92400e" stroke-width="1.8" />
    <ellipse cx="440" cy="165" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="570" cy="165" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />

    <!-- Turn 2 -->
    <path d="M 440 200 C 440 192, 570 192, 570 200 C 570 208, 440 208, 440 200 Z" fill="url(#copperGradSecondary)" stroke="#92400e" stroke-width="1.8" />
    <ellipse cx="440" cy="200" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="570" cy="200" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />

    <!-- Turn 3 -->
    <path d="M 440 235 C 440 227, 570 227, 570 235 C 570 243, 440 243, 440 235 Z" fill="url(#copperGradSecondary)" stroke="#92400e" stroke-width="1.8" />
    <ellipse cx="440" cy="235" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="570" cy="235" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />

    <!-- Turn 4 -->
    <path d="M 440 270 C 440 262, 570 262, 570 270 C 570 278, 440 278, 440 270 Z" fill="url(#copperGradSecondary)" stroke="#92400e" stroke-width="1.8" />
    <ellipse cx="440" cy="270" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="570" cy="270" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />

    <!-- Turn 5 -->
    <path d="M 440 305 C 440 297, 570 297, 570 305 C 570 313, 440 313, 440 305 Z" fill="url(#copperGradSecondary)" stroke="#92400e" stroke-width="1.8" />
    <ellipse cx="440" cy="305" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="570" cy="305" rx="6" ry="9" fill="#d97706" stroke="#78350f" stroke-width="1.5" />

    <!-- Secondary Leads & Terminals -->
    <!-- Top terminal wire -->
    <line x1="570" y1="165" x2="680" y2="165" stroke="#0284c7" stroke-width="2.5" />
    <!-- Bottom terminal wire -->
    <line x1="570" y1="305" x2="680" y2="305" stroke="#0284c7" stroke-width="2.5" />

    <!-- Dot Polarity Convention (Top lead) -->
    <circle cx="585" cy="154" r="5" fill="#0f172a" />
    <text x="585" y="144" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">DOT (•)</text>

    <!-- Secondary Current I2 Arrow (Towards Load) -->
    <line x1="605" y1="165" x2="650" y2="165" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
    <text x="625" y="152" font-size="12" font-weight="800" fill="#dc2626">I₂ →</text>

    <!-- Load Box ZL -->
    <rect x="680" y="200" width="40" height="70" rx="3" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" />
    <line x1="680" y1="165" x2="700" y2="165" stroke="#0284c7" stroke-width="2.5" />
    <line x1="700" y1="165" x2="700" y2="200" stroke="#0284c7" stroke-width="2.5" />
    
    <line x1="680" y1="305" x2="700" y2="305" stroke="#0284c7" stroke-width="2.5" />
    <line x1="700" y1="305" x2="700" y2="270" stroke="#0284c7" stroke-width="2.5" />

    <text x="700" y="240" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">Z_L</text>
    <text x="735" y="240" font-size="10" font-weight="600" fill="#64748b">LOAD</text>

    <!-- Terminal Voltage V2 -->
    <text x="730" y="185" font-size="13" font-weight="800" fill="#0369a1">+ V₂</text>
    <text x="730" y="295" font-size="13" font-weight="800" fill="#0369a1">-</text>

    <!-- Induced EMF E2 -->
    <text x="585" y="235" font-size="12" font-weight="800" fill="#0284c7">E₂</text>
    <line x1="592" y1="220" x2="592" y2="195" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arrow-blue)" />
    <line x1="592" y1="242" x2="592" y2="267" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arrow-blue)" />

    <!-- Secondary Turns label -->
    <rect x="475" y="325" width="85" height="20" rx="3" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
    <text x="517" y="339" text-anchor="middle" font-size="10.5" font-weight="700" fill="#92400e">N₂ Turns</text>
  </g>

  <!-- 5. CALLOUT LEADER LINES & EXPLANATION LABELS (AUTHENTIC BOOK ANNOTATIONS) -->
  <!-- Callout to Laminated Core -->
  <line x1="300" y1="70" x2="230" y2="48" stroke="#64748b" stroke-width="1.2" />
  <circle cx="300" cy="70" r="3" fill="#64748b" />
  <text x="140" y="47" font-size="10.5" font-weight="700" fill="#334155">Laminated Silicon Steel Core (0.35 mm)</text>

  <!-- Callout to Primary Winding -->
  <line x1="230" y1="210" x2="160" y2="195" stroke="#64748b" stroke-width="1.2" />
  <circle cx="230" cy="210" r="3" fill="#64748b" />
  <text x="90" y="193" font-size="10.5" font-weight="700" fill="#ea580c">Primary Winding</text>

  <!-- Callout to Secondary Winding -->
  <line x1="570" y1="235" x2="625" y2="215" stroke="#64748b" stroke-width="1.2" />
  <circle cx="570" cy="235" r="3" fill="#64748b" />
  <text x="630" y="213" font-size="10.5" font-weight="700" fill="#d97706">Secondary Winding</text>

  <!-- 6. BOTTOM FORMULA & PARAMETER LEGEND BAR -->
  <rect x="25" y="405" width="750" height="55" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
  
  <text x="40" y="426" font-size="11" font-weight="800" fill="#0f172a">EMF Equation:</text>
  <text x="135" y="426" font-size="11.5" font-weight="700" fill="#0284c7">E₁ = 4.44 f N₁ Φₘ</text>
  <text x="260" y="426" font-size="11.5" font-weight="700" fill="#0284c7">E₂ = 4.44 f N₂ Φₘ</text>

  <text x="40" y="447" font-size="11" font-weight="800" fill="#0f172a">Transformation Ratio (k):</text>
  <text x="210" y="447" font-size="11.5" font-weight="700" fill="#b45309">V₂ / V₁ = E₂ / E₁ = N₂ / N₁ = I₁ / I₂ = k</text>

  <text x="560" y="426" font-size="10.5" font-weight="700" fill="#15803d">f = 50 Hz (Supply Freq)</text>
  <text x="560" y="447" font-size="10.5" font-weight="700" fill="#15803d">Φₘ = Bₘ × A (Max Core Flux)</text>
</svg>`;

export const TRANSFORMER_EQUIVALENT_CIRCUIT_SVG = `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto select-none" style="font-family: 'JetBrains Mono', 'Plus Jakarta Sans', system-ui, sans-serif;">
  <defs>
    <marker id="arrow-eq-blue" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L7,2.5 z" fill="#0284c7" />
    </marker>
    <marker id="arrow-eq-red" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L7,2.5 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect x="10" y="10" width="780" height="430" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  <rect x="10" y="10" width="780" height="32" rx="8" fill="#f8fafc" />
  <text x="30" y="31" font-size="12" font-weight="700" fill="#1e293b" letter-spacing="0.5">FIG 1.2: EXACT EQUIVALENT CIRCUIT OF 1-PHASE TRANSFORMER (REFERRED TO PRIMARY)</text>
  <text x="670" y="31" font-size="11" font-weight="600" fill="#64748b">JNTUH R22 [BEE & EM-I]</text>
  <line x1="10" y1="42" x2="790" y2="42" stroke="#e2e8f0" stroke-width="1" />

  <!-- PRIMARY INPUT BUS -->
  <!-- Top line: 50 -> 140 -->
  <line x1="60" y1="120" x2="140" y2="120" stroke="#0284c7" stroke-width="2.5" />
  <circle cx="60" cy="120" r="4" fill="#0284c7" />
  <circle cx="60" cy="340" r="4" fill="#0284c7" />
  <text x="40" y="235" font-size="14" font-weight="800" fill="#0284c7">V₁ ~</text>
  <line x1="60" y1="340" x2="730" y2="340" stroke="#0284c7" stroke-width="2.5" />

  <!-- Primary Current I1 -->
  <line x1="75" y1="120" x2="115" y2="120" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-eq-red)" />
  <text x="95" y="108" font-size="11" font-weight="700" fill="#dc2626">I₁ →</text>

  <!-- R1 (Primary Winding Resistance) -->
  <rect x="140" y="110" width="45" height="20" rx="2" fill="#fed7aa" stroke="#c2410c" stroke-width="1.8" />
  <text x="162" y="124" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9a3412">R₁</text>
  <text x="162" y="98" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Primary Res.</text>

  <!-- Connect to X1 -->
  <line x1="185" y1="120" x2="210" y2="120" stroke="#0284c7" stroke-width="2.5" />

  <!-- X1 (Primary Leakage Reactance) - Inductor bump -->
  <path d="M 210 120 C 215 105, 225 105, 230 120 C 235 105, 245 105, 250 120 C 255 105, 265 105, 270 120" fill="none" stroke="#0284c7" stroke-width="2.5" />
  <text x="240" y="98" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">X₁</text>
  <text x="240" y="85" text-anchor="middle" font-size="9.5" font-weight="600" fill="#64748b">Leakage React.</text>

  <!-- Branch Point after R1, X1 -->
  <line x1="270" y1="120" x2="330" y2="120" stroke="#0284c7" stroke-width="2.5" />
  <circle cx="330" cy="120" r="3.5" fill="#0f172a" />

  <!-- No load current I0 -->
  <line x1="330" y1="125" x2="330" y2="160" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-eq-red)" />
  <text x="340" y="150" font-size="11" font-weight="700" fill="#dc2626">I₀ ↓ (No-load)</text>

  <!-- EXCITATION / SHUNT BRANCH (R0 & Xm) -->
  <line x1="330" y1="165" x2="300" y2="165" stroke="#0284c7" stroke-width="2" />
  <line x1="330" y1="165" x2="360" y2="165" stroke="#0284c7" stroke-width="2" />
  
  <line x1="300" y1="165" x2="300" y2="195" stroke="#0284c7" stroke-width="2" />
  <line x1="360" y1="165" x2="360" y2="195" stroke="#0284c7" stroke-width="2" />

  <!-- Current splits: Iw & Im -->
  <text x="285" y="185" font-size="10" font-weight="700" fill="#b91c1c">Iw↓</text>
  <text x="370" y="185" font-size="10" font-weight="700" fill="#b91c1c">Im↓</text>

  <!-- R0 Core Loss Resistance -->
  <rect x="290" y="195" width="20" height="45" rx="2" fill="#f1f5f9" stroke="#334155" stroke-width="1.8" />
  <text x="300" y="222" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">R₀</text>
  <text x="250" y="222" font-size="9" font-weight="600" fill="#64748b">Core Loss</text>

  <!-- Xm Magnetizing Reactance (Inductor vertical) -->
  <path d="M 360 195 C 375 200, 375 210, 360 215 C 375 220, 375 230, 360 240" fill="none" stroke="#0284c7" stroke-width="2.2" />
  <text x="385" y="222" font-size="10.5" font-weight="800" fill="#0284c7">Xₘ</text>
  <text x="385" y="235" font-size="9" font-weight="600" fill="#64748b">Magnetizing</text>

  <!-- Reconnect Shunt branch to bottom wire -->
  <line x1="300" y1="240" x2="300" y2="280" stroke="#0284c7" stroke-width="2" />
  <line x1="360" y1="240" x2="360" y2="280" stroke="#0284c7" stroke-width="2" />
  <line x1="300" y1="280" x2="360" y2="280" stroke="#0284c7" stroke-width="2" />
  <line x1="330" y1="280" x2="330" y2="340" stroke="#0284c7" stroke-width="2" />
  <circle cx="330" cy="340" r="3.5" fill="#0f172a" />

  <!-- Continue to Ideal Transformer or Referred Secondary -->
  <line x1="330" y1="120" x2="440" y2="120" stroke="#0284c7" stroke-width="2.5" />
  <!-- I2' current arrow -->
  <line x1="360" y1="120" x2="400" y2="120" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-eq-red)" />
  <text x="380" y="108" font-size="11" font-weight="700" fill="#dc2626">I₂' → (Load Current Ref.)</text>

  <!-- R2' (Secondary Resistance referred to primary: R2 / k^2) -->
  <rect x="440" y="110" width="45" height="20" rx="2" fill="#fed7aa" stroke="#c2410c" stroke-width="1.8" />
  <text x="462" y="124" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9a3412">R₂'</text>
  <text x="462" y="98" text-anchor="middle" font-size="9.5" font-weight="600" fill="#64748b">R₂/k²</text>

  <!-- Connect to X2' -->
  <line x1="485" y1="120" x2="515" y2="120" stroke="#0284c7" stroke-width="2.5" />

  <!-- X2' (Secondary Leakage Reactance referred to primary: X2 / k^2) -->
  <path d="M 515 120 C 520 105, 530 105, 535 120 C 540 105, 550 105, 555 120 C 560 105, 570 105, 575 120" fill="none" stroke="#0284c7" stroke-width="2.5" />
  <text x="545" y="98" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">X₂'</text>
  <text x="545" y="85" text-anchor="middle" font-size="9.5" font-weight="600" fill="#64748b">X₂/k²</text>

  <!-- Connect to Referred Load ZL' -->
  <line x1="575" y1="120" x2="680" y2="120" stroke="#0284c7" stroke-width="2.5" />
  
  <!-- Referred Load ZL' -->
  <rect x="660" y="180" width="40" height="70" rx="3" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" />
  <line x1="680" y1="120" x2="680" y2="180" stroke="#0284c7" stroke-width="2.5" />
  <line x1="680" y1="250" x2="680" y2="340" stroke="#0284c7" stroke-width="2.5" />
  <text x="680" y="220" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">Z_L'</text>
  <text x="735" y="220" font-size="10" font-weight="600" fill="#64748b">Z_L / k²</text>

  <!-- Output Voltage V2' -->
  <text x="715" y="145" font-size="12" font-weight="800" fill="#0369a1">+ V₂'</text>
  <text x="715" y="325" font-size="12" font-weight="800" fill="#0369a1">- (V₂/k)</text>

  <!-- Bottom Explanatory Formula strip -->
  <rect x="25" y="375" width="750" height="55" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
  <text x="40" y="396" font-size="11" font-weight="800" fill="#0f172a">Total Equivalent Resistance:</text>
  <text x="215" y="396" font-size="11" font-weight="700" fill="#0284c7">R₀₁ = R₁ + R₂' = R₁ + (R₂ / k²)</text>
  
  <text x="440" y="396" font-size="11" font-weight="800" fill="#0f172a">Total Leakage Reactance:</text>
  <text x="600" y="396" font-size="11" font-weight="700" fill="#0284c7">X₀₁ = X₁ + X₂' = X₁ + (X₂ / k²)</text>

  <text x="40" y="418" font-size="11" font-weight="800" fill="#0f172a">Total Equivalent Impedance:</text>
  <text x="215" y="418" font-size="11" font-weight="700" fill="#b45309">Z₀₁ = √(R₀₁² + X₀₁²)</text>
  
  <text x="440" y="418" font-size="11" font-weight="800" fill="#0f172a">No-load Current Equation:</text>
  <text x="600" y="418" font-size="11" font-weight="700" fill="#15803d">I₀ = √(Iw² + Im²)</text>
</svg>`;

export const TRANSFORMER_PHASOR_SVG = `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto select-none" style="font-family: 'JetBrains Mono', 'Plus Jakarta Sans', system-ui, sans-serif;">
  <defs>
    <marker id="arrow-vector-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
    </marker>
    <marker id="arrow-vector-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#0284c7" />
    </marker>
    <marker id="arrow-vector-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
    </marker>
    <marker id="arrow-vector-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#9333ea" />
    </marker>
  </defs>

  <!-- Background Canvas -->
  <rect x="10" y="10" width="780" height="430" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  <rect x="10" y="10" width="780" height="32" rx="8" fill="#f8fafc" />
  <text x="30" y="31" font-size="12" font-weight="700" fill="#1e293b" letter-spacing="0.5">FIG 1.3: PHASOR DIAGRAM ON LAGGING (INDUCTIVE) POWER FACTOR LOAD</text>
  <text x="670" y="31" font-size="11" font-weight="600" fill="#64748b">JNTUH R22 [BEE & EM-I]</text>
  <line x1="10" y1="42" x2="790" y2="42" stroke="#e2e8f0" stroke-width="1" />

  <!-- ORIGIN O (cx: 380, cy: 220) -->
  <!-- Reference Horizontal Axis: Mutual Flux Phi_m -->
  <line x1="380" y1="220" x2="680" y2="220" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-vector-green)" />
  <text x="695" y="225" font-size="13" font-weight="800" fill="#16a34a">Mutual Flux Φₘ (Ref)</text>

  <!-- Vertical Axis Upwards: -E1 and V1 direction -->
  <line x1="380" y1="220" x2="380" y2="70" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-vector-blue)" />
  <text x="385" y="65" font-size="12" font-weight="800" fill="#0284c7">-E₁ (Reversed Induced EMF)</text>

  <!-- Vertical Axis Downwards: E1 and E2 lagging Flux by 90 deg -->
  <line x1="380" y1="220" x2="380" y2="390" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-vector-blue)" />
  <text x="385" y="405" font-size="12" font-weight="800" fill="#0284c7">E₁, E₂ (Lagging Flux by 90°)</text>

  <!-- 90 deg angle arc between Phi and E1 -->
  <path d="M 420 220 A 40 40 0 0 1 380 260" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
  <text x="415" y="255" font-size="10" font-weight="700" fill="#64748b">90°</text>

  <!-- Magnetizing current Im in phase with Phi -->
  <line x1="380" y1="220" x2="480" y2="220" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-vector-red)" />
  <text x="450" y="210" font-size="11" font-weight="700" fill="#dc2626">Iₘ (Magnetizing)</text>

  <!-- Core loss component Iw in phase with -E1 -->
  <line x1="380" y1="220" x2="380" y2="140" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-vector-red)" />
  <text x="330" y="150" font-size="11" font-weight="700" fill="#dc2626">Iw (Loss)</text>

  <!-- No load current I0 = Iw + Im -->
  <line x1="380" y1="220" x2="480" y2="140" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-vector-red)" />
  <text x="490" y="138" font-size="12" font-weight="800" fill="#dc2626">I₀ (No-load Current)</text>
  <!-- Dotted completion box for I0 -->
  <line x1="480" y1="220" x2="480" y2="140" stroke="#94a3b8" stroke-dasharray="3,3" />
  <line x1="380" y1="140" x2="480" y2="140" stroke="#94a3b8" stroke-dasharray="3,3" />

  <!-- Load current I2 in 4th quadrant (Lagging V2 by phi2) -->
  <line x1="380" y1="220" x2="480" y2="340" stroke="#9333ea" stroke-width="2.5" marker-end="url(#arrow-vector-purple)" />
  <text x="495" y="350" font-size="12" font-weight="800" fill="#9333ea">I₂ (Load Current)</text>

  <!-- Secondary Terminal Voltage V2 -->
  <line x1="380" y1="220" x2="430" y2="380" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-vector-blue)" />
  <text x="440" y="390" font-size="12" font-weight="800" fill="#0284c7">V₂ (Terminal Voltage)</text>

  <!-- Reflected Secondary Current I2' = k * I2 (180 deg opposite in 2nd quadrant) -->
  <line x1="380" y1="220" x2="280" y2="100" stroke="#9333ea" stroke-width="2.5" marker-end="url(#arrow-vector-purple)" />
  <text x="210" y="95" font-size="12" font-weight="800" fill="#9333ea">I₂' (Reflected Current)</text>

  <!-- Total Primary Current I1 = I0 + I2' -->
  <line x1="380" y1="220" x2="230" y2="80" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-vector-red)" />
  <text x="170" y="75" font-size="13" font-weight="800" fill="#dc2626">I₁ (Total Primary)</text>

  <!-- Parallelogram connecting I0 and I2' to I1 -->
  <line x1="280" y1="100" x2="230" y2="80" stroke="#94a3b8" stroke-dasharray="4,4" />
  <line x1="480" y1="140" x2="230" y2="80" stroke="#94a3b8" stroke-dasharray="4,4" />

  <!-- Total Primary Voltage V1 = -E1 + I1*R1 + j*I1*X1 -->
  <!-- Start from -E1 (380, 70), add I1R1 and I1X1 -->
  <line x1="380" y1="70" x2="350" y2="55" stroke="#ea580c" stroke-width="2" />
  <text x="350" y="45" font-size="10" font-weight="700" fill="#ea580c">I₁R₁</text>
  <line x1="350" y1="55" x2="330" y2="40" stroke="#0284c7" stroke-width="2" />
  <text x="305" y="38" font-size="10" font-weight="700" fill="#0284c7">jI₁X₁</text>
  <line x1="380" y1="220" x2="330" y2="40" stroke="#0284c7" stroke-width="3" marker-end="url(#arrow-vector-blue)" />
  <text x="310" y="55" font-size="13" font-weight="800" fill="#0284c7">V₁</text>

  <!-- Origin dot O -->
  <circle cx="380" cy="220" r="5" fill="#0f172a" />
  <text x="365" y="235" font-size="13" font-weight="800" fill="#0f172a">O</text>
</svg>`;

export const TRANSFORMER_EXAM_SKETCH_SVG = `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto select-none" style="font-family: 'JetBrains Mono', 'Plus Jakarta Sans', system-ui, sans-serif;">
  <defs>
    <marker id="arrow-sketch" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Answer Sheet Paper simulation -->
  <rect x="10" y="10" width="780" height="430" rx="4" fill="#fffdfa" stroke="#cbd5e1" stroke-width="1.5" />
  
  <!-- Ruling lines like university answer paper -->
  <line x1="10" y1="40" x2="790" y2="40" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="80" x2="790" y2="80" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="120" x2="790" y2="120" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="160" x2="790" y2="160" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="200" x2="790" y2="200" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="240" x2="790" y2="240" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="280" x2="790" y2="280" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="320" x2="790" y2="320" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="360" x2="790" y2="360" stroke="#f1f5f9" stroke-width="1" />
  <line x1="10" y1="400" x2="790" y2="400" stroke="#f1f5f9" stroke-width="1" />

  <!-- Left margin line like exam booklet -->
  <line x1="75" y1="10" x2="75" y2="440" stroke="#fca5a5" stroke-width="1.5" />

  <!-- Heading handwritten style -->
  <text x="90" y="32" font-size="13" font-weight="700" fill="#0f172a">Q. Explain construction and working of 1-Phase Transformer. (Diagram)</text>

  <!-- Step 1: Draw two rectangles -->
  <!-- Outer core -->
  <rect x="230" y="70" width="280" height="280" fill="none" stroke="#0f172a" stroke-width="2.5" />
  <!-- Inner core -->
  <rect x="305" y="140" width="130" height="140" fill="none" stroke="#0f172a" stroke-width="2.5" />

  <!-- Dotted flux path -->
  <rect x="267" y="105" width="206" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,4" />
  <text x="370" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#16a34a">Φ (Flux)</text>
  <line x1="390" y1="105" x2="420" y2="105" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-sketch)" />

  <!-- Primary winding (Pencil zigzag / coils) -->
  <path d="M 210 150 L 230 150 L 210 170 L 230 170 L 210 190 L 230 190 L 210 210 L 230 210 L 210 230 L 230 230 L 210 250 L 230 250 L 210 270 L 230 270" fill="none" stroke="#0f172a" stroke-width="2.5" />
  
  <!-- Primary leads -->
  <line x1="140" y1="150" x2="210" y2="150" stroke="#0f172a" stroke-width="2" />
  <line x1="140" y1="270" x2="210" y2="270" stroke="#0f172a" stroke-width="2" />
  <circle cx="140" cy="150" r="3" fill="#0f172a" />
  <circle cx="140" cy="270" r="3" fill="#0f172a" />
  <text x="100" y="215" font-size="13" font-weight="800" fill="#0f172a">V₁ (AC)</text>
  <text x="160" y="142" font-size="11" font-weight="700" fill="#dc2626">I₁ →</text>
  <circle cx="195" cy="142" r="3" fill="#0f172a" />
  <text x="195" y="135" text-anchor="middle" font-size="9" font-weight="700">DOT</text>

  <!-- Secondary winding (Pencil zigzag / coils) -->
  <path d="M 510 150 L 530 150 L 510 170 L 530 170 L 510 190 L 530 190 L 510 210 L 530 210 L 510 230 L 530 230 L 510 250 L 530 250 L 510 270 L 530 270" fill="none" stroke="#0f172a" stroke-width="2.5" />

  <!-- Secondary leads -->
  <line x1="530" y1="150" x2="620" y2="150" stroke="#0f172a" stroke-width="2" />
  <line x1="530" y1="270" x2="620" y2="270" stroke="#0f172a" stroke-width="2" />
  <circle cx="620" cy="150" r="3" fill="#0f172a" />
  <circle cx="620" cy="270" r="3" fill="#0f172a" />
  
  <!-- Load Box -->
  <rect x="620" y="180" width="35" height="60" fill="none" stroke="#0f172a" stroke-width="2" />
  <line x1="620" y1="150" x2="637" y2="150" stroke="#0f172a" stroke-width="2" />
  <line x1="637" y1="150" x2="637" y2="180" stroke="#0f172a" stroke-width="2" />
  <line x1="620" y1="270" x2="637" y2="270" stroke="#0f172a" stroke-width="2" />
  <line x1="637" y1="270" x2="637" y2="240" stroke="#0f172a" stroke-width="2" />
  <text x="637" y="215" text-anchor="middle" font-size="11" font-weight="800">LOAD</text>
  <text x="560" y="142" font-size="11" font-weight="700" fill="#dc2626">I₂ →</text>
  <circle cx="545" cy="142" r="3" fill="#0f172a" />
  <text x="545" y="135" text-anchor="middle" font-size="9" font-weight="700">DOT</text>

  <!-- Exam marking labels with pointer lines -->
  <text x="150" y="325" font-size="11" font-weight="700" fill="#0f172a">Primary: N₁ turns, E₁</text>
  <text x="490" y="325" font-size="11" font-weight="700" fill="#0f172a">Secondary: N₂ turns, E₂</text>

  <line x1="280" y1="70" x2="280" y2="50" stroke="#0f172a" stroke-width="1.2" />
  <text x="280" y="45" text-anchor="middle" font-size="11" font-weight="700">Laminated Iron Core</text>

  <!-- 2-min exam checklist box -->
  <rect x="100" y="365" width="670" height="55" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
  <text x="115" y="385" font-size="11" font-weight="800" fill="#0f172a">Exam Scoring Rubric Checklist (Full 10/10 Marks):</text>
  <text x="115" y="405" font-size="10.5" font-weight="600" fill="#334155">1. Two concentric rectangles (Core)  2. Primary coil N₁ + AC supply V₁  3. Secondary coil N₂ + Load ZL  4. Dotted flux Φ loop with arrows  5. Polarity Dots</text>
</svg>`;

export const TRANSFORMER_PARTS_LEGEND = [
  {
    part: "Laminated Silicon Steel Core",
    function: "Provides a continuous low reluctance path for magnetic flux. Silicon steel (3-4% Si) reduces hysteresis loss, and thin laminations (0.35 mm to 0.5 mm) reduce eddy current losses.",
  },
  {
    part: "Primary Winding (N1 turns)",
    function: "Connected to AC source (V1). Draws magnetizing and load current to produce alternating magnetic flux in the core according to Faraday's law.",
  },
  {
    part: "Secondary Winding (N2 turns)",
    function: "Coupled via mutual flux. Generates induced EMF E2 by mutual induction and supplies electrical power to the connected load at desired voltage.",
  },
  {
    part: "Mutual Magnetic Flux (Φm)",
    function: "Links both primary and secondary windings magnetically without any direct electrical connection, transferring power at constant frequency.",
  },
  {
    part: "Conservator Tank & Breather (with Silica Gel)",
    function: "Accommodates oil expansion and contraction during load cycles. The breather absorbs moisture from incoming air using blue cobalt-impregnated silica gel (turns pink when wet).",
  },
  {
    part: "Buchholz Relay",
    function: "Gas-actuated protective relay installed in the pipe connecting core tank and conservator. Detects incipient faults (minor gas collection) and severe internal short-circuits (trips circuit breaker).",
  },
];

export const TRANSFORMER_DIAGRAM_DATA: DiagramData = {
  needed: true,
  title: "Single-Phase Transformer Working Construction, Equivalent Circuit & Phasor Diagram",
  howToDrawInExam: `Step-by-step 2-minute exam sketch guide:
1. Draw two concentric rectangles on your answer sheet to represent the core (outer 10cm x 10cm, inner 5cm x 5cm).
2. Draw 6-7 coil turns on the left limb and label "Primary Winding (N1 turns)". Add AC supply symbol and label "V1".
3. Draw 4-5 coil turns on the right limb and label "Secondary Winding (N2 turns)". Connect to a rectangular load box and label "ZL" and "V2".
4. Draw a central dotted dashed line inside the core with 4 clockwise arrows and label "Mutual Flux Φ".
5. Mark dot polarity conventions (•) at the top of both windings.
6. Write the transformation formula: V2 / V1 = E2 / E1 = N2 / N1 = I1 / I2 = k.`,
  svgCode: TRANSFORMER_CONSTRUCTION_SVG,
  diagramType: "transformer",
  subViews: [
    {
      id: "construction",
      label: "1. Textbook Working Schematic",
      svgCode: TRANSFORMER_CONSTRUCTION_SVG,
      description: "Authentic textbook figure of core-type transformer showing laminated silicon-steel core, primary & secondary copper windings, mutual flux path, and dot polarity.",
      howToDrawNotes: "Draw 2 concentric boxes for core, coil loops on left and right limbs, dotted flux circle in between.",
    },
    {
      id: "equivalent-circuit",
      label: "2. Exact Equivalent Circuit",
      svgCode: TRANSFORMER_EQUIVALENT_CIRCUIT_SVG,
      description: "Complete electrical equivalent circuit referred to primary side showing R1, X1, shunt core loss branch (R0, Xm), and referred secondary parameters R2', X2', ZL'.",
      howToDrawNotes: "Draw R1 + X1 in series, then parallel shunt branch R0 || Xm, then series R2' + X2' and load ZL'.",
    },
    {
      id: "phasor-diagram",
      label: "3. Phasor Diagram (Lagging Load)",
      svgCode: TRANSFORMER_PHASOR_SVG,
      description: "Vector phasor diagram for inductive load showing mutual flux reference Φ, induced EMFs lagging by 90°, no-load current I0, and primary voltage drops.",
      howToDrawNotes: "Flux Φ horizontal reference, E1 and E2 vertically downwards, -E1 vertically upwards, I2 lagging in 4th quadrant.",
    },
    {
      id: "exam-sketch",
      label: "4. 2-Min Exam Sheet Sketch",
      svgCode: TRANSFORMER_EXAM_SKETCH_SVG,
      description: "Simplified hand-sketch representation optimized for reproducing on JNTUH university answer sheets in under 2 minutes to score maximum marks.",
      howToDrawNotes: "Use pen/pencil with minimal lines, concentric core boxes, zigzag windings, and clear labels.",
    },
  ],
  keyFormulas: [
    "EMF Equation: E₁ = 4.44 × f × N₁ × Φₘ",
    "Transformation Ratio: V₂/V₁ = E₂/E₁ = N₂/N₁ = I₁/I₂ = k",
    "Maximum Flux: Φₘ = Bₘ × A (Weber)",
    "Efficiency: η = (kVA × cos φ) / (kVA × cos φ + Pi + Pc) × 100%",
    "Condition for Max Efficiency: Copper Loss = Iron Loss (W_cu = W_i)",
  ],
  partsLegend: TRANSFORMER_PARTS_LEGEND,
};

export const TRANSFORMER_DIAGRAM_COLLECTION = TRANSFORMER_DIAGRAM_DATA;

