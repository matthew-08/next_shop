import React, { useEffect } from 'react'
import { Flex, HStack, Heading, Button, useMediaQuery } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CheckoutSchema } from '@/types/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCheckoutMutation } from 'graphql/generated/graphql'
import { BsStripe } from 'react-icons/bs'
import { useRouter } from 'next/router'
import FormField from './FormField'
import registerSchema from './validationSchema/validationSchema'

interface Props {
  cartId: string | null
}

function CheckoutForm({ cartId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchema>({
    resolver: yupResolver(registerSchema),
  })
  const router = useRouter()
  const [checkoutMutation, { loading, data, error }] = useCheckoutMutation()
  const [isSmallerThan600] = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    if (data) {
      window.location.replace(data.checkout)
    }
  }, [data, loading])

  const submitForm = (form: CheckoutSchema) => {
    if (cartId) {
      checkoutMutation({
        variables: {
          cartId,
        },
      })
    }
  }
  const fieldHasError = (field: keyof CheckoutSchema) => field in errors
  return (
    <Flex
      as="form"
      flexDir="column"
      width="100%"
      gap="2rem"
      onSubmit={handleSubmit(submitForm)}
    >
      <Heading mb="1rem">Delivery Information:</Heading>
      <Flex flexDir={isSmallerThan600 ? 'column' : 'row'} gap="1rem">
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
      </Flex>
      <Flex flexDir={isSmallerThan600 ? 'column' : 'row'} gap="1rem">
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
      </Flex>
      <Flex flexDir={isSmallerThan600 ? 'column' : 'row'} gap="1rem">
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
      </Flex>
      <Button
        isLoading={loading}
        fontSize="2.3rem"
        type="submit"
        width="50%"
        m="auto"
        mt="2rem"
        minW="390px"
        backgroundColor="whatsapp.300"
        _hover={{
          backgroundColor: 'whatsapp.400',
        }}
        padding="2rem"
        py="2.4rem"
        leftIcon={<BsStripe width="70px" />}
      >
        Pay with Stripe
      </Button>
    </Flex>
  )
}

export default CheckoutForm
