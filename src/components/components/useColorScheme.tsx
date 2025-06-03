// import { useColorScheme as useCustomColorScheme } from 'react-native';
// export default function useColorScheme() {
//   const systemColorScheme = useCustomColorScheme();
//   const colorScheme = systemColorScheme || 'light';
//   return colorScheme
// };

import { COLORS } from "../../utils/style"

export default function useColorScheme() {
    return COLORS['light']
};