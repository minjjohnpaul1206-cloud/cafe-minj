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

  function barista(initials = "JPM", img = null) {
    /* the illustration version: one picture that walks, bobs and crouches */
    if (img) return `<g id="barista" style="transform: translate(800px, 0px)"><g id="barista-inner">
      <image href="${img}" x="-179" y="205" width="350" height="411"/>
      <g id="armL" class="arm"></g><g id="armR" class="arm"></g>
    </g></g>`;
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
  function interior(person, shelves, rules) {
    const initials = person.name.split(" ").map(w => w[0]).join("").slice(0, 3);
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
      ${barista(initials, person.baristaImage)}

      <!-- counter -->
      <rect x="0" y="560" width="1600" height="30" fill="url(#marble)"/>
      <path d="M0,572 C200,566 260,580 420,574 S760,566 900,576 S1300,570 1600,574" stroke="#CFC8BA" stroke-width="1.5" fill="none" opacity=".8"/>
      <rect x="0" y="590" width="1600" height="150" fill="${C.teak}"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 200 + 18}" y="608" width="164" height="114" rx="6" fill="none" stroke="${C.teakDark}" stroke-width="5"/>`).join("")}
      <rect x="0" y="590" width="1600" height="6" fill="#000" opacity=".25"/>
      <rect x="0" y="740" width="1600" height="60" fill="url(#checker)"/>
      <rect x="0" y="752" width="1600" height="7" rx="3" fill="${C.gold}"/>

      <!-- island things on the counter: a conch and a coconut -->
      <g transform="translate(80,560)">
        <path d="M-34,0 Q-44,-22 -20,-34 Q6,-44 28,-30 Q40,-20 34,-6 Q30,2 18,0 Z" fill="#F2D6C4"/>
        <path d="M-20,-34 l-6,-12 M-4,-40 l0,-13 M12,-38 l6,-11" stroke="#E6BFA8" stroke-width="5" stroke-linecap="round"/>
        <path d="M-2,-4 Q14,-22 30,-12 Q24,-2 14,0 Z" fill="#E59A8A"/>
        <path d="M-30,-6 Q-16,-20 -2,-14" stroke="#D9B39C" stroke-width="2" fill="none"/>
      </g>
      <g transform="translate(140,560)">
        <ellipse cx="0" cy="-18" rx="22" ry="20" fill="#6B4A2E"/><ellipse cx="0" cy="-34" rx="17" ry="5" fill="#F3EEE3"/>
        <path d="M-7,-36 L6,-66" stroke="${C.chili}" stroke-width="4" stroke-linecap="round"/><path d="M6,-66 l9,-4" stroke="${C.chili}" stroke-width="4" stroke-linecap="round"/>
        <path d="M-12,-24 q4,8 0,16" stroke="#4E3420" stroke-width="2" fill="none"/>
      </g>

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
            <text x="0" y="2" text-anchor="middle" font-family="Mukta, sans-serif" font-size="12" fill="${C.bottleInk}">for opportunities</text>
          </g>
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
        <text x="0" y="66" text-anchor="middle" font-family="Kalam, cursive" font-size="24" fill="${C.goldSoft}">15 chapters</text>
        <text x="0" y="92" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="${C.ivory}">all on the house</text>
        <path d="M-40,106 q40,10 80,0" stroke="${C.ivory}" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <!-- coconut palms framing the café -->
      ${palm(40, 1, 300)}${palm(1560, -1, 320)}
    </svg>`;
  }

  return { item, itemSVG, cupName, interior, street, colors: C };
})();
