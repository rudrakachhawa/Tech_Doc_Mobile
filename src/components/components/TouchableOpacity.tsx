import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import useColorScheme from './useColorScheme';

interface CustomTouchableOpacityProps extends TouchableOpacityProps {
    border?: boolean;
    borderColor?: string;
    borderWidth?: number;
    isPrimary?: boolean
    showBorder?:boolean
}

const TouchableOpacity: React.FC<CustomTouchableOpacityProps> = ({
    children,
    style,
    showBorder = true,
    borderColor,
    borderWidth = 1,
    isPrimary = false,
    ...props
}) => {
    const themeColors = useColorScheme();
    const customStyle = StyleSheet.create({
        container: {
            borderWidth: showBorder ? borderWidth || 2 : 0,
            borderColor: borderColor || themeColors.border,
            backgroundColor: isPrimary ? themeColors.primary :themeColors.secondary,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
        },
    });

    return (
        <RNTouchableOpacity
            style={[customStyle.container, style]}
            {...props}
        >
            {children}
        </RNTouchableOpacity>
    );
};

export default TouchableOpacity;
