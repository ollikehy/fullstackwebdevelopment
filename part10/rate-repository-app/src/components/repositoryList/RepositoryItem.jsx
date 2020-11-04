import React from 'react';
import { View, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryListItem from './RepositoryListItem';
import RepositoryLinkButton from "./RepositoryLinkButton"

import useGetRepository from '../../hooks/useGetRepository'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

const RepositoryItem = () => {
    let { repositoryid } = useParams();

    const { data } = useGetRepository(repositoryid);

    return (
        data && data.repository ?
            <View style={styles.container}>
                <RepositoryListItem repository={data.repository} />
                <RepositoryLinkButton url={data.repository.url} />
            </View> : null
    )
}

export default RepositoryItem;