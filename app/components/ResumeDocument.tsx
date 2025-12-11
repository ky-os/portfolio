import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { projects, featuredCompany } from '@/lib/data';

// Register a font (optional, but good for styling)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        marginBottom: 20,
        borderBottom: '1pt solid #EEE',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#111827',
    },
    title: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        color: '#6B7280',
        flexDirection: 'row',
        gap: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#1F2937',
        borderBottom: '1pt solid #E5E7EB',
        paddingBottom: 5,
    },
    subHeading: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
    },
    projectTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111827',
    },
    projectMeta: {
        fontSize: 10,
        color: '#6B7280',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    text: {
        fontSize: 10,
        color: '#4B5563',
        lineHeight: 1.5,
        marginBottom: 3,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
    },
    techStack: {
        fontSize: 9,
        color: '#6B7280',
        marginTop: 5,
        fontStyle: 'italic',
    },
    link: {
        color: '#2563EB',
        textDecoration: 'none',
    },
    skillRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    skillLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 70,
        color: '#374151',
    },
    skillList: {
        fontSize: 10,
        color: '#4B5563',
        flex: 1,
    },
});

const BulletPoint = ({ children }: { children: string }) => (
    <View style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{children}</Text>
    </View>
);

interface ResumeDocumentProps {
    skills?: {
        languages: string[];
        frameworks: string[];
        tools: string[];
    };
}

const ResumeDocument = ({ skills = { languages: [], frameworks: [], tools: [] } }: ResumeDocumentProps) => {
    const workProjects = projects.filter(p => p.category === "work");
    const personalProjects = projects.filter(p => p.category === "personal");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>Kyle Osunero</Text>
                    <Text style={styles.title}>Software Engineer</Text>
                    <View style={styles.contact}>
                        <Link src="mailto:kyle.osunero.21@gmail.com" style={styles.link}>kyle.osunero.21@gmail.com</Link>
                        <Text>|</Text>
                        <Link src="https://www.linkedin.com/in/ky-os/" style={styles.link}>LinkedIn</Link>
                        <Text>|</Text>
                        <Link src="https://github.com/ky-os" style={styles.link}>GitHub</Link>
                        <Text>|</Text>
                        <Link src="https://ky-os.dev/" style={styles.link}>Portfolio</Link>
                    </View>
                </View>

                {/* Technical Skills */}
                <View style={{ marginBottom: 15, borderBottom: '1pt solid #E5E7EB', paddingBottom: 10 }}>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Languages:</Text>
                        <Text style={styles.skillList}>{skills.languages.join(", ")}</Text>
                    </View>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Frameworks:</Text>
                        <Text style={styles.skillList}>{skills.frameworks.join(", ")}</Text>
                    </View>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Tools:</Text>
                        <Text style={styles.skillList}>{skills.tools.join(", ")}</Text>
                    </View>
                </View>

                {/* Featured Experience */}
                <Text style={styles.heading}>Featured Experience</Text>
                <View style={styles.section}>
                    <Text style={styles.subHeading}>{featuredCompany.role} at {featuredCompany.name}</Text>
                    <Text style={styles.projectMeta}>{featuredCompany.period}</Text>
                    <Text style={styles.text}>{featuredCompany.description}</Text>
                    <Text style={{ ...styles.subHeading, fontSize: 10, marginTop: 5 }}>Highlights:</Text>
                    {featuredCompany.highlights.map((highlight, i) => (
                        <BulletPoint key={i}>{highlight}</BulletPoint>
                    ))}
                </View>

                {/* Work Experience */}
                <Text style={styles.heading}>Experience</Text>
                {workProjects.map((project, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        <Text style={styles.projectMeta}>
                            {project.role} {project.company ? `| ${project.company}` : ''} | {project.date}
                        </Text>
                        {project.description.map((desc, i) => (
                            <BulletPoint key={i}>{desc}</BulletPoint>
                        ))}
                        <Text style={styles.techStack}>Tech: {project.techStack.join(", ")}</Text>
                    </View>
                ))}

                {/* Personal Projects */}
                <Text style={styles.heading}>Personal Projects</Text>
                {personalProjects.map((project, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        <Text style={styles.projectMeta}>{project.date}</Text>
                        {project.description.map((desc, i) => (
                            <BulletPoint key={i}>{desc}</BulletPoint>
                        ))}
                        <Text style={styles.techStack}>Tech: {project.techStack.join(", ")}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default ResumeDocument;
