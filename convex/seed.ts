import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

const experiences = [
  {
    id: "solx",
    name: "SolX Technologies Inc.",
    role: "Software Engineer",
    period: "July 2024 - November 2025",
    logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
    url: "https://solx.ph",
    description: "Leading backend development and system architecture.",
  },
  {
    id: "stacktrek",
    name: "StackTrek",
    role: "Full Stack Developer",
    period: "August 2023 - July 2025",
    logo: "https://www.google.com/s2/favicons?domain=stacktrek.com&sz=128",
    url: "https://stacktrek.com",
    description:
      "Developed scalable web applications and mentored junior devs.",
  },
  {
    id: "ztock",
    name: "ztock",
    role: "Frontend Developer",
    period: "November 2022 - March 2023",
    logo: null,
    url: "#",
    description:
      "Built responsive user interfaces for financial data visualization.",
  },
  {
    id: "be-computer",
    name: "B&E Computer Sales",
    role: "IT Specialist",
    period: "July 2020 - May 2021",
    logo: null,
    initials: "B&E",
    url: "#",
    description:
      "Managed hardware and software solutions for enterprise clients.",
  },
];

const projects = [
  {
    title: "SolX Sales-Ops Admin Tool",
    role: "Software Engineer I",
    company: "SolX Technologies Inc.",
    experienceId: "solx",
    date: "September 2025 - November 2025",
    description: [
      "Architected a multi-provider mapping solution (Google Maps, Stadia Maps, Leaflet) to visualize complex geospatial data, including custom boundaries and facility clustering.",
      "Designed a type-safe backend layer using Next.js Server Actions and Drizzle ORM, eliminating the need for a separate API layer.",
      "Developed a robust form system using React Hook Form and Zod, implementing reusable input components for complex data models.",
      "Engineered the 'Bundling' feature, a complex many-to-many asset management interface for linking facilities to renewable energy portfolios.",
    ],
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Leaflet",
      "React Leaflet",
      "PostgreSQL",
      "Drizzle ORM",
      "React Hook Form",
      "Zod",
      "Server Actions",
    ],
    link: "https://solx.ph",
    logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
    category: "work",
    xp: 2500,
  },
  {
    title: "SolX Digital Demand Supply Matching (DDSM) Platform",
    role: "Software Engineer I",
    company: "SolX Technologies Inc.",
    experienceId: "solx",
    date: "July 2024 - September 2025",
    description: [
      "Designed and implemented a cron job system to automatically update sourcing event statuses, ensuring data consistency.",
      "Developed end-to-end 'Suppliers' management with custom selection modals and robust validation using Yup.",
      "Integrated AWS SES for transactional emails and implemented responsive templates using React Email.",
      "Architected complex, multi-step 'New Offer' forms using Formik with dynamic field arrays for fees and contracts.",
      "Refactored legacy MobX stores into local React state and Formik contexts, optimizing application performance.",
      "Implemented server-side sorting and filtering for the Admin Dashboard to efficiently manage large datasets.",
      "Created a reusable component library to enforce consistent design patterns across the application.",
    ],
    techStack: [
      "React 17",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Sequelize",
      "PostgreSQL",
      "React Query",
      "Redux",
      "AWS SES",
      "React Email",
      "Docker",
      "Nginx",
      "Jenkins",
      "Yup",
      "Swagger",
      "Lerna",
    ],
    link: "https://solx.ph",
    logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
    category: "work",
    xp: 2500,
  },
  {
    title: "FlashCargo",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "February 2025 - July 2025",
    description: [
      "Integrated OpenAI to automate logistics data entry, reducing manual effort by auto-generating commodity and pack type suggestions.",
      "Developed a full-stack booking management system with status tracking and real-time comments using Next.js, Prisma, and PostgreSQL.",
      "Engineered complex, multi-step quotation forms for Air, Land, and Sea freight with robust Zod validation and dynamic state management.",
      "Optimized admin workflows by standardizing UI components and implementing mobile-responsive designs for carrier management pages.",
    ],
    techStack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Tailwind CSS",
      "Lucia Auth",
      "Zod",
      "OpenAI API",
      "Docker",
      "AWS",
    ],
    link: "https://www.flashcargo.ai/",
    logo: "https://icons.duckduckgo.com/ip3/www.flashcargo.ai.ico",
    category: "work",
    xp: 2000,
  },
  {
    title: "Advanced (AI Onboarding)",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "April 2025 - June 2025",
    description: [
      "Architected resilient ID capture and verification pipeline with webcam support and OpenAI integration.",
      "Implemented registrant management features including dynamic course selection and batch operations.",
      "Built diploma upload experience with refined UI/UX for mobile and desktop.",
      "Developed full-stack SSR application using React Router 7 and Cloudflare Workers.",
    ],
    techStack: [
      "React Router 7",
      "Cloudflare Workers",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenAI SDK",
      "Cloudflare R2",
      "Tailwind CSS",
      "TypeScript",
    ],
    link: "https://www.advanced.ph/",
    logo: "https://www.google.com/s2/favicons?domain=www.advanced.ph&sz=128",
    category: "work",
    xp: 1500,
  },
  {
    title: "AI Document Discrepancy Scanner",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "January 2025 - February 2025",
    description: [
      "AI-powered proof-of-concept for document comparison.",
      "Integrated MS Power Apps, SharePoint, and OpenAI API.",
    ],
    techStack: ["MS Power Apps", "SharePoint", "OpenAI API"],
    link: "#",
    category: "work",
  },
  {
    title: "MySuperCheck",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "August 2024 - January 2025",
    description: [
      "Developed a full-stack directory platform using Next.js 14, TypeScript, and PostgreSQL.",
      "Engineered a custom search experience with Elasticsearch, supporting location and availability filtering.",
      "Integrated OpenAI to automate data cleaning and formatting for thousands of business records.",
      "Implemented robust authentication flows including social login, email verification, and password recovery.",
      "Built a comprehensive request management system for professional profile updates and admin approvals.",
    ],
    techStack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Elasticsearch",
      "Redis",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "OpenAI API",
      "Google Maps API",
      "Docker",
      "AWS S3",
      "Playwright",
    ],
    link: "https://mysupercheck.com/",
    logo: "https://www.google.com/s2/favicons?domain=mysupercheck.com&sz=128",
    category: "work",
  },
  {
    title: "MyBlissmi",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "November 2023 - August 2024",
    description: [
      "Engineered robust booking management features including cancellation workflows, rescheduling conflict resolution, and precise timezone handling.",
      "Optimized service discovery by implementing advanced category filtering and enhancing SEO metadata for blog and service pages.",
      "Boosted user engagement by integrating a newsletter subscription flow, deploying a 'Service Quiz', and adding a dynamic reviews section.",
      "Strengthened application security by implementing JWT token refresh mechanisms, secure logout flows, and integrated authentication.",
      "Enhanced monetization features by refactoring membership duration logic and implementing automated premium membership notifications via Stripe.",
      "Improved application performance by refactoring core search logic, optimizing query parameter handling, and standardizing responsive design patterns.",
    ],
    techStack: [
      "Next.js",
      "React",
      "Vue.js",
      "Node.js",
      "Express.js",
      "MariaDB",
      "Framework7",
      "Redux Toolkit",
      "Socket.io",
      "Stripe",
      "Mapbox GL",
      "Klaviyo",
    ],
    link: "https://myblissmi.com/",
    logo: "/Blissmi Health_id_ARLa6T6_0.png",
    category: "work",
  },
  {
    title: "Cult Cellar",
    role: "Software Engineer",
    company: "StackTrek",
    experienceId: "stacktrek",
    date: "August 2023 - November 2023",
    description: [
      "Developed responsive authentication, account, and product pages using Next.js and Tailwind CSS, ensuring a seamless user experience.",
      "Implemented secure authentication flows using NextAuth and integrated Shopify API for user account connection and product data querying.",
      "Collaborated with cross-functional teams in a Kanban environment to implement UI/UX improvements and deliver robust e-commerce features.",
      "Developed and maintained secure APIs for user management and product operations while participating in code reviews to ensure code quality.",
    ],
    techStack: ["Next.js", "Tailwind CSS", "NextAuth", "Shopify API"],
    link: "https://www.cultcellar.com/",
    logo: "https://www.google.com/s2/favicons?domain=cultcellar.com&sz=128",
    category: "work",
  },
  {
    title: "Ztock",
    role: "Frontend Developer Intern",
    company: "ztock®",
    experienceId: "ztock",
    date: "November 2022 - March 2023",
    description: [
      "Built the Ztock mobile app using React Native.",
      "Contributed to backend development with GraphQL and Ruby on Rails.",
    ],
    techStack: ["React Native", "GraphQL", "Ruby on Rails", "Apollo"],
    link: "#",
    category: "work",
  },
  {
    title: "Inventory Management System",
    role: "Freelance Full-Stack Developer",
    company: "B&E Computer Sales",
    experienceId: "be-computer",
    date: "July 2020 - May 2021",
    description: ["Custom POS-like inventory management system."],
    techStack: ["React", "GraphQL", "PostgreSQL"],
    link: "#",
    category: "work",
  },
  {
    title: "Arduino-Based PCR Thermocycler",
    role: "Personal Project",
    company: "Personal",
    date: "N/A",
    description: [
      "Low-cost PCR thermocycler for DNA amplification.",
      "Precise heating/cooling cycles.",
    ],
    techStack: ["C++", "Arduino", "PID Control", "Embedded Systems"],
    link: "https://github.com/ky-os/Arduino-Thermocycler",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    category: "personal",
    xp: 0
  },
  {
    title: "Portfolio Website",
    role: "Personal Project",
    company: "Personal",
    date: "2025",
    description: [
      "This portfolio website built with Next.js and Tailwind CSS.",
      "Showcasing my projects and skills.",
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/ky-os/portfolio",
    category: "personal",
    xp: 0
  },
];

const featuredCompany = {
  name: "SolX Technologies Inc.",
  role: "Software Engineer I",
  period: "July 2024 - November 2025",
  status: "Contract Completed",
  description:
    "A leading energy technology company in the Philippines, providing digital solutions for the power sector. I played a key role in developing their core platforms, focusing on scalability, performance, and user experience.",
  logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
  url: "https://solx.ph",
  highlights: [
    "Architected a multi-provider mapping solution for geospatial data visualization.",
    "Designed type-safe backend layers using Next.js Server Actions and Drizzle ORM.",
    "Developed robust form systems for complex data models using React Hook Form and Zod.",
    "Engineered complex asset management interfaces for renewable energy portfolios.",
    "Implemented automated cron job systems for data consistency.",
    "Refactored legacy codebases to modern React patterns for better performance.",
  ],
};

const bookmarks = [
  {
    title: "Vite",
    description:
      "Next Generation Frontend Tooling. Fast and opinionated build tool.",
    techStack: ["React", "Vue", "Svelte", "Preact", "Lit", "Vanilla JS"],
    link: "https://vitejs.dev/",
    category: "Full Stack Development",
    logo: "https://www.google.com/s2/favicons?domain=vitejs.dev&sz=128",
  },
  {
    title: "Spring Boot",
    description:
      "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can \"just run\".",
    techStack: ["Java", "Kotlin", "Groovy"],
    link: "https://spring.io/projects/spring-boot",
    category: "Full Stack Development",
    logo: "https://www.google.com/s2/favicons?domain=spring.io&sz=128",
  },
  {
    title: "Better T Stack",
    description:
      "A modular, type-safe full-stack generator. Supports TanStack Start, Hono, Bun, and more.",
    techStack: [
      "TanStack Start",
      "Hono",
      "Bun",
      "Drizzle",
      "Better-Auth",
      "tRPC",
    ],
    link: "https://www.better-t-stack.dev/new",
    category: "Full Stack Development",
    logo: "https://www.google.com/s2/favicons?domain=better-t-stack.dev&sz=128",
  },
  {
    title: "Create T3 App",
    description: "The best way to start a full-stack, typesafe Next.js app.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "tRPC",
      "NextAuth.js",
    ],
    link: "https://create.t3.gg/",
    category: "Full Stack Development",
    logo: "https://www.google.com/s2/favicons?domain=create.t3.gg&sz=128",
  },
  {
    title: "TanStack",
    description:
      "High-quality open-source software for web developers. Includes Query, Table, Router, and more.",
    techStack: ["React", "Vue", "Svelte", "Solid", "Angular"],
    link: "https://tanstack.com/",
    category: "Full Stack Development",
    logo: "https://www.google.com/s2/favicons?domain=tanstack.com&sz=128",
  },
  {
    title: "v0",
    description:
      "Generative UI system by Vercel. Generate UI components with AI.",
    techStack: ["React", "Tailwind CSS", "shadcn/ui"],
    link: "https://v0.dev/",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=v0.dev&sz=128",
  },
  {
    title: "Lovable",
    description:
      "AI-powered web builder that turns ideas into production-ready code.",
    techStack: ["React", "Tailwind CSS", "Supabase"],
    link: "https://lovable.dev/",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=lovable.dev&sz=128",
  },
  {
    title: "Bolt",
    description: "AI-powered development environment in the browser.",
    techStack: ["WebContainers", "Node.js"],
    link: "https://bolt.new/",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=bolt.new&sz=128",
  },
  {
    title: "Chef by Convex",
    description: "AI assistant for building full-stack apps with Convex.",
    techStack: ["Convex", "React", "Next.js"],
    link: "https://convex.dev/",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=convex.dev&sz=128",
  },
  {
    title: "BMAD Method",
    description:
      "A universal AI agent framework that orchestrates specialized AI agents to work together in a collaborative multi-agent system.",
    techStack: [
      "Multi-Agent Systems",
      "AI Agents",
      "Agile",
      "LLM Orchestration",
    ],
    link: "https://github.com/bmad-code-org/BMAD-METHOD",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  },
  {
    title: "Serena (MCP Server)",
    description:
      "A powerful coding agent toolkit and MCP server that provides semantic code retrieval, navigation, and editing capabilities.",
    techStack: ["MCP", "Semantic Search", "LSP", "Coding Agent"],
    link: "https://github.com/oraios/serena",
    category: "AI Coding & Prototyping",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  },
];

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear existing data (optional, but good for clean slate)
    const existingExperiences = await ctx.db.query("experiences").collect();
    for (const exp of existingExperiences) await ctx.db.delete(exp._id);

    const existingProjects = await ctx.db.query("projects").collect();
    for (const proj of existingProjects) await ctx.db.delete(proj._id);

    const existingBookmarks = await ctx.db.query("bookmarks").collect();
    for (const bm of existingBookmarks) await ctx.db.delete(bm._id);

    const existingFeatured = await ctx.db.query("featuredCompany").collect();
    for (const fc of existingFeatured) await ctx.db.delete(fc._id);

    // 2. Seed Experiences
    const experienceIdMap = new Map<string, any>();
    for (const exp of experiences) {
      const { id, logo, ...rest } = exp;
      const newId = await ctx.db.insert("experiences", {
        ...rest,
        slug: id,
        logo: logo === null ? undefined : logo,
      });
      experienceIdMap.set(id, newId);
    }

    // 3. Seed Projects
    for (const proj of projects) {
      const { experienceId, logo, link, xp, ...rest } = proj;
      let convexExperienceId = undefined;
      if (experienceId) {
        convexExperienceId = experienceIdMap.get(experienceId);
      }

      await ctx.db.insert("projects", {
        ...rest,
        experienceId: convexExperienceId,
        logo: logo === null ? undefined : logo,
        link: link === null ? undefined : link,
        xp: xp === undefined ? 0 : xp,
        category: proj.category as "work" | "personal",
      });
    }

    // 4. Seed Bookmarks
    for (const bm of bookmarks) {
      await ctx.db.insert("bookmarks", bm);
    }

    // 5. Seed Featured Company
    await ctx.db.insert("featuredCompany", featuredCompany);
  },
});
