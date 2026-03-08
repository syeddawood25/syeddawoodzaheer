import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getResumeData } from "@/lib/data";

export default function Home() {
  const { personal } = getResumeData();

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--foreground)]">
          Hi, I&apos;m <span className="text-primary">{personal.name}</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-[var(--muted)] font-medium tracking-tight">
          {personal.title}
        </h2>

        <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          I build production-ready AI systems, automated Agentic workflows, and scalable full-stack applications that make a real-world impact.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
