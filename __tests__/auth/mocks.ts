import { ApolloCache } from "@apollo/client";
import * as Apollo from '@apollo/client'
import { LogInMutationResult , LogInMutationVariables , LogInDocument, LoginType, LogInMutation, RegisterMutation, RegisterDocument, RegisterMutationVariables } from "graphql/generated/graphql";
import Register from "@/pages/auth/register";


/* 
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
        login: {
          data: {
            id: '12',
            email: '123',
            token: '123',
            cart: {
              id,

            }
          }
        }
      }
    }
  }
}

type MockMutationTwo<T> = {
  mutation: T
}

const testType:MockMutationTwo<LogInMutation> = {
  mutation: {
    login: {
      
    }
  }
}

const mock = [
  {
    request: {
      query: LogInDocument,
      variables: {
        UserRegisterInput: {
          email: 'anemail@gmail.com',
          password: 'password123',
        },
      },
    },
    result: {
      data: {
        register: {
          __typename: 'MutationRegisterSuccess',
          data: {
            token: '123',
            email: 'anemail@gmail.com',
            id: '1',
          },
        },
      },
    },
  },
]

type TestTest<QueryType extends Apollo.MutationResult> = {
  result: {
  }
}



type TestType = Ok<RegisterMutation>

const est: TestType = {
  data: {
    register: {
      __typename: 'MutationRegisterSuccess',
      data: {
        email: '1213',
        id: '123123',
        token: '123123'
      }
    }
  }
}

type ReturnT<T, B> = {
  request: {
    query: Apollo.DocumentNode,
    variables: B
  }
  result: {
    data: T
  }
}

function GenerateMock<T, B>(obj: T, queryType: Apollo.DocumentNode, variables: B ): ReturnT<T, B>{
  return {
    request: {
      query: queryType,
      variables,
    },
    result: {
      data: obj,
    }
  }
}

const generatedMock = GenerateMock<RegisterMutation, RegisterMutationVariables>({
  register: {
    __typename: 'MutationRegisterSuccess',
    data: {
      email: '123@Gmail.com',
      id: '123123',
      token: '123123',
    },
  },
}, RegisterDocument, {
  UserRegisterInput: {
    email: '123@Gmail.com',
    password: '1123123'
  }
})
 */
console.log(RegisterDocument)