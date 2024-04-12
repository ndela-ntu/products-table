const { db } = require("@vercel/postgres");
const { products } = require("../src/app/lib/placeholder-data");
const bcrypt = require("bcrypt");

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.slq`
    CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL
    );
    `;

    console.log('Created "products" table');

    const insertedProducts = await Promise.all(
      products.map(
        (product) => client.sql`
        INSERT INTO products (name, description, price, quantity)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.quantity})
        ON CONFLICT (id) DO NOTHING;
        `
      )
    );
    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}
