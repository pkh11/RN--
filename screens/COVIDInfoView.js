import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import styled from 'styled-components';
import axios from 'axios';

const LineView = styled.View`
    marginTop: 18;
    borderWidth: 1; 
    borderColor: #E5E5E5;
`;
const SectionView = styled.View`
    marginTop: 18;
`;
const TitleText = styled.Text`
    fontSize: 14; 
    color: #808080;
`;
const ContentText = styled.Text`
    marginTop: 10; 
`;


const COVIDStack = createStackNavigator();
const COVIDStackScreen = () => {
    const [dataInfo, setDataInfo] = useState(Object);
    const loadCOVIDData = async () => {
        // TODO: api call 모듈화
        const response = await axios.get('http://52.79.243.246:8080/bundaegi/api/virus/COVID19' , {
            headers : {
                Authorization : "Bearer "+"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJrLmt5b29uaG9Aam9pbnMuY29tIiwiZXhwIjoxNTkyMTgwMjU5LCJpYXQiOjE1OTA5NzA2NTl9.WVqN2jI6AgZ5rg3TFTBbNZ26ICIY9zoEqaAMQFMQ9_pIoA3f0YzVwGaJPS9lzRRRqLmQrEzhTs0v0_lzBladlg"
            }
        });
        setDataInfo(response.data.data);
    };
    
    useEffect(() => {
        loadCOVIDData();
    },[])

    return(
        <SafeAreaView style={ styles.container }>
            <View style={{flex:1, marginLeft:20, marginRight:20}}>
                <SectionView>
                    <Text style={{ fontSize:20, color:'#0D0D0D'}}>코로나바이러스감염증-19</Text>
                    <ContentText>{ dataInfo.virusName }</ContentText>
                    <Text style={{ marginTop:18 }}>{ dataInfo.virusDescription }</Text>
                </SectionView>
                <LineView/>
                <SectionView>
                    <TitleText>예방법</TitleText>
                    <ContentText>{ dataInfo.virusPrevention }</ContentText>
                </SectionView>
                <LineView/>
                <SectionView>
                    <TitleText>전파경로</TitleText>
                    <ContentText>{ dataInfo.virusPropagationPath }</ContentText>
                </SectionView>
                <LineView/>
                <SectionView>
                    <TitleText>증상</TitleText> 
                    <ContentText>{ dataInfo.virusSymptom }</ContentText>
                </SectionView>
                <LineView/>
                <SectionView>
                    <TitleText>잠복기</TitleText>
                    <ContentText>{ dataInfo.virusIncubationPeriod }</ContentText>
                </SectionView>
            </View>
        </SafeAreaView>
    );
}

export default function COVIDInfoView ({navigation}) {
    return(
        <COVIDStack.Navigator screenOptions={ { headerTitle:'', headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
            <Image source={require('../resources/ic_back/ic_back.png')}></Image>
            <Text style={{fontSize:18}}>코로나 정보</Text>
        </TouchableOpacity> ) }}>
            <COVIDStack.Screen name="COVIDStackScreen" component={ COVIDStackScreen } />
        </COVIDStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});