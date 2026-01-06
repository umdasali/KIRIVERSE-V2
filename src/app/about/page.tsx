/* eslint-disable @next/next/no-img-element */
import styles from "./about.module.css";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About KiriVerse",
  url: "https://www.kiriverse.com/about",
  description:
    "KiriVerse is an anime and gaming news platform covering stories, reviews, features, and fan culture.",
  publisher: {
    "@type": "NewsMediaOrganization",
    name: "KiriVerse Media",
    url: "https://www.kiriverse.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.kiriverse.com/favicon.png",
    },
    sameAs: [
      "https://x.com/KIRI_VERSE",
      "https://www.instagram.com/kiriverseofficial",
      "https://www.reddit.com/user/FateArt",
    ],
  },
};

const team = [
  {
    name: "MD Ali",
    role: "Editor-in-Chief",
    img: "/mdali.jpg",
  },
  {
    name: "Kiri",
    role: "Staff Writer | Anime",
    img: "/kiri.gif",
  },
  {
    name: "Akira",
    role: "Staff Writer | Gaming",
    img: "/akira.gif",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className={styles.about}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <h1>Welcome to KiriVerse</h1>
          </header>

          <section className={styles.intro}>
            <p>
              KiriVerse is a global fan-first media platform covering anime,
              gaming, technology, and entertainment. We deliver trusted news,
              reviews, features, and cultural analysis that explore the stories,
              creators, and innovations shaping today’s digital and
              fandom-driven world.
            </p>
          </section>

          <section className={styles.features}>
            <h2>🎮 What We Do</h2>
            <ul className={styles.featureGrid}>
              <li>
                <strong>Anime:</strong> Reviews, breakdowns & trends
              </li>
              <li>
                <strong>Gaming:</strong> News, guides & honest takes
              </li>
              <li>
                <strong>Technology:</strong> Gadgets, AI, apps & digital
                innovation
              </li>
              <li>
                <strong>Entertainment:</strong> Movies, series, celebrities &
                culture
              </li>
              <li>
                <strong>Pop Culture:</strong> Conventions, creators & fandom
              </li>
            </ul>
          </section>

          <section className={styles.mission}>
            <div>
              <h3>✨ Our Mission</h3>
              <p>
                To connect fans and creators through authentic storytelling and
                meaningful content.
              </p>
            </div>
            <div>
              <h3>🌍 Why KiriVerse?</h3>
              <p>
                A shared universe where every story, fan, and creator matters.
              </p>
            </div>
            <div className={styles.full}>
              <h3>💫 Join the Universe</h3>
              <p>
                Be part of a global community that lives and breathes anime,
                gaming, technology, and entertainment culture.
              </p>
            </div>
          </section>

          <section className={styles.team}>
            <h2>📝 Editorial Team</h2>
            <div className={styles.teamGrid}>
              {team.map((m) => (
                <div key={m.name} className={styles.member}>
                  <img src={m.img} alt={m.name} />
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <h2>Ready to Explore the KiriVerse?</h2>
            <p>
              Trusted by anime and gaming fans worldwide for quality content.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
