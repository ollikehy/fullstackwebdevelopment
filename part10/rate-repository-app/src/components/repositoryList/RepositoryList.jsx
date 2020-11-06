import React, { useState } from 'react';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('')
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebounce(search, 1000)
    const after = repositories ? repositories[repositories.length - 1].pageInfo.endCursor : ''
    const { repositories, fetchMore } = useRepositories({ orderBy, debouncedSearch, first: 8, after })

    const onEndReach = () => {
        fetchMore()
    }

    return (
        repositories ?
            <RepositoryListContainer
                repositories={repositories}
                setOrderBy={setOrderBy}
                search={search}
                setSearch={setSearch}
                onEndReach={onEndReach}
            />
            : null);
};

export default RepositoryList;
