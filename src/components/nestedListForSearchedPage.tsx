import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "./components/MaterialIcons";
import Text from "./components/Text";
import TouchableOpacity from "./components/TouchableOpacity";
import View from "./components/View";

export default function NestedListForSearchedPage({ items, space = "",onClose }: { space: string, items: any[] ,onClose:any}) {
    const navigation = useNavigation()
    function onPress(id: string) {
        navigation.navigate('PageDetail', { pageId: id });
        onClose()
    }

    return items.map(item => {
        return <View>
            <TouchableOpacity onPress={() => { onPress(item.id) }} style={{ display: 'flex', flexDirection: 'row', padding: 0, margin: 0 }} showBorder={false}>
                <Text>{space}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={28} color="#333" />
                <Text>{item.name}</Text>
            </TouchableOpacity>
            <NestedListForSearchedPage items={item.children} space={space + "    "} onClose={onClose} />
        </View>
    })
}