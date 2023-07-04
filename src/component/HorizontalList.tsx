import {SvgArrowRightContained} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {DefaultTFuncReturn, t} from 'i18next';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
interface IProps {
  icon?: ImageSourcePropType;
  title?: string | DefaultTFuncReturn;
  textSee?: string | DefaultTFuncReturn;
  styleTextSee?: StyleProp<TextStyle>;
  onPressSeeMore?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styleHeader?: StyleProp<ViewStyle>;
  IconSvg?: JSX.Element;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showIconArrow?: boolean;
  length?: number;
  styleScroll?: StyleProp<ViewStyle>;
  loading?: boolean;
}
export const HorizontalList = ({
  icon,
  title,
  textSee = t('home.seeMore'),
  styleTextSee,
  onPressSeeMore,
  children,
  style,
  styleHeader,
  IconSvg,
  contentContainerStyle,
  showIconArrow = false,
  length = 2,
  styleScroll,
  loading = false,
}: IProps) => {
  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.viewHeader, styleHeader]}
        onPress={onPressSeeMore}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {icon && <Image source={icon} />}
          <View style={{alignSelf: 'flex-start'}}>{!!IconSvg && IconSvg}</View>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.textSeeMore, styleTextSee]}>{textSee}</Text>
          {!!showIconArrow && (
            <SvgArrowRightContained style={{marginLeft: scaler(4)}} />
          )}
        </View>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.viewLoadmore}>
          <ActivityIndicator color={colors.primary} size="small" />
        </View>
      ) : (
        <>
          {length === 0 ? (
            <Text style={styles.textNoData}>{t('data.notData')}</Text>
          ) : (
            <ScrollView
              horizontal
              // showsHorizontalScrollIndicator={false}
              bounces={false}
              style={[
                {
                  marginBottom: scaler(30),
                },
                styleScroll,
              ]}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                {
                  paddingLeft: scaler(20),
                  // marginBottom: scaler(48),
                },
                contentContainerStyle,
              ]}>
              {children}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  textTitle: {
    ...stylesCommon.fontWeight700,
    fontSize: scaler(20),
    lineHeight: scaler(28),
    color: colors.textColor,
    // marginLeft: scaler(8),
    maxWidth: scaler(widthScreen - 150),
  },
  textSeeMore: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    lineHeight: scaler(21),
    textAlign: 'right',
    color: '#E66D6E',
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(30),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
    paddingVertical: scaler(16),
    width: widthScreen,
  },
});
