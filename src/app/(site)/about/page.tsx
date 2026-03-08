import { getResumeData } from "@/lib/data";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsVisualization } from "@/components/sections/SkillsVisualization";

export const metadata = {
    title: "About | Syed Dawood",
    description: "Learn more about my experience, skills, and background in AI and Full-Stack Development.",
};

export default function AboutPage() {
    const { personal, experience, education, skills } = getResumeData();

    return (
        <div className="container max-w-5xl mx-auto px-4 py-20 space-y-24">
            {/* Bio Section */}
            <section className="space-y-6 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)]">
                    About <span className="text-primary">Me</span>
                </h1>
                <p className="text-lg text-[var(--muted)] leading-relaxed max-w-3xl">
                    {personal.about}
                </p>
            </section>

            {/* Experience & Education Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border)] pb-4">
                        Experience
                    </h2>
                    <ExperienceTimeline experiences={experience} />
                </div>

                <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border)] pb-4">
                        Education
                    </h2>
                    <div className="space-y-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                <h3 className="text-xl font-bold text-[var(--foreground)]">{edu.institution}</h3>
                                <p className="text-primary font-mono text-sm my-2">{edu.dates}</p>
                                <p className="font-medium text-[var(--foreground)]">{edu.degree}</p>
                                <p className="text-sm text-[var(--muted)] mt-2">{edu.gpa}</p>
                                <p className="text-sm text-[var(--muted)] italic mt-1">{edu.awards}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border)] pb-4">
                    Technical Skills
                </h2>
                <SkillsVisualization skills={skills} />
            </section>
        </div>
    );
}
