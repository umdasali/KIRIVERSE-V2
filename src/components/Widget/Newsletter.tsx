import TwitterEmbed from '../embed/twitterEmbed'

function Newsletter({ id }: { id: string }) {
    return (
        <div className="sidebar-widget">
            {/* <h3 className="widget-title">Newsletter</h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                Get the latest news delivered to your inbox daily
            </p>
            <form className="newsletter-form" id="newsletterForm">
                <input type="email" placeholder="Enter your email" required aria-label="Email" />
                <button type="submit">Subscribe</button>
            </form> */}
            <TwitterEmbed id={id} />
        </div>
    )
}

export default Newsletter