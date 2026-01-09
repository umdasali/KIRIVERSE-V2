import InstagramEmbed from '../embed/InstagramEmbed'

function Categories({ insta_feed_id }: { insta_feed_id: string }) {
    return (
        <div className="">
            {/* <h3 className="widget-title">Categories</h3>
            <ul className="footer-links">
                <li><a href="tech.html">Technology (245)</a></li>
                <li><a href="games-anime.html">Gaming (189)</a></li>
                <li><a href="games-anime.html">Anime (156)</a></li>
                <li><a href="#">Entertainment (203)</a></li>
                <li><a href="#">Lifestyle (134)</a></li>
                <li><a href="#">Health (98)</a></li>
            </ul> */}
            <InstagramEmbed insta_feed_id={insta_feed_id} />
        </div>
    )
}

export default Categories