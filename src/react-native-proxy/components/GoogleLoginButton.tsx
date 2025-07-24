import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'
import { FeatureApis } from '../apis/featureApis';
import { configureGoogleSignIn } from '../services/providers/googleAuth';
import { login } from '../services/authService';
import { GoogleFeatureType } from '../types/features';

interface PropsType {
    referenceId: string,
    onLoginSuccess: (result: any) => void;
    onLoginFailure: (error: any) => void;
    buttonText?: string;
    buttonStyle?: object;
    textStyle?: object;
    loadingColor?: string;
    disabled?: boolean;
    config?: any;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    feature: GoogleFeatureType
}

const GOOGLE_LOGO = 'https://developers.google.com/identity/images/g-logo.png';

export default function GoogleLoginButton(props: PropsType) {
    const { loading, disabled, feature, config, setLoading, onLoginSuccess, onLoginFailure, buttonStyle, loadingColor, textStyle, buttonText } = props
    const handleLogin = async () => {
        if (loading || disabled) return;
        try {
            const webClientId = feature?.urlLink?.split('client_id=')[1]?.split('&')[0];
            const state = feature?.urlLink?.split('state=')[1]?.split('&')[0];
            const iosClientId = feature?.ios_client_id
            const googleConfig = Platform.OS === 'ios' ? { iosClientId } : { webClientId, offlineAccess: true }
            configureGoogleSignIn(googleConfig);
            setLoading(true);
            const googleLoginResult: any = await login('google');
            const proxyResponse = await FeatureApis.getProxyAuthTokenForGoogleAuth(state, googleLoginResult.accessToken)
            onLoginSuccess && onLoginSuccess(proxyResponse);
        } catch (error: any) {
            console.error('Google login failed:', error);
            onLoginFailure && onLoginFailure(error);
        } finally {
            setLoading(false);
        }
    };
    return <TouchableOpacity
        style={[styles.button, buttonStyle, disabled && styles.disabled]}
        onPress={handleLogin}
        disabled={disabled || loading}
    >
        {loading ? (
            <ActivityIndicator color={loadingColor} />
        ) : (
            <View style={styles.buttonContent}>
                <Image source={{ uri: GOOGLE_LOGO }} style={styles.logo} />
                <Text style={[styles.text, textStyle]}>{buttonText}</Text>
            </View>

        )}
    </TouchableOpacity>
}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.7,
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    text: {
        color: '#757575',
        fontSize: 16,
        fontWeight: '600',
    },
});