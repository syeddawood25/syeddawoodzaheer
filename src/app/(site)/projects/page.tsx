"use client";

import { useState } from "react";
import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsGallery() {
    const projects = getProjects();
    const allCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter((project) =>
        activeCategory === "All" ? true : project.category === activeCategory
    );

    return (
        <div className="container max-w-6xl mx-auto px-4 py-20 space-y-12">
            <header className="text-center space-y-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)]">
                    Selected <span className="text-primary">Work</span>
                </h1>
                <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
                    Explore my latest projects spanning AI automation, scalable backends, and full-stack development.
                </p>
            </header>

            {/* Filter Options */}
            <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                {allCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${activeCategory === category
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:border-primary/50 hover:text-primary"
                            }`}
                        aria-pressed={activeCategory === category}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-[var(--muted)]">
                    No projects found in this category.
                </div>
            )}
        </div>
    );
}
