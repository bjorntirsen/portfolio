import type {
  Area,
  ArchiveItem,
  ExperienceEntry,
  Project,
  SiteCopy,
} from "./types"

export const siteCopy: SiteCopy = {
  site_name: "bjorntirsen.se",
  status: "Now: identity platform @ SBAB",
  nav: [
    { id: "work", sort: 1, number: "01", label: "Work", href: "#work" },
    {
      id: "experience",
      sort: 2,
      number: "02",
      label: "Experience",
      href: "#experience",
    },
    { id: "about", sort: 3, number: "03", label: "About", href: "#about" },
    {
      id: "projects",
      sort: 4,
      number: "04",
      label: "Projects",
      href: "#projects",
    },
    {
      id: "contact",
      sort: 5,
      number: "05",
      label: "Contact",
      href: "#contact",
    },
  ],
  theme_toggle: {
    to_light_label: "Switch to light mode",
    to_dark_label: "Switch to dark mode",
  },
  hero: {
    eyebrow: "~/portfolio — v4.0.0",
    name: "Björn Tirsén",
    intro:
      "Software engineer in Stockholm. Full stack by training, platform engineer by habit — now building the identity platform behind login and digital signing at SBAB.",
    photo: { src: "/bjorn-tirsen.jpg", alt: "Björn Tirsén" },
    facts: [
      {
        id: "role",
        sort: 1,
        term: "role",
        value: "Software Engineer, SBAB",
        highlight: false,
      },
      {
        id: "focus",
        sort: 2,
        term: "focus",
        value: "Full stack & platform engineering",
        highlight: true,
      },
      {
        id: "now",
        sort: 3,
        term: "now",
        value: "Identity platform",
        highlight: false,
      },
      {
        id: "based",
        sort: 4,
        term: "based",
        value: "Stockholm, Sweden",
        highlight: false,
      },
    ],
  },
  stack: [
    "TypeScript",
    "React",
    "Node.js",
    "Java",
    "Spring",
    "Express",
    "Next.js",
    "OAuth 2.0 + OIDC",
    "CI/CD",
  ],
  areas_section: {
    heading: "What I work on",
    caption: "01 — Areas, roughly in the order I got to them",
  },
  experience_section: {
    heading: "Experience",
    caption: "02 — git log, newest first",
    current_label: "Current",
  },
  about: {
    caption: "03 — About",
    lead: "In the summer of 2019 I found out how much fun it is to code: an idea in the morning, a working program by evening. I haven't stopped since.",
    paragraphs: [
      "I came to software the long way round. I was a Personal Service Technician at Volvo Cars — a mechanic with my own customers, from booking to handover — then worked with manufacturing and continuous improvement at Scania, and spent five years living and working in the UK and France. Fixing cars turns out to be good training for debugging.",
      "Technology is half the job. The other half — solving problems together with a team, and making complicated things clear to the people who depend on them — is at least as interesting, and it’s where I do my best work.",
      "In code, I care about how easy it is to change: clear structure, no more moving parts than needed, and tooling that helps the next person.",
    ],
    off_the_clock_heading: "Off the clock",
    off_the_clock: [
      "Family",
      "Running",
      "Lifting heavy things",
      "Books",
      "Movies",
    ],
  },
  projects_section: {
    heading: "Projects",
    caption: "04 — Personal and school projects",
    repo_label: "Repo ↗",
    live_label: "Live site ↗",
  },
  archive_section: {
    heading: "Archive",
    caption: "Everything else, newest first",
    columns: {
      date: "Date",
      project: "Project",
      notes: "Notes",
      kind: "Type",
      links: "Links",
    },
    repo_label: "repo",
    live_label: "live",
    lessons_label: "Lessons learned",
  },
  contact: {
    caption: "05 — Contact",
    heading: "Say hej",
    text: "Always happy to talk shop — software engineering, platforms, authentication — or something else entirely.",
    links: [
      {
        id: "github",
        sort: 1,
        label: "GitHub",
        href: "https://github.com/bjorntirsen",
        arrow: "↗",
      },
      {
        id: "linkedin",
        sort: 2,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/bjorntirsen",
        arrow: "↗",
      },
    ],
  },
  footer: {
    copyright: "Björn Tirsén · Stockholm",
    colophon: "Built with Next.js · Kept fresh by Renovate",
  },
}

export const areas: Area[] = [
  {
    id: "full-stack",
    sort: 1,
    title: "Full stack",
    description:
      "Where I started, and still home. React and TypeScript in the browser, Node.js or Java behind it, a relational or document database underneath, and features carried from data model to deploy.",
    tools:
      "TypeScript · React · Next.js · Node.js · Express · Java · Spring · SQL · MongoDB",
  },
  {
    id: "platform-engineering",
    sort: 2,
    title: "Platform engineering",
    description:
      "Shared libraries, tooling and infrastructure that many teams depend on at once: dependency management, testing, CI/CD, and keeping a large monorepo modular.",
    tools: "Monorepos · shared packages · testing · CI/CD",
  },
  {
    id: "identity-auth",
    sort: 3,
    title: "Identity & auth",
    description:
      "My newest area. Authentication and digital signing services in Java and Spring, built on OAuth 2.0, OpenID Connect and BankID. Still plenty to learn.",
    tools: "Java · Spring · OAuth 2.0 · OpenID Connect · BankID",
  },
  {
    id: "engineering-practice",
    sort: 4,
    title: "Engineering practice",
    description:
      "Less unnecessary complexity, clearer boundaries, and code that is easy to change. A real interest in architecture, worked on from inside the team.",
    tools: "Maintainability · modularity · code review · collaboration",
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: "sbab-identity-platform",
    sort: 1,
    period: "Sep 2026 – now",
    is_current: true,
    title: "Identity platform",
    org: "Software Engineer · SBAB",
    description:
      "Authentication and digital signing for the bank, with Java, Spring, OAuth 2.0, OpenID Connect and Swedish BankID.",
  },
  {
    id: "sbab-web-platform",
    sort: 2,
    period: "Apr 2024 – Sep 2026",
    is_current: false,
    title: "Web platform & developer experience",
    org: "Software Engineer · SBAB",
    description:
      "Started in the Developer Experience team, which later became Web Platform & Design System. Shared platforms, libraries and tooling used by development teams across the bank — mostly about maintainability: how teams share code and infrastructure, a large TypeScript monorepo, and making a big backend-for-frontend more modular.",
  },
  {
    id: "sbab-public-websites",
    sort: 3,
    period: "Aug 2022 – Apr 2024",
    is_current: false,
    title: "Public websites & digital sales",
    org: "Software Engineer · SBAB",
    description:
      "Helped start the move to a headless CMS and server-side rendering for the bank’s public websites.",
  },
  {
    id: "handelsbanken",
    sort: 4,
    period: "Nov 2021 – Aug 2022",
    is_current: false,
    title: "Web platform",
    org: "Web Developer (intern first) · Handelsbanken",
    description:
      "On team Iglesias, the team behind code shared by about 20 of the bank’s web apps. Migrated reusable components from legacy technology to React without breaking the apps that depended on them, and kept shared dependencies and test tooling up to date.",
  },
  {
    id: "nackademin",
    sort: 5,
    period: "2020 – May 2022",
    is_current: false,
    title: "Full Stack Open Source",
    org: "Nackademin",
    description:
      "Two-year web development program. Most of the projects below come from here.",
  },
  {
    id: "self-taught",
    sort: 6,
    period: "2019 – 2020",
    is_current: false,
    title: "Hello, world",
    org: "Evening courses in Java",
    description:
      "Found out how much fun programming is, then spent almost a year of evenings learning Java before going full time.",
  },
  {
    id: "before-code",
    sort: 7,
    period: "Before code",
    is_current: false,
    title: "Cars, factories, abroad",
    org: "Volvo Cars · Scania · UK & France",
    description:
      "Personal Service Technician at Volvo Cars — a mechanic with my own customers, from booking to handover. Then manufacturing and continuous improvement at Scania, and five years living and working in the UK and France.",
  },
]

// Links are only rendered when a URL is set. Repo and live URLs come from the
// old portfolio API data (docs/old_portfolio.json in git history); dead links
// were left out.
export const projects: Project[] = [
  {
    id: "will-my-tokens-last",
    sort: 1,
    label: "#01",
    date: "2026-04",
    kind: "Solo",
    title: "Will My Tokens Last?",
    description:
      "Paces AI token usage across the working days left in the month, with Swedish holidays, custom days off and half-days, calendar views and Swedish/English UI.",
    tags: ["React", "TypeScript", "Vite", "GitHub Actions"],
    repo_url: "https://github.com/bjorntirsen/will-my-tokens-last",
    live_url: "https://bjorntirsen.github.io/will-my-tokens-last/",
  },
  {
    id: "bt-auth",
    sort: 2,
    label: "#02",
    date: "2026-06",
    kind: "Solo",
    title: "bt-auth",
    description:
      "Work in progress: an identity provider built by hand to learn OAuth and OIDC from the ground up. React client and Express BFF in front of a Spring Boot authorization server.",
    tags: ["React", "Express", "Spring Boot", "Docker"],
    repo_url: "https://github.com/bjorntirsen/bt-auth",
    live_url: "https://auth.bjorntirsen.se/",
  },
  {
    id: "couples-expenses",
    sort: 3,
    label: "#03",
    date: "2021-11",
    kind: "Solo",
    title: "Couples Expenses",
    description:
      "Splits shared household expenses month by month. My first TypeScript and Next.js app, responsive from the start.",
    tags: ["TypeScript", "Next.js", "Responsive"],
    repo_url: "https://github.com/bjorntirsen/couples-expenses",
    live_url: null,
  },
  {
    id: "cats-and-dogs",
    sort: 4,
    label: "#04",
    date: "2021-10",
    kind: "Group",
    title: "Cats & Dogs",
    description:
      "A full MERN webshop for pet supplies, from product catalog to cart. Built with a team.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    repo_url: "https://github.com/bjorntirsen/mern-catsanddogs",
    live_url: "https://mern-catsanddogs.netlify.app/",
  },
]

interface ArchiveExtras {
  repo?: string
  live?: string
  lessons?: string[]
}

type ArchiveRow = [
  date: string,
  title: string,
  description: string,
  kind: ArchiveItem["kind"],
  extras?: ArchiveExtras,
]

// Repo and live URLs and lessons learned come from the old portfolio API data
// (docs/old_portfolio.json in git history); dead links were left out.
// Links are only rendered when a URL is set.
const archiveRows: ArchiveRow[] = [
  [
    "2025-02-01",
    "Portfolio 3.0",
    "Previous version of this site. Next.js and Supabase, with Renovate and GitHub Actions.",
    "Solo",
    { repo: "https://github.com/bjorntirsen/portfolio/tree/v3.0" },
  ],
  [
    "2021-11-25",
    "Markdown Reminders",
    "MERN to-do app where every reminder is written in Markdown.",
    "Group",
    { repo: "https://github.com/saraavvi/todo-react-frontend" },
  ],
  [
    "2021-09-20",
    "Developing the Developer 2.0",
    "Previous portfolio. Create React App, REST API, CSS modules, Bootstrap.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/portfolio-2",
      live: "https://bjorntirsen-portfolio.netlify.app",
      lessons: [
        "It was fun to make my first front end for my new portfolio API. With this, I can update my portfolio very quickly.",
      ],
    },
  ],
  [
    "2021-05-28",
    "ManCave",
    "PHP, MySQL and EJS webshop. Responsive.",
    "Group",
    {
      repo: "https://github.com/saraavvi/mancave",
      lessons: [
        "Made using vanilla PHP, a MySQL database and EJS templating.",
        "The code design is object oriented with an MVC structure and using dependency injection. We have tried to write descriptive, relatively short public methods in the classes that utilize helper methods to get the job done.",
      ],
    },
  ],
  [
    "2021-05-10",
    "The Fakestore Creator",
    "PHP: paste a product REST API, get a generated store. Grew out of my first PHP fakestore.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/bjorns_fakestore_creator",
      lessons: [
        "I wanted to experiment a little with generating visual representations from a REST API. My plan was to let you customize how you could display the data.",
        "We’ll see if I’ll make an improved version in the future...",
      ],
    },
  ],
  [
    "2021-03-28",
    "Wack",
    "Slack-style chat on Node, Express, MongoDB, Socket.IO.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/wack",
      lessons: [
        "Individual project. My first fullstack project. Made with Node/Express/MongoDB/Socket.IO/EJS.",
        "It took some time to learn how to use Socket.IO and websockets. And I could do with practicing it more.",
        "After several projects built using Bootstrap I wanted to get back to basics and used vanilla CSS to style this one.",
      ],
    },
  ],
  [
    "2021-01-17",
    "MIB Customer Data",
    "React customer data app, later backed by my own Node.js + MongoDB CRUD API. Responsive.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/MIB-customer-data",
      live: "https://mib-customer-data.netlify.app/",
      lessons: [
        "In this individual project I learned how to use the hook “useContext”, as well as working with form validation and login functionality in a React app.",
        "We made use of a RESTful CRUD API provided by our teacher.",
      ],
    },
  ],
  [
    "2020-12-20",
    "EZORRO!",
    "Stock market site in React. Responsive.",
    "Group",
    {
      repo: "https://github.com/bjorntirsen/eZorro",
      live: "https://ezorro.netlify.app/",
      lessons: [
        "We made this site with create-react-app and Bootstrap with a custom color palette. It is connected to a small read-only database on Firebase via an API.",
        "We made a dynamic arrow icon with styled-components (and Font Awesome) that is used on the currency and markets detail pages.",
        "With this site we have used Bootstrap’s responsive classes for the layout. A first for me.",
      ],
    },
  ],
  [
    "2020-11-13",
    "Developing the Developer 1.0",
    "First portfolio. Retired.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/portfolio-1",
      lessons: [
        "I started the site by using Bootstrap 5 Alpha and customized the classes a bit as well as adding my own color palette. As you can see it’s autumn themed.",
        "But because the project required us to show we can use grid and flexbox I used that for the main layout of the page instead of Bootstrap’s classes.",
        "I used media queries and responsive images for the first time to make the site responsive.",
        "Of course, I also had to use some Font Awesome icons. I didn’t use any JS on this project other than Bootstrap’s built-in JS.",
      ],
    },
  ],
  [
    "2020-10-30",
    "ACME Events",
    "Events site on Local Storage, in Swedish.",
    "Group",
    {
      repo: "https://github.com/bjorntirsen/event_project",
      live: "https://bjorntirsen.github.io/event_project/",
      lessons: [
        "For this group project we were asked to create functionality for “CRUDing” events to/from Local Storage (LS). We opted for translating all JS event objects into JSON and saving them as one JSON object in LS each time any changes were made.",
        "If you load the page without any events already in LS, our JS will create five “default events” and save them there.",
      ],
    },
  ],
  [
    "2020-10-12",
    "JavaScript Quiz",
    "Quiz that loads questions from a REST API.",
    "Solo",
    {
      repo: "https://github.com/bjorntirsen/quiz_project",
      live: "https://bjorntirsen.github.io/quiz_project/",
      lessons: [
        "We were asked to make a quiz web app by fetching questions from a REST API. This was interesting, because I had never used an API before and also never used async JavaScript.",
        "I chose to do this by making two HTML pages where the first is actually a form for choosing how many questions you want. The second HTML page is kind of a SPA (single-page application).",
        "If you pay attention, you might notice that there is a “fetching questions” text displayed for a fraction of a second before the “start quiz” button appears.",
      ],
    },
  ],
  [
    "2020-09-24",
    "Yahtzee",
    "Browser dice game.",
    "Group",
    {
      repo: "https://github.com/bjorntirsen/yatzy_project",
      live: "https://yatzy-project.netlify.app/",
      lessons: [
        "For our first school project we were asked to make a Yahtzee game from scratch using JavaScript.",
        "We were introduced to DOM manipulation, object-oriented coding as well as basic HTML and CSS during our development of the site.",
        "Though we wanted to do more with this site, we didn’t find the time to complete the full functionality that we had intended. In order to meet the deadline, we opted for a very simple final product.",
        "Actually not bad for four guys completely new to web development to throw together in two weeks!",
      ],
    },
  ],
  [
    "2020-05-31",
    "Dice Game",
    "Where it started: a small Java game.",
    "Solo",
    {
      live: "https://www.jdoodle.com/ia/h99",
      lessons: [
        "One of the few things I have written in Java. Enable “Interactive” to try the game out. In English.",
      ],
    },
  ],
]

export const archive: ArchiveItem[] = archiveRows.map(
  ([date, title, description, kind, extras = {}], index) => ({
    id: `${date}-${title}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    sort: index + 1,
    date,
    title,
    description,
    kind,
    repo_url: extras.repo ?? null,
    live_url: extras.live ?? null,
    lessons: extras.lessons,
  }),
)
