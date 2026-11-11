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
    website: "johnpaulminj.com",
    /* The CV page: a keyword headline and a short summary, written for
       sales and marketing roles in any industry. */
    headline: "Sales and Marketing | Business Development | Account Management | Marketing Strategy | Market Research",
    summary: "Sales and marketing professional with an MBA from IIM Jammu and a B.Tech in Electronics and Communication Engineering from NIT Puducherry. Sales experience across the full cycle: lead generation, cold outreach, account management, client presentations to senior decision-makers and closing. Marketing experience in positioning, customer research and campaign strategy, with one campaign doubling revenue within a month. An engineering background helps in learning new products quickly and explaining them simply to customers.",
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
    /* Extra poses, switched automatically: walking between stations, reaching
       up to a shelf, and handing over a cup. Same style as the idle image. */
    baristaPoses: {
      walk: "assets/pose-walk.webp",
      reach: "assets/pose-reach.webp",
      serve: "assets/pose-serve.webp",
      plate: "assets/pose-plate.webp",
      togo: "assets/pose-togo.webp",
      write: "assets/pose-write.webp",
      book: "assets/pose-book.webp",
      cloche: "assets/pose-cloche.webp",
      espresso: "assets/pose-espresso.webp",
    },
    /* Optional: put your PDF resume at assets/John-Paul-Minj-Resume.pdf and
       set this to that path. A download button appears in the CV view. */
    resumePdf: "assets/John-Paul-Minj-Resume.pdf",
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
        "Manage and grow a portfolio of European industrial accounts across Germany, Austria and Italy: account planning, follow-ups and meetings with owner-managers and senior decision-makers.",
        "Generate leads through company-specific cold email and cold-calling campaigns to German Mittelstand machine builders, securing introductory meetings with senior decision-makers.",
        "Develop tailored pitches by mapping each client's goals to Eckstein's Build-Operate-Transfer (BOT) and Global Engineering Centre (GEC) model, and qualify out opportunities where the model is not a fit.",
        "Conduct India market-entry research for German industrial machinery clients: market sizing, competitive landscape and target account segmentation.",
        "Lead India market discovery for a German packaging automation client, mapping production and packaging practices of Indian food manufacturers.",
        "Analyse and prioritise accounts in Microsoft Excel and maintain the account research database used by the sales team.",
        "Built the corporate pitch deck for European machinery SME audiences and delivered client presentations to senior European stakeholders.",
        "Prototyped a B2B sales CRM using AI-assisted development and wrote the 10-page Business Requirements Document (BRD) and feature specifications for the developer-led build.",
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
        "Led the marketing strategy for the turnaround of Gaudham Farm Stay: positioning, unique selling proposition (USP) and content themes for Instagram and campaigns.",
        "Conducted customer interviews with past guests by phone and used their feedback to define the USP and messaging.",
        "Selected keywords from customer conversations and worked with the SEO specialist to align them with high-volume search terms.",
        "Briefed the graphic design and content team on themes and keywords, reviewed performance and refined the content plan.",
        "Proposed a 10% returning-guest offer, agreed it with management and re-engaged past guests directly; revenue doubled within one month.",
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
        "Managed the full sales cycle for digital development courses: prospecting, qualification, objection handling and closing.",
        "Converted 14 of 60 qualified prospects into paying customers, a 23% conversion rate.",
        "Exceeded all assigned sales targets within a six-week engagement.",
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
      id: "bd-beans", cvTitle: "Sales and business development", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#B5452E", jarIndex: 0,
      name: "Business Development Beans",
      kind: "Single origin, ground daily",
      role: "Core skill",
      line: "The house blend behind every order on this menu.",
      notes: [
        "B2B sales, lead generation, cold email and cold calling.",
        "Prospect qualification, pipeline management, account research.",
        "Consultative selling, client presentations, proposal and pitch development.",
      ],
      cvNotes: [
        "Sales, B2B sales, business development, lead generation, cold email, cold calling, prospect qualification, pipeline management, account management, consultative selling, client presentations, proposal and pitch development.",
      ],
      tags: ["B2B", "Pipeline", "Pitching"],
    },
    {
      id: "strategy-beans", cvTitle: "Market research and strategy", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#2F5D8A", jarIndex: 1,
      name: "Market & Strategy Beans",
      kind: "Slow-roasted, pairs well with whiteboards",
      role: "Core skill",
      line: "Roasted for market-entry work across borders.",
      notes: [
        "Market-entry research, market sizing, competitive analysis.",
        "Account segmentation and customer segmentation.",
        "STP and SWOT analysis, go-to-market strategy.",
      ],
      cvNotes: [
        "Market-entry research, market sizing, competitive analysis, account segmentation, customer segmentation, STP analysis, SWOT analysis, go-to-market strategy.",
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
      cvNotes: [
        "Marketing strategy, positioning, USP development, customer interviews, keyword research, briefing creative teams, campaign performance analysis, Google Analytics.",
      ],
      tags: ["Strategy", "Positioning", "Customer insight"],
    },

    {
      id: "tools-blend", cvTitle: "Tools and languages", shelf: "bean-shelf", station: "shelf", art: "jar", jarColor: "#4E7A4A", jarIndex: 3,
      name: "Tool Shed Blend",
      kind: "Utility roast, always in the pocket",
      role: "Tools & languages",
      line: "Spreadsheet-strong, spec-writing ready.",
      notes: [
        "Microsoft Excel and Microsoft PowerPoint.",
        "CRM design and BRD documentation.",
        "English (fluent), Hindi (fluent).",
      ],
      cvNotes: [
        "Microsoft Excel, Microsoft PowerPoint, CRM design, Business Requirements Document (BRD) writing. Languages: English (fluent), Hindi (fluent).",
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
      cvNotes: [
        "Claude (Projects, Claude in PowerPoint) for on-brand client presentations; ChatGPT for first-pass market research; all output reviewed and fact-checked.",
      ],
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

  /* ---------- The bookshelf: my own writing ----------
     Add a post: copy one block, paste the link from LinkedIn (⋯ → Copy link to post).
     motif (cover drawing): mithai | journey | fridge | waves */
  writing: [
    {
      title: "Mithai, meet the machine",
      kicker: "What India's festive sweet rush can learn from European packing lines",
      date: "Nov 2026", platform: "LinkedIn", color: "#7A2E2E", motif: "mithai",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7525168368354549760/",
      excerpt: ["To meet Diwali demand, these companies produce a huge part of their year's volume in just a few weeks. And in most plants, a lot of it is still packed by hand.", "The interesting part is the recipe never changed. The taste never changed. Only the packing did."],
      summary: "My first Diwali in Pune: long queues at the sweet shops, and on the other side of the counter, festive volumes still packed by hand. European confectioners solved the same peak with robotic lines. The recipe never changed, only the packing did.",
    },
    {
      title: "From the sea to the mountains",
      kicker: "Port Blair, Karaikal, Jammu, Pune",
      date: "Nov 2026", platform: "LinkedIn", color: "#14354A", motif: "journey",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7522745172477255680/",
      excerpt: ["I grew up in Port Blair, in the Andaman and Nicobar Islands. Life on the islands is beautiful, and it has a pattern. I just felt a pull to see what was outside that loop.", "Confidence isn't something you're born with. You build it, one uncomfortable step at a time."],
      summary: "Why I left the calm island loop, what engineering and the MBA taught me, and how the quiet boy from Port Blair ended up talking to European companies every week. Confidence is built one uncomfortable step at a time.",
    },
    {
      title: "The 'kuch bhi bana do' fridge",
      kicker: "A product idea for Indian kitchens",
      date: "Sep 2025", platform: "LinkedIn", color: "#B07A1E", motif: "fridge",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7371494865907445760/",
      excerpt: ["Introducing our Smart Refrigerator with AI-powered Vegetable Shuffler, transforming the daily \"Kuch bhi bana do\" dilemma into effortless meal planning.", "Freshness tracking, recipe suggestions and smart inventory management, all designed for Indian families."],
      summary: "A campus product concept: a smart refrigerator that tracks freshness and suggests what to cook, built around the everyday Indian question of what to make tonight.",
    },
  ],

  /* ---------- Courses and certificates (shown under the bookshelf) ---------- */
  learning: [
    { title: "The Pre-Sales Engineer's Guide to Whiteboarding: Engaging Executives to Close Deals", by: "LinkedIn Learning", date: "May 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7460285457487122432/" },
    { title: "Building Interpersonal Communication and Relationships with Generative AI", by: "LinkedIn Learning", date: "May 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7460303322395291648/" },
    { title: "Foundations of Project Management", by: "Google", date: "Feb 2025",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7299021663155671040/" },
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
