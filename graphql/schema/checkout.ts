import { ShopItem } from '@prisma/client';
import prisma from 'prisma/db';
import Stripe from 'stripe';
import builder from '../builder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
})

const LineItem = (shopItem: ShopItem):Stripe.Checkout.SessionCreateParams.LineItem => {
    const {name, quantity, description, img, price} = shopItem
    return {
        quantity,
        price_data: {
            currency: 'USD',
            tax_behavior: 'inclusive',
            unit_amount: price * 100,
            product_data: {
                name,
                description,
                images: [img],
            }
        }

    }
}

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
            if(cartItems) {
                const shopItem = cartItems?.CartItem.map(item => {
                    const cartQuantity = item.quantity
                    return {
                        ...item.item,
                        quantity: cartQuantity,
                    }
                })
                const generatedLineItems = shopItem?.map(item => LineItem(item))
                const session = await stripe.checkout.sessions.create({
                    line_items: generatedLineItems,
                    mode: 'payment',
                    success_url: `http://localhost:3000/?success=true`,
                    cancel_url: `http://localhost:3000/checkout?canceled=true`,
                }) 
                return session.url as string
            }
            return 'error to be implemented'
        }
    })
}))