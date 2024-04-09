import React, { useContext, useState } from "react";
import { ProductContext } from "../lib/context";

export default function EditProduct({
  id,
  index,
  onCancelClick,
}: {
  id: string;
  index: number;
  onCancelClick: () => void;
}) {
  const products = useContext(ProductContext);
  const product = products.find((product) => product.id == id);

  if (!product) {
    return (
      <tr>
        <th>No data</th>
      </tr>
    );
  }

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered input-sm w-1/2 max-w-xs"
          defaultValue={product.name}
        />
      </td>
      <td>
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          placeholder="Bio"
          defaultValue={product.description}
        ></textarea>
      </td>
      <td>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered input-sm w-1/3 max-w-xs"
          defaultValue={product.price}
        />
      </td>
      <td>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered input-sm w-1/3 max-w-xs"
          defaultValue={product.quantity}
        />
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
  /*return (
    <form>
      <div className="flex flex-col items-start  justify-center space-y-2">
        <h3 className="font-bold text-lg">Edit Product</h3>
        <div>
          <label
            className="block text-xs font-medium text-gray-900"
            htmlFor="Name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-sm max-w-xs"
            defaultValue={product.name}
          />
        </div>
        <div className="w-full">
          <label
            className="block text-xs font-medium text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Bio"
            defaultValue={product.description}
          ></textarea>
        </div>
        <div>
          <label
            className="block text-xs font-medium text-gray-900"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-sm max-w-xs"
            defaultValue={product.price}
          />
        </div>
        <div>
          <label
            className="block text-xs font-medium text-gray-900"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="input input-bordered input-sm max-w-xs"
            defaultValue={product.quantity}
          />
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => {}}>
            Cancel
          </button>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );*/
}
