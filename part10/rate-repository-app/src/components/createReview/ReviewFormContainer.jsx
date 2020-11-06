import { Formik } from 'formik';
import React from 'react'
import theme from '../../theme';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native'
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


const ReviewForm = ({ onSubmit }) => {

    return (
        <View>
            <FormikTextInput name="ownerName" placeholder="Repository owner" style={styles.input} />
            <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.input} />
            <FormikTextInput name="rating" placeholder="Rating 1-100" style={styles.input} />
            <FormikTextInput name="review" placeholder="Review" style={styles.input} />
            <TouchableWithoutFeedback onPress={onSubmit} testID="ratingSubmit">
                <Text style={styles.button}>Create a review</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const ReviewFormContainer = ({ onSubmit }) => {

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        review: ''
    }

    const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Owner name is required'),
        repositoryName: yup.string().required('Repository name is required'),
        rating: yup.number().min(1).max(100).required('Rating from 1 to 100 is required'),
        review: yup.string().optional()
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default ReviewFormContainer;