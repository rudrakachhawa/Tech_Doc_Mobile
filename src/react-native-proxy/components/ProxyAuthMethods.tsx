import React, { useEffect, useState } from 'react';
import {
    View
} from 'react-native';
import { FeatureApis } from '../apis/featureApis';
import GoogleLoginButton from './GoogleLoginButton';
import AppleLoginButton from './AppleLoginButton';
import { GoogleFeatureType } from '../types/features';

const ProxyAuth = ({
    referenceId,
    onLoginSuccess,
    onLoginFailure,
    buttonText = 'Sign in with Google',
    buttonStyle,
    textStyle,
    loadingColor = '#4285F4',
    disabled = false,
}: {
    referenceId: string,
    onLoginSuccess: (result: any) => void;
    onLoginFailure: (error: any) => void;
    buttonText?: string;
    buttonStyle?: object;
    textStyle?: object;
    loadingColor?: string;
    disabled?: boolean;
}) => {
    const [loading, setLoading] = React.useState(false);
    const [featuresList, setFeaturesList] = useState([])

    useEffect(() => {
        if (referenceId) {
            async function getFeatures() {
                const data = await FeatureApis.getFeatureList(referenceId)
                setFeaturesList(data)
                console.log(data)
            }
            getFeatures()
        }
    }, [referenceId])


    return (
        <View style={{
            gap: 10
        }}>
            {featuresList?.length && featuresList?.map((feature: GoogleFeatureType, index: number) => {
                const props = {
                    referenceId,
                    onLoginSuccess,
                    onLoginFailure,
                    buttonText,
                    buttonStyle,
                    textStyle,
                    loadingColor,
                    disabled,
                    loading,
                    setLoading, 
                    feature
                }
                switch (feature?.text) {
                    case 'Continue with Google':
                        return <GoogleLoginButton key={`google-${index}`} {...props} />

                    case 'Continue with Apple':
                        return <AppleLoginButton key={`apple-${index}`} {...props} />
                    default:
                        return null
                }
            })}
        </View>
    );
};



export default ProxyAuth;
