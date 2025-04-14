import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { setUserInfo } from '../redux/features/userInfo/userInfoSlice';
import { useNavigation } from '@react-navigation/native';

function CollectionsList() {
    const { currentOrgData, currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
        currentOrgData: state.userInfo.currentOrgData,
    }));
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { data, error, isLoading } = useGetAllCollectionsQuery(currentOrgId);

    const switchOrg = useCallback(() => {
        dispatch(setUserInfo({ currentOrgId: null }));
    }, [dispatch]);

    const navigateToPageDetails = useCallback(
        (pageId: string) => {
            if (pageId) {
                navigation.navigate('PageDetail', { pageId });
            }
        },
        [dispatch, navigation]
    );

    const renderLoading = () => (
        <View style={styles.centeredContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );

    const renderError = () => (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
                We encountered an issue. Please restart the app and try again.
            </Text>
        </View>
    );

    const renderOrgHeader = () => (
        <View style={styles.orgHeader}>
            <TouchableOpacity onPress={switchOrg} style={styles.orgButton}>
                <Text style={styles.orgButtonText}>
                    {currentOrgData?.name
                        ?.split(' ')
                        .map((word: string) => word[0])
                        .join('')
                        .toUpperCase()}
                </Text>
            </TouchableOpacity>
            <Text style={styles.orgNameText}>{currentOrgData?.name}</Text>
        </View>
    );

    const renderCollections = () => (
        <ScrollView style={{ flex: 1 }}>
            {renderOrgHeader()}
            {data?.steps?.root?.map((collectionId: string) => {
                const collection = data?.collectionJson[collectionId];
                const childPages = data?.steps[collectionId] ?? [];

                return (
                    <View key={collectionId}>
                        <List.Accordion
                            title={<Text style={styles.collectionTitle}>{collection.name}</Text>}
                            style={styles.accordionStyle}
                        >
                            {childPages.length > 0 ? (
                                childPages.map((pageId: string) => (
                                    <List.Item
                                        key={pageId}
                                        title={<Text style={styles.pageTitle}>{data?.pagesJson[pageId]?.name}</Text>}
                                        onPress={() => navigateToPageDetails(pageId)}
                                        style={styles.pageItemStyle}
                                    />
                                ))
                            ) : (
                                <View style={styles.noPagesContainer}>
                                    <Text style={styles.noPagesText}>No Pages Present</Text>
                                </View>
                            )}
                        </List.Accordion>
                    </View>
                );
            })}
        </ScrollView>
    );

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? renderLoading() : error ? renderError() : renderCollections()}
        </View>
    );
}

const styles = {
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#d9534f',
    },
    orgHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    orgButton: {
        width: 37,
        height: 37,
        borderRadius: 10,
        backgroundColor: '#007acc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    orgButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    orgNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    collectionTitle: {
        fontSize: 16,
        color: '#333',
    },
    accordionStyle: {
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 8,
    },
    pageTitle: {
        fontSize: 16,
        color: '#333',
    },
    pageItemStyle: {
        marginLeft: 20,
        backgroundColor: '#ffffff',
        borderLeftWidth: 2.5,
        borderLeftColor: '#007acc',
        paddingVertical: 10,
    },
    noPagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    noPagesText: {
        fontSize: 16,
        color: '#999',
    },
};

export default CollectionsList;
