import React from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import { useAppSelector } from '../hooks/hooks'
import { useGetPageHtmlQuery } from '../redux/services/apis/pagesApi'
import { Text } from 'react-native'
import RenderHTML from 'react-native-render-html'

function PageHtmlRenderer() {
    const currentPageId = useAppSelector((state) => state.userInfo.currentPageId)
    const { data, error, isLoading } = useGetPageHtmlQuery(currentPageId)
    const { width } = useWindowDimensions();
    console.log(data?.html?.length)
    console.log(error, isLoading)
    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#4682b4' }}>Loading...</Text>
                </View>
            ) : error ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#ff0000' }}>
                        We encountered an issue. Please restart the app and try again.
                    </Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1, padding: 16 }}>
                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html: data?.html || ""
                        }}
                    />
                </ScrollView>
            )}
        </View>
    );
}

export default PageHtmlRenderer