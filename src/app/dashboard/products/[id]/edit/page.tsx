import { products } from "@/app/lib/placeholder-data";
import PageHeader from "@/app/ui/page-header";
import EditProductForm from "@/app/ui/products/edit-form";
import React from "react";

type Props = {
  params: { id: string };
};

export default function EditProductPage({ params }: Props) {
  const id = params.id;
  const product = products.find((value) => value.id === id);

  if (!product) return <div>No data</div>;

  return (
    <>
      <PageHeader heading="Edit Product" />
      <EditProductForm product={product} />
    </>
  );
}
