import React, { useState, useEffect} from "react";
import {View, Alert} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { set } from "react-native-reanimated";

export default function Dialog( props ) {
    console.log('///// clinicname '+props.clinicName);
    var isShowValue = props.show;
    const [isShow, setIsShow] = useState( props.show );
    console.log('///// show '+ isShow);
    return(
        <ConfirmDialog
            title="지금 줄서기"
            message={ props.clinicName+"에 예약하시겠습니까?" }
            messageStyle={{ color:'#0D0D0D', fontSize:16 }}
            onTouchOutside={ () => setIsShow(false) }
            visible={ isShow }
            dialogStyle={{
                width: 300,
                height: 204,
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
                    onPress: () => setIsShow(false)
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
                    }
                }
            }
        />
    );
}