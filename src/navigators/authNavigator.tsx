import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import { useAppSelector } from '../hooks/hooks';
import AllWorkspace from '../screens/allWorkspace';
import useColorScheme from '../components/components/useColorScheme';
import Text from '../components/components/Text';
import Separator from '../components/components/Seperator';
import View from '../components/components/View';
const Stack = createStackNavigator();

const AuthNavigator = () => {
    const themeColors = useColorScheme()
    const { token, currentOrgId } = useAppSelector((state) => ({
        token: state.userInfo.proxyAuthToken || null,
        currentOrgId: state.userInfo.currentOrgId || null
    }));
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: themeColors.primary,
                height: 80,
            },
            headerTitle: (props) => {
                return <Text variant='h3' style={{ fontWeight: 500 }}>{props.children}</Text>
            }
        }}>
            {!token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : !currentOrgId ? (
                <Stack.Screen name="Select Workspace" component={AllWorkspace} />
            ) : null}
        </Stack.Navigator>
    );
};

export default AuthNavigator;
