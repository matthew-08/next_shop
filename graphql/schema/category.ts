import prisma from 'prisma/db';
import builder from '../builder';


builder.prismaObject('Category', {
  description: 'An object type for a shop category',
  name: 'ShopCategory',
  fields: (t) => ({
    categoryName: t.exposeString('name'),
    categoryId: t.exposeID('id'),
    categoryItems: t.relation('ShopItem'),
  }),
});

builder.queryFields((t) => ({
  allCategories: t.prismaField({
    type: ['Category'],
    resolve: (query, parent, args) => prisma.category.findMany(),
  }),
}));
