import { SimpleGrid, Flex, useMediaQuery, Text, Box } from '@chakra-ui/react'
import { Audio } from 'react-loader-spinner'
import {
  FetchShopItemsDocument,
  FetchShopItemsQuery,
  ShopItem,
} from 'graphql/generated/graphql'
import MemoProductCard from 'components/ProductCard'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import client from 'apollo-client'

function Products({
  allItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    <SimpleGrid
      as="main"
      px={isSmallerThan1000 ? '1rem' : '20rem'}
      gap="2rem"
      minChildWidth="330px"
      py="1rem"
    >
      {products}
    </SimpleGrid>
  )
}

export const getServerSideProps: GetServerSideProps<{
  allItems: ShopItem[]
}> = async (context) => {
  const { data }: { data: FetchShopItemsQuery } = await client.query({
    query: FetchShopItemsDocument,
  })
  const { allItems } = data
  return {
    props: {
      allItems,
    },
  }
}

export default Products
