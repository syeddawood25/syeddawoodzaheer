"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message must be at least 10 characters long."),
    honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setStatus("submitting");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message.");

            setStatus("success");
            reset();
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again or email me directly.");
        }
    };

    return (
        <div className="container max-w-4xl mx-auto px-4 py-20 animate-fade-in-up">
            <header className="space-y-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)]">
                    Let&apos;s <span className="text-primary">Connect</span>
                </h1>
                <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
                    Interested in working together or have a question? I&apos;d love to hear from you.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                        <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Email</h3>
                        <a href="mailto:dawoodsyedsie001@gmail.com" className="text-sm text-[var(--muted)] hover:text-primary transition-colors flex items-center gap-2">
                            <Mail size={14} /> dawoodsyedsie001@gmail.com
                        </a>
                    </div>

                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                        <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Socials</h3>
                        <div className="space-y-2">
                            <a href="https://linkedin.com/in/syed-dawood-t482002" target="_blank" rel="noopener noreferrer" className="block text-sm text-[var(--muted)] hover:text-primary transition-colors">
                                LinkedIn Profile →
                            </a>
                            <a href="https://github.com/syeddawood25" target="_blank" rel="noopener noreferrer" className="block text-sm text-[var(--muted)] hover:text-primary transition-colors">
                                GitHub Repositories →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2 p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Honeypot */}
                        <div className="hidden" aria-hidden="true">
                            <label htmlFor="honeypot">Leave this blank if you are human</label>
                            <input type="text" id="honeypot" {...register("honeypot")} tabIndex={-1} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">Name</label>
                            <Input id="name" placeholder="John Doe" aria-invalid={!!errors.name} {...register("name")} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" aria-invalid={!!errors.email} {...register("email")} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">Message</label>
                            <Textarea id="message" placeholder="How can I help you?" aria-invalid={!!errors.message} {...register("message")} className="resize-y" />
                            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={status === "submitting"}>
                            {status === "submitting" ? "Sending..." : "Send Message"}
                        </Button>

                        {status === "success" && (
                            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-500/10 p-4 rounded-md">
                                <CheckCircle2 size={16} />
                                <p className="text-sm font-medium">Message sent successfully! I will get back to you soon.</p>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-500/10 p-4 rounded-md">
                                <AlertCircle size={16} />
                                <p className="text-sm font-medium">{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
