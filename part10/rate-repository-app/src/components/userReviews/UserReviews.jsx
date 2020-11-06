import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_AUTHORIZED_USER } from '../../graphql/queries'
import ReviewItem from '../repositoryList/ReviewItem';

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: 'white',
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10
    },
    separator: {
        height: 10,
        backgroundColor: '#e1e4e8'
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {

    const { data } = useQuery(GET_AUTHORIZED_USER, { variables: { includeReviews: true } });

    return (
        <View>
            <Text style={styles.title}>User reviews</Text>
            {data && data.authorizedUser.reviews.edges &&
                <FlatList
                    style={styles.list}
                    data={data.authorizedUser.reviews.edges}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item }) => <ReviewItem review={item.node} />}
                    keyExtractor={({ id }) => id + "" + Math.random()}
                />}
        </View>
    )
}

export default UserReviews;