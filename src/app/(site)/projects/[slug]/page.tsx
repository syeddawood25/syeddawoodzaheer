import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";

interface CaseStudyProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Not Found" };

    return {
        title: `${project.title} | Syed Dawood`,
        description: project.shortDescription,
    };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="container max-w-4xl mx-auto px-4 py-20 animate-fade-in-up">
            <Link href="/projects" className="inline-flex items-center text-sm font-medium text-[var(--muted)] hover:text-primary transition-colors mb-12">
                <ArrowLeft size={16} className="mr-2" /> Back to Projects
            </Link>

            <header className="space-y-6 mb-12">
                <div className="space-y-2">
                    <Badge variant="default" className="mb-4">{project.category}</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)]">
                        {project.title}
                    </h1>
                    <p className="text-lg text-primary font-medium">
                        {project.subtitle} <span className="text-[var(--muted)]">&bull; {project.dates}</span>
                    </p>
                </div>
            </header>

            <div className="space-y-8 text-[var(--muted)] leading-relaxed">

                <section>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Overview</h2>
                    <p>{project.shortDescription}</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-primary">
                        {project.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Problem Statement</h2>
                    <p>{project.problem}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Approach</h2>
                    <p>{project.approach}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Solution & Architecture</h2>
                    <p>{project.solution}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4 border-b border-[var(--border)] pb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-sm font-mono">{tag}</Badge>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Results</h2>
                    <p>{project.results}</p>
                </section>
            </div>
        </article>
    );
}
