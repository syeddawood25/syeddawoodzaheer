"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="font-bold text-xl tracking-tighter text-[var(--foreground)] hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                >
                    Syed<span className="text-primary">Dawood</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--muted)]">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeSwitcher />

                    {/* Mobile hamburger button */}
                    <button
                        className="md:hidden p-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-primary transition-colors cursor-pointer"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <nav className="md:hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md animate-fade-in-up">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 rounded-lg text-base font-medium text-[var(--foreground)] hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};
