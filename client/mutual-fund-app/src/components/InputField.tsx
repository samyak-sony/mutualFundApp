import React from "react";
import { TextInput,StyleSheet,View,Text } from "react-native";

interface InputFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address';
    style?: object;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    style,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, style]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});

export default InputField;