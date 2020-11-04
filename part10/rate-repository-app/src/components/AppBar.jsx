import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import theme from '../theme';
import useSignOut from '../hooks/useSignOut';

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

    const [signOut] = useSignOut();

    const signUserOut = async () => {
        await signOut()
    }

    const { data } = useQuery(GET_AUTHORIZED_USER);

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={TouchableWithoutFeedback}>
                    <Text style={styles.text}>Repositories</Text>
                </Link>
                {!(data && data.authorizedUser) ?
                    <Link to="/signin" component={TouchableWithoutFeedback}>
                        <Text style={styles.text}>Sign in</Text>
                    </Link> :
                    <Text style={styles.text} onPress={() => signUserOut()}>
                        Sign out
                    </Text>
                }
            </ScrollView>
        </View>);
};

export default AppBar;
