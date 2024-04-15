import React, { useContext } from "react";
import Link from "next/link";
import { Product } from "../../lib/definitions";
import DeleteProduct from "./delete-button";

type Props = {
  index: number;
  product: Product;
};

export default function ViewProduct({ index, product }: Props) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/products/${product.id}/edit`}
            className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:bg-[#326AE2] bg-[#2563EB] rounded-md"
          >
            Edit
          </Link>
          <DeleteProduct id={product.id} />
        </div>
      </td>
    </tr>
  );
}
