import prisma from 'prisma/db';
import Stripe from 'stripe';
import builder from '../builder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


builder.mutationFields((t) => ({
    checkout: t.field({
        args: {
            input: t.arg({required: true, type: 'String'})
        },
        type: 'String',
        resolve: (parent, args) => {
            aait    
        }
    })
}))