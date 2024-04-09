import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./definitions";

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

export type ProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    quantity?: string[];
  };
  message?: string | null;
  successEdit?: boolean;
  editId?: string;
  successCreate?: boolean;
  products: Product[];
};

export async function createItem(prevState: ProductState, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    return <ProductState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create item",
      successCreate: false,
      products: prevState.products,
    };
  }

  try {
    const { name, description, price, quantity } = validatedFields.data;

    let newProducts = prevState.products.concat({
      id: uuidv4(),
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });

    return <ProductState>{
      message: "Successfully updated item",
      errors: {},
      successCreate: true,
      products: newProducts,
    };
  } catch (error) {
    return <ProductState>{
      message: "Database Error: Failed to update products",
      errors: error,
      successCreate: false,
      products: prevState.products,
    };
  }
}

export async function editItem(prevState: ProductState, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    return <ProductState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update item",
      successEdit: false,
      products: prevState.products,
    };
  }

  try {
    const { id, name, description, price, quantity } = validatedFields.data;

    let newProducts = prevState.products.map((product) => {
      if (product.id == id) {
        return <Product>{
          id: id,
          name: name,
          description: description,
          price: price,
          quantity: quantity,
        };
      }

      return product;
    });

    return <ProductState>{
      message: "Successfully updated item",
      errors: {},
      successEdit: true,
      products: newProducts,
    };
  } catch (error) {
    return <ProductState>{
      message: "Database Error: Failed to update products",
      errors: error,
      successEdit: false,
      products: prevState.products,
    };
  }
}
