import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CollectionsList from '../components/collectionsList';
import ChatBot from 'chatbot-react-native-sdk';
import PageHtmlRenderer from '../components/pageHtmlRenderer';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppNavigator = () => {

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator>
                <Stack.Screen name={"CollectionsList"} component={CollectionsList} options={{ headerShown: false }} />
                <Stack.Screen name={"PageDetail"} component={PageHtmlRenderer} options={{ headerShown: true }} />
            </Stack.Navigator>

            <ChatBot
                embedToken={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxNTE4IiwiY2hhdGJvdF9pZCI6IjY2YjVjOTQ5ODEzNTkxNTczMzA2Mjc2OCIsInVzZXJfaWQiOiJydWRyYSJ9.ipmfmQpj4QJn49y7NmJhHCH-oKXJbNJjBSPaVA7jb_Q"}
                threadId="RudraBot"
                bridgeName="RudraBot"
                variables={{}}
                openInContainer={false}
                hideIcon={false}
                defaultOpen={false}
                hideCloseButton={false}
            />
        </View>
    );
};

export default AppNavigator