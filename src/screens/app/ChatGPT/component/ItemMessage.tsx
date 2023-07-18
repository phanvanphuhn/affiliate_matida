import {AppImage} from '@component';
import {TidaAIWhite} from '@images';
import {isSameDay} from '@util';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styleItemChat';

const ItemMessage = React.memo((props: any) => {
  const {t} = useTranslation();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const lang = useSelector((state: any) => state.auth.lang);
  const {user, text, images, createdAt, invite, request, index} =
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
                      <Text style={styles.txtMsg}>{text}</Text>
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

export {ItemMessage};
