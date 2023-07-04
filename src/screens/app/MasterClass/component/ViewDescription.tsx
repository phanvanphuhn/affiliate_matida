import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {scaler, stylesCommon, colors} from '@stylesCommon';
import {avatarDefault, iconIsAdmin} from '@images';
import {useTranslation} from 'react-i18next';
import {AppImage} from '@component';
import {useSelector} from 'react-redux';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';

type Props = {
  data: any;
};

const ViewDescription = React.memo(({data}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const handlePressExpert = () => {
    if (data?.expert_id) {
      navigate(ROUTE_NAME.DETAIL_USER, {id: data?.expert_id});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={handlePressExpert}>
      {/* <Text style={styles.txtName}>{t('masterClass.description')}</Text>
      <View style={styles.viewAvatar}>
        <AppImage uri={data?.expert_image} style={styles.avatar} />
        <View>
          <Text style={styles.txtNameAvatar}>{data?.expert_name}</Text>
        </View>
      </View>
      <Text style={styles.txtDes}>
        {lang === 2 ? data?.expert_desc_vn : data?.expert_desc_en}
      </Text> */}
      {data?.expert_image?.length > 0 ? (
        <View style={[styles.viewAdmin]}>
          <AppImage user style={styles.avatar} uri={data?.expert_image} />
          <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
        </View>
      ) : (
        <View style={[styles.viewAdmin]}>
          <Image source={avatarDefault} style={styles.avatar} />
          <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
        </View>
      )}
      <View style={styles.viewContent}>
        <Text style={styles.txtTitle}>{data?.expert_name}</Text>
        <Text style={styles.txtContent}>
          {lang === 2 ? data?.expert_desc_vn : data?.expert_desc_en}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaler(12),
    backgroundColor: '#E8F8F7',
    borderRadius: scaler(8),
    marginTop: scaler(16),
    flexDirection: 'row',
  },
  viewAdmin: {
    width: scaler(44),
    height: scaler(44),
    borderRadius: scaler(44) / 2,
    borderWidth: scaler(2),
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(40) / 2,
  },
  iconIsAdmin: {
    width: scaler(16),
    height: scaler(16),
    position: 'absolute',
    bottom: scaler(-5),
    right: scaler(-5),
  },
  viewContent: {
    flex: 1,
    marginLeft: scaler(12),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
  },
  txtContent: {
    color: '#515151',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(18),
    marginTop: scaler(8),
  },
});

export {ViewDescription};
