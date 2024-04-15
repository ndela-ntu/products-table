import React from "react";
import ViewProduct from "@/app/ui/products/view-product";
import { fetchFilteredProducts } from "@/app/lib/data";

type Props = {
  query: string;
  currentPage: number;
};

export default async function ProductsTable({ query, currentPage }: Props) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <ViewProduct key={product.id} index={i} product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}
