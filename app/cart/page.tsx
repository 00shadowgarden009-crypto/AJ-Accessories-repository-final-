import Link from "next/link";

export default function CartPage() {
  return <main className="simple-state"><p className="eyebrow">AJ / SHOPPING CART</p><h1>Your cart is<br /><em>ready for a move.</em></h1><p>The persistent cart and checkout system are prepared for the backend phase.</p><Link className="button button-primary" href="/shop">Continue shopping <span>↗</span></Link></main>;
}
