import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ChatBot from 'chatbot-react-native-sdk';
import PageHtmlRenderer from '../components/pageHtmlRenderer';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../hooks/hooks';
import AllPages from '../screens/allPages';
import AllCollections from '../screens/allCollection';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator>
                <Stack.Screen name={"CollectionsList"} component={AllCollections} options={{ headerShown: false }} />
                <Stack.Screen name={"PageList"} component={AllPages} options={{ headerShown: true }} />
                <Stack.Screen name={"PageDetail"} component={PageHtmlRenderer} options={{ headerShown: true }} />
            </Stack.Navigator>

            <ChatBot
                embedToken={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiI1OTgyIiwiY2hhdGJvdF9pZCI6IjY2NTQ3OWE4YmQ1MDQxYWU5M2ZjZDNjNSIsInVzZXJfaWQiOiIxMjQifQ.aI4h6OmkVvQP5dyiSNdtKpA4Z1TVNdlKjAe5D8XCrew"}
                threadId={currentOrgId}
                bridgeName="techdoc_internal_chatbot"
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