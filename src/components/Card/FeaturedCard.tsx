import { Article } from '@/types/type'
import { formatDateLong, readingTime, truncate } from '@/util/helper'
import Link from 'next/link'

function FeaturedCard({ data }: { data: Article }) {

    return (
        <Link style={{ textDecoration: "none" }} href={`articles/${data?.slug}`}>
            <article className="featured-article">
                <div className="featured-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data?.image ?? ''} alt={data?.title} loading="lazy" />
                </div>
                <div className="featured-content">
                    <span className="category-badge">{data?.category}</span>
                    <h2 style={{ color: "#fff" }}>{data?.title}</h2>
                    <p>{truncate(data?.desc, 200)}</p>
                    <div className="article-footer">
                        <span>{readingTime(data?.desc)} min read</span>
                        <span>{formatDateLong(data?.createdAt)}</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default FeaturedCard