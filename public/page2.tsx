"use client";

import { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const NAV_ITEMS = ["About Me", "Experience", "Projects", "Blog"];

const EXPERIENCE = [
    {
        company: "Google",
        role: "Software Engineering Intern (Incoming)",
        project: "Google (YouTube)",
        tags: ["Java", "Android", "C++"],
        dates: "Jun 2026 - Sep 2026",
    },
    {
        company: "VideoLAN",
        role: "Software Engineering Intern",
        project: "VLC Media Player",
        tags: ["C", "C++", "OpenCV", "AI/ML", "Makefile", "Meson"],
        dates: "Jun 2025 - Sep 2025",
    },
    {
        company: "Halvex",
        role: "Software Developer Intern",
        project: "Linked Roles Discord Bot",
        tags: ["JavaScript", "TypeScript", "Express.js", "Node.js", "MongoDB"],
        dates: "Feb 2023 - June 2023",
    },
    {
        company: "Chelmsford Chinese Language School",
        role: "Java Mentor",
        project: "Java Introduction Course Teacher",
        tags: ["Java"],
        dates: "Sep 2021 - Feb 2022",
    },
];

const PROJECTS = [
    {
        name: "mcav",
        desc: "A cross-platform Java multimedia framework (130 stars) for building Java media applications.",
        tags: ["Java", "Spring Boot", "TypeScript", "CI/CD"],
        icon: "🎬",
        iconBg: "#1a1a2e",
    },
    {
        name: "yt-media-storage",
        desc: "A tool to encode/decode files into YouTube videos. Check out the YouTube video linked.",
        tags: ["C++", "Assembly", "SIMD", "Encryption", "Coding Theory", "Compression"],
        icon: "▶",
        iconBg: "#cc0000",
        iconColor: "#fff",
    },
    {
        name: "Pulse Media Player",
        desc: "A robust media player written in 1K lines of C++ code. Check out the YouTube video linked.",
        tags: ["C++", "OpenGL", "OpenAL", "FFmpeg"],
        icon: "⏵",
        iconBg: "#6b21a8",
        iconColor: "#fff",
    },
    {
        name: "Murder Run",
        desc: "A Bukkit gamemode for Minecraft servers with over 30k lines of code.",
        tags: ["Java", "Hibernate", "Bukkit"],
        icon: "⚔",
        iconBg: "#1e3a5f",
        iconColor: "#e74c3c",
    },
];

const BLOG_POSTS = [
    {
        date: "2026-02-19T02:38:53.973Z",
        readTime: "5 MIN READ",
        title: "Getting the Hwnd or Xid in JDK 21+",
        excerpt:
            "A guide to get the Hwnd or Xid of a Swing component in modern Java versions using Unsafe.",
        tags: ["Java", "Hwnd", "Xid", "Swing", "Unsafe"],
    },
];

function NumberedBadge({ num, label }: { num: number; label: string }) {
    return (
        <div className="numbered-badge">
            <span className="badge-num">{num}</span>
            {label}
        </div>
    );
}

function Tag({ label }: { label: string }) {
    return <span className="tag">{label}</span>;
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href?: string }) {
    return (
        <a
            href={href ?? "#"}
            target="_blank"
            rel="noreferrer"
            style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
                display: "inline-flex",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
            }
        >
            {icon}
        </a>
    );
}

function DiscordIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
    );
}

export default function Home() {
    const [activeSection, setActiveSection] = useState("About Me");

    useEffect(() => {
        const sections = NAV_ITEMS.map((name) => ({
            name,
            el: document.getElementById(name.toLowerCase().replace(" ", "-")),
        }));

        const handler = () => {
            const scrollY = window.scrollY + 200;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].el && sections[i].el!.offsetTop <= scrollY) {
                    setActiveSection(sections[i].name);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scrollTo = (name: string) => {
        const el = document.getElementById(name.toLowerCase().replace(" ", "-"));
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className="border-2 border-red-500"
            style={{
                minHeight: "100vh",
                backgroundColor: "var(--bg)",
                color: "var(--text-primary)",
            }}
        >
            <div
                className="max-w-7xl mx-auto px-6 py-10 border-2 border-green-500"
                style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "60px", alignItems: "start" }}
            >
                {/* ── LEFT SIDEBAR ── */}
                <div className="border-2 border-red-500" style={{ position: "sticky", top: "64px", left: "64px"}}>
                    {/* Contact badge */}
                    <div className="fade-in fade-in-1 mb-6">
                        <NumberedBadge num={1} label="Contact" />
                    </div>

                    {/* Name */}
                    <h1
                        className="fade-in fade-in-2"
                        style={{
                            fontSize: "clamp(28px, 4vw, 38px)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            marginTop: "16px",
                            marginBottom: "6px",
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        David Anukam
                    </h1>
                    <p
                        className="fade-in fade-in-2 accent"
                        style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "16px" }}
                    >
                        Computer Science Student
                    </p>

                    <p
                        className="fade-in fade-in-3"
                        style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}
                    >
                        I build fast, reliable open-source software that powers back end applications.
                    </p>

                    {/* Social icons */}
                    <div className="fade-in fade-in-3" style={{ display: "flex", gap: "14px", marginBottom: "36px", alignItems: "center" }}>
                        <SocialIcon icon={<GitHubIcon style={{ fontSize: 20 }} />} href="https://github.com/davidanukam" />
                        <SocialIcon icon={<YouTubeIcon style={{ fontSize: 20 }} />} href="https://www.youtube.com/@Duzzenn2" />
                        <SocialIcon icon={<DiscordIcon />} href="#" />
                        <SocialIcon icon={<LinkedInIcon style={{ fontSize: 20 }} />} href="https://www.linkedin.com/in/david-anukam/" />
                        <SocialIcon icon={<EmailIcon style={{ fontSize: 20 }} />} href="mailto:davidanukam72@gmail.com" />
                        <SocialIcon icon={<PhoneIcon style={{ fontSize: 20 }} />} href="tel:+2269982576" />
                    </div>

                    {/* Nav */}
                    <nav className="fade-in fade-in-4" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item)}
                                className={`nav-link ${activeSection === item ? "active" : ""}`}
                                style={{ background: "none", border: "none", textAlign: "left" }}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* ── RIGHT CONTENT ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "64px", paddingTop: "64px", maxWidth: "640px", margin: "0 auto", width: "100%"}}>

                    {/* About Me */}
                    <section id="about-me">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={2} label="About Me" />
                        </div>
                        <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "14px" }}>
                            <p>
                                I'm a college sophomore from Boston passionate about developing high-end software for the open-source community. I currently study Computer Science at the{" "}
                                <strong style={{ color: "var(--text-primary)" }}>University of California, Los Angeles</strong>, where I'm taking courses in data structures, algorithms, and systems. You may find me online as{" "}
                                <code style={{ color: "var(--accent)", background: "var(--accent-dim)", padding: "1px 5px", borderRadius: "3px", fontSize: "12px" }}>PulseBeat02</code>.
                            </p>
                            <p>
                                I contribute to bring new cool features to the multimedia ecosystem, like integrating computer vision and machine learning into media playback with{" "}
                                <strong style={{ color: "var(--text-primary)" }}>SAM2</strong> to segment objects and draw faces in real-time.
                            </p>
                            <p>
                                In my spare time, I enjoy playing clarinet in my university orchestra and wind ensemble, and develop my own open-source projects. I also maintain a{" "}
                                <strong style={{ color: "var(--text-primary)" }}>YouTube channel</strong>, where I discuss some of my projects in further depth.
                            </p>
                        </div>
                    </section>

                    {/* Experience */}
                    <section id="experience">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={3} label="Experience" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {EXPERIENCE.map((exp) => (
                                <div key={exp.company} className="section-card">
                                    <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}>{exp.company}</p>
                                    <p style={{ color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>{exp.role}</p>
                                    <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "8px" }}>{exp.project}</p>
                                    <div style={{ marginBottom: "8px" }}>
                                        {exp.tags.map((t) => <Tag key={t} label={t} />)}
                                    </div>
                                    <p style={{ color: "var(--text-muted)", fontSize: "11px" }}>{exp.dates}</p>
                                </div>
                            ))}
                        </div>

                        {/* Resume button */}
                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                            <a href="#" className="resume-btn">
                                View Full Resume (PDF) <OpenInNewIcon style={{ fontSize: 14 }} />
                            </a>
                        </div>
                    </section>

                    {/* Projects */}
                    <section id="projects">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={4} label="Projects" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {PROJECTS.map((proj) => (
                                <div
                                    key={proj.name}
                                    className="section-card"
                                    style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: "16px", alignItems: "center" }}
                                >
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{proj.name}</p>
                                        <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.6, marginBottom: "8px" }}>{proj.desc}</p>
                                        <div>{proj.tags.map((t) => <Tag key={t} label={t} />)}</div>
                                    </div>
                                    <div
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: "10px",
                                            background: proj.iconBg,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "26px",
                                            color: proj.iconColor ?? "var(--accent)",
                                            border: "1px solid var(--border)",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {proj.name === "Murder Run" ? (
                                            <SportsEsportsIcon style={{ fontSize: 30, color: "#e74c3c" }} />
                                        ) : (
                                            <span>{proj.icon}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Blog */}
                    <section id="blog">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={5} label="Blog" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {BLOG_POSTS.map((post) => (
                                <div key={post.title} className="section-card">
                                    <p style={{ color: "var(--text-muted)", fontSize: "10px", letterSpacing: "0.05em", marginBottom: "6px" }}>
                                        {post.date} · {post.readTime}
                                    </p>
                                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--accent)", marginBottom: "6px", lineHeight: 1.3 }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.6, marginBottom: "10px" }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginBottom: "12px" }}>
                                        {post.tags.map((t) => <Tag key={t} label={t} />)}
                                    </div>
                                    <a className="resume-btn" href="#" style={{ fontSize: "10px" }}>
                                        Read More
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", paddingBottom: "24px" }}>
                        <p className="footer-text">
                            Designed with ❤️, developed using <strong>VSCode</strong>.<br />
                            Built using <strong>React</strong>, <strong>Next.js</strong>, <strong>Tailwind</strong>, and{" "}
                            <strong>Material-UI</strong> components.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
