import { Flex, Text } from '@chakra-ui/react'

interface Props {
  total: number
}

function TotalSection({ total }: Props) {
  const tax = (total * (7 / 100)).toFixed(2)
  const finalTotal = total + Number(tax)
  return (
    <Flex
      mt="auto"
      fontSize="1.5rem"
      flexDir="column"
      align="center"
      width="50%"
    >
      <Flex
        width="100%"
        borderBottom="2px solid"
        borderColor="gray.300"
        mb="0.4rem"
      >
        <Text>Summary:</Text>
      </Flex>
      <Flex justifyContent="space-between" width="100%">
        <Text>Subtotal:</Text>
        <Text data-testid="subtotal"> ${total} </Text>
      </Flex>
      <Flex justifyContent="space-between" width="100%">
        <Text>Shipping:</Text>
        <Text> FREE </Text>
      </Flex>
      <Flex justifyContent="space-between" width="100%">
        <Text> Taxes and fees:</Text>
        <Text data-testid="tax"> ${tax} </Text>
      </Flex>
      <Flex justifyContent="space-between" width="100%">
        <Text data-testid="total">Total:</Text>
        <Text> ${finalTotal} </Text>
      </Flex>
    </Flex>
  )
}

export default TotalSection
