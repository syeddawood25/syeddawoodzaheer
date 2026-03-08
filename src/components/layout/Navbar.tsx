"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tighter text-[var(--foreground)] hover:text-primary transition-colors">
                    Syed<span className="text-primary">Dawood</span>
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--muted)]">
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
                    <Link href="/resume" className="hover:text-primary transition-colors">Resume</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};
