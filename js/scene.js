/* =========================================================
   SCENE — draws the café interior and moves the barista.
   Public: Cafe.scene.serve(item) → the item's SVG element, Cafe.scene.wave()
   ========================================================= */
(() => {
  const { A, D, P, $, reduce, speed, wait, usesCup, state } = Cafe;
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
    return el.animate([{ transform: from }, { transform: to }], { duration: dur * speed.k, easing }).finished.catch(() => {});
  }
  function fade(el, to, dur = 400) {
    const from = el.style.opacity || "1";
    el.style.opacity = to;
    if (reduce || !dur) return Promise.resolve();
    return el.animate([{ opacity: from }, { opacity: String(to) }], { duration: dur * speed.k }).finished.catch(() => {});
  }
  const itemAt = (x, y, s) => `translate(${x - 60 * s}px, ${y - 110 * s}px) scale(${s})`; // art base is (60,110)
  const at = (x, y) => `translate(${x}px, ${y}px)`;
  const rot = (arm, deg, dur = 380) => tw(arm, `rotate(${deg}deg)`, dur);

  const dish = (el, show) => el.querySelectorAll(".dish").forEach(d => (d.style.display = show ? "" : "none"));
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
  const popEl = $("#b-pop");                    // only exists for the picture barista
  const act = (frames, duration = 300, easing = "ease-out") =>
    popEl && !reduce ? popEl.animate(frames.map(f => ({ transform: f })), { duration, easing }) : null;
  function pose(name, mirror = false, pop = true) {
    const next = hasPose(name) ? name : "idle";
    const changed = barista.dataset.pose !== next;
    barista.dataset.pose = next;
    barista.dataset.mirror = mirror ? "1" : "";
    svg.querySelectorAll(".pose").forEach(p => p.classList.toggle("on", p.dataset.pose === next));
    if (changed && pop) act(["scale(1.06,.94)", "scale(.98,1.03)", "scale(1,1)"], 280); // a little squash and stretch
  }
  const frame = name => pose(name, false, false); // one frame of an animation: no squash, no mirror
  const now = () => barista.dataset.pose;

  /* a pose he strikes for a moment (laugh, think, thumbs up…), then back to standing */
  let held = null;                              // a reaction he holds even while talking
  function react(name, ms = 2200, hold = true) {
    if (reduce || !hasPose(name) || !talkSet.includes(now())) return; // not while his hands are busy
    clearInterval(talkTimer); talkTimer = null;
    pose(name);
    held = hold ? name : null;
    setTimeout(() => { if (held === name) held = null; if (now() === name) pose("idle"); }, ms);
  }

  /* small things he does on his own while waiting, so he never stands frozen */
  const GESTURES = [
    [["rotate(0deg)", "rotate(-3deg)", "rotate(2.5deg)", "rotate(-2deg)", "rotate(0deg)"], 1000],             // friendly sway
    [["translateY(0)", "translateY(-14px)", "translateY(0)", "translateY(-6px)", "translateY(0)"], 700],      // little hop
    [["scale(1)", "scale(1.04) rotate(1.5deg)", "scale(1.04) rotate(1.5deg)", "scale(1)"], 1100],             // leans in
  ];
  const gesture = (i = Math.floor(Math.random() * GESTURES.length)) => act(GESTURES[i][0], GESTURES[i][1], "ease-in-out");
  (function idleLoop() {
    setTimeout(() => {
      if (!document.hidden && !state.busy && state.view === "inside" && now() === "idle" && !talkTimer) {
        if (Math.random() < 0.5) gesture();
        else react(MOODS[Math.floor(Math.random() * MOODS.length)], 2600, false); // waits like a person would
      }
      idleLoop();
    }, 4500 + Math.random() * 4000);
  })();
  const MOODS = ["crossed", "think", "phone"];

  /* talking: his mouth and hands move while the words type out.
     Standing → open hands (mouth shut / mouth open). Waving → he keeps waving as he says hello. */
  const TALK = ["shrug", "tada"], HELLO = ["wave1", "wave2", "wave3", "wave2", "wave3", "wave2", "wave1", "wave2", "wave3", "wave2"];
  const talkSet = ["idle", ...MOODS, ...TALK, "wave1", "wave2", "wave3", "laugh", "point", "thumbs", "bill"];
  let talkTimer = null;
  function talk(on) {
    barista.classList.toggle("talking", !!on);
    clearInterval(talkTimer); talkTimer = null;
    if (!talkSet.includes(now()) || held === now()) return; // hands busy, or holding a reaction: just the little bob
    if (!on || reduce || !hasPose("shrug")) { if (now() !== "idle") pose("idle", false, false); return; }
    const hello = now() === "wave1" ? [...HELLO] : [];
    let i = 0;
    talkTimer = setInterval(() => {
      if (!talkSet.includes(now()) || held === now()) { clearInterval(talkTimer); talkTimer = null; return; } // he walked off mid-sentence
      frame(hello.length ? hello.shift() : TALK[i++ % 2]);
    }, 170);
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
    /* The way a barista really pulls a shot: lock the portafilter into the left group,
       stand a cup under the spouts, press the button, wait for the pour, take the cup. */
    async machine(it) {
      const pf = $("#pf1"), btn = $("#brew-btn"), needle = $("#needle");
      const MX = 1085;                          // close enough that his hands work behind the machine
      if (pf) pf.style.opacity = 0;             // the portafilter is in his hand, not on the machine
      await walk(MX);
      pose("espresso");                         // reaches in with the portafilter…
      await wait(380);
      if (pf) {                                 // …and twists it into the group head
        pf.style.opacity = 1;
        if (!reduce) pf.animate([{ transform: "rotate(-32deg)" }, { transform: "rotate(0deg)" }], { duration: 260 * speed.k, easing: "ease-out" });
      }
      sfx("Clack!", 1215, 500);
      if (hasPose("brew")) pose("brew");        // hands free: his arm goes to the buttons
      await wait(420);
      const s = usesCup(it) ? 0.45 : 0.55;      // a paper cup is taller: keep it clear of the spouts
      const el = makeItem(it, 1230, 546, s, 0); // stands the cup on the drip tray, under the spouts
      await fade(el, 1, 260);
      await wait(360);
      btn?.classList.add("on"); needle?.classList.add("on");
      sfx("Click!", 1246, 428);
      await wait(250);
      $("#pour").classList.add("on"); $("#steam").classList.add("on"); // the shot pours into the cup
      sfx("Ssshh!", 1300, 360);
      await wait(1300);
      $("#pour").classList.remove("on");
      btn?.classList.remove("on"); needle?.classList.remove("on");
      setTimeout(() => $("#steam").classList.remove("on"), 700);
      await wait(250);
      pose("idle");                             // takes the cup off the tray
      await tw(el, itemAt(MX - HAND, 548, CARRY), 480);
      await walk(800, { el, dx: -HAND });
      return [el, armL];
    },
    async case(it) {
      await walk(545);                          // close in: the tongs come up right where the pastry is
      pose("tongs1");                           // leans into the case with the tongs
      await rot(armL, 55);
      const el = makeItem(it, 400, 476, 0.62, 0);
      dish(el, false);                          // he already holds a plate: the pastry comes without its own
      await fade(el, 1, 300);
      frame("tongs2");                          // lifts it out
      sfx("Snip!", 430, 420);
      await tw(el, itemAt(400, 444, 0.62), 300);
      frame("tongs3");
      dish(el, true);                           // plated, ready to carry
      await Promise.all([rot(armL, 35, 450), tw(el, itemAt(545 + HAND, 548, CARRY), 450)]);
      await walk(800, { el, dx: HAND });
      return [el, armR];
    },
    async shelf(it) {
      const i = it.jarIndex || 0, jx = 420 + i * 74, grab = hasPose("wave1"), x = jx - (grab ? 122 : 180);
      await walk(x);
      if (grab) {                               // up on his toes, open hand right on the jar
        pose("wave1"); held = "wave1";
        await tw(barista, at(x, by = -50), 280);
      } else { pose("reach"); await rot(armR, -165, 480); }
      sfx("Clink!", jx - 10, 190);
      hiddenEl = $(`.shelf-jar[data-jar="${i}"]`);
      hiddenEl.style.opacity = 0;
      const el = makeItem(it, jx, 300, 0.75);
      await Promise.all([tw(barista, at(x, by = 0), 420), tw(el, itemAt(x + HAND, 548, CARRY), 650)]);
      held = null;
      await walk(800, { el, dx: HAND });
      return [el, armR];
    },
    async books(it) {
      const i = it.bookIndex, sx = 145 + i * 32, x = sx + (hasPose("wave1") ? 125 : 180);
      await walk(x);
      if (hasPose("wave1")) { pose("wave1", true); held = "wave1"; } // open hand at shelf height, on the shelf side
      else pose("reach", true);
      await wait(450);
      sfx("Fwip!", sx - 10, 300);
      hiddenEl = $(`.shelf-book[data-book="${i}"]`);
      hiddenEl.style.opacity = 0;
      const el = makeItem(it, sx, 390, 0.45);
      await tw(el, itemAt(x + HAND, 548, CARRY), 650);
      held = null;
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
    if (it.station === "shelf") return "jar";
    if (usesCup(it)) return "togo";
    if (HANDED.includes(it.art)) return "serve";
    return null;
  }
  const PLATE_TOP = [803, 522];                 // where the plate sits in the plate pose

  /* He takes the marker from his pocket and writes the name on the cup. A comic
     close-up shows the letters landing one by one, in step with his pen. */
  async function writeName() {
    if (!hasPose("write2")) { pose("write"); return wait(1300); }
    const text = state.cupText || "";
    pose("write1");
    await wait(520);
    let close = null;
    if (text && !reduce) {
      close = document.createElementNS(NS, "g");
      close.id = "closeup";
      const cx = bx - 262, cy = 318;
      close.innerHTML = `<circle cx="${cx}" cy="${cy}" r="96" fill="#FBF3DF" stroke="#2A1A12" stroke-width="6"/>
        <path d="M${cx + 84},${cy + 46} l44,26 -30,-48z" fill="#FBF3DF" stroke="#2A1A12" stroke-width="6" stroke-linejoin="round"/>
        <circle cx="${cx}" cy="${cy}" r="90" fill="#FBF3DF"/>
        <g transform="translate(${cx - 108},${cy - 112}) scale(1.8)">${A.item("togo", {})}</g>`;
      layer.appendChild(close);
    }
    const slot = close && close.querySelector(".cup-name-slot");
    const pen = ["write2", "write3", "write4", "write3"];
    const letters = [...text], n = Math.max(letters.length, 5);
    for (let i = 0; i < n; i++) {
      frame(pen[i % pen.length]);
      if (slot && i < letters.length)
        slot.innerHTML = `<text x="60" y="54" text-anchor="middle" font-family="Kalam, cursive" font-size="15" fill="#2A2522"${letters.length > 7 ? ' textLength="46" lengthAdjust="spacingAndGlyphs"' : ""}>${letters.slice(0, i + 1).join("").replace(/[&<>]/g, "")}</text>`;
      await wait(150);
    }
    frame("write5");                            // done: caps the marker, pleased with himself
    await wait(650);
    if (close) { await fade(close, 0, 200); close.remove(); }
  }

  async function serve(it) {
    await clearCounter();
    const [el, hand] = await stations[it.station](it);
    const give = handover(it);
    if (give && hasPose(give)) {
      if (give === "plate") {
        pose("plate");                          // the pastry rides on the plate in his hands
        dish(el, false);                        // one plate only: his
        await tw(el, itemAt(...PLATE_TOP, 0.8), 200);
        await wait(1200);
        pose("idle");
        dish(el, true);
        await tw(el, itemAt(800, 604, 1.5), 380, "cubic-bezier(.3,1.5,.5,1)");
      } else {
        fade(el, 0, 150);
        if (give === "togo") await writeName();   // name on the cup first, letter by letter
        pose(give);                             // offers it to the visitor
        if (give === "cloche") sfx("Ta-da!", 980, 240);
        let tag = null;
        if (give === "jar") {                   // the jar in his hands wears this jar's own label
          tag = document.createElementNS(NS, "g");
          tag.innerHTML = `<rect x="${bx - 9}" y="478" width="34" height="24" rx="3" fill="${it.jarColor || "#B5452E"}" stroke="#2A1A12" stroke-width="2.2"/>
            <path d="M${bx - 3},486 h22 M${bx + 1},493 h14" stroke="#FBF7EE" stroke-opacity=".85" stroke-width="2" stroke-linecap="round"/>`;
          barista.after(tag);                   // just in front of him, still behind the counter
        }
        await wait(1300);
        tag?.remove();
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
    gesture(1);                                 // a happy little hop as he serves
    barista.classList.add("wink");
    setTimeout(() => barista.classList.remove("wink"), 1300); // peek over the shades, wink
    return (counterItem = el);
  }

  async function wave() {
    if (hasPose("wave1")) {                     // picture barista: raises his hand; talk() keeps it waving as he says hello
      if (reduce) return;
      pose("wave1");
      setTimeout(() => { if (now() === "wave1" && !talkTimer) pose("idle"); }, 2500);
      return;
    }
    await rot(armR, -150, 420);
    for (let i = 0; i < 2; i++) { await rot(armR, -128, 180); await rot(armR, -158, 180); }
    await rot(armR, 0, 420);
  }

  /* ---------- comic speech bubble + sound effects ---------- */
  const host = $("#scene-host"), stage = $(".stage"), bubbleEl = $("#bubble");

  function toBox(box, el, x, y) { // a point in an SVG element's coordinates → pixels inside a box
    const m = el.getScreenCTM(); if (!m) return [0, 0];
    const p = new DOMPoint(x, y).matrixTransform(m), r = box.getBoundingClientRect();
    return [p.x - r.left, p.y - r.top];
  }
  const toHost = (el, x, y) => toBox(host, el, x, y);

  /* wide screens: the bubble floats beside his head and follows him.
     phones: it sits right under the scene, tail pointing up at him. */
  function placeBubble() {
    if (bubbleEl.classList.contains("show")) {
      const wide = host.clientWidth >= 700;
      bubbleEl.classList.toggle("float", wide);
      if (wide) {
        const sw = stage.clientWidth, w = bubbleEl.offsetWidth, h = bubbleEl.offsetHeight;
        const [cx] = toBox(stage, barista, 0, 260);
        const right = cx < sw * 0.58;                      // open on the side with more room
        const [ex, ey] = toBox(stage, barista, right ? 200 : -200, 262); // clear of his hands when he waves or gestures
        const left = right ? ex + 18 : ex - 18 - w;
        const top = Math.max(10, ey - Math.min(70, h * 0.35));
        bubbleEl.style.left = Math.max(8, Math.min(sw - w - 8, left)) + "px";
        bubbleEl.style.top = top + "px";
        bubbleEl.dataset.side = right ? "left" : "right";  // which side the tail is on
        bubbleEl.style.setProperty("--ty", Math.max(18, Math.min(h - 22, ey - top)) + "px");
      } else {
        bubbleEl.style.left = bubbleEl.style.top = "";
        bubbleEl.dataset.side = "top";
        const [cx] = toBox(bubbleEl, barista, 0, 0);
        bubbleEl.style.setProperty("--tx", Math.max(22, Math.min(bubbleEl.offsetWidth - 22, cx)) + "px");
      }
    }
    requestAnimationFrame(placeBubble);
  }
  requestAnimationFrame(placeBubble);

  function bubble() { // pop it in (or re-pop for a new line)
    bubbleEl.classList.remove("pop"); void bubbleEl.offsetWidth;
    bubbleEl.classList.add("show", "pop");
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

  Cafe.scene = { serve, wave, tw, clear: clearCounter, bubble, sfx, talk, react };
})();
