import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.background,
        opacity: 50,
        display: 'flex',
        flexDirection: 'row',
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
            <ScrollView horizontal>
                <Link to="/" component={TouchableWithoutFeedback}>
                    <Text style={styles.text}>Repositories</Text>
                </Link>
                <Link to="/signin" component={TouchableWithoutFeedback}>
                    <Text style={styles.text}>Sign in</Text>
                </Link>
            </ScrollView>
        </View>);
};

export default AppBar;
