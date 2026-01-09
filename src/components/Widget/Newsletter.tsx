import YoutubeEmbed from "../embed/YoutubeEmbed"

function Newsletter({ id }: { id: string }) {
    return (
        <div className="sidebar-widget">
            <YoutubeEmbed id={id} />
        </div>
    )
}

export default Newsletter