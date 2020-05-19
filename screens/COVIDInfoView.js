import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";


const COVIDStack = createStackNavigator();
const COVIDStackScreen = () => {
    return(
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>COVID-19 Info page</Text>
            </View> 
        </SafeAreaView>
    );
}

export default function COVIDInfoView ({navigation}) {
    return(
        <COVIDStack.Navigator screenOptions={ {headerTitle: '코로나정보', headerTitleAlign:'left', headerLeft: () => ( <Text onPress={ () => navigation.goBack() }> 뒤로 </Text> ) }}>
            <COVIDStack.Screen name="COVIDStackScreen" component={ COVIDStackScreen } />
        </COVIDStack.Navigator>
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