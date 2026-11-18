import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ ACCERSSORES — Upgrade your tech. Elevate your style.",
  description:
    "Discover the AJ ACCERSSORES design system: a premium, responsive mobile-accessories experience for customers in Pakistan.",
  openGraph: {
    title: "AJ ACCERSSORES — Upgrade your tech. Elevate your style.",
    description: "Premium mobile accessories, considered in every detail.",
    type: "website",
  },
};

const categories = [
  "Wireless Earbuds",
  "Headphones",
  "Mobile Covers",
  "Fast Chargers",
  "Charging Cables",
  "Power Banks",
  "Smart Watches",
  "Screen Protectors",
  "Mobile Stands",
  "Other Accessories",
];

function BrandMark() {
  return (
    <a className="brand-mark" href="#top" aria-label="AJ ACCERSSORES home">
      <span className="brand-monogram">AJ<span>.</span></span>
      <span className="brand-name">ACCERSSORES</span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#top">Home</a>
          <details className="nav-dropdown">
            <summary>Shop <span aria-hidden="true">⌄</span></summary>
            <div className="dropdown-panel">
              {categories.slice(0, 5).map((category) => (
                <a href="#categories" key={category}>{category}</a>
              ))}
            </div>
          </details>
          <a href="#categories">Categories</a>
          <a href="#new-arrivals">New arrivals</a>
          <a href="#best-sellers">Best sellers</a>
          <a href="#brand-story">About</a>
        </nav>
        <div className="header-actions">
          <a className="header-icon" href="#catalog" aria-label="Browse products">⌕</a>
          <a className="header-icon" href="#wishlist" aria-label="Wishlist">♡</a>
          <a className="header-icon cart-indicator" href="#cart" aria-label="Shopping cart">▱<span>0</span></a>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="#top">Home</a>
            <a href="#categories">Categories</a>
            <a href="#new-arrivals">New arrivals</a>
            <a href="#best-sellers">Best sellers</a>
            <a href="#brand-story">About us</a>
            <a href="#catalog">Shop the collection</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><BrandMark /><p>Technology, with a touch of intention.</p></div>
        <div className="footer-links"><span className="footer-label">EXPLORE</span><a href="#categories">Categories</a><a href="#new-arrivals">New arrivals</a><a href="#brand-story">Our story</a></div>
        <div className="footer-links"><span className="footer-label">YOUR AJ</span><a href="#catalog">Shop accessories</a><a href="#newsletter">Get updates</a><a href="#top">Back to top ↑</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} AJ ACCERSSORES</span><span>Designed for the next move.</span><span>Pakistan · PKR</span></div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="announcement-bar"><span className="status-dot" /> THE NEXT MOVE STARTS HERE <span className="announcement-line" /> ACCESSORIES, REIMAGINED</div>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
