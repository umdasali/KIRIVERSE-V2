/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import SideBarWidget from "../Widget/SideBarWidget";
import Newsletter from "../Widget/Newsletter";
import Categories from "../Widget/Categories";
import { extractText } from "@/util/helper";

async function getFacts(): Promise<{ items: { id: string; desc: string }[] }> {
  const url =
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}` +
    `/entries?content_type=facts` +
    `&order=-sys.createdAt` +
    `&include=2` +
    `&select=sys.id,sys.createdAt,fields.desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("Contentful error:", await res.text());
    return { items: [] };
  }

  const data = await res.json();

  const items = data.items.map((item: any) => ({
    id: item.sys.id,
    desc: extractText(item.fields.desc),
  }));

  return { items };
}

async function getSocialEmbed(): Promise<{
  items: { youtube: string; instagram: string }[];
}> {
  const url =
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}` +
    `/entries?content_type=socials` +
    `&order=-sys.createdAt` +
    `&include=2` +
    `&select=sys.id,sys.createdAt,fields.youtube,fields.instagram`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("Contentful error:", await res.text());
    return { items: [] };
  }

  const data = await res.json();

  const items = data.items.map((item: any) => ({
    id: item.sys.id,
    youtube: item.fields.youtube,
    instagram: item.fields.instagram,
  }));

  return { items };
}

async function MainLayout({ children }: { children: ReactNode }) {
  const facts = await getFacts();
  const { items } = await getSocialEmbed();

  const { instagram, youtube } = items?.[0] as {
    youtube: string;
    instagram: string;
  };

  return (
    <main className="main-content">
      <div className="container">
        <div className="content-layout">
          {/* Main content */}
          {children}
          {/* Aside */}
          <aside className="sidebar">
            <aside className="sidebar">
              {/* Google AdSense - Sidebar Ad */}
              {/* <SideBarAdsCard /> */}

              <SideBarWidget facts={facts?.items} />

              <Categories insta_feed_id={instagram} />

              <Newsletter id={youtube} />
            </aside>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
