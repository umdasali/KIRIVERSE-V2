import { Article } from '@/types/type'

function HeroMain({ data }: { data: Article }) {
    return (
        <article className="hero-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data?.image ?? ''} alt={data?.title} loading="lazy" />
            <div className="hero-content">
                {data?.tags?.map((tag: string) => (<span style={{ marginRight: "10px" }} key={tag} className="category-badge">{tag}</span>))}
                <h1 className="hero-title">
                    <a href="article-detail.html">{data?.title}</a>
                </h1>
                <div className="hero-meta">
                    <span>By Sarah Johnson</span> • <span>2 hours ago</span>
                </div>
            </div>
        </article>
    )
}

export default HeroMain