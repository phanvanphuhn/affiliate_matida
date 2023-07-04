import { EPaymentType } from "@constant";
import { DefaultTFuncReturn } from "i18next";
import { StyleProp, ViewStyle } from "react-native";

type PayIntent = {
    price: string | number;
    type: EPaymentType;
    id: any
    onCallBack?: () => void;
    isPay?: boolean
}

type ModalPayment = {
    onPressCancel: () => void;
    onPressYes: () => void;
}

type ViewLock = {
    borderRadius?: number | undefined;
    opacity?: string | undefined;
    style?: StyleProp<ViewStyle>;
    icon?: Element;
    showText?: boolean;
    absolute?: boolean;
    styleLock?: StyleProp<ViewStyle>;
    stylePrice?: StyleProp<ViewStyle>
}

type ViewPrice = {
    onPress?: () => void;
    endingText?: string | DefaultTFuncReturn;
    button?: boolean
}

type ViewPayment = {
    flex?: boolean;
}

export type ModalConfirmPayProps = PayIntent
export type ViewConfirmPayProps =  ModalPayment & Omit<PayIntent, 'id'>
export type ViewLockProps = ViewLock
export type ViewPriceProps = ViewPrice & Pick<ViewLock, "style"> & Pick<PayIntent, "price">
export type ViewLockPaymentProps = Omit<ViewLock, 'showText'| 'absolute'> & Pick<PayIntent, "price">
export type ViewPaymentProps = ViewPayment & PayIntent
export type ViewNotSupportPayProps = Pick<ModalPayment, 'onPressCancel'>