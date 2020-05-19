import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Switch } from 'react-native';

export default function SideMenuContents ( {props, navigation} ) {

    /*
    const [alarmActive, setAlarmActive] = useState(false);

    useEffect(() => {
        setAlarmActive(true);
    }, []);
    */
    return(
        <SafeAreaView style={ {flex:1} }>
            <ScrollView style={ {marginLeft:5} }>
                <Text>닫기</Text>
                <Text>내 현황</Text>
                <Text onPress={ () => navigation.navigate('COVIDInfoView')}>코로나 정보</Text>
                <Text>서비스 설정</Text>
                <Text>위치서비스</Text>
                <View style={ {flexDirection:'row'} }>
                <Text>알림</Text>
                    <Switch value={true} />
                </View>
                <Text>고객지원</Text>
                <Text onPress={ () => navigation.navigate('QnAView')}>번대기 서비스 문의하기</Text>
                <Text onPress={ () => navigation.navigate('NoticeView')}>공지사항</Text>
                <Text>버전정보</Text>
                <Text onPress={ () => navigation.navigate('PrivacyView')}>개인정보 처리방침</Text>
                <Text>로그아웃</Text>
            </ScrollView>
        </SafeAreaView>
    );
}