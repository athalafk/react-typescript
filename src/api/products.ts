import apiClient from './axiosConfig';
import { Product } from 'src/types';

export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/api/products');
    return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/api/products/${id}`);
    return data;
};