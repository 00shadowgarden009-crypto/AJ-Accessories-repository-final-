import HeroVisual from "./components/hero-visual";

const categories = [
  { id: "01", name: "Wireless earbuds", tag: "SOUND / FREEDOM", visual: "earbuds" },
  { id: "02", name: "Headphones", tag: "SOUND / IMMERSION", visual: "headphones" },
  { id: "03", name: "Mobile covers", tag: "FORM / PROTECTION", visual: "covers" },
  { id: "04", name: "Fast chargers", tag: "POWER / IN MOTION", visual: "chargers" },
  { id: "05", name: "Charging cables", tag: "POWER / PRECISION", visual: "cables" },
  { id: "06", name: "Power banks", tag: "ENERGY / ANYWHERE", visual: "power" },
  { id: "07", name: "Smart watches", tag: "TIME / REIMAGINED", visual: "watches" },
  { id: "08", name: "Screen protectors", tag: "CLARITY / COVERED", visual: "screens" },
  { id: "09", name: "Mobile stands", tag: "ANGLE / YOUR WAY", visual: "stands" },
  { id: "10", name: "Other accessories", tag: "MORE / YOURS", visual: "more" },
];

function CatalogState({ title }: { title: string }) {
  return (
    <div className="catalog-state">
      <span className="state-orbit" aria-hidden="true"><span /></span>
      <p className="state-title">{title}</p>
      <p>Products will appear here when the AJ catalog is connected.</p>
      <a className="text-link" href="#categories">Explore categories <span aria-hidden="true">↗</span></a>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> MOBILE ACCESSORIES / PAKISTAN</p>
          <h1 id="hero-title">UPGRADE<br />YOUR TECH.<br /><span>ELEVATE</span><br /><em>YOUR STYLE.</em></h1>
          <p className="hero-description">Discover the future of mobile accessories. Premium technology, exceptional design and innovation in every detail.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#categories">Explore collection <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="#catalog"><span className="play-mark" aria-hidden="true">↗</span> Shop now</a>
          </div>
          <div className="hero-meta"><span><i /> DESIGNED FOR WHAT’S NEXT</span><span>AJ / 01</span></div>
        </div>
        <HeroVisual />
        <div className="hero-index" aria-hidden="true">01 <span /> 10</div>
      </section>

      <section className="ticker" aria-label="Brand statement"><div className="ticker-track"><span>BETTER BY DESIGN</span><i>✳</i><span>MADE TO MOVE</span><i>✳</i><span>TECH, REFINED</span><i>✳</i><span>BETTER BY DESIGN</span><i>✳</i><span>MADE TO MOVE</span><i>✳</i><span>TECH, REFINED</span><i>✳</i></div></section>

      <section className="category-section section-wrap" id="categories" aria-labelledby="category-title">
        <div className="section-heading"><div><p className="eyebrow">01 / THE LINEUP</p><h2 id="category-title">Find your <em>frequency.</em></h2></div><p className="section-intro">Ten ways to make your everyday tech feel unmistakably yours.</p></div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className={`category-card category-${category.visual}`} href="#catalog" key={category.id}>
              <div className="category-visual" aria-hidden="true"><div className="category-shape"><span>{category.id}</span></div><i className="category-spark" /></div>
              <div className="category-info"><span className="category-tag">{category.tag}</span><span className="category-name">{category.name}</span><span className="category-arrow" aria-hidden="true">↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="catalog-section section-wrap" id="new-arrivals" aria-labelledby="new-title">
        <div className="section-heading"><div><p className="eyebrow">02 / FRESH PERSPECTIVE</p><h2 id="new-title">Just <em>landed.</em></h2></div><span className="live-label"><i /> NEW ARRIVALS</span></div>
        <CatalogState title="The next drop is taking shape." />
      </section>

      <section className="trending-section section-wrap" id="trending" aria-labelledby="trending-title">
        <div className="section-heading"><div><p className="eyebrow">03 / THE CURRENT</p><h2 id="trending-title">Making <em>waves.</em></h2></div><span className="live-label"><i /> TRENDING NOW</span></div>
        <CatalogState title="Good things are gaining momentum." />
      </section>

      <section className="bestsellers-section section-wrap" id="best-sellers" aria-labelledby="bestsellers-title">
        <div className="section-heading"><div><p className="eyebrow">04 / THE AJ EDIT</p><h2 id="bestsellers-title">The <em>standouts.</em></h2></div><span className="live-label">SALES-LED SELECTION</span></div>
        <CatalogState title="Your favorites will lead the way." />
      </section>

      <section className="flash-section" id="flash-sales" aria-labelledby="flash-title">
        <div className="flash-inner"><div className="flash-copy"><p className="eyebrow">05 / LIMITED WINDOWS</p><h2 id="flash-title">A little extra.<br /><em>For a little while.</em></h2><p>Time-sensitive edits will appear here when a promotion is scheduled.</p><span className="flash-status"><i /> NO ACTIVE PROMOTION</span></div><div className="flash-dial" aria-hidden="true"><span>AJ</span><small>DROP<br />WINDOW</small><i /></div></div>
      </section>

      <section className="brand-showcase" id="brand-story" aria-labelledby="story-title"><div className="showcase-lines" aria-hidden="true" /><p className="eyebrow">06 / A DIFFERENT KIND OF EVERYDAY</p><h2 id="story-title">Technology<br />should feel <em>personal.</em></h2><p className="showcase-copy">Less noise. Better details. Accessories chosen to bring a little more intention to everything you do.</p><a className="button button-outline" href="#categories">Meet your next essential <span aria-hidden="true">↗</span></a><span className="showcase-mark" aria-hidden="true">AJ</span></section>

      <section className="reasons section-wrap" aria-labelledby="reasons-title"><div className="section-heading"><div><p className="eyebrow">07 / THE AJ STANDARD</p><h2 id="reasons-title">Good tech.<br /><em>Good feeling.</em></h2></div><p className="section-intro">The experience matters as much as the object.</p></div><div className="reason-grid"><article><span>01</span><h3>Considered quality</h3><p>Thoughtful design, selected for the details you notice.</p></article><article><span>02</span><h3>Everyday value</h3><p>Premium-feeling essentials, with value kept in view.</p></article><article><span>03</span><h3>Secure by design</h3><p>A shopping experience built around clarity and care.</p></article><article><span>04</span><h3>Here to help</h3><p>Real support matters. Our contact details will be shared here.</p></article></div></section>

      <section className="reviews-section" aria-labelledby="reviews-title"><p className="eyebrow">08 / WORD OF MOUTH</p><h2 id="reviews-title">The best review<br />is <em>your own.</em></h2><p>Customer stories will appear here as verified reviews are collected.</p><span className="review-mark" aria-hidden="true">“</span></section>

      <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title"><div><p className="eyebrow">09 / THE NEXT DROP</p><h2 id="newsletter-title">Stay in the <em>loop.</em></h2><p>Updates and offers will be available when newsletter delivery is configured.</p></div><a className="button button-primary" href="#top">Back to the top <span aria-hidden="true">↑</span></a></section>

      <div className="catalog-anchors" id="catalog" aria-label="Shop catalog"><CatalogState title="The AJ catalog is getting ready." /></div>
      <span className="sr-only" id="wishlist">Wishlist tools will be available when customer accounts are configured.</span>
      <span className="sr-only" id="cart">Your cart will be available when checkout is configured.</span>
    </main>
  );
}
