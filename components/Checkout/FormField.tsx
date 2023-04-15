import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'
import { CheckoutSchema } from '@/types/types'

interface Props {
  labelText: string
  register: (name: string) => object
  input: keyof CheckoutSchema
  error: {
    hasError: boolean
    errorMsg: string | undefined
  }
}
function FormField({ labelText, register, input, error }: Props) {
  return (
    <FormControl isInvalid={error.hasError}>
      <FormLabel fontSize="1.5rem" fontWeight="medium">
        {labelText}
      </FormLabel>
      <Input {...register(input)} type="text" py="1.5rem" fontSize="1.2rem" />
      <FormErrorMessage>{error.errorMsg}</FormErrorMessage>
    </FormControl>
  )
}

export default FormField
