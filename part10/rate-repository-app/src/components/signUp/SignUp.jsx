import React from 'react'
import { useHistory } from 'react-router-native';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';
import SignUpContainer from './SignUpContainer';


const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    let history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password }).then(() => {
                signIn({ username, password }).then(() => {
                    history.push('/')
                })
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SignUpContainer onSubmit={onSubmit} />
    )
}

export default SignUp;