"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_ITEMS = ["About Me", "Experience", "Projects", "YouTube"];

const EXPERIENCE = [
    {
        company: "Western Computer Science Undergraduate Society",
        role: "Back End Developer",
        project: "Projects Team — API design, back-end frameworks, and real-world solutions",
        tags: ["API Design", "Back-End Development", "Research"],
        dates: "Oct 2025 - Apr 2026",
    },
    {
        company: "Purplr",
        role: "Chief Technology Officer",
        project: "Full-stack marketplace application for Western University students",
        tags: ["React Native", "TypeScript", "Supabase", "Stripe"],
        dates: "Sep 2025 - Apr 2026",
    },
    {
        company: "IALA — Igbo Association of London and Area",
        role: "Full Stack Intern",
        project: "Community website with event calendar, donations, and member portal",
        tags: ["Next.js", "TailwindCSS", "Shadcn", "Stripe", "PayPal"],
        dates: "Jul 2025 - Sep 2025",
    },
    {
        company: "Western University",
        role: "Senior Instructor",
        project: "Western Engineering Outreach — STEM instruction for 1000+ students",
        tags: ["STEM", "Education", "Lesson Planning"],
        timeline: [
            { dates: "Apr 2026 - Present" },
            { dates: "May 2025 - Aug 2025" },
        ],
    },
    {
        company: "Western University",
        role: "Junior Instructor",
        project: "Classroom STEM instruction, lesson delivery, and student support",
        tags: ["STEM", "Education", "Critical Thinking"],
        dates: "Sep 2023 - Aug 2024",
    },
    {
        company: "TechAlley Computers",
        role: "Junior Developer",
        project: "Website maintenance, SMS API integration, and automation scripts",
        tags: ["Python", "PHP", "OpenSCAD", "APIs"],
        dates: "Jul 2023 - Aug 2023",
    },
];

const PROJECTS = [
    {
        name: "Real Time Web Search",
        desc: "A production-deployed, full-stack web application built with Next.js that delivers real-time search results at scale, processing over 1 billion search results.",
        tags: ["Next.js", "RapidAPI", "PostgreSQL"],
        icon: "🔍",
        iconBg: "#1a1a2e",
    },
    {
        name: "Purplr",
        desc: "Leading development of a full-stack marketplace application for university students, utilizing React Native and TypeScript for the frontend with a Spring Boot backend.",
        tags: ["React Native", "TypeScript", "Spring Boot", "Supabase"],
        icon: "🛒",
        iconBg: "#6b21a8",
        iconColor: "#fff",
    },
    {
        name: "YouTube Channel Analyzer",
        desc: "A Python-powered analytics tool built with Streamlit that leverages the YouTube Data API v3 to fetch, analyze, and visualize channel performance data.",
        tags: ["Python", "Streamlit", "YouTube Data API v3"],
        icon: "▶",
        iconBg: "#cc0000",
        iconColor: "#fff",
    },
    {
        name: "CSNotes",
        desc: "A repository of notes to help students ace Computer Science courses at Western University.",
        tags: ["Python", "Education"],
        icon: "📚",
        iconBg: "#1e3a5f",
    },
    {
        name: "sand-simulation",
        desc: "A 2D cellular automata simulation built with Python and Pygame that mimics granular materials like sand in real-time.",
        tags: ["Python", "Pygame", "Simulation"],
        icon: "🏖",
        iconBg: "#b45309",
    },
    {
        name: "RubiksCubeSim2D",
        desc: "A Python-based Rubik's Cube visualization tool that translates standard cube notation into 2D grid movements.",
        tags: ["Python", "Visualization"],
        icon: "🧊",
        iconBg: "#065f46",
    },
    {
        name: "Keyboard",
        desc: "A typing-based arcade game inspired by MonkeyType's UI, built in C++.",
        tags: ["C++", "Game Development"],
        icon: "⌨",
        iconBg: "#374151",
        iconColor: "#fff",
        useGameIcon: true,
    },
    {
        name: "leetcode-submissions",
        desc: "A collection of my LeetCode problem submissions and solutions.",
        tags: ["Python", "Algorithms", "Data Structures"],
        icon: "💻",
        iconBg: "#1a1a1a",
    },
    {
        name: "western-wingman",
        desc: "A TypeScript project built for the Western University community.",
        tags: ["TypeScript", "Next.js"],
        icon: "🎓",
        iconBg: "#4c1d95",
        iconColor: "#fff",
    },
];

type Project = (typeof PROJECTS)[number];

const PROJECT_SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name (A → Z)" },
    { value: "name-desc", label: "Name (Z → A)" },
    { value: "tech-asc", label: "Tech Stack (A → Z)" },
    { value: "tech-desc", label: "Tech Stack (Z → A)" },
    { value: "tags-desc", label: "Most Technologies" },
] as const;

type ProjectSort = (typeof PROJECT_SORT_OPTIONS)[number]["value"];

function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
    const copy = [...projects];
    switch (sort) {
        case "name-asc":
            return copy.sort((a, b) => a.name.localeCompare(b.name));
        case "name-desc":
            return copy.sort((a, b) => b.name.localeCompare(a.name));
        case "tech-asc":
            return copy.sort((a, b) =>
                a.tags.join(", ").localeCompare(b.tags.join(", ")) || a.name.localeCompare(b.name)
            );
        case "tech-desc":
            return copy.sort((a, b) =>
                b.tags.join(", ").localeCompare(a.tags.join(", ")) || a.name.localeCompare(b.name)
            );
        case "tags-desc":
            return copy.sort((a, b) =>
                b.tags.length - a.tags.length || a.name.localeCompare(b.name)
            );
        default:
            return copy;
    }
}

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

type ExperienceEntry = (typeof EXPERIENCE)[number];

function ExperienceCard({ exp }: { exp: ExperienceEntry }) {
    const hasTimeline = "timeline" in exp && !!exp.timeline;

    if (hasTimeline) {
        return (
            <div className="section-card">
                <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px", color: "var(--text-primary)" }}>
                    {exp.company}
                </p>
                <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                    {exp.role}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "12px" }}>
                    {exp.project}
                </p>
                <div className="exp-timeline-block">
                    {exp.timeline!.map((entry, index) => (
                        <div key={entry.dates} className="exp-timeline-entry">
                            <div className="exp-timeline-rail">
                                <span
                                    className={`exp-timeline-dot${index === 0 ? " exp-timeline-dot--current" : ""}`}
                                    aria-hidden="true"
                                />
                                {index < exp.timeline!.length - 1 && (
                                    <span className="exp-timeline-line" aria-hidden="true" />
                                )}
                            </div>
                            <p className="exp-timeline-dates">{entry.dates}</p>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: "10px" }}>
                    {exp.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="section-card">
            <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "2px", color: "var(--text-primary)" }}>
                {exp.company}
            </p>
            <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                {exp.role}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "8px" }}>
                {exp.project}
            </p>
            <div style={{ marginBottom: "8px" }}>
                {exp.tags.map((t) => <Tag key={t} label={t} />)}
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{exp.dates}</p>
        </div>
    );
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
            {icon}
        </a>
    );
}

function DiscordIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
    );
}

export default function Home() {
    const [activeSection, setActiveSection] = useState("About Me");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [projectSort, setProjectSort] = useState<ProjectSort>("default");
    const menuRef = useRef<HTMLDivElement>(null);

    const sortedProjects = useMemo(
        () => sortProjects(PROJECTS, projectSort),
        [projectSort]
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMobileMenuOpen(false);
            }
        };
        if (mobileMenuOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [mobileMenuOpen]);

    const scrollTo = (name: string) => {
        const el = document.getElementById(name.toLowerCase().replace(" ", "-"));
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>

            {/* ── MOBILE TOP NAV BAR ── */}
            {isMobile && (
                <header
                    ref={menuRef}
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        backgroundColor: "rgba(15,15,15,0.97)",
                        backdropFilter: "blur(10px)",
                        borderBottom: "1px solid var(--border)",
                        padding: "12px 20px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>David Anukam</p>
                            <p style={{ color: "var(--accent)", fontSize: "12px", fontWeight: 600 }}>CS + SWE @ UWO</p>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex" }}
                        >
                            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div style={{ paddingTop: "12px", paddingBottom: "4px" }}>
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollTo(item)}
                                    className={`nav-link ${activeSection === item ? "active" : ""}`}
                                    style={{ background: "none", border: "none", textAlign: "left", width: "100%" }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </header>
            )}

            {/* ── MAIN LAYOUT ── */}
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: isMobile ? "24px 20px" : "40px 32px",
                    display: isMobile ? "block" : "grid",
                    gridTemplateColumns: "260px 1fr",
                    gap: "60px",
                    alignItems: "start",
                }}
            >
                {/* ── LEFT SIDEBAR (desktop only) ── */}
                {!isMobile && (
                    <div style={{ position: "sticky", top: "104px" }}>
                        <div className="fade-in fade-in-1 mb-6">
                            <NumberedBadge num={1} label="Contact" />
                        </div>

                        <h1
                            className="fade-in fade-in-2"
                            style={{
                                fontSize: "clamp(26px, 3vw, 38px)",
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
                        <p className="fade-in fade-in-2 accent" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "16px" }}>
                            CS + SWE @ UWO | Simulation Engineer In-Training
                        </p>
                        <p className="fade-in fade-in-3" style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
                            Building projects all day, everyday. Aspiring software engineer passionate about full-stack development, simulation, and AI/ML.
                        </p>

                        <div className="fade-in fade-in-3" style={{ display: "flex", gap: "14px", marginBottom: "36px", alignItems: "center", flexWrap: "wrap" }}>
                            <SocialIcon icon={<GitHubIcon style={{ fontSize: 20 }} />} href="https://github.com/davidanukam" />
                            <SocialIcon icon={<YouTubeIcon style={{ fontSize: 20 }} />} href="https://www.youtube.com/@Duzzenn" />
                            <SocialIcon icon={<DiscordIcon />} href="https://discord.com/users/994355209654517882" />
                            <SocialIcon icon={<LinkedInIcon style={{ fontSize: 20 }} />} href="https://www.linkedin.com/in/david-anukam/" />
                            <SocialIcon icon={<EmailIcon style={{ fontSize: 20 }} />} href="mailto:davidanukam72@gmail.com" />
                            <SocialIcon icon={<PhoneIcon style={{ fontSize: 20 }} />} href="tel:+2269982576" />
                        </div>

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
                )}

                {/* ── RIGHT CONTENT ── */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "56px",
                        paddingTop: isMobile ? "8px" : "64px",
                        maxWidth: "680px",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    {/* Mobile: social icons strip */}
                    {isMobile && (
                        <div style={{ paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px" }}>
                                Building projects all day, everyday. Aspiring software engineer passionate about full-stack development, simulation, and AI/ML.
                            </p>
                            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                                <SocialIcon icon={<GitHubIcon style={{ fontSize: 22 }} />} href="https://github.com/davidanukam" />
                                <SocialIcon icon={<YouTubeIcon style={{ fontSize: 22 }} />} href="https://www.youtube.com/@Duzzenn" />
                                <SocialIcon icon={<DiscordIcon />} href="https://discord.com/users/duzzenn" />
                                <SocialIcon icon={<LinkedInIcon style={{ fontSize: 22 }} />} href="https://www.linkedin.com/in/david-anukam/" />
                                <SocialIcon icon={<EmailIcon style={{ fontSize: 22 }} />} href="mailto:davidanukam72@gmail.com" />
                                <SocialIcon icon={<PhoneIcon style={{ fontSize: 22 }} />} href="tel:+2269982576" />
                            </div>
                        </div>
                    )}

                    {/* About Me */}
                    <section id="about-me">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={2} label="About Me" />
                        </div>
                        <div style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "14px" }}>
                            <p>
                                I'm an aspiring software engineer and Computer Science student at the{" "}
                                <strong style={{ color: "var(--text-primary)" }}>University of Western Ontario</strong>, pursuing a Bachelor of Computer Science with a Minor in Software Engineering (Expected April 2028). I'm on the Dean's Honours List with a GPA of 3.78 and currently seeking{" "}
                                <strong style={{ color: "var(--text-primary)" }}>Summer 2027 internships</strong>. You may find me online as{" "}
                                <code style={{ color: "var(--accent)", background: "var(--accent-dim)", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>Duzzenn</code>.
                            </p>
                            <p>
                                I specialize in full-stack development with{" "}
                                <strong style={{ color: "var(--text-primary)" }}>Next.js</strong>,{" "}
                                <strong style={{ color: "var(--text-primary)" }}>React Native</strong>, and{" "}
                                <strong style={{ color: "var(--text-primary)" }}>Spring Boot</strong>, backend engineering with{" "}
                                <strong style={{ color: "var(--text-primary)" }}>FastAPI</strong> and{" "}
                                <strong style={{ color: "var(--text-primary)" }}>PostgreSQL</strong>, and AI/ML integration using{" "}
                                <strong style={{ color: "var(--text-primary)" }}>PyTorch</strong> and{" "}
                                <strong style={{ color: "var(--text-primary)" }}>TensorFlow</strong>. I'm also a Simulation Engineer In-Training with a passion for building interactive simulations and developer tools.
                            </p>
                            <p>
                                Beyond code, I've instructed 1000+ students in STEM through Western Engineering Outreach, serve as Back End Developer on the Projects Team at{" "}
                                <strong style={{ color: "var(--text-primary)" }}>Western CSUS</strong>, and lead development at{" "}
                                <strong style={{ color: "var(--text-primary)" }}>Purplr</strong>. I also run a{" "}
                                <strong style={{ color: "var(--text-primary)" }}>YouTube channel</strong> where I share coding projects, CS tutorials, and study streams with a growing community of developers.
                            </p>
                        </div>
                    </section>

                    {/* Experience */}
                    <section id="experience">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={3} label="Experience" />
                        </div>
                        <div className="card-group">
                            {EXPERIENCE.map((exp) => (
                                <ExperienceCard key={`${exp.company}-${exp.role}`} exp={exp} />
                            ))}
                        </div>
                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                            <a href="/David_s_CS_Resume.pdf" target="_blank" rel="noreferrer" className="resume-btn">
                                View Full Resume (PDF) <OpenInNewIcon style={{ fontSize: 14 }} />
                            </a>
                        </div>
                    </section>

                    {/* Projects */}
                    <section id="projects">
                        <div className="project-section-header">
                            <NumberedBadge num={4} label="Projects" />
                            <div className="project-sort-control">
                                <label htmlFor="project-sort" className="project-sort-label">
                                    Sort by
                                </label>
                                <span className="project-sort-divider" aria-hidden="true" />
                                <div className="project-sort-select-wrap">
                                    <select
                                        id="project-sort"
                                        className="project-sort-select"
                                        value={projectSort}
                                        onChange={(e) => setProjectSort(e.target.value as ProjectSort)}
                                    >
                                        {PROJECT_SORT_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-group">
                            {sortedProjects.map((proj) => (
                                <div
                                    key={proj.name}
                                    className="section-card"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 64px",
                                        gap: "16px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{proj.name}</p>
                                        <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.6, marginBottom: "8px" }}>{proj.desc}</p>
                                        <div>{proj.tags.map((t) => <Tag key={t} label={t} />)}</div>
                                    </div>
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "10px",
                                            background: proj.iconBg,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "24px",
                                            color: proj.iconColor ?? "var(--accent)",
                                            border: "1px solid var(--border)",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {proj.useGameIcon ? (
                                            <SportsEsportsIcon style={{ fontSize: 28, color: "#e74c3c" }} />
                                        ) : (
                                            <span>{proj.icon}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* YouTube */}
                    <section id="youtube">
                        <div style={{ marginBottom: "20px" }}>
                            <NumberedBadge num={5} label="YouTube" />
                        </div>
                        <div
                            className="section-card card-solo"
                            style={{
                                display: "block",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "50%",
                                        background: "#cc0000",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <YouTubeIcon style={{ fontSize: 28, color: "#fff" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: "18px", color: "var(--accent)", marginBottom: "2px" }}>@Duzzenn</p>
                                    <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>CS + SWE @ UWO | Simulation Dev | AI/ML Enthusiast</p>
                                </div>
                            </div>
                            <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.7, marginBottom: "14px" }}>
                                My YouTube channel where I share educational coding content for developers — from Python automation projects and game development showcases like Type Hero, to bite-sized Computer Science tutorials and Study With Me live streams. Join 900+ developers learning alongside me.
                            </p>
                            <a href="https://www.youtube.com/@Duzzenn" target="_blank" rel="noreferrer" className="resume-btn" style={{ fontSize: "11px" }}>
                                Visit Channel <OpenInNewIcon style={{ fontSize: 14 }} />
                            </a>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", paddingBottom: "24px" }}>
                        <p className="footer-text">
                            Built using <strong>React</strong>, <strong>Next.js</strong>, <strong>Tailwind</strong>, and{" "}
                            <strong>Material-UI</strong> ❤️ (2026)
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
