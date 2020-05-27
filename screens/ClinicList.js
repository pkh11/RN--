import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, Alert, Text, View, Button, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiConfig from '../config/APIConfig';
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import SideMenuContents from './SideMenuContents';
import COVIDInfoView from './COVIDInfoView';
import QnAView from './QnAView';
import NoticeView from './NoticeView';
import PrivacyView from './PrivacyView';
import DialogView from "./DialogView"

const Drawer = createDrawerNavigator();
const DrawerScreen = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="ListHome" drawerPosition='right' drawerContent={ props => SideMenuContents(props, navigation) }>
        <Drawer.Screen name="ListHome" component={ ListHomeScreen } />
        <Drawer.Screen name="COVIDInfoView" component={ COVIDInfoView } />
        <Drawer.Screen name="QnAView" component={ QnAView } />
        <Drawer.Screen name="NoticeView" component={ NoticeView } />
        <Drawer.Screen name="PrivacyView" component={ PrivacyView } />
    </Drawer.Navigator>
);

// custom header
function CustomHeader({ navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 50}}>
            <View style={{ flex: 1, justifyContent: 'center'}}/>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems:'center'}}>
                <Image source={require('../resources/title/title.png')}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image style={{marginRight:20, marginTop:16, marginBottom:16}} source={require('../resources/ic_menu/ic_menu.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// 상단 Image 영역
function ImageView() {
    return(
        <View style={{marginTop:16, marginLeft:28, marginRight:28, marginBottom:20, backgroundColor:'#F2F2F2'}}>
            <Text style={{color:'#000000', fontWeight:'bold', fontSize:24, alignItems:'flex-start'}}>
                이제, 안심하고{"\n"}집에서 대기하세요.
            </Text>
            <Image style={{ marginTop:10, width:'100%', borderRadius:12}} source={require('../resources/img_illust/img_illust.png')}></Image>
        </View>
    );
}

// clinic list
function ListHomeScreen({ navigation }) {
    const [list, setList] = useState([]);
    const [location, setLocation] = useState(null);
/*
    useEffect(() => {
        (async () => {
            const response = await Location.requestPermissionsAsync();
            if ( response.status !== 'granted' ){
                console.log('error');
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log(JSON.stringify(location));
        })();
        return () => {
            Location.stopLocationUpdatesAsync();
        };  
    },[]);
*/
    const loadData = async () => {
        // TODO: api call 모듈화
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;

        axios.get('http://52.79.243.246:8080/bundaegi/api/clinic/location/1?lat=37.566635&lon=126.977962')
            .then(function (response) {
                const resultData = response.data.data;
                setList(resultData);})
            .catch(function (error) {
                console.log(error);
        });
/*
        let dataList = axios.get('http://52.79.243.246:8080/bundaegi/api/clinic/location/1?lat=37.566635&lon=126.977962', {
            // params: {
            //     // TODO: 내 위치값 세팅
            //     // lat: 37.566635,
            //     // lon: 126.977962
            //     lat: 37.566635,
            //     lon: 126.977962
            // }
        }).then(function (response) {
            const resultData = response.data.data;
            setList(resultData);
        }).catch(function (error) {
            console.log(error);
        });
        */
    };

    dialogPopView = () => {
        <DialogView/>
    }


    const renderContent = () => [
        <View style={{backgroundColor:'#FFFFFF', height:'100%'}}>
            <View style={{backgroundColor:'#F2F2F2', flexDirection:'row',alignItems:'center', justifyContent: 'space-between', height:56, borderRadius:28, marginTop:36 ,marginLeft:20, marginRight:20, marginBottom:28}}>
                <Text style={{marginLeft:20}}>서울시 종로구</Text>
                <TouchableOpacity style={{marginRight:16}} onPress={() => alert('position')}>
                    <Image source={require('../resources/ic_gps/ic_gps.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'space-between', fontSize:14, color:'#000000' ,height:17, marginLeft:20, marginRight:20, marginBottom:12}}>
                <Text style={{fontWeight:'bold'}}>검색 결과 {list.length} 건</Text>
                <Text onPress={() => alert('position')}>거리순</Text>
            </View>
            <FlatList style={{borderTopLeftRadius:12, borderTopRightRadius:12}} data={ list } key={list.clinicId} renderItem={ ({ item }) => 
                <TouchableOpacity style={{ marginLeft:20, marginRight:20}} onPress={ () =>  navigation.navigate("ClinicDetailView", { clinickInfo: item }) }>
                    <View style={{borderWidth:1, borderColor:'#F2F2F2'}}/>
                    <View style={ { borderRadius:8 } }>
                        <View style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontWeight:'bold', color:'#0D0D0D', fontSize:18}}>대기자 5명</Text>
                            <TouchableOpacity style={{width:60, height:32, backgroundColor:'#DEF7EB', borderRadius:6, alignItems:'center', justifyContent:'center'}} 
                                            onPress={ () => Alert.alert(
                                                            "지금 줄서기",`${item.clinicName}`+'에 예약하시겠습니까?',
                                                            [
                                                                {
                                                                    text:"cancel",
                                                                    onPress:()=>console.log('cancel'),
                                                                    style:'cancel'
                                                                },
                                                                {
                                                                    text:"ok",
                                                                    onPress:()=>console.log('ok')
                                                                }
                                                            ])}>
                                <Text style={{color:'#21D287'}}>줄서기</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginTop:9, color:'#0D0D0D'}}>{item.clinicName}</Text>
                        <Text style={{marginTop:4, marginBottom:20, color:'#4D4D4D'}}>{item.clinicLocation}</Text>
                    </View>
                </TouchableOpacity>}>
            </FlatList> 
        </View>
        
    ];

    useEffect(() => {
        (async () => {
            const response = await Location.requestPermissionsAsync();
            if ( response.status !== 'granted' ){
                console.log('error');
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log(JSON.stringify(location));
        })();
        return () => {
            Location.stopLocationUpdatesAsync();
        };  
    },[]);

    useEffect(() => {
        // loadData();      
        let dataList = axios.get('http://52.79.243.246:8080/bundaegi/api/clinic/location/1', {
            params: {
                // TODO: 내 위치값 세팅
                // lat: 37.566635,
                // lon: 126.977962
                lat: 37.566635,
                lon: 126.977962
            }
        }).then(function (response) {
            const resultData = response.data.data;
            setList(resultData);
        }).catch(function (error) {
            console.log(error);
        });
    },[]);


    return (
        <SafeAreaView style={{flex:1}}>
            <CustomHeader navigation={ navigation }></CustomHeader>
            <ImageView/>
            {renderContent()}
        </SafeAreaView>
    );
}

export default function ClinicList () {
    return (
        <DrawerScreen/>
    );
}