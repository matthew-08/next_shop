import prisma from 'prisma/db';
import Stripe from 'stripe';
import builder from '../builder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})


builder.mutationFields((t) => ({
    checkout: t.field({
        args: {
            cartId: t.arg({required: true, type: 'String'})
        },
        type: 'String',
        resolve: (parent, args) => {
            const cartItems = prisma.userCart.findUnique({
                where: {
                    id: Number(args.cartId)
                },
                include: {
                    CartItem: {
                        include: {
                            item: {
                                
                            }
                        }
                    }
                }
            })
            const session = stripe.checkout.sessions.create({
                line_items: [

                ]
            }) 
        }
    })
}))