import { StyleSheet } from 'react-native';
import { stylesCommon, scaler, colors } from '@stylesCommon';

export const stylesScreen = StyleSheet.create({
    body: {
        alignItems: 'center'
    },
    icon: {
        marginBottom: scaler(40),
        width: scaler(160),
        height: scaler(160),
        borderRadius: scaler(80),
        borderWidth: scaler(3),
        borderColor: '#FFFFFF',
    },
    text: {
        ...stylesCommon.fontWeight500,
        fontSize: scaler(24),
        color: colors.white,
        lineHeight: scaler(36),
        letterSpacing: scaler(-0.5),
        textAlign: 'center'
    },
    button: {
        marginTop: scaler(80)
    }
})