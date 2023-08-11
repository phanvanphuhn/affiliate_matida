import {AppImage} from '@component';
import {iconDelete, iconEdit, SvgDotsThree} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {LikeView} from './LikeView';
import {useTranslation} from 'react-i18next';
import reactotron from 'reactotron-react-native';

const ItemPost = React.memo((props: any) => {
  const {item, onDelete, onPressOption = () => {}} = props;
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {t} = useTranslation();

  const onNavigate = () => {
    navigation.navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: item?.id});
  };

  const onNavigateEdit = () => {
    navigation.navigate(ROUTE_NAME.EDIT_POST, {id: item?.id});
  };

  const handlePostSettings = () => {
    onPressOption(item?.id ?? 0, item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.viewContent}
        onPress={() =>
          navigation.navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: item?.id})
        }>
        <View style={styles.viewAvatar}>
          <View style={styles.viewRow}>
            {/* //Change according to api response  item?.isPrivate*/}

            <AppImage user uri={item?.avatar} style={styles.image} />

            <View style={styles.viewColumn}>
              <Text style={styles.txtName} numberOfLines={1}>
                {/* //Change according to api response  item?.isPrivate*/}
                {/* {item?.isPrivate ? t('post.ano') : item?.name}
                {user?.id === item?.user_id && ` (${t('post.me')})`} */}
                {user?.id === item?.user_id
                  ? item?.is_anonymous
                    ? ` ${t('post.me')} (${t('post.postedInAnonymus')})`
                    : `${t('post.me')}`
                  : item?.name}
              </Text>
              <Text style={styles.txtTime}>
                {moment(item?.created_at).format('HH:mm DD/MM/YY')}
              </Text>
            </View>
            {user?.id === item?.user_id ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={onNavigateEdit}>
                  <Image source={iconEdit} style={styles.iconEdit} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
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
        </View>
        <View style={styles.viewRowContent}>
          <Text
            style={[
              styles.txtContent,
              {
                maxWidth:
                  item?.image?.length > 0
                    ? widthScreen -
                      scaler(32) -
                      scaler(24) -
                      scaler(20) -
                      scaler(111)
                    : '100%',
              },
            ]}
            numberOfLines={5}>
            {item?.content}
          </Text>
          {item?.image?.length > 0 ? (
            <AppImage
              uri={item?.image}
              style={styles.imagePost}
              // resizeMode="contain"
            />
          ) : null}
        </View>
        <View style={styles.border} />
        <LikeView data={item} id={item?.id} onNavigate={onNavigate} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(20),
    paddingTop: scaler(16),
    backgroundColor: colors.gray250,
  },
  viewRow: {flexDirection: 'row', flex: 1},
  viewContent: {
    width: '100%',
    padding: scaler(16),
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(8),
  },
  viewAvatar: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingRight: scaler(10),
    flex: 1,
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    color: colors.textColor,
  },
  txtTime: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.borderColor,
    marginTop: scaler(5),
  },
  txtContent: {
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
    fontSize: scaler(14),
    maxWidth: widthScreen - scaler(32) - scaler(24) - scaler(16) - scaler(111),
  },
  border: {
    width: '100%',
    height: 1,
    // backgroundColor: colors.gray100,
    backgroundColor: '#D3D3D3',
    marginVertical: scaler(16),
  },
  iconDelete: {
    width: scaler(20),
    height: scaler(20),
    tintColor: colors.primary,
  },
  iconEdit: {
    width: scaler(20),
    height: scaler(20),
    tintColor: colors.primary,
    marginRight: scaler(8),
  },
  imagePost: {
    width: scaler(111),
    height: scaler(111),
    borderRadius: scaler(8),
  },
  viewRowContent: {
    flexDirection: 'row',
    flex: 1,
    marginTop: scaler(16),
    justifyContent: 'space-between',
  },
});

export {ItemPost};
