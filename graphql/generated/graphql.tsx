import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddToCartInput = {
  itemToAdd: Scalars['String'];
  userId: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cartItemQuantity: Scalars['Int'];
  cartSpecificId: Scalars['ID'];
  item: ShopItem;
  t: Scalars['Boolean'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type IncrementCartItemInput = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
};

export type LoginType = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: UserCart;
  checkForSession: MutationCheckForSessionResult;
  checkout: Scalars['String'];
  deleteFromCart: UserCart;
  incrementCartItem: CartItem;
  login: MutationLoginResult;
  register: MutationRegisterResult;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationCheckForSessionArgs = {
  input: SessionCheckInput;
};


export type MutationCheckoutArgs = {
  cartId: Scalars['String'];
};


export type MutationDeleteFromCartArgs = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationIncrementCartItemArgs = {
  input: IncrementCartItemInput;
};


export type MutationLoginArgs = {
  input: LoginType;
};


export type MutationRegisterArgs = {
  existingCartItemsId?: InputMaybe<Array<Scalars['String']>>;
  input: UserRegisterInput;
};

export type MutationCheckForSessionResult = Error | MutationCheckForSessionSuccess;

export type MutationCheckForSessionSuccess = {
  __typename?: 'MutationCheckForSessionSuccess';
  data: User;
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: User;
};

export type MutationRegisterResult = Error | MutationRegisterSuccess;

export type MutationRegisterSuccess = {
  __typename?: 'MutationRegisterSuccess';
  data: User;
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<ShopCategory>;
  /** All shop items. */
  allItems: Array<ShopItem>;
  /** Shop items filtered by category */
  itemByCategory: Array<ShopItem>;
  /** An individual shop item obtained through ID */
  itemById?: Maybe<ShopItem>;
  userCart: UserCart;
};


export type QueryItemByCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type QueryItemByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUserCartArgs = {
  userId: Scalars['String'];
};

export type SessionCheckInput = {
  token?: InputMaybe<Scalars['String']>;
};

/** An object type for a shop category */
export type ShopCategory = {
  __typename?: 'ShopCategory';
  categoryId: Scalars['ID'];
  categoryItems: Array<ShopItem>;
  categoryName: Scalars['String'];
};

/** An object representing an individual shop item. */
export type ShopItem = {
  __typename?: 'ShopItem';
  itemDescription: Scalars['String'];
  itemId: Scalars['ID'];
  itemImage: Scalars['String'];
  itemName: Scalars['String'];
  itemPrice: Scalars['Float'];
  itemQuantity: Scalars['Int'];
};

/** Object type representing a user */
export type User = {
  __typename?: 'User';
  cart: UserCart;
  email: Scalars['String'];
  id: Scalars['ID'];
  token: Scalars['String'];
};

export type UserCart = {
  __typename?: 'UserCart';
  id: Scalars['ID'];
  userItems: Array<CartItem>;
};

export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'UserCart', id: string, userItems: Array<{ __typename?: 'CartItem', item: { __typename?: 'ShopItem', itemDescription: string, itemId: string, itemImage: string, itemName: string, itemPrice: number, itemQuantity: number } }> } };

export type IncrementItemMutationVariables = Exact<{
  input: IncrementCartItemInput;
}>;


export type IncrementItemMutation = { __typename?: 'Mutation', incrementCartItem: { __typename?: 'CartItem', cartSpecificId: string } };

export type CheckoutMutationVariables = Exact<{
  cartId: Scalars['String'];
}>;


export type CheckoutMutation = { __typename?: 'Mutation', checkout: string };

export type DeleteFromCartMutationVariables = Exact<{
  cartId: Scalars['String'];
  itemId: Scalars['String'];
}>;


export type DeleteFromCartMutation = { __typename?: 'Mutation', deleteFromCart: { __typename?: 'UserCart', id: string } };

export type FetchExistingCartQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type FetchExistingCartQuery = { __typename?: 'Query', userCart: { __typename?: 'UserCart', id: string, userItems: Array<{ __typename?: 'CartItem', item: { __typename?: 'ShopItem', itemId: string, itemDescription: string, itemImage: string, itemName: string, itemPrice: number, itemQuantity: number } }> } };

export type FetchSessionMutationVariables = Exact<{
  input: SessionCheckInput;
}>;


export type FetchSessionMutation = { __typename?: 'Mutation', checkForSession: { __typename: 'Error', message: string } | { __typename: 'MutationCheckForSessionSuccess', data: { __typename?: 'User', email: string, id: string, token: string, cart: { __typename?: 'UserCart', id: string, userItems: Array<{ __typename?: 'CartItem', cartItemQuantity: number, item: { __typename?: 'ShopItem', itemDescription: string, itemId: string, itemImage: string, itemName: string, itemPrice: number, itemQuantity: number } }> } } } };

export type FetchShopItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchShopItemsQuery = { __typename?: 'Query', allItems: Array<{ __typename?: 'ShopItem', itemDescription: string, itemImage: string, itemName: string, itemId: string, itemQuantity: number, itemPrice: number }> };

export type RegisterMutationVariables = Exact<{
  UserRegisterInput: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'Error', message: string } | { __typename: 'MutationRegisterSuccess', data: { __typename?: 'User', email: string, id: string, token: string } } };

export type LogInMutationVariables = Exact<{
  LoginType: LoginType;
}>;


export type LogInMutation = { __typename?: 'Mutation', login: { __typename: 'Error', message: string } | { __typename: 'MutationLoginSuccess', data: { __typename?: 'User', email: string, id: string, token: string, cart: { __typename?: 'UserCart', id: string, userItems: Array<{ __typename?: 'CartItem', item: { __typename?: 'ShopItem', itemDescription: string, itemId: string, itemImage: string, itemName: string, itemPrice: number, itemQuantity: number } }> } } } };


export const AddToCartDocument = gql`
    mutation AddToCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    id
    userItems {
      item {
        itemDescription
        itemId
        itemImage
        itemName
        itemPrice
        itemQuantity
      }
    }
  }
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const IncrementItemDocument = gql`
    mutation IncrementItem($input: IncrementCartItemInput!) {
  incrementCartItem(input: $input) {
    cartSpecificId
  }
}
    `;
export type IncrementItemMutationFn = Apollo.MutationFunction<IncrementItemMutation, IncrementItemMutationVariables>;

/**
 * __useIncrementItemMutation__
 *
 * To run a mutation, you first call `useIncrementItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementItemMutation, { data, loading, error }] = useIncrementItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIncrementItemMutation(baseOptions?: Apollo.MutationHookOptions<IncrementItemMutation, IncrementItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementItemMutation, IncrementItemMutationVariables>(IncrementItemDocument, options);
      }
export type IncrementItemMutationHookResult = ReturnType<typeof useIncrementItemMutation>;
export type IncrementItemMutationResult = Apollo.MutationResult<IncrementItemMutation>;
export type IncrementItemMutationOptions = Apollo.BaseMutationOptions<IncrementItemMutation, IncrementItemMutationVariables>;
export const CheckoutDocument = gql`
    mutation Checkout($cartId: String!) {
  checkout(cartId: $cartId)
}
    `;
export type CheckoutMutationFn = Apollo.MutationFunction<CheckoutMutation, CheckoutMutationVariables>;

/**
 * __useCheckoutMutation__
 *
 * To run a mutation, you first call `useCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutMutation, { data, loading, error }] = useCheckoutMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CheckoutMutation, CheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckoutMutation, CheckoutMutationVariables>(CheckoutDocument, options);
      }
export type CheckoutMutationHookResult = ReturnType<typeof useCheckoutMutation>;
export type CheckoutMutationResult = Apollo.MutationResult<CheckoutMutation>;
export type CheckoutMutationOptions = Apollo.BaseMutationOptions<CheckoutMutation, CheckoutMutationVariables>;
export const DeleteFromCartDocument = gql`
    mutation deleteFromCart($cartId: String!, $itemId: String!) {
  deleteFromCart(cartId: $cartId, itemId: $itemId) {
    id
  }
}
    `;
export type DeleteFromCartMutationFn = Apollo.MutationFunction<DeleteFromCartMutation, DeleteFromCartMutationVariables>;

/**
 * __useDeleteFromCartMutation__
 *
 * To run a mutation, you first call `useDeleteFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFromCartMutation, { data, loading, error }] = useDeleteFromCartMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useDeleteFromCartMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFromCartMutation, DeleteFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFromCartMutation, DeleteFromCartMutationVariables>(DeleteFromCartDocument, options);
      }
export type DeleteFromCartMutationHookResult = ReturnType<typeof useDeleteFromCartMutation>;
export type DeleteFromCartMutationResult = Apollo.MutationResult<DeleteFromCartMutation>;
export type DeleteFromCartMutationOptions = Apollo.BaseMutationOptions<DeleteFromCartMutation, DeleteFromCartMutationVariables>;
export const FetchExistingCartDocument = gql`
    query FetchExistingCart($input: String!) {
  userCart(userId: $input) {
    id
    userItems {
      item {
        itemId
        itemDescription
        itemImage
        itemName
        itemPrice
        itemQuantity
      }
    }
  }
}
    `;

/**
 * __useFetchExistingCartQuery__
 *
 * To run a query within a React component, call `useFetchExistingCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchExistingCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchExistingCartQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchExistingCartQuery(baseOptions: Apollo.QueryHookOptions<FetchExistingCartQuery, FetchExistingCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchExistingCartQuery, FetchExistingCartQueryVariables>(FetchExistingCartDocument, options);
      }
export function useFetchExistingCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchExistingCartQuery, FetchExistingCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchExistingCartQuery, FetchExistingCartQueryVariables>(FetchExistingCartDocument, options);
        }
export type FetchExistingCartQueryHookResult = ReturnType<typeof useFetchExistingCartQuery>;
export type FetchExistingCartLazyQueryHookResult = ReturnType<typeof useFetchExistingCartLazyQuery>;
export type FetchExistingCartQueryResult = Apollo.QueryResult<FetchExistingCartQuery, FetchExistingCartQueryVariables>;
export const FetchSessionDocument = gql`
    mutation fetchSession($input: SessionCheckInput!) {
  checkForSession(input: $input) {
    __typename
    ... on Error {
      message
    }
    ... on MutationCheckForSessionSuccess {
      data {
        email
        id
        token
        cart {
          id
          userItems {
            cartItemQuantity
            item {
              itemDescription
              itemId
              itemImage
              itemName
              itemPrice
              itemQuantity
            }
          }
        }
      }
    }
  }
}
    `;
export type FetchSessionMutationFn = Apollo.MutationFunction<FetchSessionMutation, FetchSessionMutationVariables>;

/**
 * __useFetchSessionMutation__
 *
 * To run a mutation, you first call `useFetchSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchSessionMutation, { data, loading, error }] = useFetchSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchSessionMutation(baseOptions?: Apollo.MutationHookOptions<FetchSessionMutation, FetchSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchSessionMutation, FetchSessionMutationVariables>(FetchSessionDocument, options);
      }
export type FetchSessionMutationHookResult = ReturnType<typeof useFetchSessionMutation>;
export type FetchSessionMutationResult = Apollo.MutationResult<FetchSessionMutation>;
export type FetchSessionMutationOptions = Apollo.BaseMutationOptions<FetchSessionMutation, FetchSessionMutationVariables>;
export const FetchShopItemsDocument = gql`
    query FetchShopItems {
  allItems {
    itemDescription
    itemImage
    itemName
    itemId
    itemQuantity
    itemPrice
  }
}
    `;

/**
 * __useFetchShopItemsQuery__
 *
 * To run a query within a React component, call `useFetchShopItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchShopItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchShopItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchShopItemsQuery(baseOptions?: Apollo.QueryHookOptions<FetchShopItemsQuery, FetchShopItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchShopItemsQuery, FetchShopItemsQueryVariables>(FetchShopItemsDocument, options);
      }
export function useFetchShopItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchShopItemsQuery, FetchShopItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchShopItemsQuery, FetchShopItemsQueryVariables>(FetchShopItemsDocument, options);
        }
export type FetchShopItemsQueryHookResult = ReturnType<typeof useFetchShopItemsQuery>;
export type FetchShopItemsLazyQueryHookResult = ReturnType<typeof useFetchShopItemsLazyQuery>;
export type FetchShopItemsQueryResult = Apollo.QueryResult<FetchShopItemsQuery, FetchShopItemsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($UserRegisterInput: UserRegisterInput!) {
  register(input: $UserRegisterInput) {
    __typename
    ... on Error {
      message
    }
    ... on MutationRegisterSuccess {
      data {
        email
        id
        token
      }
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      UserRegisterInput: // value for 'UserRegisterInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($LoginType: LoginType!) {
  login(input: $LoginType) {
    __typename
    ... on MutationLoginSuccess {
      data {
        email
        id
        token
        cart {
          id
          userItems {
            item {
              itemDescription
              itemId
              itemImage
              itemName
              itemPrice
              itemQuantity
            }
          }
        }
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      LoginType: // value for 'LoginType'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;