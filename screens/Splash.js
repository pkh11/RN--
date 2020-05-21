import React from "react";
import { Text, SafeAreaView } from "react-native";
import LottieView from 'lottie-react-native';

export default () => (
    <>
        <SafeAreaView style={ {backgroundColor: '#3BCE83', height: '100%'} }>
            <Text>splash</Text>
            <LottieView source={require('../resources/22605-smooth-swinging.json')} autoPlay loop></LottieView>
        </SafeAreaView>
    </>
);