import { object, string, number } from 'yup'

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

export default registerSchema
