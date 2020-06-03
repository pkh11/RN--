import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

const PrivacyStack = createStackNavigator();
const PrivacyStackScreen = () => {
    return(
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>BDG는 서비스 기획부터 종료까지 정보통신망이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’), 개인정보보호법 등 국내의 개인정보 보호 법령을 철저히 준수합니다.

1. 수집하는 개인정보
 
 이용자가 회원제 기반의 다양한 서비스 이용을 원하는 경우, 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
 
 [회원가입시]
 아이디, 비밀번호, 이름을 필수항목으로 수집합니다. 단, BDG의 자체 계정이 아닌 카카오계정, 네이버계정, 애플계정 등의 타서비스 계정을 이용하여 회원 가입을 할 경우 해당 계정의 유저아이디, 이름을 필수항목으로 수집하며, 공개 프로필 정보 (이메일 주소 등)를 선택적으로 수집합니다.

2. 개인정보 제3자 제공 내역
 
 제공받는 자 : 진료예약 서비스를 이용하여 필요한 경우 해당 회사
 제공 목적 : 실명기반의 진료예약
 제공 항목 : 이름
 보유기간 : 회원 탈퇴 시 즉시 파기
 
3. 개인정보 침해 신고
 
 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)
 경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)</Text>
            </View> 
        </SafeAreaView>
    );
}

export default function PrivacyView ({navigation}) {
    return(
        <PrivacyStack.Navigator screenOptions={ {headerTitle: '', headerLeft: () => ( <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={ () => navigation.goBack() }>
        <Image source={require('../resources/ic_back/ic_back.png')}></Image>
        <Text style={{fontSize:18}}>개인정보처리방침</Text>
    </TouchableOpacity>  ) }}>
            <PrivacyStack.Screen name="PrivacyStackScreen" component={ PrivacyStackScreen } />
        </PrivacyStack.Navigator>
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