/* =========================================================
   COUNTER — the conversation with the barista: what he says,
   the choices under the counter, taking orders, the story card,
   the menu board and the loyalty card.
   ========================================================= */
(() => {
  const { D, P, A, $, $$, esc, reduce, speed, wait, store, item, shelf, shelfItems, short, state, usesCup, scrollToEl } = Cafe;
  const speech = $("#bubble-text"), srSay = $("#sr-say"), choicesEl = $("#choices");
  let sayToken = 0;

  /* ---------- the comic speech bubble (typewriter) ---------- */
  function say(text) {
    const token = ++sayToken;
    Cafe.scene.bubble();
    srSay.textContent = text;                   // screen readers get the whole line at once
    if (reduce) { speech.textContent = text; return Promise.resolve(); }
    speech.innerHTML = '<span></span><span class="caret">|</span>';
    const t = speech.firstChild;
    Cafe.scene.talk(true);                      // he bobs a little while he speaks
    return new Promise(done => {
      let i = 0;
      (function type() {
        if (token !== sayToken) return done();
        t.textContent = text.slice(0, (i += 3));
        if (i < text.length) setTimeout(type, 16);
        else { speech.textContent = text; Cafe.scene.talk(false); done(); }
      })();
    });
  }
  const sayHTML = (html, short = "") => {
    sayToken++; Cafe.scene.bubble(); speech.innerHTML = html;
    const tmp = document.createElement("div"); tmp.innerHTML = html; srSay.textContent = tmp.textContent;
  };

  /* ---------- choices under the counter, one layout per step ---------- */
  const btn = (title, sub, act, cls = "") =>
    `<button type="button" class="choice ${cls}" data-act="${esc(act)}"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;

  const layouts = {
    greet: () => (D.special ? btn("Today's special", short(item(D.special)) + ", what I do now", "item:" + D.special, "primary") : "")
      + D.shelves.map(s => btn(s.label, s.sub, "shelf:" + s.id)).join("")
      + ((D.writing || []).length ? btn("Something to read?", "From my bookshelf", "books") : "")
      + btn("Just here for the wifi", "Bold choice", "wifi")
      + btn("I'm hiring, keep it short", "Straight to the CV", "cv")
      + (state.name ? btn(`Not ${state.name}?`, "Change the name on the cup", "rename") : ""),
    shelf: () => shelfItems(state.shelf).map(i => btn(i.name + (state.stamps.includes(i.id) ? " ✓" : ""), i.kind, "item:" + i.id)).join("")
      + btn("Something else", "", "greet"),
    served: () => {
      const s = shelf(state.shelf), full = state.stamps.length === D.items.length;
      return btn("Tell me the story", "The full details, below", "story", "primary")
        + (full ? "" : btn("Another from " + s.label, "", "shelf:" + s.id) + btn("Surprise me", "Barista's choice", "surprise"))
        + btn("Bring the bill", "And get in touch", "bill") + btn("Back to the menu", "", "greet");
    },
    name: () => `<form class="name-form" id="name-form">
        <label for="name-input">Name for the order <span class="optional">(optional, it just goes on the cup)</span></label>
        <input id="name-input" maxlength="20" autocomplete="given-name" placeholder="Your first name">
        <div class="name-btns">
          <button type="submit" class="choice primary" value="here"><b>For here</b><small>In a proper cup</small></button>
          <button type="submit" class="choice" value="togo"><b>To go</b><small>Paper cup, name on it</small></button>
          ${btn("Skip", "", "skipname")}
        </div></form>`,
    books: () => (D.writing || []).map((b, i) => btn(b.title, b.kicker, "book:" + i)).join("") + btn("Something else", "", "greet"),
    bookserved: () => btn("Open the book", "", "openbook", "primary") + btn("Another book", "", "books") + btn("Back to the menu", "", "greet"),
    working: () => `<p class="working">Making your order… keep your eyes on the counter.</p>${btn("Skip the show", "Serve it right away", "skip")}`,
    back: () => btn("Show me the menu", "", "greet", "primary"),
  };
  function step(name) {
    state.step = name; choicesEl.innerHTML = layouts[name]();
    $("#hint").hidden = name !== "greet" || state.stamps.length > 0; // first-visit tip, only at the start
  }

  /* ---------- conversation ---------- */
  function greet(first) {
    step("greet");
    const h = new Date().getHours(), hi = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    if (!first) return say("What else can I tempt you with?");
    if (state.returning && state.name)
      return say(`${hi}, ${state.name}. Back again? I had a feeling you would be. Your loyalty card stands at ${state.stamps.length} of ${D.items.length}. What shall I make appear today?`);
    return say(`${hi}, and welcome. You've wandered into Café Minj, my resume dressed up as a café. I'm ${P.firstName}: born on the Andaman Islands, barista by night, management trainee in sales and marketing by day. Everything on the menu is a chapter of my work, and all of it is on the house. Choose well.`);
  }
  function openShelf(id) {
    const s = shelf(id);
    state.shelf = id; step("shelf");
    scrollToEl(".stage", true);
    say(`${s.label}. ${s.blurb} Go on, pick one. I promise nothing explodes.`);
  }
  function wifi() {
    step("back");
    say(`The password is "breweddaily". But you didn't come all this way for the wifi. Nobody ever does. Shall I show you the menu?`);
  }
  function rules() {
    step("back");
    sayHTML(`The house rules. I follow most of them:<ol class="rules-list">${D.rules.map(r => `<li>${esc(r.full)}</li>`).join("")}</ol>`, "The house rules. I follow most of them.");
  }
  function openBooks() {
    step("books"); scrollToEl(".stage", true);
    say("Ah, a reader. These are a few things I've written. Pick one and I'll fetch it off the shelf.");
  }
  let lastBook = null;
  async function serveBook(i) {
    if (state.busy) return;
    const b = D.writing[+i];
    if (!b) return;
    state.busy = true; step("working");
    if (scrollToEl(".stage", true)) await wait(550);
    say(`"${b.title}". One of my favourites. Give me a second.`);
    await Cafe.scene.serve({ ...b, station: "books", art: "book", bookIndex: +i });
    await say("Here you go. Careful, it's still warm.");
    lastBook = b;
    step("bookserved");
    state.busy = false;
    speed.k = speed.normal;
    await wait(500);
    Cafe.pages.openBook(b);
  }
  const reopenBook = () => lastBook && Cafe.pages.openBook(lastBook);

  function surprise() {
    const left = D.items.filter(i => !state.tray.includes(i.id)), pool = left.length ? left : D.items;
    order(pool[Math.floor(Math.random() * pool.length)].id);
  }

  /* ---------- name for the order ---------- */
  function askName(id) {
    state.pending = id; step("name");
    scrollToEl(".stage", true);
    say("Excellent taste. Now, a name for the cup, your real one ideally. And is it for here or to go?");
    setTimeout(() => $("#name-input")?.focus({ preventScroll: true }), reduce ? 0 : 400);
  }
  function setName(raw, togo) {
    const n = (raw || "").trim().split(/\s+/)[0].replace(/[^\p{L}'-]/gu, "").slice(0, 14);
    state.name = n ? n[0].toUpperCase() + n.slice(1) : "";
    state.togo = !!togo;
    store.set("name", state.name); store.set("togo", state.togo);
    const id = state.pending; state.pending = null;
    if (id) order(id);
  }
  function rename() {
    state.name = null; state.returning = false; store.set("name", null);
    step("greet"); say("A new name? I admire that. I'll ask for it when you order.");
  }
  /* the classic: get the name a little wrong on the first cup */
  function misspell(n) {
    const i = [...n].findIndex((c, k) => k > 0 && /[aeiouy]/i.test(c));
    return i > 0 ? n.slice(0, i) + n[i] + n.slice(i) : n + n.slice(-1);
  }

  /* ---------- taking an order ---------- */
  async function order(id) {
    if (state.busy) return;
    if (state.name === null) return askName(id);
    const it = item(id);
    state.busy = true; state.shelf = it.shelf; step("working");
    if (scrollToEl(".stage", true)) await wait(550);
    say(`One ${short(it)}${state.name ? " for " + state.name : ""}. Watch closely.`);

    const el = await Cafe.scene.serve(it);
    let wrong = null;
    if (usesCup(it) && state.name) {
      wrong = !state.wroteOnce && state.name.length >= 3 ? misspell(state.name) : null;
      state.wroteOnce = true;
      el.querySelector(".cup-name-slot").innerHTML = A.cupName(state.name, wrong);
    }

    if (!state.tray.includes(id)) state.tray.push(id);
    const newStamp = !state.stamps.includes(id);
    if (newStamp) { state.stamps.push(id); store.set("stamps", state.stamps); }
    updateStamps();
    renderStory(it, wrong);

    if (state.name) {
      await say(wrong ? `${wrong}! …a small trick of the pen. ${state.name}, of course. One ${short(it)}, at the pick-up counter.`
                      : `${state.name}! One ${short(it)}, at the pick-up counter.`);
      await wait(1300);
    }
    const full = newStamp && state.stamps.length === D.items.length;
    await say(full ? `${it.line} And with that, your loyalty card is full: every chapter, my whole career so far. The prize is a real coffee with me, no tricks. Shall I bring the bill?` : it.line);
    step("served");
    state.busy = false;
    speed.k = speed.normal;                     // back to normal after a "Skip"
    await wait(900);
    if (state.step === "served") scrollToEl("#served"); // open the story, unless they've already moved on
  }

  /* ---------- the story card under the counter ---------- */
  function renderStory(it, wrong) {
    const facts = [["Role", it.role], ["Where", it.org], ["When", it.period], ["Based in", it.place]]
      .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
    const art = usesCup(it) && state.name
      ? `<svg viewBox="0 0 120 120" aria-hidden="true">${A.item("togo", it).replace('<g class="cup-name-slot"></g>', A.cupName(state.name, wrong))}</svg>`
      : A.itemSVG(it.art, it);
    const box = $("#served");
    box.hidden = false;
    box.innerHTML = `<article class="served-card">
      <div class="served-art"><span class="served-shelf">${esc(shelf(it.shelf).label)}</span><div class="on-counter">${art}<div class="marble"></div></div></div>
      <div class="served-body">
        <h3>${esc(it.name)}</h3>
        <p class="served-kind">${esc(it.kind)}</p>
        ${facts ? `<dl class="facts">${facts}</dl>` : ""}
        <p class="said">“${esc(it.line)}”</p>
        <ul class="notes">${it.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
        <div class="tags">${(it.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </div></article>
      <nav class="story-next" aria-label="What next">
        <p>What next?</p>
        ${btn("Another from " + shelf(it.shelf).label, "", "shelf:" + it.shelf)}
        ${btn("Surprise me", "Barista's choice", "surprise")}
        ${btn("See the whole menu", "", "board")}
        ${btn("Get in touch", "Email, phone, LinkedIn", "bill", "primary")}
      </nav>`;
  }

  /* ---------- menu board + loyalty card ---------- */
  $("#board-groups").innerHTML = D.shelves.map(s => `<div class="board-group">
      <h3>${esc(s.label)}</h3><p class="sub">${esc(s.sub)}</p>
      ${shelfItems(s.id).map(i => `<button type="button" class="board-item" data-act="item:${i.id}">
        <span class="n">${esc(i.name)}</span><span class="dots"></span><span class="p">0.00</span><span class="k">${esc(i.kind)}</span></button>`).join("")}
    </div>`).join("");

  /* ---------- the reading corner: my posts, each opens on LinkedIn ---------- */
  $("#books").innerHTML = (D.writing || []).map(b => `<a class="book" href="${esc(b.url)}" target="_blank" rel="noopener">
      <span class="book-cover">${A.bookCover(b)}</span>
      <span class="book-body">
        <span class="book-meta">${esc(b.date)} · ${esc(b.platform)}</span>
        <span class="book-title">${esc(b.title)}</span>
        <span class="book-kicker">${esc(b.kicker)}</span>
        <span class="book-summary">${esc(b.summary)}</span>
        <span class="book-link">Read the full post on ${esc(b.platform)}</span>
      </span></a>`).join("");
  $("#learning").innerHTML = (D.learning || []).map(c => `<li><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a><span>${esc(c.by)}, ${esc(c.date)}</span></li>`).join("");

  function updateStamps() {
    const n = state.stamps.length, total = D.items.length;
    $$(".board-item").forEach(b => b.classList.toggle("had", state.stamps.includes(b.dataset.act.slice(5))));
    $("#stamps").innerHTML = D.items.map((_, i) => `<span class="stamp-dot${i < n ? " on" : ""}"></span>`).join("");
    $("#stamp-count").textContent = n === total ? "Card full: coffee with John Paul unlocked" : `${n} of ${total} stamps`;
  }

  choicesEl.addEventListener("submit", e => {
    e.preventDefault();
    setName($("#name-input").value, e.submitter?.value === "togo");
  });

  const skip = () => { speed.k = 0.08; };       // fast-forward the making of this order
  Cafe.counter = { skip, greet, openShelf, wifi, rules, surprise, order, setName, rename, updateStamps, openBooks, serveBook, reopenBook };
})();
