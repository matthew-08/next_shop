import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { DateTimeResolver } from 'graphql-scalars';
import ErrorsPlugin from '@pothos/plugin-errors';
import prisma from 'prisma/db';
import type PrismaTypes from 'prisma/pothos-types';

interface User {
  name: string
  email: string
  id: string
  token: string
}

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes,
  Scalars: {
    DateTime: {
      Input: Date,
      Output: Date
    }
  }
  Objects: {
    User: User
  }
  Context: {},
}>({
  plugins: [PrismaPlugin, ErrorsPlugin],
  errorOptions: {
    defaultTypes: [],
  },
  prisma: {
    client: prisma,
  },

});

builder.queryType({});
builder.mutationType({});

builder.addScalarType('DateTime', DateTimeResolver, {});

export default builder;
