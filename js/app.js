/* =========================================================
   CAFÉ MINJ — how the café works
   ========================================================= */
(function () {
  const D = window.CAFE, A = window.ART, P = D.person;
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const itemById = id => D.items.find(i => i.id === id);
  const shelfById = id => D.shelves.find(s => s.id === id);
  const shelfItems = id => D.items.filter(i => i.shelf === id);
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  /* remembered between visits (if the browser allows it) */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("cafeminj." + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("cafeminj." + k, JSON.stringify(v)); } catch {} },
  };

  const state = {
    view: null, greeted: false, busy: false,
    step: "greet", shelf: null, tray: [],
    bx: 800, by: 0, counter: null, hiddenJar: null, sayToken: 0,
    name: store.get("name", null),          // null = not asked yet, "" = skipped
    togo: store.get("togo", false),
    stamps: store.get("stamps", []).filter(id => itemById(id)),
    returning: store.get("name", null) !== null,
    wroteOnce: false, pending: null,
  };
  const short = item => item.name.replace(/^The /, "");
  const usesCup = item => item.station === "machine" && state.togo;

  /* ---------- mount the illustrations ---------- */
  $("#street-art").innerHTML = A.street(P);
  $("#scene-host").innerHTML = A.interior(P, D.shelves, D.rules);
  const svg = $("#scene"), barista = $("#barista"), inner = $("#barista-inner");
  const armL = $("#armL"), armR = $("#armR"), layer = $("#items-layer");
  armL.style.transform = armR.style.transform = "rotate(0deg)";

  const streetSvg = $("#street-svg");
  function fitScene() {
    const narrow = innerWidth < 700;
    svg.setAttribute("viewBox", narrow ? "170 0 1260 800" : "0 0 1600 800");
    /* phones get the whole shop front, framed above the intro card */
    streetSvg.setAttribute("viewBox", narrow ? "300 90 1000 820" : "0 0 1600 900");
    streetSvg.setAttribute("preserveAspectRatio", narrow ? "xMidYMax meet" : "xMidYMax slice");
  }
  fitScene();
  addEventListener("resize", fitScene);

  /* ---------- the wall clock shows the visitor's own time ---------- */
  function tick() {
    const d = new Date(), h = d.getHours() % 12, m = d.getMinutes();
    $("#clock-h").setAttribute("transform", `rotate(${h * 30 + m * 0.5})`);
    $("#clock-m").setAttribute("transform", `rotate(${m * 6})`);
  }
  tick(); setInterval(tick, 20000);

  /* ---------- animation helpers ---------- */
  function tw(el, to, dur = 400, easing = "cubic-bezier(.45,.05,.3,1)") {
    const from = el.style.transform || to;
    el.style.transform = to;
    if (reduce || !dur || from === to) return Promise.resolve();
    return el.animate([{ transform: from }, { transform: to }], { duration: dur, easing }).finished.catch(() => {});
  }
  function fade(el, to, dur = 400) {
    const from = el.style.opacity === "" ? "1" : el.style.opacity;
    el.style.opacity = to;
    if (reduce || !dur) return Promise.resolve();
    return el.animate([{ opacity: from }, { opacity: String(to) }], { duration: dur }).finished.catch(() => {});
  }
  const itemT = (x, y, s) => `translate(${x - 60 * s}px, ${y - 110 * s}px) scale(${s})`;
  const rot = (arm, deg, dur = 380) => tw(arm, `rotate(${deg}deg)`, dur);
  const place = (x, y) => `translate(${x}px, ${y}px)`;

  function makeItem(item, x, y, s, opacity = 1) {
    const g = document.createElementNS(NS, "g");
    g.innerHTML = usesCup(item) ? A.item("togo", item) : A.item(item.art, item);
    g.style.transform = itemT(x, y, s);
    g.style.opacity = opacity;
    layer.appendChild(g);
    return g;
  }

  async function walk(x, carry) {
    const dx = x - state.bx;
    if (Math.abs(dx) < 4) return;
    barista.dataset.face = dx > 0 ? "right" : "left";
    inner.classList.add("walking");
    const dur = Math.min(1100, Math.max(320, Math.abs(dx) * 1.6));
    const moves = [tw(barista, place(x, state.by), dur, "ease-in-out")];
    if (carry) moves.push(tw(carry.el, itemT(x + carry.dx, carry.y, carry.s), dur, "ease-in-out"));
    await Promise.all(moves);
    state.bx = x;
    inner.classList.remove("walking");
    barista.dataset.face = "";
  }

  async function wave() {
    await rot(armR, -150, 420);
    for (let i = 0; i < 2; i++) { await rot(armR, -128, 180); await rot(armR, -158, 180); }
    await rot(armR, 0, 420);
  }

  function sparkle(x, y) {
    if (reduce) return;
    const g = document.createElementNS(NS, "g");
    g.innerHTML = [[-70, -60], [70, -70], [-90, 10], [86, 4], [0, -110]].map(([dx, dy]) =>
      `<path class="spark" style="transform-box:fill-box;transform-origin:center" d="M${x + dx},${y + dy - 12} l4,8 8,4 -8,4 -4,8 -4,-8 -8,-4 8,-4z" fill="#E3C98A"/>`).join("");
    layer.appendChild(g);
    setTimeout(() => g.remove(), 1000);
  }

  /* the barista's routes: where he goes to make each kind of item */
  const CARRY = 0.75, SERVE = [800, 568, 1], PRESENT = [800, 604, 1.5];

  const stations = {
    async machine(item) {
      await walk(1040);
      await rot(armR, -70);
      $("#steam").classList.add("on"); $("#pour").classList.add("on");
      const el = makeItem(item, 1230, 546, 0.55, 0);
      await fade(el, 1, 1100);
      await wait(250);
      $("#pour").classList.remove("on");
      setTimeout(() => $("#steam").classList.remove("on"), 700);
      await Promise.all([rot(armR, -35, 450), tw(el, itemT(1040 + 181, 548, CARRY), 450)]);
      await walk(800, { el, dx: 181, y: 548, s: CARRY });
      return { el, hand: armR };
    },
    async case(item) {
      await walk(620);
      await rot(armL, 55);
      const el = makeItem(item, 400, 476, 0.62, 0);
      await fade(el, 1, 300);
      await tw(el, itemT(400, 444, 0.62), 300);
      await Promise.all([rot(armL, 35, 450), tw(el, itemT(620 - 181, 548, CARRY), 450)]);
      await walk(800, { el, dx: -181, y: 548, s: CARRY });
      return { el, hand: armL };
    },
    async shelf(item) {
      const i = item.jarIndex || 0, jx = 440 + i * 92, bx = jx - 133;
      await walk(bx);
      await rot(armR, -165, 480);
      const shelfJar = $(`.shelf-jar[data-jar="${i}"]`);
      shelfJar.style.opacity = 0;
      state.hiddenJar = i;
      const el = makeItem(item, jx, 300, 0.75);
      await Promise.all([rot(armR, -35, 650), tw(el, itemT(bx + 181, 548, CARRY), 650)]);
      await walk(800, { el, dx: 181, y: 548, s: CARRY });
      return { el, hand: armR };
    },
    async under(item) {
      await walk(800);
      await tw(barista, place(800, 300), 450);
      state.by = 300;
      const el = makeItem(item, 981, 690, CARRY, 0);
      armR.style.transform = "rotate(-35deg)";
      await wait(450);
      await Promise.all([tw(barista, place(800, 0), 520), tw(el, itemT(981, 548, CARRY), 520), fade(el, 1, 520)]);
      state.by = 0;
      return { el, hand: armR };
    },
  };

  async function clearCounter() {
    const el = state.counter;
    state.counter = null;
    if (el) {
      await Promise.all([tw(el, itemT(1560, 40, 0.15), 600), fade(el, 0, 600)]);
      el.remove();
    }
    if (state.hiddenJar !== null) {
      const j = $(`.shelf-jar[data-jar="${state.hiddenJar}"]`);
      state.hiddenJar = null;
      fade(j, 1, 400);
    }
  }

  async function make(item) {
    const { el, hand } = await stations[item.station](item);
    await Promise.all([tw(el, itemT(...SERVE), 480), rot(hand, hand === armR ? -12 : 12, 480)]);
    await Promise.all([rot(hand, 0, 380), tw(el, itemT(...PRESENT), 420, "cubic-bezier(.3,1.5,.5,1)")]);
    sparkle(800, 500);
    state.counter = el;
  }

  /* ---------- the speech bubble ---------- */
  const speech = $("#speech-text");
  function say(text) {
    const token = ++state.sayToken;
    if (reduce) { speech.textContent = text; return Promise.resolve(); }
    speech.innerHTML = '<span class="t"></span><span class="caret">|</span>';
    const t = speech.firstChild;
    return new Promise(res => {
      let i = 0;
      (function type() {
        if (token !== state.sayToken) return res();
        i = Math.min(text.length, i + 2);
        t.textContent = text.slice(0, i);
        if (i < text.length) setTimeout(type, 16);
        else { speech.textContent = text; res(); }
      })();
    });
  }
  function sayHTML(html) { state.sayToken++; speech.innerHTML = html; }

  /* ---------- choices under the counter ---------- */
  const choicesEl = $("#choices");
  const choice = (title, sub, act, cls = "") =>
    `<button type="button" class="choice ${cls}" data-choice="${esc(act)}"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;

  function renderChoices() {
    const had = id => state.tray.includes(id);
    let h = "";
    switch (state.step) {
      case "working":
        h = `<p class="working">Making your order…</p>`; break;
      case "name":
        h = `<form class="name-form" id="name-form">
          <label for="name-input">Name for the order</label>
          <input id="name-input" maxlength="20" autocomplete="given-name" placeholder="Your first name" value="${esc(state.name || "")}">
          <div class="name-btns">
            <button type="submit" class="choice primary" value="here"><b>For here</b><small>In a proper cup</small></button>
            <button type="submit" class="choice" value="togo"><b>To go</b><small>Paper cup, name on it</small></button>
            <button type="button" class="choice" data-choice="skipname"><b>Skip</b></button>
          </div></form>`;
        break;
      case "shelf":
        h = shelfItems(state.shelf).map(i => choice(i.name + (had(i.id) ? " ✓" : ""), i.kind, "item:" + i.id)).join("")
          + choice("Something else", "", "greet");
        break;
      case "served": {
        const done = state.tray.length === D.items.length;
        const sh = shelfById(state.shelf);
        h = choice("Tell me the story", "The full details, below", "story", "primary")
          + (done ? "" : choice("Another from " + sh.label, "", "shelf:" + sh.id) + choice("Surprise me", "Barista's choice", "surprise"))
          + choice("That's all, bring the bill", "", "receipt")
          + choice("Back to the menu", "", "greet");
        break;
      }
      case "wifi":
      case "rules":
        h = choice("Show me the menu", "", "greet", "primary"); break;
      default:
        h = (D.special ? choice("Today's special", short(itemById(D.special)) + ", what I do now", "item:" + D.special, "primary") : "")
          + D.shelves.map(s => choice(s.label, s.sub, "shelf:" + s.id)).join("")
          + choice("Just here for the wifi", "Bold choice", "wifi")
          + choice("I'm hiring, keep it short", "Straight to the CV", "cv")
          + (state.name ? choice(`Not ${state.name}?`, "Change the name on the cup", "rename") : "");
    }
    choicesEl.innerHTML = h;
  }

  /* ---------- conversation steps ---------- */
  function greeting() {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  }
  function greet(first) {
    state.step = "greet"; renderChoices();
    if (!first) return say(`What else can I get you?`);
    if (state.returning && state.name)
      return say(`${greeting()}, ${state.name}! Welcome back to Café Minj. Your loyalty card has ${state.stamps.length} of ${D.items.length} stamps. What can I get you today?`);
    return say(`${greeting()}! I'm ${P.firstName}. I run this counter, and by day I'm a management trainee in sales and marketing here in Pune. Everything on the menu is a chapter of my work. What can I get you?`);
  }
  function openShelf(id) {
    if (state.busy) return;
    const s = shelfById(id);
    state.step = "shelf"; state.shelf = id; renderChoices();
    say(`${s.label}. ${s.blurb} What'll it be?`);
  }
  function wifi() {
    state.step = "wifi"; renderChoices();
    say(`Ha. The password is "breweddaily". Honestly, nobody comes to Café Minj for the wifi. Can I tempt you with the menu?`);
  }
  function rules() {
    if (state.busy) return;
    state.step = "rules"; renderChoices();
    sayHTML(`The house rules, as every Irani café has them:<ol style="margin:.4em 0 0;padding-left:1.3em">${D.rules.map(r => `<li>${esc(r.full)}</li>`).join("")}</ol>`);
  }
  function surprise() {
    const pool = D.items.filter(i => !state.tray.includes(i.id));
    const list = pool.length ? pool : D.items;
    order(list[Math.floor(Math.random() * list.length)].id);
  }

  function askName(id) {
    state.pending = id; state.step = "name"; renderChoices();
    const st = $(".stage").getBoundingClientRect();
    if (st.top < -80 || st.top > innerHeight * 0.4) $(".stage").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    say(`Great choice. Can I get a name for the order? And is it for here or to go?`);
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
  /* the classic: get the name slightly wrong the first time */
  function misspell(n) {
    if (n.length < 3) return n + "h";
    const i = [...n].findIndex((c, k) => k > 0 && /[aeiouy]/i.test(c));
    return i > 0 ? n.slice(0, i) + n[i] + n.slice(i) : n.slice(0, -1) + n.slice(-1) + n.slice(-1);
  }

  async function order(id) {
    if (state.busy) return;
    if (state.name === null) return askName(id);
    const item = itemById(id);
    state.busy = true; state.shelf = item.shelf;
    state.step = "working"; renderChoices();
    const stage = $(".stage").getBoundingClientRect();
    if (stage.top < -80 || stage.top > innerHeight * 0.4) {
      $(".stage").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      await wait(550);
    }
    say(`One ${short(item)}${state.name ? " for " + state.name : ""}, coming right up.`);
    await clearCounter();
    await make(item);
    let wrong = null;
    if (usesCup(item) && state.name) {
      wrong = !state.wroteOnce && state.name.length >= 3 ? misspell(state.name) : null;
      state.wroteOnce = true;
      state.counter.querySelector(".cup-name-slot").innerHTML = A.cupName(state.name, wrong);
    }
    if (!state.tray.includes(id)) state.tray.push(id);
    const newStamp = !state.stamps.includes(id);
    if (newStamp) { state.stamps.push(id); store.set("stamps", state.stamps); }
    updateTray();
    renderServed(item, wrong);
    state.step = "served";
    if (state.name) {
      await say(wrong
        ? `${wrong}! …sorry, ${state.name}. Fixed it. One ${short(item)}, at the pick-up counter.`
        : `${state.name}! One ${short(item)}, at the pick-up counter.`);
      await wait(1300);
    }
    const done = state.stamps.length === D.items.length;
    await say(done && newStamp
      ? `${item.line} And that's your loyalty card full: every chapter, my whole career so far. The reward is a coffee with me, for real. Shall I bring the bill?`
      : item.line);
    renderChoices();
    state.busy = false;
  }

  function updateTray() {
    $("#tray-count").textContent = state.tray.length;
    $$(".board-item").forEach(b => b.classList.toggle("had", state.stamps.includes(b.dataset.item)));
    const n = state.stamps.length, total = D.items.length;
    $("#stamps").innerHTML = D.items.map((it, i) => `<span class="stamp-dot${i < n ? " on" : ""}"></span>`).join("");
    $("#stamp-count").textContent = n === total ? "Card full: coffee with John Paul unlocked" : `${n} of ${total} stamps`;
  }

  /* ---------- the served story card ---------- */
  function renderServed(item, wrong) {
    const s = shelfById(item.shelf);
    const facts = [["Role", item.role], ["Where", item.org], ["When", item.period], ["Based in", item.place]]
      .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
    const box = $("#served");
    box.hidden = false;
    box.innerHTML = `<article class="served-card">
      <div class="served-art"><span class="served-shelf">${esc(s.label)}</span><div class="on-counter">${usesCup(item) && state.name
          ? `<svg viewBox="0 0 120 120" aria-hidden="true">${A.item("togo", item).replace('<g class="cup-name-slot"></g>', A.cupName(state.name, wrong))}</svg>`
          : A.itemSVG(item.art, item)}<div class="marble"></div></div></div>
      <div class="served-body">
        <h3>${esc(item.name)}</h3>
        <p class="served-kind">${esc(item.kind)}</p>
        ${facts ? `<dl class="facts">${facts}</dl>` : ""}
        <p class="said">“${esc(item.line)}”</p>
        <ul class="notes">${item.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
        <div class="tags">${(item.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="intro-actions"><button type="button" class="btn btn-small btn-line" data-action="counter" style="color:var(--bottle);border-color:var(--bottle)">Back to the counter</button></div>
      </div></article>`;
  }

  /* ---------- the menu board ---------- */
  $("#board-groups").innerHTML = D.shelves.map(s => `<div class="board-group">
      <h3>${esc(s.label)}</h3><p class="sub">${esc(s.sub)}</p>
      ${shelfItems(s.id).map(i => `<button type="button" class="board-item" data-item="${i.id}">
        <span class="n">${esc(i.name)}</span><span class="dots"></span><span class="p">0.00</span><span class="k">${esc(i.kind)}</span></button>`).join("")}
    </div>`).join("");

  /* ---------- the bill ---------- */
  const bill = $("#bill"), paper = $("#paper");
  function openBill() {
    const now = new Date();
    const when = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) + ", " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const lines = state.tray.length
      ? state.tray.map(id => `<div class="row"><span>1 × ${esc(itemById(id).name)}</span><span>0.00</span></div>`).join("")
      : `<div class="row"><span>1 × Friendly conversation</span><span>0.00</span></div>`;
    paper.innerHTML = `
      <button class="x" type="button" data-action="close-bill" aria-label="Close the bill">×</button>
      <h2 id="bill-title">Café Minj</h2>
      <p class="c muted">Irani café and portfolio, Pune</p>
      <p class="c muted">Bill JPM-1206 &nbsp; ${esc(when)}</p>
      <hr>${lines}<hr>
      <div class="row total"><span>Total</span><span>0.00</span></div>
      <p class="c muted">Everything is on the house</p>
      ${state.name ? `<p class="c">Order for <b>${esc(state.name)}</b> (${state.togo ? "to go" : "for here"})</p>` : ""}
      <p class="c muted">Loyalty card: ${state.stamps.length} of ${D.items.length} stamps${state.stamps.length === D.items.length ? ". Full! Your coffee with John Paul is on me, leave a note below." : ""}</p>
      <hr>
      <p class="muted">Your barista</p>
      <p><b>${esc(P.name)}</b><br>${esc(P.role)}</p>
      <div class="contact">
        <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedinLabel)}</a>
        <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>
        <a href="${esc(P.phoneHref)}">${esc(P.phone)}</a>
      </div>
      <hr>
      <form id="note-form" novalidate>
        <p class="muted">Leave a note for the barista</p>
        <label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required>
        <label for="f-email">Your email</label><input id="f-email" name="email" type="email" autocomplete="email" required>
        <label for="f-msg">Your note</label><textarea id="f-msg" name="message" rows="3" placeholder="An opportunity, a question, a recipe" required></textarea>
        <button class="btn btn-gold" type="submit">Send note</button>
        <p class="status" id="f-status" role="status"></p>
      </form>
      <div class="barcode" aria-hidden="true"></div>
      <p class="c muted">Thank you. Come again.</p>`;
    $("#register")?.classList.add("printing");
    setTimeout(() => $("#register")?.classList.remove("printing"), 1300);
    bill.showModal();
  }
  bill.addEventListener("click", e => { if (e.target === bill) bill.close(); });

  paper.addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, st = $("#f-status"), btn = f.querySelector("button[type=submit]");
    const data = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    if (!data.name || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) {
      st.textContent = "Add your name, a valid email and a note, then send again."; return;
    }
    const ordered = state.tray.map(id => itemById(id).name);
    if (D.formEndpoint) {
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch(D.formEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, ordered: ordered.join(", ") || "Friendly conversation" }),
        });
        if (!r.ok) throw new Error(r.status);
        btn.textContent = "Note sent";
        st.innerHTML = `<span class="stamp">SERVED</span>I'll get back to you soon.`;
        f.reset();
      } catch {
        btn.disabled = false; btn.textContent = "Send note";
        st.innerHTML = `The note didn't go through. Email me directly at <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>.`;
      }
    } else {
      const body = `${data.message}\n\n${ordered.length ? "Ordered at Café Minj: " + ordered.join(", ") + "\n" : ""}— ${data.name} (${data.email})`;
      location.href = `mailto:${P.email}?subject=${encodeURIComponent("Café Minj: a note from " + data.name)}&body=${encodeURIComponent(body)}`;
      st.innerHTML = `<span class="stamp">SERVED</span>Your email app is opening with the note ready to send.`;
    }
  });

  /* ---------- CV (recruiter quick view) ---------- */
  function renderCV() {
    const sec = (title, inner) => `<h2>${title}</h2>${inner}`;
    const entry = (i, notes = i.notes) => `<div class="cv-entry">
      <div class="cv-entry-head"><b>${esc(i.role)}</b><span>${esc(i.period || "")}</span></div>
      <div class="cv-org">${esc([i.org, i.place].filter(Boolean).join(", "))}</div>
      ${notes && notes.length ? `<ul>${notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}</div>`;
    const by = id => shelfItems(id);
    $("#cv-paper").innerHTML = `
      <header class="cv-head">
        ${P.photo ? `<img class="cv-photo" src="${esc(P.photo)}" alt="${esc(P.name)}">` : ""}
        <div><h1>${esc(P.name)}</h1>
        <p class="cv-role">${esc(P.role)}, ${esc(P.employer)}. ${esc(P.degree)}.</p>
        <p class="cv-contact"><span>${esc(P.city)}</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a><a href="${esc(P.phoneHref)}">${esc(P.phone)}</a><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedinLabel)}</a></p></div>
      </header>
      ${sec("Experience", by("signature-brews").map(i => entry(i)).join(""))}
      ${sec("Education", by("brew-school").map(i => entry(i, i.cvNotes || i.notes)).join(""))}
      ${sec("Skills", `<dl class="cv-skills">${by("bean-shelf").map(i => `<dt>${esc(i.cvTitle || i.name)}</dt><dd>${esc(i.notes.join(" "))}</dd>`).join("")}</dl>`)}
      ${sec("Academic project", by("secret-menu").map(i => entry({ ...i, role: i.cvTitle || i.org, org: "", period: "" })).join(""))}
      ${sec("Leadership & certifications", `<div class="cv-entry"><ul>${by("pastry-case").map(i => (i.role === "Certification" ? `<li><b>${esc(i.notes[0].replace(/, certified by Google\.$/, ""))}</b>, Google certification</li>` : `<li><b>${esc(i.role)}</b>, ${esc(i.org)}. ${esc(i.notes.join(" "))}</li>`)).join("")}</ul></div>`)}`;
    const pdf = $("#cv-pdf");
    if (P.resumePdf) { pdf.hidden = false; pdf.href = P.resumePdf; }
  }
  renderCV();

  /* ---------- views and routing ---------- */
  const views = { street: $("#view-street"), inside: $("#view-inside"), cv: $("#view-cv") };
  function show(v) {
    if (state.view === v) return;
    const prev = state.view;
    state.view = v;
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== v));
    scrollTo(0, 0);
    if (v === "inside") {
      if (!reduce) views.inside.animate([{ opacity: 0, filter: "brightness(1.6)" }, { opacity: 1, filter: "none" }], { duration: 700, easing: "ease-out" });
      if (!state.greeted || prev === "street") {
        const first = !state.greeted;
        state.greeted = true;
        setTimeout(() => { greet(first); if (first) wave(); }, reduce ? 0 : 450);
      }
    }
    if (v === "street") resetStreet();
    document.title = v === "cv" ? `${P.name} · CV` : `Café Minj · ${P.name}, Sales & Marketing`;
  }
  function route() {
    const h = location.hash.slice(1);
    show(h === "cv" ? "cv" : h === "inside" ? "inside" : "street");
  }
  addEventListener("hashchange", route);

  function resetStreet() {
    $("#street-art").getAnimations().forEach(a => a.cancel());
    $(".flash").getAnimations().forEach(a => a.cancel());
    $(".street-intro").getAnimations().forEach(a => a.cancel());
    const door = $("#door");
    door.getAnimations().forEach(a => a.cancel());
    door.style.transform = "";
  }

  let entering = false;
  async function enter() {
    if (entering) return;
    entering = true;
    if (!reduce) {
      $(".street-intro").animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      await tw($("#door"), "perspective(600px) scaleX(.14)", 650, "cubic-bezier(.6,0,.3,1)");
      $(".flash").animate([{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }], { duration: 850, fill: "forwards" });
      await $("#street-art").animate([{ transform: "scale(1)" }, { transform: "scale(3.4)" }],
        { duration: 850, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" }).finished;
    }
    location.hash = "inside";
    entering = false;
  }
  function goStreet() {
    if (state.busy) return;
    history.pushState(null, "", location.pathname + location.search);
    route();
  }

  /* ---------- one click handler for everything ---------- */
  document.addEventListener("click", e => {
    const c = e.target.closest("[data-choice]");
    if (c) {
      const [k, v] = c.dataset.choice.split(":");
      if (state.busy && k !== "cv" && k !== "receipt") return;
      if (k === "shelf") openShelf(v);
      else if (k === "item") order(v);
      else if (k === "greet") greet(false);
      else if (k === "skipname") setName("", false);
      else if (k === "rename") { state.name = null; state.returning = false; store.set("name", null); renderChoices(); say("No problem. I'll ask for your name when you order."); }
      else if (k === "wifi") wifi();
      else if (k === "surprise") surprise();
      else if (k === "receipt") openBill();
      else if (k === "cv") location.hash = "cv";
      else if (k === "story") $("#served").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }
    const b = e.target.closest(".board-item");
    if (b) { order(b.dataset.item); return; }
    const jar = e.target.closest(".shelf-jar");
    if (jar) { const it = D.items.find(i => i.art === "jar" && i.jarIndex === +jar.dataset.jar); if (it) order(it.id); return; }
    if (e.target.closest("#machine")) { openShelf("signature-brews"); return; }
    if (e.target.closest("#pastry-case")) { openShelf("pastry-case"); return; }
    const a = e.target.closest("[data-action]");
    if (!a) return;
    const act = a.dataset.action;
    if (act === "enter") enter();
    else if (act === "street") { e.preventDefault(); goStreet(); }
    else if (act === "receipt") openBill();
    else if (act === "close-bill") bill.close();
    else if (act === "shelf") openShelf(a.dataset.shelf);
    else if (act === "rules") rules();
    else if (act === "print") print();
    else if (act === "counter") $(".stage").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });

  choicesEl.addEventListener("submit", e => {
    if (e.target.id !== "name-form") return;
    e.preventDefault();
    setName($("#name-input").value, e.submitter?.value === "togo");
  });

  ["#machine", "#pastry-case"].forEach(s => $(s).classList.add("hot"));
  $$(".shelf-jar").forEach(j => j.classList.add("hot"));

  updateTray();
  route();
})();
