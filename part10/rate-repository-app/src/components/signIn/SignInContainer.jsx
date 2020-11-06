import React from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../FormikTextInput';

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
            <FormikTextInput style={styles.input} name="username" placeholder="Username" testID="usernameField" />
            <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry={true} testID="passwordField" />
            <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
                <Text style={styles.button}>Sign in</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const SignInContainer = ({onSubmit}) => {

    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })


    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>

    )
}


export default SignInContainer;