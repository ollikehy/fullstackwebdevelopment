import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { SIGN_IN } from '../graphql/mutations'
import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const [mutate, { data }] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } })
        await authStorage.setAccessToken(data.authorize.accessToken);
        apolloClient.resetStore()
        return data;
    };

    return [signIn, data];
};

export default useSignIn