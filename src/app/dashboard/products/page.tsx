import React from "react";
import { fetchProducts, fetchProductsPage } from "../../lib/data";
import ProductsTable from "./_components/products-table";
import Link from "next/link";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";

type Props = {
  searchParams?: { query?: string; page?: string };
};

export default async function page({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPage(query);

  return (
    <main className="flex flex-col items-center p-24">
      <Search placeholder="Search products..." />
      <ProductsTable query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
      <Link
        href="/dashboard/products/create"
        className="px-4 py-2 text-sm text-white transition-colors hover:bg-[#326AE2] bg-[#2563EB] rounded-md"
      >
        Add New
      </Link>
    </main>
  );
}
