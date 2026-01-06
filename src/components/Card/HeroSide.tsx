/* eslint-disable @next/next/no-img-element */
import { Article } from '@/types/type'
import { formatDateLong } from '@/util/helper'
import Link from 'next/link'

function HeroSide({ data }: { data: Article }) {
    return (
        <Link style={{ textDecoration: "none" }} href={`articles/${data?.slug}`}>
            <article className="side-article">

                <img src={data?.image ?? ''} alt={data?.title} loading="lazy" />
                <div className="side-article-content">
                    <span className="category-badge">{data?.category}</span>
                    <h3>{data?.title}</h3>
                    <div className="hero-meta">{formatDateLong(data?.createdAt)}</div>
                </div>

            </article>
        </Link>
    )
}

export default HeroSide