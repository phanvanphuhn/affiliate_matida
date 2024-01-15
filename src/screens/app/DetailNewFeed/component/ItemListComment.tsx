import {AppImage, AppTextUrl} from '@component';
import {avatarDefault} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LikeViewComment} from './LikeViewComment';
import {LikeViewReply} from './LikeViewReply';
import {event, eventType, trackingAppEvent} from '@util';
import {getDataReply} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

const ItemListComment = React.memo((props: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {item, index, callBackSocket, onReply} = props;
  const [show, setShow] = useState(false);

  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const detail = useSelector((state: any) => state?.post?.detailPost);

  let idComment = item?.id;

  const onReplyMessage = () => {
    if (show === false) {
      dispatch(getDataReply(item?.id));
      setShow(true);
      onReply();
    } else {
      onReply();
    }
  };

  const onNavigateChatAPI = () => {
    trackingAppEvent(event.TIDA.TIDA_OPEN, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT);
  };

  return (
    <>
      <View style={styles.viewContent}>
        <View style={styles.viewAvatar}>
          <TouchableOpacity
            onPress={() => {
              if (item?.user?.id == 121) {
                onNavigateChatAPI();
              } else if (detail?.is_anonymous) {
                return;
              } else {
                navigation.navigate(ROUTE_NAME.DETAIL_USER, {
                  id: item?.user?.id,
                });
              }
            }}>
            {item?.user?.avatar?.length > 0 ? (
              <AppImage user uri={item?.user?.avatar} style={styles.image} />
            ) : (
              <Image source={avatarDefault} style={styles.image} />
            )}
          </TouchableOpacity>
          <View style={styles.viewColumn}>
            <View style={styles.viewLongText}>
              <Text style={styles.txtName} numberOfLines={1}>
                {item?.user?.name}
              </Text>
              <AppTextUrl
                color={colors.brandMainPinkRed}
                style={styles.txtContent}
                isForum={true}>
                {item?.content}
              </AppTextUrl>
            </View>
            <LikeViewComment
              data={item}
              id={item?.id}
              callBackSocket={callBackSocket}
              onReply={() => onReplyMessage()}
            />
            {show === true ? (
              <>
                {item?.reply_comments?.map((item: any) => {
                  return (
                    <View
                      key={item?.id}
                      style={[styles.viewAvatar, {marginTop: scaler(20)}]}>
                      <TouchableOpacity
                        onPress={() => {
                          if (detail?.is_anonymous) {
                            return;
                          }
                          navigation.navigate(ROUTE_NAME.DETAIL_USER, {
                            id: item?.user?.id,
                          });
                          setShow(false);
                        }}>
                        {item?.user?.avatar?.length > 0 ? (
                          <AppImage
                            user
                            uri={item?.user?.avatar}
                            style={styles.image}
                          />
                        ) : (
                          <Image source={avatarDefault} style={styles.image} />
                        )}
                      </TouchableOpacity>
                      <View style={styles.viewColumn}>
                        <View style={styles.viewLongText}>
                          <Text style={styles.txtName} numberOfLines={1}>
                            {item?.user?.name}
                          </Text>
                          <AppTextUrl
                            color={colors.brandMainPinkRed}
                            style={styles.txtContent}>
                            {item?.content}
                          </AppTextUrl>
                        </View>
                        <LikeViewReply
                          data={item}
                          id={item?.id}
                          callBackSocket={callBackSocket}
                          idComment={idComment}
                        />
                      </View>
                    </View>
                  );
                })}
              </>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(20),
    marginVertical: scaler(10),
  },
  viewContent: {
    width: '100%',
    marginBottom: scaler(20),
  },
  viewAvatar: {
    flexDirection: 'row',
  },
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32) / 2,
    marginRight: scaler(8),
  },
  viewColumn: {
    flex: 1,
    justifyContent: 'space-between',
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
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    color: colors.textColor,
    fontSize: scaler(14),
    marginTop: scaler(5),
  },
  viewLongText: {
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(8),
    backgroundColor: '#F7F7F7',
    borderRadius: scaler(10),
    marginBottom: scaler(11),
  },
});

export {ItemListComment};
