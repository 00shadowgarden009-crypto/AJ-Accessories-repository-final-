import Link from "next/link";

export default function TrackPage() {
  return <main className="simple-state"><p className="eyebrow">AJ / ORDER TRACKING</p><h1>Follow the <em>move.</em></h1><form className="tracking-form"><label>Order number<input name="orderNumber" placeholder="AJ-000000" /></label><label>Phone number<input name="phone" type="tel" placeholder="03XX XXX XXXX" /></label><button className="button button-primary" type="submit">Track order <span>↗</span></button></form><Link className="text-link" href="/">Back home</Link></main>;
}
