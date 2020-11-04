import React from 'react';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
    const { data } = useRepositories()

    return (
        data && data.repositories ? <RepositoryListContainer repositories={data.repositories} /> : null);
};

export default RepositoryList;
