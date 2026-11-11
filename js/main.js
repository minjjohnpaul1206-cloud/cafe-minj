/* =========================================================
   MAIN — the street front, switching between views
   (street / inside / cv), and the one click handler that
   runs every [data-act] button on the site.
   ========================================================= */
(() => {
  const { D, P, A, $, esc, reduce, state, shelfItems, scrollToEl } = Cafe;
  const { counter, pages, scene } = Cafe;

  /* ---------- the street front ---------- */
  $("#street-art").innerHTML = A.street(P);
  const street = $("#street-svg");
  function fitStreet() { // phones see the whole shop front above the intro card
    const phone = innerWidth < 700;
    street.setAttribute("viewBox", phone ? "300 90 1000 820" : "0 0 1600 900");
    street.setAttribute("preserveAspectRatio", phone ? "xMidYMax meet" : "xMidYMax slice");
  }
  fitStreet(); addEventListener("resize", fitStreet);

  /* the menu outside: every item, one tap from being made */
  $("#street-shelves").innerHTML = D.shelves.map(s => `<div class="street-shelf">
      <h3>${esc(s.label)}</h3><p>${esc(s.sub)}</p>
      <ul>${shelfItems(s.id).map(i => `<li><button type="button" data-act="visit:${i.id}">${esc(i.name)}</button></li>`).join("")}</ul>
    </div>`).join("");

  /* on touch screens people tap, they don't click */
  if (matchMedia("(pointer: coarse)").matches) {
    $("#door-hint-text").textContent = "Tap the door!";
    $("#howto-door").textContent = "Tap the door";
  }

  let entering = false;
  async function enter() { // the door swings open and we walk into the light
    if (entering) return;
    entering = true;
    scrollTo(0, 0); // the door is at the top, even if they came from the menu below
    if (!reduce) {
      $(".street-intro").animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      await scene.tw($("#door"), "perspective(600px) scaleX(.14)", 650, "cubic-bezier(.6,0,.3,1)");
      $(".flash").animate([{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }], { duration: 850, fill: "forwards" });
      await $("#street-art").animate([{ transform: "scale(1)" }, { transform: "scale(3.4)" }],
        { duration: 850, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" }).finished;
    }
    location.hash = "inside";
    entering = false;
  }
  function resetStreet() {
    ["#street-art", ".flash", ".street-intro", "#door"].forEach(s => $(s).getAnimations().forEach(a => a.cancel()));
    $("#door").style.transform = "";
  }

  /* ---------- views: #inside, #cv, or the street ---------- */
  const views = { street: $("#view-street"), inside: $("#view-inside"), cv: $("#view-cv") };
  function show(v) {
    if (state.view === v) return;
    const from = state.view;
    state.view = v;
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== v));
    scrollTo(0, 0);
    document.title = v === "cv" ? `${P.name} | Resume` : `${P.name} | Sales and Marketing Portfolio`;
    if (v === "street") resetStreet();
    if (v === "inside") {
      if (!reduce) views.inside.animate([{ opacity: 0, filter: "brightness(1.6)" }, { opacity: 1, filter: "none" }], { duration: 700, easing: "ease-out" });
      if (!state.greeted || from === "street") {
        const first = !state.greeted;
        state.greeted = true;
        setTimeout(async () => {
          const q = state.queued; state.queued = null;
          if (!q) { if (first) scene.wave(); counter.greet(first); return; } // hand up first, so he waves as he talks
          await counter.greet(first);
          counter.order(q); // they already chose on the street
        }, reduce ? 0 : 450);
      }
    }
  }
  const route = () => show({ cv: "cv", inside: "inside" }[location.hash.slice(1)] || "street");
  function goStreet() {
    history.pushState(null, "", location.pathname + location.search);
    route();
  }

  /* ---------- every button on the site: data-act="verb" or "verb:arg" ---------- */
  const actions = {
    enter, street: goStreet,
    visit: id => { state.queued = id; enter(); },
    streetmenu: () => scrollToEl("#street-menu"),
    board: () => scrollToEl("#board"),
    reading: () => scrollToEl("#reading"),
    skip: counter.skip,
    books: counter.openBooks, book: counter.serveBook, openbook: counter.reopenBook,
    "close-book": pages.closeBook,
    shelf: counter.openShelf, item: counter.order, greet: () => counter.greet(false),
    wifi: counter.wifi, rules: counter.rules, surprise: counter.surprise,
    skipname: () => counter.setName("", false), rename: counter.rename,
    jar: i => counter.order(D.items.find(it => it.jarIndex === +i).id),
    bill: pages.openBill, "close-bill": pages.closeBill, print: () => print(),
    cv: () => (location.hash = "cv"),
    story: () => scrollToEl("#served"), counter: () => scrollToEl(".stage"),
  };
  const allowedWhileBusy = ["cv", "bill", "close-bill", "print", "story", "board", "reading", "close-book", "skip"];

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const [verb, arg] = el.dataset.act.split(":");
    if (el.tagName === "A") e.preventDefault();
    if (state.busy && !allowedWhileBusy.includes(verb)) return;
    actions[verb]?.(arg);
  });

  addEventListener("hashchange", route);
  counter.updateStamps();
  route();
})();
