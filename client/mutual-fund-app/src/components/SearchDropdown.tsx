import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchDropdownProps {
    options: { 
        id: number; 
        name: string 
    }[];
    onSelect: (id: number) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ options, onSelect }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleSearch = (text: string) => {
        setSearchText(text);
        setFilteredOptions(
            options.filter((option) =>
                option.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search mutual funds..."
                value={searchText}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => onSelect(item.id)}
                    >
                        <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
    },
});

export default SearchDropdown;