import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useGetRepository = ({ repositoryid, first, after }) => {
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORY,
        { variables: { repositoryid, first, after } },
        { fetchPolicy: 'cache-and-network' })

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repository.reviews.pageInfo.hasNextPage

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                repositoryid: repositoryid,
                after: data.repository.reviews.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    ...fetchMoreResult.repository,
                    reviews: {
                        edges: [
                            ...previousResult.repository.reviews.edges,
                            ...fetchMoreResult.repository.reviews.edges
                        ],
                        pageInfo: fetchMoreResult.repository.reviews.pageInfo
                    }
                };
                return nextResult
            }

        })

    }

    return {
        repository: data ? data.repository : undefined,
        fetchMore: handleFetchMore,
        loading
    }
};

export default useGetRepository;