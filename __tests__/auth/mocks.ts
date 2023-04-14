import { ApolloCache } from "@apollo/client";
import * as Apollo from '@apollo/client'
import { LogInMutationResult , LogInMutationVariables , LogInDocument, LoginType } from "graphql/generated/graphql";


const mockFactory = (query: Apollo.DocumentNode, mockResult) => (
    {
        request: {
            query,
            variables: {}
          },
          result: {
            data: {
              currentUser: 0,
            },
        }
    })

interface MockMutation<QueryType, InputField, Result> {
  request: {
    query: QueryType,
    variables: InputField,
  }
  result: {
    data: Result
  }
}

const testMutation:MockMutation<typeof LogInDocument, LoginType, LogInMutationResult> = {
  request: {
    query,
    variables: {
      email: '11341341',
      password: '123123'
    },
  },
  result: {
    data: {
      data: {
        __typename
      }
    }
  }
}