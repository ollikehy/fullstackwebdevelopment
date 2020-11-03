import {
    gql
} from 'apollo-boost';

export const GET_REPOSITORIES = gql `
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

export const GET_AUTHORIZED_USER = gql `
query {
  authorizedUser {
    id,
    username
  }
}`