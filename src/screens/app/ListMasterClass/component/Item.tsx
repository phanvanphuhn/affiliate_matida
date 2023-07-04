import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {stylesCommon, colors, scaler} from '@stylesCommon';
import {
  imageIntro,
  iconCrown,
  avatarDefault,
  SvgCrown,
  SvgHearted,
  SvgHeart,
} from '@images';
import {useSelector} from 'react-redux';
import {AppImage, ViewExpert, ViewLock, ViewLockPayment} from '@component';
import {getConvertViewer} from '@util';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';

const Item = React.memo((props: any) => {
  const {item} = props;

  const lang = useSelector((state: any) => state?.auth?.lang);

  const handlePress = () => {
    navigate(ROUTE_NAME.MASTER_CLASS, {id: item?.id});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={handlePress}>
      <View>
        <View style={styles.viewImage}>
          <AppImage uri={item?.image} style={styles.image} />
          {!item?.is_paid ? (
            // <ViewLock opacity="ba" absolute showText icon={<SvgCrown />} />
            <ViewLockPayment
              price={item?.total_price_vn}
              borderRadius={scaler(12)}
              style={{justifyContent: 'space-between'}}
            />
          ) : null}
        </View>
        <Text style={styles.txtTitle} numberOfLines={2}>
          {lang === 2 ? item?.title_vn : item?.title_en}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            marginTop: scaler(8),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: scaler(100),
            }}>
            {item?.is_liked ? <SvgHearted /> : <SvgHeart />}

            <Text
              style={{
                fontSize: scaler(12),
                ...stylesCommon.fontWeight400,
                color: colors.borderColor,
                marginLeft: scaler(6),
              }}>
              {getConvertViewer(+item?.totalLike ?? 0)}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <ViewExpert name={item?.expert_name} avatar={item?.expert_image} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(20),
    marginTop: scaler(16),
  },
  viewImage: {
    width: '100%',
    height: scaler(200),
    borderRadius: scaler(12),
  },
  viewOpacity: {
    width: '100%',
    height: scaler(200),
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: scaler(12),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: scaler(200),
    borderRadius: scaler(12),
  },
  txtPremium: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    color: '#FFFFFF',
    marginTop: scaler(6),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight700,
    marginTop: scaler(12),
    marginBottom: scaler(4),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaler(17),
  },
  txtSmall: {
    color: '#A8A8A8',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
  },
  txtNamebold: {
    color: '#28B4AE',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
  },
  imageAvatar: {
    width: scaler(16),
    height: scaler(16),
    borderRadius: scaler(16) / 2,
    marginRight: scaler(16),
  },
});

export {Item};
