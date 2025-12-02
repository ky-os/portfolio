import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

interface Project {
  title: string;
  role: string;
  company?: string;
  date: string;
  description: string[];
  techStack: string[];
  link?: string;
  logo?: string;
}

const projects: Project[] = [
  {
    title: "Legacy Platform Revamp & Email System",
    role: "Software Engineer I",
    company: "SolX Technologies Inc.",
    date: "July 2024 - November 2025",
    description: [
      "Revamped large-scale legacy platform with React and Tailwind CSS.",
      "Engineered email notification system using React Email and Amazon SES.",
      "Optimized data loading with React Router, reducing MobX complexity.",
      "Refactored forms using Formik and Yup.",
      "Developed map-based visualization with Leaflet.",
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "Amazon SES",
      "React Email",
      "MobX",
      "Formik",
      "Yup",
      "Leaflet",
      "Next.js",
    ],
    link: "https://solx.ph",
    logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
  },
  {
    title: "FlashCargo",
    role: "Software Engineer",
    company: "StackTrek",
    date: "August 2023 - July 2025",
    description: [
      "Developed AI-assisted form-filling feature for logistics.",
      "Integrated Gemini API for real-time suggestions on shipment forms.",
    ],
    techStack: ["Gemini API", "AI Integration", "React"],
    link: "https://www.flashcargo.ai/",
  },
  {
    title: "Studio-West Project (Doc Comparison)",
    role: "Software Engineer",
    company: "StackTrek",
    date: "August 2023 - July 2025",
    description: [
      "AI-powered proof-of-concept for document comparison.",
      "Integrated MS Power Apps, SharePoint, and OpenAI API.",
    ],
    techStack: ["MS Power Apps", "SharePoint", "OpenAI API"],
    link: "#",
  },
  {
    title: "MySuperCheck",
    role: "Software Engineer",
    company: "StackTrek",
    date: "August 2023 - July 2025",
    description: [
      "Data scraping solution using Playwright.",
      "Dynamic blog with Strapi CMS and NextAuth.",
    ],
    techStack: ["Playwright", "ElasticSearch", "Strapi", "NextAuth", "Drizzle ORM"],
    link: "https://mysupercheck.com/",
    logo: "https://www.google.com/s2/favicons?domain=mysupercheck.com&sz=128",
  },
  {
    title: "MyBlissmi",
    role: "Software Engineer",
    company: "StackTrek",
    date: "August 2023 - July 2025",
    description: [
      "Maintained React, Vue.js, Node.js repositories.",
      "Managed deployments to DigitalOcean.",
    ],
    techStack: ["React", "Vue.js", "Node.js", "DigitalOcean"],
    link: "https://myblissmi.com/",
  },
  {
    title: "Cult Cellar",
    role: "Software Engineer",
    company: "StackTrek",
    date: "August 2023 - July 2025",
    description: [
      "E-commerce features using Next.js.",
      "Shopify API integration.",
    ],
    techStack: ["Next.js", "Shopify API"],
    link: "https://www.cultcellar.com/",
    logo: "https://www.google.com/s2/favicons?domain=cultcellar.com&sz=128",
  },
  {
    title: "Mobile App Development",
    role: "Frontend Developer Intern",
    company: "ztock®",
    date: "November 2022 - March 2023",
    description: [
      "Built mobile app using React Native.",
      "Backend development with GraphQL and Rust.",
    ],
    techStack: ["React Native", "GraphQL", "Rust", "Apollo"],
    link: "#",
  },
  {
    title: "Inventory Management System",
    role: "Freelance Full-Stack Developer",
    company: "B&E Computer Sales",
    date: "July 2020 - May 2021",
    description: ["Custom POS-like inventory management system."],
    techStack: ["React", "GraphQL", "PostgreSQL"],
    link: "#",
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
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Kyle Osunero</h1>
        <p className="text-xl text-gray-400">
          Software Engineer | Full-Stack Developer
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-gray-400">
          <a
            href="mailto:kyle.osunero.21@gmail.com"
            className="hover:text-blue-400"
          >
            Email
          </a>
          <span>|</span>
          <Link
            href="/linkedin"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            LinkedIn
          </Link>
          <span>|</span>
          <Link
            href="/github"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            GitHub
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto relative border-l-2 border-gray-700 ml-4 md:ml-auto">
        {projects.map((project, index) => (
          <div key={index} className="mb-10 ml-6 relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[35px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-4 ring-gray-900">
              <svg
                className="h-3 w-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* Content Card */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div className="flex items-start gap-4">
                  {project.logo && (
                    <Image
                      src={project.logo}
                      alt={`${project.title} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg bg-white p-1 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">
                      {project.title}
                    </h3>
                    <p className="text-md font-semibold text-gray-300">
                      {project.role}{" "}
                      {project.company && `at ${project.company}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 mt-1 md:mt-0 bg-gray-900 px-2 py-1 rounded whitespace-nowrap">
                  {project.date}
                </span>
              </div>

              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1 mt-4">
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>

              <div className="mb-4">
                <h4 className="text-xs uppercase text-gray-500 font-bold mb-2 tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-gray-700 text-blue-300 rounded-md border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 hover:underline"
                >
                  View Project{" "}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
