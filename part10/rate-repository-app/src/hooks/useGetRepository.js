import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useGetRepository = (repositoryid) => {
    const { data } = useQuery(GET_REPOSITORY, { variables: { repositoryid: repositoryid } },
        { fetchPolicy: 'cache-and-network' })

    return { data }
};

export default useGetRepository;