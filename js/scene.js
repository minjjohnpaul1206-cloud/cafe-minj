/* =========================================================
   SCENE — draws the café interior and moves the barista.
   Public: Cafe.scene.serve(item) → the item's SVG element, Cafe.scene.wave()
   ========================================================= */
(() => {
  const { A, D, P, $, reduce, PACE, wait, usesCup } = Cafe;
  const NS = "http://www.w3.org/2000/svg";

  $("#scene-host").innerHTML = A.interior(P, D.shelves, D.rules, D.writing || []);
  const svg = $("#scene"), barista = $("#barista"), inner = $("#barista-inner");
  const armL = $("#armL"), armR = $("#armR"), layer = $("#items-layer");
  armL.style.transform = armR.style.transform = "rotate(0deg)";

  let bx = 800, by = 0, counterItem = null, hiddenEl = null; // hiddenEl: a jar or book taken off the wall

  /* ---------- setup: phone crop + live wall clock ---------- */
  const fit = () => svg.setAttribute("viewBox", innerWidth < 700 ? "170 0 1260 800" : "0 0 1600 800");
  fit(); addEventListener("resize", fit);

  function tick() {
    const d = new Date(), h = d.getHours() % 12, m = d.getMinutes();
    $("#clock-h").setAttribute("transform", `rotate(${h * 30 + m * 0.5})`);
    $("#clock-m").setAttribute("transform", `rotate(${m * 6})`);
  }
  tick(); setInterval(tick, 20000);

  /* ---------- motion helpers ---------- */
  function tw(el, to, dur = 400, easing = "cubic-bezier(.45,.05,.3,1)") {
    const from = el.style.transform || to;
    el.style.transform = to;
    if (reduce || !dur || from === to) return Promise.resolve();
    return el.animate([{ transform: from }, { transform: to }], { duration: dur * PACE, easing }).finished.catch(() => {});
  }
  function fade(el, to, dur = 400) {
    const from = el.style.opacity || "1";
    el.style.opacity = to;
    if (reduce || !dur) return Promise.resolve();
    return el.animate([{ opacity: from }, { opacity: String(to) }], { duration: dur * PACE }).finished.catch(() => {});
  }
  const itemAt = (x, y, s) => `translate(${x - 60 * s}px, ${y - 110 * s}px) scale(${s})`; // art base is (60,110)
  const at = (x, y) => `translate(${x}px, ${y}px)`;
  const rot = (arm, deg, dur = 380) => tw(arm, `rotate(${deg}deg)`, dur);

  function makeItem(it, x, y, s, opacity = 1) {
    const g = document.createElementNS(NS, "g");
    g.innerHTML = A.item(usesCup(it) ? "togo" : it.art, it);
    g.style.transform = itemAt(x, y, s);
    g.style.opacity = opacity;
    layer.appendChild(g);
    return g;
  }

  /* switch between the picture poses (idle, walk, reach, serve); mirror = face the other way */
  const hasPose = name => !!svg.querySelector(`.pose[data-pose="${name}"]`);
  function pose(name, mirror = false) {
    barista.dataset.pose = hasPose(name) ? name : "idle";
    barista.dataset.mirror = mirror ? "1" : "";
  }

  async function walk(x, carry) {
    const dx = x - bx;
    if (Math.abs(dx) < 4) return;
    const dur = Math.min(1250, Math.max(380, Math.abs(dx) * 1.7));
    barista.dataset.face = dx > 0 ? "right" : "left";
    pose("walk", dx < 0);                       // the walking picture faces right; mirror it for left
    barista.dataset.lean = dx > 0 ? "r" : "l";  // lean into the step
    inner.classList.add("walking");
    await Promise.all([
      tw(barista, at(x, by), dur, "ease-in-out"),
      carry && tw(carry.el, itemAt(x + carry.dx, 548, CARRY), dur, "ease-in-out"),
    ]);
    bx = x;
    inner.classList.remove("walking");
    barista.dataset.lean = "";
    barista.dataset.face = "";
  }

  function sparkle(x, y) {
    if (reduce) return;
    const g = document.createElementNS(NS, "g");
    g.innerHTML = [[-70, -60], [70, -70], [-90, 10], [86, 4], [0, -110]].map(([dx, dy]) =>
      `<path class="spark" d="M${x + dx},${y + dy - 12} l4,8 8,4 -8,4 -4,8 -4,-8 -8,-4 8,-4z" fill="#E8C48A"/>`).join("");
    layer.appendChild(g);
    setTimeout(() => g.remove(), 1000);
  }

  /* ---------- the four stations: where each kind of item is made ---------- */
  const CARRY = 0.75, HAND = 181; // carry scale; hand distance from his centre
  const stations = {
    async machine(it) {
      await walk(1040);
      pose("espresso");                         // locks the portafilter into the machine
      await rot(armR, -70);
      $("#steam").classList.add("on"); $("#pour").classList.add("on");
      sfx("Ssshh!", 1300, 360);
      const el = makeItem(it, 1230, 546, 0.55, 0);
      await fade(el, 1, 1100);
      await wait(250);
      $("#pour").classList.remove("on");
      setTimeout(() => $("#steam").classList.remove("on"), 700);
      await Promise.all([rot(armR, -35, 450), tw(el, itemAt(1040 + HAND, 548, CARRY), 450)]);
      await walk(800, { el, dx: HAND });
      return [el, armR];
    },
    async case(it) {
      await walk(620);
      await rot(armL, 55);
      const el = makeItem(it, 400, 476, 0.62, 0);
      await fade(el, 1, 300);
      await tw(el, itemAt(400, 444, 0.62), 300);
      await Promise.all([rot(armL, 35, 450), tw(el, itemAt(620 - HAND, 548, CARRY), 450)]);
      await walk(800, { el, dx: -HAND });
      return [el, armL];
    },
    async shelf(it) {
      const i = it.jarIndex || 0, jx = 420 + i * 74, x = jx - 180;
      await walk(x);
      pose("reach");
      await rot(armR, -165, 480);
      sfx("Clink!", jx - 10, 190);
      hiddenEl = $(`.shelf-jar[data-jar="${i}"]`);
      hiddenEl.style.opacity = 0;
      const el = makeItem(it, jx, 300, 0.75);
      await Promise.all([rot(armR, -35, 650), tw(el, itemAt(x + HAND, 548, CARRY), 650)]);
      await walk(800, { el, dx: HAND });
      return [el, armR];
    },
    async books(it) {
      const i = it.bookIndex, sx = 145 + i * 32, x = sx + 180;
      await walk(x);
      pose("reach", true);                      // reach up with the arm on the shelf side
      await wait(450);
      sfx("Fwip!", sx - 10, 300);
      hiddenEl = $(`.shelf-book[data-book="${i}"]`);
      hiddenEl.style.opacity = 0;
      const el = makeItem(it, sx, 390, 0.45);
      await tw(el, itemAt(x + HAND, 548, CARRY), 650);
      await walk(800, { el, dx: HAND });
      return [el, armR];
    },
    async under(it) {
      await walk(800);
      pose("idle");
      await tw(barista, at(800, by = 300), 450); // crouch
      const el = makeItem(it, 800 + HAND, 690, CARRY, 0);
      armR.style.transform = "rotate(-35deg)";
      await wait(450);
      await Promise.all([tw(barista, at(800, by = 0), 520), tw(el, itemAt(800 + HAND, 548, CARRY), 520), fade(el, 1, 520)]);
      return [el, armR];
    },
  };

  /* send the last order off to the tray, put any borrowed jar back */
  async function clearCounter() {
    const el = counterItem;
    counterItem = null;
    if (el) { await Promise.all([tw(el, itemAt(1560, 40, 0.15), 600), fade(el, 0, 600)]); el.remove(); }
    if (hiddenEl) { fade(hiddenEl, 1, 400); hiddenEl = null; }
  }

  /* make an item at its station and present it at the pick-up counter */
  /* which hand-over pose fits each order (null = just set it down) */
  const HANDED = ["espresso", "macchiato", "ristretto", "doubleshot"];
  function handover(it) {
    if (it.station === "books") return "book";
    if (it.art === "cloche") return "cloche";
    if (it.station === "case") return "plate";
    if (usesCup(it)) return "togo";
    if (HANDED.includes(it.art)) return "serve";
    return null;
  }
  const PLATE_TOP = [803, 522];                 // where the plate sits in the plate pose

  async function serve(it) {
    await clearCounter();
    const [el, hand] = await stations[it.station](it);
    const give = handover(it);
    if (give && hasPose(give)) {
      if (give === "plate") {
        pose("plate");                          // the pastry rides on the plate in his hands
        await tw(el, itemAt(...PLATE_TOP, 0.8), 200);
        await wait(1200);
        pose("idle");
        await tw(el, itemAt(800, 604, 1.5), 380, "cubic-bezier(.3,1.5,.5,1)");
      } else {
        fade(el, 0, 150);
        if (give === "togo" && hasPose("write")) { pose("write"); await wait(1300); } // name on the cup first
        pose(give);                             // offers it to the visitor
        if (give === "cloche") sfx("Ta-da!", 980, 240);
        await wait(1300);
        pose("idle");
        el.style.transform = itemAt(800, 604, 1.5);
        await fade(el, 1, 250);                 // and sets it down on the counter
      }
    } else {
      pose("idle");
      await Promise.all([tw(el, itemAt(800, 568, 1), 480), rot(hand, hand === armR ? -12 : 12, 480)]);
      await Promise.all([rot(hand, 0, 380), tw(el, itemAt(800, 604, 1.5), 420, "cubic-bezier(.3,1.5,.5,1)")]);
    }
    sparkle(800, 500);
    barista.classList.add("wink");
    setTimeout(() => barista.classList.remove("wink"), 1300); // peek over the shades, wink
    return (counterItem = el);
  }

  async function wave() {
    await rot(armR, -150, 420);
    for (let i = 0; i < 2; i++) { await rot(armR, -128, 180); await rot(armR, -158, 180); }
    await rot(armR, 0, 420);
  }

  /* ---------- comic speech bubble + sound effects, drawn over the scene ---------- */
  const host = $("#scene-host");
  const bubbleEl = document.createElement("div");
  bubbleEl.className = "bubble";
  bubbleEl.setAttribute("aria-hidden", "true"); // the full text is read out in the panel below
  host.appendChild(bubbleEl);
  let bubbleOn = false, hideT = 0;

  function toHost(el, x, y) { // a point in an element's own coordinates → pixels inside the scene box
    const m = el.getScreenCTM(); if (!m) return [0, 0];
    const p = new DOMPoint(x, y).matrixTransform(m), r = host.getBoundingClientRect();
    return [p.x - r.left, p.y - r.top];
  }
  function placeBubble() {
    if (!bubbleOn) return;
    const [x, y] = toHost(barista, 0, 196);     // just above his hair
    const w = bubbleEl.offsetWidth, hw = host.clientWidth;
    const left = Math.max(8, Math.min(hw - w - 8, x - w * 0.3));
    bubbleEl.style.left = left + "px";
    bubbleEl.style.top = Math.max(6, y - bubbleEl.offsetHeight - 18) + "px";
    bubbleEl.style.setProperty("--tail", Math.max(18, Math.min(w - 18, x - left)) + "px");
    requestAnimationFrame(placeBubble);         // follow him while he walks
  }
  function shorten(t) { // the bubble gets the first sentence; the panel below keeps every word
    const max = host.clientWidth < 600 ? 60 : 92;
    const first = (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();
    let s = first.length >= 12 ? first : t;
    if (s.length > max) s = s.slice(0, s.lastIndexOf(" ", max)) + "…";
    return s;
  }
  function bubble(text) {
    bubbleEl.textContent = shorten(text);
    bubbleEl.classList.remove("show"); void bubbleEl.offsetWidth; bubbleEl.classList.add("show");
    if (!bubbleOn) { bubbleOn = true; placeBubble(); }
    clearTimeout(hideT);
    hideT = setTimeout(() => { bubbleOn = false; bubbleEl.classList.remove("show"); }, 2600 + bubbleEl.textContent.length * 45);
  }
  function sfx(word, x, y) { // a comic sound word that pops and fades
    if (reduce) return;
    const [hx, hy] = toHost(svg, x, y);
    const s = document.createElement("span");
    s.className = "sfx"; s.textContent = word; s.setAttribute("aria-hidden", "true");
    s.style.left = hx + "px"; s.style.top = hy + "px";
    host.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }

  Cafe.scene = { serve, wave, tw, clear: clearCounter, bubble, sfx };
})();
