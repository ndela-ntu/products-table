import React, { useContext } from "react";
import Link from "next/link";
import { Product } from "../../lib/definitions";

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
        <Link href={`/dashboard/products/${product.id}/edit`}>Edit</Link>
        <button className="btn">Delete</button>
      </td>
    </tr>
  );
}
