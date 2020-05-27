import React, { usetSate, useEffect} from "react";
import {View, Alert} from 'react-native';


export default function DialogView ({ props }) {

    const [visible, setVisible] = usetSate(false);

    useEffect(() => {
        setVisible(true);
    },[]);

    const showAlert = () => Alert.alert(
        "title","message",
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
        ]
    );

    return(
        () => Alert.alert(
            "title","message",
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
            ]
        )
    );
} 