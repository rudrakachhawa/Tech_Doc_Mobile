import React, { useCallback, useEffect } from 'react';
import {  StyleSheet, RefreshControl, DeviceEventEmitter } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { useNavigation } from '@react-navigation/native';
import View from '../components/components/View';
import Text from '../components/components/Text';
import FlatList from '../components/components/FlatList';
import TouchableOpacity from '../components/components/TouchableOpacity';

function AllCollections() {
    const { currentOrgData, currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
        currentOrgData: state.userInfo.currentOrgData,
    }));
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { data, error, isLoading, isFetching, refetch } = useGetAllCollectionsQuery(currentOrgId);

    useEffect(() => {
        DeviceEventEmitter.emit('SendDataToChatbot', {
            type: 'SendDataToChatbot',
            data: {
                variables: {
                    orgId: currentOrgId,
                    allCollections: Object.values(data?.collectionJson || {})?.map((item) => {
                        return {
                            id: item?.id,
                            name: item?.name
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
                        allCollections: []
                    }
                }
            });
        };
    }, [currentOrgId]);

    const navigateToAllPages = useCallback(
        (collectionId: string) => {
            if (collectionId) {
                navigation.navigate('PageList', { collectionId });
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

    const renderCollections = () => {
        const collections = data?.steps?.root?.map((collectionId: string) => ({
            id: collectionId,
            ...data?.collectionJson[collectionId],
        })) || [];
    
        return (
                <FlatList
                    data={collections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigateToAllPages(item.id)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={
                        <View isPrimary style={{paddingVertical:10}}><Text>Collections</Text></View>
                    }
                    ListEmptyComponent={<Text>No collections found.</Text>}
                    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
                />
        );
    };
    


    return (
        <View style={{ flex: 1 }}>
            {isLoading ? renderLoading() : error ? renderError() : renderCollections()}
        </View>
    );
}

const styles = StyleSheet.create({
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
        paddingBottom: 10,
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
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    listContentContainer: {
        padding: 16,
    },

});

export default AllCollections;
