import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '../../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 5
    },
    rating: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
        fontSize: 18,
        padding: 14,
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {
        marginRight: 90,
        display: 'flex',
        flexDirection: 'column',
    }
})

const ReviewItem = ({ review }) => {
    const date = format(new Date(review.createdAt), 'dd.MM.yyyy')

    return (
        review ?
            <View style={styles.container}>
                <View style={styles.column}>
                    <Text style={styles.rating}>{review.rating}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{review.user.username}</Text>
                    <Text>{date}</Text>
                    <Text style={styles.text}>{review.text}</Text>
                </View>
            </View> : null
    )
}

export default ReviewItem;