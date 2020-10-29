import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.background,
        opacity: 50,
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#fff',
        margin: 10
    }
});

const AppBar = () => {

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <Text style={styles.text}>Repositories</Text>
            </TouchableWithoutFeedback>
        </View>);
};

export default AppBar;
