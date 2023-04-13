/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  ButtonGroup,
  Image,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm, FormState } from 'react-hook-form'
import { useLogInMutation } from 'graphql/generated/graphql'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/components/context/AccountContext'

interface Form {
  email: string
  password: string
}

function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [mutateFunction, { data, loading, error }] = useLogInMutation()
  const { user, setUser } = useContext(AuthContext)

  const onSubmit = async (formData: Form) => {
    localStorage.setItem('token', '123')
    mutateFunction({
      variables: {
        LoginType: {
          email: formData.email,
          password: formData.password,
        },
      },
    })
  }

  useEffect(() => {
    if (data?.login.__typename === 'MutationLoginSuccess') {
      localStorage.setItem('token', data.login.data.token)
      const { email, id } = data.login.data
      setUser({ email, id })
    } else {
      const message = data?.login.message
      if (message?.includes('email')) {
        setError('email', { message })
      } else if (message?.includes('Password')) {
        setError('password', { message })
      }
    }
  }, [data])

  const fieldHasError = (type: 'password' | 'email') => type in errors
  return (
    <>
      <VStack
        as="form"
        maxWidth="400px"
        m="auto"
        mt="7rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading>Sign-In</Heading>
        <FormControl isInvalid={fieldHasError('email')}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={fieldHasError('password')}>
          <FormLabel>Password</FormLabel>
          <Input type="text" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Text>
          Don't have an account?{' '}
          <Text href="/register" color="blue.400" as={Link}>
            Sign up here.
          </Text>
        </Text>
        <ButtonGroup>
          <Button
            isLoading={loading}
            backgroundColor="cyan.100"
            size="lg"
            fontSize="1.4rem"
            type="submit"
            isDisabled={!isDirty}
          >
            Submit
          </Button>
        </ButtonGroup>
      </VStack>
      <Image />
    </>
  )
}

export default SignIn
