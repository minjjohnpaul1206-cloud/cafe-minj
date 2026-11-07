/* =========================================================
   CAFÉ MINJ — illustrations (all hand-built SVG, no images)
   Item art is drawn in a 120 × 120 box, base centred at (60, 110).
   ========================================================= */

window.ART = (function () {
  const C = {
    bottle: "#14354A", bottleInk: "#0C2131", gold: "#BF8B3B", goldSoft: "#E8C48A",
    ivory: "#F3EEE3", mint: "#A8CBB7", mintDeep: "#86AE9B", teak: "#6A3A22",
    teakDark: "#4A2717", coffee: "#3B2014", crema: "#A0612F", skin: "#8A5638",
    skinShade: "#683C24", hair: "#15100D", shirt: "#2B2C31", chili: "#B5452E",
    denim: "#33506F", denimDark: "#253B54", leather: "#A86B3C",
  };

  /* ---------- the menu items ---------- */
  const saucer = (y = 106, rx = 44) =>
    `<ellipse cx="60" cy="${y}" rx="${rx}" ry="7" fill="#E9E5DC"/><ellipse cx="60" cy="${y - 1.5}" rx="${rx - 10}" ry="4" fill="#D7D1C4"/>`;

  const cup = (x0, x1, y0, y1, handle = true) => {
    const mid = (x0 + x1) / 2, rx = (x1 - x0) / 2;
    return `${handle ? `<path d="M${x1 - 2},${y0 + 7} q16,0 14,11 q-2,9 -16,8" fill="none" stroke="#F4F1EA" stroke-width="5"/>` : ""}
      <path d="M${x0},${y0} L${x1},${y0} L${x1 - 3},${y1 - 10} Q${mid},${y1 + 2} ${x0 + 3},${y1 - 10} Z" fill="#F7F4EE"/>
      <path d="M${mid + rx * 0.45},${y0 + 2} L${x1 - 3},${y0 + 2} L${x1 - 5},${y1 - 11} Q${mid + rx * 0.6},${y1 - 4} ${mid + rx * 0.4},${y1 - 6} Z" fill="#E4DFD4"/>
      <ellipse cx="${mid}" cy="${y0}" rx="${rx}" ry="4.5" fill="#F7F4EE"/>
      <ellipse cx="${mid}" cy="${y0 + 0.5}" rx="${rx - 3}" ry="3.2" fill="${C.crema}"/>
      <ellipse cx="${mid}" cy="${y0 + 1}" rx="${rx - 7}" ry="2" fill="${C.coffee}"/>`;
  };

  const items = {
    espresso: () => `${saucer()}${cup(38, 82, 72, 106)}`,
    ristretto: () => `${saucer(106, 36)}${cup(45, 75, 82, 106)}`,
    doubleshot: () => `${saucer(106, 50)}
      <g transform="translate(-20,4)">${cup(46, 74, 76, 102, false)}</g>
      <g transform="translate(20,4)">${cup(46, 74, 76, 102)}</g>`,
    macchiato: () => `${saucer(107, 36)}
      <path d="M43,64 L77,64 L74,104 L46,104 Z" fill="#ffffff" fill-opacity=".35" stroke="#ffffff" stroke-opacity=".8" stroke-width="2"/>
      <path d="M45,78 L75,78 L73,103 L47,103 Z" fill="${C.coffee}"/>
      <path d="M44,70 L76,70 L75,79 L45,79 Z" fill="#E9D3B4"/>
      <ellipse cx="60" cy="68" rx="15" ry="5" fill="#FBF6EC"/>
      <circle cx="60" cy="66" r="4" fill="${C.crema}"/>`,
    latte: () => `<ellipse cx="60" cy="108" rx="30" ry="4" fill="#000" opacity=".18"/>
      <path d="M40,24 L80,24 L76,107 L44,107 Z" fill="#ffffff" fill-opacity=".28" stroke="#ffffff" stroke-opacity=".85" stroke-width="2"/>
      <path d="M42,78 L78,78 L76,106 L44,106 Z" fill="#5A3420"/>
      <path d="M41,48 L79,48 L78,79 L42,79 Z" fill="#D9B98F"/>
      <path d="M41,30 L79,30 L79,49 L41,49 Z" fill="#F6EEE0"/>
      <path d="M45,40 q15,-8 30,0" fill="none" stroke="${C.crema}" stroke-width="2.5" opacity=".7"/>
      <path d="M47,30 L50,104" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>
      <path d="M70,12 L62,60" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>`,
    cookies: () => `<ellipse cx="60" cy="107" rx="46" ry="7" fill="#E9E5DC"/>
      ${[98, 88, 78].map((y, i) => `<g transform="translate(${i % 2 ? 3 : -2},0)">
        <ellipse cx="60" cy="${y + 4}" rx="32" ry="8" fill="#B87A3A"/>
        <ellipse cx="60" cy="${y}" rx="32" ry="8" fill="#DDA45E"/>
        <ellipse cx="60" cy="${y - 1}" rx="22" ry="4.5" fill="#E8B977"/>
        <circle cx="50" cy="${y - 1}" r="1.6" fill="#9A5E26"/><circle cx="66" cy="${y + 1}" r="1.6" fill="#9A5E26"/><circle cx="60" cy="${y - 3}" r="1.4" fill="#9A5E26"/></g>`).join("")}`,
    jar: (o = {}) => {
      const col = o.jarColor || C.chili;
      return `<ellipse cx="60" cy="108" rx="30" ry="4" fill="#000" opacity=".18"/>
      <rect x="34" y="18" width="52" height="12" rx="3" fill="#7E8A86"/><rect x="34" y="18" width="52" height="4" rx="2" fill="#A7B2AE"/>
      <path d="M38,30 L82,30 Q90,34 90,46 L90,98 Q90,108 80,108 L40,108 Q30,108 30,98 L30,46 Q30,34 38,30 Z" fill="#ffffff" fill-opacity=".22" stroke="#ffffff" stroke-opacity=".85" stroke-width="2"/>
      <path d="M33,56 Q60,50 87,56 L87,98 Q87,105 79,105 L41,105 Q33,105 33,98 Z" fill="#4A2A18"/>
      ${[[42, 64], [55, 60], [70, 63], [80, 70], [48, 76], [63, 73], [76, 84], [40, 90], [56, 88], [70, 96], [45, 100], [82, 96]].map(([x, y]) =>
        `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="#6B3D22" transform="rotate(${(x * 7) % 60 - 30} ${x} ${y})"/>`).join("")}
      <rect x="40" y="66" width="40" height="24" rx="3" fill="${col}"/>
      <rect x="43" y="69" width="34" height="18" rx="2" fill="none" stroke="#F3EEE3" stroke-opacity=".7" stroke-width="1.2"/>
      <path d="M38,36 L38,96" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>`;
    },
    cloche: () => `<ellipse cx="60" cy="106" rx="50" ry="8" fill="#CFCAC0"/><ellipse cx="60" cy="104" rx="50" ry="7" fill="#EDEAE3"/>
      <g transform="translate(14,4) scale(.78)">${cup(46, 74, 80, 106)}</g>
      <path d="M38,70 l3,6 6,3 -6,3 -3,6 -3,-6 -6,-3 6,-3z M84,64 l2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2z" fill="${C.gold}"/>
      <g class="cloche-dome"><path d="M14,102 Q14,48 60,46 Q106,48 106,102 Z" fill="#C3C9CE"/>
      <path d="M24,96 Q26,58 56,52" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="5" stroke-linecap="round"/>
      <path d="M14,102 L106,102" stroke="#9DA4AA" stroke-width="3"/>
      <circle cx="60" cy="42" r="7" fill="${C.gold}"/><circle cx="58" cy="40" r="2.2" fill="#F2DE9F"/></g>`,
    croissant: () => `<ellipse cx="60" cy="108" rx="46" ry="7" fill="#E9E5DC"/>
      <path d="M14,96 Q20,70 40,66 Q60,58 80,66 Q100,70 106,96 Q96,88 86,90 Q74,80 60,80 Q46,80 34,90 Q24,88 14,96 Z" fill="#C9822F"/>
      <path d="M22,92 Q28,74 42,70 Q60,63 78,70 Q92,74 98,92" fill="none" stroke="#E7AE5B" stroke-width="5" stroke-linecap="round"/>
      ${[38, 50, 62, 74].map(x => `<path d="M${x},${x < 60 ? 68 : 67} Q${x + 4},${78} ${x + 2},${86}" stroke="#8E541C" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join("")}`,
    roll: () => `<ellipse cx="60" cy="108" rx="46" ry="7" fill="#E9E5DC"/>
      <ellipse cx="60" cy="96" rx="40" ry="11" fill="#9A5A27"/>
      <ellipse cx="60" cy="86" rx="40" ry="15" fill="#C98445"/>
      <path d="M60,86 m-4,0 a4,3 0 1,1 8,1 a10,7 0 1,1 -18,-1 a16,11 0 1,1 30,2 a22,14 0 1,1 -40,-3" fill="none" stroke="#7D4318" stroke-width="3" stroke-linecap="round"/>
      <path d="M30,80 q8,8 4,14 M52,72 q4,6 -2,12 M78,76 q-6,8 2,14" stroke="#F6EEE0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>`,
    biscotti: () => `<ellipse cx="60" cy="108" rx="46" ry="7" fill="#E9E5DC"/>
      <g transform="rotate(-14 46 86)"><rect x="18" y="74" width="58" height="22" rx="6" fill="#D6A060"/><rect x="18" y="74" width="58" height="6" rx="3" fill="#B97C3C"/>
      <ellipse cx="34" cy="87" rx="5" ry="3" fill="#F1DDB8"/><ellipse cx="52" cy="89" rx="5" ry="3" fill="#F1DDB8"/><ellipse cx="64" cy="85" rx="4" ry="2.5" fill="#F1DDB8"/></g>
      <g transform="rotate(8 70 92)"><rect x="44" y="82" width="58" height="22" rx="6" fill="#DFAA69"/><rect x="44" y="82" width="58" height="6" rx="3" fill="#B97C3C"/>
      <ellipse cx="58" cy="95" rx="5" ry="3" fill="#F1DDB8"/><ellipse cx="76" cy="96" rx="5" ry="3" fill="#F1DDB8"/><ellipse cx="90" cy="93" rx="4" ry="2.5" fill="#F1DDB8"/></g>`,
    muffin: () => `<ellipse cx="60" cy="108" rx="36" ry="6" fill="#000" opacity=".15"/>
      <path d="M32,70 L88,70 L80,108 L40,108 Z" fill="${C.chili}"/>
      ${[40, 50, 60, 70, 80].map(x => `<path d="M${x},70 L${x + (x - 60) * -0.12},108" stroke="#8E3020" stroke-width="2"/>`).join("")}
      <path d="M26,72 Q24,40 60,36 Q96,40 94,72 Q60,80 26,72 Z" fill="#A86634"/>
      <path d="M36,58 Q50,44 70,46" fill="none" stroke="#C88752" stroke-width="5" stroke-linecap="round"/>
      ${[[44, 62], [58, 54], [72, 60], [64, 68], [50, 70], [80, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#3B2014"/>`).join("")}`,
  };

  /* to-go paper cup: kraft sleeve, lid, and a slot for the visitor's name */
  items.togo = (o = {}) => `<ellipse cx="60" cy="109" rx="26" ry="4" fill="#000" opacity=".18"/>
      <path d="M33,34 L87,34 L81,108 L39,108 Z" fill="#FBFAF6"/>
      <path d="M71,34 L87,34 L81,108 L73,108 Z" fill="#E9E5DC"/>
      <path d="M36.3,96 L83.7,96 L83.2,101 L36.8,101 Z" fill="${o.accent || C.bottle}"/>
      <path d="M35.3,62 L84.7,62 L82.6,89 L37.4,89 Z" fill="#C49A6C"/>
      <path d="M35.3,62 L84.7,62 M37.4,89 L82.6,89" stroke="#8E6A43" stroke-width="1.2"/>
      ${[42, 50, 58, 66, 74].map(x => `<path d="M${x},64 l0,23" stroke="#B5895B" stroke-width="1"/>`).join("")}
      <rect x="29" y="27" width="62" height="9" rx="4" fill="#EFEBE3"/>
      <path d="M34,27 Q36,15 60,14 Q84,15 86,27 Z" fill="#F7F4EE"/>
      <rect x="62" y="16" width="12" height="4" rx="2" fill="#D3CDC1"/>
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

  function item(art, opts = {}) {
    return (items[art] || items.espresso)(opts);
  }
  function itemSVG(art, opts = {}, cls = "") {
    return `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true">${item(art, opts)}</svg>`;
  }

  /* ---------- the barista (local coords, centred on x = 0) ---------- */
  /* the barista: drawn from John Paul's photo — swept-up curly hair, thick brows,
     moustache into a goatee — in a charcoal shirt and denim apron */
  function arm(id, x, watch = false) {
    return `<g transform="translate(${x},398)"><g id="${id}" class="arm">
      <path d="M-18,6 Q-18,-6 0,-6 Q18,-6 18,6 L16,72 L-16,72 Z" fill="${C.shirt}"/>
      <rect x="-17" y="64" width="34" height="16" rx="5" fill="#45464D"/>
      <path d="M-17,70 L17,70" stroke="#2B2C31" stroke-width="1.5"/>
      <path d="M-13,78 L13,78 L11,146 L-11,146 Z" fill="${C.skin}"/>
      <path d="M-6,92 q-2,22 1,40" stroke="${C.skinShade}" stroke-width="2" fill="none" opacity=".5"/>
      ${watch ? `<rect x="-13" y="128" width="26" height="9" rx="2" fill="#2A2A26"/><rect x="-6" y="126" width="12" height="13" rx="3" fill="#D9DDE0" stroke="#8E979C" stroke-width="1.5"/>` : ""}
      <circle cx="0" cy="152" r="14" fill="${C.skin}"/>
      <path d="M-9,146 q9,8 18,0" stroke="${C.skinShade}" stroke-width="2" fill="none"/>
    </g></g>`;
  }

  function barista(initials = "JPM") {
    const H = C.hair;
    return `<g id="barista" style="transform: translate(800px, 0px)"><g id="barista-inner">
      <g id="b-torso">
        <path d="M-98,430 Q-98,392 -62,388 L62,388 Q98,392 98,430 L104,640 L-104,640 Z" fill="${C.shirt}"/>
        <rect x="-16" y="346" width="32" height="48" fill="${C.skin}"/>
        <path d="M-16,378 Q0,392 16,378 L16,394 L-16,394 Z" fill="${C.skinShade}"/>
        <path d="M-24,388 L0,420 L24,388" fill="${C.skin}" stroke="#1F2024" stroke-width="3"/>
        <circle cx="0" cy="430" r="2.4" fill="#5A5B62"/>
        <path d="M-66,424 L66,424 L76,640 L-76,640 Z" fill="${C.denim}"/>
        <path d="M-66,424 L66,424 L76,640 M-66,424 L-76,640" stroke="#E8DCC4" stroke-width="1.6" stroke-dasharray="5 4" fill="none" opacity=".75"/>
        <path d="M-64,426 L-34,390 M64,426 L34,390" stroke="${C.leather}" stroke-width="9" stroke-linecap="round"/>
        <circle cx="-60" cy="430" r="4" fill="${C.gold}"/><circle cx="60" cy="430" r="4" fill="${C.gold}"/>
        <rect x="-40" y="456" width="80" height="50" rx="5" fill="${C.denimDark}"/>
        <rect x="-40" y="456" width="80" height="50" rx="5" fill="none" stroke="#E8DCC4" stroke-width="1.4" stroke-dasharray="4 3" opacity=".75"/>
        <text x="0" y="489" text-anchor="middle" font-family="Rozha One, serif" font-size="21" fill="#E8DCC4">${initials}</text>
        <rect x="26" y="446" width="5" height="20" rx="2" fill="${C.chili}"/>
      </g>
      ${arm("armL", -94, true)}
      ${arm("armR", 94)}
      <g id="b-head">
        <g transform="translate(50,282) rotate(24)"><rect x="-3.6" y="-22" width="7.2" height="40" rx="3" fill="${C.chili}"/><rect x="-3.6" y="12" width="7.2" height="8" rx="1" fill="#F3EEE3"/></g>
        <ellipse cx="-46" cy="308" rx="9" ry="13" fill="${C.skin}"/><ellipse cx="46" cy="308" rx="9" ry="13" fill="${C.skin}"/>
        <path d="M-44,288 Q-46,344 -25,365 Q0,384 25,365 Q46,344 44,288 Q44,246 0,242 Q-44,246 -44,288 Z" fill="${C.skin}"/>
        <path d="M-44,316 Q-41,350 -24,366 Q0,384 24,366 Q41,350 44,316 Q38,344 22,354 Q0,364 -22,354 Q-38,344 -44,316 Z" fill="${H}" opacity=".32"/>
        <g id="b-face">
          <path d="M-46,300 Q-50,264 -38,248 L-37,278 Q-42,286 -44,300 Z" fill="${H}" opacity=".85"/>
          <path d="M46,300 Q50,264 38,248 L37,278 Q42,286 44,300 Z" fill="${H}" opacity=".85"/>
          <path d="M-45,280 Q-56,238 -30,222 Q-24,200 -2,204 Q14,190 34,204 Q58,208 52,240 Q58,258 45,280 Q42,256 30,252 Q18,262 4,254 Q-10,264 -24,254 Q-36,262 -45,280 Z" fill="${H}"/>
          <g stroke="#3A2C24" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9">
            <path d="M-34,236 q6,-9 13,0"/><path d="M-16,222 q7,-10 14,0"/><path d="M4,214 q7,-9 14,1"/><path d="M22,222 q7,-8 13,2"/>
            <path d="M34,238 q6,-7 11,3"/><path d="M-26,248 q6,-7 12,0"/><path d="M-4,238 q6,-8 13,0"/><path d="M16,240 q6,-7 12,1"/>
          </g>
          <path d="M-8,254 q-9,10 -1,19" stroke="${H}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M-34,284 Q-21,274 -7,281 L-8,286 Q-21,281 -33,290 Z" fill="${H}"/>
          <g id="b-browR"><path d="M34,284 Q21,274 7,281 L8,286 Q21,281 33,290 Z" fill="${H}"/></g>
          <g id="b-eyes">
            <g><path d="M-29,301 Q-18,292 -7,301 Q-18,307 -29,301 Z" fill="#F4EFE6"/><circle cx="-18" cy="300.5" r="4.6" fill="#24150E"/><circle cx="-16.6" cy="299" r="1.4" fill="#fff"/>
              <path d="M-29,301 Q-18,291 -7,301" stroke="${H}" stroke-width="2.2" fill="none"/></g>
            <g id="b-eyeR"><path d="M29,301 Q18,292 7,301 Q18,307 29,301 Z" fill="#F4EFE6"/><circle cx="18" cy="300.5" r="4.6" fill="#24150E"/><circle cx="19.4" cy="299" r="1.4" fill="#fff"/>
              <path d="M29,301 Q18,291 7,301" stroke="${H}" stroke-width="2.2" fill="none"/></g>
          </g>
          <path d="M-2,302 Q-4,318 -10,325 Q-12,331 -5,332 Q0,335 5,332 Q12,331 10,325 Q4,318 2,302" fill="${C.skinShade}" opacity=".45"/>
          <path d="M-10,325 Q-12,331 -5,332 M10,325 Q12,331 5,332" stroke="${C.skinShade}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
          <path d="M-24,346 Q-12,334 0,339 Q12,334 24,346 Q15,344 8,348 Q0,343 -8,348 Q-15,344 -24,346 Z" fill="${H}"/>
          <path d="M-23,346 Q-26,354 -19,362 M23,346 Q26,354 19,362" stroke="${H}" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".85"/>
          <path id="b-mouth" d="M-12,353 Q2,359 15,350" stroke="#3E1E10" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M-19,361 Q-15,381 0,385 Q15,381 19,361 Q10,368 0,367 Q-10,368 -19,361 Z" fill="${H}"/>
          <path d="M-4,357 Q0,363 4,357 Z" fill="${H}"/>
        </g>
      </g>
    </g></g>`;
  }

  /* ---------- the inside of the café (viewBox 0 0 1600 900) ---------- */
  function interior(person, shelves, rules) {
    const initials = person.name.split(" ").map(w => w[0]).join("").slice(0, 3);
    const portrait = person.photo
      ? `<clipPath id="pclip"><ellipse cx="1440" cy="226" rx="56" ry="72"/></clipPath>
         <image href="${person.photo}" x="1384" y="154" width="112" height="144" preserveAspectRatio="xMidYMid slice" clip-path="url(#pclip)"/>`
      : `<ellipse cx="1440" cy="226" rx="56" ry="72" fill="#C9B48A"/>
         <circle cx="1440" cy="206" r="24" fill="#8C7350"/><path d="M1398,290 Q1400,248 1440,246 Q1480,248 1482,290 Z" fill="#8C7350"/>`;

    const jarSlots = [0, 1, 2, 3].map(i => 440 + i * 92);
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
        <rect x="76" y="118" width="260" height="300" rx="6" fill="${C.teak}"/>
        <rect x="88" y="130" width="236" height="276" fill="${C.bottle}"/>
        <rect x="96" y="138" width="220" height="260" fill="none" stroke="${C.gold}" stroke-width="2"/>
        <text x="206" y="182" text-anchor="middle" font-family="Rozha One, serif" font-size="30" fill="${C.gold}">Café Rules</text>
        <path d="M150,196 L262,196" stroke="${C.gold}" stroke-width="1.5"/>
        ${rules.slice(0, 6).map((r, i) => `<text x="110" y="${230 + i * 29}" font-family="Kalam, cursive" font-size="16" fill="${C.ivory}" opacity=".92">${i + 1}. ${r.short}</text>`).join("")}
      </g>

      <!-- jar shelf -->
      <g id="jar-shelf">
        <rect x="390" y="300" width="380" height="14" fill="${C.teak}"/><rect x="390" y="314" width="380" height="5" fill="${C.teakDark}"/>
        <path d="M420,319 l0,26 l22,-26 M740,319 l0,26 l-22,-26" stroke="${C.teakDark}" stroke-width="6" fill="none"/>
        ${jarSlots.map((x, i) => `<g class="shelf-jar hot" data-jar="${i}" data-act="jar:${i}" style="transform: translate(${x - 60 * 0.75}px, ${300 - 110 * 0.75}px) scale(.75)">${item("jar", { jarColor: ["#B5452E", "#2F5D8A", "#C98A1B", "#4E7A4A"][i] })}</g>`).join("")}
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

      <!-- proprietor portrait -->
      <g><ellipse cx="1440" cy="226" rx="70" ry="88" fill="${C.gold}"/><ellipse cx="1440" cy="226" rx="62" ry="80" fill="${C.teakDark}"/>
        ${portrait}
        <rect x="1390" y="324" width="100" height="26" rx="3" fill="${C.gold}"/>
        <text x="1440" y="343" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="15" fill="${C.bottleInk}">Proprietor</text></g>

      <!-- the barista (behind the counter) -->
      ${barista(initials)}

      <!-- counter -->
      <rect x="0" y="560" width="1600" height="30" fill="url(#marble)"/>
      <path d="M0,572 C200,566 260,580 420,574 S760,566 900,576 S1300,570 1600,574" stroke="#CFC8BA" stroke-width="1.5" fill="none" opacity=".8"/>
      <rect x="0" y="590" width="1600" height="150" fill="${C.teak}"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 200 + 18}" y="608" width="164" height="114" rx="6" fill="none" stroke="${C.teakDark}" stroke-width="5"/>`).join("")}
      <rect x="0" y="590" width="1600" height="6" fill="#000" opacity=".25"/>
      <rect x="0" y="740" width="1600" height="60" fill="url(#checker)"/>
      <rect x="0" y="752" width="1600" height="7" rx="3" fill="${C.gold}"/>

      <!-- pastry case -->
      <g id="pastry-case" class="hot" data-act="shelf:pastry-case">
        <rect x="180" y="548" width="340" height="16" fill="${C.teak}"/>
        <path d="M184,548 L184,420 Q184,410 196,410 L504,410 Q516,410 516,420 L516,548" fill="#E9F3EE" fill-opacity=".32" stroke="#ffffff" stroke-opacity=".9" stroke-width="3"/>
        <rect x="188" y="476" width="324" height="5" fill="#ffffff" fill-opacity=".7"/>
        ${[["croissant", 236, 476], ["roll", 330, 476], ["muffin", 424, 476], ["cookies", 236, 548], ["biscotti", 330, 548], ["croissant", 424, 548]]
          .map(([a, x, y]) => `<g style="transform: translate(${x - 60 * .62}px, ${y - 110 * .62}px) scale(.62)">${item(a)}</g>`).join("")}
        <path d="M200,420 L230,540" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>
      </g>

      <!-- espresso machine -->
      <g id="machine" class="hot" data-act="shelf:signature-brews">
        <rect x="1150" y="392" width="250" height="160" rx="14" fill="url(#chrome)"/>
        <rect x="1150" y="392" width="250" height="34" rx="12" fill="${C.bottle}"/>
        <text x="1275" y="416" text-anchor="middle" font-family="Rozha One, serif" font-size="20" fill="${C.gold}">MINJ</text>
        <circle cx="1352" cy="452" r="18" fill="#F6F1E4" stroke="${C.gold}" stroke-width="4"/><path d="M1352,452 L1362,442" stroke="${C.chili}" stroke-width="3"/>
        <rect x="1190" y="460" width="80" height="18" rx="6" fill="#59636A"/>
        <rect x="1214" y="478" width="32" height="12" fill="#3E464C"/>
        <rect x="1180" y="482" width="20" height="8" rx="3" fill="#2A2A26"/>
        <path id="pour" d="M1228,490 L1228,520 M1232,490 L1232,520" stroke="${C.coffee}" stroke-width="3" opacity="0"/>
        <path d="M1380,470 q20,10 10,60" stroke="#8E979C" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="1160" y="544" width="230" height="10" rx="3" fill="#59636A"/>
        <g id="steam" opacity="0">
          <path class="puff" d="M1222,470 q-12,-20 0,-40 q12,-20 0,-40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>
          <path class="puff p2" d="M1244,470 q12,-20 0,-40 q-12,-20 0,-40" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>
        </g>
      </g>

      <!-- register -->
      <g class="hot" id="register" data-act="bill">
        <path d="M1440,560 L1450,486 L1560,486 L1570,560 Z" fill="${C.gold}"/>
        <rect x="1462" y="460" width="86" height="32" rx="4" fill="${C.teakDark}"/>
        <text x="1505" y="483" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="18" fill="#9BE38F">0.00</text>
        ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${1466 + c * 21}" y="${504 + r * 16}" width="16" height="10" rx="2" fill="${C.ivory}"/>`).join("")).join("")}
        <rect class="receipt-tongue" x="1484" y="440" width="42" height="24" fill="#fff"/>
      </g>

      <!-- pick-up counter sign -->
      <g transform="translate(968,0)">
        <rect x="-4" y="526" width="8" height="36" fill="${C.gold}"/><rect x="-26" y="556" width="52" height="6" rx="2" fill="${C.gold}"/>
        <rect x="-66" y="494" width="132" height="36" rx="5" fill="${C.bottle}" stroke="${C.gold}" stroke-width="3"/>
        <text x="0" y="518" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="700" font-size="17" fill="${C.goldSoft}">Pick up here</text>
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
        <text x="800" y="282" text-anchor="middle" font-family="Mukta, sans-serif" font-size="20" letter-spacing="3" fill="${C.ivory}" opacity=".85">Sales, marketing and strong coffee. Since 2026, Pune.</text>
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
            <text x="0" y="2" text-anchor="middle" font-family="Mukta, sans-serif" font-size="12" fill="${C.bottleInk}">for opportunities</text>
          </g>
        </g>
      </g>
      <!-- lamps -->
      ${[640, 960].map(x => `<circle cx="${x}" cy="430" r="70" fill="url(#lampHalo)" class="halo"/><rect x="${x - 3}" y="404" width="6" height="16" fill="#2A2A26"/><path d="M${x - 14},420 L${x + 14},420 L${x + 10},452 L${x - 10},452 Z" fill="#FFE3A3" stroke="#2A2A26" stroke-width="3"/>`).join("")}
      <!-- steps and pavement -->
      <rect x="650" y="780" width="300" height="20" fill="#B9AFA0"/><rect x="630" y="798" width="340" height="16" fill="#A79D8E"/>
      <rect x="0" y="790" width="1600" height="110" fill="#6C665D"/>
      <rect x="0" y="790" width="1600" height="8" fill="#837C71"/>
      ${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 110},800 L${i * 110 - 30},900" stroke="#5E5850" stroke-width="2"/>`).join("")}
      <!-- plants -->
      ${[610, 990].map(x => `<g transform="translate(${x},790)"><path d="M-26,0 L26,0 L20,-46 L-20,-46 Z" fill="${C.chili}"/><rect x="-24" y="-52" width="48" height="8" fill="#8E3020"/>
        ${[-30, -12, 6, 22].map((a, i) => `<path d="M0,-52 q${a},-${50 + i * 8} ${a * 1.6},-${70 + i * 6}" stroke="#3E6B45" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("")}</g>`).join("")}
      <!-- A-frame chalk board -->
      <g transform="translate(1250,700)">
        <path d="M-80,160 L-60,0 L60,0 L80,160" stroke="${C.teak}" stroke-width="10" fill="none"/>
        <rect x="-62" y="6" width="124" height="120" fill="#24302C" stroke="${C.teak}" stroke-width="6"/>
        <text x="0" y="36" text-anchor="middle" font-family="Kalam, cursive" font-size="17" fill="${C.ivory}">Today</text>
        <text x="0" y="66" text-anchor="middle" font-family="Kalam, cursive" font-size="24" fill="${C.goldSoft}">15 chapters</text>
        <text x="0" y="92" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="${C.ivory}">all on the house</text>
        <path d="M-40,106 q40,10 80,0" stroke="${C.ivory}" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <!-- street lamp -->
      <g transform="translate(60,0)"><rect x="-5" y="300" width="10" height="500" fill="#20252B"/>
        <circle cx="0" cy="300" r="90" fill="url(#lampHalo)" class="halo"/><path d="M-18,290 L18,290 L12,320 L-12,320 Z" fill="#FFE3A3" stroke="#20252B" stroke-width="4"/></g>
    </svg>`;
  }

  return { item, itemSVG, cupName, interior, street, colors: C };
})();
