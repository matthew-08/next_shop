import { ApolloCache } from "@apollo/client";
import * as Apollo from '@apollo/client'
import { LogInMutationResult , LogInMutationVariables , LogInDocument, LoginType, LogInMutation, RegisterMutation, RegisterDocument, RegisterMutationVariables } from "graphql/generated/graphql";
import Register from "@/pages/auth/register";




type ReturnT<T, B> = {
  request: {
    query: Apollo.DocumentNode,
    variables: B
  }
  result: {
    data: T
  }
}

function generateMutationMock<Result, Variables>(queryType: Apollo.DocumentNode, resultData: Result, variables: Variables ): ReturnT<Result, Variables>{
  return {
    request: {
      query: queryType,
      variables,
    },
    result: {
      data: resultData,
    }
  }
}

const generatedMock = generateMutationMock<RegisterMutation, RegisterMutationVariables>(RegisterDocument,
  {
    register: {
      __typename: 'MutationRegisterSuccess',
      data: {
        email: 'anemail123@Gmail.com',
        id: '123',
        token: '1234',
      }
    }
  }, {
    UserRegisterInput: {
      email: '12112412'
    }
  }
  )

export default generateMutationMock