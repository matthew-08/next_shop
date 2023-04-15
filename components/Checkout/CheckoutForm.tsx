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
import { CheckoutSchema } from '@/types/types'
import FormField from './FormField'

function CheckoutForm() {
  const { isOpen, onToggle } = useDisclosure()
  const { register } = useForm<CheckoutSchema>()

  return (
    <Flex as="form" flexDir="column" width="100%" px="2rem" gap="1rem">
      <Heading>Delivery Information</Heading>
      <HStack>
        <FormField
          input="firstName"
          labelText="First Name"
          register={register}
        />
        <FormField input="lastName" labelText="Last Name" register={register} />
      </HStack>
      <HStack>
        <FormField input="address" labelText="Address" register={register} />
        <FormField input="city" labelText="City" register={register} />
      </HStack>
      <HStack>
        <FormField input="zipCode" labelText="Zip Code" register={register} />
        <FormField
          input="phoneNumber"
          labelText="Phone Number"
          register={register}
        />
      </HStack>
      <Heading>Payment Information</Heading>
    </Flex>
  )
}

export default CheckoutForm
