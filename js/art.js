/* =========================================================
   CAFÉ MINJ — illustrations (all hand-built SVG, no images)
   Item art is drawn in a 120 × 120 box, base centred at (60, 110).
   ========================================================= */

window.ART = (function () {
  const C = {
    bottle: "#14354A", bottleInk: "#0C2131", gold: "#BF8B3B", goldSoft: "#E8C48A",
    ivory: "#F3EEE3", mint: "#A8CBB7", mintDeep: "#86AE9B", teak: "#6A3A22",
    teakDark: "#4A2717", coffee: "#3B2014", crema: "#A0612F", skin: "#8A5638",
    skinShade: "#683C24", hair: "#15100D", shirt: "#C7CBD4", chili: "#B5452E",
    denim: "#33506F", denimDark: "#253B54", leather: "#A86B3C",
  };

  /* ---------- the menu items ----------
     Drawn in the same bold ink outline as the barista, so the whole
     foreground reads as one illustrated world. */
  const INK = "#2A1A12";
  const ol = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  /* Christmas dresses the crockery too: holly on the cups and plates, a red sleeve on the paper cup */
  const XM = (window.CAFE || {}).season === "christmas";
  const holly = (x, y, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <path d="M0,0 C-4,-3 -6,-8 -12,-8 C-10,-5 -12,-2 -16,-1 C-12,1 -10,4 -11,7 C-6,4 -3,4 0,0 Z" fill="#2E7A4A" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M0,0 C4,-3 6,-8 12,-8 C10,-5 12,-2 16,-1 C12,1 10,4 11,7 C6,4 3,4 0,0 Z" fill="#3E8F57" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
      <circle cx="-2.6" cy="-2.6" r="2.8" fill="#D8322A" stroke="${INK}" stroke-width="1"/><circle cx="2.8" cy="-2.2" r="2.8" fill="#D8322A" stroke="${INK}" stroke-width="1"/><circle cx="0" cy="1.8" r="2.8" fill="#C0262B" stroke="${INK}" stroke-width="1"/></g>`;
  const xstar = (x, y, r = 3) => `<path transform="translate(${x},${y})" d="M0,${-r} L${r * .3},${-r * .3} ${r},0 ${r * .3},${r * .3} 0,${r} ${-r * .3},${r * .3} ${-r},0 ${-r * .3},${-r * .3}Z" fill="#F0C24A"/>`;
  const shadow = (rx = 40, y = 109) => `<ellipse cx="60" cy="${y}" rx="${rx}" ry="5" fill="#000" opacity=".16"/>`;
  const plate = (rx = 46, y = 104) => `<g class="dish">${shadow(rx - 2, y + 5)}<ellipse cx="60" cy="${y}" rx="${rx}" ry="8" fill="#FBF7EE" ${ol()}/>
      <ellipse cx="60" cy="${y - 1}" rx="${rx - 12}" ry="4" fill="none" stroke="${INK}" stroke-width="1.5" opacity=".3"/>
      ${XM ? `<ellipse cx="60" cy="${y}" rx="${rx - 4}" ry="5.6" fill="none" stroke="#C0262B" stroke-width="1.8"/>${holly(60 - rx + 9, y + 1, .5, -10)}${holly(60 + rx - 9, y + 1, .5, 10)}` : ""}</g>`;
  /* steam that drifts up from hot drinks */
  const wisps = (x = 60, y = 62) => `<g class="wisps" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round">
      <path d="M${x - 8},${y} q-6,-9 0,-17 q6,-8 0,-16"/><path class="w2" d="M${x + 8},${y - 2} q6,-9 0,-17 q-6,-8 0,-16"/></g>`;
  /* a small emblem for the café: cup over an island wave */
  const emblem = (x, y, r) => `<g transform="translate(${x},${y}) scale(${r / 20})">
      <circle r="20" fill="${C.goldSoft}" ${ol(3)}/>
      <path d="M-9,-4 h16 v5 a8,8 0 0 1 -16,0 z" fill="${C.bottle}"/>
      <path d="M7,-3 h2.5 a3.5,3.5 0 0 1 0,7 h-2.5" fill="none" stroke="${C.bottle}" stroke-width="2.4"/>
      <path d="M-4,-8 q-2,-3 0,-5 M3,-8 q-2,-3 0,-5" fill="none" stroke="${C.bottle}" stroke-width="2" stroke-linecap="round"/>
      <path d="M-12,12 q4,-4 8,0 t8,0 t8,0" fill="none" stroke="${C.bottle}" stroke-width="2.4" stroke-linecap="round"/></g>`;

  const cup = (cx, w, y0, y1, handle = true) => {
    const x0 = cx - w / 2, x1 = cx + w / 2, h = y1 - y0;
    const hd = `M${x1 - 3},${y0 + h * .22} q${w * .36},-2 ${w * .34},${h * .3} q-2,${h * .3} -${w * .36},${h * .26}`;
    return `${handle ? `<path d="${hd}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="${hd}" fill="none" stroke="#FBF7EE" stroke-width="3.6" stroke-linecap="round"/>` : ""}
      <path d="M${x0},${y0} C${x0},${y1 - 2} ${cx - w * .3},${y1} ${cx},${y1} C${cx + w * .3},${y1} ${x1},${y1 - 2} ${x1},${y0} Z" fill="#FBF7EE" ${ol()}/>
      <path d="M${cx + w * .18},${y1 - 4} C${cx + w * .36},${y1 - 6} ${x1 - 5},${y1 - h * .45} ${x1 - 5},${y0 + 7}" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".28" stroke-linecap="round"/>
      ${XM ? `<path d="M${x0 + 1.2},${y0 + h * .16} L${x1 - 1.2},${y0 + h * .16} L${x1 - 1.6},${y0 + h * .3} C${cx + w * .2},${y0 + h * .34} ${cx - w * .2},${y0 + h * .34} ${x0 + 1.6},${y0 + h * .3} Z" fill="#C0262B"/>${holly(cx - w * .08, y0 + h * .62, w / 64)}` : ""}
      <ellipse cx="${cx}" cy="${y0}" rx="${w / 2}" ry="${Math.max(4, w * .11)}" fill="#C98A4B" ${ol()}/>
      <ellipse cx="${cx - w * .06}" cy="${y0 + .5}" rx="${w * .26}" ry="${Math.max(1.6, w * .05)}" fill="#5A3018"/>`;
  };

  const items = {
    espresso: () => `${plate(44, 105)}${cup(60, 44, 74, 104)}${wisps(60, 64)}`,
    ristretto: () => `${plate(36, 105)}${cup(60, 30, 84, 104)}${wisps(60, 74)}`,
    doubleshot: () => `${plate(54, 105)}${cup(40, 30, 80, 103, false)}${cup(78, 30, 80, 103)}${wisps(59, 70)}`,
    macchiato: () => `${plate(36, 106)}
      <path d="M43,62 L77,62 L74,103 Q60,107 46,103 Z" fill="#FBF7EE"/>
      <path d="M45.2,80 L74.8,80 L74,103 Q60,107 46,103 Z" fill="#5A3018"/>
      <path d="M44.4,70 L75.6,70 L74.8,80 L45.2,80 Z" fill="#E9CFA6"/>
      <path d="M43,62 L77,62 L74,103 Q60,107 46,103 Z" fill="none" ${ol()}/>
      <ellipse cx="60" cy="62" rx="17" ry="5" fill="#FFFDF7" ${ol()}/><ellipse cx="60" cy="62" rx="5.5" ry="2" fill="#C98A4B"/>
      <path d="M48,68 L49.6,98" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" stroke-linecap="round"/>
      ${XM ? `<path d="M43.6,64.5 L76.4,64.5 L76.1,68.5 L43.9,68.5 Z" fill="#C0262B"/>${holly(68, 66.5, .42)}` : ""}`,
    latte: () => `${shadow(30)}
      <path d="M40,26 L80,26 L76,104 Q60,109 44,104 Z" fill="#FFF8EA"/>
      <path d="M41.7,50 L78.3,50 L76,104 Q60,109 44,104 Z" fill="#E4C295"/>
      <path d="M43.1,80 L76.9,80 L76,104 Q60,109 44,104 Z" fill="#6B3A1E"/>
      <path d="M40,26 L80,26 L76,104 Q60,109 44,104 Z" fill="none" ${ol()}/>
      <ellipse cx="60" cy="26" rx="20" ry="5" fill="#FFFDF7" ${ol()}/>
      <path d="M73,6 L65,56" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/><path d="M73,6 L65,56" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="M47,36 L49.5,98" stroke="#fff" stroke-opacity=".65" stroke-width="3" stroke-linecap="round"/>
      ${XM ? `<path d="M41.2,44 L78.8,44 L78.5,49 L41.5,49 Z" fill="#C0262B"/>${holly(66, 46, .5)}` : ""}`,
    cookies: () => `${plate(46, 105)}
      ${[96, 86, 76].map((y, i) => `<g transform="translate(${i % 2 ? 4 : -3},0)">
        <ellipse cx="60" cy="${y + 5}" rx="31" ry="8" fill="#B5732F" ${ol(2.6)}/>
        <ellipse cx="60" cy="${y}" rx="31" ry="8" fill="#E3AD66" ${ol(2.6)}/>
        ${[[46, -1], [63, 2], [57, -4], [73, -1]].map(([x, dy]) => `<circle cx="${x}" cy="${y + dy}" r="2.4" fill="#5A3018"/>`).join("")}</g>`).join("")}`,
    jar: (o = {}) => {
      const col = o.jarColor || C.chili;
      const body = "M38,30 L82,30 Q90,34 90,46 L90,98 Q90,108 80,108 L40,108 Q30,108 30,98 L30,46 Q30,34 38,30 Z";
      return `${shadow(30)}
      <path d="${body}" fill="#EAF4F1" fill-opacity=".6"/>
      <path d="M32,56 Q60,50 88,56 L88,98 Q88,106 80,106 L40,106 Q32,106 32,98 Z" fill="#5A3018"/>
      ${[[42, 62], [56, 58], [71, 61], [81, 68], [47, 96], [64, 99], [78, 95], [38, 80]].map(([x, y]) =>
        `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="2.8" fill="#8A5530" transform="rotate(${(x * 7) % 60 - 30} ${x} ${y})"/>`).join("")}
      <rect x="40" y="66" width="40" height="24" rx="3" fill="${col}" ${ol(2.2)}/>
      <path d="M46,74 h28 M50,81 h20" stroke="#FBF7EE" stroke-opacity=".85" stroke-width="2" stroke-linecap="round"/>
      <path d="${body}" fill="none" ${ol()}/>
      <rect x="33" y="15" width="54" height="15" rx="4" fill="#93A19C" ${ol()}/><path d="M39,20 h42" stroke="#fff" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M37,38 L37,56" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>`;
    },
    cloche: () => `${shadow(50, 110)}<ellipse cx="60" cy="104" rx="52" ry="8" fill="#FBF7EE" ${ol()}/>
      <g transform="translate(13.2,22.9) scale(.78)">${cup(60, 34, 80, 104)}</g>
      <path d="M36,68 l3,6 6,3 -6,3 -3,6 -3,-6 -6,-3 6,-3z M86,62 l2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2z" fill="${C.goldSoft}" ${ol(1.6)}/>
      <g class="cloche-dome"><path d="M14,102 Q14,48 60,46 Q106,48 106,102 Z" fill="#C9CFD4" ${ol()}/>
      <path d="M25,94 Q27,60 54,53" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>
      <circle cx="60" cy="41" r="7.5" fill="${C.gold}" ${ol()}/></g>`,
    croissant: () => `${plate(48, 105)}
      <path d="M14,94 C12,72 32,54 60,54 C88,54 108,72 106,94 C102,101 92,100 89,93 C85,84 75,79 60,79 C45,79 35,84 31,93 C28,100 18,101 14,94 Z" fill="#DE9A3E" ${ol()}/>
      <path d="M26,75 q3,-6 7,-9 M42,62 q2,-2 5,-3 M57,58 l6,0 M75,60 q3,1 5,3 M93,75 q-2,-5 -5,-8" fill="none" stroke="#F7CE84" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M36,60 Q40,74 35,87 M49,55 Q52,68 49,80 M71,55 Q68,68 71,80 M84,60 Q80,74 85,87" fill="none" ${ol(2.2)}/>`,
    roll: () => `${plate(48, 106)}
      <ellipse cx="60" cy="92" rx="38" ry="13" fill="#B5732F" ${ol()}/>
      <ellipse cx="60" cy="84" rx="38" ry="15" fill="#DDA057" ${ol()}/>
      <path d="M57,84 a3,2 0 1,1 7,1 a9,5.5 0 1,1 -17,-1 a15,8.5 0 1,1 28,2 a21,11 0 1,1 -38,-3" fill="none" ${ol(2.2)}/>
      ${["M31,81 q9,7 6,14", "M52,71 q5,7 -1,13", "M77,74 q-6,8 3,15"].map(d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#FFFDF7" stroke-width="3.6" stroke-linecap="round"/>`).join("")}`,
    biscotti: () => `${plate(48, 106)}
      ${[["rotate(-14 46 86)", 18, 74, "#D9A460"], ["rotate(8 70 92)", 44, 82, "#E3AD66"]].map(([tr, x, y, col]) => `<g transform="${tr}">
        <rect x="${x}" y="${y}" width="58" height="22" rx="7" fill="${col}" ${ol()}/>
        <path d="M${x + 5},${y + 6} h48" stroke="#B5732F" stroke-width="3" stroke-linecap="round"/>
        ${[[14, 14], [31, 15], [45, 13]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="5" ry="3" fill="#FBF0D6" ${ol(1.5)}/>`).join("")}</g>`).join("")}`,
    muffin: () => `${shadow(34)}
      <path d="M32,70 L88,70 L80,107 L40,107 Z" fill="#C2503A" ${ol()}/>
      ${[42, 51, 60, 69, 78].map(x => `<path d="M${x},74 L${x + (x - 60) * -0.12},104" ${ol(1.8)} opacity=".55"/>`).join("")}
      <path d="M24,72 Q20,40 60,34 Q100,40 96,72 Q60,82 24,72 Z" fill="#A8683A" ${ol()}/>
      <path d="M35,58 Q48,44 68,45" fill="none" stroke="#CE9058" stroke-width="5" stroke-linecap="round"/>
      ${[[44, 63], [58, 54], [73, 60], [64, 69], [50, 71], [82, 67]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#3B2014"/>`).join("")}`,
  };

  /* to-go paper cup: kraft sleeve, lid, and a slot for the visitor's name */
  items.togo = (o = {}) => `${shadow(26)}
      <path d="M33,34 L87,34 L81,108 L39,108 Z" fill="#FFFDF7" ${ol()}/>
      <path d="M36.4,96 L83.6,96 L83,102 L37,102 Z" fill="${XM ? "#2E6B4E" : o.accent || C.bottle}"/>
      ${XM ? `<path d="M35.3,62 L84.7,62 L82.6,89 L37.4,89 Z" fill="#C8262B" ${ol(2.2)}/>
        <path d="M35.6,66 L84.4,66 M37.1,85 L82.9,85" stroke="#FBF6EC" stroke-width="1.6" stroke-dasharray="3 3"/>
        <rect x="43" y="68.5" width="34" height="16" rx="3" fill="#FBF6EC" stroke="${INK}" stroke-width="1.4"/>
        ${holly(81.5, 70, .42, 20)}${xstar(39.5, 76, 2.6)}` : `<path d="M35.3,62 L84.7,62 L82.6,89 L37.4,89 Z" fill="#CFA06C" ${ol(2.2)}/>
      ${[43, 51, 59, 67, 75].map(x => `<path d="M${x},65 l0,21" stroke="#A97D4E" stroke-width="1.2"/>`).join("")}`}
      <rect x="29" y="26" width="62" height="10" rx="4" fill="#F2EEE6" ${ol()}/>
      <path d="M35,26 Q37,15 60,14 Q83,15 85,26 Z" fill="#FFFDF7" ${ol()}/>
      <rect x="62" y="17" width="12" height="4" rx="2" fill="${INK}" opacity=".45"/>
      <g class="cup-name-slot"></g>`;

  const escT = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /* the visitor's name in marker, letter by letter. If `wrong` is given, it is
     written first, struck out, and the real name is written on the sleeve. */
  function cupName(name, wrong) {
    const line = (txt, y, start) => `<text x="60" y="${y}" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="#2A2522"${txt.length > 7 ? ' textLength="46" lengthAdjust="spacingAndGlyphs"' : ""}>${[...txt].map((ch, i) => `<tspan class="ink" style="animation-delay:${start + i * 90}ms">${escT(ch)}</tspan>`).join("")}</text>`;
    if (!wrong) return line(name, 54, 0);
    const t1 = wrong.length * 90;
    return line(wrong, 54, 0)
      + `<path class="strike" style="animation-delay:${t1 + 200}ms" d="M39,49 Q60,46 81,50" stroke="#2A2522" stroke-width="2" fill="none" pathLength="44"/>`
      + (XM ? line(name, 81, t1 + 700).replace('font-size="15"', 'font-size="13"') : line(name, 81, t1 + 700));
  }

  /* ---------- island bits: palms, sea, shells ---------- */
  function palm(x, dir, top = 330, scale = 1) {
    const tx = x + dir * 80, ty = top;
    const pt = t => [(1 - t) ** 2 * x + 2 * (1 - t) * t * (x + dir * 6) + t * t * tx, (1 - t) ** 2 * 905 + 2 * (1 - t) * t * 620 + t * t * ty];
    const rings = Array.from({ length: 11 }, (_, i) => { const [px, py] = pt(0.08 + i * 0.085); return `<path d="M${px - 13},${py} q13,7 26,0" stroke="#4E3420" stroke-width="3" fill="none"/>`; }).join("");
    const frond = (a, len, col) => `<g transform="translate(${tx},${ty}) rotate(${a}) scale(${scale})">
        <path d="M0,0 Q${len * .45},-34 ${len},26 Q${len * .5},-6 0,8 Z" fill="${col}"/>
        <path d="M2,4 Q${len * .45},-22 ${len - 6},22" stroke="#2D5A34" stroke-width="2.5" fill="none"/></g>`;
    return `<g class="palm">
      <path d="M${x},905 Q${x + dir * 6},620 ${tx},${ty}" stroke="#7A5634" stroke-width="24" fill="none" stroke-linecap="round"/>${rings}
      ${[[-175, 175, "#3E7A47"], [-140, 190, "#4F8F55"], [-100, 160, "#3E7A47"], [-62, 175, "#4F8F55"], [-25, 185, "#3E7A47"], [8, 160, "#4F8F55"], [-205, 150, "#4F8F55"]]
        .map(([a, l, c]) => frond(a, l, c)).join("")}
      <circle cx="${tx - 10}" cy="${ty + 14}" r="12" fill="#6B4A2E"/><circle cx="${tx + 10}" cy="${ty + 16}" r="12" fill="#5A3C24"/><circle cx="${tx}" cy="${ty + 30}" r="12" fill="#6B4A2E"/>
    </g>`;
  }
  const starfish = (x, y, r = 12, rot = 0) => `<path transform="translate(${x},${y}) rotate(${rot})" d="${Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 - 90) * Math.PI / 180, rr = i % 2 ? r * .42 : r; return `${i ? "L" : "M"}${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(" ")}Z" fill="#E07A4F"/>`;
  const shell = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-12,0 Q-14,-16 0,-18 Q14,-16 12,0 Z" fill="#F4E1CF"/>${[-8, -3, 2, 7].map(dx => `<path d="M0,-17 L${dx},0" stroke="#D9B9A0" stroke-width="1.5"/>`).join("")}<rect x="-5" y="-1" width="10" height="4" rx="2" fill="#E8CDB7"/></g>`;

  /* ---------- book covers for the reading corner (viewBox 0 0 120 170) ---------- */
  const motifs = {
    mithai: `<rect x="24" y="96" width="72" height="40" rx="4" fill="#F3D9A8"/><rect x="24" y="96" width="72" height="9" fill="#E3B65C"/>
      ${[[38, 118], [54, 118], [70, 118], [86, 118], [46, 129], [62, 129], [78, 129]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6" fill="${["#F0A23A", "#F6E3B0", "#E0663E", "#C98A1B"][i % 4]}"/>`).join("")}
      <path d="M60,96 L60,70 L84,58" stroke="#E8DCC4" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="60" cy="70" r="5" fill="#E8DCC4"/>
      <path d="M84,52 l8,6 -8,6" stroke="#E8DCC4" stroke-width="4" fill="none"/>`,
    journey: `<path d="M14,112 L44,70 L60,92 L78,62 L106,112 Z" fill="#E8DCC4" opacity=".9"/><path d="M70,74 l8,-12 8,12 Z" fill="#FFFFFF"/>
      <path d="M14,122 q12,-6 24,0 t24,0 t24,0 t24,0 L106,140 L14,140 Z" fill="#3A93A6"/>
      <path d="M22,104 q20,-30 40,-12 t40,-26" stroke="#E8C48A" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>
      ${[[22, 104], [52, 94], [74, 82], [100, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#E8C48A"/>`).join("")}`,
    fridge: `<rect x="38" y="56" width="44" height="82" rx="6" fill="#E8DCC4"/><path d="M38,84 L82,84" stroke="#B07A1E" stroke-width="3"/>
      <rect x="74" y="64" width="3" height="12" rx="1.5" fill="#B07A1E"/><rect x="74" y="92" width="3" height="16" rx="1.5" fill="#B07A1E"/>
      <circle cx="50" cy="120" r="6" fill="#E0663E"/><path d="M60,126 q4,-14 12,-12" stroke="#4E7A4A" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M86,62 l6,-4 M88,70 l8,0 M86,78 l6,4" stroke="#E8DCC4" stroke-width="2.5" stroke-linecap="round"/>`,
    waves: `<path d="M14,110 q12,-8 24,0 t24,0 t24,0 t24,0" stroke="#E8DCC4" stroke-width="4" fill="none"/>`,
  };
  function bookCover(b) {
    /* with a cover picture (the post's own image): picture on top, short title underneath */
    const words = (b.coverTitle || []).map((t, i) => `<tspan x="64" dy="${i ? 11 : 0}">${t.replace(/[&<>]/g, "")}</tspan>`).join("");
    const art = b.cover
      ? `<rect x="16" y="14" width="96" height="96" rx="2" fill="#000" opacity=".25"/>
         <image href="${b.cover}" x="16" y="14" width="96" height="96" preserveAspectRatio="xMidYMid slice"/>
         <rect x="16" y="14" width="96" height="96" rx="2" fill="none" stroke="#E8C48A" stroke-width="1.5"/>
         <text x="64" y="126" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#FBF3DF">${words}</text>`
      : motifs[b.motif] || motifs.waves;
    return `<svg viewBox="0 0 120 170" aria-hidden="true">
      <rect width="120" height="170" rx="4" fill="${b.color}"/>
      <rect x="0" y="0" width="10" height="170" fill="#000" opacity=".22"/>
      <rect x="16" y="${b.cover ? 8 : 12}" width="96" height="${b.cover ? 154 : 146}" rx="2" fill="none" stroke="#E8C48A" stroke-width="1.5" opacity="${b.cover ? 0 : 0.75}"/>
      ${art}
      <text x="64" y="${b.cover ? 158 : 150}" text-anchor="middle" font-family="Mukta, sans-serif" font-size="8" letter-spacing="1.5" fill="#E8C48A">${b.platform.toUpperCase()}</text>
    </svg>`;
  }

  /* ---------- a framed certificate (viewBox 0 0 100 120): on the wall, in his hands, on the counter ---------- */
  function certArt(c = {}) {
    const seal = c.sealColor || "#B5452E";
    return `<svg viewBox="0 0 100 120" aria-hidden="true">
      <rect x="1.5" y="1.5" width="97" height="117" rx="3" fill="#C9A06A" stroke="#2A1A12" stroke-width="3"/>
      <rect x="8" y="8" width="84" height="104" fill="#A87C47"/>
      <rect x="11" y="11" width="78" height="98" fill="#FBF3DF"/>
      <rect x="16" y="16" width="68" height="88" fill="none" stroke="#C98A1B" stroke-width="1.2"/>
      <text x="50" y="31" text-anchor="middle" font-family="Georgia, serif" font-size="7.5" letter-spacing="1.2" fill="#6B4A2E">CERTIFICATE</text>
      <path d="M30,38 h40" stroke="#C98A1B" stroke-width="1.2"/>
      <path d="M24,49 h52 M28,57 h44 M32,65 h36" stroke="#8C7A66" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
      <path d="M58,86 l-5,16 6,-4 4,6 2,-16z M70,86 l5,16 -6,-4 -4,6 -2,-16z" fill="${seal}" opacity=".9"/>
      <circle cx="64" cy="84" r="9" fill="#E3B65C" stroke="#B07A1E" stroke-width="1.5"/>
      <circle cx="64" cy="84" r="5" fill="none" stroke="#B07A1E" stroke-width="1.2"/>
      <path d="M24,92 h22" stroke="#8C7A66" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
    </svg>`;
  }
  items.frame = (o = {}) => `${shadow(28)}
      <path d="M60,104 l-14,6 M60,104 l14,6" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <svg x="29" y="30" width="62" height="75" viewBox="0 0 100 120">${certArt(o).replace(/^<svg[^>]*>|<\/svg>\s*$/g, "")}</svg>`;

  /* a book standing on the counter (for serving), cover facing the visitor */
  items.book = (o = {}) => o.platform ? `${shadow(30)}
      <rect x="32" y="22" width="62" height="88" rx="3" fill="#FBF7EE" ${ol()}/>
      <svg x="27" y="19" width="62" height="88" viewBox="0 0 120 170" preserveAspectRatio="none">${bookCover(o).replace(/^<svg[^>]*>|<\/svg>\s*$/g, "")}</svg>
      <rect x="27" y="19" width="62" height="88" rx="3" fill="none" ${ol()}/>` : `${shadow(30)}
      <rect x="32" y="22" width="62" height="88" rx="3" fill="#FBF7EE" ${ol()}/>
      <rect x="27" y="19" width="62" height="88" rx="3" fill="${o.color || C.bottle}" ${ol()}/>
      <path d="M35,21 L35,105" stroke="${INK}" stroke-width="2" opacity=".45"/>
      <rect x="42" y="28" width="40" height="70" rx="1" fill="none" stroke="${C.goldSoft}" stroke-width="1.6" opacity=".85"/>
      <path d="M49,44 l26,0 M53,52 l18,0" stroke="${C.goldSoft}" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="62" cy="76" r="9" fill="none" stroke="${C.goldSoft}" stroke-width="2.2"/>`;

  function item(art, opts = {}) {
    return (items[art] || items.espresso)(opts);
  }
  function itemSVG(art, opts = {}, cls = "") {
    return `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true">${item(art, opts)}</svg>`;
  }

  /* ---------- the barista (local coords, centred on x = 0) ---------- */
  /* the barista: John Paul in bold line-art — curly hair, big smile, beard,
     cream shirt with rolled sleeves, caramel apron, aviators parked in his hair */
  const K = "#2A1A12", SK = "#A4673F", CREAM = "#F1E8D6", CARAMEL = "#B87B3A";
  const line = (w = 4) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  function arm(id, x) {
    const fingers = [-11, -4, 3, 10].map((fx, i) =>
      `<rect x="${fx - 3.5}" y="152" width="7.5" height="${20 + (i === 1 || i === 2 ? 4 : 0)}" rx="3.7" fill="${SK}" ${line(2.6)}/>`).join("");
    return `<g transform="translate(${x},398)"><g id="${id}" class="arm">
      <path d="M-19,6 Q-19,-8 0,-8 Q19,-8 19,6 L17,70 L-17,70 Z" fill="${CREAM}" ${line()}/>
      <path d="M-8,20 q-3,18 0,36" fill="none" ${line(2)} opacity=".5"/>
      <path d="M-12,76 L12,76 L12,144 L-12,144 Z" fill="${SK}" ${line()}/>
      <rect x="-20" y="62" width="40" height="18" rx="8" fill="#F7F0E2" ${line()}/>
      ${fingers}
      <ellipse cx="13" cy="146" rx="5" ry="11" transform="rotate(-28 13 146)" fill="${SK}" ${line(2.6)}/>
      <ellipse cx="0" cy="150" rx="15" ry="13" fill="${SK}" ${line(3)}/>
    </g></g>`;
  }

  /* where each pose image sits so the heads line up (head centred on x = 0, hair top at y = 205) */
  const POSE_BOX = {
    idle: [-153, 204, 310, 375],   // standing, arms down (Gemini sheet 1)
    blink: [-153, 204, 310, 375],
    talk1: [-153, 204, 310, 375],
    talk2: [-153, 204, 310, 375],
    hands: [-202, 205, 411, 405],
    walk: [-147, 204, 311, 412],
    serve: [-162, 170, 329, 427],
    reach: [-100, 181, 349, 421],
    plate: [-155, 170, 315, 451],
    togo: [-192, 170, 352, 429],
    write: [-129, 204, 325, 414],
    book: [-156, 170, 315, 451],
    frame: [-156, 170, 315, 451],
    cloche: [-231, 204, 457, 442],
    espresso: [-118, 204, 329, 398],
    /* frames for the small animations (hello wave, talking, reactions, tongs, writing on the cup) */
    wave1: [-153, 204, 324, 384],
    wave2: [-160, 204, 325, 384],
    wave3: [-222, 205, 438, 404],
    shrug: [-204, 204, 383, 412],
    tada: [-233, 205, 459, 407],
    crossed: [-141, 205, 288, 404],
    think: [-146, 205, 295, 386],
    phone: [-173, 205, 384, 406],
    laugh: [-153, 205, 311, 399],
    point: [-171, 205, 328, 392],
    thumbs: [-155, 205, 313, 405],
    bill: [-155, 170, 311, 434],
    jar: [-152, 170, 310, 434],
    brew: [-88, 204, 338, 395],
    tongs1: [-188, 204, 384, 397],
    tongs2: [-176, 204, 333, 397],
    tongs3: [-200, 204, 437, 444],
    write1: [-129, 204, 325, 414],
    write2: [-129, 204, 325, 414],
    write3: [-129, 204, 325, 414],
    write4: [-129, 204, 325, 414],
    write5: [-176, 204, 373, 414],
  };
  /* how much taller each Christmas frame is (the Santa cap), as a share of the normal frame's height */
  const XMAS_CAP = {"bill": 0.1189, "blink": 0.1377, "book": 0.1129, "brew": 0.1307, "cloche": 0.1153, "crossed": 0.1292, "espresso": 0.1294, "frame": 0.1129, "hands": 0.1274, "jar": 0.1174, "laugh": 0.157, "phone": 0.1288, "plate": 0.1146, "point": 0.1316, "reach": 0.1807, "serve": 0.121, "shrug": 0.1236, "idle": 0.1377, "tada": 0.1268, "talk1": 0.1377, "talk2": 0.1377, "think": 0.1338, "thumbs": 0.1274, "togo": 0.1188, "tongs1": 0.213, "tongs2": 0.1285, "tongs3": 0.1147, "walk": 0.1643, "wave1": 0.1345, "wave2": 0.1345, "wave3": 0.1276, "write": 0.1248, "write1": 0.1248, "write2": 0.1248, "write3": 0.1248, "write4": 0.1248, "write5": 0.1215};
  function barista(initials = "JPM", img = null, poses = null) {
    /* the illustration version: picture poses that walk, lean, reach and serve */
    if (img) {
      const all = { idle: img, ...(poses || {}) };
      const layers = Object.entries(all).map(([name, href]) => {
        let [x, y, w, h] = POSE_BOX[name] || POSE_BOX.idle;
        const f = /\/xmas\//.test(href) ? XMAS_CAP[name] || 0 : 0; // Christmas frames are taller: room for the Santa cap
        y -= h * f; h *= 1 + f;
        return `<image class="pose${name === "idle" ? " on" : ""}" data-pose="${name}" href="${href}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
      }).join("");
      return `<g id="barista" data-pose="idle" style="transform: translate(800px, 0px)"><g id="barista-inner">
        <g id="b-lean"><g id="b-pop"><g id="b-talk"><g id="b-poses">${layers}</g></g></g></g>
        <g id="armL" class="arm"></g><g id="armR" class="arm"></g>
      </g></g>`;
    }
    return `<g id="barista" style="transform: translate(800px, 0px)"><g id="barista-inner">
      <g id="b-torso">
        <path d="M-18,348 L18,348 L19,394 Q0,404 -19,394 Z" fill="${SK}" ${line()}/>
        <path d="M-98,430 Q-98,392 -62,388 L62,388 Q98,392 98,430 L104,640 L-104,640 Z" fill="${CREAM}" ${line()}/>
        <path d="M-82,440 q6,22 2,44 M82,440 q-6,22 -2,44" fill="none" ${line(2.4)} opacity=".55"/>
        <path d="M-22,386 L0,416 L22,386" fill="${SK}"/>
        <path d="M-32,382 L-5,416 L-24,428 L-44,394 Z" fill="#F7F0E2" ${line(3.4)}/>
        <path d="M32,382 L5,416 L24,428 L44,394 Z" fill="#F7F0E2" ${line(3.4)}/>
        <circle cx="0" cy="430" r="3" fill="${K}"/>
        <path d="M-60,444 L-44,394 M60,444 L44,394" stroke="${K}" stroke-width="14" stroke-linecap="round"/>
        <path d="M-60,444 L-44,394 M60,444 L44,394" stroke="${CARAMEL}" stroke-width="8" stroke-linecap="round"/>
        <path d="M-64,442 L64,442 L74,640 L-74,640 Z" fill="${CARAMEL}" ${line()}/>
        <circle cx="-44" cy="460" r="7" fill="#D1A54E" ${line(3)}/><circle cx="-24" cy="476" r="9.5" fill="#D1A54E" ${line(3)}/>
        <ellipse cx="26" cy="484" rx="8" ry="12" fill="#8B4A2B" ${line(3)}/>
        <path d="M26,496 L26,512" ${line(5)}/><path d="M26,496 L26,512" stroke="#8B4A2B" stroke-width="2"/>
        <path d="M-26,502 L48,502 L48,546 L38,556 L-16,556 L-26,546 Z" fill="${CARAMEL}" ${line(3.4)}/>
        <path d="M-20,511 L42,511" fill="none" ${line(2)} stroke-dasharray="5 4"/>
        <text x="11" y="540" text-anchor="middle" font-family="Rozha One, serif" font-size="15" fill="${CREAM}">${initials}</text>
      </g>
      ${arm("armL", -94)}
      ${arm("armR", 94)}
      <g id="b-head">
        <ellipse cx="-46" cy="306" rx="10" ry="14" fill="${SK}" ${line()}/><path d="M-48,300 q5,6 0,12" fill="none" ${line(2.2)}/>
        <ellipse cx="46" cy="306" rx="10" ry="14" fill="${SK}" ${line()}/><path d="M48,300 q-5,6 0,12" fill="none" ${line(2.2)}/>
        <path d="M-44,288 Q-46,342 -26,362 Q0,382 26,362 Q46,342 44,288 Q44,246 0,242 Q-44,246 -44,288 Z" fill="${SK}" ${line()}/>
        <g id="b-face">
          <path d="M-48,294 Q-58,252 -42,236 Q-48,212 -24,210 Q-18,192 2,198 Q20,186 36,200 Q58,202 52,226 Q62,242 49,264 Q50,280 46,294 Q42,262 26,256 Q12,264 -4,256 Q-22,266 -36,258 Q-44,270 -48,294 Z" fill="#241712" ${line()}/>
          <g fill="none" stroke="#6B4A38" stroke-width="2.6" stroke-linecap="round">
            <path d="M-36,232 q7,-10 15,-1"/><path d="M-14,214 q8,-10 16,0"/><path d="M10,208 q8,-9 15,2"/><path d="M28,222 q8,-7 13,4"/>
            <path d="M-24,246 q6,-7 13,0"/><path d="M0,232 q7,-8 14,1"/><path d="M38,244 q5,-6 9,3"/>
          </g>
          <path d="M-6,256 q-12,4 -10,16 q2,8 10,3" fill="none" stroke="#241712" stroke-width="5" stroke-linecap="round"/>
          <g id="b-shades" transform="translate(0,-14)">
            <path d="M-34,220 L-6,220 Q-5,231 -10,236 Q-20,242 -29,237 Q-35,231 -34,220 Z" fill="#6B4FD8" ${line(2.4)}/>
            <path d="M34,220 L6,220 Q5,231 10,236 Q20,242 29,237 Q35,231 34,220 Z" fill="#6B4FD8" ${line(2.4)}/>
            <path d="M-6,222 Q0,217 6,222 M-34,221 L-42,226 M34,221 L42,226" fill="none" ${line(2.4)}/>
            <path d="M-29,225 l7,0 M11,225 l7,0" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>
          </g>
          <path d="M-34,282 Q-21,273 -8,280" fill="none" ${line(5)}/>
          <g id="b-browR"><path d="M8,280 Q21,273 34,282" fill="none" ${line(5)}/></g>
          <g id="b-eyes">
            <g><path d="M-29,300 Q-18,291 -7,300 Q-18,306 -29,300 Z" fill="#FBF6EC" ${line(2.6)}/><circle cx="-18" cy="299.5" r="4.4" fill="${K}"/><circle cx="-16.6" cy="298" r="1.4" fill="#fff"/></g>
            <g id="b-eyeR"><path d="M29,300 Q18,291 7,300 Q18,306 29,300 Z" fill="#FBF6EC" ${line(2.6)}/><circle cx="18" cy="299.5" r="4.4" fill="${K}"/><circle cx="19.4" cy="298" r="1.4" fill="#fff"/></g>
          </g>
          <path d="M-29,309 q9,4 19,0 M29,309 q-9,4 -19,0" fill="none" ${line(1.8)} opacity=".45"/>
          <path d="M-3,300 Q-6,316 -9,322 Q-4,328 0,326 Q4,328 9,322" fill="none" ${line(3)}/>
          <path d="M-25,337 Q-12,328 0,333 Q12,328 25,337 Q14,339 0,336 Q-14,339 -25,337 Z" fill="${K}" ${line(2.4)}/>
          <path id="b-mouth" d="M-20,340 Q0,366 20,340 Z" fill="#5A1E14" ${line(3)}/>
          <path d="M-17,341 Q0,348 17,341 L15,346 Q0,352 -15,346 Z" fill="#FFFFFF"/>
          <path d="M-12,363 Q0,384 12,363 Q6,368 0,367 Q-6,368 -12,363 Z" fill="${K}"/>
          <path d="M-40,326 Q-34,352 -18,364 M40,326 Q34,352 18,364" fill="none" ${line(2)} stroke-dasharray="1 4" opacity=".7"/>
        </g>
      </g>
    </g></g>`;
  }

  /* ---------- the inside of the café (viewBox 0 0 1600 900) ---------- */
  function interior(person, shelves, rules, books = [], certs = [], season = "") {
    const initials = person.name.split(" ").map(w => w[0]).join("").slice(0, 3);
    const jarSlots = [0, 1, 2, 3, 4].map(i => 420 + i * 74);
    const lamp = x => `<g class="lamp"><path d="M${x},0 L${x},118" stroke="#2A2A26" stroke-width="2"/>
      <circle cx="${x}" cy="170" r="120" fill="url(#lampGlow)"/>
      <path d="M${x - 34},150 Q${x},104 ${x + 34},150 Z" fill="${C.bottle}"/><path d="M${x - 34},150 L${x + 34},150" stroke="${C.gold}" stroke-width="3"/>
      <ellipse cx="${x}" cy="152" rx="12" ry="6" fill="#FFE6A8"/></g>`;


    /* ---------- Christmas inside: lights, paper star lanterns, garlands, a small tree, poinsettias ---------- */
    const XC = ["#E0472E", "#2EA05A", "#F0C24A", "#3E8FD8"];
    const star = (r1, r2) => Array.from({ length: 10 }, (_, i) => { const a = (i * 36 - 90) * Math.PI / 180, r = i % 2 ? r2 : r1; return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(" ") + "Z";
    const lantern = (x, y, s, col) => `<g transform="translate(${x},0)"><path d="M0,0 L0,${y - 34 * s}" stroke="#2A2A26" stroke-width="2"/>
      <g transform="translate(0,${y}) scale(${s})"><circle r="60" fill="url(#lampGlow)" class="halo"/>
      <path d="${star(36, 16)}" fill="${col}" stroke="#7A1E16" stroke-width="2.5" stroke-linejoin="round"/><path d="${star(18, 8)}" fill="#FFF1C4" opacity=".85"/>
      ${[-14, -5, 5, 14].map((dx, i) => `<path d="M${dx},30 q${i % 2 ? 3 : -3},20 ${dx * .3},${44 + i * 4}" stroke="${["#F0C24A", "#E0472E", "#F3EEE3", "#2E6B4E"][i]}" stroke-width="3" fill="none"/>`).join("")}</g></g>`;
    const garland = (x0, x1, y, sag = 18) => { const n = 3, w = (x1 - x0) / n;
      return `<path d="${Array.from({ length: n }, (_, i) => `${i ? "" : `M${x0},${y}`} Q${x0 + w * i + w / 2},${y + sag} ${x0 + w * (i + 1)},${y}`).join(" ")}" stroke="#2E6B4E" stroke-width="10" fill="none" stroke-linecap="round"/>
        ${Array.from({ length: n + 1 }, (_, i) => `<g transform="translate(${x0 + w * i},${y})"><path d="M0,0 l-11,-7 0,14z M0,0 l11,-7 0,14z" fill="#C0262B"/><circle r="4" fill="#C0262B"/></g>`).join("")}
        ${Array.from({ length: n * 4 }, (_, i) => { const t = (i + .5) / (n * 4), seg = (t * n) % 1; return `<circle cx="${x0 + t * (x1 - x0)}" cy="${y + Math.sin(seg * Math.PI) * sag * .9 + 3}" r="3.5" fill="${XC[i % 4]}" class="xbulb x${i % 3}"/>`; }).join("")}`; };
    const poin = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${Array.from({ length: 6 }, (_, i) => `<path d="M0,0 Q6,-10 0,-20 Q-6,-10 0,0Z" fill="#D8322A" transform="rotate(${i * 60})"/>`).join("")}${Array.from({ length: 6 }, (_, i) => `<path d="M0,0 Q4,-7 0,-13 Q-4,-7 0,0Z" fill="#B0201E" transform="rotate(${i * 60 + 30})"/>`).join("")}<circle r="3" fill="#F0C24A"/></g>`;
    const xmasWall = season !== "christmas" ? "" : `
      <g id="xmas-in">
        <!-- fairy lights swagged under the ceiling -->
        <path d="M0,58 Q100,92 200,62 Q300,92 400,62 Q500,92 600,62 Q700,92 800,62 Q900,92 1000,62 Q1100,92 1200,62 Q1300,92 1400,62 Q1500,92 1600,58" stroke="#1E3A2A" stroke-width="2" fill="none"/>
        ${Array.from({ length: 48 }, (_, i) => { const x = 8 + i * 33.2, seg = (x % 200) / 200; return `<circle cx="${x}" cy="${62 + Math.sin(seg * Math.PI) * 26 + 4}" r="5" fill="${XC[i % 4]}" class="xbulb x${i % 3}"/>`; }).join("")}
        <!-- star lanterns -->
        ${lantern(370, 250, .5, "#E0472E")}${lantern(1572, 250, .5, "#F0C24A")}
        <!-- garlands on the rules board, the menu and the jar shelf -->
        ${garland(70, 342, 94)}${garland(938, 1322, 112)}${garland(392, 768, 302, 14)}
        <!-- a wreath on the window -->
        <g transform="translate(1445,150)"><circle r="17" fill="none" stroke="#2E6B4E" stroke-width="9"/>${[0, 72, 144, 216, 288].map(d => `<circle cx="${(Math.cos(d * Math.PI / 180) * 17).toFixed(1)}" cy="${(Math.sin(d * Math.PI / 180) * 17).toFixed(1)}" r="3" fill="#D8322A"/>`).join("")}<path d="M-8,14 L0,20 L8,14 L4,30 M-8,14 L-4,30" fill="none" stroke="#C0262B" stroke-width="4"/></g>
        <!-- two stockings hanging from the jar shelf -->
        ${[[402, "#C0262B"], [446, "#2E6B4E"]].map(([x, c]) => `<g transform="translate(${x},319)"><path d="M0,0 L0,8" stroke="#2A2A26" stroke-width="2"/>
          <path d="M-9,8 L9,8 L9,34 Q9,44 18,46 Q24,50 20,56 Q14,60 0,56 Q-9,52 -9,40 Z" fill="${c}" ${ol(2)}/><rect x="-11" y="6" width="22" height="9" rx="3" fill="#FBF6EC" ${ol(2)}/></g>`).join("")}
        <!-- a little tree on the window sill -->
        <g transform="translate(1494,352)">
          <rect x="-5" y="-12" width="10" height="12" fill="#5A3C24"/>
          ${[0, 1, 2].map(i => `<path d="M${-(26 - i * 7)},${-10 - i * 15} L0,${-34 - i * 15} L${26 - i * 7},${-10 - i * 15} Z" fill="${i % 2 ? "#2E6B4E" : "#255C42"}"/>`).join("")}
          ${[[-14, -16], [10, -20], [-6, -32], [8, -38], [-4, -50]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${XC[i % 4]}" class="xbulb x${i % 3}"/>`).join("")}
          <path d="M0,-73 l3,6 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1z" fill="#F0C24A"/></g>
      </g>`;
    const xmasCounter = season !== "christmas" ? "" : `
      <!-- a poinsettia on the counter, beside the pastry case -->
      <g transform="translate(588,560)"><path d="M-20,0 L20,0 L16,-30 L-16,-30 Z" fill="#B5452E" ${ol(2.4)}/><rect x="-19" y="-35" width="38" height="7" rx="2" fill="#8E3020" ${ol(2)}/>
        ${[[-16, -46], [14, -48], [0, -62], [-6, -38], [12, -36]].map(([x, y], i) => `<path d="M0,-34 L${x * .6},${y + 12}" stroke="#3E6B45" stroke-width="3"/>`).join("")}
        ${poin(-16, -48, .95)}${poin(15, -50, .9)}${poin(0, -66, 1)}${poin(-2, -40, .75)}</g>`;

    return `<svg id="scene" viewBox="0 0 1600 800" role="img" aria-label="Inside Café Minj: ${person.firstName} stands behind the counter, with an espresso machine, a pastry case and a shelf of glass jars.">
      <defs>
        <radialGradient id="lampGlow"><stop offset="0" stop-color="#FFE3A3" stop-opacity=".55"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DC2AE"/><stop offset="1" stop-color="#B4D3C1"/></linearGradient>
        <linearGradient id="marble" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#EEEAE2"/><stop offset=".5" stop-color="#F7F4EE"/><stop offset="1" stop-color="#E6E1D7"/></linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E979C"/><stop offset=".35" stop-color="#E8ECEE"/><stop offset=".6" stop-color="#B9C1C5"/><stop offset="1" stop-color="#7C858A"/></linearGradient>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7C9A0"/><stop offset="1" stop-color="#F0956F"/></linearGradient>
        <pattern id="checker" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#EDE8DD"/><rect width="40" height="40" fill="#1B2A36"/><rect x="40" y="40" width="40" height="40" fill="#1B2A36"/></pattern>
      </defs>

      <!-- wall -->
      <rect width="1600" height="800" fill="url(#wall)"/>
      <rect width="1600" height="64" fill="${C.mintDeep}"/><rect y="64" width="1600" height="8" fill="${C.teak}"/>
      <rect y="470" width="1600" height="100" fill="${C.teakDark}"/>
      <g opacity=".14">${Array.from({ length: 17 }, (_, i) => `<rect x="${i * 100 - 10}" y="480" width="70" height="80" rx="4" fill="none" stroke="#000" stroke-width="3"/>`).join("")}</g>

      <!-- ceiling fan -->
      <g transform="translate(400,0)"><rect x="-3" y="0" width="6" height="40" fill="#2A2A26"/><ellipse cx="0" cy="46" rx="20" ry="9" fill="#2A2A26"/>
        <g transform="translate(0,48) scale(1,.16)"><g class="fan-blades">
          ${[0, 120, 240].map(a => `<path d="M0,0 L170,-16 Q190,0 170,16 Z" fill="${C.teak}" transform="rotate(${a})"/>`).join("")}
        </g></g></g>
      ${lamp(640)}${lamp(1080)}

      <!-- rules board -->
      <g class="hot" id="rules-board" data-act="rules" transform="translate(0,-26)">
        <rect x="76" y="118" width="260" height="238" rx="6" fill="${C.teak}"/>
        <rect x="88" y="130" width="236" height="214" fill="${C.bottle}"/>
        <rect x="96" y="138" width="220" height="198" fill="none" stroke="${C.gold}" stroke-width="2"/>
        <text x="206" y="174" text-anchor="middle" font-family="Rozha One, serif" font-size="26" fill="${C.gold}">Café Rules</text>
        <path d="M156,186 L256,186" stroke="${C.gold}" stroke-width="1.5"/>
        ${rules.slice(0, 6).map((r, i) => `<text x="110" y="${210 + i * 21}" font-family="Kalam, cursive" font-size="14" fill="${C.ivory}" opacity=".92">${i + 1}. ${r.short}</text>`).join("")}
      </g>

      <!-- wall bookshelf: one spine per post in the reading corner -->
      <g id="book-shelf">
        <rect x="84" y="390" width="250" height="11" rx="3" fill="${C.teak}" ${ol(2.6)}/>
        <rect x="96" y="356" width="14" height="34" rx="2" fill="#5C6B5E" ${ol(2.2)}/><rect x="112" y="350" width="12" height="40" rx="2" fill="#8A6A4A" ${ol(2.2)}/>
        ${books.slice(0, 6).map((b, i) => { const x = 132 + i * 32, h = 48 - (i % 2) * 6; return `<g class="shelf-book hot" data-book="${i}" data-act="book:${i}">
          <rect x="${x}" y="${390 - h}" width="26" height="${h}" rx="2" fill="${b.color}" ${ol(2.2)}/>
          <rect x="${x + 4}" y="${390 - h + 6}" width="18" height="3" fill="${C.goldSoft}" opacity=".8"/><rect x="${x + 4}" y="${390 - 12}" width="18" height="3" fill="${C.goldSoft}" opacity=".8"/></g>`; }).join("")}
        <path d="M${132 + Math.min(books.length, 6) * 32 + 4},390 l0,-30 l14,0 l0,30 Z" fill="${C.gold}" ${ol(2.2)}/>
      </g>

      <!-- certificate wall: one frame per course, he takes it down to show you -->
      <g id="cert-wall">
        ${certs.slice(0, 3).map((c, i) => { const x = 405 + i * 72; return `<g class="cert-frame hot" data-cert="${i}" data-act="cert:${i}">
          <path d="M${x + 25},${108} L${x + 8},${120} M${x + 25},${108} L${x + 42},${120}" stroke="#6B4A2E" stroke-width="1.6"/><circle cx="${x + 25}" cy="107" r="2.5" fill="#6B4A2E"/>
          <svg x="${x}" y="118" width="50" height="60" viewBox="0 0 100 120">${certArt({ ...c, sealColor: ["#B5452E", "#2F5D8A", "#4E7A4A"][i % 3] }).replace(/^<svg[^>]*>|<\/svg>\s*$/g, "")}</svg></g>`; }).join("")}
      </g>

      <!-- jar shelf -->
      <g id="jar-shelf">
        <rect x="390" y="300" width="380" height="14" fill="${C.teak}"/><rect x="390" y="314" width="380" height="5" fill="${C.teakDark}"/>
        <path d="M420,319 l0,26 l22,-26 M740,319 l0,26 l-22,-26" stroke="${C.teakDark}" stroke-width="6" fill="none"/>
        ${jarSlots.map((x, i) => `<g class="shelf-jar hot" data-jar="${i}" data-act="jar:${i}" style="transform: translate(${x - 60 * 0.75}px, ${300 - 110 * 0.75}px) scale(.75)">${item("jar", { jarColor: ["#B5452E", "#2F5D8A", "#C98A1B", "#4E7A4A", "#6B4FD8"][i] })}</g>`).join("")}
      </g>

      <!-- clock -->
      <g transform="translate(800,140)"><circle r="58" fill="${C.gold}"/><circle r="51" fill="#F6F1E4"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="-1.6" y="-46" width="3.2" height="${i % 3 ? 6 : 11}" fill="#2A2A26" transform="rotate(${i * 30})"/>`).join("")}
        <g id="clock-h"><rect x="-3" y="-28" width="6" height="32" rx="3" fill="#2A2A26"/></g>
        <g id="clock-m"><rect x="-2" y="-42" width="4" height="46" rx="2" fill="#2A2A26"/></g>
        <circle r="5" fill="${C.chili}"/></g>

      <!-- wall menu -->
      <g id="wall-menu">
        <rect x="944" y="110" width="372" height="270" rx="6" fill="${C.teak}"/>
        <rect x="956" y="122" width="348" height="246" fill="${C.bottle}"/>
        <rect x="964" y="130" width="332" height="230" fill="none" stroke="${C.gold}" stroke-width="2"/>
        <text x="1130" y="172" text-anchor="middle" font-family="Rozha One, serif" font-size="32" fill="${C.gold}">Menu</text>
        ${shelves.map((s, i) => `<g class="hot" data-act="shelf:${s.id}">
          <rect x="976" y="${188 + i * 34}" width="308" height="30" fill="transparent"/>
          <text x="990" y="${210 + i * 34}" font-family="Mukta, sans-serif" font-weight="600" font-size="19" fill="${C.ivory}">${s.label}</text>
          <text x="1270" y="${210 + i * 34}" text-anchor="end" font-family="Mukta, sans-serif" font-size="15" fill="${C.goldSoft}">0.00</text></g>`).join("")}
      </g>

      <!-- window onto the Andaman sea -->
      <g id="sea-window">
        <clipPath id="seaclip"><path d="M1364,346 L1364,196 Q1364,136 1445,136 Q1526,136 1526,196 L1526,346 Z"/></clipPath>
        <path d="M1350,358 L1350,192 Q1350,120 1445,120 Q1540,120 1540,192 L1540,358 Z" fill="${C.teak}"/>
        <g clip-path="url(#seaclip)">
          <rect x="1360" y="130" width="170" height="220" fill="url(#dusk)"/>
          <circle cx="1478" cy="262" r="24" fill="#FFE2A0"/>
          <rect x="1360" y="262" width="170" height="90" fill="#2F8FA0"/>
          <path d="M1458,272 l40,0 M1466,284 l24,0 M1472,296 l12,0" stroke="#FFE2A0" stroke-width="3" opacity=".8"/>
          <path d="M1360,300 q20,-6 40,0 t40,0 t40,0 t40,0 t40,0" stroke="#7CC4CC" stroke-width="2" fill="none" opacity=".7"/>
          <path d="M1400,258 l26,0 l-5,7 l-17,0 Z M1412,258 l0,-22 l11,20 Z" fill="#1B2A36"/>
          <path d="M1370,350 Q1378,260 1408,214" stroke="#1B2A36" stroke-width="7" fill="none"/>
          ${[-60, -20, 15, 160, 200].map(a => `<path transform="translate(1408,214) rotate(${a})" d="M0,0 Q30,-12 58,10 Q30,-2 0,4 Z" fill="#1B2A36"/>`).join("")}
        </g>
        <path d="M1445,136 L1445,346 M1364,262 L1526,262" stroke="${C.teak}" stroke-width="7"/>
        <rect x="1340" y="352" width="210" height="10" rx="3" fill="${C.ivory}"/>
        ${shell(1372, 352, .7)}${starfish(1520, 344, 9, 14)}
        <rect x="1366" y="370" width="158" height="26" rx="4" fill="${C.gold}"/>
        <text x="1445" y="389" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="14" fill="${C.bottleInk}">Port Blair, Andamans</text>
      </g>

      ${xmasWall}
      <!-- the barista (behind the counter) -->
      ${barista(initials, person.baristaImage, person.baristaPoses)}

      <!-- counter -->
      <rect x="0" y="560" width="1600" height="30" fill="url(#marble)"/>
      <path d="M0,572 C200,566 260,580 420,574 S760,566 900,576 S1300,570 1600,574" stroke="#CFC8BA" stroke-width="1.5" fill="none" opacity=".8"/>
      <rect x="0" y="590" width="1600" height="150" fill="${C.teak}"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 200 + 18}" y="608" width="164" height="114" rx="6" fill="none" stroke="${C.teakDark}" stroke-width="5"/>`).join("")}
      <rect x="0" y="590" width="1600" height="6" fill="#000" opacity=".25"/>
      <rect x="0" y="740" width="1600" height="60" fill="url(#checker)"/>
      <rect x="0" y="752" width="1600" height="7" rx="3" fill="${C.gold}"/>

      <!-- a stack of books on the counter: opens the reading corner -->
      <g class="hot" data-act="books" transform="translate(12,0)">
        <rect x="0" y="542" width="50" height="18" rx="3" fill="#4E7A4A" ${ol(2.6)}/>
        <rect x="0" y="530" width="48" height="12" rx="3" fill="#7A2E2E" ${ol(2.6)}/>
        <rect x="4" y="518" width="44" height="12" rx="3" fill="${C.bottle}" ${ol(2.6)}/>
        <rect x="2" y="506" width="46" height="12" rx="3" fill="#B07A1E" ${ol(2.6)}/>
        <path d="M8,536 l32,0 M12,524 l28,0 M10,512 l30,0 M8,551 l34,0" stroke="#E8C48A" stroke-width="1.6" opacity=".85" stroke-linecap="round"/>
      </g>

      <!-- island things on the counter: a conch and a coconut -->
      <g transform="translate(104,560)">
        <path d="M-20,-34 l-6,-12 M-4,-40 l0,-13 M12,-38 l6,-11" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
        <path d="M-34,0 Q-44,-22 -20,-34 Q6,-44 28,-30 Q40,-20 34,-6 Q30,2 18,0 Z" fill="#F4D9C7" ${ol()}/>
        <path d="M-20,-34 l-6,-12 M-4,-40 l0,-13 M12,-38 l6,-11" stroke="#F4D9C7" stroke-width="4" stroke-linecap="round"/>
        <path d="M-2,-3 Q14,-22 30,-12 Q24,-2 14,-1 Z" fill="#E59A8A" ${ol(2)}/>
        <path d="M-30,-8 Q-16,-22 -2,-16" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".45" stroke-linecap="round"/>
      </g>
      <g transform="translate(158,560)">
        <path d="M-7,-36 L6,-66 l9,-4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M-7,-36 L6,-66 l9,-4" fill="none" stroke="${C.chili}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="0" cy="-18" rx="22" ry="20" fill="#7B5434" ${ol()}/><ellipse cx="0" cy="-34" rx="17" ry="5" fill="#FBF7EE" ${ol(2.4)}/>
        <path d="M-12,-22 q4,8 0,16 M10,-14 q2,4 0,8" ${ol(1.8)} fill="none" opacity=".5"/>
      </g>

      ${xmasCounter}
      <!-- pastry case -->
      <g id="pastry-case" class="hot" data-act="shelf:pastry-case">
        <path d="M184,548 L184,424 Q184,410 198,410 L502,410 Q516,410 516,424 L516,548 Z" fill="#EAF4F1" fill-opacity=".4"/>
        <rect x="186" y="474" width="328" height="7" fill="#FBF7EE" ${ol(2.4)}/>
        ${[["croissant", 236, 476], ["roll", 330, 476], ["muffin", 424, 476], ["cookies", 236, 548], ["biscotti", 330, 548], ["croissant", 424, 548]]
          .map(([a, x, y]) => `<g style="transform: translate(${x - 60 * .62}px, ${y - 110 * .62}px) scale(.62)">${item(a)}</g>`).join("")}
        <path d="M184,548 L184,424 Q184,410 198,410 L502,410 Q516,410 516,424 L516,548" fill="none" ${ol(4)}/>
        <path d="M202,426 L224,532 M222,422 L234,480" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round"/>
        <rect x="174" y="546" width="352" height="18" rx="5" fill="${C.teak}" ${ol(4)}/>
      </g>

      <!-- espresso machine, seen from the customer's side: its working face (group heads, buttons,
           steam wand) is turned towards the barista, so what we see is the back panel -->
      <g id="machine" class="hot" data-act="shelf:signature-brews">
        <g id="steam" opacity="0">
          <path class="puff" d="M1250,400 q-12,-20 0,-40 q12,-20 0,-40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
          <path class="puff p2" d="M1300,400 q12,-20 0,-40 q-12,-20 0,-40" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
        </g>
        <g id="machine-body">
          <!-- cups warming on top, behind a little rail -->
          ${[1186, 1212, 1238, 1318, 1344].map(x => `<path d="M${x},372 h20 l-3,20 h-14 z" fill="#FBF7EE" ${ol(2.6)}/>`).join("")}
          <path d="M1199,354 h20 l-3,18 h-14 z" fill="#FBF7EE" ${ol(2.6)}/>
          <rect x="1160" y="392" width="230" height="12" rx="4" fill="#AEB7BC" ${ol(3.4)}/>
          <path d="M1164,384 H1386 M1168,384 v8 M1275,384 v8 M1382,384 v8" fill="none" ${ol(3)}/>
          <!-- feet and the power lead -->
          <rect x="1168" y="548" width="28" height="12" rx="3" fill="${INK}"/><rect x="1354" y="548" width="28" height="12" rx="3" fill="${INK}"/>
          <path d="M1392,530 q16,6 12,28" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
          <!-- the back panel: brushed steel, a brand plate, cooling vents -->
          <rect x="1150" y="402" width="250" height="148" rx="12" fill="#E4E8EA" ${ol(4)}/>
          <path d="M1154,528 H1396 V538 Q1396,546 1388,546 H1162 Q1154,546 1154,538 Z" fill="#000" opacity=".12"/>
          <path d="M1162,416 V520" stroke="#fff" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>
          <rect x="1186" y="424" width="178" height="62" rx="10" fill="${C.bottle}" ${ol(3.6)}/>
          <rect x="1192" y="430" width="166" height="50" rx="7" fill="none" stroke="${C.gold}" stroke-width="1.6"/>
          ${emblem(1211, 455, 14)}
          <text x="1296" y="462" text-anchor="middle" font-family="Rozha One, serif" font-size="19" letter-spacing="2" fill="${C.goldSoft}">CAFÉ MINJ</text>
          ${Array.from({ length: 12 }, (_, i) => `<path d="M${1198 + i * 14},500 v20" stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity=".5"/>`).join("")}
          ${[[1164, 412], [1386, 412], [1164, 538], [1386, 538]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#8D979C" ${ol(1.2)}/>`).join("")}
          <circle id="brew-btn" cx="1380" cy="508" r="5" fill="#8D979C" ${ol(2)}/>
        </g>
        <path id="pour" d="M0,0" opacity="0"/>
      </g>

      <!-- register -->
      <g class="hot" id="register" data-act="bill">
        <rect class="receipt-tongue" x="1484" y="436" width="42" height="28" fill="#fff" ${ol(2.4)}/>
        <path d="M1438,560 L1450,488 L1560,488 L1572,560 Z" fill="${C.gold}" ${ol(4)}/>
        <rect x="1460" y="458" width="90" height="34" rx="6" fill="${C.teakDark}" ${ol(3.4)}/>
        <text x="1505" y="482" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="18" fill="#9BE38F">0.00</text>
        ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${1466 + c * 21}" y="${504 + r * 16}" width="16" height="10" rx="2.5" fill="${C.ivory}" ${ol(1.8)}/>`).join("")).join("")}
      </g>

      <!-- pick-up counter sign -->
      <g transform="translate(968,0)">
        <rect x="-4" y="526" width="8" height="34" fill="${C.gold}" ${ol(2.4)}/><rect x="-26" y="554" width="52" height="8" rx="3" fill="${C.gold}" ${ol(2.4)}/>
        <rect x="-68" y="492" width="136" height="38" rx="7" fill="${C.bottle}" ${ol(3.4)}/>
        <text x="0" y="517" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="17" fill="${C.goldSoft}">Pick up here</text>
      </g>

      <!-- served items live here -->
      <g id="items-layer"></g>
    </svg>`;
  }

  /* ---------- the street front (viewBox 0 0 1600 900) ---------- */
  function street(person, season = "") {
    /* ---------- people seen through the glass: warm silhouettes ---------- */
    const SIL = "#4A2C1B";
    const person1 = (x, y, s = 1, o = {}) => {        // seated, facing out, waist-up; y = table/bar line
      const f = o.flip ? -1 : 1;
      return `<g transform="translate(${x},${y}) scale(${s * f},${s})" opacity="${o.op || .88}">
        <path d="M-30,0 Q-32,-44 -12,-52 L12,-52 Q32,-44 30,0 Z" fill="${o.shirt || SIL}"/>
        <rect x="-6" y="-62" width="12" height="12" fill="${SIL}"/>
        <ellipse cx="0" cy="-76" rx="15" ry="17" fill="${SIL}"/>
        ${o.hair === "bun" ? `<circle cx="0" cy="-96" r="8" fill="#2E1A10"/><path d="M-15,-80 Q-14,-96 0,-95 Q14,-96 15,-80 Q8,-88 0,-88 Q-8,-88 -15,-80Z" fill="#2E1A10"/>` : ""}
        ${o.hair === "long" ? `<path d="M-16,-78 Q-18,-96 0,-95 Q18,-96 16,-78 L18,-50 L10,-52 L10,-74 L-10,-74 L-10,-52 L-18,-50 Z" fill="#2E1A10"/>` : ""}
        ${o.hair === "cap" ? `<path d="M-16,-82 Q-14,-98 2,-97 Q16,-96 16,-82 Z M10,-84 l16,3 l-2,4 l-16,-2Z" fill="#2E1A10"/>` : ""}
        ${o.glasses ? `<circle cx="-6" cy="-77" r="4" fill="none" stroke="#F6D28A" stroke-width="1.2" opacity=".8"/><circle cx="7" cy="-77" r="4" fill="none" stroke="#F6D28A" stroke-width="1.2" opacity=".8"/>` : ""}
        ${o.look === "down" ? `<path d="M-10,-66 q10,6 20,0" stroke="#F6D28A" stroke-width="1" fill="none" opacity=".35"/>` : ""}
        ${o.cup ? `<path d="M${o.cup},-8 l-24,-14 l0,0" stroke="${SIL}" stroke-width="9" stroke-linecap="round"/><rect x="${o.cup - 6}" y="-20" width="13" height="15" rx="2" fill="#FBF3DF"/><path d="M${o.cup + 1},-26 q-4,-6 0,-12" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>` : ""}
        ${o.laptop ? `<path d="M-26,-2 L-22,-34 L22,-34 L26,-2 Z" fill="#2B2B30"/><circle cx="0" cy="-19" r="3" fill="#9FB8C8" opacity=".7"/><path d="M-12,-52 Q0,-46 12,-52" stroke="#9FD0F0" stroke-width="10" opacity=".12"/>` : ""}
        ${o.book ? `<path d="M-22,-10 L0,-16 L22,-10 L22,-30 L0,-36 L-22,-30 Z" fill="#7A2E2E"/><path d="M0,-16 L0,-36" stroke="#F3EEE3" stroke-width="1.5"/>` : ""}
        ${o.chin ? `<path d="M18,-4 Q24,-30 8,-58" stroke="${SIL}" stroke-width="10" fill="none" stroke-linecap="round"/>` : ""}
      </g>`;
    };
    const pendant = (x, y, len) => `<path d="M${x},0 L${x},${y + len}" stroke="#3A2414" stroke-width="2"/>
      <path d="M${x - 16},${y + len + 16} Q${x},${y + len - 6} ${x + 16},${y + len + 16} Z" fill="#2E4A3A"/>
      <ellipse cx="${x}" cy="${y + len + 18}" rx="22" ry="10" fill="#FFF1C4" opacity=".75"/>
      <circle cx="${x}" cy="${y + len + 40}" r="46" fill="url(#lampHalo)" opacity=".7"/>`;
    /* one arched shop window with a lit room behind it */
    const shopWindow = (x, w, id, side) => {
      const r = w / 2, top = 410, bot = 690, cx = x + r;
      const arch = `M${x},${bot} L${x},${top + 50} Q${x},${top} ${cx},${top} Q${x + w},${top} ${x + w},${top + 50} L${x + w},${bot} Z`;
      const room = side === "L" ? `
          <rect x="${x}" y="${top}" width="${w}" height="${bot - top}" fill="url(#roomL)"/>
          <rect x="${x}" y="${top + 120}" width="${w}" height="6" fill="#B07A3E" opacity=".5"/>
          ${[0, 1, 2, 3, 4].map(i => `<g transform="translate(${x + 30 + i * 46},${top + 88}) scale(.36)">${item("jar", { jarColor: ["#B5452E", "#2F5D8A", "#C98A1B", "#4E7A4A", "#6B4FD8"][i] })}</g>`).join("")}
          <rect x="${x + 20}" y="${top + 126}" width="${w - 40}" height="5" fill="#8A5A2B" opacity=".7"/>
          <!-- a couple at a table further in -->
          <g opacity=".55">${person1(x + w * .30, 600, .62, { hair: "long", cup: 20 })}${person1(x + w * .52, 600, .62, { cup: -20, flip: true })}
            <ellipse cx="${x + w * .41}" cy="600" rx="56" ry="7" fill="#5B3A1E"/><rect x="${x + w * .41 - 3}" y="600" width="6" height="40" fill="#5B3A1E"/></g>
          ${pendant(x + w * .3, top - 410, 450)}${pendant(x + w * .72, top - 410, 430)}
          <!-- window bar: people sitting facing the street, one watching it -->
          ${person1(x + w * .26, 650, 1, { cup: 22, look: "down", hair: "bun" })}
          ${person1(x + w * .70, 650, 1, { laptop: true, glasses: true })}
          <rect x="${x}" y="648" width="${w}" height="12" fill="#6A3A22"/>
          <rect x="${x}" y="660" width="${w}" height="${bot - 660}" fill="#5A3220" opacity=".9"/>` : `
          <rect x="${x}" y="${top}" width="${w}" height="${bot - top}" fill="url(#roomR)"/>
          <!-- back counter: the espresso machine and the barista at work -->
          <rect x="${x + 20}" y="${top + 70}" width="90" height="64" rx="6" fill="#203A4A" opacity=".85"/>
          <text x="${x + 65}" y="${top + 92}" text-anchor="middle" font-family="Kalam, cursive" font-size="11" fill="#F3EEE3" opacity=".85">Today</text>
          <path d="M${x + 36},${top + 104} h58 M${x + 40},${top + 116} h50" stroke="#F3EEE3" stroke-width="2" opacity=".6"/>
          <g opacity=".6">${person1(x + w * .62, 596, .7, { cap: false })}</g>
          <rect x="${x + w * .40}" y="${596 - 42}" width="70" height="40" rx="5" fill="#C7CBD4" opacity=".75"/>
          <path d="M${x + w * .40 + 18},${596 - 50} q-6,-14 0,-26 M${x + w * .40 + 40},${596 - 50} q6,-14 0,-26" stroke="#fff" stroke-width="2.5" fill="none" opacity=".55"/>
          <rect x="${x}" y="596" width="${w}" height="14" fill="#5B3A1E" opacity=".8"/>
          ${pendant(x + w * .28, top - 410, 440)}${pendant(x + w * .74, top - 410, 455)}
          <!-- window bar: a reader, and someone resting their chin, looking out -->
          ${person1(x + w * .27, 650, 1, { book: true, hair: "long" })}
          ${person1(x + w * .71, 650, 1, { chin: true, cup: -22, hair: "cap" })}
          <path d="M${x + w * .86},648 q-10,-30 6,-46 q10,24 -6,46 M${x + w * .9},648 q14,-26 0,-44" fill="#3E6B45"/>
          <rect x="${x}" y="648" width="${w}" height="12" fill="#6A3A22"/>
          <rect x="${x}" y="660" width="${w}" height="${bot - 660}" fill="#5A3220" opacity=".9"/>`;
      return `<g class="shop-window">
        <clipPath id="clip-${id}"><path d="${arch}"/></clipPath>
        <path d="M${x - 16},${bot + 10} L${x - 16},${top + 50} Q${x - 16},${top - 16} ${cx},${top - 16} Q${x + w + 16},${top - 16} ${x + w + 16},${top + 50} L${x + w + 16},${bot + 10} Z" fill="${C.bottle}"/>
        <g clip-path="url(#clip-${id})">${room}
          <path d="M${x + 30},${top + 40} L${x + 90},${top - 20} M${x + 52},${top + 60} L${x + 140},${top - 28} M${x + w - 70},${bot - 40} L${x + w - 10},${bot - 110}" stroke="#fff" stroke-width="10" opacity=".08"/>
        </g>
        <path d="M${cx},${top} L${cx},${bot} M${x},${top + 110} L${x + w},${top + 110}" stroke="${C.bottle}" stroke-width="9"/>
        <path d="${arch}" fill="none" stroke="${C.bottleInk}" stroke-width="4"/>
        <!-- sill and a flower box -->
        <rect x="${x - 24}" y="${bot + 6}" width="${w + 48}" height="14" rx="3" fill="${C.ivory}"/>
        <rect x="${x - 8}" y="${bot + 20}" width="${w + 16}" height="26" rx="3" fill="${C.teak}"/>
        ${Array.from({ length: 11 }, (_, i) => { const fx = x + 4 + i * (w - 8) / 10; return `<path d="M${fx},${bot + 22} q-8,-16 2,-26 M${fx},${bot + 22} q10,-14 4,-24" stroke="#3E6B45" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="${fx + (i % 2 ? 4 : -2)}" cy="${bot + (i % 2 ? -2 : -6)}" r="5" fill="${["#E0663E", "#F0C24A", "#F3EEE3", "#D9547A"][i % 4]}"/>`; }).join("")}
        <!-- striped awning -->
        <g>
          <path d="M${x - 30},${top - 50} L${x + w + 30},${top - 50} L${x + w + 46},${top + 4} L${x - 46},${top + 4} Z" fill="${C.ivory}"/>
          ${Array.from({ length: 9 }, (_, i) => { const a = x - 30 + i * (w + 60) / 9, b = x - 46 + i * (w + 92) / 9, wa = (w + 60) / 18, wb = (w + 92) / 18; return `<path d="M${a},${top - 50} L${a + wa},${top - 50} L${b + wb},${top + 4} L${b},${top + 4} Z" fill="#2E6B4E"/>`; }).join("")}
          <path d="${Array.from({ length: 18 }, (_, i) => { const b = x - 46 + i * (w + 92) / 18, wb = (w + 92) / 18; return `M${b},${top + 4} q${wb / 2},18 ${wb},0`; }).join(" ")}" fill="${C.ivory}" stroke="#2E6B4E" stroke-width="2"/>
          <path d="M${x - 30},${top - 50} L${x + w + 30},${top - 50}" stroke="#1F4A36" stroke-width="5"/>
        </g>
      </g>`;
    };
    /* ---------- the park beside the café ---------- */
    const tree = (x, base, h, r, col, flowers) => `<g>
      <path d="M${x - 9},${base} Q${x - 4},${base - h * .5} ${x - 16},${base - h} M${x + 9},${base} Q${x + 6},${base - h * .5} ${x + 22},${base - h}" stroke="#5A3C24" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M${x - 10},${base} L${x - 6},${base - h * .6} L${x + 8},${base - h * .6} L${x + 12},${base} Z" fill="#5A3C24"/>
      ${[[-r * .7, -h - 10, r * .62], [r * .55, -h - 18, r * .66], [0, -h - r * .55, r * .72], [-r * .2, -h + 18, r * .58], [r * .9, -h + 16, r * .44], [-r * 1.05, -h + 20, r * .42]]
        .map(([dx, dy, rr], i) => `<circle cx="${x + dx}" cy="${base + dy}" r="${rr}" fill="${col[i % col.length]}"/>`).join("")}
      ${flowers ? Array.from({ length: 34 }, (_, i) => `<circle cx="${x + Math.sin(i * 2.3) * r * 1.1}" cy="${base - h - r * .3 + Math.cos(i * 1.7) * r * .55}" r="${3 + (i % 3)}" fill="${flowers}"/>`).join("") : ""}
    </g>`;
    const park = `
      <!-- lawn, path, hedges -->
      <path d="M-20,700 Q160,676 330,690 Q400,696 470,704 L470,800 L-20,800 Z" fill="#5E8F4E"/>
      <path d="M-20,724 Q180,704 470,722 L470,800 L-20,800 Z" fill="#6FA05A"/>
      <path d="M90,800 Q150,760 260,744 Q330,734 420,736" stroke="#D9C49A" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
      ${tree(170, 742, 150, 120, ["#2F5E3A", "#3E7A47", "#356B40"], null)}
      ${tree(400, 744, 96, 66, ["#3E7A47", "#4F8F55"], "#E0472E")}
      ${[[20, 742], [62, 748], [270, 748], [310, 752], [440, 752]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="20" fill="#3E7A47"/><ellipse cx="${x - 8}" cy="${y - 6}" rx="16" ry="9" fill="#4F8F55"/>`).join("")}
      <!-- an empty bench under the lamp -->
      <g transform="translate(250,770)">
        <rect x="-70" y="-38" width="140" height="10" rx="3" fill="#8A5A2B" ${ol(2)}/><rect x="-70" y="-24" width="140" height="10" rx="3" fill="#8A5A2B" ${ol(2)}/>
        <rect x="-74" y="-8" width="148" height="10" rx="3" fill="#A06A33" ${ol(2)}/>
        <path d="M-60,2 L-62,22 M60,2 L62,22 M-60,-38 L-60,2 M60,-38 L60,2" stroke="#2A2A26" stroke-width="6" stroke-linecap="round"/>
      </g>
      <g><circle cx="80" cy="610" r="60" fill="url(#lampHalo)" class="halo"/>
        <path d="M80,800 L80,620" stroke="#2A2A26" stroke-width="8"/><path d="M68,618 L92,618 L88,596 L72,596 Z" fill="#FFE3A3" ${ol(3)}/><path d="M66,596 L94,596 L80,584 Z" fill="#2A2A26"/></g>
      <!-- the park railing along the footpath -->
      <path d="M-20,786 L470,786 M-20,772 L470,772" stroke="#2A2A26" stroke-width="4"/>
      ${Array.from({ length: 25 }, (_, i) => `<path d="M${-10 + i * 20},796 L${-10 + i * 20},764 l-4,-6 l8,0 Z" fill="#2A2A26" stroke="#2A2A26" stroke-width="3"/>`).join("")}`;
    /* ---------- vehicles in the parking bays ---------- */
    const scooter = (x, y, col, flip) => `<g transform="translate(${x},${y}) scale(${flip ? -1 : 1},1)">
      <ellipse cx="0" cy="2" rx="62" ry="6" fill="#000" opacity=".25"/>
      <circle cx="-38" cy="-14" r="16" fill="#1E1E22"/><circle cx="-38" cy="-14" r="6" fill="#8A8A90"/>
      <circle cx="40" cy="-14" r="16" fill="#1E1E22"/><circle cx="40" cy="-14" r="6" fill="#8A8A90"/>
      <path d="M-56,-22 Q-58,-50 -26,-52 L14,-52 L24,-26 L52,-26 Q60,-26 58,-14 L20,-14 Q10,-30 -6,-22 Z" fill="${col}" ${ol(2.5)}/>
      <path d="M-40,-52 L4,-52 Q8,-62 -2,-64 L-36,-64 Q-46,-62 -40,-52 Z" fill="#2B2B30"/>
      <path d="M36,-26 L28,-72 M18,-74 L40,-70" stroke="#2B2B30" stroke-width="5" stroke-linecap="round"/>
      <path d="M44,-52 Q58,-48 56,-30 L46,-28 Z" fill="${col}" ${ol(2.5)}/><circle cx="54" cy="-44" r="4" fill="#FFF3C4"/>
      <rect x="22" y="-80" width="16" height="8" rx="3" fill="#2B2B30"/>
    </g>`;
    const cycle = (x, y) => `<g transform="translate(${x},${y})" fill="none" stroke="#2A2A26" stroke-width="4" stroke-linecap="round">
      <circle cx="-30" cy="-20" r="20"/><circle cx="30" cy="-20" r="20"/>
      <path d="M-30,-20 L-6,-20 L12,-48 L-16,-48 Z M-6,-20 L-18,-56 M12,-48 L30,-20 M10,-56 L14,-48 M4,-58 L18,-58" stroke="#2F6F8F"/>
      <path d="M-26,-58 L-10,-58" stroke-width="6"/>
    </g>`;


    /* ---------- Christmas, the way it looks in Pune and Port Blair: paper star lanterns, a wreath,
       poinsettias and coloured lights. No snow. ---------- */
    const kandil = (x, y, s, col) => `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M0,-120 L0,-34" stroke="#2A2A26" stroke-width="2"/>
      <circle cx="0" cy="0" r="64" fill="url(#lampHalo)" class="halo"/>
      <path d="${Array.from({ length: 10 }, (_, i) => { const a = (i * 36 - 90) * Math.PI / 180, r = i % 2 ? 16 : 36; return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(" ")}Z" fill="${col}" stroke="#7A1E16" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="${Array.from({ length: 10 }, (_, i) => { const a = (i * 36 - 90) * Math.PI / 180, r = i % 2 ? 8 : 18; return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(" ")}Z" fill="#FFF1C4" opacity=".85"/>
      ${[-14, -5, 5, 14].map((dx, i) => `<path d="M${dx},30 q${i % 2 ? 3 : -3},20 ${dx * .3},${44 + i * 4}" stroke="${["#F0C24A", "#E0472E", "#F3EEE3", "#2E6B4E"][i]}" stroke-width="3" fill="none"/>`).join("")}
    </g>`;
    const bulbs = (path, n, x0, x1, y0, sag, phase = 0) => Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1), x = x0 + t * (x1 - x0), seg = ((x - x0) % ((x1 - x0) / 4)) / ((x1 - x0) / 4), y = y0 + Math.sin(seg * Math.PI) * sag + 4;
      return `<circle cx="${x}" cy="${y}" r="5" fill="${["#E0472E", "#2EA05A", "#F0C24A", "#3E8FD8"][(i + phase) % 4]}" class="xbulb x${(i + phase) % 3}"/>`; }).join("");
    const wreath = (x, y) => `<g transform="translate(${x},${y})">
      <circle r="30" fill="none" stroke="#2E6B4E" stroke-width="16"/>
      ${Array.from({ length: 16 }, (_, i) => { const a = i * 22.5 * Math.PI / 180; return `<ellipse cx="${(Math.cos(a) * 30).toFixed(1)}" cy="${(Math.sin(a) * 30).toFixed(1)}" rx="9" ry="5" transform="rotate(${i * 22.5 + 40} ${(Math.cos(a) * 30).toFixed(1)} ${(Math.sin(a) * 30).toFixed(1)})" fill="${i % 2 ? "#3E8A55" : "#25573D"}"/>`; }).join("")}
      ${[20, 75, 140, 200, 260, 320].map(d => { const a = d * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 30).toFixed(1)}" cy="${(Math.sin(a) * 30).toFixed(1)}" r="4" fill="#D8322A"/>`; }).join("")}
      <path d="M-12,24 L0,34 L12,24 L6,48 M-12,24 L-6,48" fill="none" stroke="#C0262B" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="32" r="6" fill="#C0262B"/>
    </g>`;
    const poinsettia = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
      ${Array.from({ length: 6 }, (_, i) => `<path d="M0,0 Q6,-10 0,-20 Q-6,-10 0,0Z" fill="#D8322A" transform="rotate(${i * 60})"/>`).join("")}
      ${Array.from({ length: 6 }, (_, i) => `<path d="M0,0 Q4,-7 0,-13 Q-4,-7 0,0Z" fill="#B0201E" transform="rotate(${i * 60 + 30})"/>`).join("")}
      <circle r="3" fill="#F0C24A"/></g>`;
    const xtree = (x, base, h) => `<g>
      <rect x="${x - 7}" y="${base - 20}" width="14" height="20" fill="#5A3C24"/>
      ${[0, 1, 2, 3].map(i => { const w = h * (.62 - i * .13), y = base - 16 - i * h * .21; return `<path d="M${x - w / 2},${y} L${x},${y - h * .36} L${x + w / 2},${y} Z" fill="${i % 2 ? "#2E6B4E" : "#255C42"}"/>`; }).join("")}
      ${Array.from({ length: 16 }, (_, i) => { const t = (i % 4) / 3, row = Math.floor(i / 4), w = h * (.5 - row * .11), y = base - 26 - row * h * .2; return `<circle cx="${x - w / 2 + t * w}" cy="${y - (i % 2) * 6}" r="4" fill="${["#E0472E", "#F0C24A", "#3E8FD8", "#F3EEE3"][i % 4]}" class="xbulb x${i % 3}"/>`; }).join("")}
      <path d="M${x},${base - h * .98} l4,9 10,1 -8,6 3,10 -9,-5 -9,5 3,-10 -8,-6 10,-1z" fill="#F0C24A" stroke="#B07A1E" stroke-width="1.5"/>
      <rect x="${x - 30}" y="${base - 12}" width="18" height="14" fill="#C0262B" ${ol(1.5)}/><rect x="${x + 8}" y="${base - 10}" width="16" height="12" fill="#2F5D8A" ${ol(1.5)}/>
      <path d="M${x - 21},${base - 12} v14 M${x - 30},${base - 5} h18 M${x + 16},${base - 10} v12" stroke="#F0C24A" stroke-width="2"/>
    </g>`;
    const christmas = season !== "christmas" ? "" : `
      <!-- Christmas -->
      <g id="xmas">
        <!-- coloured lights along the cornice and round the door arch -->
        <path d="M470,348 Q575,380 685,350 Q790,380 900,350 Q1010,380 1115,350 Q1225,380 1330,348" stroke="#1E3A2A" stroke-width="2" fill="none"/>
        ${bulbs("", 33, 470, 1330, 348, 26)}
        ${Array.from({ length: 15 }, (_, i) => { const a = Math.PI * (1 - i / 14), x = 900 + Math.cos(a) * 118, y = 470 - Math.sin(a) * 92; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${["#E0472E", "#2EA05A", "#F0C24A", "#3E8FD8"][i % 4]}" class="xbulb x${i % 3}"/>`; }).join("")}
        <!-- wreath on the door, star lanterns hanging from the awnings -->
        ${wreath(900, 708)}
        ${kandil(530, 520, .62, "#E0472E")}${kandil(1290, 520, .62, "#F0C24A")}${kandil(900, 330, .52, "#D8322A")}
        <!-- garland with bows over the windows -->
        ${[492, 1052].map(x => `<path d="M${x - 40},408 Q${x + 64},440 ${x + 128},412 Q${x + 192},440 ${x + 296},408" stroke="#2E6B4E" stroke-width="10" fill="none" stroke-linecap="round"/>
          ${[x - 40, x + 128, x + 296].map(bx => `<path d="M${bx},410 l-12,-8 0,16z M${bx},410 l12,-8 0,16z" fill="#C0262B"/><circle cx="${bx}" cy="410" r="4" fill="#C0262B"/>`).join("")}`).join("")}
        <!-- poinsettias in the flower boxes and in two pots by the door -->
        ${[0, 1, 2, 3, 4].map(i => poinsettia(510 + i * 55, 692, .75) + poinsettia(1070 + i * 55, 692, .75)).join("")}
        ${[728, 1072].map(x => `${poinsettia(x - 10, 730, 1.1)}${poinsettia(x + 12, 720, .95)}${poinsettia(x, 708, .9)}`).join("")}
        <!-- the tree in the park, lit, with presents underneath -->
        ${xtree(330, 760, 150)}
        <!-- a star lantern in the park tree and on the lamp post -->
        ${kandil(150, 640, .5, "#F0C24A")}
        <!-- Santa's cap on the chalkboard, and a greeting on it -->
        <g transform="translate(640,700) scale(.86)">
          <path d="M-58,4 Q-40,-40 10,-34 Q46,-28 60,4 Z" fill="#C0262B"/><path d="M-62,2 Q0,14 62,2 L62,12 Q0,24 -62,12 Z" fill="#F3EEE3"/>
          <path d="M10,-34 Q40,-44 52,-20" stroke="#C0262B" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="54" cy="-16" r="9" fill="#F3EEE3"/>
        </g>
        <!-- a little lit tree on the outside table -->
        <g transform="translate(1240,770) scale(.38)">${xtree(0, 0, 90).replace("<g>", "<g>")}</g>
      </g>`;

    return `<svg id="street-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C2B3F"/><stop offset=".55" stop-color="#4C4A63"/><stop offset=".8" stop-color="#B97A6A"/><stop offset="1" stop-color="#E6A36F"/></linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFDB8C"/><stop offset="1" stop-color="#E9A65A"/></linearGradient>
        <linearGradient id="roomL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7CF84"/><stop offset=".6" stop-color="#E9A65A"/><stop offset="1" stop-color="#B8743A"/></linearGradient>
        <linearGradient id="roomR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FAD892"/><stop offset=".55" stop-color="#EDAE62"/><stop offset="1" stop-color="#B8743A"/></linearGradient>
        <linearGradient id="lime" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4C47E"/><stop offset="1" stop-color="#D2AE66"/></linearGradient>
        <linearGradient id="seaDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5F7E95"/><stop offset="1" stop-color="#2F5F78"/></linearGradient>
        <radialGradient id="lampHalo"><stop offset="0" stop-color="#FFE3A3" stop-opacity=".8"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
        <pattern id="laterite" width="44" height="22" patternUnits="userSpaceOnUse"><rect width="44" height="22" fill="#A4553A"/><path d="M0,21 H44 M22,0 V11 M0,10 H44 M11,11 V22 M33,11 V22" stroke="#7E3E28" stroke-width="2"/><circle cx="8" cy="5" r="1.5" fill="#7E3E28"/><circle cx="30" cy="16" r="1.5" fill="#C26B4C"/></pattern>
        <pattern id="tiles" width="60" height="21" patternUnits="userSpaceOnUse"><rect width="60" height="21" fill="#BFB29A"/><path d="M0,20 H60 M30,0 V21" stroke="#9C8F78" stroke-width="2"/></pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)"/>
      <circle cx="1440" cy="56" r="30" fill="#F6EBC8" opacity=".95"/><circle cx="1452" cy="48" r="26" fill="#22324A" opacity=".35"/>
      ${[[120, 60], [300, 120], [520, 40], [1180, 70], [1350, 30], [1500, 110], [860, 24], [40, 150], [700, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#fff" opacity=".7"/>`).join("")}
      <!-- the evening sea and the islands, behind the park and the lane -->
      <rect x="0" y="600" width="1600" height="110" fill="url(#seaDusk)"/>
      <path d="M0,600 L1600,600" stroke="#F2C48E" stroke-width="3" opacity=".7"/>
      <path d="M40,600 q40,-26 90,-18 q30,-10 60,4 q24,-6 50,14 Z M1360,600 q30,-20 70,-12 q40,-14 80,6 q30,0 60,6 Z" fill="#2C3F4E"/>
      ${[[90, 640], [250, 660], [1420, 650], [1530, 630]].map(([x, y]) => `<path d="M${x - 24},${y} h48" stroke="#F2C48E" stroke-width="2" opacity=".4"/>`).join("")}
      <g transform="translate(1480,618)"><path d="M-14,0 L14,0 L10,8 L-10,8 Z" fill="#1F2E3A"/><path d="M0,0 L0,-20" stroke="#1F2E3A" stroke-width="2"/><circle cx="0" cy="-22" r="2.5" fill="#FFE3A3"/></g>
      ${park}
      <!-- the café building -->
      <rect x="460" y="118" width="880" height="672" fill="url(#lime)"/>
      ${Array.from({ length: 18 }, (_, i) => `<path d="M${480 + (i * 211) % 840},${150 + (i * 97) % 560} q14,-4 26,2" stroke="#C9A55E" stroke-width="2" fill="none" opacity=".6"/>`).join("")}
      <rect x="440" y="102" width="920" height="24" fill="#C29A55"/><rect x="440" y="94" width="920" height="10" fill="#E9D3A0"/>
      ${Array.from({ length: 23 }, (_, i) => `<rect x="${448 + i * 40}" y="76" width="20" height="18" fill="#C29A55"/>`).join("")}
      <rect x="460" y="318" width="880" height="12" fill="#C29A55"/>
      <rect x="460" y="736" width="880" height="54" fill="url(#laterite)"/>
      <rect x="460" y="732" width="880" height="6" fill="#7E3E28"/>
      <!-- signboard -->
      <g>
        <rect x="560" y="146" width="680" height="156" rx="8" fill="${C.bottleInk}"/>
        <rect x="570" y="156" width="660" height="136" fill="${C.bottle}"/>
        <rect x="582" y="168" width="636" height="112" fill="none" stroke="${C.gold}" stroke-width="3"/>
        <text x="900" y="246" text-anchor="middle" font-family="Rozha One, serif" font-size="80" letter-spacing="5" fill="${C.gold}">CAFÉ MINJ</text>
        <text x="640" y="232" text-anchor="middle" font-family="Rozha One, serif" font-size="22" fill="${C.goldSoft}">कॅफे</text>
        <text x="1160" y="232" text-anchor="middle" font-family="Rozha One, serif" font-size="22" fill="${C.goldSoft}">मिंज</text>
        <text x="900" y="272" text-anchor="middle" font-family="Mukta, sans-serif" font-size="18" letter-spacing="3" fill="${C.ivory}" opacity=".85">Andaman-grown. Pune-roasted.</text>
        ${[600, 1200].map(x => `<path d="M${x},146 L${x},120" stroke="#2A2A26" stroke-width="4"/>`).join("")}
      </g>
      <!-- string lights under the cornice -->
      <path d="M470,336 Q570,372 680,340 Q790,372 900,340 Q1010,372 1120,340 Q1230,372 1330,336" stroke="#2A2A26" stroke-width="2" fill="none"/>
      ${Array.from({ length: 21 }, (_, i) => { const t = i / 20, x = 470 + t * 860, seg = (x - 470) % 215 / 215, y = 336 + Math.sin(seg * Math.PI) * 26 + 4; return `<circle cx="${x}" cy="${y}" r="9" fill="url(#lampHalo)" class="halo"/><circle cx="${x}" cy="${y}" r="3.5" fill="#FFE9B0"/>`; }).join("")}
      ${shopWindow(492, 256, "wl", "L")}${shopWindow(1052, 256, "wr", "R")}
      <!-- door -->
      <g id="door-frame">
        <path d="M790,780 L790,470 Q790,384 900,384 Q1010,384 1010,470 L1010,780 Z" fill="${C.bottleInk}"/>
        <path d="M806,780 L806,472 Q806,400 900,400 Q994,400 994,472 L994,780 Z" fill="url(#glow)"/>
        <path d="M806,472 Q806,400 900,400 Q994,400 994,472 Z" fill="#FFE7AE"/>
        ${[-60, -30, 0, 30, 60].map(a => `<path d="M900,472 L${900 + Math.sin(a * Math.PI / 180) * 94},${472 - Math.cos(a * Math.PI / 180) * 70}" stroke="${C.bottle}" stroke-width="4"/>`).join("")}
        <rect x="806" y="466" width="188" height="10" fill="${C.bottle}"/>
        <g id="door" class="hot" data-act="enter">
          <rect x="808" y="476" width="184" height="304" fill="${C.bottle}"/>
          <rect x="822" y="490" width="156" height="146" rx="4" fill="url(#glow)" opacity=".95"/>
          <g opacity=".6">${person1(900, 640, .55, { cup: 18 })}</g>
          <path d="M900,490 L900,636 M822,563 L978,563" stroke="${C.bottle}" stroke-width="7"/>
          <rect x="826" y="652" width="148" height="112" rx="4" fill="none" stroke="${C.bottleInk}" stroke-width="5"/>
          <rect x="966" y="628" width="8" height="34" rx="4" fill="${C.gold}"/>
          <g transform="translate(900,528)">
            <path d="M-30,-34 L0,-52 L30,-34" stroke="${C.gold}" stroke-width="2" fill="none"/>
            <rect x="-62" y="-34" width="124" height="44" rx="5" fill="${C.ivory}"/>
            <text x="0" y="-14" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="16" fill="${C.chili}">OPEN</text>
            <text x="0" y="4" text-anchor="middle" font-family="Mukta, sans-serif" font-size="12" fill="${C.bottleInk}">come in, it's free</text>
          </g>
        </g>
      </g>
      <!-- house number, and a small menu case by the door -->
      <g transform="translate(728,462)"><rect x="0" y="0" width="34" height="26" rx="4" fill="${C.ivory}" ${ol(2)}/><text x="17" y="19" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="15" fill="${C.bottle}">16</text></g>
      <g transform="translate(762,560)"><rect x="-22" y="0" width="44" height="64" rx="4" fill="${C.teak}"/><rect x="-17" y="5" width="34" height="54" fill="${C.ivory}"/>
        ${[16, 26, 36, 46].map(y => `<path d="M-14,${y} h${y % 20 ? 22 : 28}" stroke="#8C7A66" stroke-width="2.5" stroke-linecap="round"/>`).join("")}<text x="0" y="14" text-anchor="middle" font-family="Kalam, cursive" font-size="8" fill="${C.teak}">menu</text></g>
      <!-- a pulse around the door and a comic pointer, so nobody misses the way in -->
      <path class="door-pulse" d="M790,780 L790,470 Q790,384 900,384 Q1010,384 1010,470 L1010,780" fill="none" stroke="#FFE3A3" stroke-width="10" stroke-linecap="round"/>
      <!-- wall lanterns -->
      ${[760, 1040].map(x => `<circle cx="${x}" cy="440" r="70" fill="url(#lampHalo)" class="halo"/><path d="M${x},408 l0,-8 l${x < 900 ? 14 : -14},0" stroke="#2A2A26" stroke-width="4" fill="none"/><rect x="${x - 3}" y="404" width="6" height="12" fill="#2A2A26"/><path d="M${x - 14},416 L${x + 14},416 L${x + 10},450 L${x - 10},450 Z" fill="#FFE3A3" stroke="#2A2A26" stroke-width="3"/><path d="M${x - 16},416 L${x + 16},416 L${x},404 Z" fill="#2A2A26"/>`).join("")}
      <!-- steps and the footpath -->
      <rect x="0" y="790" width="1600" height="46" fill="url(#tiles)"/>
      <rect x="0" y="788" width="1600" height="4" fill="#8E8270"/>
      <rect x="772" y="778" width="256" height="14" fill="#C7A877"/><rect x="756" y="790" width="288" height="12" fill="#B8976A"/>
      <rect x="836" y="792" width="128" height="8" rx="3" fill="#8A3A2A" opacity=".85"/>
      <!-- yellow-and-black kerb -->
      ${Array.from({ length: 27 }, (_, i) => `<rect x="${i * 60}" y="836" width="60" height="12" fill="${i % 2 ? "#F0C24A" : "#2A2A26"}"/>`).join("")}
      <!-- the lane, with parking bays -->
      <rect x="0" y="848" width="1600" height="52" fill="#3A3A40"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${180 + i * 115},850 L${150 + i * 115},900" stroke="#E8E4DA" stroke-width="4" opacity=".75"/>`).join("")}
      <text x="815" y="892" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="26" fill="#E8E4DA" opacity=".55">P</text>
      ${scooter(588, 892, "#3F7FA8")}${scooter(1162, 892, "#B5452E", true)}${cycle(1360, 892)}
      <!-- plants by the door -->
      ${[728, 1072].map(x => `<g transform="translate(${x},790)"><path d="M-22,0 L22,0 L17,-40 L-17,-40 Z" fill="${C.chili}"/><rect x="-20" y="-46" width="40" height="8" fill="#8E3020"/>
        ${[-26, -10, 6, 20].map((a, i) => `<path d="M0,-46 q${a},-${44 + i * 7} ${a * 1.5},-${62 + i * 5}" stroke="#3E6B45" stroke-width="8" fill="none" stroke-linecap="round"/>`).join("")}</g>`).join("")}
      <!-- a café table on the footpath, waiting for someone -->
      <g transform="translate(1240,818)">
        <ellipse cx="0" cy="10" rx="44" ry="6" fill="#000" opacity=".18"/>
        <path d="M-34,-40 L34,-40" stroke="#2A2A26" stroke-width="7" stroke-linecap="round"/><path d="M0,-40 L0,6 M-16,8 L16,8" stroke="#2A2A26" stroke-width="5"/>
        <path d="M-64,8 L-60,-24 L-40,-24 L-42,8 M-60,-24 L-62,-56" stroke="#2A2A26" stroke-width="4" fill="none"/>
        <path d="M64,8 L60,-24 L40,-24 L42,8 M60,-24 L62,-56" stroke="#2A2A26" stroke-width="4" fill="none"/>
        <rect x="-8" y="-54" width="14" height="14" rx="2" fill="${C.ivory}" ${ol(2)}/>
      </g>
      <!-- A-frame chalk board -->
      <g transform="translate(640,700) scale(.86)">
        <path d="M-70,152 L-52,0 L52,0 L70,152" stroke="${C.teak}" stroke-width="9" fill="none"/>
        <rect x="-54" y="6" width="108" height="108" fill="#24302C" stroke="${C.teak}" stroke-width="6"/>
        <text x="0" y="34" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="${C.ivory}">My portfolio</text>
        <text x="0" y="62" text-anchor="middle" font-family="Kalam, cursive" font-size="22" fill="${C.goldSoft}">16 chapters</text>
        <text x="0" y="86" text-anchor="middle" font-family="Kalam, cursive" font-size="14" fill="${C.ivory}">${season === "christmas" ? "Merry Christmas!" : "of my career"}</text>
        <path d="M-36,98 q36,10 72,0" stroke="${C.ivory}" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <!-- street lamp and the parking sign on the lane side -->
      <g transform="translate(-40,0)"><circle cx="1452" cy="560" r="80" fill="url(#lampHalo)" class="halo"/>
        <path d="M1470,840 L1470,560 Q1470,540 1450,540" stroke="#2A2A26" stroke-width="8" fill="none"/><path d="M1432,540 L1468,540 L1460,560 L1440,560 Z" fill="#FFE3A3" ${ol(3)}/></g>
      <g transform="translate(1540,840)"><path d="M0,0 L0,-150" stroke="#8A8A90" stroke-width="6"/><rect x="-24" y="-196" width="48" height="48" rx="6" fill="#2F5D8A" stroke="#F3EEE3" stroke-width="3"/>
        <text x="0" y="-160" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="34" fill="#F3EEE3">P</text></g>
      <!-- coconut palm on the lane side -->
      ${palm(1578, -1, 360, .85)}
      ${christmas}
      <!-- the comic pointer sits on top of everything -->
      <g id="door-hint" class="hot" data-act="enter">
        <g class="door-hint-inner">
          <path d="M1042,612 L1014,632 L1046,640 Z" fill="#fff" ${ol(4)}/>
          <rect x="1036" y="590" width="196" height="56" rx="16" fill="#fff" ${ol(4)}/>
          <path d="M1040,616 L1040,636" stroke="#fff" stroke-width="8"/>
          <text id="door-hint-text" x="1134" y="628" text-anchor="middle" textLength="164" lengthAdjust="spacingAndGlyphs" font-family="Bangers, Impact, sans-serif" font-size="30" fill="${INK}">Click the door!</text>
        </g>
      </g>
    </svg>`;
  }


  /* the café front as a painted scene (made in Gemini from the drawn layout), with the live bits on top:
     the sign lettering, the chalkboard, and a door that opens */
  function paintedStreet(art, season) {
    return `<svg id="street-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFDB8C"/><stop offset="1" stop-color="#E9A65A"/></linearGradient></defs>
      <image href="${art.scene}" x="0" y="0" width="1600" height="900" preserveAspectRatio="none"/>
      <!-- sign lettering -->
      <g>
        <text x="900" y="246" text-anchor="middle" font-family="Rozha One, serif" font-size="80" letter-spacing="5" fill="${C.gold}">CAFÉ MINJ</text>
        <text x="640" y="232" text-anchor="middle" font-family="Rozha One, serif" font-size="22" fill="${C.goldSoft}">कॅफे</text>
        <text x="1160" y="232" text-anchor="middle" font-family="Rozha One, serif" font-size="22" fill="${C.goldSoft}">मिंज</text>
        <text x="900" y="274" text-anchor="middle" font-family="Mukta, sans-serif" font-size="18" letter-spacing="3" fill="${C.ivory}" opacity=".85">Andaman-grown. Pune-roasted.</text>
      </g>
      <!-- chalkboard -->
      <g font-family="Kalam, cursive" text-anchor="middle">
        <text x="645" y="728" font-size="13" fill="${C.ivory}">My portfolio</text>
        <text x="645" y="754" font-size="19" fill="${C.goldSoft}">16 chapters</text>
        <text x="645" y="776" font-size="12" fill="${C.ivory}">${season === "christmas" ? "Merry Christmas!" : "of my career"}</text>
      </g>
      <!-- the door: the painted door swings open onto the warm room -->
      <g id="door-frame">
        <rect x="805" y="470" width="192" height="305" fill="url(#glow)"/>
        <g id="door" class="hot" data-act="enter"><image href="${art.door}" x="805" y="470" width="192" height="305" preserveAspectRatio="none"/></g>
      </g>
      <path class="door-pulse" d="M790,775 L790,470 Q790,384 900,384 Q1010,384 1010,470 L1010,775" fill="none" stroke="#FFE3A3" stroke-width="10" stroke-linecap="round"/>
      <g id="door-hint" class="hot" data-act="enter">
        <g class="door-hint-inner">
          <path d="M1042,660 L1014,680 L1046,688 Z" fill="#fff" ${ol(4)}/>
          <rect x="1036" y="642" width="196" height="56" rx="16" fill="#fff" ${ol(4)}/>
          <path d="M1040,664 L1040,684" stroke="#fff" stroke-width="8"/>
          <text id="door-hint-text" x="1134" y="680" text-anchor="middle" textLength="164" lengthAdjust="spacingAndGlyphs" font-family="Bangers, Impact, sans-serif" font-size="30" fill="${INK}">Click the door!</text>
        </g>
      </g>
    </svg>`;
  }

  return { item, itemSVG, cupName, bookCover, certArt, interior, street, paintedStreet, colors: C };
})();
