import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

export default function Login ( props ) {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.logoImgStyle }>
            <Text>image / { props.title }</Text>
            </View>
            <View style={styles.buttonStyle}>
                <Button title="카카오 로그인" onPress={ () => null }></Button>
                <Button title="네이버 로그인" onPress={ () => null }></Button>
                <Button title="회원가입" onPress={ () => null }></Button>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImgStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10
    }
});
