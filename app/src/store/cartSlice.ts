import { CartItem } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface CartState {
  items: CartItem[]
  totalAmount: number
}

const initialState = {
    items: [],
    totalAmount: 0,
  } as CartState

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action:PayloadAction<CartItem[]>) => {
        state.items = [...action.payload]
        state.totalAmount = action.payload.reduce((total, item) => total + (item.price * item.quantity), 0) 
    }
  }
})

export const { updateCart } = cartSlice.actions
export default cartSlice.reducer
