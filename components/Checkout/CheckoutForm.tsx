import React from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

function CheckoutForm() {
  const { isOpen, onToggle } = useDisclosure()
  const { register } = useForm()

  return (
    <Flex as="form" flexDir="column" width="100%" px="2rem" gap="1rem">
      <Heading>Delivery Information</Heading>
      <HStack>
        <FormControl>
          <FormLabel fontSize="1.5rem" fontWeight="medium">
            First Name
          </FormLabel>
          <Input type="text" py="1.5rem" fontSize="1.2rem" />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input type="Text" />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input type="Text" />
        </FormControl>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Zip Code</FormLabel>
          <Input type="Text" />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input type="Text" />
        </FormControl>
      </HStack>
      <Heading>Payment Information</Heading>
    </Flex>
  )
}

export default CheckoutForm
