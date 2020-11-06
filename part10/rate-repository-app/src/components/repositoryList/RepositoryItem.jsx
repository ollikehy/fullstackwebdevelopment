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
    const after = repository ? repository.reviews.pageInfo.endCursor : ''
    const { repository, fetchMore } = useGetRepository({ repositoryid, first: 3, after });

    const onEndReach = () => {
        fetchMore()
    }

    const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : []

    return (
        repository ?
            <View style={styles.container}>
                <RepositoryListItem repository={repository} />
                <RepositoryLinkButton url={repository.url} />
                <FlatList
                    data={reviews}
                    onEndReached={onEndReach}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={({ id }) => id + "" + Math.random()}
                />
            </View> : null
    )
}

export default RepositoryItem;