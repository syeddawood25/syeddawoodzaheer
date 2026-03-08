"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "./Badge";
import type { Project } from "@/lib/data";

// Gradient backgrounds as visual placeholders for projects without images
const gradients = [
    "from-primary/30 via-secondary/20 to-primary/10",
    "from-secondary/30 via-primary/20 to-secondary/10",
    "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
    "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    "from-amber-500/20 via-orange-500/20 to-red-500/20",
];

export const ProjectCard = ({ project, index = 0 }: { project: Project; index?: number }) => {
    const gradient = gradients[index % gradients.length];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col h-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
        >
            {/* Gradient Placeholder instead of broken Image */}
            <div className={`relative h-48 w-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                <div className="text-5xl font-bold text-primary/20 select-none tracking-tighter">
                    {project.title.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="flex flex-col flex-grow p-6 space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-xs font-mono text-primary/70">{project.category}</p>
                </div>

                <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                </p>

                <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                    {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs text-[var(--muted)] border-dashed">+{project.tags.length - 3}</Badge>
                    )}
                </div>
            </div>

            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <span className="sr-only">View full case study for {project.title}</span>
            </Link>
        </motion.div>
    );
};
