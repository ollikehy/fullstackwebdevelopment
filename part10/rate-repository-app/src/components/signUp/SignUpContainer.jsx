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

const SignUpForm = ({ onSubmit }) => {

    return (
        <View>
            <FormikTextInput style={styles.input} name="username" placeholder="Username" />
            <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry={true} />
            <FormikTextInput style={styles.input} name="confirmation" placeholder="Password confirmation" secureTextEntry={true} />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.button}>Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}


const SignUpContainer = ({ onSubmit }) => {

    const initialValues = {
        username: '',
        password: '',
        confirmation: ''
    }

    const validationSchema = yup.object().shape({
        username: yup.string().min(1).max(30).required('Username is required and needs to be of length 1 to 30'),
        password: yup.string().min(5).max(50).required('Password is required and needs to be of length 5 to 50'),
        confirmation: yup.string().oneOf([yup.ref('password'), null]).required('Password confirmation required')
    })


    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>

    )
}

export default SignUpContainer;