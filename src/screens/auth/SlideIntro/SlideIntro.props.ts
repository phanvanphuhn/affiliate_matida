import { Animated, ImageSourcePropType } from "react-native";

export type PaginationSlideProps = {
    size: number;
  scrollX: Animated.Value,
}

export type IFile = {
    id: number;
    source: ImageSourcePropType
    title: string
    textBody: string
}

export type ItemSlideIntroProps = {
    item: IFile
} 