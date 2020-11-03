import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListItemBottom from './ListItemBottom';
import ListItemTop from './ListItemTop';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

const RepositoryListItem = ({ repository }) => {
    return (
        <View style={styles.container}>
            <ListItemTop repository={repository} />
            <ListItemBottom repository={repository} />
        </View>
    )
}

export default RepositoryListItem;