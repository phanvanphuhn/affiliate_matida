import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getConvertViewer} from '@util';
import moment from 'moment';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppImage} from './AppImage';
import {MoodComponent} from './MoodComponent';
import {ViewLock} from './Payment';
import {useSelector} from 'react-redux';
import {iconCrownWhite} from '@images';
import LinearGradient from 'react-native-linear-gradient';
interface IProps {
  item?: any;
}

export const ItemArticles = ({item}: IProps) => {
  const {t} = useTranslation();
  const {created_at, image, title = '', mood, views} = item;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const isCheckPayment = useMemo(
    () =>
      !user?.user_subscriptions?.some(e => e.code == 'PP') ||
      user.payments.some(e => e.status == 'processing'),
    [user],
  );
  const isPayment = item?.is_payment && !item?.is_paid;

  const handlePress = () => {
    if (!isCheckPayment) {
      navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: item});
    } else {
      navigate(ROUTE_NAME.NEW_USER_PROGRAM);
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}>
      <View style={{marginRight: scaler(16)}}>
        <AppImage uri={image} style={styles.image} />
        {isPayment && isCheckPayment ? (
          <LinearGradient
            colors={['#0006', '#00000090']}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: scaler(8),
              borderTopRightRadius: scaler(8),
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: scaler(8),
                paddingHorizontal: scaler(5),
                backgroundColor: colors.pink4,
                borderRadius: scaler(24),
              }}>
              <Image
                source={iconCrownWhite}
                style={{
                  height: scaler(18),
                  width: scaler(18),
                  marginRight: scaler(8),
                }}
              />
              <Text
                style={{
                  ...stylesCommon.fontSarabun600,
                  fontSize: scaler(12),
                  color: colors.white,
                }}>
                {t('myPurchases.signUpNow')}
              </Text>
            </View>
          </LinearGradient>
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
        }}>
        <Text style={styles.textTitle} numberOfLines={2}>
          {title}
        </Text>
        <View>
          <View style={{flexDirection: 'row', marginVertical: scaler(8)}}>
            {mood?.length > 0 && <MoodComponent mood={mood} />}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
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
            />
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: scaler(20),
    backgroundColor: colors.white,
    borderRadius: scaler(8),
    padding: scaler(12),
  },
  image: {
    height: scaler(98),
    // height: '100%',
    width: scaler(128),
    borderRadius: scaler(8),
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight700,
    fontSize: scaler(14),
    lineHeight: 21,
  },
});
