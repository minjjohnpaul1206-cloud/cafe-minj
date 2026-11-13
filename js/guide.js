/* =========================================================
   GUIDE — a short tour for first-time visitors. A spotlight
   moves over each part of the café and a card says what it
   does. Runs once on the first visit; the "Guide" button in
   the top bar replays it.
   ========================================================= */
(() => {
  const { $, store, state, reduce } = Cafe;

  /* each stop: what to light up, and what to say about it */
  const stops = [
    { at: "#choices", title: "Start here",
      text: "Each button is a chapter of my work: jobs, education, skills, projects. Pick one and I'll make it at the counter." },
    { at: "#scene-host", title: "Or click around the café",
      text: "The jars, the books, the pastry case and the coffee machine all work. Click one and I'll fetch it." },
    { at: ".loyalty", title: "Your loyalty card",
      text: "Every chapter you open adds a stamp. Fill the card and a real coffee with me is on the house." },
    { at: ".topnav", title: "In a hurry?",
      text: "CV is my plain resume. Contact brings the bill, with my email, phone and LinkedIn. Guide replays this tour." },
  ];

  const root = document.createElement("div");
  root.id = "guide"; root.hidden = true;
  root.innerHTML = `<div class="guide-spot"></div>
    <div class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <p class="guide-step"></p>
      <h2 id="guide-title"></h2>
      <p class="guide-text"></p>
      <div class="guide-btns">
        <button type="button" class="guide-skip" data-guide="end">Skip the tour</button>
        <button type="button" class="btn btn-gold btn-small" data-guide="next">Next</button>
      </div>
    </div>`;
  document.body.appendChild(root);
  const spot = root.querySelector(".guide-spot"), card = root.querySelector(".guide-card");
  let i = 0;

  function place() {
    if (root.hidden) return;
    const r = $(stops[i].at).getBoundingClientRect(), pad = 8;
    Object.assign(spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
    /* the card sits under the lit area if there is room, otherwise above it */
    const h = card.offsetHeight, w = card.offsetWidth, below = r.bottom + 16 + h < innerHeight;
    const above = r.top - 16 - h >= 12;
    const top = below ? r.bottom + 16 : above ? r.top - 16 - h : innerHeight - h - 12; // no room either side: bottom of the screen
    card.style.top = Math.min(top, innerHeight - h - 12) + "px";
    card.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2)) + "px";
  }

  function show(n) {
    i = n;
    const s = stops[i], el = $(s.at);
    if (!el) return n + 1 < stops.length ? show(n + 1) : end();
    root.querySelector(".guide-step").textContent = `${i + 1} of ${stops.length}`;
    root.querySelector("#guide-title").textContent = s.title;
    root.querySelector(".guide-text").textContent = s.text;
    root.querySelector('[data-guide="next"]').textContent = i === stops.length - 1 ? "Got it" : "Next";
    el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    place();
    setTimeout(place, 450);                     // again once the scroll has settled
  }

  function start() {
    if (state.view !== "inside" || state.busy) return;
    root.hidden = false;
    show(0);
    root.querySelector('[data-guide="next"]').focus({ preventScroll: true });
  }
  function end() {
    root.hidden = true;
    store.set("toured", true);
    $(".stage").scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

  root.addEventListener("click", e => {
    const b = e.target.closest("[data-guide]");
    if (!b) return;
    if (b.dataset.guide === "next" && i < stops.length - 1) show(i + 1); else end();
  });
  addEventListener("keydown", e => { if (!root.hidden && e.key === "Escape") end(); });
  addEventListener("resize", place);
  addEventListener("scroll", place, { passive: true });

  /* first visit only: the tour starts by itself after he has said hello */
  const auto = () => { if (!store.get("toured", false) && !state.returning) start(); };

  Cafe.guide = { start, auto };
})();
