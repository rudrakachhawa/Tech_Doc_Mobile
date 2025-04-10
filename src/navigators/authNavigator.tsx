import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import SelectWorkspace from '../screens/selectWorkspace';
import { useAppSelector } from '../hooks/hooks';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const { token, currentOrgId } = useAppSelector((state) => ({
        token: state.userInfo.proxyAuthToken || null,
        currentOrgId: state.userInfo.currentOrgId || null
    }));

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            {!token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : !currentOrgId ? (
                <Stack.Screen name="Select Workspace" component={SelectWorkspace} />
            ) : null}
        </Stack.Navigator>
    );
};

export default AuthNavigator;
