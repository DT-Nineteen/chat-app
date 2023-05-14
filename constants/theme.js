import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: '#002DE3',
    secondary: '#0F1828',
    white: '#FFFFFF',
    secondaryWhite: '#F7F7FC',
    tertiaryWhite: '#fafafa',
    green: '#2CC069',
    black: '#000000',
    secondaryBlack: '#0F1828',
    gray: '#CCCCCC',
    secondaryGray: '#808080',
}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 14,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
