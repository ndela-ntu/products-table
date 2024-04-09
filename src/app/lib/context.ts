import { createContext } from "react";
import { Product } from "./definitions";

export const ProductContext = createContext<Product[]>([]);