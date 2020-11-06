import {
  gql
} from 'apollo-boost';

export const GET_REPOSITORIES = gql`

query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $search: String, $first: Int, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $search, first: $first, after: $after) {
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
          },
          pageInfo {
            startCursor,
            endCursor,
            hasNextPage
          }
        }
      }
`

export const GET_AUTHORIZED_USER = gql`
query authorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id,
    username,
    reviews @include(if: $includeReviews){
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
}`

export const GET_REPOSITORY = gql`
query Repository($repositoryid: ID!, $first: Int, $after: String){
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
    reviews(first: $first, after: $after) {
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
      },
      pageInfo {
        hasNextPage,
        startCursor,
        endCursor,
      }
    }
  }
}
`