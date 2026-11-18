import Link from 'next/link';

export default function AdminOverview() {
  return <><header className="admin-header"><div><p className="eyebrow">AJ / CONTROL ROOM</p><h1>Good morning, <em>Admin.</em></h1></div><button className="button button-primary">+ Add product</button></header>
    <section className="metric-grid">
      <article><span>Total revenue</span><strong>Rs. 0</strong><small>Today · 0 orders</small></article>
      <article><span>Orders</span><strong>0</strong><small>0 awaiting action</small></article>
      <article><span>Customers</span><strong>0</strong><small>Registered accounts</small></article>
      <article><span>Low stock</span><strong>0</strong><small>Below threshold</small></article>
    </section>
    <section className="admin-panel"><div className="panel-heading"><div><p className="eyebrow">LATEST</p><h2>Recent orders</h2></div><Link href="/admin/orders">View all ↗</Link></div><div className="admin-empty"><span>▤</span><p>No orders have been placed yet.</p></div></section>
    <section className="admin-panel"><div className="panel-heading"><div><p className="eyebrow">CATALOG</p><h2>Products needing attention</h2></div><Link href="/admin/inventory">Manage inventory ↗</Link></div><div className="admin-empty"><span>◇</span><p>Inventory status will appear after products are added.</p></div></section>
  </>;
}
