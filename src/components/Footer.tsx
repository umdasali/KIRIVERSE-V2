import { BadgeCheck, Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/games", label: "Games" },
    { href: "/anime-and-manga", label: "Anime & Manga" },
    { href: "/technology", label: "Technology" },
    { href: "/entertainments", label: "Entertainment" },
    { href: "/about", label: "About"}
  ];

  const legalLinks = [
    { href: "/contact", label: "Contact"},
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/dmca", label: "DMCA" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <Image
              src="/transparent-logo.png"
              height={70}
              width={70}
              alt="KiriVerse logo"
              style={{ borderRadius: "25px" }}
            />
            <h3 style={{ color: "#e64c70" }}>KiriVerse</h3>
            <p
              style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}
            >
              Your ultimate hub for anime and gaming content. Discover trending
              anime, featured games, and iconic characters.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link?.href}>
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              {legalLinks.map((link) => (
                <li key={link?.href}>
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.reddit.com/user/FateArt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BadgeCheck color="#e64c70" height={16} /> Reddit
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/KIRI_VERSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter color="#e64c70" height={16} /> X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kiriverseofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram color="#e64c70" height={16} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:kiriverse.contact@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail color="#e64c70" height={16} /> Gmail
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} KiriVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
