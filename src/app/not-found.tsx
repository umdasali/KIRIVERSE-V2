import Link from "next/link";
import { Telescope, Home, MoveLeft } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Animated Icon Circle */}
        <div className={styles.iconCircle}>
          <Telescope className={styles.iconMain} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <div>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.heading}>Lost in the Kiriverse?</h2>
          <p className={styles.description}>
            The page you are looking for doesn&apos;t exist or has been moved to
            a different dimension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Home size={16} />
            Back to Home
          </Link>

          <Link
            href="/articles"
            className={`${styles.btn} ${styles.btnSecondary}`}
            type="button"
          >
            <MoveLeft size={16} />
            Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
