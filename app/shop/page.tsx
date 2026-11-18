import Link from "next/link";

const categories = ["All", "Earbuds", "Headphones", "Covers", "Chargers", "Cables", "Power Banks", "Smart Watches", "Screen Protectors", "Stands"];

export default function ShopPage() {
  return (
    <main className="shop-page">
      <section className="shop-heading">
        <p className="eyebrow">THE AJ COLLECTION / SHOP</p>
        <h1>Choose your <em>next essential.</em></h1>
        <p className="shop-intro">Explore categories and variations. Live inventory and products become available when the catalog database is connected.</p>
      </section>

      <section className="shop-toolbar" aria-label="Product tools">
        <form className="shop-search" action="/shop" role="search">
          <label htmlFor="shop-query" className="sr-only">Search products</label>
          <span aria-hidden="true">⌕</span>
          <input id="shop-query" name="q" placeholder="Search the collection" />
        </form>
        <label className="sort-control">SORT
          <select name="sort" defaultValue="featured" aria-label="Sort products">
            <option value="featured">Featured</option><option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option>
          </select>
        </label>
      </section>

      <div className="shop-layout">
        <aside className="shop-filters" aria-label="Product filters">
          <div className="filter-title">FILTER <button type="button" aria-label="Clear filters">Clear</button></div>
          <fieldset><legend>Category</legend>{categories.map((category) => <label key={category}><input type="checkbox" name="category" value={category} /><span>{category}</span></label>)}</fieldset>
          <fieldset><legend>Availability</legend><label><input type="checkbox" name="stock" value="in" /><span>In stock</span></label><label><input type="checkbox" name="stock" value="out" /><span>Out of stock</span></label></fieldset>
          <fieldset><legend>Price range</legend><div className="range-labels"><span>Rs. 0</span><span>Any</span></div><input className="price-range" type="range" min="0" max="100000" defaultValue="100000" aria-label="Maximum price" /></fieldset>
        </aside>

        <section className="shop-results" aria-label="Shop results">
          <div className="results-bar"><span>0 products</span><span>Collection preview</span></div>
          <div className="empty-catalog">
            <div className="empty-orb" aria-hidden="true"><span /></div>
            <p className="eyebrow">CATALOG STATUS / READY</p>
            <h2>Products are waiting<br />for their <em>place.</em></h2>
            <p className="empty-copy">Connect the AJ product database to enable live inventory, search, filters, variations, pricing and quick view.</p>
            <Link className="button button-primary" href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
