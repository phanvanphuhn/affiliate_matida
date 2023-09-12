import {AppCameraModal2, HeaderChatGPT} from '@component';
import {SvgArrowLeft, iconSend} from '@images';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image, Platform, Text, View} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {renderComposer} from './component/InputToolbar';
import {ItemMessage} from './component/ItemMessage';
import {ModalSuggest} from './component/ModalSuggest';
import {styles} from './styles';
import {useFunction} from './useFunction';

const ChatGPT = (props: any) => {
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
    modalSuggest,
    setModalSuggest,
    onClickSuggest,
  } = useFunction(props);

  const {t} = useTranslation();

  useUXCam(ROUTE_NAME.CHAT_GPT);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.CHAT_GPT, {}, eventType.AFF_FLYER);
  }, []);

  const renderMessage = useCallback((props: any) => {
    return (
      <>
        <ItemMessage {...props} />
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
        <Image
          source={iconSend}
          style={styles.iconEmojiStyle}
          resizeMode="contain"
        />
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderChatGPT
        title={'Message'}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        dataUser={null}
      />
      <View style={styles.viewNote}>
        <Text>
          <Text style={styles.txtTitleNote}>{t('chatGPT.note')}</Text>
          <Text style={styles.txtContentNote}>{t('chatGPT.contentNote')}</Text>
        </Text>
      </View>
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
                  <View style={styles.viewLoading}>
                    <ActivityIndicator color={colors.primary} />
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
      <ModalSuggest
        visible={modalSuggest}
        onCancel={() => {
          setModalSuggest(false);
        }}
        handleValue={(value: any) => onClickSuggest(value)}
      />
    </View>
  );
};

export {ChatGPT};
