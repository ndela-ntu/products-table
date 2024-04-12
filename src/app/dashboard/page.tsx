import { products } from "@/app/lib/placeholder-data";
import React from "react";
import ProductsTable from "../ui/products/products-table";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProductsTable products={products} />
    </main>
  );
}
