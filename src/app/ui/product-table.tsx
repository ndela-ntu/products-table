import React, { useEffect } from "react";
import { useState } from "react";
import { Product } from "../lib/definitions";
import { ProductContext } from "../lib/context";
import EditProduct from "./edit-product";
import ViewProduct from "./view-product";
import { useFormState, useFormStatus } from "react-dom";
import { ProductState, createItem, editItem } from "../lib/actions";
import { products } from "../lib/placeholder-data";
import CreateProduct from "./create-product";

export default function ProductTable() {
  const [isAddNew, setIsAddNew] = useState(false);
  const [productsState, setProductsState] = useState<Product[]>(products);
  const [editProductAtId, setEditProductAtId] = useState("");

  const [currentState, setCurrentState] = useState<{
    isCreateState?: boolean;
    isEditState?: boolean;
  }>({ isCreateState: false, isEditState: false });

  const [editState, dispatchEdit] = useFormState<ProductState, FormData>(
    editItem,
    {
      message: null,
      errors: {},
      successEdit: false,
      products: productsState,
    }
  );

  const [createState, dispatchCreate] = useFormState<ProductState, FormData>(
    createItem,
    {
      message: null,
      errors: {},
      successCreate: false,
      products: productsState,
    }
  );

  const status = useFormStatus();

  useEffect(() => {
    if (createState.successCreate) {
      setProductsState(createState.products);
      setIsAddNew(false);
      setCurrentState({ isCreateState: false });
    }

    if (editState.successEdit) {
      setProductsState(editState.products);
      setEditProductAtId("");
      setCurrentState({ isEditState: false });
    }

    return () => {};
  }, [editState, createState]);

  return (
    <ProductContext.Provider value={productsState}>
      <div className="w-full flex flex-col min-w-max overflow-x-auto">
        <form
          action={(formData) => {
            if (currentState.isEditState) {
              formData.append("id", editProductAtId);
              dispatchEdit(formData);
            }

            if (currentState.isCreateState) {
              dispatchCreate(formData);
            }
          }}
        >
          <table className="table table-auto">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Updates</th>
              </tr>
            </thead>
            <tbody>
              {productsState.map((product, i) => {
                if (currentState.isEditState && product.id == editProductAtId) {
                  return (
                    <EditProduct
                      key={product.id}
                      id={editProductAtId}
                      index={i}
                      onCancelClick={() => {
                        setCurrentState({
                          isEditState: false,
                        });
                      }}
                    />
                  );
                }

                return (
                  <ViewProduct
                    key={product.id}
                    index={i}
                    id={product.id}
                    onEditClick={(e) => {
                      setCurrentState({
                        isEditState: true,
                      });
                      setEditProductAtId(product.id);
                      {
                        /*const params = new URLSearchParams(searchParams);
                      params.set("id", product.id);

                      
                         replace(`${pathname}?${params.toString()}`);

                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    ).showModal();*/
                      }
                    }}
                    onDeleteClick={() => {
                      setProductsState(
                        productsState.filter((pdt) => pdt.id !== product.id)
                      );
                    }}
                  />
                );
              })}
              {isAddNew && (
                <CreateProduct
                  index={products.length}
                  onCancelClick={() => {
                    setIsAddNew(false);
                  }}
                  createState={createState}
                />
              )}
            </tbody>
          </table>
        </form>
        <div className="flex flex-col space-y-2">
          <button
            className="btn"
            onClick={() => {
              setIsAddNew(true);
              setCurrentState({
                isCreateState: true,
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
      {/*<dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <EditProduct id={searchParams.get("id")?.toString()} />
        </div>
          </dialog>*/}
    </ProductContext.Provider>
  );
}
