import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProcessStep = ({
  title,
  role,
  description,
  icon,
  isLast = false,
  bmadRole,
  personaSeed,
}: {
  title: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
  bmadRole: string;
  personaSeed: string;
}) => (
  <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
    {/* Line connecting steps */}
    {!isLast && (
      <div className="hidden md:block absolute left-[36px] top-16 bottom-0 w-0.5 bg-gray-800 group-hover:bg-blue-500/50 transition-colors duration-500"></div>
    )}

    {/* Icon Bubble */}
    <div className="relative z-10 shrink-0 w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center shadow-lg group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-300 self-start">
      <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
        {icon}
      </div>
    </div>

    {/* Content Card */}
    <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         {/* Background Persona Watermark */}
         <Image
            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${personaSeed}`}
            alt="Persona Watermark"
            width={100}
            height={100}
            className="w-24 h-24 grayscale"
            unoptimized
          />
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
             <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider border border-gray-800 px-2 py-0.5 rounded bg-gray-950">
              {role}
            </span>
          </div>
          
          <p className="text-gray-400 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* AI Persona Card */}
        <div className="shrink-0 w-full md:w-48 bg-gray-950/50 rounded-lg p-4 border border-gray-800/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-3 rounded-full bg-purple-500/10 border border-purple-500/20 p-1">
                 <Image
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${personaSeed}`}
                    alt={`${bmadRole} Avatar`}
                    width={64}
                    height={64}
                    className="w-full h-full rounded-full"
                    unoptimized
                  />
            </div>
            <div className="text-sm font-bold text-purple-300 mb-1">{bmadRole}</div>
            <div className="text-[10px] text-purple-400/60 uppercase tracking-wider font-mono">AI Collaborator</div>
        </div>
      </div>
    </div>
  </div>
);

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
          title="Analysis & Planning"
          role="Product Manager & Analyst"
          bmadRole="Analyst & PM Agents"
          personaSeed="pm-agent"
          description="Phase 1 & 2. The Analyst conducts research and market analysis. The PM defines scope and creates the Product Requirements Document (PRD)."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />

        <ProcessStep
          title="Solutioning"
          role="System Architect"
          bmadRole="Architect Agent"
          personaSeed="architect-agent"
          description="Phase 3. The Architect designs the system architecture, selects the tech stack, and validates technical feasibility against the PRD."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <ProcessStep
          title="Implementation"
          role="Full Stack Developer"
          bmadRole="Scrum Master & Developer"
          personaSeed="coding-agent"
          description="Phase 4. The Scrum Master breaks down features into user stories. The Developer implements them one by one in sprints."
          icon={
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />

        <ProcessStep
          title="Quality Assurance"
          role="QA Engineer"
          bmadRole="Test Architect (TEA)"
          personaSeed="test-agent"
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
