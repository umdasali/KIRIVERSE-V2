/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { createClient } from "contentful";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderRichText } from "@/components/richTextEditor/renderRichText";
import RelatedPost from "@/components/RelatedPost/RelatedPost";
import AuthorCard from "@/components/Card/AuthorCard";

// Use the same Contentful client configuration
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

interface NewsArticle {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: {
    title: string;
    slug: string;
    desc?: any;
    content?: any;
    description?: any;
    summary?: any;
    tags?: string[];
    category?: string;
    author?: {
      fields: {
        name?: string;
        bio?: string;
        image?: {
          fields: {
            file: {
              url?: string;
              details?: {
                image: {
                  width: number;
                  height: number;
                };
              };
            };
          };
        };
        socials?: string[];
      };
    };
    thumbnail?: {
      fields: {
        file: {
          url: string;
          details?: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
    featuredImage?: {
      fields: {
        file: {
          url: string;
          details?: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
    image?: {
      fields: {
        file: {
          url: string;
          details?: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
  };
}

// Text extraction functions
function extractPlainText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (content.nodeType && content.content) {
    return extractTextFromRichText(content);
  }
  if (content.text && typeof content.text === "string") {
    return content.text;
  }
  return String(content || "");
}

function extractTextFromRichText(document: any): string {
  if (!document || !document.content) return "";
  let text = "";

  function traverse(node: any) {
    if (node.nodeType === "text") {
      text += node.value;
    } else if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
    if (
      node.nodeType === "paragraph" ||
      node.nodeType?.startsWith("heading-")
    ) {
      text += " ";
    }
    if (node.nodeType === "list-item") {
      text += "\n";
    }
  }

  if (Array.isArray(document.content)) {
    document.content.forEach(traverse);
  }
  return text.trim();
}

function calculateReadingTime(content: any): number {
  const text = extractPlainText(content);
  if (!text) return 1;
  const wordCount = text.split(" ").filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// Generate canonical URL consistently
function generateCanonicalUrl(slug: string): string {
  return `https://www.kiriverse.com/articles/${slug}`;
}

function safeAuthorData(author: any) {
  try {
    if (!author?.fields) return null;

    const { name, bio, socials, image } = author.fields;

    return {
      name: typeof name === "string" ? name.trim() : undefined,
      bio: typeof bio === "string" ? bio : undefined,
      socials: Array.isArray(socials) ? socials : undefined,
      image: image?.fields?.file?.url ? image?.fields?.file?.url : undefined,
    };
  } catch {
    return null;
  }
}

// Generate JSON-LD structured data for articles
function generateArticleSchema(article: NewsArticle, url: string) {
  const featuredImage =
    article?.fields?.featuredImage ||
    article?.fields?.thumbnail ||
    article?.fields?.image;

  const description = extractPlainText(
    article?.fields?.desc ||
      article?.fields?.description ||
      article?.fields?.summary ||
      article?.fields?.content
  );

  // ✅ Safely extract author
  const authorData = safeAuthorData(article?.fields?.author);

  const authorObj = authorData
    ? {
        "@type": "Person",
        name: authorData.name || "KiriVerse Contributor",
        ...(authorData.image && {
          image: {
            "@type": "ImageObject",
            url: authorData.image,
          },
        }),
      }
    : {
        "@type": "Organization",
        name: "KiriVerse Media",
        url: "https://www.kiriverse.com",
      };

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.fields.title,
    description: description ? description.slice(0, 160) : undefined,
    image: featuredImage?.fields?.file?.url
      ? `https:${featuredImage.fields.file.url}`
      : undefined,
    datePublished: article.sys.createdAt,
    dateModified: article.sys.updatedAt,
    author: authorObj,
    publisher: {
      "@type": "Organization",
      name: "KiriVerse Media",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kiriverse.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.fields.tags?.join(", "),
    wordCount:
      extractPlainText(
        article?.fields?.content || article?.fields?.desc
      )?.split(" ").length || 0,
    timeRequired: `PT${calculateReadingTime(
      article?.fields?.content || article?.fields?.desc
    )}M`,
  };
}

// Generate breadcrumb schema
function generateBreadcrumbSchema(article: NewsArticle, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.kiriverse.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://www.kiriverse.com/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.fields.title,
        item: url,
      },
    ],
  };
}

async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    let entries = await client.getEntries({
      content_type: "blogging",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    });

    if (entries.items.length === 0) {
      try {
        const entry = await client.getEntry(slug, { include: 2 });
        if (entry.sys.contentType.sys.id === "blogging") {
          entries = { items: [entry], total: 1 } as any;
        } else {
          return null;
        }
      } catch (idError: any) {
        return null;
      }
    }

    if (entries.items.length === 0) {
      return null;
    }

    const entry = entries.items[0] as any;
    // console.log('✅ Article found:', {
    //     id: entry.sys.id,
    //     title: entry.fields.title,
    //     contentType: entry.sys.contentType.sys.id
    // })

    return entry;
  } catch (error) {
    return null;
  }
}

// Breadcrumb component
function BreadcrumbNavigation({ article }: { article: NewsArticle }) {
  return (
    <div className="breadcrumb">
      <div className="container">
        <Link href="/">Home</Link> / <Link href="articles">Article</Link> /{" "}
        <span>{article.fields.title}</span>
      </div>
    </div>
  );
}

// Main Article Page Component - FIXED: Await params
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // Now a Promise in Next.js 15
}) {
  // Await params before accessing properties
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const mainContent =
    article.fields.content ||
    article.fields.desc ||
    article.fields.description ||
    article.fields.summary;

  const description = extractPlainText(
    article.fields.desc ||
      article.fields.description ||
      article.fields.summary ||
      mainContent
  );

  const blogEntry = mainContent?.content?.filter(
    (node: any) => node.nodeType === "embedded-entry-block"
  );

  const readingTime = calculateReadingTime(mainContent);
  const featuredImage =
    article.fields.featuredImage ||
    article.fields.thumbnail ||
    article.fields.image;

  // Generate current URL for structured data using consistent function
  const currentUrl = generateCanonicalUrl(slug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {article && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                generateArticleSchema(article, currentUrl),
                null,
                2
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                generateBreadcrumbSchema(article, currentUrl)
              ),
            }}
          />
        </>
      )}
      {/* <!-- Main Article --> */}
      <article className="article-main">
        <BreadcrumbNavigation article={article} />
        <header className="article-header">
          <span className="category-badge" style={{ marginTop: "10px" }}>
            {article.fields.category}
          </span>
          <h1>{article.fields.title}</h1>
        </header>

        <figure className="article-featured-image">
          {/* <img src={`https:${featuredImage?.fields?.file?.url}`} alt={`Featured image for ${article.fields.title}`} loading="lazy" /> */}
          <Image
            src={`https:${featuredImage?.fields?.file?.url}`}
            alt={`Featured image for ${article.fields.title}`}
            height="400"
            width="800"
            priority
            itemProp="image"
          />
          <figcaption>{`${article.fields.title}`}</figcaption>
        </figure>

        {mainContent &&
        typeof mainContent === "object" &&
        mainContent.nodeType ? (
          <div className="rich-text-content" itemProp="articleBody">
            {renderRichText(mainContent)}
          </div>
        ) : (
          <div className="rich-text-content" itemProp="articleBody">
            {extractPlainText(mainContent) || "No content available."}
          </div>
        )}

        {article.fields.tags && article.fields.tags.length > 0 && (
          <footer className="article-footer-tags">
            <strong>Tags: </strong>
            {article.fields.tags.map((tag: string, index: number) => (
              <a href="#" key={index} className="tag">
                {tag}
              </a>
            ))}
          </footer>
        )}

          <AuthorCard article={article} />

        {/* <!-- Comments Section --> */}
        {/* <section className="comments-section">
                    <h3>Comments (12)</h3>
                    <form className="comment-form">
                        <textarea placeholder="Share your thoughts..." required></textarea>
                        <button type="submit">Post Comment</button>
                    </form>

                    <div className="comments-list">
                        <div className="comment">
                            <img src="https://i.pravatar.cc/50?img=2" alt="User" className="comment-avatar" />
                            <div className="comment-content">
                                <strong>John Doe</strong>
                                <span className="comment-time">2 hours ago</span>
                                <p>Great article! AI is definitely changing the game.</p>
                            </div>
                        </div>

                        <div className="comment">
                            <img src="https://i.pravatar.cc/50?img=3" alt="User" className="comment-avatar" />
                            <div className="comment-content">
                                <strong>Jane Smith</strong>
                                <span className="comment-time">5 hours ago</span>
                                <p>Very informative. Looking forward to seeing how this technology develops.</p>
                            </div>
                        </div>
                    </div>
                </section> */}

        {/* <!-- Related Articles --> */}
        <section className="related-articles">
          {blogEntry?.length !== 0 && (
            <div className="mt-6">{<RelatedPost {...{ blogEntry }} />}</div>
          )}
        </section>
      </article>
    </>
  );
}

// Enhanced SEO metadata generation - FIXED: Await params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // Now a Promise in Next.js 15
}): Promise<Metadata> {
  // Await params before accessing properties
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | KiriVerse",
      description: "The requested article could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const description = extractPlainText(
    article.fields.desc ||
      article.fields.description ||
      article.fields.summary ||
      article.fields.content
  );

  const featuredImage =
    article.fields.featuredImage ||
    article.fields.thumbnail ||
    article.fields.image;

  // Use consistent canonical URL generation
  const currentUrl = generateCanonicalUrl(slug);
  const siteName = "KiriVerse";

  return {
    title: `${article?.fields?.title}`,
    description: description
      ? description.slice(0, 160)
      : `Read ${article?.fields?.title} on ${siteName}`,
    keywords: article?.fields?.tags?.join(", "),
    authors: article?.fields?.author?.fields?.name
      ? [{ name: article?.fields?.author?.fields?.name }]
      : [{ name: "kiriVerse" }],
    creator: article?.fields?.author?.fields?.name || "KiriVerse",
    publisher: siteName,
    alternates: {
      canonical: currentUrl, // Consistent canonical URL
    },
    openGraph: {
      title: article?.fields?.title,
      description: description ? description.slice(0, 160) : undefined,
      url: currentUrl, // Same URL as canonical
      siteName: siteName,
      locale: "en_US",
      type: "article",
      publishedTime: article?.sys?.createdAt,
      modifiedTime: article?.sys?.updatedAt,
      authors: article?.fields?.author?.fields?.name
        ? article?.fields?.author?.fields?.name
        : "KiriVerse",
      tags: article?.fields?.tags,
      images: featuredImage?.fields?.file?.url
        ? [
            {
              url: `https:${featuredImage?.fields?.file?.url}`,
              width: featuredImage.fields?.file?.details?.image?.width || 1200,
              height: featuredImage.fields?.file?.details?.image?.height || 630,
              alt: `Featured image for ${article?.fields?.title}`,
              type: "image/jpeg",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@kiriverse",
      creator: "@kiriverse",
      title: article?.fields?.title,
      description: description ? description.slice(0, 160) : undefined,
      images: featuredImage?.fields?.file?.url
        ? [
            {
              url: `https:${featuredImage?.fields?.file?.url}`,
              alt: `Featured image for ${article?.fields?.title}`,
            },
          ]
        : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    other: {
      "article:published_time": article?.sys?.createdAt,
      "article:modified_time": article?.sys?.updatedAt,
      "article:author": article?.fields?.author?.fields?.name || "",
      "article:section": "News",
      "article:tag": article?.fields?.tags?.join(", ") || "",
    },
  };
}

// Generate static params with error handling
export async function generateStaticParams() {
  try {
    const entries = await client.getEntries({
      content_type: "blogging",
      limit: 1000,
      select: ["fields.slug", "sys.id"],
    });

    const params = entries.items
      .filter((entry: any) => entry.fields?.slug)
      .map((entry: any) => ({
        slug: entry.fields.slug,
      }));
    return params;
  } catch (error) {
    return [];
  }
}

// Revalidation configuration
export const revalidate = 3600; // Revalidate every hour
