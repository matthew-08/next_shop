import jwt from 'jsonwebtoken'
import prisma from 'prisma/db'
import JWTSecretKey from 'graphql/utils/envVariables'
import builder from '../builder'
import verifyJWT from '../utils/verifyJWT'

const user = builder.prismaObject('User', {
  description: 'Object type representing a user',
  select: {
    email: true,
    id: true,
  },
  fields: (t) => ({
    email: t.exposeString('email'),
    id: t.exposeID('id'),
    token: t.field({
      type: 'String',
      resolve: async (parent, args, context) => {
        const token = await jwt.sign({ id: parent.id }, JWTSecretKey, {
          expiresIn: '1h',
        })
        return token
      },
    }),
    cart: t.relation('UserCart'),
  }),
})

const UserRegisterInput = builder.inputType('UserRegisterInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

builder.mutationFields((t) => ({
  register: t.field({
    type: user,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserRegisterInput, required: true }),
      existingCartItemsId: t.arg({ type: ['String'], required: false }),
    },
    resolve: async (root, args) => {
      const userExists = await prisma.user.count({
        where: {
          email: args.input.email,
        },
      })
      if (userExists) {
        throw new Error('Email already exists')
      }
      const { email, id } = await prisma.user.create({
        data: {
          email: args.input.email,
          password: args.input.password,
        },
      })
      const cart = await prisma.userCart.create({
        data: {
          userId: id,
        },
      })
      if (args.existingCartItemsId) {
        const { existingCartItemsId } = args
        existingCartItemsId.forEach(async (itemId) => {
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              itemId: Number(itemId),
            },
          })
        })
      }
      return {
        email,
        id,
        cart,
      }
    },
  }),
}))

const sessionCheckInput = builder.inputType('SessionCheckInput', {
  fields: (t) => ({
    token: t.string(),
  }),
})

builder.objectType(Error, {
  name: 'Error',
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
})

builder.mutationFields((t) => ({
  checkForSession: t.field({
    type: user,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: sessionCheckInput, required: true }),
    },
    resolve: async (root, args) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const checkJWT = await verifyJWT(args.input.token!)
      if (!checkJWT) {
        throw new Error('Unauthorized')
      } else {
        const getUser = await prisma.user.findFirstOrThrow({
          where: {
            id: Number(checkJWT.id),
          },
        })
        return {
          ...getUser,
        }
      }
    },
  }),
}))

const LoginInputType = builder.inputType('LoginType', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

builder.mutationFields((t) => ({
  login: t.field({
    type: user,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: LoginInputType, required: true }),
    },
    resolve: async (root, args) => {
      const findUser = await prisma.user.findFirst({
        where: {
          email: args.input.email,
        },
      })
      if (!findUser) {
        throw new Error('Invalid email')
      }
      if (findUser.password === args.input.password) {
        return {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        }
      }
      throw new Error('Wrong password, please try again.')
    },
  }),
}))
