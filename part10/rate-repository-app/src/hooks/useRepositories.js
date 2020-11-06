import { useQuery } from '@apollo/react-hooks'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, search) => {
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

    const { data } = useQuery(GET_REPOSITORIES,
        { variables: { orderBy, orderDirection, search } },
        { fetchPolicy: 'cache-and-network' }
    )

    return { data }
};

export default useRepositories;