/* eslint-disable no-underscore-dangle */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import {
  ShopItem,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useIncrementItemMutation,
} from 'graphql/generated/graphql'
import { CartItem, CartContextType } from '../types/types'
import { AuthContext } from './AccountContext'

export const UserCartContext = createContext<CartContextType>({
  cart: null,
  id: null,
  handleAddToCart: () => null,
  handleRemoveFromCart: () => null,
  total: () => 0,
  setCart: () => null,
})

function CartContext({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState('')
  const { user, accountFetchData } = useContext(AuthContext)
  const [addToCart, { loading, data, error }] = useAddToCartMutation()
  const [deleteFromCart] = useDeleteFromCartMutation()
  const [incrementItem] = useIncrementItemMutation()

  useEffect(() => {
    if (
      accountFetchData &&
      accountFetchData.checkForSession.__typename ===
        'MutationCheckForSessionSuccess'
    ) {
      const existingCart = accountFetchData.checkForSession.data.cart.userItems
      console.log(existingCart)
      const cleanCart = existingCart.map((item) => {
        const { cartItemQuantity } = item
        // eslint-disable-next-line no-param-reassign
        delete item.__typename
        const nestedItem = item.item
        delete nestedItem.__typename
        nestedItem.itemQuantity = cartItemQuantity
        return nestedItem
      })
      setCartId(accountFetchData.checkForSession.data.cart.id)
      setCart(cleanCart)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFetchData])
  const handleAddToCart = async (item: ShopItem) => {
    const itemExists = cart.find((i) => i.itemId === item.itemId)
    if (itemExists) {
      setCart(
        cart.map((i) => {
          if (i.itemId === item.itemId) {
            const updateQuanaity = i.itemQuantity + 1
            return { ...i, itemQuantity: updateQuanaity }
          }
          return i
        })
      )
      if (user && user.id) {
        incrementItem({
          variables: {
            input: {
              cartId,
              itemId: item.itemId,
            },
          },
        })
        console.log(`sent to ${user.id}`)
      }
    } else {
      setCart([
        ...cart,
        {
          ...item,
          itemQuantity: 1,
        },
      ])
      if (user && user.id) {
        await addToCart({
          variables: {
            input: {
              itemToAdd: item.itemId,
              userId: user.id,
            },
          },
        }).then((r) => {
          if (data) {
            setCartId(data.addToCart.id)
          }
        })
      }
    }
  }
  const handleRemoveFromCart = (cartItem: CartItem) => {
    const itemToDelete = cart.find((item) => item.itemId === cartItem.itemId)
    if (itemToDelete?.itemQuantity === 1) {
      setCart(cart.filter((c) => c.itemId !== cartItem.itemId))
    } else {
      setCart(
        cart.map((c) => {
          if (c.itemId === cartItem.itemId) {
            const updatedQuantity = c.itemQuantity - 1
            return { ...c, itemQuantity: updatedQuantity }
          }
          return c
        })
      )
    }
    if (user && cart) {
      deleteFromCart({
        variables: {
          cartId,
          itemId: cartItem.itemId,
        },
      })
    }
  }
  const total = useCallback(() => {
    if (cart.length === 0) {
      return 0
    }
    const t = cart.reduce((acc, item) => {
      // eslint-disable-next-line no-param-reassign
      acc += item.itemPrice * item.itemQuantity
      return acc
    }, 0)
    return t
  }, [cart])

  return (
    <UserCartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart, total, setCart }}
    >
      {children}
    </UserCartContext.Provider>
  )
}

export default CartContext
