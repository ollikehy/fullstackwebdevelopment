import { useQuery } from '@apollo/react-hooks'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ order, search, first, after }) => {
    let orderBy = 'CREATED_AT';
    let orderDirection = 'ASC';

    if (order === 'latest') {
        orderBy = 'CREATED_AT';
    } else if (order === 'highest') {
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'ASC';
    } else if (order === 'lowest') {
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'DESC';
    }

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES,
        { variables: { orderBy, orderDirection, search, first, after } },
        { fetchPolicy: 'cache-and-network' }
    )

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy, orderDirection, search
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },
                };
                return nextResult
            },
        });
    };

    return {
        repositories: data ? data.repositories : undefined,
        fetchMore: handleFetchMore,
        loading
    }
};

export default useRepositories;