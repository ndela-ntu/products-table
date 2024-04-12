import PageHeader from "@/app/ui/page-header";
import CreateProductForm from "@/app/ui/products/create-form";
import React from "react";

type Props = {};

export default function CreateProductPage({}: Props) {
  return (
    <>
      <PageHeader heading="Create Product" />
      <CreateProductForm />
    </>
  );
}
