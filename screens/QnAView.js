import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
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
        <QnAStack.Navigator screenOptions={ {headerTitle: '문의하기', headerTitleAlign:'left', headerLeft: () => ( <Text onPress={ () => navigation.goBack() }> 뒤로 </Text> ) }}>
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