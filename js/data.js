/* =========================================================
   CAFÉ MINJ — all site content lives in this one file.
   Edit text here; you never need to touch the other scripts to update
   your resume.
   ========================================================= */

window.CAFE = {
  /* ---------- About you ---------- */
  person: {
    name: "John Paul Minj",
    firstName: "John Paul",
    role: "Management Trainee, Sales & Marketing",
    employer: "Eckstein Engineering Business Solutions",
    degree: "MBA, IIM Jammu (2026)",
    city: "Pune, India",
    email: "johnpaul@johnpaulminj.com",
    phone: "+91 99332 24856",
    phoneHref: "tel:+919933224856",
    linkedin: "https://www.linkedin.com/in/johnpaulminj/",
    linkedinLabel: "linkedin.com/in/johnpaulminj",
    /* Your photo, shown in the CV view. */
    photo: "assets/john.jpg",
    /* Illustrated portrait (arch, transparent corners): used on the street card
       and in the speech bubble. */
    illustration: "assets/barista.webp",
    /* The barista behind the counter: your illustration, cut out.
       Set to null to use the hand-drawn animated barista instead. */
    baristaImage: "assets/barista-cut.webp",
    /* Optional: put your PDF resume at assets/John-Paul-Minj-Resume.pdf and
       set this to that path. A download button appears in the CV view. */
    resumePdf: null,
  },

  /* ---------- Today's special: the chip shown first at the counter ---------- */
  special: "eckstein-espresso",

  /* ---------- Contact form ----------
     Leave empty and the form opens the visitor's email app, pre-filled.
     To receive messages directly, create a free form at https://formspree.io,
     then paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz". */
  formEndpoint: "",

  /* ---------- The shelves (categories) ----------
     station = where the barista goes to make it:
     "machine" | "case" (pastry case) | "shelf" (jar shelf) | "under" (under the counter) */
  shelves: [
    { id: "signature-brews", label: "Signature Brews", sub: "Work experience",
      blurb: "Strong shots pulled from real counters." },
    { id: "brew-school", label: "Brew School", sub: "Education",
      blurb: "Where the craft was learned." },
    { id: "bean-shelf", label: "The Jar Shelf", sub: "Core skills",
      blurb: "Kept in glass jars on the wall, sealed tight against the sea air." },
    { id: "secret-menu", label: "Secret Menu", sub: "Academic projects",
      blurb: "Not on the printed board. Ask the barista." },
    { id: "pastry-case", label: "Pastry Case", sub: "Leadership & certifications",
      blurb: "Best taken with coffee." },
  ],

  /* ---------- The menu (every item = one chapter) ----------
     art: espresso | latte | macchiato | doubleshot | ristretto | cookies |
          jar | cloche | croissant | roll | biscotti | muffin
     jarColor (jars only): label colour for the jar */
  items: [
    {
      id: "eckstein-espresso", shelf: "signature-brews", station: "machine", art: "espresso", accent: "#14354A",
      name: "The Eckstein Espresso",
      kind: "Double shot, dark roast, no filler",
      org: "Eckstein Engineering Business Solutions Pvt. Ltd.",
      role: "Management Trainee, Sales & Marketing",
      period: "Apr 2026 – Present", place: "Pune, India",
      line: "A concentrated shot of German–Indian market entry. Short, intense, and it lands.",
      notes: [
        "Manage and grow a portfolio of European accounts, planning next steps, follow-ups and meetings.",
        "Shape each client pitch: after listening to a client, I work out how Eckstein's BOT/GEC model can serve their goals, and say so honestly when it can't.",
        "Research India market-entry opportunities for German industrial machinery clients: market size, competitive landscape, target account segments.",
        "Prioritise and analyse accounts across Germany, Austria and Italy in Excel, maintaining the structured research database the sales team runs on.",
        "Write company-specific cold emails and call scripts for German Mittelstand machine builders, landing introductory meetings with owner-managers and senior decision-makers.",
        "Lead India market discovery for a German packaging automation client, mapping how Indian food manufacturers run their production and packaging lines.",
        "Built the corporate pitch deck for European machinery SME audiences and delivered client-facing presentations to senior European stakeholders.",
        "Prototyped a B2B sales CRM using AI-assisted development and wrote the 10-page BRD and feature specs guiding the developer-led build, now in progress.",
      ],
      tags: ["B2B sales", "Account management", "Pitching", "Market entry", "Data analysis"],
    },

    {
      id: "periyar-latte", shelf: "signature-brews", station: "machine", art: "latte", accent: "#4E7A4A",
      name: "Periyar Farmhouse Latte",
      kind: "Steamed on the farm, silky and seasonal",
      org: "Periyar Dairy Farm LLP (AMG Group of Companies)",
      role: "Marketing Intern",
      period: "Apr 2025 – May 2025", place: "Gaudham Farm Stay",
      line: "I wrote the recipe; the creative team poured it.",
      notes: [
        "Led the marketing strategy for Gaudham Farm Stay's turnaround: positioning, the USP to lead with, and the content themes for Instagram and campaigns.",
        "Called past guests to learn what they loved about Gaudham; their own words shaped the USP and the messaging.",
        "Picked keywords straight from those guest conversations, then worked with the SEO specialist to match them to the search terms trending most.",
        "Briefed the graphic and content team on the themes and keywords; they produced and posted the content, while I reviewed what worked and refined the plan.",
        "Proposed a 10% returning-guest offer, agreed it with management and re-engaged past guests directly: revenue doubled within a month as they came back.",
      ],
      tags: ["Marketing strategy", "Customer insight", "Positioning", "Briefing creative teams"],
    },

    {
      id: "edukon-macchiato", shelf: "signature-brews", station: "machine", art: "macchiato", accent: "#B5452E",
      name: "Edukon Macchiato",
      kind: "Espresso marked with results, six weeks flat",
      org: "Edukon Digital",
      role: "Sales & Marketing Intern (live project)",
      period: "Oct 2024 – Nov 2024", place: "Remote",
      line: "A small cup with a record stained in: sold, closed, over target.",
      notes: [
        "Managed the full sales cycle for digital development courses, end to end.",
        "Converted a pipeline of 60 qualified prospects into 14 paying customers at a 23% conversion rate.",
        "Exceeded every assigned sales target within a six-week engagement, handling prospecting, qualification, objections and closing independently.",
      ],
      tags: ["Full sales cycle", "23% conversion", "Closing"],
    },
    {
      id: "iim-double-shot", shelf: "brew-school", station: "machine", art: "doubleshot", accent: "#2F5D8A",
      name: "IIM Jammu Double Shot",
      kind: "Two concentrated years of MBA",
      org: "Indian Institute of Management Jammu",
      role: "Master of Business Administration",
      period: "2024 – 2026", place: "Jammu, India",
      line: "Two beans in one cup: strategy, sales and everything between.",
      notes: [
        "MBA, Indian Institute of Management Jammu, class of 2026.",
        "Coordinator, Infrastructure Committee: selected through a four-stage process; primary liaison for a 1,500-student body across administration and engineering teams.",
        "Where the sales, marketing and strategy behind the Signature Brews were ground.",
      ],
      cvNotes: ["Coordinator, Infrastructure Committee: selected through a four-stage process; primary liaison for a 1,500-student body."],
      tags: ["MBA", "IIM Jammu", "2026"],
    },
    {
      id: "nit-ristretto", shelf: "brew-school", station: "machine", art: "ristretto", accent: "#C98A1B",
      name: "NIT Puducherry Ristretto",
      kind: "Restricted pour, engineering strength",
      org: "National Institute of Technology Puducherry",
      role: "B.Tech, Electronics and Communication Engineering",
      period: "2020 – 2024", place: "Puducherry, India",
      line: "Four years pulled short: precise, technical, no wasted water.",
      notes: [
        "B.Tech in Electronics and Communication Engineering, NIT Puducherry, 2024.",
        "The engineering layer under every commercial move, from CRM specification to demand-generation campaigns — and why German machine builders find the conversation easy.",
        "Event Coordinator on campus: led the 'Noise Ignition' music competition end to end.",
      ],
      cvNotes: ["Event Coordinator: led the 'Noise Ignition' music competition end to end."],
      tags: ["B.Tech", "ECE", "NIT Puducherry"],
    },
    {
      id: "port-blair-cookies", shelf: "brew-school", station: "case", art: "cookies",
      name: "Port Blair School Cookies",
      kind: "Baked in the Andamans, crumbly and classic",
      org: "Khalsa Public School · St. Xavier's School",
      role: "Class XII & Class X (CBSE)",
      period: "2017 – 2019", place: "Port Blair, Andaman & Nicobar Islands",
      line: "Where it all started, before the espresso machine was switched on.",
      notes: [
        "Class XII (CBSE), Khalsa Public School, Port Blair, 2019: 79.4%.",
        "Class X (CBSE), St. Xavier's School, Port Blair, 2017: 74.1%.",
        "Island-born, mainland-brewed.",
      ],
      cvNotes: ["Class XII: 79.4% (Khalsa Public School, 2019). Class X: 74.1% (St. Xavier's School, 2017)."],
      tags: ["CBSE", "Port Blair"],
    },
    {
      id: "bd-beans", cvTitle: "Business development", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#B5452E", jarIndex: 0,
      name: "Business Development Beans",
      kind: "Single origin, ground daily",
      role: "Core skill",
      line: "The house blend behind every order on this menu.",
      notes: [
        "B2B sales, lead generation, cold email and cold calling.",
        "Prospect qualification, pipeline management, account research.",
        "Consultative selling, client presentations, proposal and pitch development.",
      ],
      tags: ["B2B", "Pipeline", "Pitching"],
    },
    {
      id: "strategy-beans", cvTitle: "Market & strategy", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#2F5D8A", jarIndex: 1,
      name: "Market & Strategy Beans",
      kind: "Slow-roasted, pairs well with whiteboards",
      role: "Core skill",
      line: "Roasted for market-entry work across borders.",
      notes: [
        "Market-entry research, market sizing, competitive analysis.",
        "Account segmentation and customer segmentation.",
        "STP and SWOT analysis, go-to-market strategy.",
      ],
      tags: ["Market sizing", "GTM", "STP & SWOT"],
    },
    {
      id: "marketing-beans", cvTitle: "Marketing", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#C98A1B", jarIndex: 2,
      name: "Marketing Beans",
      kind: "Bright acidity, measures itself",
      role: "Core skill",
      line: "The beans behind a farm stay that doubled its revenue in a month.",
      notes: [
        "Marketing strategy, positioning and USP development.",
        "Customer interviews and keyword research with SEO specialists.",
        "Briefing creative teams, campaign performance analysis, Google Analytics.",
      ],
      tags: ["Strategy", "Positioning", "Customer insight"],
    },

    {
      id: "tools-blend", cvTitle: "Tools & languages", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#4E7A4A", jarIndex: 3,
      name: "Tool Shed Blend",
      kind: "Utility roast, always in the pocket",
      role: "Tools & languages",
      line: "Spreadsheet-strong, spec-writing ready.",
      notes: [
        "Microsoft Excel and Microsoft PowerPoint.",
        "CRM design and BRD documentation.",
        "English (fluent), Hindi (fluent).",
      ],
      tags: ["Excel", "PowerPoint", "BRD"],
    },
    {
      id: "ai-blend", cvTitle: "AI tools", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#6B4FD8", jarIndex: 4,
      name: "The AI Blend",
      kind: "Human judgement, machine speed",
      role: "Core skill",
      line: "AI does the legwork. The judgement, the client calls and the final say are mine.",
      notes: [
        "ChatGPT for first-pass market research, which I then check against sources and client conversations.",
        "Claude in PowerPoint, backed by a Claude Project holding our brand guidelines and past decks, so every new client presentation starts on-brand. I write the storyline and check every number.",
        "Prototyped a B2B sales CRM with AI-assisted development and drafted its 10-page BRD for the developer-led build.",
        "Designed and launched this café, johnpaulminj.com, by directing AI tools from concept and copy to code and deployment.",
      ],
      cvNotes: ["Claude in PowerPoint and Claude Projects for on-brand client presentations; ChatGPT for first-pass market research; every output reviewed and fact-checked by me."],
      tags: ["Claude", "ChatGPT", "Brand consistency", "Fact-checking"],
    },

    {
      id: "adaptive-cx", cvTitle: "Adaptive CX platform (Digital Transformation, IIM Jammu)", shelf: "secret-menu", station: "under", art: "cloche",
      name: "The Adaptive CX Special",
      kind: "Off-board special, served under a cloche",
      org: "IIM Jammu, Digital Transformation project",
      role: "Academic project",
      line: "A drink that rewrites its own recipe based on how you're feeling. AI in the cup.",
      notes: [
        "Built the platform's AI decisioning layer by integrating Google Gemini to generate sentiment-adaptive content, replacing static, rule-based marketing messages.",
        "Designed and prototyped a zero-cost automation workflow in Zapier, Google Forms and Google Sheets that captures customer signals in real time and triggers personalised responses.",
      ],
      tags: ["Google Gemini", "Zapier", "Automation"],
    },
    {
      id: "infra-croissant", shelf: "pastry-case", station: "case", art: "croissant",
      name: "Infra Committee Croissant",
      kind: "Layered, four-stage selection",
      org: "IIM Jammu",
      role: "Coordinator, Infrastructure Committee",
      line: "A thousand flaky layers of campus logistics.",
      notes: [
        "Selected through a four-stage selection process.",
        "Primary liaison for a 1,500-student body across administration and engineering teams.",
      ],
      tags: ["Leadership", "IIM Jammu"],
    },
    {
      id: "noise-roll", shelf: "pastry-case", station: "case", art: "roll",
      name: "Noise Ignition Cinnamon Roll",
      kind: "Loud centre, sweet finish",
      org: "NIT Puducherry",
      role: "Event Coordinator",
      line: "A music competition, rolled end to end.",
      notes: [
        "Led the 'Noise Ignition' music competition end to end.",
        "Owned logistics, budgeting and scheduling.",
      ],
      tags: ["Events", "Ownership"],
    },
    {
      id: "analytics-biscotti", shelf: "pastry-case", station: "case", art: "biscotti",
      name: "Analytics Biscotti",
      kind: "Twice-baked, Google certified",
      org: "Google",
      role: "Certification",
      line: "Crunchy with numbers. Dunks well into campaigns.",
      notes: ["Google Analytics for Beginners, certified by Google."],
      tags: ["Google Analytics"],
    },
    {
      id: "project-muffin", shelf: "pastry-case", station: "case", art: "muffin",
      name: "Project Management Muffin",
      kind: "Rises on schedule, Google certified",
      org: "Google",
      role: "Certification",
      line: "Foundations, properly proofed.",
      notes: ["Foundations of Project Management, certified by Google."],
      tags: ["Project management"],
    },
  ],

  /* ---------- The café rules board ---------- */
  rules: [
    { short: "No bargaining", full: "No bargaining. Everything costs 0.00." },
    { short: "Recruiters skip the queue", full: "Recruiters may skip the queue." },
    { short: "Cold calls, hot coffee", full: "Cold calls are answered with hot coffee." },
    { short: "Don't ask about printers", full: "Do not ask the barista to fix your printer. He studied electronics, not miracles." },
    { short: "Wifi: breweddaily", full: "Wifi password: breweddaily" },
    { short: "Tip with a connection", full: "Tip your barista with a LinkedIn connection." },
    { short: "Island time: off", full: "Island time does not apply to replies. Expect one within a day." },
  ],};
