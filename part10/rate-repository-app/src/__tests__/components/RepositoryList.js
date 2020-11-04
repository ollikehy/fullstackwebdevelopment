import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryListContainer from '../../components/repositoryList/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />)

      const names = getAllByTestId('Name')
      const descriptions = getAllByTestId('Description')
      const language = getAllByTestId('Language')
      const forks = getAllByTestId('Forks')
      const stargazers = getAllByTestId('Stars')
      const rating = getAllByTestId('Rating')
      const reviews = getAllByTestId('Reviews')

      const repos = repositories.edges;

      for (i = 0; i < repos.length; i++) {
        expect(names[i]).toHaveTextContent(repos[i].node.fullName)
        expect(stargazers[i]).toHaveTextContent(repos[i].node.stargazersCount > 999 ? (repos[i].node.stargazersCount / 1000).toFixed(1) + 'k' : repos[i].node.stargazersCount);
        expect(descriptions[i]).toHaveTextContent(repos[i].node.description)
        expect(language[i]).toHaveTextContent(repos[i].node.language)
        expect(forks[i]).toHaveTextContent(repos[i].node.forksCount > 999 ? (repos[i].node.forksCount / 1000).toFixed(1) + 'k' : repos[i].node.forksCount)
        expect(rating[i]).toHaveTextContent(repos[i].node.ratingAverage)
        expect(reviews[i]).toHaveTextContent(repos[i].node.reviewCount)
      }

    });
  });
});
