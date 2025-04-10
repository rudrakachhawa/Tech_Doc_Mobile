import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { Text, View } from 'react-native'

const HomeScreen = () => (
    <View><Text>Home Screen</Text></View>
);
const SettingsScreen = () => (
    <View><Text>Settings Screen</Text></View>
);

console.log("firstrttt")
const Drawer = createDrawerNavigator();
const AppNavigator = () => {

    console.log("first")
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};
export default AppNavigator