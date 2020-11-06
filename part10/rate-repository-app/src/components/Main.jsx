import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryItem from './repositoryList/RepositoryItem';
import RepositoryList from './repositoryList/RepositoryList';
import CreateReview from './createReview/CreateReview';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import UserReviews from './userReviews/UserReviews'

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
                <Route path="/signin" exact>
                    <SignIn />
                </Route>
                <Route path="/repository/:repositoryid">
                    <RepositoryItem />
                </Route>
                <Route path='/review' exact>
                    <CreateReview />
                </Route>
                <Route path='/signup' exact>
                    <SignUp />
                </Route>
                <Route path='/reviews' exact>
                    <UserReviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;
