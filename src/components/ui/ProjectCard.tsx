"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "./Badge";
import type { Project } from "@/lib/data";

export const ProjectCard = ({ project, index = 0 }: { project: Project; index?: number }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col h-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
        >
            <div className="flex flex-col flex-grow p-6 space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-xs font-mono text-primary/70">{project.category}</p>
                </div>

                <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                </p>

                <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                    {project.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs text-[var(--muted)] border-dashed">+{project.tags.length - 4}</Badge>
                    )}
                </div>
            </div>

            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span className="sr-only">View full case study for {project.title}</span>
            </Link>
        </motion.div>
    );
};
