/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
  useRef,
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
  total: () => 0,
  setCart: () => null,
})

type ModifyCartContextType = (
  arg: 'increment' | 'decrement',
  item: ShopItem
) => void | Promise<void>
export const UserModifyCartContext = createContext<ModifyCartContextType>(
  () => undefined
)

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
  const cartRef = useRef(cart)
  /* This cartRef exists due to the handler function which is wrapped in useCallback.
     Hacky solution - but more of a "I wonder if this would work" type of thing.
  */
  useEffect(() => {
    if (fetchedCart.cartId && fetchedCart.cartItems) {
      setCart(fetchedCart)
    }
  }, [fetchedCart])

  useEffect(() => {
    cartRef.current = cart
  }, [cart])
  const handleAddToCart = async (item: ShopItem) => {
    const itemExists = cartRef.current.cartItems.find(
      (i) => i.itemId === item.itemId
    )
    if (itemExists) {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((i) => {
          if (i.itemId === item.itemId) {
            const updateQuanaity = i.itemQuantity + 1
            return { ...i, itemQuantity: updateQuanaity }
          }
          return i
        }),
      }))
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
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: [
          ...prevCart.cartItems,
          {
            ...item,
            itemQuantity: 1,
          },
        ],
      }))
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
    const itemToDelete = cartRef.current.cartItems.find(
      (item) => item.itemId === cartItem.itemId
    )
    if (itemToDelete?.itemQuantity === 1) {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.filter(
          (c) => c.itemId !== cartItem.itemId
        ),
      }))
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((c) => {
          if (c.itemId === cartItem.itemId) {
            const updatedQuantity = c.itemQuantity - 1
            return { ...c, itemQuantity: updatedQuantity }
          }
          return c
        }),
      }))
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

  const handleModifyCart = useCallback(
    (type: 'increment' | 'decrement', item: ShopItem) => {
      if (type === 'increment') {
        return handleAddToCart(item)
      }
      return handleRemoveFromCart(item)
    },
    [user]
  )

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

  const memoizedUserCartValue = useMemo(
    () => ({ cart, setCart, total }),
    [cart, setCart, total]
  )

  return (
    <UserModifyCartContext.Provider value={handleModifyCart}>
      <UserCartContext.Provider value={memoizedUserCartValue}>
        {children}
      </UserCartContext.Provider>
    </UserModifyCartContext.Provider>
  )
}

export default CartContext
