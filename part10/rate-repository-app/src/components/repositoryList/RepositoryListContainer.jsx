import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryListItem from './RepositoryListItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
    let history = useHistory()
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    const onPress = (item) => {
        history.push(`/${item.id}`)
    }

    return (
        <FlatList
            data={repositoryNodes}
            keyExtractor={(item) => item.key + '' + Math.random()}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <View>
                    <ItemSeparator />
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <RepositoryListItem
                            key={item.key}
                            repository={item}
                        />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

export default RepositoryListContainer;
