import React, { useLayoutEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    useWindowDimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RenderHTML from 'react-native-render-html';
import { useAppSelector } from '../hooks/hooks';
import { useGetPageHtmlQuery } from '../redux/services/apis/pagesApi';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { RootStackParamList } from '../types/navigators/navigationTypes';
import { Menu, IconButton } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'PageDetail'>;

function PageHtmlRenderer({ route, navigation }: Props) {
    const { pageId } = route.params;
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));

    const { data: pageHtmlData, error, isLoading } = useGetPageHtmlQuery(pageId);
    const { data: pageData } = useGetAllCollectionsQuery(currentOrgId);
    const { width } = useWindowDimensions();

    const pageName = pageData?.pagesJson?.[pageId]?.name || 'No page selected';
    const subPages: string[] = pageData?.steps?.[pageId] || [];

    const [menuVisible, setMenuVisible] = useState(false);
    const menuAnchorRef = useRef<View>(null);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: pageName,
            headerRight: () =>
                subPages.length > 0 ? (
                    <View ref={menuAnchorRef}>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={
                                <IconButton
                                    icon="file-document-outline"
                                    onPress={openMenu}
                                    size={24}
                                    iconColor="#333"
                                />
                            }
                            anchorPosition="bottom"
                        >
                            {subPages.map((subPageId: string) => (
                                <Menu.Item
                                    key={subPageId}
                                    onPress={() => {
                                        closeMenu();
                                        if (subPageId !== pageId) {
                                            navigation.push('PageDetail', { pageId: subPageId });
                                        }
                                    }}
                                    title={pageData?.pagesJson?.[subPageId]?.name || 'Untitled'}
                                />
                            ))}
                        </Menu>
                    </View>
                ) : null,
        });
    }, [navigation, menuVisible, pageName, subPages, pageData]);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#4682b4' }}>Loading...</Text>
                </View>
            ) : error ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 18, color: '#ff0000' }}>
                        We encountered an issue. Please restart the app and try again.
                    </Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1, padding: 16 }}>
                    <RenderHTML
                        contentWidth={width}
                        source={{ html: pageHtmlData?.html || '' }}
                    />
                </ScrollView>
            )}
        </View>
    );
}

export default PageHtmlRenderer;
