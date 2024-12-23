import { Order } from "@/types";
import { HttpClient } from "./http.service";


export class OrderService  {
    private http: HttpClient

    constructor(){
        this.http=new HttpClient()
    }

    addOrder(){
        return this.http.post<Order>('/api/orders', {})
    }

    getOrders(){
        return this.http.get<Order[]>('/api/orders')
    }

    getOrder(id: number){
        return this.http.get<Order>('/api/orders/'+id)
    } 
}
