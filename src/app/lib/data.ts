import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchProducts() {
  console.log("Fetching products...");
  noStore();
  try {
    const data = await sql`SELECT * from products ORDER BY name ASC`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products data");
  }
}
