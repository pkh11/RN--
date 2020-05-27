import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import axios from 'axios';

const COVIDStack = createStackNavigator();
const COVIDStackScreen = () => {

    const [dataInfo, setDataInfo] = useState(Object);
    
    const loadCOVIDData = async () => {
        // TODO: api call 모듈화
        const response = await axios.get('http://52.79.243.246:8080/bundaegi/api/virus/COVID19');
        console.log(response.data.data);
        setDataInfo(response.data.data);
    };
    
    useEffect(() => {
        loadCOVIDData();
    },[])

    return(
        <SafeAreaView style={ styles.container }>
            <View style={{marginBottom:18, borderWidth:1, borderColor:'#E5E5E5'}}/>
            <View style={{flex:1, marginLeft:20, marginRight:20}}>
                <View style={ { smarginTop:18 } }>
                    <Text style={{ fontSize:20, color:'#0D0D0D'}}>코로나바이러스감염증-19</Text>
                    <Text style={{ marginTop:10 }}>{ dataInfo.virusName }</Text>
                    <Text style={{ marginTop:18 }}>{ dataInfo.virusDescription }</Text>
                </View>
                <View style={{marginTop:18, borderWidth:1, borderColor:'#E5E5E5'}}/>
                <View style={{ marginTop:18 }}>
                    <Text style={{ fontSize:14, color:'#808080'}}>예방법</Text>
                    <Text style={{ marginTop:10 }}>{ dataInfo.virusPrevention }</Text>  
                </View>
                <View style={{marginTop:18, borderWidth:1, borderColor:'#E5E5E5'}}/> 
                <View style={{ marginTop:18 }}>
                    <Text style={{ fontSize:14, color:'#808080'}}>전파경로</Text>
                    <Text style={{ marginTop:10 }}>{ dataInfo.virusPropagationPath }</Text>    
                </View> 
                <View style={{marginTop:18, borderWidth:1, borderColor:'#E5E5E5'}}/>
                <View style={{ marginTop:18 }}>
                    <Text style={{ fontSize:14, color:'#808080'}}>증상</Text>  
                    <Text style={{ marginTop:10 }}>{ dataInfo.virusSymptom }</Text> 
                </View>
                <View style={{marginTop:18, borderWidth:1, borderColor:'#E5E5E5'}}/>
                <View style={{ marginTop:18 }}>
                    <Text style={{ fontSize:14, color:'#808080'}}>잠복기</Text>  
                    <Text style={{ marginTop:10 }}>{ dataInfo.virusIncubationPeriod }</Text> 
                </View>  
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