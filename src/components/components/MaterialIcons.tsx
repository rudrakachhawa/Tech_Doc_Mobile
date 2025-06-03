import React from 'react';
import MaterialIconsBase from 'react-native-vector-icons/MaterialIcons';
import { StyleProp, ViewStyle } from 'react-native';
import useColorScheme from './useColorScheme';

interface MaterialIconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const MaterialIcons: React.FC<MaterialIconsProps> = ({
    name,
    size = 24,
    color = '#000',
    style,
    ...props
}) => {
    const themeColors = useColorScheme();
    return (
        <MaterialIconsBase
            name={name}
            size={size}
            color={themeColors.lightPrimary}
            style={style}
            {...props}
        />
    );
};

export default MaterialIcons;
