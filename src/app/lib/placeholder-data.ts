import { Product } from "./definitions";
import { v4 as uuidv4 } from "uuid";

export const products: Product[] = [
  {
    id: uuidv4(),
    name: "Product 1",
    description: "Description of product 1",
    price: 200,
    quantity: 5,
  },
  {
    id: uuidv4(),
    name: "Product 2",
    description: "Description of product 2",
    price: 200,
    quantity: 10,
  },
];
