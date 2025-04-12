import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { setUserInfo } from '../redux/features/userInfo/userInfoSlice';

function CollectionsList() {
    const { currentOrgId, currentOrgData } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
        currentOrgData: state.userInfo.currentOrgData,
    }));
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetAllCollectionsQuery(currentOrgId);

    // Track currently expanded accordions
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const switchOrg = useCallback(() => {
        dispatch(setUserInfo({ currentOrgId: null }));
    }, [dispatch]);

    const setSelectedPage = useCallback(
        (pageId: string) => {
            if (pageId) {
                dispatch(setUserInfo({ currentPageId: pageId }));
            }
        },
        [dispatch]
    );

    /**
     * Recursively gathers all the descendant IDs (including the given one)
     * for an accordion, so we can close them if the parent closes.
     */
    const getAllDescendants = useCallback(
        (id: string): string[] => {
            const directChildren = data?.steps?.[id] ?? [];
            // Recursively get each child's descendants
            const subChildren = directChildren.flatMap((childId: string) =>
                getAllDescendants(childId)
            );
            return [id, ...subChildren];
        },
        [data]
    );

    /**
     * Handle manual open/close of accordions.
     * When closing, ensure we also remove all children from `expandedIds`.
     */
    const handleAccordionPress = useCallback(
        (id: string, isNested: boolean = false) => {
            setExpandedIds((prev) => {
                if (prev.includes(id)) {
                    // It's currently expanded — so we'll close this and its descendants
                    const toClose = getAllDescendants(id);
                    return prev.filter((item) => !toClose.includes(item));
                } else {
                    // It's currently closed — open it
                    if (isNested) {
                        setSelectedPage(id);
                    }
                    return [...prev, id];
                }
            });
        },
        [getAllDescendants, setSelectedPage]
    );

    /**
     * Renders nested accordions, each controlling its own expansion state
     * via the `expandedIds` array.
     */
    const renderNestedAccordions = useCallback(
        (pageId: string, level: number = 0) => {
            const backgroundColor = level % 2 === 0 ? '#f0f8ff' : '#e6f2ff';
            const hasChildren = data?.steps?.[pageId]?.length > 0;

            return (
                <List.Accordion
                    key={pageId}
                    title={
                        <TouchableOpacity onPress={() => setSelectedPage(pageId)}>
                            <Text style={{ color: '#000000' }}>
                                {data?.pagesJson[pageId]?.name}
                            </Text>
                        </TouchableOpacity>
                    }
                    expanded={expandedIds.includes(pageId)}
                    onPress={() => handleAccordionPress(pageId, true)}
                    style={{
                        marginLeft: level * 15,
                        backgroundColor,
                        borderLeftWidth: 2,
                        borderLeftColor: '#4682b4',
                        paddingVertical: 4,
                    }}
                >
                    {hasChildren ? (
                        data?.steps[pageId]?.map((childPageId: string) =>
                            renderNestedAccordions(childPageId, level + 1)
                        )
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}
                        >
                            <Text style={{ fontSize: 16, color: '#808080' }}>
                                No Sub Pages Present
                            </Text>
                        </View>
                    )}
                </List.Accordion>
            );
        },
        [data, expandedIds, handleAccordionPress, setSelectedPage]
    );

    const rootAccordions = useMemo(() => {
        return data?.steps?.root?.map((collectionId: string) => {
            const hasChildren = data?.steps[collectionId]?.length > 0;
            return (
                <List.Accordion
                    key={collectionId}
                    title={
                        <Text style={{ color: '#000000' }}>
                            {data?.collectionJson[collectionId].name}
                        </Text>
                    }
                    expanded={expandedIds.includes(collectionId)}
                    onPress={() => handleAccordionPress(collectionId)}
                    style={{
                        backgroundColor: '#f0f8ff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#b0c4de',
                        paddingVertical: 4,
                    }}
                >
                    {hasChildren ? (
                        data?.steps[collectionId].map((parentPageId: string) =>
                            renderNestedAccordions(parentPageId, 1)
                        )
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}
                        >
                            <Text style={{ fontSize: 16, color: '#808080' }}>
                                No Pages Present
                            </Text>
                        </View>
                    )}
                </List.Accordion>
            );
        });
    }, [data, expandedIds, handleAccordionPress, renderNestedAccordions]);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#4682b4' }}>Loading...</Text>
                </View>
            ) : error ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#ff0000' }}>
                        We encountered an issue. Please restart the app and try again.
                    </Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                        <TouchableOpacity
                            onPress={switchOrg}
                            style={{
                                width: 37,
                                height: 37,
                                borderRadius: 10,
                                backgroundColor: '#4682b4',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 8,
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                            >
                                {currentOrgData?.name
                                    ? currentOrgData.name
                                        .split(' ')
                                        .map((word: string) => word[0])
                                        .join('')
                                        .toUpperCase()
                                    : ''}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
                            {currentOrgData?.name}
                        </Text>
                    </View>
                    {rootAccordions}
                </ScrollView>
            )}
        </View>
    );
}

export default CollectionsList;
