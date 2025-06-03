import React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useAppDispatch } from '../hooks/hooks';
import { setUserInfo } from '../redux/features/userInfo/userInfoSlice';
import { useGetUserQuery, useSwitchWorkspaceMutation } from '../redux/services/apis/userApi';
import View from '../components/components/View';
import Text from '../components/components/Text';
import TouchableOpacity from '../components/components/TouchableOpacity';
import FlatList from '../components/components/FlatList';

export default function AllWorkspace() {
    const dispatch = useAppDispatch();
    const { data, isLoading, isFetching, refetch } = useGetUserQuery();
    const [switchWorkspace] = useSwitchWorkspaceMutation();

    const handleOrgSelect = (org: any) => {
        dispatch(setUserInfo({ currentOrgId: org?.id, currentOrgData: org }));
        switchWorkspace(org.id);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={data?.orgs || []}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOrgSelect(item)}>
                    <Text style={styles.orgName}>{item.name}</Text>
                </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No workspaces found.</Text>}
        />
    );
}



const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orgName: {
        fontSize: 18,
    },
    orgId: {
        marginTop: 4,
        fontSize: 12,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    }
});