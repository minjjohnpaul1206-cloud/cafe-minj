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
  const shadow = (rx = 40, y = 109) => `<ellipse cx="60" cy="${y}" rx="${rx}" ry="5" fill="#000" opacity=".16"/>`;
  const plate = (rx = 46, y = 104) => `${shadow(rx - 2, y + 5)}<ellipse cx="60" cy="${y}" rx="${rx}" ry="8" fill="#FBF7EE" ${ol()}/>
      <ellipse cx="60" cy="${y - 1}" rx="${rx - 12}" ry="4" fill="none" stroke="${INK}" stroke-width="1.5" opacity=".3"/>`;
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
      <path d="M48,68 L49.6,98" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" stroke-linecap="round"/>`,
    latte: () => `${shadow(30)}
      <path d="M40,26 L80,26 L76,104 Q60,109 44,104 Z" fill="#FFF8EA"/>
      <path d="M41.7,50 L78.3,50 L76,104 Q60,109 44,104 Z" fill="#E4C295"/>
      <path d="M43.1,80 L76.9,80 L76,104 Q60,109 44,104 Z" fill="#6B3A1E"/>
      <path d="M40,26 L80,26 L76,104 Q60,109 44,104 Z" fill="none" ${ol()}/>
      <ellipse cx="60" cy="26" rx="20" ry="5" fill="#FFFDF7" ${ol()}/>
      <path d="M73,6 L65,56" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/><path d="M73,6 L65,56" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="M47,36 L49.5,98" stroke="#fff" stroke-opacity=".65" stroke-width="3" stroke-linecap="round"/>`,
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
      <path d="M36.4,96 L83.6,96 L83,102 L37,102 Z" fill="${o.accent || C.bottle}"/>
      <path d="M35.3,62 L84.7,62 L82.6,89 L37.4,89 Z" fill="#CFA06C" ${ol(2.2)}/>
      ${[43, 51, 59, 67, 75].map(x => `<path d="M${x},65 l0,21" stroke="#A97D4E" stroke-width="1.2"/>`).join("")}
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
      + line(name, 81, t1 + 700);
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
    return `<svg viewBox="0 0 120 170" aria-hidden="true">
      <rect width="120" height="170" rx="4" fill="${b.color}"/>
      <rect x="0" y="0" width="10" height="170" fill="#000" opacity=".22"/>
      <rect x="16" y="12" width="96" height="146" rx="2" fill="none" stroke="#E8C48A" stroke-width="1.5" opacity=".75"/>
      ${motifs[b.motif] || motifs.waves}
      <text x="64" y="150" text-anchor="middle" font-family="Mukta, sans-serif" font-size="9" letter-spacing="1.5" fill="#E8C48A">${b.platform.toUpperCase()}</text>
    </svg>`;
  }

  /* a book standing on the counter (for serving), cover facing the visitor */
  items.book = (o = {}) => `${shadow(30)}
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
    idle: [-179, 205, 350, 411],
    walk: [-262, 152, 488, 600],
    serve: [-205, 143, 384, 472],
    reach: [-182, 118, 418, 514],
    plate: [-205, 143, 384, 472],
    togo: [-205, 143, 384, 472],
    write: [-205, 143, 384, 472],
    book: [-205, 143, 384, 472],
    cloche: [-414, 153, 812, 453],
    espresso: [-411, 153, 806, 450],
  };
  function barista(initials = "JPM", img = null, poses = null) {
    /* the illustration version: picture poses that walk, lean, reach and serve */
    if (img) {
      const all = { idle: img, ...(poses || {}) };
      const layers = Object.entries(all).map(([name, href]) => {
        const [x, y, w, h] = POSE_BOX[name] || POSE_BOX.idle;
        return `<image class="pose" data-pose="${name}" href="${href}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
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
  function interior(person, shelves, rules, books = []) {
    const initials = person.name.split(" ").map(w => w[0]).join("").slice(0, 3);
    const jarSlots = [0, 1, 2, 3, 4].map(i => 420 + i * 74);
    const lamp = x => `<g class="lamp"><path d="M${x},0 L${x},118" stroke="#2A2A26" stroke-width="2"/>
      <circle cx="${x}" cy="170" r="120" fill="url(#lampGlow)"/>
      <path d="M${x - 34},150 Q${x},104 ${x + 34},150 Z" fill="${C.bottle}"/><path d="M${x - 34},150 L${x + 34},150" stroke="${C.gold}" stroke-width="3"/>
      <ellipse cx="${x}" cy="152" rx="12" ry="6" fill="#FFE6A8"/></g>`;

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

      <!-- espresso machine, wearing the café emblem -->
      <g id="machine" class="hot" data-act="shelf:signature-brews">
        <rect x="1168" y="546" width="28" height="14" rx="3" fill="${INK}"/><rect x="1354" y="546" width="28" height="14" rx="3" fill="${INK}"/>
        <rect x="1150" y="392" width="250" height="158" rx="16" fill="#E4E8EA" ${ol(4)}/>
        <path d="M1150,432 L1150,408 Q1150,392 1166,392 L1384,392 Q1400,392 1400,408 L1400,432 Z" fill="${C.bottle}" ${ol(4)}/>
        ${emblem(1180, 412, 14)}
        <text x="1296" y="420" text-anchor="middle" font-family="Rozha One, serif" font-size="21" letter-spacing="2" fill="${C.goldSoft}">CAFÉ MINJ</text>
        <path d="M1164,446 L1164,522" stroke="#fff" stroke-opacity=".75" stroke-width="5" stroke-linecap="round"/>
        <circle cx="1356" cy="466" r="19" fill="#FBF7EE" ${ol(3.4)}/>
        ${[-60, -20, 20, 60].map(a => `<path d="M1356,451 l0,4" transform="rotate(${a} 1356 466)" ${ol(1.8)}/>`).join("")}
        <path d="M1356,466 L1366,455" stroke="${C.chili}" stroke-width="3.4" stroke-linecap="round"/><circle cx="1356" cy="466" r="2.6" fill="${INK}"/>
        <circle cx="1296" cy="452" r="6" fill="${C.gold}" ${ol(2.2)}/><circle cx="1314" cy="452" r="6" fill="${C.chili}" ${ol(2.2)}/>
        <path d="M1384,474 q22,12 10,56" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M1384,474 q22,12 10,56" fill="none" stroke="#B9C1C5" stroke-width="4.4" stroke-linecap="round"/>
        <rect x="1186" y="444" width="88" height="24" rx="9" fill="#8D979C" ${ol(3.4)}/>
        <path d="M1212,478 L1180,486" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M1212,478 L1180,486" stroke="#4A2717" stroke-width="5.6" stroke-linecap="round"/>
        <rect x="1210" y="468" width="40" height="14" rx="4" fill="#59636A" ${ol(3)}/>
        <path d="M1224,482 l0,7 M1236,482 l0,7" ${ol(3)}/>
        <path id="pour" d="M1228,490 L1228,520 M1232,490 L1232,520" stroke="${C.coffee}" stroke-width="3" opacity="0"/>
        <rect x="1168" y="534" width="214" height="14" rx="5" fill="#59636A" ${ol(3.4)}/>
        <path d="M1184,541 h182" stroke="${INK}" stroke-width="2" stroke-dasharray="10 8" opacity=".6"/>
        <g id="steam" opacity="0">
          <path class="puff" d="M1222,470 q-12,-20 0,-40 q12,-20 0,-40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
          <path class="puff p2" d="M1244,470 q12,-20 0,-40 q-12,-20 0,-40" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
        </g>
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
  function street(person) {
    const win = (x) => `<g>
      <path d="M${x},700 L${x},440 Q${x},380 ${x + 210},380 Q${x + 420},380 ${x + 420},440 L${x + 420},700 Z" fill="${C.bottle}"/>
      <path d="M${x + 14},688 L${x + 14},444 Q${x + 14},394 ${x + 210},394 Q${x + 406},394 ${x + 406},444 L${x + 406},688 Z" fill="url(#glow)"/>
      <g opacity=".55" fill="#5B3A1E">
        <path d="M${x + 60},688 l0,-70 q0,-28 30,-28 l0,-14 l10,0 l0,42 l-30,0 l0,70 Z"/>
        <ellipse cx="${x + 150}" cy="636" rx="44" ry="8"/><rect x="${x + 146}" y="636" width="8" height="52"/>
        <path d="M${x + 260},688 l0,-70 q0,-28 30,-28 l0,-14 l10,0 l0,42 l-30,0 l0,70 Z"/>
        <ellipse cx="${x + 340}" cy="560" rx="60" ry="10" opacity=".6"/>
      </g>
      ${[0, 1, 2, 3].map(i => `<g transform="translate(${x + 70 + i * 92},560)" opacity=".92">${`<g transform="scale(.6)">${item("jar", { jarColor: ["#B5452E", "#2F5D8A", "#C98A1B", "#4E7A4A"][i] })}</g>`}</g>`).join("")}
      <rect x="${x + 14}" y="626" width="392" height="8" fill="${C.teak}"/>
      <path d="M${x + 210},394 L${x + 210},688 M${x + 14},520 L${x + 406},520" stroke="${C.bottle}" stroke-width="10"/>
      <rect x="${x - 10}" y="700" width="440" height="18" fill="${C.ivory}"/>
    </g>`;

    return `<svg id="street-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C2B3F"/><stop offset=".6" stop-color="#4C4A63"/><stop offset="1" stop-color="#C9876A"/></linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFDB8C"/><stop offset="1" stop-color="#E9A65A"/></linearGradient>
        <linearGradient id="lime" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4C47E"/><stop offset="1" stop-color="#D2AE66"/></linearGradient>
        <radialGradient id="lampHalo"><stop offset="0" stop-color="#FFE3A3" stop-opacity=".8"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)"/>
      <circle cx="1440" cy="56" r="30" fill="#F6EBC8" opacity=".95"/><circle cx="1452" cy="48" r="26" fill="#22324A" opacity=".35"/>
      ${[[120, 60], [300, 120], [520, 40], [1180, 70], [1350, 30], [1500, 110], [860, 24]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#fff" opacity=".7"/>`).join("")}
      <!-- building -->
      <rect x="80" y="110" width="1440" height="680" fill="url(#lime)"/>
      <rect x="60" y="96" width="1480" height="26" fill="#C29A55"/><rect x="60" y="88" width="1480" height="10" fill="#E9D3A0"/>
      <rect x="80" y="330" width="1440" height="14" fill="#C29A55"/>
      <!-- signboard -->
      <g>
        <rect x="330" y="146" width="940" height="170" rx="8" fill="${C.bottleInk}"/>
        <rect x="340" y="156" width="920" height="150" fill="${C.bottle}"/>
        <rect x="352" y="168" width="896" height="126" fill="none" stroke="${C.gold}" stroke-width="3"/>
        <rect x="360" y="176" width="880" height="110" fill="none" stroke="${C.gold}" stroke-width="1" opacity=".6"/>
        <text x="800" y="252" text-anchor="middle" font-family="Rozha One, serif" font-size="92" letter-spacing="6" fill="${C.gold}">CAFÉ MINJ</text>
        <text x="460" y="236" text-anchor="middle" font-family="Rozha One, serif" font-size="26" fill="${C.goldSoft}">कॅफे</text>
        <text x="1140" y="236" text-anchor="middle" font-family="Rozha One, serif" font-size="26" fill="${C.goldSoft}">मिंज</text>
        <text x="800" y="282" text-anchor="middle" font-family="Mukta, sans-serif" font-size="20" letter-spacing="3" fill="${C.ivory}" opacity=".85">Andaman-grown. Pune-roasted.</text>
      </g>
      ${win(150)}${win(1030)}
      <!-- door -->
      <g id="door-frame">
        <path d="M670,780 L670,460 Q670,370 800,370 Q930,370 930,460 L930,780 Z" fill="${C.bottleInk}"/>
        <path d="M688,780 L688,462 Q688,388 800,388 Q912,388 912,462 L912,780 Z" fill="url(#glow)"/>
        <path d="M688,462 Q688,388 800,388 Q912,388 912,462 Z" fill="#FFE7AE"/>
        ${[-60, -30, 0, 30, 60].map(a => `<path d="M800,462 L${800 + Math.sin(a * Math.PI / 180) * 112},${462 - Math.cos(a * Math.PI / 180) * 74}" stroke="${C.bottle}" stroke-width="4"/>`).join("")}
        <rect x="688" y="456" width="224" height="10" fill="${C.bottle}"/>
        <g id="door" class="hot" data-act="enter">
          <rect x="690" y="466" width="220" height="314" fill="${C.bottle}"/>
          <rect x="708" y="482" width="184" height="150" rx="4" fill="url(#glow)" opacity=".95"/>
          <path d="M800,482 L800,632 M708,557 L892,557" stroke="${C.bottle}" stroke-width="8"/>
          <rect x="712" y="650" width="176" height="112" rx="4" fill="none" stroke="${C.bottleInk}" stroke-width="5"/>
          <circle cx="882" cy="640" r="8" fill="${C.gold}"/>
          <g transform="translate(800,520)">
            <path d="M-34,-36 L0,-56 L34,-36" stroke="${C.gold}" stroke-width="2" fill="none"/>
            <rect x="-66" y="-36" width="132" height="44" rx="5" fill="${C.ivory}"/>
            <text x="0" y="-16" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="16" fill="${C.chili}">OPEN</text>
            <text x="0" y="2" text-anchor="middle" font-family="Mukta, sans-serif" font-size="12" fill="${C.bottleInk}">come in, it's free</text>
          </g>
        </g>
      </g>
      <!-- a pulse around the door and a comic pointer, so nobody misses the way in -->
      <path class="door-pulse" d="M670,780 L670,460 Q670,370 800,370 Q930,370 930,460 L930,780" fill="none" stroke="#FFE3A3" stroke-width="10" stroke-linecap="round"/>
      <g id="door-hint" class="hot" data-act="enter">
        <g class="door-hint-inner">
          <path d="M962,612 L934,632 L966,640 Z" fill="#fff" ${ol(4)}/>
          <rect x="956" y="590" width="196" height="56" rx="16" fill="#fff" ${ol(4)}/>
          <path d="M960,616 L960,636" stroke="#fff" stroke-width="8"/>
          <text id="door-hint-text" x="1054" y="628" text-anchor="middle" textLength="164" lengthAdjust="spacingAndGlyphs" font-family="Bangers, Impact, sans-serif" font-size="30" fill="${INK}">Click the door!</text>
        </g>
      </g>
      <!-- lamps -->
      ${[640, 960].map(x => `<circle cx="${x}" cy="430" r="70" fill="url(#lampHalo)" class="halo"/><rect x="${x - 3}" y="404" width="6" height="16" fill="#2A2A26"/><path d="M${x - 14},420 L${x + 14},420 L${x + 10},452 L${x - 10},452 Z" fill="#FFE3A3" stroke="#2A2A26" stroke-width="3"/>`).join("")}
      <!-- the beach in front of the café, and the sea -->
      <rect x="0" y="790" width="1600" height="110" fill="#E6CE98"/>
      <rect x="0" y="790" width="1600" height="7" fill="#D4B67D"/>
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 97) % 1600}" cy="${800 + (i * 37) % 52}" r="1.6" fill="#C9A86E"/>`).join("")}
      <rect x="650" y="780" width="300" height="20" fill="#C7A877"/><rect x="630" y="798" width="340" height="14" fill="#B8976A"/>
      ${starfish(520, 832, 13, 10)}${starfish(1430, 820, 11, -18)}${shell(380, 838, 1)}${shell(1080, 846, .9)}
      <path d="M-20,860 Q60,850 140,858 T300,858 T460,858 T620,858 T780,858 T940,858 T1100,858 T1260,858 T1420,858 T1580,858 T1740,858 L1740,900 L-20,900 Z" fill="#2F8FA0"/>
      <g class="surf"><path d="M-20,860 Q60,850 140,858 T300,858 T460,858 T620,858 T780,858 T940,858 T1100,858 T1260,858 T1420,858 T1580,858 T1740,858" stroke="#F3EEE3" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
        <path d="M40,878 q30,-6 60,0 M380,884 q30,-6 60,0 M760,878 q30,-6 60,0 M1140,884 q30,-6 60,0 M1480,878 q30,-6 60,0" stroke="#7CC4CC" stroke-width="3" fill="none"/></g>
      <!-- plants -->
      ${[610, 990].map(x => `<g transform="translate(${x},790)"><path d="M-26,0 L26,0 L20,-46 L-20,-46 Z" fill="${C.chili}"/><rect x="-24" y="-52" width="48" height="8" fill="#8E3020"/>
        ${[-30, -12, 6, 22].map((a, i) => `<path d="M0,-52 q${a},-${50 + i * 8} ${a * 1.6},-${70 + i * 6}" stroke="#3E6B45" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("")}</g>`).join("")}
      <!-- A-frame chalk board -->
      <g transform="translate(1250,700)">
        <path d="M-80,160 L-60,0 L60,0 L80,160" stroke="${C.teak}" stroke-width="10" fill="none"/>
        <rect x="-62" y="6" width="124" height="120" fill="#24302C" stroke="${C.teak}" stroke-width="6"/>
        <text x="0" y="36" text-anchor="middle" font-family="Kalam, cursive" font-size="17" fill="${C.ivory}">Today</text>
        <text x="0" y="66" text-anchor="middle" font-family="Kalam, cursive" font-size="24" fill="${C.goldSoft}">16 chapters</text>
        <text x="0" y="92" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="${C.ivory}">all on the house</text>
        <path d="M-40,106 q40,10 80,0" stroke="${C.ivory}" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <!-- coconut palms framing the café -->
      ${palm(40, 1, 300)}${palm(1560, -1, 320)}
    </svg>`;
  }

  return { item, itemSVG, cupName, bookCover, interior, street, colors: C };
})();
