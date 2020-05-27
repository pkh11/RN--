import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Switch, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components';
import { DrawerActions } from '@react-navigation/native';


const SectionView = styled.View`
    flex:1;
    marginLeft: 10;
    marginRight: 10;
    flexDirection: column;
`;
const RowView = styled.View`
    flexDirection: row;
    justifyContent: space-between;
`;
const SectionTitle = styled.Text`
    fontSize: 12;
    color: #808080;
    marginBottom: 24;
`;
const SectionContent = styled.Text`
    fontSize: 12;
    color: #0D0D0D;
    marginBottom: 24;
`;
const LineView = styled.View`
    borderWidth: 1;
    borderColor: #E5E5E5;
    marginBottom: 30;
`;
const NameText = styled.Text`
    fontSize: 24;
    fontWeight: bold;
    marginTop: 48;
    marginBottom: 30;
`;
const LogoutView = styled.TouchableOpacity`
    alignItems: flex-start;
    marginLeft: 10;
`;
const LogoutText = styled.Text`
    fontSize: 14;
    color: #4D4D4D;
`;

export default function SideMenuContents ( {props, navigation} ) {

    /*
    const [alarmActive, setAlarmActive] = useState(false);

    useEffect(() => {
        setAlarmActive(true);
    }, []);
    */
    return(
        <SafeAreaView style={{flex:1, flexDirection:'column', alignItems:'stretch'}}>
            <SectionView style={{flex:1}}>
                <RowView>
                    <TouchableOpacity style={{alignItems:'flex-start'}} onPress={() => navigation.closeDrawer()}>
                        <Image source={require('../resources/ic_close/ic_close.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'flex-end'}}>
                        <Image source={require('../resources/ic_alarm/ic_alarm.png')}></Image>
                    </TouchableOpacity>
                </RowView>
                <NameText>박균호</NameText>
                <RowView>
                    <SectionContent>연결된 계정</SectionContent>
                    <SectionContent>카카오</SectionContent>
                </RowView>
                <SectionContent>내 현황</SectionContent>
                <SectionContent onPress={ () => navigation.navigate('COVIDInfoView')}>코로나 정보</SectionContent>
                <LineView/>
                <SectionTitle>서비스 설정</SectionTitle>
                <RowView>
                    <SectionContent>알림</SectionContent>
                    <Switch value={true} />
                </RowView>
                <LineView/>
                <SectionTitle>고객지원</SectionTitle>
                <SectionContent onPress={ () => navigation.navigate('QnAView')}>번대기 서비스 문의하기</SectionContent>
                <SectionContent onPress={ () => navigation.navigate('NoticeView')}>공지사항</SectionContent>
                <SectionContent>버전정보</SectionContent>
                <SectionContent onPress={ () => navigation.navigate('PrivacyView')}>개인정보 처리방침</SectionContent>
            </SectionView>
            <LogoutView onPress={ () => alert('로그아웃') }>
                <LogoutText>로그아웃</LogoutText>
            </LogoutView>
        </SafeAreaView>
    );
}