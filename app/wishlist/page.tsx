import Link from 'next/link';

export default function WishlistPage() {
  return <main className="simple-state"><p className="eyebrow">YOUR AJ / WISHLIST</p><h1>Your <em>wishlist.</em></h1><div className="account-empty"><span>♡</span><p>Your saved products will appear here.</p><Link className="button button-primary" href="/shop">Explore shop</Link></div></main>;
}
