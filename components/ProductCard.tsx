import { Container, Flex, Image, VStack, Text, Button } from '@chakra-ui/react'
import { useContext, useEffect, memo } from 'react'
import { ShopItem, useFetchShopItemsQuery } from 'graphql/generated/graphql'
import { UserCartContext } from './context/CartContext'
import { AuthContext } from './context/AccountContext'

const MemoProductCard = memo(({ productInfo }: { productInfo: ShopItem }) => {
  const { user } = useContext(AuthContext)
  const { handleAddToCart } = useContext(UserCartContext)

  return (
    <Flex
      minH="100%"
      border="1px"
      borderColor="gray.100"
      borderRadius="10px"
      padding="1.3rem"
      flexDir="column"
    >
      <Container marginX="auto" display="block" padding="3rem" width="100%">
        <Image
          src={productInfo.itemImage}
          boxSize="200px"
          m="auto"
          objectFit="contain"
        />
      </Container>
      <Flex minH="100%" width="100%" flexDir="column" mt="auto">
        <Flex width="100%">
          <Text fontSize="1.5rem" mr="auto" noOfLines={3} textAlign="left">
            {productInfo.itemName}
          </Text>
        </Flex>
        <Flex minH="150px" flexDir="column" width="100%">
          <Text fontSize="2rem" mt="auto" mb="0.8rem">
            ${productInfo.itemPrice.toFixed(2)}
          </Text>

          <Button
            width="100%"
            size="lg"
            padding="1.5rem"
            py="2rem"
            color="white"
            onClick={() => handleAddToCart(productInfo)}
            _hover={{
              backgroundColor: 'blackAlpha.700',
            }}
            backgroundColor="blackAlpha.800"
          >
            Add to cart
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
})

export default MemoProductCard
