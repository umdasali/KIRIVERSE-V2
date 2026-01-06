/* eslint-disable @typescript-eslint/no-explicit-any */
import { backLinkURL } from "@/constants/appConstants"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"


export function extractText(content: any): string {
  if (!content) return ""
  if (typeof content === "string") return content
  try {
    return documentToPlainTextString(content)
  } catch {
    return ""
  }
}

export function readingTime(text: string): number {
  const words = text?.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateLong(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncate(text: string, max = 120) {
  return text?.length > max ? `${text.slice(0, max)}...` : text
}

export function extractPlainText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (content.nodeType && content.content) {
    return extractTextFromRichText(content);
  }
  if (content.text && typeof content.text === 'string') {
    return content.text;
  }
  return String(content || '');
}

export function extractTextFromRichText(document: any): string {
  if (!document || !document.content) return '';
  let text = '';
  
  function traverse(node: any) {
    if (node.nodeType === 'text') {
      text += node.value;
    } else if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
    if (node.nodeType === 'paragraph' || node.nodeType?.startsWith('heading-')) {
      text += ' ';
    }
  }
  
  if (Array.isArray(document.content)) {
    document.content.forEach(traverse);
  }
  return text.trim();
}

export const calculateReadingTime = (content: any): number => {
  const text = extractPlainText(content);
  if (!text) return 1;
  const wordCount = text.split(' ').filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
  
  return formatDate(dateString)
}

export function truncateDescription(description: string, maxLength: number = 120): string {
    if (!description || typeof description !== 'string') return ""
    return description.length > maxLength ? description.slice(0, maxLength) + "..." : description
}

export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return "/placeholder.svg";
  return imageUrl.startsWith('http') ? imageUrl : `https:${imageUrl}`;
}

export const getRelAttribute = (url: string): string => {
  const isKiriverse = url?.includes("kiriverse.com")
  const isBacklink = backLinkURL?.some(link => url?.startsWith(link))

  return (isKiriverse || isBacklink)
    ? "noopener noreferrer"
    : "noopener noreferrer nofollow"
}


export function getSocialIconName(url: string) {
  const lower = url.toLowerCase();

  if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("instagram.com")) return "insta";
  if (lower.includes("youtube.com")) return "youtube";
  if (lower.includes("github.com")) return "github";
  if (lower.includes("facebook.com")) return "facebook";
  if (lower.includes("twitch.tv")) return "twitch";
  if (lower.includes("tiktok.com")) return "tiktok";
  return "globe"; // fallback icon
}

export async function getAllArticleSlugs() {
  const url =
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}` +
    `/entries?content_type=blogging` +
    `&select=sys.updatedAt,fields.slug` +
    `&limit=1000`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.items.map((item: any) => ({
    slug: item.fields.slug,
    updatedAt: item.sys.updatedAt,
  }));
}
