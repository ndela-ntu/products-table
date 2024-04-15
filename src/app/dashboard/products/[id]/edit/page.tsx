import { fetchProductById, fetchProducts } from "@/app/lib/data";
import PageHeader from "@/app/ui/page-header";
import EditProductForm from "@/app/ui/products/edit-form";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function EditProductPage({ params }: Props) {
  const id = params.id;
  const product = await fetchProductById(id);

  if (!product) return <div>No data</div>;

  return (
    <div className="p-24">
      <PageHeader heading="Edit Product" />
      <EditProductForm product={product} />
    </div>
  );
}
