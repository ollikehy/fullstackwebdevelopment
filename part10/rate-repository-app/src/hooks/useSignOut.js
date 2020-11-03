import { useApolloClient } from '@apollo/react-hooks'
import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signOut = async () => {
        await authStorage.removeAccessToken()
        apolloClient.resetStore();
    }

    return [signOut]
}

export default useSignOut