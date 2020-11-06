import React, { useState } from 'react';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('')
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebounce(search, 1000)
    const { data } = useRepositories(orderBy, debouncedSearch)

    return (
        data && data.repositories ?
            <RepositoryListContainer
                repositories={data.repositories}
                setOrderBy={setOrderBy}
                search={search}
                setSearch={setSearch}
            />
            : null);
};

export default RepositoryList;
