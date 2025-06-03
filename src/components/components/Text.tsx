import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/style';
import useColorScheme from './useColorScheme';

export type TextVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button';

export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    color?: string;
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

const Text: React.FC<TextProps> = ({
    variant = 'body1',
    color,
    align,
    weight,
    style,
    ...props
}) => {
    const themeColors = useColorScheme();

    const getVariantStyle = () => {
        switch (variant) {
            case 'h1':
                return styles.h1;
            case 'h2':
                return styles.h2;
            case 'h3':
                return styles.h3;
            case 'h4':
                return styles.h4;
            case 'body1':
                return styles.body1;
            case 'body2':
                return styles.body2;
            case 'caption':
                return styles.caption;
            case 'button':
                return styles.button;
            default:
                return styles.body1;
        }
    };

    return (
        <RNText
            style={[
                getVariantStyle(),
                {
                    color: color || themeColors.lightPrimary,
                    textAlign: align,
                    fontWeight: weight,
                    backgroundColor: 'none'
                },
                style,
            ]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        lineHeight: 40,
    },
    h2: {
        fontSize: 24,
        lineHeight: 32,
    },
    h3: {
        fontSize: 20,
        lineHeight: 28,
    },
    h4: {
        fontSize: 18,
        lineHeight: 24,
    },
    body1: {
        fontSize: 16,
        lineHeight: 24,
    },
    body2: {
        fontSize: 14,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
    },
    button: {
        fontSize: 14,
        lineHeight: 20,
        textTransform: 'uppercase',
    },
});

export default Text;



