"use client";

import { State, createProduct } from "@/app/lib/actions";
import React, { useContext, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function CreateProductForm() {
  const formStatus = useFormStatus();

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(
    createProduct,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-col mt-5">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="input input-bordered"
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
          disabled={formStatus.pending}
          type="submit"
        >
          {formStatus.pending ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}
