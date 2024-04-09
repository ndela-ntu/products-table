"use client";

import ProductTable from "./ui/product-table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl ">Products</h1>
      <ProductTable />
    </main>
  );
}
