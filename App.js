import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from './screens/Login';
import SignIn from './screens/SignIn';
import ClinicList from './screens/ClinicList';
import ClinicDetailView from './screens/ClinicDetailView';
import Splash from "./screens/Splash";


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={ Login } options={ { title: 'Login info'} }/>
    <AuthStack.Screen name="SignIn" component= { SignIn }/>
  </AuthStack.Navigator>
);

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      setUser({});
    }, 500);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? <Splash /> : 
      user ?  <Stack.Navigator initialRouteName="ClinicList"> 
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
