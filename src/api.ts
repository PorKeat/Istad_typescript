import axios from "axios";

const baseUrl = "https://dummyjson.com";
const endPoint = "/products";

// export const getProducts = async () =>axios.get(`${baseUrl}${endPoint}`).then((res) => res.data);
// export const getProductDetails = async (id: number) => axios.get(`$${baseUrl}${endPoint}/${id}`).then(res => res.data);
type Products = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  discountPercentage: number;
  brand: string;
};

export async function fetchProducts(): Promise<Products[]> {
  try {
    const response = await axios.get(`${baseUrl}${endPoint}`);
    console.log("Fetched service data:", response.data);
    return response.data.products as Products[];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}