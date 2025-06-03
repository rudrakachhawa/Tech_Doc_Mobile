import React from 'react';
import { View as RNView, ViewProps as RNViewProps, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/style';
import useColorScheme from './useColorScheme';

export interface ViewProps extends RNViewProps {
    backgroundColor?: string;
    isPrimary?: boolean;
}

const View: React.FC<ViewProps> = ({
    backgroundColor,
    style,
    isPrimary = false,
    ...props
}) => {
    const themeColors = useColorScheme();
    return (
        <RNView
            style={[
                {
                    backgroundColor: backgroundColor || (isPrimary ? themeColors.primary : themeColors.secondary),
                },
                style,
            ]}
            {...props}
        />
    );
};

export default View;
