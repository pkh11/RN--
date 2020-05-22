import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login ( {navigation} ) {
    return (
        <SafeAreaView style={ {flex:1, flexDirection:'column', alignItems:'center', backgroundColor: '#3BCE83', height: '100%'} }>
            {/* <LottieView source={require('../resources/22605-smooth-swinging.json')} autoPlay loop></LottieView> */}
            
            <Image style={{marginTop:128, marginBottom:10, alignItems:'center'}} source={require('../resources/logo/logo.png')}/> 
            <Image source={require('../resources/titlelogo/titlelogo.png')}/>
            <Text style={{flex:1, color:'#FFFFFF', fontSize:16}}>안전한 대기를 위한 대기서비스</Text>
            <View style={{marginBottom:20, alignItems:'center'}}>
                <Button style={{flex:1}} title="카카오 로그인" onPress={ () => null }></Button>
                <Button style={{flex:1}} title="네이버 로그인" onPress={ () => null }></Button>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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
