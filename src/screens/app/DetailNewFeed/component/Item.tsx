import {AppImage, AppTextUrl} from '@component';
import {
  avatarDefault,
  iconClose,
  iconDelete,
  iconEdit,
  SvgDotsThree,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {LikeView} from './LikeView';

import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

type Props = {
  onPressOption: (idPost: any, dataUser: any) => void;
  onDelete: (detail: any) => void;
};

const Item = React.memo(({onPressOption, onDelete}: Props) => {
  const detail = useSelector((state: any) => state?.post?.detailPost);

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const [modalImage, setModalImage] = useState(false);
  const {t} = useTranslation();

  const viewImage = useCallback(() => {
    setModalImage(!modalImage);
  }, [modalImage]);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeaderImage}>
        <TouchableOpacity onPress={viewImage}>
          <Image source={iconClose} style={styles.iconClose} />
        </TouchableOpacity>
      </View>
    );
  }, [modalImage]);

  const onNavigateEdit = () => {
    navigation.navigate(ROUTE_NAME.EDIT_POST, {id: detail?.id});
  };

  const handlePostSettings = () => {
    onPressOption(detail?.id ?? 0, detail);
  };

  return (
    <>
      <View style={styles.viewContent}>
        <View style={[styles.viewAvatar, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* //Change according to api response  post?.isPrivate*/}

            <TouchableOpacity
              onPress={() => {
                if (detail?.is_anonymous) {
                  return;
                }
                navigation.navigate(ROUTE_NAME.DETAIL_USER, {
                  id: detail?.user?.id,
                });
              }}>
              {/* //Change according to api response  post?.isPrivate*/}

              {detail?.user?.avatar?.length > 0 ? (
                <AppImage
                  user
                  uri={detail?.user?.avatar}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Image source={avatarDefault} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.viewColumn}>
              <Text style={styles.txtName} numberOfLines={1}>
                {/* {detail?.user?.name} */}

                {/* //Change according to api response  post?.isPrivate*/}
                {/* {detail?.isPrivate ? t('post.ano') : detail?.user?.name}
                {user?.id === detail?.user_id && ` (${t('post.me')})`} */}
                {user?.id === detail?.user_id
                  ? detail?.is_anonymous
                    ? ` ${t('post.me')} (${t('post.postedInAnonymus')})`
                    : `${t('post.me')}`
                  : detail?.user?.name}
              </Text>
              <Text style={styles.txtTime}>
                {moment(detail?.created_at).format('HH:mm DD/MM/YY')}
              </Text>
            </View>
          </View>
          {user?.id === detail?.user_id ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={onNavigateEdit}>
                <Image source={iconEdit} style={styles.iconEdit} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(detail)}>
                <Image source={iconDelete} style={styles.iconDelete} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handlePostSettings}
              activeOpacity={0.9}
              style={{paddingLeft: scaler(14)}}>
              <SvgDotsThree />
            </TouchableOpacity>
          )}
        </View>
        <AppTextUrl style={styles.txtContent} color={colors.brandMainPinkRed}>
          {detail?.content}
        </AppTextUrl>
        {detail?.image ? (
          <TouchableOpacity onPress={viewImage}>
            <AppImage
              uri={detail?.image}
              style={styles.imageThumb}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        <View style={styles.border} />
        <LikeView data={detail} />
        <View style={styles.borderBottom} />
        <ImageView
          images={[
            {
              uri: detail?.image,
            },
          ]}
          imageIndex={0}
          visible={modalImage}
          onRequestClose={viewImage}
          HeaderComponent={renderHeader}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  iconEdit: {
    width: scaler(20),
    height: scaler(20),
    tintColor: colors.primary,
    marginRight: scaler(8),
  },
  iconDelete: {
    width: scaler(20),
    height: scaler(20),
    tintColor: colors.primary,
  },
  container: {
    width: '100%',
    paddingHorizontal: scaler(20),
    marginTop: scaler(10),
  },
  viewContent: {
    width: '100%',
    paddingBottom: scaler(16),
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(8),
    marginTop: scaler(20),
  },
  viewAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32) / 2,
    marginRight: scaler(8),
  },
  viewColumn: {
    justifyContent: 'space-between',
    height: scaler(32),
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  txtTime: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.borderColor,
    marginTop: scaler(4),
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    color: colors.textColor,
    fontSize: scaler(14),
    marginTop: scaler(18),
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray100,
    marginTop: scaler(16),
    marginBottom: scaler(9),
  },
  borderBottom: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray100,
    marginTop: scaler(9),
  },
  imageThumb: {
    width: '100%',
    height: scaler(200),
    borderRadius: scaler(8),
    marginTop: scaler(8),
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(16),
    alignItems: 'center',
  },
  iconClose: {
    tintColor: '#FFFFFF',
  },
});

export {Item};
