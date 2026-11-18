const adminPages = ['Orders','Products','Customers','Inventory','Coupons','Reviews','Settings'] as const;

export default function AdminPlaceholder({ params }: { params: Promise<{ section: string }> }) {
  const section = '';
  return null;
}
