import {
    useQuery
} from '@apollo/react-hooks'
import {
    GET_REPOSITORIES
} from '../graphql/queries'

const useRepositories = () => {
    const {
        data
    } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network'
    })

    return {
        data
    }
};

export default useRepositories;