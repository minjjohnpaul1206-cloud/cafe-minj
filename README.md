# Café Minj

The portfolio site of **John Paul Minj** — a Pune Irani café where every item on the menu is a chapter of my work. Visitors walk in through the door, order from the barista (me), and watch it get made at the counter: espresso from the machine, pastries from the case, skills in glass jars off the shelf, and the secret menu from under the counter.

Plain HTML, CSS and JavaScript. No build step, no framework, no server — which is why it runs free on GitHub Pages.

```
cafe-minj/
├── index.html        the page skeleton (three views: street, inside, CV)
├── css/style.css     all styling
├── assets/           favicon and your photo
└── js/
    ├── data.js       ALL THE CONTENT. Edit this to update your resume
    ├── art.js        the drawings: street, café, barista, menu items
    ├── core.js       shared helpers + visitor state (name, stamps, tray)
    ├── scene.js      the barista's movements at the counter
    ├── counter.js    the conversation: choices, orders, story card, loyalty
    ├── pages.js      the bill (contact form) and the CV view
    └── main.js       street front, switching views, every button
```

Every clickable thing carries a `data-act="verb"` or `data-act="verb:value"` attribute, and **one table in `main.js`** decides what each verb does. To add a new button anywhere, give it a `data-act` and add one line to that table.

---

## 1. Run it on your computer

You need Python (already on most Macs; on Windows install it from python.org and tick "Add to PATH").

```bash
cd cafe-minj
python -m http.server 8000
```

Open **http://localhost:8000** in your browser. Stop it with `Ctrl + C`.

(You can also just double-click `index.html`; almost everything works that way too.)

## 2. Update your content

Everything you'd want to change is in **`js/data.js`**:

- **Your details** — name, role, email, phone, LinkedIn at the top.
- **Your photo** — already in `assets/john.jpg`. It appears in the framed "Proprietor" portrait on the café wall and on the CV page. Set `photo: null` to remove it.
- **PDF resume** — save it as `assets/John-Paul-Minj-Resume.pdf` and set `resumePdf` to that path. A download button appears on the CV page.
- **Menu items** — each job, degree, skill set or certificate is one item. Copy an existing one to add a new chapter. The `station` decides where the barista goes to make it (`machine`, `case`, `shelf`, `under`) and `art` decides what gets served.
- **Café rules** — the funny board on the wall.

Save, refresh the browser, done.

## 3. Receive messages from the contact form

Out of the box, "Send note" on the bill opens the visitor's email app with the message pre-filled to you. To receive notes directly instead:

1. Make a free account at **formspree.io** and create a form.
2. Copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint: ""` in `js/data.js`.

## 4. Put it on GitHub

One-time setup: install Git from git-scm.com and make an account at github.com.

1. On GitHub, click **New repository**. Name it `cafe-minj` (or `johnpaulminj.github.io` if you want that as your free web address). Keep it **Public**, and don't add a README.
2. In a terminal, inside the `cafe-minj` folder:

```bash
git init
git add .
git commit -m "Café Minj, first pour"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cafe-minj.git
git push -u origin main
```

Whenever you change something later:

```bash
git add .
git commit -m "Update menu"
git push
```

## 5. Make it live with GitHub Pages (free)

1. On your repository page: **Settings → Pages**.
2. Under "Build and deployment", Source: **Deploy from a branch**. Branch: **main**, folder **/ (root)**. Save.
3. Wait a minute. Your site is live at `https://YOUR-USERNAME.github.io/cafe-minj/`
   (or `https://YOUR-USERNAME.github.io/` if you named the repo `YOUR-USERNAME.github.io`).

Every `git push` updates the live site within a minute or two.

## 6. Use your own domain (later)

1. Buy a domain (e.g. `johnpaulminj.com` or `cafeminj.in`) from any registrar — GoDaddy, Namecheap, Hostinger, Google-partner registrars, etc.
2. In your registrar's DNS settings add:
   - Four **A** records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
3. On GitHub: **Settings → Pages → Custom domain**, type your domain, save, and tick **Enforce HTTPS** once it's available.

DNS changes can take from a few minutes to a day to kick in.

---

## Handy links inside the site

- `yoursite/#cv` goes straight to the plain CV page (good for job applications — recruiters skip the café).
- `yoursite/#inside` skips the street and opens at the counter.

## The coffee-chain rituals

- **Name for the order.** On their first order, visitors are asked for a name and "for here or to go". To-go drinks come in a paper cup with their name in marker (the first one is misspelled, struck out and corrected, as tradition demands), and the barista calls it out at the pick-up counter.
- **Loyalty card.** One stamp per chapter ordered; all 15 unlocks "a coffee with John Paul" on the bill.
- **Today's special.** Set `special` in `js/data.js` to the item you want to push first (currently your Eckstein role).
- Names and stamps are kept only in the visitor's own browser (localStorage); nothing is sent anywhere.

## Credits & rights

Everything here is original or freely licensed, so the site can't be taken down over someone else's design:

- **Illustrations** — the street, café interior, barista (drawn from John Paul's own photos), cups, pastries and jars are all hand-coded SVG made for this site. No stock images, clip art or icons from other brands.
- **Fonts** — Rozha One, Mukta and Kalam from Google Fonts, all under the SIL Open Font License (free for personal and commercial use).
- **Name** — "Café Minj" is built on the owner's surname. It is a personal portfolio, not a trading café.
- **No third-party brand assets** — no coffee-chain logos, wordmarks, size names or brand colours. The palette (Prussian blue, brass, mint) was checked to stay clear of well-known coffee-chain colours, and the apron is denim, not a branded green.
- **Barista voice** — all of his lines are original writing for this site; no film, TV or comic dialogue, and no franchise characters or costumes.
- **Rituals** — writing a name on a cup, calling out orders and stamp cards are everyday café practices, written here in our own words.
- **Content** — all text is John Paul's own resume and copy. No code, images or files from the earlier Emergent prototype are used; the site was rebuilt from scratch.
