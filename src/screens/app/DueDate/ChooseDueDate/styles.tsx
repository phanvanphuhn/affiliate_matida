import { StyleSheet } from 'react-native';
import { stylesCommon, scaler, colors } from '@stylesCommon';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: scaler(16)
    },
    body: {
        flex: 1,
        paddingTop: scaler(47),
    },
    text: {
        color: colors.white,
        fontSize: scaler(14),
        ...stylesCommon.fontWeight400,
        lineHeight: scaler(21),
    },
    textTitle: {
        ...stylesCommon.fontWeight500,
        fontSize: scaler(32),
        lineHeight: scaler(48),
        marginBottom: scaler(12)
    },
    textLink: {
        lineHeight: scaler(17),
        textDecorationLine: 'underline'
    },
    button: {
        backgroundColor: colors.white,
        marginTop: scaler(24)
    },
    textButton: {
        color: colors.brandMainPinkRed,
    }
})