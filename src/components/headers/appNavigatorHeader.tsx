import { useCallback } from "react";
import { useAppSelector } from "../../hooks/hooks";
import Text from "../components/Text";
import TouchableOpacity from "../components/TouchableOpacity";
import View from "../components/View";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/features/userInfo/userInfoSlice";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "../components/MaterialIcons";

export default function AppNavigatorHeader(props: any) {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const { currentOrgData } = useAppSelector((state) => ({
        currentOrgData: state.userInfo.currentOrgData,
    }));
    const switchOrg = useCallback(() => {
        dispatch(setUserInfo({ currentOrgId: null }));
    }, [dispatch]);
    function headersToShow() {
        if (props.children === 'MyCollections') {
            return <TouchableOpacity onPress={switchOrg} isPrimary showBorder={false} style={{ padding: 0, marginTop: 16, flex: 1, flexDirection: 'row', alignContent: 'center' }}>
                <Text variant="h3">{currentOrgData?.name}</Text>
            </TouchableOpacity>
        }
        return <TouchableOpacity showBorder={false} isPrimary
            style={{ marginBottom: 0, padding: 0, flex: 1, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
        >
            <MaterialIcons name="arrow-back" size={24} />
            <Text variant='h3' style={{ fontWeight: 500 , marginLeft:10 }}>{props.children}</Text>
        </TouchableOpacity>
    }
    return headersToShow()
}