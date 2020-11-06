import React from 'react';
import { Text, Linking, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        textAlign: 'center',
        color: 'white',
        backgroundColor: theme.colors.primary
    }
})

const RepositoryLinkButton = ({ url }) => {

    const handleOpenWithLinking = () => {
        // THIS IS DISABLED DUE TO THE EXTREME BUGGINESS OF THE EMULATOR
        //Linking.openURL(url)
    }

    return (
        <Text
            onpress={handleOpenWithLinking()}
            style={styles.button}>
            Open in GitHub
        </Text>
    )
}

export default RepositoryLinkButton;