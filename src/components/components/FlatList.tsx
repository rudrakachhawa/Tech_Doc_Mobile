import React from 'react';
import { FlatList as RNFlatList, FlatListProps as RNFlatListProps, StyleSheet } from 'react-native';
import useColorScheme from './useColorScheme';

export interface FlatListProps<T> extends RNFlatListProps<T> {
    backgroundColor?: string;
    isPrimary?: boolean;
}

const FlatList = <T extends any>({
    backgroundColor,
    style,
    isPrimary = false,
    ...props
}: FlatListProps<T>) => {
    const themeColors = useColorScheme();

    return (
        <RNFlatList
            style={[
                {
                    backgroundColor: backgroundColor || themeColors.primary,
                    paddingHorizontal: 16
                },
                style,
            ]}
            {...props}
        />
    );
};

export default FlatList;
