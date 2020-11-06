import ApolloClient, { gql } from 'apollo-boost';
import Consants from 'expo-constants'

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    uri: Consants.manifest.extra.apollo_uri + '/graphql',
    typeDefs: gql`
      enum AllRepositoriesOrderBy {
        CREATED_AT
        RATING_AVERAGE
      },
      enum OrderDirection {
        ASC,
        DESC
      }
    `
  });
};

export default createApolloClient;