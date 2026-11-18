import Link from "next/link";

export default function AccountPage() {
  return <main className="simple-state"><p className="eyebrow">AJ / CUSTOMER ACCOUNT</p><h1>Everything, <em>in one place.</em></h1><p>Registration, login and order history require secure authentication to be enabled.</p><Link className="button button-primary" href="/shop">Return to shop <span>↗</span></Link></main>;
}
