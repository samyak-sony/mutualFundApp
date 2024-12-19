import React from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress:()=> void;
    style?: object;
}

const Button: React.FC<ButtonProps> = ({title,onPress,style})=>{
    return (
        <TouchableOpacity style = {[styles.button,style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#007BFF',
        padding:10,
        borderRadius:5,
        alignItems:'center',
    },
    text:{
        color: '#FFFFFF',
        fontSize:16,
        fontWeight:'bold'
    }
});

export default Button;