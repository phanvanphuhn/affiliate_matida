import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlexAlignType,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppTextUrl} from './AppTextUrl';

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
  alignItems?: FlexAlignType | undefined;
  heightMax?: number;
  numberOfLines?: number;
};

export const ViewTextSeeMore = ({
  text,
  style,
  alignItems = 'flex-end',
  heightMax = 31,
  numberOfLines = 2,
}: Props) => {
  const [heightText, setHeightText] = useState<number>(0);
  const [showMore, setShowMore] = useState<boolean>(false);
  const {t} = useTranslation();

  const handleLayout = (event: LayoutChangeEvent) => {
    const layoutItem: number = event?.nativeEvent?.layout?.height || 0;
    setHeightText(layoutItem);
  };
  return (
    <>
      <View style={{paddingTop: scaler(8)}}>
        {/* <Text
          style={[
            style,
            {
              position: 'absolute',
              top: scaler(8),
              opacity: 0,
              zIndex: -1,
            },
          ]}
          onLayout={handleLayout}>
          {text}
        </Text> */}
        <AppTextUrl
          style={[style]}
          color={colors.primary}
          numberOfLines={showMore ? undefined : numberOfLines}
          ellipsizeMode="tail">
          {text}
        </AppTextUrl>
      </View>

      <View style={{alignItems: alignItems}}>
        {heightText >= heightMax ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setShowMore(!showMore);
            }}>
            <Text style={styles.txtViewMore}>
              {showMore === true
                ? t('allRoomMetting.compact')
                : t('allRoomMetting.view_more')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  txtViewMore: {
    color: colors.primary,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(5),
  },
});
