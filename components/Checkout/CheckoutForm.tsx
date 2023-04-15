import React from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useDisclosure,
  Heading,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CheckoutSchema } from '@/types/types'
import {
  AnyObjectSchema,
  object,
  string,
  ObjectSchema,
  TypeFromShape,
  number,
} from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from './FormField'

const requiredMessage = 'Field is required'

const registerSchema = object({
  address: string().required(requiredMessage),
  city: string().required(requiredMessage),
  firstName: string().required(requiredMessage),
  lastName: string().required(requiredMessage),
  phoneNumber: number()
    .required(requiredMessage)
    .typeError('Please enter a valid number'),
  zipCode: number()
    .required(requiredMessage)
    .typeError('Please enter a valid zip code'),
})

function CheckoutForm() {
  const { isOpen, onToggle } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchema>({
    resolver: yupResolver(registerSchema),
  })

  const submitForm = (form: CheckoutSchema) => {
    console.log(form)
  }
  const fieldHasError = (field: keyof CheckoutSchema) => field in errors
  return (
    <Flex
      as="form"
      flexDir="column"
      width="100%"
      px="2rem"
      gap="2rem"
      onSubmit={handleSubmit(submitForm)}
    >
      <Heading mb="3rem">Delivery Information:</Heading>
      <HStack>
        <FormField
          error={{
            hasError: fieldHasError('firstName'),
            errorMsg: errors.firstName?.message,
          }}
          input="firstName"
          labelText="First Name"
          register={register}
        />
        <FormField
          error={{
            hasError: fieldHasError('lastName'),
            errorMsg: errors.lastName?.message,
          }}
          input="lastName"
          labelText="Last Name"
          register={register}
        />
      </HStack>
      <HStack>
        <FormField
          error={{
            hasError: fieldHasError('address'),
            errorMsg: errors.address?.message,
          }}
          input="address"
          labelText="Address"
          register={register}
        />
        <FormField
          error={{
            hasError: fieldHasError('city'),
            errorMsg: errors.city?.message,
          }}
          input="city"
          labelText="City"
          register={register}
        />
      </HStack>
      <HStack>
        <FormField
          error={{
            hasError: fieldHasError('zipCode'),
            errorMsg: errors.zipCode?.message,
          }}
          input="zipCode"
          labelText="Zip Code"
          register={register}
        />
        <FormField
          error={{
            hasError: fieldHasError('phoneNumber'),
            errorMsg: errors.phoneNumber?.message,
          }}
          input="phoneNumber"
          labelText="Phone Number"
          register={register}
        />
      </HStack>
      <Button type="submit">SUBMIT</Button>
    </Flex>
  )
}

export default CheckoutForm
