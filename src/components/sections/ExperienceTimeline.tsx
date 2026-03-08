"use client";

import { motion } from "framer-motion";
import { type getResumeData } from "@/lib/data";
import { Briefcase } from "lucide-react";

type Experiences = ReturnType<typeof getResumeData>["experience"];

export const ExperienceTimeline = ({ experiences }: { experiences: Experiences }) => {
    return (
        <div className="relative border-l-2 border-[var(--border)] ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Timeline Dot */}
                    <div className="absolute -left-3 top-1.5 h-6 w-6 rounded-full bg-[var(--card)] border-2 border-primary flex items-center justify-center shadow-md shadow-primary/20">
                        <Briefcase size={12} className="text-primary" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                            <h3 className="text-xl font-bold text-[var(--foreground)]">{exp.role}</h3>
                            <span className="text-xs font-mono font-medium text-primary px-3 py-1 bg-primary/10 rounded-full inline-block w-max">
                                {exp.dates}
                            </span>
                        </div>

                        <div className="text-base font-medium text-[var(--foreground)]">
                            {exp.company} <span className="text-[var(--muted)]">&bull; {exp.location} &bull;</span> <span className="text-[var(--muted)] italic text-sm">{exp.type}</span>
                        </div>

                        <ul className="list-disc leading-relaxed text-[var(--muted)] space-y-1.5 pl-4 pt-3 marker:text-primary text-sm">
                            {exp.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
