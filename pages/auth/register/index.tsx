/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
  Input,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/components/_Context/AccountContext'
import { useRegisterMutation } from 'graphql/generated/graphql'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterScehma } from '@/types/types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserCartContext } from '@/components/_Context/CartContext'

const registerSchema = object({
  email: string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: string()
    .required('Password is required.')
    .min(6, 'Your password must be at least 6 characters long'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Password is required'),
})

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setError,
  } = useForm<RegisterScehma>({
    resolver: yupResolver(registerSchema),
  })
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const { cart, setCart } = useContext(UserCartContext)
  const [registerMutation, { data, loading, error }] = useRegisterMutation()
  const onSubmit = (formData: RegisterScehma) => {
    registerMutation({
      variables: {
        UserRegisterInput: {
          email: formData.email,
          password: formData.password,
        },
        existingCartItemsId: cart.cartItems?.map((cartItem) => cartItem.itemId),
      },
    })
  }

  useEffect(() => {
    if (data) {
      if (data.register.__typename === 'MutationRegisterSuccess') {
        const { token } = data.register.data
        setUser({
          email: data.register.data.email,
          id: data.register.data.id,
        })
        setCart({
          ...cart,
          cartId: data.register.data.cart.id,
        })
        localStorage.setItem('token', token)
        router.push('/products')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const isInputError = (input: keyof RegisterScehma) => input in errors
  return (
    <VStack
      as="form"
      maxWidth="400px"
      m="auto"
      mt="7rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Sign-Up</Heading>
      <FormControl isInvalid={isInputError('email')}>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<EmailIcon />} />
          <Input type="text" {...register('email')} />
        </InputGroup>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={isInputError('password')}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<LockIcon />} />
          <Input type="text" {...register('password')} />
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={isInputError('confirmPassword')}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<LockIcon />} />
          <Input type="text" {...register('confirmPassword')} />
        </InputGroup>
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Text>
        Already have an account?{' '}
        <Text href="/auth/signin" color="blue.400" as={Link}>
          Sign in here.
        </Text>
      </Text>
      <Button
        backgroundColor="cyan.100"
        width="100%"
        fontSize="1.4rem"
        padding="1.4rem"
        type="submit"
        isLoading={loading}
        isDisabled={!isDirty}
      >
        Submit
      </Button>
    </VStack>
  )
}

export default Register
