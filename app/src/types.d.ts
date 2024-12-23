export interface Product {
    id: number
    name: string
    description: string
    price: number
    slug: string
    imageUrl: string
    created_at: string
    updated_at: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface User {
    id: number
    name: string
    email: string
}
export interface SignupRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
}
export interface SigninRequest {
    email: string
    password: string
}

export interface CartItem {
    product_id: number
    quantity: number
    name: string
    price: number
    image_url: string
    slug: string
}

export interface Order {
    id: number
    status: string
    items: Item[]
    created_at: string
    updated_at: string
  }
  
  export interface OrderItem {
    id: number
    name: string
    slug: string
    imageUrl: string
    price: string
    quantity: number
  }
  