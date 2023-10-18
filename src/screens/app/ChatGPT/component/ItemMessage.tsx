import {AppImage, AppTextUrl} from '@component';
import {icon_PostForum, TidaAIWhite} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {scaler, stylesCommon} from '@stylesCommon';
import {isSameDay} from '@util';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {styles} from './styleItemChat';

const ItemMessage = React.memo((props: any) => {
  const {t} = useTranslation();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const lang = useSelector((state: any) => state.auth.lang);
  const idSuggestMessage = useSelector(
    (state: RootState) => state.chatGPT.suggestMessageID,
  );

  const {user, text, images, createdAt, invite, request, index, _id} =
    props.currentMessage;
  const [showSTT, setShowSTT] = useState(invite?.status ? invite?.status : 1);
  const [showSTTrequest, setShowSTTrequest] = useState(
    request?.status ? request?.status : 1,
  );
  const {viewImage} = props;

  const renderDay = () => {
    const {currentMessage, previousMessage} = props;
    if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
      return (
        <View style={styles.viewCenter}>
          <View style={styles.viewRowLeft} />
          <Text style={styles.txtDateCenter} numberOfLines={2}>
            {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY')}
          </Text>
          <View style={styles.viewRowRight} />
        </View>
      );
    }
    return null;
  };

  const onClickPostForum = () => {
    //Go to Create new Post
    navigate(ROUTE_NAME.CREATE_NEWPOST, {
      message: text,
    });
  };

  return (
    <>
      {invite || request ? (
        <></>
      ) : (
        <View
          style={[user?._id == 2 ? styles.containerCurrent : styles.container]}>
          {renderDay()}
          <View style={styles.chat}>
            {user?._id == 2 ? (
              <>
                {text?.length > 0 ? (
                  <View style={styles.viewMessageCurrent}>
                    <Text style={styles.txtMsgCurrent}>{text}</Text>
                  </View>
                ) : (
                  <>
                    {images?.length > 0 ? (
                      <TouchableOpacity
                        onPress={() => viewImage(images[0]?.url)}>
                        <AppImage
                          style={[styles.imageMessageItem]}
                          uri={images[0]?.url}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                {user?.avatar?.length > 0 ? (
                  <AppImage
                    user
                    uri={user?.avatar}
                    style={styles.imageAvatar}
                  />
                ) : (
                  <View style={styles.viewAvatar}>
                    <Image source={TidaAIWhite} style={styles.imageAvatar} />
                  </View>
                )}
                <>
                  {text?.length > 0 ? (
                    <View style={styles.viewMessage}>
                      <AppTextUrl style={styles.txtMsg}>{text}</AppTextUrl>
                    </View>
                  ) : (
                    <>
                      {images?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => viewImage(images[0]?.url)}
                          style={{marginLeft: 4}}>
                          <AppImage
                            style={[styles.imageMessageItem]}
                            uri={images[0]?.url}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </>
                  )}
                </>
              </>
            )}
          </View>
          {text?.length > 0 && images && images[0]?.url?.length > 0 ? (
            <TouchableOpacity
              onPress={() => viewImage(images[0]?.url)}
              style={
                user?._id == 2
                  ? styles.imageMessageCurrent
                  : styles.imageMessage
              }>
              {images?.length > 0 ? (
                <AppImage
                  style={styles.imageMessageItem}
                  uri={images[0]?.url}
                />
              ) : null}
            </TouchableOpacity>
          ) : null}
          {user._id === 2 &&
            _id !== idSuggestMessage &&
            (text?.length ?? 0) > 30 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickPostForum}
                style={styleMessage.postButton}>
                <FastImage
                  source={icon_PostForum}
                  style={styleMessage.iconPostButton}
                  resizeMode={'contain'}
                />
                <Text style={styleMessage.textPostButton}>
                  {t('chatGPT.postForum')}
                </Text>
              </TouchableOpacity>
            )}
          {createdAt ? (
            <Text style={styles.txtDate}>
              {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
            </Text>
          ) : null}
        </View>
      )}
    </>
  );
});

const styleMessage = StyleSheet.create({
  postButton: {
    height: scaler(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(8),
    borderRadius: scaler(8),
    backgroundColor: 'rgba(255, 231, 231, 1)',
  },
  iconPostButton: {
    height: scaler(24),
    width: scaler(24),
    marginRight: scaler(9),
  },
  textPostButton: {
    ...stylesCommon.fontWeight500,
    color: '#E66D6E',
    fontSize: scaler(14),
  },
});

export {ItemMessage};
