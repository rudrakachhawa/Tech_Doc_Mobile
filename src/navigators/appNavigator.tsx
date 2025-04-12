import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CollectionsList from '../components/collectionsList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatBot from 'chatbot-react-native-sdk';
import { useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import PageHtmlRenderer from '../components/pageHtmlRenderer';




const HomeScreen = () => (
    <View><Text>Home Screen</Text></View>
);


const Drawer = createDrawerNavigator();
const AppNavigator = () => {
    // const { currentPageId, currentOrgId } = useAppSelector(state => ({
    //     currentPageId: state.userInfo.currentPageId,
    //     currentOrgId: state.userInfo.currentOrgId
    // }))
    // console.log(currentPageId, 123123123)
    // const { data } = useGetAllCollectionsQuery(currentOrgId)
    return (
        <View style={{ flex: 1 }}>
            <Drawer.Navigator
                drawerContent={() => <CollectionsList />}
                defaultStatus="open"
            >
                <Drawer.Screen name={"Select a Page"} component={PageHtmlRenderer} />
            </Drawer.Navigator>

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