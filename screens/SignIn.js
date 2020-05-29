import React, { useState } from "react";
import { StyleSheet, Button, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from 'axios';

const TOKEN_EMPTY = 'token has not fetched';

const SignInStack = createStackNavigator();
const SignInStackScreen = () => {
    const [token, setToken] = useState(TOKEN_EMPTY);
    const [signInInfo, setSingInInfo] = useState({
        userId: '',
        userPassword: '',
        userName: '',
        userPhoneNumber: '',
        userType: 'U'
    });
    const [isServiceAgree, setIsServiceAgree] = useState(false);
    const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);

    confirmServiceAgree = (isAgree) => {
        setIsServiceAgree(isAgree);
    }

    confirmPrivacyAgree = (isAgree) => {
        setIsPrivacyAgree(isAgree);
    }

    const setUserInfo = (value, type) => {
        if (type === 'userId'){
            setSingInInfo({...signInInfo, userId: value});
        }else if (type === 'userPassword'){
            setSingInInfo({...signInInfo, userPassword: value});
        }else if (type === 'userName'){
            setSingInInfo({...signInInfo, userName: value});
        }
    };

    setLogin = () => {
        // validation check
        if (!isServiceAgree || !isPrivacyAgree) {
            alert('약관 동의를 해주세요.');
            return;
        }
        let id = signInInfo.userId;
        let password = signInInfo.userPassword;
        let name = signInInfo.userName;
        let phoneNumber = signInInfo.phoneNumber;
        let userType = signInInfo.userType;

        if (id === '' || password === '' || name === ''){
            alert('필수정보를 입력해주세요.');
            return;
        }

        axios.post('http://52.79.243.246:8080/bundaegi/api/user', {
            userId: id,
            userPassword: password,
            userName: name,
            userPhoneNumber: phoneNumber,
            userType: userType
        })
        .then(function (response) {
            const code = response.data.code;
            const status = response.data.status;
            const message = response.data.message;
            const getToken = '';

            if ( code === '1' ){
                getToken = response.data.token;

                // TODO: sage accessToken
                setToken(getToken);
                AsyncStorage.setItem('token', token);
                
                // TODO: go to login page


            }else if ( code === '0' ){
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
                    <Text style={{ color: '#0D0D0D', fontSize:24, fontWeight:'bold', justifyContent:'flex-start' }}>회원가입</Text>
                    <TextInput style={{ marginTop:44, height:56, width:'100%', marginLeft:12}} placeholder="이메일 입력" placeholderTextColor="#B3B3B3" autoCapitalize="none" name="userId" onChangeText={ (text) => setUserInfo(text, 'userId') }></TextInput>
                    <View style={{borderWidth:1, borderColor:'#E5E5E5'}}/>
                    <TextInput style={{ marginTop:10, height:56, width:'100%', marginLeft:12}} placeholder="비밀번호 (알파벳 대/소문자, 숫자 포함한 10자이상)" placeholderTextColor="#B3B3B3" autoCapitalize="none" name="userPassword" type="text" onChangeText={(text) => setUserInfo(text, 'userPassword')}></TextInput>
                    <View style={{borderWidth:1, borderColor:'#E5E5E5'}}/>
                    <TextInput style={{ marginTop:10, height:56, width:'100%', marginLeft:12}} placeholder="이름 (실명 입력)" placeholderTextColor="#B3B3B3" autoCapitalize="none" name="userName" type="text" onChangeText={(text) => setUserInfo(text, 'userName')}></TextInput>
                    <View style={{borderWidth:1, borderColor:'#E5E5E5'}}/>
                    <View style={{ marginLeft:12, maringRight:12, marginTop:28, flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={ () => confirmServiceAgree(!isServiceAgree) }>
                            {isServiceAgree ? <Image source={require('../resources/checkbox_act/checkbox_act.png')}/> 
                            : <Image source={ require('../resources/checkbox_defalt/checkbox_defalt.png')} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => null }>
                            <Text style={{ marginLeft:12, fontSize:14, color:'#B3B3B3' }}>서비스 이용약관 동의 (필수)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft:12, maringRight:12, marginTop:22, flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={ () => confirmPrivacyAgree(!isPrivacyAgree) }>
                            {isPrivacyAgree ? <Image source={require('../resources/checkbox_act/checkbox_act.png')}/> 
                            : <Image source={ require('../resources/checkbox_defalt/checkbox_defalt.png')} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => null }>
                            <Text style={{ marginLeft:12, fontSize:14, color:'#B3B3B3' }}>개인정보 수집 이용 동의 (필수)</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{height:56, marginTop:50, backgroundColor:'#21D287', borderRadius:6, justifyContent:'center' ,alignItems:'center'}} onPress={ () => setLogin() }>
                        <Text style={{ color:'#FFFFFF', fontSize:16, fontWeight:'bold' }}>가입하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default function SignInView ({ navigation }) {
    return(
        <SignInStack.Navigator screenOptions={ {headerTitle: '', 
                            headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
                                                <Image source={require('../resources/ic_back/ic_back.png')}></Image>
                                                </TouchableOpacity>  ) } }>
            <SignInStack.Screen name="SignInStackScreen" component={ SignInStackScreen }/>
        </SignInStack.Navigator>
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