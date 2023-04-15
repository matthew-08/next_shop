import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'
import { CheckoutSchema } from '@/types/types'

interface Props {
  labelText: string
  register: (d: keyof CheckoutSchema) => object
  input: keyof CheckoutSchema
}
function FormField({ labelText, register, input }: Props) {
  return (
    <FormControl>
      <FormLabel fontSize="1.5rem" fontWeight="medium">
        {labelText}
      </FormLabel>
      <Input {...register(input)} type="text" py="1.5rem" fontSize="1.2rem" />
    </FormControl>
  )
}

export default FormField
