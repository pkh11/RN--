import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

const QnAStack = createStackNavigator();
const QnAStackScreen = () => {
    return(
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>문의하기</Text>
            </View> 
        </SafeAreaView>
    );
}

export default function QnAView ({navigation}) {
    return(
        <QnAStack.Navigator screenOptions={ {headerTitle: '', headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
        <Image source={require('../resources/ic_back/ic_back.png')}></Image>
        <Text style={{fontSize:18}}>문의하기</Text>
    </TouchableOpacity> ) }}>
            <QnAStack.Screen name="QnAStackScreen" component={ QnAStackScreen } />
        </QnAStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});