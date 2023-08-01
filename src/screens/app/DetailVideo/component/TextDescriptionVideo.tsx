import {AppModal, AppTextUrl} from '@component';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
type Props = {
  text: string;
  title: string;
};

const LINE_HEIGHT = 17;
const HEIGHT_HEADER = scaler(50);
const HEIGHT_BOTTOM = getBottomSpace();
const HEIGHT_DEVICE = HEIGHT_BOTTOM > 0 ? 0 : scaler(30);
const HEIGHT_MODAL_MAX =
  10 * LINE_HEIGHT + HEIGHT_HEADER + HEIGHT_BOTTOM + HEIGHT_DEVICE;
const HEIGHT_MODAL_MIN =
  4 * LINE_HEIGHT + HEIGHT_HEADER + HEIGHT_BOTTOM + HEIGHT_DEVICE;

export const TextDescriptionVideo = ({text, title}: Props) => {
  const [heightText, setHeightText] = useState<number>(0);

  const {t} = useTranslation();

  const refDes = useRef<any>(null);

  const heightModal = heightText + HEIGHT_HEADER + HEIGHT_BOTTOM;

  const handleLayout = (event: LayoutChangeEvent) => {
    const layoutItem: number = event?.nativeEvent?.layout?.height || 0;
    setHeightText(layoutItem);
  };

  const getHeightModal = () => {
    return heightModal > HEIGHT_MODAL_MAX
      ? HEIGHT_MODAL_MAX
      : heightModal < HEIGHT_MODAL_MIN
      ? HEIGHT_MODAL_MIN
      : heightModal;
  };

  return (
    <>
      <View style={{paddingTop: scaler(8)}}>
        <Text style={styles.textLayout} onLayout={handleLayout}>
          {text}
        </Text>
        <AppTextUrl
          style={styles.text}
          color={colors.primary}
          numberOfLines={2}
          ellipsizeMode="tail">
          {text}
        </AppTextUrl>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        {heightText >= 40 ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => refDes.current?.open()}>
            <Text style={styles.txtViewMore}>
              {t('allRoomMetting.view_more')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <AppModal
        ref={refDes}
        position="bottom"
        modalBackgroundColor={colors.textPlaceHolder}
        modalSize={{
          height: getHeightModal(),
          width: widthScreen,
        }}>
        <View style={styles.containerHeader}>
          <View>
            <View style={{alignSelf: 'center', paddingVertical: scaler(12)}}>
              <View style={styles.headerModal} />
            </View>
            <View
              style={{
                paddingHorizontal: scaler(16),
                paddingBottom: scaler(6),
              }}>
              <Text style={styles.textTitle}>{title}</Text>
            </View>
          </View>
          <View
            style={{
              height:
                getHeightModal() -
                HEIGHT_HEADER -
                HEIGHT_BOTTOM -
                HEIGHT_DEVICE -
                scaler(12),
            }}>
            <ScrollView
              bounces={false}
              contentContainerStyle={{
                paddingHorizontal: scaler(16),
              }}>
              <Text
                style={[
                  styles.text,
                  {color: colors.white, textAlign: 'left', marginTop: 0},
                ]}>
                {text}
              </Text>
            </ScrollView>
          </View>
        </View>
      </AppModal>
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
  text: {
    fontSize: scaler(13),
    marginTop: scaler(5),
    color: colors.borderColor,
  },
  textTitle: {
    color: colors.white,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight700,
    textAlign: 'left',
  },
  headerModal: {
    width: scaler(48),
    height: scaler(4),
    backgroundColor: colors.white,
    borderRadius: scaler(4),
  },
  textLayout: {
    position: 'absolute',
    top: scaler(8),
    opacity: 0,
    zIndex: -1,
  },
  containerHeader: {
    marginBottom: scaler(50),
    borderTopLeftRadius: scaler(16),
    borderTopRightRadius: scaler(16),
  },
});
