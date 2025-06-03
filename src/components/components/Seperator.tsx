import React from 'react';
import { View, ViewProps } from 'react-native';
import useColorScheme from './useColorScheme';

export interface SeparatorProps extends ViewProps {
    vertical?: boolean;
    thickness?: number;
    color?: string;
}

const Separator: React.FC<SeparatorProps> = ({
    vertical = false,
    thickness = 1,
    color,
    style,
    ...props
}) => {
    const themeColors = useColorScheme();

    return (
        <View
            style={[
                {
                    backgroundColor:'gray' ,
                    height: 1,
                    width: "100%"
                },
                style,
            ]}
            {...props}
        />
    );
};

export default Separator;
