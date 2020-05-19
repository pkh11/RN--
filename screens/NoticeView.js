import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

const NoticeStack = createStackNavigator();
const NoticeStackScreen = () => {
    return(
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>공지사항</Text>
            </View> 
        </SafeAreaView>
    );
}

export default function NoticeView ({navigation}) {
    return(
        <NoticeStack.Navigator screenOptions={ {headerTitle: '공지사항', headerTitleAlign:'left', headerLeft: () => ( <Text onPress={ () => navigation.goBack() }> 뒤로 </Text> ) }}>
            <NoticeStack.Screen name="NoticeStackScreen" component={ NoticeStackScreen } />
        </NoticeStack.Navigator>
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