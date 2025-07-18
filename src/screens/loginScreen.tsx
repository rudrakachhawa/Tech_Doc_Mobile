// LoginScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLazyGetUserQuery } from '../redux/services/apis/userApi';
import { ShowProxyAuth } from '../react-native-proxy'
import { setProxyAuthToken } from '../redux/features/userInfo/userInfoSlice';
import { useAppDispatch } from '../hooks/hooks';


const LoginScreen = () => {
    const [getUserDetails, { data, isLoading, error }] = useLazyGetUserQuery();
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        getUserDetails();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Button title="Login" onPress={handleLogin} /> */}
            {isLoading && <Text>Loading user info...</Text>}
            <ShowProxyAuth config={{}}  referenceId='870623e16972025236529415b2d54a' onLoginSuccess={(data) => {
                console.log(data)
                dispatch(setProxyAuthToken(data.proxy_auth_token))
            }} onLoginFailure={(data) => {
                console.log("Login failed", data)
            }} />
        </View>
    );
};

export default LoginScreen;
