import { projects, featuredCompany } from "./data";

export function generateMarkdown(): string {
  const name = "Kyle Osunero";
  const title = "Software Engineer";
  const email = "kyle.osunero.21@gmail.com";
  const linkedin = "https://www.linkedin.com/in/ky-os/";
  const github = "https://github.com/ky-os";
  const portfolio = "https://ky-os.dev/"; // Assuming this is the URL or similar

  let md = `# ${name}\n`;
  md += `**${title}**\n\n`;
  md += `Email: [${email}](mailto:${email}) | LinkedIn: [${linkedin}](${linkedin}) | GitHub: [${github}](${github}) | Portfolio: [${portfolio}](${portfolio})\n\n`;

  md += `## Featured Experience\n\n`;
  md += `### ${featuredCompany.role} at ${featuredCompany.name}\n`;
  md += `*${featuredCompany.period}*\n\n`;
  md += `${featuredCompany.description}\n\n`;
  md += `**Highlights:**\n`;
  featuredCompany.highlights.forEach((highlight) => {
    md += `- ${highlight}\n`;
  });
  md += `\n`;

  md += `## Experience\n\n`;

  // Filter for work projects
  const workProjects = projects.filter((p) => p.category === "work");

  workProjects.forEach((project) => {
    md += `### ${project.title}\n`;
    md += `**${project.role}**`;
    if (project.company) md += ` | ${project.company}`;
    md += `\n*${project.date}*\n\n`;

    project.description.forEach((desc) => {
      md += `- ${desc}\n`;
    });
    md += `\n`;
    md += `**Tech Stack:** ${project.techStack.join(", ")}\n\n`;
  });

  md += `## Personal Projects\n\n`;
  const personalProjects = projects.filter((p) => p.category === "personal");

  personalProjects.forEach((project) => {
    md += `### ${project.title}\n`;
    md += `*${project.date}*\n\n`;
    project.description.forEach((desc) => {
      md += `- ${desc}\n`;
    });
    md += `\n`;
    md += `**Tech Stack:** ${project.techStack.join(", ")}\n\n`;
  });

  return md;
}
