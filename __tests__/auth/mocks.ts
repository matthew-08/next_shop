import { ApolloCache } from "@apollo/client";
import * as Apollo from '@apollo/client'
import { LogInMutationResult } from "graphql/generated/graphql";
import { LogInMutationVariables } from "graphql/generated/graphql";

const input: LogInMutationVariables = {
LoginType: {
    email
}
}


const mockFactory = (query: Apollo.DocumentNode, mockResult: ) => (
    {
        request: {
            query,
            variables: {}
          },
          result: {
            data: {
              currentUser: mockPrisonUser,
            },
        }
    })