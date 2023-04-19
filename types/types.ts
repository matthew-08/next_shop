import { Dispatch, SetStateAction } from 'react'
import { FetchSessionMutation, ShopItem } from 'graphql/generated/graphql'

// AUTH
export interface FormState {
  email: string
  password: string
}
export type RegisterScehma = {
  email: string
  password: string
  confirmPassword: string
}
export interface User {
  email: string | null
  id: string | null
}

export interface AuthContextType {
  user: null | User
  setUser: Dispatch<SetStateAction<User>>
}

// CART
export interface CartItem extends ShopItem {
  itemQuantity: number
}

export interface CartState {
  cartItems: CartItem[]
  cartId: string | null
}

export interface CartContextType {
  cart: CartState
  total: () => number
  setCart: (cart: CartState) => void
}

export interface CheckoutSchema {
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  phoneNumber: number
}
