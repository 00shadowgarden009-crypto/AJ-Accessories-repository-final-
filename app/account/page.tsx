"use client";

import { useEffect, useState } from 'react';

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(false); }, []);
  return <main className="simple-state"><p className="eyebrow">YOUR AJ / ACCOUNT</p><h1>Manage your <em>account.</em></h1>{loading ? <p>Loading session…</p> : <div className="account-empty"><p>Sign-in and account history require Supabase Auth configuration.</p><button className="button button-primary" type="button" disabled>Sign in unavailable</button></div>}</main>;
}
