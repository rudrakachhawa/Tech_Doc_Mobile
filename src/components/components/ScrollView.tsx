import React from 'react';
import { ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';
import useColorScheme from './useColorScheme';

export interface ScrollViewProps extends RNScrollViewProps {
    backgroundColor?: string;
    isPrimary?: boolean;
}

const ScrollView: React.FC<ScrollViewProps> = ({
    backgroundColor,
    style,
    isPrimary = false,
    ...props
}) => {
    const themeColors = useColorScheme();
    return (
        <RNScrollView
            style={[
                {
                    backgroundColor: backgroundColor || (isPrimary ? themeColors.primary : themeColors.secondary),
                    padding:16
                },
                style,
            ]}
            {...props}
        />
    );
};

export default ScrollView;
