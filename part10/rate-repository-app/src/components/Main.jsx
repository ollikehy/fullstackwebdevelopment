import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryItem from './repositoryList/RepositoryItem';
import RepositoryList from './repositoryList/RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8'
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/:repositoryid">
                    <RepositoryItem />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;
