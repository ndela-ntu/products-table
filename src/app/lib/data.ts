import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Product } from "./definitions";

export async function fetchProducts() {
  console.log("Fetching products...");
  noStore();
  try {
    const data = await sql<Product>`SELECT * from products ORDER BY name ASC`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products data");
  }
}

export async function fetchProductById(id: string) {
  console.log("Fetch product by ID");
  noStore();
  try {
    const data =
      await sql<Product>`SELECT * from products p WHERE p.id = ${id}`;

    return data.rows[0];
  } catch (error) {}
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<Product>`
    SELECT * FROM products
    WHERE 
      products.name::text ILIKE ${`%${query}%`} OR
      products.description::text ILIKE ${`%${query}%`}
    ORDER BY name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductsPage(query: string) {
  noStore();
  try {
    const count = await sql`
    SELECT COUNT(*) 
    FROM products 
    WHERE 
      products.name::text ILIKE ${`%${query}%`} OR
      products.description::text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products");
  }
}
