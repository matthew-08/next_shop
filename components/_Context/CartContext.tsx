/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import {
  ShopItem,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useIncrementItemMutation,
} from 'graphql/generated/graphql'
import useFetchSession from 'utils/hooks/FetchSession'
import { CartItem, CartContextType, CartState } from '../../types/types'
import { AuthContext } from './AccountContext'

export const UserCartContext = createContext<CartContextType>({
  cart: {
    cartId: null,
    cartItems: [],
  },
  handleModifyCart: () => undefined,
  total: () => 0,
  setCart: () => null,
})

function CartContext({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    cartItems: [],
    cartId: null,
  })
  const { user } = useContext(AuthContext)
  const [fetchedSession, fetchedUser, fetchedCart] = useFetchSession()
  const [addToCart, { loading, data, error }] = useAddToCartMutation()
  const [deleteFromCart] = useDeleteFromCartMutation()
  const [incrementItem] = useIncrementItemMutation()

  useEffect(() => {
    if (fetchedCart.cartId && fetchedCart.cartItems) {
      setCart(fetchedCart)
    }
  }, [fetchedCart])

  const handleAddToCart = async (item: ShopItem) => {
    const itemExists = cart.cartItems.find((i) => i.itemId === item.itemId)
    if (itemExists) {
      setCart({
        ...cart,
        cartItems: cart.cartItems.map((i) => {
          if (i.itemId === item.itemId) {
            const updateQuanaity = i.itemQuantity + 1
            return { ...i, itemQuantity: updateQuanaity }
          }
          return i
        }),
      })
      if (user?.id && cart.cartId) {
        incrementItem({
          variables: {
            input: {
              cartId: cart.cartId,
              itemId: item.itemId,
            },
          },
        })
      }
    } else {
      setCart({
        ...cart,
        cartItems: [
          ...cart.cartItems,
          {
            ...item,
            itemQuantity: 1,
          },
        ],
      })
      if (user && user.id) {
        await addToCart({
          variables: {
            input: {
              itemToAdd: item.itemId,
              userId: user.id,
            },
          },
        })
      }
    }
  }
  const handleRemoveFromCart = (cartItem: CartItem) => {
    const itemToDelete = cart.cartItems.find(
      (item) => item.itemId === cartItem.itemId
    )
    if (itemToDelete?.itemQuantity === 1) {
      setCart({
        ...cart,
        cartItems: cart.cartItems.filter((c) => c.itemId !== cartItem.itemId),
      })
    } else {
      setCart({
        ...cart,
        cartItems: cart.cartItems.map((c) => {
          if (c.itemId === cartItem.itemId) {
            const updatedQuantity = c.itemQuantity - 1
            return { ...c, itemQuantity: updatedQuantity }
          }
          return c
        }),
      })
    }
    if (user?.id && cart.cartId) {
      deleteFromCart({
        variables: {
          cartId: cart.cartId,
          itemId: cartItem.itemId,
        },
      })
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleModifyCart = (
    type: 'increment' | 'decrement',
    item: ShopItem
  ) => {
    if (type === 'increment') {
      return handleAddToCart(item)
    }

    return handleRemoveFromCart(item)
  }
  const total = useCallback(() => {
    if (cart.cartItems.length === 0) {
      return 0
    }
    const t = cart.cartItems.reduce((acc, item) => {
      // eslint-disable-next-line no-param-reassign
      acc += item.itemPrice * item.itemQuantity
      return acc
    }, 0)
    return t
  }, [cart])
  useEffect(() => {
    console.log('cart context render')
  })

  const contextValue = useMemo(
    () => ({ cart, handleModifyCart, total, setCart }),
    [cart, total, handleModifyCart]
  )
  return (
    <UserCartContext.Provider value={contextValue}>
      {children}
    </UserCartContext.Provider>
  )
}

export default CartContext
