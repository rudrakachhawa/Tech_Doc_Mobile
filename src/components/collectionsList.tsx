import React from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetAllCollectionsQuery } from '../redux/services/apis/collectionsApi';
import { setUserInfo } from '../redux/features/userInfo/userInfoSlice';
import { List } from 'react-native-paper';

function CollectionsList() {
    const currentOrgId = useAppSelector((state) => state.userInfo.currentOrgId)
    const { data, error, isLoading } = useGetAllCollectionsQuery(currentOrgId);
    const dispatch = useAppDispatch()
    const switchOrg = () => {
        dispatch(setUserInfo({ currentOrgId: null }))
    }

    const renderNestedAccordions = (pageId: string, level: number = 0) => {
        const backgroundColor = level % 2 === 0 ? '#f0f8ff' : '#e6f2ff'; // Smooth and calm alternating colors
        const hasChildren = data?.steps[pageId]?.length > 0;
        return <List.Accordion
            title={<Text style={{ fontWeight: 'bold', color: '#000000' }}>{data?.pagesJson[pageId]?.name}</Text>}
            id={data?.pagesJson[pageId].id}
            style={{ marginLeft: level * 10, backgroundColor, borderLeftWidth: 2, borderLeftColor: '#4682b4', paddingVertical: 4 }} // Indentation, background color, and calm border color

        >
            <List.AccordionGroup>
                {hasChildren ? data?.steps[pageId]?.map((childPageId: string) => {
                    return renderNestedAccordions(childPageId, level + 1);
                }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No Sub Pages Present</Text>
                </View>
                }
            </List.AccordionGroup>
        </List.Accordion>
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <List.AccordionGroup>
                    {
                        data?.steps?.root?.map((collectionId: string) => {
                            const hasChildren = data?.steps[collectionId]?.length > 0;
                            return <List.Accordion
                                title={<Text style={{ fontWeight: 'bold', color: '#000000' }}>{data?.collectionJson[collectionId].name}</Text>}
                                id={data?.collectionJson[collectionId].id}
                                style={{ backgroundColor: '#f0f8ff', borderBottomWidth: 1, borderBottomColor: '#b0c4de', paddingVertical: 4 }} // Smooth base color and border for root level
                            >
                                <List.AccordionGroup>
                                    {hasChildren ? data?.steps[collectionId]?.map((parentPageId: string) => {
                                        return renderNestedAccordions(parentPageId, 1);
                                    }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>No Pages Present</Text>
                                    </View>}
                                </List.AccordionGroup>
                            </List.Accordion>
                        })
                    }
                </List.AccordionGroup>
            </ScrollView>
            <Button title='Change ORG' onPress={switchOrg}></Button>
        </View>
    )
}
export default CollectionsList