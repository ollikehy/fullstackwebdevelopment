import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { data } = useRepositories()

    const repositoryNodes = data ? data.repositories.edges.map(edge => edge.node) : [];

    return (
        <FlatList
            data={repositoryNodes}
            keyExtractor={(item) => item.key + '' + Math.random()}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <View>
                    <ItemSeparator />
                    <RepositoryListItem
                        key={item.key}
                        repository={item}
                    />
                </View>
            )}
        />
    );
};

export default RepositoryList;
