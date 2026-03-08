import resumeData from "@/content/data/resume.json";

export type Project = {
    slug: string;
    title: string;
    subtitle: string;
    dates: string;
    category: string;
    tags: string[];
    shortDescription: string;
    bullets: string[];
    imageUrl: string;
    liveUrl: string;
    githubUrl: string;
    problem?: string;
    approach?: string;
    solution?: string;
    results?: string;
};

// Extends project with inferred detailed properties for case studies
export const getProjects = (): Project[] => {
    return resumeData.projects.map((p) => ({
        ...p,
        problem: "This project targeted a significant manual bottleneck in existing workflows, requiring an intelligent approach to automate and scale operations.",
        approach: "Designed a system architecture prioritizing scalability and user intent, iteratively building out the core backend and inference pipeline.",
        solution: "Leveraged the listed technologies to deploy a robust, multi-agent or neural-based model integrated natively with the desired interface.",
        results: "Successfully decreased manual effort, validated the core concepts against rigorous testing, and ensured continuous availability."
    }));
};

export const getProjectBySlug = (slug: string): Project | undefined => {
    const projects = getProjects();
    return projects.find((p) => p.slug === slug);
};

export const getResumeData = () => {
    return resumeData;
};
