import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    stat: {
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const ListItemBottom = ({ repository }) => {
    return (
        <View style={styles.container}>
            <View style={styles.stat}>
                <Text style={{ fontWeight: 'bold' }}>
                    {repository.stargazersCount > 999 ? (repository.stargazersCount / 1000).toFixed(1) + 'k' : repository.stargazersCount}
                </Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.stat}>
                <Text style={{ fontWeight: 'bold' }}>
                    {repository.forksCount > 999 ? (repository.forksCount / 1000).toFixed(1) + 'k' : repository.forksCount}
                </Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.stat}>
                <Text style={{ fontWeight: 'bold' }}>{repository.reviewCount}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.stat}>
                <Text style={{ fontWeight: 'bold' }}>{repository.ratingAverage}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    )
}

export default ListItemBottom;