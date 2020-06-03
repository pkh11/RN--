import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, AsyncStorage } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.View`
    flex: 1;
    justifyContent: flex-end;
    marginBottom: 36;
    backgroundColor: red;
    height: 40;
`;
const Section1View = styled.View`
    flex: 1;
    alignItems: center;
    marginTop: 50;
    marginBottom: 30;
`;
const Section2View = styled.View`
    marginTop: 18;
    marginBottom: 18;
    flexDirection: row;
`;
const Section3View = styled.View`
    marginTop: 18;
    marginBottom: 18;
    flexDirection: column;
`;
const Section1Row = styled.View`
    marginTop: 23;
    flexDirection: row;
`;
const SectionTitle = styled.Text`
    fontSize: 14;
    color: #808080;
    marginLeft: 20;
`;
const SectionContent = styled.Text`
    fontSize: 16;
    color: #0D0D0D;
    marginLeft: 16;
    marginLeft: 16;
`;
const SectionContent2 = styled.Text`
    fontSize: 16;
    color: #0D0D0D;
    marginTop: 10;
    marginLeft: 20;
`;
const LineView = styled.View`
    borderWidth: 1;
    borderColor: #E5E5E5;
`;
const ButtonView = styled.TouchableOpacity`
    width: 100%;
    height: 70;
    backgroundColor: #3BCE83;
    justifyContent: center;
    alignItems: center;
    marginBottom: 0;
`;

export default function ClinicDetailView({ route, navigation }) {
    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');
    const item = route.params.clinickInfo;
    const id = item.clinicId;
    const clinicName = item.clinicName;
    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const handleClose = dest => {
        if (modalizeRef.current) {
            modalizeRef.current.close(dest);
        }
    };

    useEffect(() => {
        AsyncStorage.getItem('userInfo').then((value) => {
            const parseValue = JSON.parse(value);
            setUserId(parseValue);
        });
        AsyncStorage.getItem('token').then((value) => {
            setUserToken(JSON.parse(value));
        });
    },[]);
    // console.log('[ClinicDetailView] user : '+JSON.stringify(getUserInfo));
    /*
    "clinicDistance": 0.8488887,
  "clinicId": "C72",
  "clinicLat": 37.56106,
  "clinicLocation": "서울특별시 중구 퇴계로115",
  "clinicLon": 126.98454,
  "clinicName": "중구보건소 명동선별상담소",
  "clinicPhoneNumber": "02-3396-5181",
","clinicPhoneNumber2": "NULL
  "clinicType": "N",
  "clinicWaitCount": 2,
  "clinicWorkTime": null,
  */
    const doWaiting = () => {

        axios.post('http://52.79.243.246:8080/bundaegi/api/line/'+id, {
            headers : {
                Authorization : "Bearer "+userToken
            },
            params: {
                userId: userId,
            }
        })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            const code = response.data.code;
            const message = response.data.msg;
            console.log('[ClinicDetailView] code : '+code);
            console.log('[ClinicDetailView] message : '+message);
            if ( code === 1 ){
                alert(message);
            }else if ( code === 0 ){
                alert(message);
                return;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const [showConfirm, setShowConfirm] = useState(false);
    openConfirm = (show) => {
        setShowConfirm(show);
    }

    const footerButton = () => (
        <ButtonView activeOpacity={0.75} onPress={ () => {openConfirm(true)} }>
            <Text style={{fontSize:18, color:'#FFFFFF', fontWeight:'bold'}}>줄서기</Text>
        </ButtonView>
    );
    const renderContent = () => [

        <Section1View>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#0D0D0D',}}>{item.clinicName}</Text>
               <Section1Row>
                   <Text style={{ fontSize: 16 }}>현재 대기자 {item.clinicWaitCount}명 </Text>
                   <Text style={{ fontSize: 16, color:'#3BCE83', fontWeight: 'bold' }}> 0.4km</Text>
               </Section1Row>
               <Section1Row>
                   <Text style={{ fontSize: 16, color: '#808080', marginRight:10}}>전화하기</Text>
                   <Text style={{ fontSize: 16, color: '#808080', marginLeft:10}}> 저장하기</Text>
               </Section1Row>
        </Section1View>,
            
        <LineView/>,

        <Section2View>
            <SectionTitle>위치 정보</SectionTitle>
            <SectionContent>{item.clinicLocation}</SectionContent>
        </Section2View>,

        <LineView/>,

        <Section2View>
            <SectionTitle>진료 시간</SectionTitle>
            <SectionContent>10:00 - 19:00</SectionContent>
        </Section2View>,

        <LineView/>,

        <Section3View>
            <SectionTitle>기타 정보</SectionTitle>
            <View>
                <SectionContent2>현장 접수는 18시 마감됩니다.{"\n"}현재 종로구 보건소의 누적 확진자는 17명입니다.</SectionContent2>
            </View>
        </Section3View>,

        <LineView/>,

        <Section3View>
            <SectionTitle>방문 시 주의사항</SectionTitle>
            <SectionContent2>보건소 방문 시 자차/도보 이용{"\n"}마스크 착용 필수 (미착용 시 입장 불가){"\n"}진료소 방문 후 일주일동안 자가격리 필수</SectionContent2>
        </Section3View>,
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Modalize modalStyle={{ flex: 1 }} ref={modalizeRef} alwaysOpen={550} handlePosition="inside" modalTopOffset={100} scrollViewProps={{ showsVerticalScrollIndicator: false, stickyHeaderIndices: [0] }} FooterComponent={footerButton}>
                {renderContent()}
            </Modalize>
            <ConfirmDialog
                title="지금 줄서기"
                message={ clinicName+"예약하시겠습니까?\n\n진료 10분전에 꼭 도착해주세요." }
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
                        title: "YES",
                        // onPress: this.optionYes,
                        titleStyle: {
                            color:"#21D287",
                            colorDisabled: "#21D287",
                        },
                        style: {
                            backgroundColor: "transparent",
                            backgroundColorDisabled: "transparent",
                        },
                        onPress: () => doWaiting()
                    }
                }
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
});
 