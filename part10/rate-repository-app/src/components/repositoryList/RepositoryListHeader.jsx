import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import TextInput from '../TextInput';

const RepositoryListHeader = ({ onChange, search, setSearch }) => {

    return (
        <View>
            <TextInput
                value={search}
                onChange={(e) => {
                    setSearch(e.nativeEvent.text)
                }}
                placeholder="Search..."
                style={{ padding: 10, margin: 10, backgroundColor: 'white' }} />
            <RNPickerSelect
                style={{ backgroundColor: 'white' }}
                onValueChange={(e) => onChange(e.target.value)}
                items={[
                    { label: 'Latest repositories', value: 'latest' },
                    { label: 'Highest rated repositories', value: 'highest' },
                    { label: 'Lowest rated repositories', value: 'lowest' }
                ]}
            />
        </View>
    )
}

export default RepositoryListHeader;