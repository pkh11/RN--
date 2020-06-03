import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, Alert, Text, View, Button, SafeAreaView, ScrollView, FlatList, Image, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import apiConfig from '../config/APIConfig';
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import SideMenuContents from './SideMenuContents';
import COVIDInfoView from './COVIDInfoView';
import QnAView from './QnAView';
import NoticeView from './NoticeView';
import PrivacyView from './PrivacyView';
// import Dialog from './DialogView';

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
    const [showConfirm, setShowConfirm] = useState(false);
    const [list, setList] = useState([]);
    const [location, setLocation] = useState(null);
    const [clinicName, setClinicName] = useState("");


    getData = async () => {
        await AsyncStorage.getItem("userInfo").then((value) => alert(value));
    }

    openConfirm = (show, index) => {
        // console.log("index : "+JSON.stringify(list[index].clinicName));
        const name = JSON.stringify(list[index].clinicName);
        const replaceName = name.replace(/"/g,'');
        setClinicName(replaceName);
        setShowConfirm(show);
    }

    useEffect(() => {
        (async () => {
            const response = await Location.requestPermissionsAsync();
            if ( response.status !== 'granted' ){
                console.log('error');
            }

            const location = await Location.getCurrentPositionAsync({});
        })();
        return () => {
            Location.stopLocationUpdatesAsync();
        };  
    },[]);

    useEffect(() => {
        // loadData(); 
        let dataList = axios.get('http://52.79.243.246:8080/bundaegi/api/clinic/location/5', {
            headers : {
                Authorization : "Bearer "+"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJrLmt5b29uaG9Aam9pbnMuY29tIiwiZXhwIjoxNTkyMTgwMjU5LCJpYXQiOjE1OTA5NzA2NTl9.WVqN2jI6AgZ5rg3TFTBbNZ26ICIY9zoEqaAMQFMQ9_pIoA3f0YzVwGaJPS9lzRRRqLmQrEzhTs0v0_lzBladlg"
            },
            params: {
                // TODO: 내 위치값 세팅
                // lat: 37.566635,
                // lon: 126.977962
                lat: 37.566635,
                lon: 126.977962
            }
        }).then(function (response) {
            const resultData = response.data.data;
            console.log('resultData '+resultData[0]);
            setClinicName(resultData.clinicName);
            setList(resultData);
        }).catch(function (error) {
            console.log(error);
        });
    },[]);

    const renderContent = () => [
        <View style={{backgroundColor:'#FFFFFF', height:'100%'}}>
            <View style={{backgroundColor:'#F2F2F2', flexDirection:'row',alignItems:'center', justifyContent: 'space-between', height:56, borderRadius:28, marginTop:22 ,marginLeft:20, marginRight:20, marginBottom:28}}>
                <Text style={{marginLeft:20}}>서울시 종로구</Text>
                <TouchableOpacity style={{marginRight:16}} onPress={() => alert('position')}>
                    <Image source={require('../resources/ic_gps/ic_gps.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'space-between', fontSize:14, color:'#000000' ,height:17, marginLeft:20, marginRight:20, marginBottom:12}}>
                <Text style={{fontWeight:'bold'}}>검색 결과 {list.length} 건</Text>
                <Text onPress={() => alert('position')}>거리순</Text>
            </View>
            <FlatList style={{borderTopLeftRadius:12, borderTopRightRadius:12}} data={ list } key={ list.clinicId } renderItem={ ({ item, index }) => 
                <TouchableOpacity style={{ marginLeft:20, marginRight:20}} onPress={ () =>  navigation.navigate("ClinicDetailView", { clinickInfo: item }) }>
                    <View style={{borderWidth:1, borderColor:'#F2F2F2'}}/>
                    <View style={ { borderRadius:8 } }>
                        <View style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontWeight:'bold', color:'#0D0D0D', fontSize:18}}>대기자 {item.clinicWaitCount}명</Text>
                            <TouchableOpacity style={{width:60, height:32, backgroundColor:'#DEF7EB', borderRadius:6, alignItems:'center', justifyContent:'center'}} 
                                            onPress={ () => openConfirm(true, index) }>
                                <Text style={{color:'#21D287'}}>줄서기</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginTop:9, color:'#0D0D0D'}}>{item.clinicName}</Text>
                        <Text style={{marginTop:4, marginBottom:20, color:'#4D4D4D'}}>{item.clinicLocation}</Text>
                    </View>
                </TouchableOpacity>}>
            </FlatList> 

            <ConfirmDialog
                title="지금 줄서기"
                message={ clinicName+"에 예약하시겠습니까?\n\n진료 10분전에 꼭 도착해주세요.\n\n" }
                messageStyle={{ color:'#0D0D0D', fontSize:16 }}
                onTouchOutside={ () => setShowConfirm(false) }
                visible={ showConfirm }
                dialogStyle={{
                    width: 300,
                    height: 220,
                    backgroundColor:'#FFFFFF',
                    borderRadius: 12,
                    alignSelf: 'center',
                }}
                contentStyle={{
                    alignSelf:'flex-end'
                }}
                negativeButton={
                    {
                        title: "취소",
                        // disabled: true,
                        titleStyle: {
                            color: "#0D0D0D",
                            colorDisabled: "#0D0D0D",
                        },
                        style: {
                            backgroundColor: "transparent",
                            backgroundColorDisabled: "transparent",
                            marginBottom:0                        
                        },
                        onPress: () => setShowConfirm(false)
                    }
                }
                positiveButton={
                    {
                        title: "확인",
                        // onPress: this.optionYes,
                        titleStyle: {
                            color:"#21D287",
                            colorDisabled: "#21D287",
                        },
                        style: {
                            backgroundColor: "transparent",
                            backgroundColorDisabled: "transparent",
                        }
                    }
                }
            />
            
        </View>
        
    ];

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