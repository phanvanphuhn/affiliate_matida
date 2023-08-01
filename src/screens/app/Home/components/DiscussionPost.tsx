import {AppImage} from '@component';
import {avatarDefault, iconDelete, iconEdit, SvgDotsThree} from '@images';
import {navigate} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {InteractiveView} from './InteractiveView';
export const DiscussionPost = ({
  post,
  callBackData,
  onDelete,
  onPressOption,
  cardBorderStyle,
}: any) => {
  const navigation = useNavigation<any>();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const {content, user_name, user_avatar, name, created_at, image, user} = post;
  const handleShow = () => navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: post?.id});
  const onNavigateEdit = () => {
    navigation.navigate(ROUTE_NAME.EDIT_POST, {id: post?.id});
  };
  const handlePostSettings = () => {
    onPressOption(post?.id ?? 0, post);
  };
  return (
    <TouchableOpacity
      style={[styles.container, cardBorderStyle || {}]}
      activeOpacity={1}
      onPress={handleShow}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scaler(12),
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            {user_avatar ? (
              <AppImage user style={styles.image} uri={user_avatar} />
            ) : (
              <Image style={styles.image} source={avatarDefault} />
            )}
            <View style={{marginLeft: scaler(8), flex: 1}}>
              <Text numberOfLines={1} style={styles.textAuthor}>
                {/* {name ?? user?.name ?? user_name ?? ''} */}
                {user?.name ? user?.name : ''}
              </Text>
              {created_at ? (
                <Text style={styles.textTime}>
                  {/* {moment(created_at).format('HH:mm')},{' '}
                {convertLangMonth(moment(created_at).format('MMMM'))}{' '}
                {moment(created_at).format('DD')}{' '}
              {moment(created_at).format('YYYY')} */}
                  {moment(created_at).format('HH:mm DD/MM/YY')}
                </Text>
              ) : null}
            </View>
          </View>
          {userInfo?.id === post?.user_id ? (
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
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textPost} numberOfLines={5}>
            {content}
          </Text>
          {!!image && (
            <View>
              <AppImage style={styles.imagePost} uri={image} />
            </View>
          )}
        </View>
      </View>
      <View>
        <View
          style={{
            marginVertical: scaler(12),
          }}
        />
        <InteractiveView
          data={post}
          callBackData={callBackData}
          id={post?.id}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: scaler(widthScreen * 0.7),
    padding: scaler(16),
    backgroundColor: colors.white,
    borderRadius: scaler(8),
    marginRight: scaler(16),
    marginTop: scaler(16),
  },
  textPost: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    lineHeight: scaler(24),
    color: colors.textColor,
    textAlign: 'left',
    flex: 1,
    marginRight: scaler(16),
  },
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32),
  },
  textAuthor: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    lineHeight: 18,
    color: colors.textColor,
  },
  textTime: {
    color: colors.borderColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    lineHeight: 15,
  },
  imagePost: {
    width: scaler(100),
    height: scaler(100),
    borderRadius: scaler(8),
  },
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
});
