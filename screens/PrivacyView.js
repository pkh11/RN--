import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
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
        <PrivacyStack.Navigator screenOptions={ {headerTitle: '', headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
        <Image source={require('../resources/ic_back/ic_back.png')}></Image>
        <Text style={{fontSize:18}}>개인정보처리방침</Text>
    </TouchableOpacity>  ) }}>
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