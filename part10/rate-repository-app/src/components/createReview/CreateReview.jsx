import React from 'react';
import { useHistory } from 'react-router-native';
import ReviewFormContainer from './ReviewFormContainer';
import useReview from '../../hooks/useReview';

const CreateReview = () => {
    const [reviewRepository, data] = useReview();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, review } = values;

        try {
            const rating = parseInt(values.rating)
            await reviewRepository({ ownerName, repositoryName, rating, review }).then(
                (result) => {
                    history.push(`/repository/${result.createReview.repositoryId}`)
                }
            )
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <ReviewFormContainer onSubmit={onSubmit} />
    )
}

export default CreateReview;