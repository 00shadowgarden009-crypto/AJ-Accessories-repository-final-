import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ ACCERSSORES — Upgrade your tech. Elevate your style.",
  description:
    "Discover premium mobile accessories from AJ ACCERSSORES. Designed for the next move.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="announcement-bar"><span className="status-dot" /> THE NEXT MOVE STARTS HERE <span className="announcement-line" /> ACCESSORIES, REIMAGINED</div>
        <header className="site-header">
          <div className="header-inner">
            <a className="brand-mark" href="/" aria-label="AJ ACCERSSORES home">
              <span className="brand-monogram">AJ<span>.</span></span>
              <span className="brand-name">ACCERSSORES</span>
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="/">Home</a>
              <a href="/shop">Shop</a>
              <a href="/#categories">Categories</a>
              <a href="/shop#new-arrivals">New arrivals</a>
              <a href="/shop#best-sellers">Best sellers</a>
              <a href="/#brand-story">About</a>
            </nav>
            <div className="header-actions">
              <a className="header-icon" href="/shop?search=open" aria-label="Search">⌕</a>
              <a className="header-icon" href="/wishlist" aria-label="Wishlist">♡</a>
              <a className="header-icon cart-indicator" href="/cart" aria-label="Shopping cart">▱<span>0</span></a>
            </div>
            <details className="mobile-menu">
              <summary aria-label="Open navigation menu"><span /><span /></summary>
              <nav aria-label="Mobile navigation">
                <a href="/">Home</a><a href="/shop">Shop</a><a href="/#categories">Categories</a>
                <a href="/shop#new-arrivals">New arrivals</a><a href="/shop#best-sellers">Best sellers</a>
                <a href="/#brand-story">About us</a><a href="/cart">Cart</a>
              </nav>
            </details>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-brand"><a className="brand-mark" href="/"><span className="brand-monogram">AJ<span>.</span></span><span className="brand-name">ACCERSSORES</span></a><p>Technology, with a touch of intention.</p></div>
            <div className="footer-links"><span className="footer-label">EXPLORE</span><a href="/shop">Shop all</a><a href="/#categories">Categories</a><a href="/#brand-story">Our story</a></div>
            <div className="footer-links"><span className="footer-label">YOUR AJ</span><a href="/wishlist">Wishlist</a><a href="/cart">Shopping cart</a><a href="/account">Account</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} AJ ACCERSSORES</span><span>Designed for the next move.</span><span>Pakistan · PKR</span></div>
        </footer>
      </body>
    </html>
  );
}
