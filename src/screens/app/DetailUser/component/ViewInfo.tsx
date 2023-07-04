import {scaler, stylesCommon, colors, widthScreen} from '@stylesCommon';
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {AppImage, AppButton} from '@component';
import {
  iconSms,
  iconThreeDot,
  avatarDefault,
  iconIsAdmin,
  reward1,
  reward2,
} from '@images';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ViewInfo = React.memo((props: any) => {
  const use = useSelector((state: any) => state?.auth?.userInfo);
  const {data, onOpenModal, sendMessage, dataReward} = props;
  const {t} = useTranslation();

  const dataTest = [reward1, reward2];

  return (
    <View style={styles.container}>
      <View style={styles.viewAvatar}>
        {data?.avatar?.length > 0 ? (
          <View
            style={[
              styles.viewAdmin,
              {borderWidth: data?.role === 2 || data?.role === 3 ? 1 : 0},
            ]}>
            <AppImage user style={styles.avatar} uri={data?.avatar} />
            {data?.role === 2 || data?.role === 3 ? (
              <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
            ) : null}
          </View>
        ) : (
          <View
            style={[
              styles.viewAdmin,
              {borderWidth: data?.role === 2 || data?.role === 3 ? 1 : 0},
            ]}>
            <Image source={avatarDefault} style={styles.avatar} />
            {data?.role === 2 || data?.role === 3 ? (
              <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
            ) : null}
          </View>
        )}
        <View style={styles.viewTxt}>
          <View style={[styles.viewRow, {marginBottom: scaler(8)}]}>
            <Text style={styles.txtName} numberOfLines={1}>
              {data?.name}
            </Text>
            {data?.role === 2 || data?.role === 3 ? (
              <View
                style={[
                  styles.viewExpert,
                  {
                    backgroundColor:
                      data?.role === 2 ? colors.green50 : colors.yellow100,
                  },
                ]}>
                <Text
                  style={[
                    styles.txtExpert,
                    {
                      color:
                        data?.role === 2 ? '#28B4AE' : colors.brandMainPinkRed,
                    },
                  ]}>
                  {data?.role === 2
                    ? t('profileSettings.expert')
                    : t('profileSettings.admin')}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.viewRow}>
            <Image source={iconSms} />
            <Text style={styles.txtMail}>
              {data?.email?.length > 0 ? data?.email : '-'}
            </Text>
          </View>
          <View style={[styles.viewRow, {marginTop: scaler(8)}]}>
            {dataReward?.length > 0 &&
              dataReward?.map((item: any, index: any) => {
                return (
                  <AppImage
                    style={styles.iconReward}
                    uri={item?.badge?.image}
                    key={item?.id}
                  />
                );
              })}
          </View>
        </View>
      </View>
      {use?.id === data?.id ? null : (
        <View style={styles.viewButton}>
          <AppButton
            titleButton={`${t('chat.send_message')}`}
            onClick={sendMessage}
            customStyleButton={styles.buttonSend}
          />
          <TouchableOpacity style={styles.buttonMore} onPress={onOpenModal}>
            <Image source={iconThreeDot} style={styles.iconThreeDot} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaler(16),
    backgroundColor: '#FFFFFF',
    marginTop: scaler(3),
  },
  viewAvatar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scaler(67),
    height: scaler(67),
    borderRadius: scaler(67) / 2,
  },
  viewTxt: {
    flex: 1,
    marginLeft: scaler(13),
    justifyContent: 'space-between',
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    color: colors.textColor,
    maxWidth: '80%',
  },
  txtMail: {
    color: '#515151',
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    marginLeft: scaler(8),
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(13),
  },
  buttonMore: {
    width: scaler(44),
    height: scaler(44),
    borderRadius: scaler(8),
    backgroundColor: '#F6F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSend: {
    width: widthScreen - scaler(44) - scaler(32) - scaler(8),
    height: scaler(44),
  },
  iconThreeDot: {
    width: scaler(24),
    height: scaler(24),
  },
  viewAdmin: {
    width: scaler(74),
    height: scaler(74),
    borderRadius: scaler(74) / 2,
    borderWidth: scaler(2),
    borderColor: '#28B4AE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconIsAdmin: {
    width: scaler(32),
    height: scaler(32),
    position: 'absolute',
    bottom: scaler(-5),
    right: scaler(-10),
  },
  viewExpert: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
    borderRadius: scaler(200),

    marginLeft: scaler(8),
  },
  txtExpert: {
    fontSize: scaler(10),
    ...stylesCommon.fontWeight600,
  },
  iconReward: {
    width: scaler(24),
    height: scaler(24),
    marginRight: scaler(8),
  },
});

export {ViewInfo};
