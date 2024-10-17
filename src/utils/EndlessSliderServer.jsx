export default function EndlessSliderServer({text, className}) {
  const texts = new Array(50).fill(text);

  return (
      <div className={className}>
        <div className="slider-container">
          <ul className="slide-track">
            {/* Render each text as a slide */}
            {texts.map((text, index) => (
              <li key={index} className="slide">{text}</li>
            ))}

            {/* Duplicate the set of texts for a continuous loop */}
            {texts.map((text, index) => (
              <li key={`duplicate-${index}`} className="slide">{text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
}