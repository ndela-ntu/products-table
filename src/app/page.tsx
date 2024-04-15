import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link
        href="/dashboard/products/"
        className="px-4 py-2 text-sm text-white transition-colors hover:bg-[#326AE2] bg-[#2563EB] rounded-md"
      >
        View Products
      </Link>
    </main>
  );
}
