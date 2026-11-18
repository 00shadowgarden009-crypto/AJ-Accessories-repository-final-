import Link from "next/link";

export default function WishlistPage() {
  return <main className="simple-state"><p className="eyebrow">AJ / WISHLIST</p><h1>Your favorites,<br /><em>kept close.</em></h1><p>Wishlist synchronization becomes available with customer accounts and a catalog database.</p><Link className="button button-primary" href="/shop">Explore the shop <span>↗</span></Link></main>;
}
