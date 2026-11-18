"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [notice, setNotice] = useState("");
  const delivery = 250;
  const subtotal = 0;
  const total = useMemo(() => subtotal + delivery, [subtotal]);

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventEventDefault?.();
  }

  return (
    <main className="checkout-page">
      <section className="checkout-heading"><p className="eyebrow">SECURE CHECKOUT / AJ</p><h1>Complete your <em>move.</em></h1></section>
      <form className="checkout-layout" onSubmit={placeOrder}>
        <section className="checkout-details">
          <fieldset className="checkout-section"><legend><span>01</span> Delivery information</legend>
            <div className="field-grid"><label>Full name<input name="fullName" required autoComplete="name" placeholder="Your full name" /></label><label>Phone number<input name="phone" required type="tel" autoComplete="tel" placeholder="03XX XXX XXXX" /></label><label>Email <small>Optional</small><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>City<input name="city" required autoComplete="address-level2" placeholder="City" /></label><label className="field-wide">Complete address<textarea name="address" required autoComplete="street-address" rows={3} placeholder="House, street and area" /></label><label>Postal code <small>Optional</small><input name="postalCode" autoComplete="postal-code" placeholder="Postal code" /></label><label className="field-wide">Delivery instructions <small>Optional</small><textarea name="instructions" rows={2} placeholder="Landmark or delivery notes" /></label></div>
          </fieldset>
          <fieldset className="checkout-section"><legend><span>02</span> Payment method</legend>
            <label className={`payment-option ${payment === "cod" ? "selected" : ""}`}><input type="radio" name="paymentMethod" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")}/><span className="payment-icon">◉</span><span><strong>Cash on Delivery</strong><small>Pay when your order arrives</small></span><i /></label>
            <label className={`payment-option ${payment === "bank" ? "selected" : ""}`}><input type="radio" name="paymentMethod" value="bank" checked={payment === "bank"} onChange={() => setPayment("bank")}/><span className="payment-icon">▤</span><span><strong>Bank Transfer</strong><small>Transfer details are shown after confirmation</small></span><i /></label>
            <label className={`payment-option ${payment === "gateway" ? "selected" : ""}`}><input type="radio" name="paymentMethod" value="gateway" checked={payment === "gateway"} onChange={() => setPayment("gateway")}/><span className="payment-icon">◇</span><span><strong>Online Payment</strong><small>Available when a gateway is configured and verified</small></span><i /></label>
          </fieldset>
        </section>

        <aside className="order-summary"><p className="summary-label">ORDER SUMMARY</p><div className="summary-empty"><span>0</span><p>Your cart is empty.</p><Link href="/shop">Choose products ↗</Link></div><div className="coupon-row"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" aria-label="Coupon code"/><button type="button" onClick={() => setNotice(coupon ? "Coupon validation requires a connected catalog and server rule." : "Enter a coupon code.")}>Apply</button></div>{notice && <p className="coupon-notice" role="status">{notice}</p>}<div className="totals"><div><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString("en-PK")}</strong></div><div><span>Discount</span><strong>Rs. 0</strong></div><div><span>Delivery</span><strong>Rs. {subtotal ? delivery.toLocaleString("en-PK") : "0"}</strong></div><div className="total-row"><span>Total</span><strong>Rs. {subtotal ? total.toLocaleString("en-PK") : "0"}</strong></div></div><button className="button button-primary place-order" type="submit">Place order <span>↗</span></button><p className="secure-note">◈ Secure checkout · No payment is marked successful without server verification</p></aside>
      </form>
    </main>
  );
}
