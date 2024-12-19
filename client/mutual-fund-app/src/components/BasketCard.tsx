import React from "react";
import { View,Text,StyleSheet } from "react-native";

interface BasketCardProps {
    name:string,
    riskCategory:string;
}

const BasketCard: React.FC<BasketCardProps> = ({name,riskCategory})=>{
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.risk}>{riskCategory}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name:{
        fontSize: 16,
        fontWeight:'bold',
    },
    risk:{
        fontSize:14,
        color:'#555'
    }
})

export default BasketCard;