import React from "react";
import { Product } from "../../lib/definitions";
import ViewProduct from "./view-product";

type Props = {
  products: Product[];
};

export default function ProductsTable({ products }: Props) {
  return (
    <table className="table table-auto">
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
  );
}
