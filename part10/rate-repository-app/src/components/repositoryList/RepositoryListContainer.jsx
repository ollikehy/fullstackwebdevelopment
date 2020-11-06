import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryListItem from './RepositoryListItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, setOrderBy, search, setSearch, onEndReach }) => {
    let history = useHistory()
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    const onPress = (item) => {
        history.push(`/repository/${item.id}`)
    }

    return (
        <FlatList
            data={repositoryNodes}
            keyExtractor={(item) => item.key + '' + Math.random()}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={<RepositoryListHeader onChange={setOrderBy} search={search} setSearch={setSearch} />}
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
