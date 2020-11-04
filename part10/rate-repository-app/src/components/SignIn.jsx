import React from 'react';
import { useHistory } from 'react-router-native';
import SignInContainer from './SignInContainer';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory()

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password })
            if (data) {
                history.push('/')
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SignInContainer onSubmit={onSubmit} />)
};

export default SignIn;
