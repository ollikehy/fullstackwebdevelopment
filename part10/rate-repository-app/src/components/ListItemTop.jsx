import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import theme from '../theme'

const styles = StyleSheet.create({
    tinylogo: {
        width: 40,
        height: 40
    },
    column: {
        paddingLeft: 10,
        display: 'flex',
        paddingTop: 10,
        flexGrow: 0
    },
    language: {
        display: 'flex',
        flexGrow: 0,
        color: 'white',
        backgroundColor: theme.colors.primary,
        marginTop: 5,
        padding: 5,
        borderRadius: 4
    }
})

const ListItemTop = ({ repository }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ padding: 10 }}>
                <Image style={styles.tinylogo} source={{ uri: repository.ownerAvatarUrl }} />
            </View>
            <View style={styles.column}>
                <Text style={{ fontWeight: 'bold' }}>{repository.fullName}</Text>
                <Text style={{ color: '#676767' }}>{repository.description}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.language}>{repository.language}</Text>
                    <Text style={{ flexGrow: 1 }} />
                </View>
            </View>
        </View>
    )
}

export default ListItemTop;