import { SimpleGrid, Flex, useMediaQuery, Text, Box } from '@chakra-ui/react'
import { Audio } from 'react-loader-spinner'
import {
  FetchShopItemsDocument,
  FetchShopItemsQuery,
  ShopItem,
} from 'graphql/generated/graphql'
import MemoProductCard from 'components/ProductCard'
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'
import { gql } from '@apollo/client'
import client from 'apollo-client'

function Products({
  allItems,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)', {
    ssr: true,
    fallback: false,
  })
  let products
  if (!allItems) {
    products = (
      <Flex m="auto" mt="3rem" role="status">
        <Audio height="300" width="300" color="#C4F1F9" />
      </Flex>
    )
  } else {
    products = allItems.map((item) => <MemoProductCard productInfo={item} />)
  }

  return (
    <SimpleGrid as="main" px="1rem" gap="2rem" minChildWidth="330px" py="1rem">
      {products}
    </SimpleGrid>
  )
}

export const getStaticProps: GetStaticProps<{
  allItems: ShopItem[]
}> = async (context) => {
  const { data }: { data: FetchShopItemsQuery } = await client.query({
    query: gql`
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
    `,
  })
  const { allItems } = data
  return {
    props: {
      allItems,
    },
  }
}

export default Products
