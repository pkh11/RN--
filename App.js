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


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={ Login } options={ { headerShown: false} }/>
    <AuthStack.Screen name="SignIn" component= { SignIn } options={ { headerShown: false} }/>
  </AuthStack.Navigator>
);

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      const getToken = AsyncStorage.getItem('token');
      console.log('/////token'+getToken);
      // setUser({});
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
