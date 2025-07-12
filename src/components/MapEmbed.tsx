type MapEmbedProps = {
  src: string;
  title?: string;
  className?: string;
};

function MapEmbed({ className, src, title }: MapEmbedProps) {
  return (
    <div className={`${className}`}>
      <iframe
        src={src}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}

export default MapEmbed;
