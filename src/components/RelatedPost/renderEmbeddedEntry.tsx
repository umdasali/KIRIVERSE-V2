/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { BLOCKS } from "@contentful/rich-text-types";
import { Article } from "@/types/type";
import { calculateReadingTime, extractTextFromRichText, truncate } from "@/util/helper";

const renderEmbeddedEntry = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const entry = node.data.target;
      if (
        entry.sys.contentType.sys.id === "blogging" &&
        node.nodeType === "embedded-entry-block"
      ) {
        const { title, slug, thumbnail, tags, desc, category, createdAt } =
          entry.fields;
        const data: Article = {
          id: entry.sys.id,
          slug,
          title,
          desc,
          tags,
          category,
          createdAt,
          image: `https:${thumbnail.fields.file.url}`,
        };
        return (
            <article className="article-card">
              <Link
                style={{ textDecoration: "none" }}
                href={`/articles/${slug}`}
              >
                <div className="article-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https:${thumbnail.fields.file.url}`}
                    alt={data?.title}
                    loading="lazy"
                  />
                </div>
                <div className="article-body">
                  <span className="category-badge">{data?.category}</span>
                  <h3 className="article-title">{title}</h3>
                  <p className="article-excerpt">
                    {truncate(extractTextFromRichText(desc))}
                  </p>
                  <div className="article-footer">
                    <span>{calculateReadingTime(desc)} min read</span>
                  </div>
                </div>
              </Link>
            </article>
        );
      }
      return;
    },
  },
};

export function embeddedBlogEntry(document: any) {
  const safeDoc = JSON.parse(JSON.stringify(document));
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold mb-4 text-primary">Related Articles</h3>
      <div className="related-grid">
        {documentToReactComponents(safeDoc, renderEmbeddedEntry)}
      </div>
    </div>
  );
}
