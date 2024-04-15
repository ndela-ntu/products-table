"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().gt(0, { message: "Price should be greater than 0" }),
  quantity: z.coerce
    .number()
    .gte(0, { message: "Quantity should be greater than or equal to 0" }),
});

const CreateItem = FormSchema.omit({ id: true });
const UpdateItem = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    return <State>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create item",
    };
  }

  const { name, description, price, quantity } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (name, description, price, quantity)
      VALUES (${name}, ${description}, ${price}, ${quantity})
    `;
  } catch (error) {
    return <State>{
      message: "Database Error: Failed to update products",
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(
  id: string,
  prevState: State,
  formData: FormData
) {
  const updatedFields = UpdateItem.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
  });

  if (!updatedFields.success) {
    return <State>{
      errors: updatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update item",
    };
  }

  const { name, description, price, quantity } = updatedFields.data;

  try {
    await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, quantity = ${quantity}
      WHERE id = ${id}
    `;
  } catch (error) {
    return <State>{
      message: `Database Error: Failed to update products: ${error}`,
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath("/dashboard/products");

    return { message: "Deleted Product" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Product" };
  }
}
