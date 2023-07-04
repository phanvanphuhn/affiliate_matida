import {colors, stylesCommon, scaler, widthScreen} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {AppButton} from './AppButton';
import {useTranslation} from 'react-i18next';
import {iconClose} from '@images';
import StarRating from 'react-native-star-rating-widget';
import {useSelector, useDispatch} from 'react-redux';
import {showModalReview} from '@redux';
import {reviewMeeting} from '@services';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ModalRating = React.memo((prop: any) => {
  const {titleHeader, onCancel, onConfirm, contentHeader, onRejoin} = prop;
  const dispatch = useDispatch();
  const visible = useSelector((state: any) => state?.liveTalk?.showModalReview);
  const infoRoom = useSelector((state: any) => state?.liveTalk?.info?.room?.id);

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  // const [focus, setFocus] = useState<boolean>(false);

  const disButton = rating === 0 || content.length === 0;

  const closeModal = () => {
    dispatch(showModalReview(false));
  };
  const {t} = useTranslation();

  const ratingFunc = async () => {
    try {
      const body = {
        star: rating,
        comment: content,
        room_id: infoRoom,
      };
      const res = await reviewMeeting(body);
      showMessage({
        message: t('allRoomMetting.tks_review'),
        type: 'default',
        backgroundColor: colors.success_message,
      });
      dispatch(showModalReview(false));
    } catch (error) {
      dispatch(showModalReview(false));
    }
  };

  return (
    <Modal
      // statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <View style={styles.viewClose}>
              <TouchableOpacity onPress={closeModal}>
                <Image
                  source={iconClose}
                  style={{tintColor: colors.textColor}}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txtHeader}>
              {t('allRoomMetting.title_modal_review')}
            </Text>
            <View style={styles.viewRate}>
              <Text style={styles.txtRate}>
                {t('allRoomMetting.content_modal_review')}
              </Text>
              <StarRating
                rating={rating}
                onChange={setRating}
                maxStars={5}
                starSize={42}
                enableSwiping={false}
                enableHalfStar={false}
                starStyle={{
                  width: scaler(42),
                  height: scaler(42),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: scaler(8),
                }}
              />
              <View style={styles.viewTxtRating}>
                <Text style={[styles.txtRating, {marginLeft: scaler(6)}]}>
                  {t('allRoomMetting.bad')}
                </Text>
                <Text style={styles.txtRating}>{t('allRoomMetting.good')}</Text>
              </View>
            </View>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={(text: any) => setContent(text)}
                value={content}
                multiline={true}
                maxLength={1000}
                placeholder={`${t('allRoomMetting.your_comment')}`}
                style={styles.input}
              />
            </View>
            <AppButton
              disable={disButton}
              // titleButton={t('setting.confirm')}
              titleButton={`${t('allRoomMetting.evaluate')}`}
              onClick={ratingFunc}
              customStyleButton={[
                styles.button,
                {backgroundColor: colors.primary, opacity: disButton ? 0.5 : 1},
              ]}
            />
            <TouchableOpacity
              style={{
                // backgroundColor: 'green',
                height: scaler(48),
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: scaler(16),
              }}
              onPress={() => {
                closeModal();
                onRejoin();
              }}>
              <Text style={styles.txtCancle}>{t('allRoomMetting.rejoin')}</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(16),
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(16),
    alignItems: 'center',
    paddingTop: scaler(32),
    paddingHorizontal: scaler(16),
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    fontSize: scaler(24),
    ...stylesCommon.fontPlus600,
    lineHeight: scaler(33),
    textAlign: 'center',
    color: colors.textColor,
    marginBottom: scaler(32),
  },
  viewRate: {
    width: widthScreen - scaler(64),
    height: scaler(157),
    borderRadius: scaler(8),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  viewInput: {
    backgroundColor: '#F6F6F6',
    width: widthScreen - scaler(64),
    borderRadius: scaler(8),
    height: scaler(80),
    marginTop: scaler(16),
    paddingHorizontal: scaler(16),
    paddingTop: Platform.OS === 'ios' ? scaler(12) : 0,
  },
  input: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: '#7C7C7C',
    // marginBottom: scaler(16),
  },
  button: {
    width: widthScreen - scaler(64),
    marginTop: scaler(32),
  },
  txtCancle: {
    color: colors.primary,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    // marginTop: scaler(30),
    // marginBottom: scaler(45),
  },
  txtRate: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(16),
    lineHeight: scaler(22),
    color: colors.textColor,
    marginTop: scaler(24),
    marginBottom: scaler(10),
  },
  viewTxtRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scaler(16),
    marginTop: scaler(8),
  },
  txtRating: {
    fontSize: scaler(11),
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
  },
  viewClose: {
    width: '100%',
    marginBottom: scaler(10),
    alignItems: 'flex-end',
  },
});

export {ModalRating};
