import { ApolloCache } from "@apollo/client";
import * as Apollo from '@apollo/client'
import { LogInMutationResult , LogInMutationVariables } from "graphql/generated/graphql";

const input: LogInMutationVariables


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