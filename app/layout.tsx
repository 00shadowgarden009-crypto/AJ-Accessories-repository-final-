import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ Accessories — The finishing touch",
  description:
    "Thoughtfully selected accessories made to elevate every day. Discover the AJ Accessories edit.",
};

const links = [
  { href: "#new-arrivals", label: "New arrivals" },
  { href: "#collections", label: "Collections" },
  { href: "#story", label: "Our story" },
];

function BrandMark() {
  return (
    <a className="brand-mark" href="#top" aria-label="AJ Accessories home">
      <span className="brand-monogram">AJ</span>
      <span className="brand-name">ACCESSORIES</span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#collections">
          Shop the edit <span aria-hidden="true">↗</span>
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
            <a href="#collections">Shop the edit</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <BrandMark />
      <p>Made for the details that make it yours.</p>
      <a href="mailto:hello@ajaccessories.com">Get in touch ↗</a>
      <span className="copyright">© {new Date().getFullYear()} AJ Accessories</span>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
