import {
  gql
} from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
        repositories {
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
    url
  }
}
`