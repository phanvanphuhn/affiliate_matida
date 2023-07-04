import {scaler, stylesCommon, colors} from '@stylesCommon';
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {LikeView} from './LikeView';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {AppImage} from '@component';
import {avatarDefault, iconDelete} from '@images';
import moment from 'moment';
import {convertLangMonth, valid} from '@util';
import RenderHtml from 'react-native-render-html';
import {widthScreen} from '@stylesCommon';
import {useSelector} from 'react-redux';

const Item = React.memo((props: any) => {
  const {item, index, callBackData, onDelete} = props;
  const navigation = useNavigation<any>();

  const user = useSelector((state: any) => state?.auth?.userInfo);

  const onNavigate = () => {
    navigation.navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: item?.id});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.viewContent}
        onPress={() =>
          navigation.navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: item?.id})
        }>
        <View style={styles.viewAvatar}>
          <View style={styles.viewRow}>
            {item?.user_avatar?.length > 0 ? (
              <AppImage user uri={item?.user_avatar} style={styles.image} />
            ) : (
              <Image source={avatarDefault} style={styles.image} />
            )}
            <View style={styles.viewColumn}>
              <Text style={styles.txtName} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.txtTime}>
                {moment(item?.created_at).format('HH:mm')},{' '}
                {convertLangMonth(moment(item?.created_at).format('MMMM'))}{' '}
                {moment(item?.created_at).format('DD')}{' '}
                {moment(item?.created_at).format('YYYY')}
              </Text>
            </View>
            {user?.id === item?.user_id ? (
              <TouchableOpacity onPress={onDelete}>
                <Image source={iconDelete} style={styles.iconDelete} />
              </TouchableOpacity>
            ) : null}
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
        <LikeView
          data={item}
          callBackData={callBackData}
          id={item?.id}
          onNavigate={onNavigate}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(20),
    marginVertical: scaler(10),
  },
  viewRow: {flexDirection: 'row', flex: 1},
  viewContent: {
    width: '100%',
    padding: scaler(16),
    // backgroundColor: '#FFFFFF',
    backgroundColor: '#FFF5F4',
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

export {Item};
