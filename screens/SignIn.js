import React from "react";
import { Button } from "react-native";

export default ({ navigation }) => (
    <>
        <Button title="SignIn" onPress={ () => alert('sign in')}/>
    </>
);