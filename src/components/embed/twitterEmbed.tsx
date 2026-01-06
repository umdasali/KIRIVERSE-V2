export default function TwitterEmbed({ id = "" }: { id: string }) {
  return (
    id && (
      <div className="aspect-video w-full">
        <iframe
          width="300"
          height="315"
          src={`https://www.youtube.com/embed/1clWprLC5Ak?si=${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    )
  );
}
