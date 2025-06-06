// api.ts
import axios from "axios";

const baseUrl = "https://dummyjson.com";
const endPoint = "/products";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  discountPercentage: number;
  brand: string;
  originalPrice?: number;
  tags?: string[];
  rating: number;
};

export async function fetchProducts(): Promise<Product[]> {
  const allProducts: Product[] = [];
  const limit = 30;
  let skip = 0;
  let total = Infinity;

  try {
    while (allProducts.length < total) {
      const response = await axios.get(
        `${baseUrl}${endPoint}?limit=${limit}&skip=${skip}`
      );
      const data = response.data;
      const products = data.products as Product[];
      total = data.total;
      allProducts.push(...products);
      skip += limit;
    }

    console.log(`Fetched all products: ${allProducts.length}`);
    return allProducts;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function fetchProductsBySearch(query: string): Promise<Product[]> {
  try {
    const response = await axios.get(
      `${baseUrl}${endPoint}/search?q=${encodeURIComponent(query)}`
    );
    return response.data.products as Product[];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export async function fetchProductById(id: number): Promise<any> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}
