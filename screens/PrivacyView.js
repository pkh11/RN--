import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

const PrivacyStack = createStackNavigator();
const PrivacyStackScreen = () => {
    return(
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>개인정보처리방침</Text>
            </View> 
        </SafeAreaView>
    );
}

export default function PrivacyView ({navigation}) {
    return(
        <PrivacyStack.Navigator screenOptions={ {headerTitle: '개인정보처리방침', headerTitleAlign:'left', headerLeft: () => ( <Text onPress={ () => navigation.goBack() }> 뒤로 </Text> ) }}>
            <PrivacyStack.Screen name="PrivacyStackScreen" component={ PrivacyStackScreen } />
        </PrivacyStack.Navigator>
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