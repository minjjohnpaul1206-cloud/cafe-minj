/* =========================================================
   PAGES — the printed bill (with the contact form) and the
   plain CV view for recruiters.
   ========================================================= */
(() => {
  const { D, P, A, $, esc, item, shelfItems, state } = Cafe;
  const bill = $("#bill"), paper = $("#paper");

  /* ---------- the bill ---------- */
  function openBill() {
    const now = new Date();
    const when = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) + ", "
      + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const row = (a, b) => `<div class="row"><span>${a}</span><span>${b}</span></div>`;
    const lines = state.tray.length ? state.tray.map(id => row("1 × " + esc(item(id).name), "0.00")).join("") : row("1 × Friendly conversation", "0.00");
    const full = state.stamps.length === D.items.length;

    paper.innerHTML = `
      <button class="x" type="button" data-act="close-bill" aria-label="Close the bill">×</button>
      <h2 id="bill-title">Café Minj</h2>
      <p class="c muted">A portfolio, not a real café. Pune</p>
      <p class="c muted">Bill JPM-1206 &nbsp; ${esc(when)}</p>
      <hr>${lines}<hr>
      <div class="row total"><span>Total</span><span>0.00</span></div>
      <p class="c muted">Everything is on the house</p>
      ${state.name ? `<p class="c">Order for <b>${esc(state.name)}</b> (${state.togo ? "to go" : "for here"})</p>` : ""}
      <p class="c muted">Loyalty card: ${state.stamps.length} of ${D.items.length} stamps${full ? ". Full! Your coffee with John Paul is on me, leave a note below." : ""}</p>
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

    $("#register").classList.add("printing");
    setTimeout(() => $("#register").classList.remove("printing"), 1300);
    bill.showModal();
  }
  const closeBill = () => bill.close();
  bill.addEventListener("click", e => { if (e.target === bill) closeBill(); });

  /* contact form: Formspree if configured, otherwise the visitor's email app */
  paper.addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, status = $("#f-status"), send = f.querySelector("[type=submit]");
    const note = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    if (!note.name || !note.message || !/^\S+@\S+\.\S+$/.test(note.email))
      return (status.textContent = "Add your name, a valid email and a note, then send again.");
    const ordered = state.tray.map(id => item(id).name).join(", ");
    const served = msg => (status.innerHTML = `<span class="stamp">SERVED</span>${msg}`);

    if (!D.formEndpoint) {
      const body = `${note.message}\n\n${ordered ? "Ordered at Café Minj: " + ordered + "\n" : ""}— ${note.name} (${note.email})`;
      location.href = `mailto:${P.email}?subject=${encodeURIComponent("Café Minj: a note from " + note.name)}&body=${encodeURIComponent(body)}`;
      return served("Your email app is opening with the note ready to send.");
    }
    send.disabled = true; send.textContent = "Sending…";
    try {
      const r = await fetch(D.formEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...note, ordered: ordered || "Friendly conversation" }),
      });
      if (!r.ok) throw new Error(r.status);
      send.textContent = "Note sent"; served("I'll get back to you soon."); f.reset();
    } catch {
      send.disabled = false; send.textContent = "Send note";
      status.innerHTML = `The note didn't go through. Email me directly at <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>.`;
    }
  });

  /* ---------- the book: opens with a page flip ---------- */
  const bookDlg = $("#book-dialog");
  function openBook(b) {
    const head = `<p class="bk-meta">${esc(b.date)} · ${esc(b.platform)}</p><h2 class="bk-title">${esc(b.title)}</h2><p class="bk-kicker">${esc(b.kicker)}</p>`;
    const words = (b.excerpt || [b.summary]).map(p => `<p>${esc(p)}</p>`).join("");
    $("#flipbook").innerHTML = `
      <button class="x" type="button" data-act="close-book" aria-label="Close the book">×</button>
      <div class="bk-page bk-right">
        <div class="bk-mhead">${head}</div>
        <div class="bk-words">${words}</div>
        <a class="btn btn-gold bk-link" href="${esc(b.url)}" target="_blank" rel="noopener">Read the full post on ${esc(b.platform)}</a>
      </div>
      <div class="bk-flap">
        <div class="bk-front">${A.bookCover(b)}</div>
        <div class="bk-back"><div class="bk-art">${A.bookCover(b)}</div>${head}</div>
      </div>`;
    bookDlg.showModal();
  }
  const closeBook = () => bookDlg.open && bookDlg.close();
  bookDlg.addEventListener("click", e => { if (e.target === bookDlg) closeBook(); });

  /* ---------- CV ---------- */
  function renderCV() {
    const section = (title, html) => `<h2>${title}</h2>${html}`;
    const list = notes => notes?.length ? `<ul>${notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : "";
    const entry = (it, notes = it.notes) => `<div class="cv-entry">
      <div class="cv-entry-head"><b>${esc(it.role)}</b><span>${esc(it.period || "")}</span></div>
      <div class="cv-org">${esc([it.org, it.place].filter(Boolean).join(", "))}</div>${list(notes)}</div>`;
    const leadership = it => it.role === "Certification"
      ? `<li><b>${esc(it.notes[0].replace(/, certified by Google\.$/, ""))}</b>, Google certification</li>`
      : `<li><b>${esc(it.role)}</b>, ${esc(it.org)}. ${esc(it.notes.join(" "))}</li>`;

    const edu = it => `<div class="cv-entry">
      <div class="cv-entry-head"><b>${esc(it.role)}</b><span>${esc(it.period || "")}</span></div>
      <div class="cv-org">${esc([it.org, it.place].filter(Boolean).join(", "))}</div>${list(it.cvNotes)}</div>`;
    const lead = shelfItems("pastry-case").filter(it => it.role !== "Certification");
    const certs = shelfItems("pastry-case").filter(it => it.role === "Certification");

    /* Standard resume headings and plain text, so applicant tracking systems
       (ATS) can read the page and the PDF printed from it. */
    $("#cv-paper").innerHTML = `
      <header class="cv-head">
        ${P.photo ? `<img class="cv-photo" src="${esc(P.photo)}" alt="">` : ""}
        <div><h1>${esc(P.name)}</h1>
        <p class="cv-role">${esc(P.headline || P.role)}</p>
        <p class="cv-contact"><span>${esc(P.city)}</span><a href="${esc(P.phoneHref)}">${esc(P.phone)}</a><a href="mailto:${esc(P.email)}">${esc(P.email)}</a><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedinLabel)}</a>${P.website ? `<a href="https://${esc(P.website)}">${esc(P.website)}</a>` : ""}</p></div>
      </header>
      ${P.summary ? section("Professional Summary", `<p class="cv-summary">${esc(P.summary)}</p>`) : ""}
      ${section("Work Experience", shelfItems("signature-brews").map(it => entry(it, it.cvNotes || it.notes)).join(""))}
      ${section("Education", shelfItems("brew-school").map(edu).join(""))}
      ${section("Skills", `<dl class="cv-skills">${shelfItems("bean-shelf").map(it => `<dt>${esc(it.cvTitle || it.name)}</dt><dd>${esc((it.cvNotes || it.notes).join(" "))}</dd>`).join("")}</dl>`)}
      ${section("Projects", shelfItems("secret-menu").map(it => entry({ ...it, role: it.cvTitle || it.org, org: "", period: "" })).join(""))}
      ${section("Leadership", `<div class="cv-entry"><ul>${lead.map(leadership).join("")}</ul></div>`)}
      ${section("Certifications", `<div class="cv-entry"><ul>${certs.map(it => `<li>${esc(it.notes[0].replace(/, certified by Google\.$/, ""))}, Google</li>`).join("")}</ul></div>`)}`;

    if (P.resumePdf) Object.assign($("#cv-pdf"), { hidden: false, href: P.resumePdf });
  }
  renderCV();

  Cafe.pages = { openBill, closeBill, openBook, closeBook };
})();
