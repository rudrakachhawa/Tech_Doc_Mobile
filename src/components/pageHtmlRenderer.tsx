import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import {
    DeviceEventEmitter,
    RefreshControl,
    ScrollView,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { useGetPageHtmlQuery } from '../redux/services/apis/pagesApi';
import { RootStackParamList } from '../types/navigators/navigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'PageDetail'>;

function PageHtmlRenderer({ route, navigation }: Props) {
    const { pageId } = route.params;
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));

    const { data: pageHtmlData, error, isLoading, isFetching, refetch } = useGetPageHtmlQuery(pageId);
    const { data: pageData } = useGetAllCollectionsQuery(currentOrgId);
    const { width } = useWindowDimensions();
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

    return (
        <View style={{ flex: 1, paddingBottom: 80 }}>
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
                <ScrollView style={{ flex: 1, padding: 16 }} refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
                    <HTMLView
                        value={pageHtmlData?.html || ''}
                    />
                    {subPages.length > 0 && (
                        <View style={{ marginTop: 20, marginBottom: 100 }}>
                            <Text style={{ fontSize: 20, color: '#333', fontWeight: 'bold', marginBottom: 8 }}>Sub Pages :</Text>
                            <View style={{ paddingLeft: 16 }}>
                                {subPages.map((subPageId: string, index: number) => (
                                    <Text
                                        key={subPageId}
                                        style={{ fontSize: 16, color: '#0000ff', marginBottom: 4, marginRight: 8, textDecorationLine: 'underline' }}
                                        onPress={() => navigation.push('PageDetail', { pageId: subPageId })}
                                    >
                                        {index + 1}. {pageData?.pagesJson?.[subPageId]?.name || 'Untitled'}
                                        {index < subPages.length - 1 ? ',' : ''}
                                    </Text>
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
