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
import { CartItem, CartContextType, CartState } from '../../types/types'
import { AuthContext } from './AccountContext'

export const UserCartContext = createContext<CartContextType>({
  cart: {
    cartId: null,
    cartItems: [],
  },
  cartId: null,
  handleModifyCart: () => () => null,
  total: () => 0,
  setCart: () => null,
})

function CartContext({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    cartItems: [],
    cartId: null,
  })
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
      const cleanCart = existingCart.map((item) => {
        const { cartItemQuantity } = item
        // eslint-disable-next-line no-param-reassign
        delete item.__typename
        const nestedItem = item.item
        delete nestedItem.__typename
        nestedItem.itemQuantity = cartItemQuantity
        return nestedItem
      })
      setCart({
        cartId: accountFetchData.checkForSession.data.cart.id,
        cartItems: cleanCart,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFetchData])

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

  return (
    <UserCartContext.Provider
      value={{
        cart,
        handleModifyCart,
        total,
        setCart,
      }}
    >
      {children}
    </UserCartContext.Provider>
  )
}

export default CartContext
