import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import {
    DeviceEventEmitter,
    RefreshControl,
    useWindowDimensions,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import RenderHtml from 'react-native-render-html';
import { useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { useGetPageHtmlQuery } from '../redux/services/apis/pagesApi';
import { RootStackParamList } from '../types/navigators/navigationTypes';
import View from './components/View';
import Text from './components/Text';
import TouchableOpacity from './components/TouchableOpacity';
import ScrollView from './components/ScrollView';

type Props = NativeStackScreenProps<RootStackParamList, 'PageDetail'>;

function PageHtmlRenderer({ route, navigation }: Props) {
    const { pageId } = route.params;
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));

    const { data: pageHtmlData, error, isLoading, isFetching, refetch } = useGetPageHtmlQuery(pageId);
    const { width } = useWindowDimensions();
    const { data: pageData } = useGetAllCollectionsQuery(currentOrgId);
    const pageName = pageData?.pagesJson?.[pageId]?.name || 'No page selected';
    const subPages: string[] = pageData?.steps?.[pageId] || [];

    useLayoutEffect(() => {
        navigation.setOptions({
            title: pageName
        });
    }, [navigation]);

    useEffect(() => {
        DeviceEventEmitter.emit('SendDataToChatbot', {
            type: 'SendDataToChatbot',
            data: {
                variables: {
                    orgId: currentOrgId,
                    pageId: pageId,
                    pageName: pageName,
                    allPages: Object.values(pageData?.pagesJson || {})?.map((item) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                }
            }
        });

        return () => {
            DeviceEventEmitter.emit('SendDataToChatbot', {
                type: 'SendDataToChatbot',
                data: {
                    variables: {
                        orgId: currentOrgId,
                        pageId: null,
                        pageName: null,
                        allPages: []
                    }
                }
            });
        };
    }, [currentOrgId, pageId, pageName]);
console.log(12345678,pageHtmlData?.html);

    return (
        <View isPrimary style={{ flex: 1 }}>
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
                <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
                    {pageHtmlData?.html?.trim() && <View style={{ backgroundColor: 'white' }}>
                        <HTMLView
                            value={pageHtmlData?.html || ''}
                        />
                    </View>}
                    <Text>GG</Text>
                    {pageHtmlData?.html?.trim() && <View>
                        <RenderHtml
                            source={{html:pageHtmlData?.html || ''}}
                            contentWidth={width}
                        />
                    </View>}
                    {subPages.length > 0 && (
                        <View style={{ marginTop: 20, marginBottom: 100 }}>
                            <Text>Sub Pages :</Text>
                            <View >
                                {subPages.map((subPageId: string, index: number) => (
                                    <TouchableOpacity
                                        key={index + subPageId}
                                        onPress={() => navigation.push('PageDetail', { pageId: subPageId })}
                                    >
                                        <Text>{pageData?.pagesJson?.[subPageId]?.name || 'Untitled'}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

export default PageHtmlRenderer;
