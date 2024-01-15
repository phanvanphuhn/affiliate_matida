import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {getConvertViewer, getFirstTextElementHTML} from '@util';
import {useTranslation} from 'react-i18next';
import {AppImage} from './AppImage';
import {ViewLockPayment} from './Payment';

interface IProps {
  article: any;
  onPress?: (article: any) => void;
}

export const NewArticles = ({article, onPress = () => {}}: IProps) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const isCheckPayment = useMemo(
    () =>
      !user?.user_subscriptions?.some(e => e.code == 'PP') ||
      user.payments.some(e => e.status == 'processing'),
    [user],
  );
  const {content, image, title = '', created_at, views} = article;

  const isPayment = article?.is_payment && !article?.is_paid;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(article)}
      activeOpacity={1}>
      <View>
        <AppImage style={styles.banner} uri={image} />
        {isPayment && isCheckPayment ? (
          <ViewLockPayment
            price={article?.price_vn}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
          />
        ) : null}
      </View>

      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.textTitle}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.textDescription}>
          {getFirstTextElementHTML(content)}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scaler(8),
          }}>
          {/* <Text
            style={{
              color: colors.borderColor,
              ...stylesCommon.fontWeight400,
              fontSize: scaler(12),
            }}>
            {created_at && moment(created_at).format('DD[-]MM[-]YYYY')}
          </Text>
          <View
            style={{
              width: scaler(4),
              height: scaler(4),
              borderRadius: scaler(2),
              backgroundColor: '#D3D3D3',
              marginHorizontal: scaler(4),
            }}
          /> */}
          <Text
            style={{
              fontSize: scaler(12),
              ...stylesCommon.fontWeight400,
              color: colors.borderColor,
            }}>
            {t('views.views', {views: getConvertViewer(views)})}
          </Text>
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
    // flex: 1,
    padding: scaler(12),
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
