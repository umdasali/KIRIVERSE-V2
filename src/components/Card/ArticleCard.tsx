import { Article } from '@/types/type'
import { formatDateLong, readingTime, truncate } from '@/util/helper'
import Link from 'next/link'
import React from 'react'

function ArticleCard({ data }: { data: Article }) {
    return (
        <article className="article-card">
            <Link style={{ textDecoration: "none" }} href={`articles/${data?.slug}`}>
            <div className="article-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data?.image ?? ''} alt={data?.title} loading="lazy" />
            </div>
            <div className="article-body">
                <span className="category-badge">{data?.category}</span>
                <h3 className="article-title">
                    {data?.title}
                </h3>
                <p className="article-excerpt">
                    {truncate(data?.desc, 200)}
                </p>
                <div className="article-footer">
                    <span>{readingTime(data?.desc)} min read</span>
                    <span>{formatDateLong(data?.createdAt)}</span>
                </div>
            </div>
            </Link>
        </article>
    )
}

export default ArticleCard