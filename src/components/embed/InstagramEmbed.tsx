/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from "react";

export default function InstagramEmbed({ insta_feed_id }: { insta_feed_id: string }) {
  useEffect(() => {
    // Load Instagram embed script only once
    if (!(window as any)?.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any)?.instgrm.Embeds.process();
    }
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={`https://www.instagram.com/p/${insta_feed_id}/`}
      data-instgrm-version="13"
      style={{
        background: "#15171c",
        border: 0,
        borderRadius: "3px",
        boxShadow:
          "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px",
        maxWidth: "540px",
        minWidth: "326px",
        padding: 0,
        width: "99.375%",
      }}
      data-theme="dark"
    >
      <div style={{ padding: "16px" }}>
        <a
          href={`https://www.instagram.com/p/${insta_feed_id}/`}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#15171c",
            lineHeight: 0,
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
            display: "block",
          }}
        >
          <div
            style={{
              color: "#3897f0",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              paddingTop: "8px",
            }}
          >
            View this post on Instagram
          </div>
        </a>

        <p
          style={{
            color: "#c9c8cd",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            lineHeight: "17px",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          <a
            href={`https://www.instagram.com/p/${insta_feed_id}/`}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#c9c8cd",
              textDecoration: "none",
            }}
          >
            A post shared by KiriVerse (@kiriverseofficial)
          </a>
        </p>
      </div>
    </blockquote>
  );
}
