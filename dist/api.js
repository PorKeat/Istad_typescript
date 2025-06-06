"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProducts = fetchProducts;
const axios_1 = __importDefault(require("axios"));
const baseUrl = "https://dummyjson.com";
const endPoint = "/products";
async function fetchProducts() {
    try {
        const response = await axios_1.default.get(`${baseUrl}${endPoint}`);
        console.log("Fetched service data:", response.data);
        return response.data.products;
    }
    catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}
