import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
    const [mutate, { data }] = useMutation(SIGN_UP)

    const signUp = async ({ username, password }) => {
        await mutate({ variables: { username, password } })
    }

    return [signUp, data];
}

export default useSignUp;