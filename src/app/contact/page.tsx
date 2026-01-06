import Link from "next/link";
import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact KiriVerse | Anime, Gaming & Pop Culture Media",
  description:
    "Get in touch with KiriVerse for collaborations, media inquiries, or community connections across anime, gaming, technology, and entertainment.",
};

export default function ContactPage() {
  const contacts = [
    {
      label: "Email",
      value: "kiriverse.contact@gmail.com",
      href: "mailto:kiriverse.contact@gmail.com",
      svg: "/socials/gmail.svg",
    },
    {
      label: "Reddit",
      value: "u/FateArt",
      href: "https://www.reddit.com/user/FateArt/",
      svg: "/socials/reddit.svg",
    },
    {
      label: "X (Twitter)",
      value: "@KIRI_VERSE",
      href: "https://x.com/KIRI_VERSE",
      svg: "/socials/twitter.svg",
    },
    {
      label: "Instagram",
      value: "@kiriverseofficial",
      href: "https://www.instagram.com/kiriverseofficial/",
      svg: "/socials/insta.svg",
    },
  ];

  return (
    <main className={styles.contact}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Contact KiriVerse</h1>

        <p className={styles.subtitle}>
          Have a question, business inquiry, or just want to say hello?
          We’d love to hear from you. Reach out through any of the platforms below.
        </p>

        <div className={styles.card}>
          {contacts.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <div className={styles.left}>
                <Image
                  src={contact.svg}
                  alt={`${contact.label} icon`}
                  width={24}
                  height={24}
                />
                <span>{contact.label}</span>
              </div>

              <span className={styles.value}>{contact.value}</span>
            </Link>
          ))}
        </div>

        <p className={styles.footerText}>
          We typically respond within 24–48 hours.
          <br />
          Thank you for being part of the KiriVerse community 💫
        </p>
      </div>
    </main>
  );
}
