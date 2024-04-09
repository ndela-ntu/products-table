import React, { useContext, useState } from "react";
import { ProductContext } from "../lib/context";
import { Product } from "../lib/definitions";
import { ProductState } from "../lib/actions";

export default function CreateProduct({
  index,
  createState,
  onCancelClick,
}: {
  index: number;
  createState: ProductState;
  onCancelClick: () => void;
}) {
  const products = useContext(ProductContext);
  const [file, setFile] = useState("");

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered input-sm w-full max-w-xs"
        />

        <div id="name-error" aria-live="polite" aria-atomic="true">
          {createState.errors?.name &&
            createState.errors.name.map((error: string, i) => (
              <p key={i} className="text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </td>
      <td>
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          placeholder="Description"
        ></textarea>
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {createState.errors?.description &&
            createState.errors.description.map((error: string, i) => (
              <p key={i} className="text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </td>
      <td>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered input-sm w-1/3 max-w-xs"
        />
        <div id="price-error" aria-live="polite" aria-atomic="true">
          {createState.errors?.price &&
            createState.errors.price.map((error: string, i) => (
              <p key={i} className="text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </td>
      <td>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered input-sm w-2/5 max-w-xs"
        />
        <div id="quantity-error" aria-live="polite" aria-atomic="true">
          {createState.errors?.quantity &&
            createState.errors.quantity.map((error: string, i) => (
              <p key={i} className="text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </td>
      <td>
        <button
          className="btn"
          onClick={() => {
            onCancelClick();
          }}
        >
          Cancel
        </button>
        <button className="btn" type="submit">
          Save
        </button>
      </td>
    </tr>
  );
}
