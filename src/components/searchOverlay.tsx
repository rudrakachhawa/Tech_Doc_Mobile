import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { useAppSelector } from '../hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { transformToNestedStructure } from '../utils';
import NestedListForSearchedPage from './nestedListForSearchedPage';
import ScrollView from './components/ScrollView';
import Separator from './components/Seperator';

const { width, height } = Dimensions.get('window');

const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
    const [query, setQuery] = useState('');
    const { currentOrgId } = useAppSelector((state) => ({
        currentOrgId: state.userInfo.currentOrgId,
    }));
    const { data, error, isLoading } = useGetAllCollectionsQuery(currentOrgId);

    const navigation = useNavigation();

    const getAllItems = (keys: string[]): any[] => {
        return keys.reduce((acc: any[], key: string) => {
            const items = data?.steps?.[key] ?? [];
            return [...acc, ...items, ...getAllItems(items)];
        }, []);
    };

    const dataToSearchIn = getAllItems(data?.steps?.root ?? []).map((pageId: string) => data?.pagesJson?.[pageId]);

    const filteredData = dataToSearchIn
        .filter((item) =>
            item?.name?.toLowerCase().includes(query?.toLowerCase())
        );

    return (
        <SafeAreaView style={styles.overlay}>
            <ScrollView style={{padding:0}}>
            {isLoading ? (
                <View style={styles.centeredContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        We encountered an issue. Please restart the app and try again.
                    </Text>
                </View>
            ) : filteredData.length === 0 ? (
                <View style={styles.centeredContainer}>
                    <Text style={styles.errorText}>No Pages found</Text>
                </View>
            ) : (
                <NestedListForSearchedPage onClose={onClose} items={transformToNestedStructure(filteredData, data)} space='' />
            )}
            </ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                    <MaterialIcons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Search Page"
                    placeholderTextColor="#999"
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                />
            </View>
        </SafeAreaView>
    );
};

export default SearchOverlay;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width,
        height,
        zIndex: 10,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginLeft: 8,
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
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    cardTitle: {
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#777',
    },
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
});
