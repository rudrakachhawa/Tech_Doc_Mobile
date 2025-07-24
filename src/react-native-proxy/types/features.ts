type AllFeaturesType = (featureType | GoogleFeatureType)[]

interface featureType {
    id: string,
    urlLink: string,
    text: string
}

interface GoogleFeatureType extends featureType {
    ios_client_id?: string
}

export type {
    AllFeaturesType,
    featureType,
    GoogleFeatureType
}