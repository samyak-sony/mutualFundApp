import React from "react";
import { ActivityIndicator,StyleSheet,View } from "react-native";

const Loader: React.FC=()=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007BBFF"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});
export default Loader;