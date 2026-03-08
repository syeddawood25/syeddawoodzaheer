import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-20">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-[var(--muted)]">
                    © {new Date().getFullYear()} Syed Dawood. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-[var(--muted)]">
                    <a href="https://github.com/syeddawood25" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/syed-dawood-t482002" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="mailto:dawoodsyedsie001@gmail.com" className="hover:text-primary transition-colors">
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
