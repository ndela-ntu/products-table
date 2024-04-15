export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Dashboard</a>
        </div>
      </div>
      {children}
    </div>
  );
}
