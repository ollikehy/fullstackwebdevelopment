import {
  gql
} from 'apollo-boost';

export const GET_REPOSITORIES = gql`

query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $search: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $search) {
          edges {
            node {
              id,
              ownerName,
              fullName,
              forksCount,
              reviewCount,
              stargazersCount,
              description,
              ratingAverage,
              language,
              ownerAvatarUrl
            }
          }
        }
      }
`

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id,
    username
  }
}`

export const GET_REPOSITORY = gql`
query Repository($repositoryid: ID!){
  repository(id: $repositoryid) {
    id,
    ownerName,
    fullName,
    forksCount,
    reviewCount,
    stargazersCount,
    description,
    ratingAverage,
    language,
    ownerAvatarUrl,
    url,
    reviews {
      edges {
        node {
          id,
          text,
          rating,
          createdAt,
          user {
            id,
            username
          }
        }
      }
    }
  }
}
`