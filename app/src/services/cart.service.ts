import { CartItem } from "@/types";
import { HttpClient } from "./http.service";


export class CartService  {
    private http: HttpClient

    constructor(){
        this.http=new HttpClient()
    }

    addItem(product_id:number, quantity: number){
        return this.http.post('/api/cart', {product_id, quantity})
    }

    updateItem(product_id:number, quantity: number){
        return this.http.put('/api/cart', {product_id, quantity})
    }
    
    removeItem(product_id:number){
        return this.http.delete('/api/cart/'+product_id)
    }

    getCart(){
        return this.http.get<CartItem[]>('/api/cart')
    }
    
}
