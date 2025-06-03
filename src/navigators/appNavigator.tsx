import { createStackNavigator } from '@react-navigation/stack';
import ChatBot from 'chatbot-react-native-sdk';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PageHtmlRenderer from '../components/pageHtmlRenderer';
import SearchOverlay from '../components/searchOverlay';
import { useAppSelector } from '../hooks/hooks';
import AllCollections from '../screens/allCollection';
import AllPages from '../screens/allPages';
import View from '../components/components/View';
import useColorScheme from '../components/components/useColorScheme';
import AppNavigatorHeader from '../components/headers/appNavigatorHeader';
import TouchableOpacity from '../components/components/TouchableOpacity';
import MaterialIcons from '../components/components/MaterialIcons';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [showSearch, setShowSearch] = useState(false);
    const themeColors = useColorScheme();
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));
    return (
        <View isPrimary style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: themeColors.primary,
                    height: 80,
                },
                headerTitle: (props) => (<AppNavigatorHeader {...props} />),
                headerLeft: () => null
            }}>
                <Stack.Screen name="MyCollections" component={AllCollections} />
                <Stack.Screen name="PageList" component={AllPages} />
                <Stack.Screen name="PageDetail" component={PageHtmlRenderer} />
            </Stack.Navigator>

            <ChatBot
                embedToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiI1OTgyIiwiY2hhdGJvdF9pZCI6IjY2NTQ3OWE4YmQ1MDQxYWU5M2ZjZDNjNSIsInVzZXJfaWQiOiJydWRyYWtzaCJ9.u_X4bOonyrCPIEZGJojq9CXxxEkuDdsTPSJ4pcH7oBU"
                threadId={String(currentOrgId)}
                bridgeName="techdoc_internal_chatbot"
                variables={{}}
                openInContainer={false}
                hideIcon={false}
                defaultOpen={false}
                hideCloseButton={false}
            />

            <TouchableOpacity   style={styles.floatingButton}onPress={() => setShowSearch(true)}>
                <MaterialIcons name="search" size={22} />
            </TouchableOpacity>

            {showSearch && (
                <SearchOverlay onClose={() => setShowSearch(false)} />
            )}
        </View>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 5,
        padding:0
    },
});