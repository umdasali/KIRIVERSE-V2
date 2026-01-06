/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { capitalize } from "lodash";

import { formatRelativeTime, getSocialIconName } from "@/util/helper";

function AuthorCard({ article }: any) {
  const author = article?.fields?.author?.fields;

  if (!author?.name) return null;

  if (
    typeof window !== "undefined" &&
    window.location.href.includes("google.com")
  ) {
    return null;
  }

  return (
    <div className="article-meta">
      {/* ---------- AUTHOR INFO ---------- */}
      <div className="author-info">
        <Image
          src={author?.image?.fields?.file?.url ?? ""}
          alt={author?.name || "Author"}
          className="author-avatar"
          width={120}
          height={120}
        />

        <div className="author-details">
          <strong>By {author?.name}</strong>

          {author?.bio && (
            <span itemProp="author">{author?.bio}</span>
          )}

          <div className="author-meta">
            <p>
              <Calendar />
              <span>
                Published {formatRelativeTime(article?.sys?.createdAt)}
              </span>
            </p>

            {article?.sys?.updatedAt !== article?.sys?.createdAt && (
              <p>
                <RefreshCw />
                <span>
                  Updated {formatRelativeTime(article?.sys?.updatedAt)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ---------- SOCIAL SHARE ---------- */}
      {Array.isArray(author?.socials) && author.socials.length > 0 && (
        <div className="social-share">
          <span>Share</span>

          {author.socials.map((url: string, i: number) => {
            const iconName = getSocialIconName(url);

            return (
              <Link
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={iconName}
              >
                <Image
                  src={`/socials/${iconName}.svg`}
                  alt={iconName}
                  width={16}
                  height={16}
                />

                <span>
                  {capitalize(iconName === "globe" ? "Website" : iconName)}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AuthorCard;
