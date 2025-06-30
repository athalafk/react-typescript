export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem extends Product {
    qty: number;
}

export interface LoginCredentials {
    username?: string;
    password?: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}