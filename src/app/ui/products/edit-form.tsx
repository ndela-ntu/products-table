"use client";

import React, { useContext, useEffect, useState } from "react";
import { Product } from "@/app/lib/definitions";
import { useFormState, useFormStatus } from "react-dom";
import { State, updateProduct } from "@/app/lib/actions";

type Props = {
  product: Product;
};

export default function EditProductForm({ product }: Props) {
  const formStatus = useFormStatus();

  const initialState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState<State, FormData>(
    updateProductWithId,
    initialState
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form action={dispatch}>
      <div className="flex flex-col mt-5">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="input input-bordered"
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
            className="textarea textarea-bordered"
            name="description"
            id="description"
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
            id="price"
            placeholder="Price"
            className="input input-bordered"
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
            id="quantity"
            placeholder="Quantity"
            className="input input-bordered"
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
        <button
          className="btn text-sm text-white transition-colors hover:bg-[#326AE2] bg-[#2563EB] rounded-md"
          type="submit"
          disabled={formStatus.pending}
        >
          {formStatus.pending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
