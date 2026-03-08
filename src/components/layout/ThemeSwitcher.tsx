"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    const toggleTheme = useCallback(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) {
            setTheme(newTheme);
            return;
        }

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Use View Transition API for live theme switching with circle reveal
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = document as any;
        if (!doc.startViewTransition) {
            // Fallback: just switch instantly
            setTheme(newTheme);
            return;
        }

        // Set CSS custom properties for the clip-path origin
        document.documentElement.style.setProperty("--tx", `${x}px`);
        document.documentElement.style.setProperty("--ty", `${y}px`);

        const transition = doc.startViewTransition(() => {
            setTheme(newTheme);
        });

        // Disable the default crossfade so only our clip-path runs
        transition.ready.then(() => {
            const maxRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    }, [theme, systemTheme, setTheme]);

    if (!mounted) {
        return <div className="w-9 h-9" aria-hidden="true" />;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-primary hover:shadow-md hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <Sun size={18} className="text-primary" />
            ) : (
                <Moon size={18} className="text-[var(--foreground)]" />
            )}
        </button>
    );
};
