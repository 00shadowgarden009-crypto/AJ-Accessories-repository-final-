const collections = [
  {
    number: "01",
    name: "Everyday icons",
    detail: "The pieces you reach for, on repeat.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1100&q=85",
    alt: "A refined neutral leather handbag",
  },
  {
    number: "02",
    name: "Golden hour",
    detail: "Little details. A lasting impression.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",
    alt: "Sculptural gold-toned jewelry",
  },
  {
    number: "03",
    name: "On the move",
    detail: "Considered companions for everywhere.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1100&q=85",
    alt: "A classic everyday wristwatch",
  },
];

export default function Home() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> The details make the look</p>
          <h1 id="hero-title">A little more <em>you.</em></h1>
          <p className="hero-description">
            Thoughtful accessories. Effortless expression. Find the finishing
            touch that feels like it was always yours.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#collections">
              Explore the collection <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#story">Discover AJ</a>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            <p>Considered pieces, chosen to be kept.</p>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="A curated still life of timeless accessories">
          <div className="hero-image" />
          <div className="image-caption"><span>THE EVERYDAY EDIT</span><span>VOL. 01 — 2026</span></div>
          <div className="hero-stamp" aria-hidden="true"><span>AJ</span><small>EST.<br />WITH INTENTION</small></div>
        </div>
        <div className="hero-index" aria-hidden="true">01 — 03</div>
      </section>

      <section className="collection section-wrap" id="collections" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A thoughtful edit</p>
            <h2 id="collection-title">Made to <em>go with you.</em></h2>
          </div>
          <a className="text-link collection-link" href="#new-arrivals">View all pieces <span aria-hidden="true">↗</span></a>
        </div>
        <div className="collection-grid" id="new-arrivals">
          {collections.map((item) => (
            <a className="collection-card" href="#story" key={item.number}>
              <div className="card-image-wrap">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="card-number">{item.number}</span>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="card-copy">
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <p className="eyebrow">A note from AJ</p>
        <h2 id="story-title">Style isn’t what you wear.<br />It’s <em>how you make it yours.</em></h2>
        <p>We believe the best accessories don’t ask for attention. They make every day feel a little more considered.</p>
        <a className="text-link" href="mailto:hello@ajaccessories.com">A little more about us <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
