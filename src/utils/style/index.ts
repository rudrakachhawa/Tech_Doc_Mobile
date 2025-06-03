import { Colors } from "./style.type";

const COLORS_LIGHT: Colors = {
    primary: 'white',    // Main background color
    secondary: 'white',  // Text and icons
    border: '#E5E5E5',     // Border and divider lines
    accent: '#007AFF',     // Accent color for buttons and links
    error: '#FF3B30',      // Error states
    success: '#34C759',    // Success states
    warning: '#FF9500',    // Warning states
    info: '#5856D6',       // Info states
    lightPrimary:'black',
    lightSecondary:'gray'
};

const COLORS_DARK: Colors = {
    primary: 'white',    // Main background color
    secondary: 'gray',  // Text and icons
    lightPrimary: 'white',    // Main background color
    lightSecondary: 'gray',  // Text and icons
    border: '#2C2C2C',     // Border and divider lines
    accent: '#0A84FF',     // Accent color for buttons and links
    error: '#FF453A',      // Error states
    success: '#32D74B',    // Success states
    warning: '#FF9F0A',    // Warning states
    info: '#5E5CE6',       // Info states
};

enum COLOR_SCHEME {
    LIGHT = 'light',
    DARK = 'dark',
}

export const COLORS = {
    [COLOR_SCHEME.LIGHT]: COLORS_LIGHT,
    [COLOR_SCHEME.DARK]: COLORS_DARK,
};