import {AppCameraModal2, AppImage, HeaderDetailChat} from '@component';
import {iconClose, iconSend, iconUploadImageChat, SvgArrowLeft} from '@images';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useCallback, useEffect} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {Actions, GiftedChat, Send} from 'react-native-gifted-chat';
import ImageView from 'react-native-image-viewing';
import {renderComposer} from './component/InputToolbar';
import {ItemMessage} from './component/ItemMessage';
import {ModalSetting} from './component/ModalSetting';
import {styles} from './styles';
import {useFunction} from './useFunction';

const DetailChat = (props: any) => {
  const {
    chatUser,
    listChat,
    getConvertedMessages,
    onLoadMore,
    showViewSelect,
    setShowViewSelect,
    visible,
    setVisible,
    handleChangeAvatar,
    urlImage,
    setUrlImage,
    text,
    setText,
    sendMessage,
    dataUser,
    viewImage,
    modalImage,
    urlImageView,
    setUrlImageView,
    modalSetting,
    setModalSetting,
  } = useFunction(props);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.DETAIL_CHAT, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.DETAIL_CHAT);

  const renderActions = useCallback((props: any) => {
    return (
      <Actions
        {...props}
        containerStyle={styles.addBtn}
        onPressActionButton={() => {
          setVisible(true);
        }}
        icon={() => (
          <Image source={iconUploadImageChat} style={styles.iconUpload} />
        )}
      />
    );
  }, []);

  const renderMessage = useCallback((props: any) => {
    return (
      <>
        <ItemMessage
          {...props}
          viewImage={(data: any) => {
            setUrlImageView(data);
            viewImage();
          }}
        />
      </>
    );
  }, []);

  const isCloseToTop = useCallback(
    ({layoutMeasurement, contentOffset, contentSize}: any) => {
      const paddingToTop = Platform.OS === 'ios' ? -20 : 10;
      return (
        contentSize.height - layoutMeasurement.height - paddingToTop <=
        contentOffset.y
      );
    },
    [],
  );

  const validateSend = (text: any) => {
    if (!text?.trim()) {
      if (!urlImage) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        disabled={validateSend(props.text)}
        containerStyle={styles.sendBtn}>
        {validateSend(props.text) === true ? (
          <></>
        ) : (
          <Image
            source={iconSend}
            style={styles.iconEmojiStyle}
            resizeMode="contain"
          />
        )}
      </Send>
    );
  };

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeaderImage}>
        <TouchableOpacity onPress={viewImage} style={styles.btnClose}>
          <Image source={iconClose} style={styles.iconClose} />
        </TouchableOpacity>
      </View>
    );
  }, [modalImage]);

  return (
    <View style={styles.container}>
      <HeaderDetailChat
        title={'Message'}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        dataUser={dataUser}
        onPressRight={() => {
          setModalSetting(true);
        }}
      />
      <GiftedChat
        text={text}
        onInputTextChanged={inputText => {
          setText(inputText);
        }}
        //@ts-ignore
        messages={getConvertedMessages(listChat)}
        onSend={sendMessage}
        alwaysShowSend={true}
        renderMessage={renderMessage}
        renderComposer={renderComposer}
        user={chatUser}
        renderSend={renderSend}
        renderFooter={() => <View style={styles.viewBottom} />}
        renderActions={renderActions}
        listViewProps={{
          scrollEventThrottle: 400,
          //Xử lý loadmore tin nhắn
          onScroll: ({nativeEvent}: any) => {
            if (isCloseToTop(nativeEvent)) {
              onLoadMore();
            } else if (nativeEvent?.contentOffset?.y === 0) {
            }
          },
        }}
        renderAccessory={
          showViewSelect === true
            ? () => {
                return (
                  <View style={styles.viewSelectImage}>
                    <TouchableOpacity
                      hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                      style={styles.buttonClose}
                      onPress={() => {
                        setShowViewSelect(false);
                        setUrlImage(null);
                      }}>
                      <Image
                        source={iconClose}
                        style={[
                          styles.iconClose,
                          {tintColor: colors.borderColor},
                        ]}
                      />
                    </TouchableOpacity>
                    <AppImage uri={urlImage} style={styles.imagePicker} />
                  </View>
                );
              }
            : undefined
        }
        bottomOffset={0}
        messagesContainerStyle={styles.containerMessage}
      />
      <AppCameraModal2
        visible={visible}
        setVisible={setVisible}
        onPress={handleChangeAvatar}
      />
      <ImageView
        images={[
          {
            uri: urlImageView,
          },
        ]}
        imageIndex={0}
        visible={modalImage}
        onRequestClose={viewImage}
        HeaderComponent={renderHeader}
        backgroundColor={colors.gray300}
      />
      <ModalSetting
        visible={modalSetting}
        onCancel={() => setModalSetting(false)}
      />
    </View>
  );
};

export {DetailChat};
