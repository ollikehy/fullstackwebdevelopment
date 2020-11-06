import { useMutation } from '@apollo/react-hooks'
import { CREATE_REVIEW } from '../graphql/mutations'

const useReview = () => {
    const [mutate, { data }] = useMutation(CREATE_REVIEW);

    const reviewRepository = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({ variables: { repositoryName, ownerName, rating, text }})
        return data
    }

    return [reviewRepository, data];
}

export default useReview;