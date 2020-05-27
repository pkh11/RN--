import React from "react";
import { Image, SafeAreaView, Text } from "react-native";
import LottieView from 'lottie-react-native';

export default () => (
    <>
        <SafeAreaView style={ {flexDirection:'column', alignItems:'center', backgroundColor: '#3BCE83', height: '100%'} }>
            {/* <LottieView source={require('../resources/22605-smooth-swinging.json')} autoPlay loop></LottieView> */}
            <Image style={{marginTop:128, marginBottom:10, alignItems:'center'}} source={require('../resources/logo/logo.png')}/> 
            <Image source={require('../resources/titlelogo/titlelogo.png')}/>
            <Text style={{color:'#FFFFFF',marginTop:8, fontSize:16}}>안전한 대기를 위한 대기서비스</Text>
        </SafeAreaView>
    </>
);