"use client";

import { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Theme = "dark" | "light";

function getTheme(): Theme {
    if (typeof document === "undefined") return "dark";
    return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
}

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTheme(getTheme());
        setMounted(true);
    }, []);

    const toggle = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {mounted ? (
                theme === "dark" ? (
                    <LightModeIcon style={{ fontSize: 20 }} />
                ) : (
                    <DarkModeIcon style={{ fontSize: 20 }} />
                )
            ) : (
                <LightModeIcon style={{ fontSize: 20 }} />
            )}
        </button>
    );
}
