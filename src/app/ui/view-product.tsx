import React, { useContext } from "react";
import { ProductContext } from "../lib/context";

export default function ViewProduct({
  id,
  index,
  onDeleteClick,
  onEditClick,
}: {
  id: string;
  index: number;
  onDeleteClick: () => void;
  onEditClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const products = useContext(ProductContext);
  const product = products.find((product) => product.id == id);

  if (!product) {
    return (
      <tr key={id}>
        <td>No data</td>
      </tr>
    );
  }

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <button
          className="btn"
          onClick={(e) => {
            onEditClick(e);
          }}
        >
          Edit
        </button>
        <button
          className="btn"
          onClick={() => {
            onDeleteClick();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
