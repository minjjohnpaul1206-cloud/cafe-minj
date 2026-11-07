/* =========================================================
   COUNTER — the conversation with the barista: what he says,
   the choices under the counter, taking orders, the story card,
   the menu board and the loyalty card.
   ========================================================= */
(() => {
  const { D, P, A, $, $$, esc, reduce, wait, store, item, shelf, shelfItems, short, state, usesCup, scrollToEl } = Cafe;
  const speech = $("#speech-text"), choicesEl = $("#choices");
  let sayToken = 0;

  /* ---------- speech bubble (typewriter) ---------- */
  function say(text) {
    const token = ++sayToken;
    if (reduce) { speech.textContent = text; return Promise.resolve(); }
    speech.innerHTML = '<span></span><span class="caret">|</span>';
    const t = speech.firstChild;
    return new Promise(done => {
      let i = 0;
      (function type() {
        if (token !== sayToken) return done();
        t.textContent = text.slice(0, (i += 3));
        if (i < text.length) setTimeout(type, 16);
        else { speech.textContent = text; done(); }
      })();
    });
  }
  const sayHTML = html => { sayToken++; speech.innerHTML = html; };

  /* ---------- choices under the counter, one layout per step ---------- */
  const btn = (title, sub, act, cls = "") =>
    `<button type="button" class="choice ${cls}" data-act="${esc(act)}"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;

  const layouts = {
    greet: () => (D.special ? btn("Today's special", short(item(D.special)) + ", what I do now", "item:" + D.special, "primary") : "")
      + D.shelves.map(s => btn(s.label, s.sub, "shelf:" + s.id)).join("")
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
    working: () => `<p class="working">Making your order…</p>`,
    back: () => btn("Show me the menu", "", "greet", "primary"),
  };
  function step(name) { state.step = name; choicesEl.innerHTML = layouts[name](); }

  /* ---------- conversation ---------- */
  function greet(first) {
    step("greet");
    const h = new Date().getHours(), hi = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    if (!first) return say("What else can I get you?");
    if (state.returning && state.name)
      return say(`${hi}, ${state.name}! Welcome back to Café Minj. Your loyalty card has ${state.stamps.length} of ${D.items.length} stamps. What can I get you today?`);
    return say(`${hi}! I'm ${P.firstName}. I run this counter, and by day I'm a management trainee in sales and marketing here in Pune. Everything on the menu is a chapter of my work. What can I get you?`);
  }
  function openShelf(id) {
    const s = shelf(id);
    state.shelf = id; step("shelf");
    scrollToEl(".stage", true);
    say(`${s.label}. ${s.blurb} What'll it be?`);
  }
  function wifi() {
    step("back");
    say(`Ha. The password is "breweddaily". Honestly, nobody comes to Café Minj for the wifi. Can I tempt you with the menu?`);
  }
  function rules() {
    step("back");
    sayHTML(`The house rules, as every Irani café has them:<ol class="rules-list">${D.rules.map(r => `<li>${esc(r.full)}</li>`).join("")}</ol>`);
  }
  function surprise() {
    const left = D.items.filter(i => !state.tray.includes(i.id)), pool = left.length ? left : D.items;
    order(pool[Math.floor(Math.random() * pool.length)].id);
  }

  /* ---------- name for the order ---------- */
  function askName(id) {
    state.pending = id; step("name");
    scrollToEl(".stage", true);
    say("Great choice. Can I get a name for the order? And is it for here or to go?");
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
    step("greet"); say("No problem. I'll ask for your name when you order.");
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
    say(`One ${short(it)}${state.name ? " for " + state.name : ""}, coming right up.`);

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
      await say(wrong ? `${wrong}! …sorry, ${state.name}. Fixed it. One ${short(it)}, at the pick-up counter.`
                      : `${state.name}! One ${short(it)}, at the pick-up counter.`);
      await wait(1300);
    }
    const full = newStamp && state.stamps.length === D.items.length;
    await say(full ? `${it.line} And that's your loyalty card full: every chapter, my whole career so far. The reward is a coffee with me, for real. Shall I bring the bill?` : it.line);
    step("served");
    state.busy = false;
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

  Cafe.counter = { greet, openShelf, wifi, rules, surprise, order, setName, rename, updateStamps };
})();
