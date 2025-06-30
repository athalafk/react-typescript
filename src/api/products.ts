import axios from 'axios';
import { Product } from '@/types';

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(API_URL);
  return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get<Product>(`${API_URL}/${id}`);
  return data;
};