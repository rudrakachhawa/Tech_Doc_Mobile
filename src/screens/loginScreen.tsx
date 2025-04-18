// LoginScreen.tsx
import React from 'react';
import { View, Button, Text } from 'react-native';
import { useLazyGetUserQuery } from '../redux/services/apis/userApi';
import {ShowGoogleLoginButton} from 'react-native-proxy'


const LoginScreen = () => {
    const [getUserDetails, { data, isLoading, error }] = useLazyGetUserQuery();

    const handleLogin = async () => {
        getUserDetails();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Button title="Login" onPress={handleLogin} /> */}
            {isLoading && <Text>Loading user info...</Text>}
            <ShowGoogleLoginButton referenceId="870623a1697443499652ceeab330e5" onLoginSuccess={(data)=>{
                console.log(data)
            }} onLoginFailure={(data)=>{
                console.log("Login failed",data)
            }} />
        </View>
    );
};

export default LoginScreen;
