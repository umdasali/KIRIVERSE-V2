"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/games", label: "Games" },
  { href: "/anime-and-manga", label: "Anime & Manga" },
  { href: "/technology", label: "Technology" },
  { href: "/entertainments", label: "Entertainment" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="header" role="banner">
      <div className="site-header-inner">
        <nav
          className="nav-container"
          aria-label="Primary navigation"
          role="navigation"
        >
          <div className="container">
            <div className="nav-wrapper">
              <ul
                className={isOpen ? "nav-menu active" : "nav-menu"}
                id="navMenu"
              >
                <li
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer"
                  }}
                  onClick={() => router.push("/")}
                >
                  <Image
                    src="/transparent-logo.png"
                    height={40}
                    width={40}
                    alt="KiriVerse logo"
                    style={{ borderRadius: "25px", overflow: "hidden" }}
                  />
                </li>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={pathname === link.href ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                ))}
              </ul>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="mobile-menu-btn"
                id="mobileMenuBtn"
                aria-label="Menu"
              >
                ☰
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
