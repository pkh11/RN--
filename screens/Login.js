import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
/*

if (!KakaoLogins) {
    console.error('Module is Not Linked');
}
*/
const logCallback = ( log, callback ) => {
    console.log(log);
    callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
    id: 'profile has not fetched',
    email: 'profile has not fetched',
    profile_image_url: '',
};

export default function Login ( {navigation} ) {

    const [loginLoading, setLoginLoading] = useState(false);
    const [token, setToken] = useState(TOKEN_EMPTY);

    /*
    const kakaoLogin = () => {
        logCallback('Login Start', setLoginLoading(true));

        KakaoLogins.login()
        .then(result => {
          setToken(result.accessToken);
          AsyncStorage.setItem('token',token);
          logCallback(`Login Finished: ${JSON.stringify(result)}`, setLoginLoading(false),);  
        })
        .catch( error => {
            if (error.code === 'E_CANCELED_OPERATION') {
                logCallback(`Login Canceled:${error.message}`, setLoginLoading(false));
            } else {
                logCallback(`Login Failed:${error.code} ${error.message}`, setLoginLoading(false),);
            }
        });
    };
    */

    kakaoLogin = async() => {
        try {
            // const result = await RNKakao.login();
            console.log('////// kakao Login : ');
        } catch (e) {
            console.log('error');
        }
    }
    return (
        <SafeAreaView style={ {flex:1, flexDirection:'column', alignItems:'center', backgroundColor: '#3BCE83', height: '100%'} }>
            {/* <LottieView source={require('../resources/22605-smooth-swinging.json')} autoPlay loop></LottieView> */}
            
            <Image style={{marginTop:128, marginBottom:10, alignItems:'center'}} source={require('../resources/logo/logo.png')}/> 
            <Image source={require('../resources/titlelogo/titlelogo.png')}/>
            <Text style={{flex:1, marginTop:8, color:'#FFFFFF', fontSize:16}}>안전한 대기를 위한 대기서비스</Text>
            <View style={{width:'100%', marginBottom:20, justifyContent:'center'}}>
                <TouchableOpacity style={{marginLeft:20, marginRight:20, marginBottom:10, height:56, justifyContent:'center', alignItems:'center', alignContent:'center', borderRadius:8, backgroundColor:'#FCE34C' }} onPress={ () => kakaoLogin() }>
                    <Text style={{ color:'#000000', fontWeight:'bold', fontSize:14 }}>카카오</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20, marginRight:20, marginBottom:10, height:56, justifyContent:'center', alignItems:'center', alignContent:'center', borderRadius:8, backgroundColor:'#4969AD' }} onPress={ () => null }>
                    <Text style={{ color:'#FFFFFF', fontWeight:'bold', fontSize:14 }}>페이스북</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginBottom:10, height:56, justifyContent:'center', alignItems:'center', alignContent:'center'}} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={{fontSize:14, color:'#FFFFFF',fontWeight:'bold'}}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImgStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10
    }
});
