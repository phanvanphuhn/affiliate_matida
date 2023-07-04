import {AppImage, ViewExpert, ViewLockPayment} from '@component';
import {SvgCrown, SvgHeart, SvgHearted} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {getConvertViewer, getFirstTextElementHTML} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
interface IProps {
  masterClass: any;
  //   onPress?: (article: any) => void; SvgCrown
}
export const ItemMasterClass = ({masterClass}: IProps) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {content, image, title = '', created_at, total_like} = masterClass;

  const isPayment = !masterClass?.is_paid;
  // const isPayment = true;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate(ROUTE_NAME.MASTER_CLASS, {id: masterClass?.id})}
      activeOpacity={1}>
      <View>
        <AppImage style={styles.banner} uri={image} />
        {isPayment ? (
          <ViewLockPayment
            price={masterClass?.total_price_vn}
            icon={<SvgCrown />}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
          />
        ) : null}
      </View>

      <View style={styles.body}>
        <View>
          <Text numberOfLines={2} style={styles.textTitle}>
            {lang === 2 ? masterClass?.title_vn : masterClass?.title_en}
          </Text>
          <Text numberOfLines={2} style={styles.textDescription}>
            {getFirstTextElementHTML(
              lang === 2
                ? masterClass?.expert_desc_vn
                : masterClass?.expert_desc_en,
            )}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scaler(8),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: scaler(100),
            }}>
            {masterClass?.is_liked ? <SvgHearted /> : <SvgHeart />}

            <Text
              style={{
                fontSize: scaler(12),
                ...stylesCommon.fontWeight400,
                color: colors.borderColor,
                marginLeft: scaler(6),
              }}>
              {getConvertViewer(+masterClass?.totalLike ?? 0)}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <ViewExpert
              name={masterClass?.expert_name}
              avatar={masterClass?.expert_image}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaler(16),
    width: scaler(widthScreen * 0.7),
    marginRight: scaler(16),
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(8),
    // marginBottom: scaler(30),
    // paddingBottom: scaler(12),
  },
  banner: {
    // flex: 1,
    width: '100%',
    borderRadius: scaler(8),
    height: scaler(173),
  },
  body: {
    flex: 1,
    padding: scaler(12),
    justifyContent: 'space-between',
  },
  textTitle: {
    ...stylesCommon.fontWeight700,
    fontSize: scaler(14),
    lineHeight: scaler(21),
    color: colors.textColor,
    paddingBottom: scaler(4),
  },
  textDescription: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    lineHeight: scaler(21),
    color: '#515151',
  },
  viewLoading: {
    width: scaler(42),
    height: scaler(42),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
