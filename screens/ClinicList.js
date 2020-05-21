import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiConfig from '../config/APIConfig';
import axios from 'axios';

import SideMenuContents from './SideMenuContents';
import COVIDInfoView from './COVIDInfoView';
import QnAView from './QnAView';
import NoticeView from './NoticeView';
import PrivacyView from './PrivacyView';

const Drawer = createDrawerNavigator();
const DrawerScreen = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="ListHome" drawerPosition='right' drawerContent={ props => SideMenuContents(props, navigation) }>
        <Drawer.Screen name="ListHome" component={ ListHomeScreen } />
        <Drawer.Screen name="Notifications" component={ NotificationsScreen } />
        <Drawer.Screen name="COVIDInfoView" component={ COVIDInfoView } />
        <Drawer.Screen name="QnAView" component={ QnAView } />
        <Drawer.Screen name="NoticeView" component={ NoticeView } />
        <Drawer.Screen name="PrivacyView" component={ PrivacyView } />
    </Drawer.Navigator>
);

// custom header
function CustomHeader({ navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 50, borderWidth: 1, borderColor: 'red' }}>
            <View style={{ flex: 1, borderColor: 'red', borderWidth: 1, justifyContent: 'center'}}>
                <Text style={{ textAlign: 'flex-start',  marginLeft: 20  }}>번대기</Text>
            </View>
            <View style={{ flex: 1.5, justifyContent: 'center', borderColor: 'red', borderWidth: 1 }}>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', borderColor: 'red', borderWidth: 1 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Text style={{ textAlign: 'center' }}>메뉴</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


let ListItem = props => (
    // <ListItem onPress={() => alert('detail')} />
    <TouchableOpacity>
        <View style={ {borderWidth:1, borderRadius:8, padding:8, margin:8} }>
            <Text>{props.id}</Text>
        </View>
    </TouchableOpacity>
);

// clinic list
function ListHomeScreen({ navigation }) {
    const [list, setList] = useState([]);
    const loadData = async () => {
        // TODO: api call 모듈화
        let dataList = axios.get('http://52.79.243.246:8080/bundaegi/api/clinic/location/1', {
            params: {
                // TODO: 내 위치값 세팅
                lat: 37.566635,
                lon: 126.977962
            }
        }).then(function (response) {
            const resultData = response.data.data;
            setList(resultData);
        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView>
            <CustomHeader navigation={ navigation }></CustomHeader>
            <FlatList data={ list } renderItem={ ({ item }) => 
                <TouchableOpacity onPress={ () =>  navigation.navigate("ClinicDetailView", { clinickInfo: item }) }>
                    <View style={ { borderWidth:1, borderRadius:8, padding:8, margin:8 } }>
                        <Text>5명</Text>
                        <Text>{item.clinicName}</Text>
                        <Text>{item.clinicLocation}</Text>
                    </View>
                </TouchableOpacity>
            }>
            </FlatList> 
        </SafeAreaView>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

export default function ClinicList () {

    return (
        <DrawerScreen/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
