type MapEmbedProps = {
  className?: string;
};

function MapEmbed({ className }: MapEmbedProps) {
  return (
    <div className={`${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11791.957568232869!2d-71.09678013942005!3d42.36406534183426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aeb68b7f17%3A0xe23345d0fe2cd49a!2sKendall%20Square%2C%20Cambridge%2C%20MA!5e0!3m2!1sen!2sus!4v1752273204400!5m2!1sen!2sus"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kendall Square map"
      ></iframe>
    </div>
  );
}

export default MapEmbed;
