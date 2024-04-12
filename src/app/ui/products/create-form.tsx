import { State, createProduct } from "@/app/lib/actions";
import React, { useContext, useState } from "react";
import { useFormState } from "react-dom";

export default function CreateProductForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(createProduct, initialState);

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
            className="input input-bordered input-sm w-full max-w-xs"
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
        <div>
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Description"
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
        <div>
          <label htmlFor="price" className="">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-sm w-1/3 max-w-xs"
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
        <div>
          <label htmlFor="quantity" className="">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="input input-bordered input-sm w-2/5 max-w-xs"
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
