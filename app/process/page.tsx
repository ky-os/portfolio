import React from "react";
import Link from "next/link";
import ProcessStep from "../components/ProcessStep";

export const metadata = {
  title: "Development Process | Kyle Osunero",
  description: "My AI-augmented development workflow powered by the BMAD Method.",
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
      <header className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/0 to-gray-900/0 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Link href="/" className="mb-8 text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
            Development Process
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            An agile, AI-augmented workflow powered by the <span className="text-purple-400 font-medium">BMAD Method</span>.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-12">
        <ProcessStep
          index={0}
          title="Analysis & Planning"
          role="Product Manager & Analyst"
          bmadRole="Analyst & PM Agents"
          imagePath="/devs/analyst.png"
          description="Phase 1 & 2. The Analyst conducts research and market analysis. The PM defines scope and creates the Product Requirements Document (PRD)."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />

        <ProcessStep
          index={1}
          title="Solutioning"
          role="System Architect"
          bmadRole="Architect Agent"
          imagePath="/devs/archetect.png"
          description="Phase 3. The Architect designs the system architecture, selects the tech stack, and validates technical feasibility against the PRD."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <ProcessStep
          index={2}
          title="Implementation"
          role="Full Stack Developer"
          bmadRole="Scrum Master & Developer"
          imagePath="/devs/developer.png"
          description="Phase 4. The Scrum Master breaks down features into user stories. The Developer implements them one by one in sprints."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />

        <ProcessStep
          index={3}
          title="Quality Assurance"
          role="QA Engineer"
          bmadRole="Test Architect (TEA)"
          imagePath="/devs/QA.png"
          description="Continuous. The Test Architect defines the test strategy, generates automated test cases, and ensures comprehensive coverage."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          isLast={true}
        />
      </main>
    </div>
  );
}
