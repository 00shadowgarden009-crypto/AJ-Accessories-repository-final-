import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link className="admin-brand" href="/admin"><b>AJ.</b><span>CONTROL</span></Link>
      <nav aria-label="Admin navigation">
        <Link href="/admin">◫ Overview</Link>
        <Link href="/admin/orders">▤ Orders</Link>
        <Link href="/admin/products">◇ Products</Link>
        <Link href="/admin/customers">◎ Customers</Link>
        <Link href="/admin/inventory">▥ Inventory</Link>
        <Link href="/admin/coupons">▧ Coupons</Link>
        <Link href="/admin/reviews">☆ Reviews</Link>
        <Link href="/admin/settings">⚙ Settings</Link>
      </nav>
      <Link className="admin-store-link" href="/">↗ View store</Link>
    </aside>
    <main className="admin-main">{children}</main>
  </div>;
}
