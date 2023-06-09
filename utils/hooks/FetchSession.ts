/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import { useFetchSessionMutation } from 'graphql/generated/graphql'
import getToken from 'utils/getToken'
import { CartState, User } from '@/types/types'

const useFetchSession = () => {
  const [sessionChecked, setSessionChecked] = useState<boolean>(false)
  const [fetchedUser, setFetchedUser] = useState<null | User>(null)
  const [fetchedCart, setFetchedCart] = useState<CartState>({} as CartState)
  const [
    mutateFunction,
    { data: accountFetchData, loading: sessionFetchLoading, error },
  ] = useFetchSessionMutation()

  useEffect(() => {
    const checkForUser = async () => {
      const token = getToken()
      if (token) {
        await mutateFunction({
          variables: {
            input: {
              token,
            },
          },
        })
      } else {
        setSessionChecked(true)
      }
    }
    checkForUser()
  }, [])

  useEffect(() => {
    if (accountFetchData) {
      if (
        accountFetchData.checkForSession.__typename ===
        'MutationCheckForSessionSuccess'
      ) {
        const { email, cart, token, id } = accountFetchData.checkForSession.data
        setFetchedUser({
          email,
          id,
        })
        const existingCart =
          accountFetchData.checkForSession.data.cart.userItems
        const cleanCart = existingCart.map((item) => {
          const { cartItemQuantity } = item
          // eslint-disable-next-line no-param-reassign
          delete item.__typename
          const nestedItem = item.item
          delete nestedItem.__typename
          nestedItem.itemQuantity = cartItemQuantity
          return nestedItem
        })
        setFetchedCart({
          cartId: cart.id,
          cartItems: cleanCart,
        })
        setSessionChecked(true)
      }
    }
  }, [accountFetchData])
  return [sessionChecked, fetchedUser, fetchedCart] as const
}

export default useFetchSession
