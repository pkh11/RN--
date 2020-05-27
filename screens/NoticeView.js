import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

const NoticeStack = createStackNavigator();
const NoticeStackScreen = () => {

    const [dataList, setDataList] = useState(null);
    const loadNoticeData = async () => {
        // TODO: api call 모듈화
        let dataList = axios.get('http://52.79.243.246:8080/bundaegi/api/notice')
        .then(function (response) {
            const resultData = response.data.data;
            console.log(resultData);
            setDataList(resultData);
        }).catch(function (error) {
            console.log(error);
        });
    };



    const renderNoticeList = () => {
        <FlatList style={{flex:1,borderTopLeftRadius:12, borderTopRightRadius:12, backgroundColor:'red'}} 
            data={ dataList } 
            renderItem={ ({ item }) => 
            <TouchableOpacity style={{ marginLeft:20, marginRight:20}}>
                    <View style={{borderWidth:1, borderColor:'#F2F2F2'}}/>
                    <View style={ { borderRadius:8 } }>
                        <View style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontWeight:'bold', color:'#0D0D0D', fontSize:18}}>대기자 5명</Text>
                            <TouchableOpacity style={{width:60, height:32, backgroundColor:'#DEF7EB', borderRadius:6, alignItems:'center', justifyContent:'center'}} onPress={() => alert('줄서기')}>
                                <Text style={{color:'#21D287'}}>줄서기</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginTop:9, color:'#0D0D0D'}}>test</Text>
                        <Text style={{marginTop:4, marginBottom:20, color:'#4D4D4D'}}>contents</Text>
                    </View>
                </TouchableOpacity>}>
            }>
        </FlatList>
    }


    useEffect(() => {
        loadNoticeData();
    }, []);

    return(
        <SafeAreaView style={ styles.container }>
            { <FlatList 
                data={ dataList } 
                renderItem={ ({ item }) => 
                <TouchableOpacity style={{height:102, width:'100%'}}>
                        <View style={{borderWidth:1, borderColor:'#F2F2F2'}}/>  
                        <View style={{ marginLeft:20, marginTop:18}}>
                            <View style={{marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <Text style={{fontWeight:'bold', color:'#0D0D0D', fontSize:16}}>{item.noticeTitle}</Text>
                            </View>
                            <Text style={{color:'#0D0D0D'}}>{item.noticeCreateDate}</Text>
                        </View>
                </TouchableOpacity>
                }>}>
                </FlatList>
            }
        </SafeAreaView>
    );
}

export default function NoticeView ({navigation}) {
    return(
        <NoticeStack.Navigator screenOptions={ {headerTitle:'', headerLeft: () => (<TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
            <Image source={require('../resources/ic_back/ic_back.png')}></Image>
            <Text style={{fontSize:18}}>공지사항</Text>
        </TouchableOpacity>) }}>
            <NoticeStack.Screen name="NoticeStackScreen" component={ NoticeStackScreen } />
        </NoticeStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});