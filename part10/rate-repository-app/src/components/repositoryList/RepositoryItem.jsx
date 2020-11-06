import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryListItem from './RepositoryListItem';
import RepositoryLinkButton from './RepositoryLinkButton'
import ReviewItem from './ReviewItem';

import useGetRepository from '../../hooks/useGetRepository'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

const RepositoryItem = () => {
    let { repositoryid } = useParams();

    const { data } = useGetRepository(repositoryid);

    const reviews = (data && data.repository) ? data.repository.reviews.edges.map((edge) => edge.node) : []

    return (
        data && data.repository ?
            <View style={styles.container}>
                <RepositoryListItem repository={data.repository} />
                <RepositoryLinkButton url={data.repository.url} />
                <FlatList
                    data={reviews}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={({ id }) => id + "" + Math.random()}
                />
            </View> : null
    )
}

export default RepositoryItem;