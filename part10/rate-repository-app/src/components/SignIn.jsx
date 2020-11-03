import { Formik } from 'formik';
import React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
    username: '',
    password: ''
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        backgroundColor: '#fff',
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#c7c7c7'
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexGrow: 1,
        color: '#fff',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 3,
        textAlign: 'center'
    }
})

const SignInForm = ({ onSubmit }) => {

    return (
        <View>
            <FormikTextInput style={styles.input} name="username" placeholder="Username" />
            <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry={true} />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.button}>Sign in</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

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
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    )
};

export default SignIn;
