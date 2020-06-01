import React, { useState } from "react";
import { StyleSheet, Button, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from 'axios';


const LoginFormStack = createStackNavigator();
const LoginFormStackScreen = ({navigation}) => {

    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const userInfo = (value, type) => {
        if (type === 'userId'){
            setUserId(value);
        }else if (type === 'userPassword'){
            setUserPassword(value);
        }
    }
    goLogin = (navigation) => {
        // validation check
        if ( userId === '' || userPassword === '' ){
            alert('아이디 또는 비밀번호를 확인해주세요.');
            return;
        }

        axios.post('http://52.79.243.246:8080/bundaegi/api/user/login', {
            userId: userId,
            userPassword: userPassword,
        })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            const code = response.data.code;
            console.log('[LoginForm] code : '+code);

            if ( code === 1 ){
                const token = response.data.token;
                // TODO: save accessToken
                console.log('[LoginForm] token : '+JSON.stringify(token));
                // AsyncStorage.setItem('token', token);
                
                // TODO: go to login page
                navigation.navigate('ClinicList');
                // navigation.goBack;
            }else if ( code === 0 ){
                const message = response.message;
                alert(message);
                return;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    return(        
        <SafeAreaView style={ styles.container }>
            <View style={{width:'100%', height:'100%', backgroundColor:'#FFFFFF'}}>
                <View style={{ flex:0.8, marginLeft:28, marginRight:28, marginTop:42}}>
                    <Text style={{ color: '#0D0D0D', fontSize:24, fontWeight:'bold', justifyContent:'flex-start' }}>이메일로 로그인</Text>
                    <TextInput style={{ marginTop:44, height:56, width:'100%', marginLeft:12}} placeholder="이메일 입력" placeholderTextColor="#B3B3B3" autoCapitalize="none" name="userId" onChangeText={ (text) => userInfo(text, 'userId') }></TextInput>
                    <View style={{borderWidth:1, borderColor:'#E5E5E5'}}/>
                    <TextInput style={{ marginTop:10, height:56, width:'100%', marginLeft:12}} secureTextEntry={ true } placeholder="비밀번호 (알파벳 대/소문자, 숫자 포함한 10자이상)" placeholderTextColor="#B3B3B3" autoCapitalize="none" name="userPassword" type="text" onChangeText={(text) => userInfo(text, 'userPassword')}></TextInput>
                    <View style={{borderWidth:1, borderColor:'#E5E5E5'}}/>
                    <TouchableOpacity style={{height:56, marginTop:50, backgroundColor:'#21D287', borderRadius:6, justifyContent:'center' ,alignItems:'center'}} onPress={ () => goLogin(navigation) }>
                        <Text style={{ color:'#FFFFFF', fontSize:16, fontWeight:'bold' }}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default function LoginForm ({ navigation }) {
    return(
        <LoginFormStack.Navigator screenOptions={ {headerTitle: '', 
                            headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
                                                <Image source={require('../resources/ic_back/ic_back.png')}></Image>
                                                </TouchableOpacity>  ) } }>
            <LoginFormStack.Screen name="LoginFormStackScreen" component={ LoginFormStackScreen }/>
        </LoginFormStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});