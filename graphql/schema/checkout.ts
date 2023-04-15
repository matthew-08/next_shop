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
        resolve: async (parent, args) => {
            const cartItems = await prisma.userCart.findUnique({
                where: {
                    id: Number(args.cartId)
                },
                include: {
                    CartItem: {
                        include: {
                            item: true
                        }
                    }
                }
            })
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: '2.3',
                        quantity: 1,
                        price_data: {
                            currency: 'USD',
                            tax_behavior: 'inclusive',
                            unit_amount_decimal: '2.3',
                            product_data: {
                                images: [''],
                                name: 'name',
                                description: 'description',
                            }
                        }
                    }
                ],
                mode: 'payment',
                success_url: `http://localhost:3000/?success=true`,
                cancel_url: `http://localhost:3000/?canceled=true`,
            }) 
            return session.url as string
        }
    })
}))