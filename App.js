import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import SignIn from './screens/SignIn';
import Login from './screens/Login';
import ClinicList from './screens/ClinicList';
import ClinicDetailView from './screens/ClinicDetailView';
import Splash from "./screens/Splash";
import LoginForm from './screens/LoginForm';


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthStackScreen = (navigation) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={ Login } options={ { headerShown: false} }/>
    <AuthStack.Screen name="SignIn" component= { SignIn } options={ { headerShown: false} }/>
    <AuthStack.Screen name="LoginForm" component={ LoginForm } options={ { headerShown: false } }/>
    <AuthStack.Screen name="ClinicList" component={ ClinicList } options={ { headerShown: false} } />
    <AuthStack.Screen name="ClinicDetailView" component={ ClinicDetailView } options={({route}) => { return { headerBackTitle: route.params.clinickInfo.clinicName, headerTitle: null, headerTintColor: '#0D0D0D' }; } }></AuthStack.Screen> 
  </AuthStack.Navigator>
);

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      const getToken = AsyncStorage.getItem('token');
      const getUserInfo = AsyncStorage.getItem('userInfo');

      console.log('[App.js] token'+JSON.stringify(getToken));
      console.log('[App.js] userInfo'+JSON.stringify(getUserInfo));
      // setUser(getToken);
    }, 500);
  }, []);

  return (
    <NavigationContainer>
      {user ?  <Stack.Navigator initialRouteName="ClinicList"> 
                <Stack.Screen name="Cliniclist" component={ ClinicList } options={ { headerShown: false } }></Stack.Screen>
                <Stack.Screen name="ClinicDetailView" component={ ClinicDetailView } options={({route}) => { return { headerBackTitle: route.params.clinickInfo.clinicName, headerTitle: null, headerTintColor: '#0D0D0D' }; } }></Stack.Screen> 
              </Stack.Navigator> 
      : <AuthStackScreen />
      }
    </NavigationContainer>
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
