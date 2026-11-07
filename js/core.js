/* =========================================================
   CORE — shared helpers, visitor state and storage.
   Every other script reads from window.Cafe.
   ========================================================= */
window.Cafe = (() => {
  const D = window.CAFE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  /* remembered between visits, if the browser allows it */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("cafeminj." + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("cafeminj." + k, JSON.stringify(v)); } catch {} },
  };

  /* menu lookups */
  const item = id => D.items.find(i => i.id === id);
  const shelf = id => D.shelves.find(s => s.id === id);
  const shelfItems = id => D.items.filter(i => i.shelf === id);
  const short = it => it.name.replace(/^The /, "");

  const savedName = store.get("name", null);
  const state = {
    view: null, greeted: false, busy: false,
    step: "greet", shelf: null, pending: null,
    tray: [],                                   // ordered this visit
    stamps: store.get("stamps", []).filter(item), // loyalty card, all visits
    name: savedName,                            // null = not asked yet, "" = skipped
    returning: savedName !== null,
    togo: store.get("togo", false),
    wroteOnce: false,
  };

  /* machine drinks come in a named paper cup when the order is "to go" */
  const usesCup = it => it.station === "machine" && state.togo;

  /* smooth-scroll to an element; true if it actually had to move */
  function scrollToEl(sel, onlyIfAway = false) {
    const el = $(sel), top = el.getBoundingClientRect().top;
    if (onlyIfAway && top > -80 && top < innerHeight * 0.4) return false;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    return true;
  }

  return { D, P: D.person, A: window.ART, $, $$, esc, reduce, wait, store, item, shelf, shelfItems, short, state, usesCup, scrollToEl };
})();
