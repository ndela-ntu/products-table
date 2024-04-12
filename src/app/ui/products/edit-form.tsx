import React, { useContext, useState } from "react";
import { Product } from "@/app/lib/definitions";
import { useFormState } from "react-dom";
import { State, updateProduct } from "@/app/lib/actions";

type Props = {
  product: Product;
};

export default function EditProductForm({ product }: Props) {
  const initialState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState<State, FormData>(updateProductWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-sm w-1/2 max-w-xs"
            defaultValue={product.name}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Bio"
            defaultValue={product.description}
          ></textarea>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-sm w-1/3 max-w-xs"
            defaultValue={product.price}
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="quantity" className="">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="input input-bordered input-sm w-1/3 max-w-xs"
            defaultValue={product.quantity}
          />
          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.quantity &&
              state.errors.quantity.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <button className="btn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
