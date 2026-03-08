import { getResumeData } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Download, FileJson } from "lucide-react";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";

export const metadata = {
    title: "Resume | Syed Dawood",
    description: "Interactive resume and CV of Syed Dawood."
};

export default function ResumePage() {
    const { personal, experience } = getResumeData();

    return (
        <div className="container max-w-4xl mx-auto px-4 py-20 animate-fade-in-up">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-[var(--border)] pb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)]">
                        Resume
                    </h1>
                    <p className="text-lg text-[var(--muted)]">
                        {personal.title}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button asChild variant="outline">
                        <a href="/SyedDawood.pdf" download>
                            <Download size={16} className="mr-2" /> Download PDF
                        </a>
                    </Button>
                    <Button asChild variant="ghost">
                        <a href="/api/resume.json" target="_blank">
                            <FileJson size={16} className="mr-2" /> JSON API
                        </a>
                    </Button>
                </div>
            </header>

            <section className="space-y-8">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Work Experience</h2>
                <ExperienceTimeline experiences={experience} />
            </section>
        </div>
    );
}
