"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { type getResumeData } from "@/lib/data";

type Skills = ReturnType<typeof getResumeData>["skills"];

export const SkillsVisualization = ({ skills }: { skills: Skills }) => {
    return (
        <div className="space-y-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
                <div key={category} className="space-y-4">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
                        {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {items.map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                            >
                                <Badge variant="default" className="px-3 py-1 text-sm hover:scale-105 transition-transform cursor-default">
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
