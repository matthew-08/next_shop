
import * as Apollo from '@apollo/client'

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
  
  export default generateMutationMock