import {
  AppButton,
  AppCheckBox,
  Header,
  MemberParticipant,
  RoomNameCreate,
  RoomParticipantsCreate,
  RoomScheduleCreate,
  RoomType,
  RoomTypeCreate,
} from '@component';
import {TypeRoom} from '@constant';
import {SvgArrowLeft} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, postCreateRoom} from '@services';
import {colors, scaler} from '@stylesCommon';
import {
  event,
  eventType,
  trackingAppEvent,
  useUXCam,
  validateForm,
  validateFormVN,
} from '@util';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import * as yup from 'yup';

type IFormik = {
  roomType: TypeRoom;
  roomName: string;
  roomDescription: string;
  schedule: string;
  participants: any[];
};

const initialValues: IFormik = {
  roomType: TypeRoom.PUBLIC,
  roomName: '',
  roomDescription: '',
  schedule: '',
  participants: [],
};

const validation = yup.object({
  roomType: validateForm().require,
  roomName: validateForm().require,
  roomDescription: validateForm().description,
  schedule: validateForm().require,
  participants: validateForm().participants,
});

const validationVN = yup.object({
  roomType: validateFormVN().require,
  roomName: validateFormVN().require,
  roomDescription: validateFormVN().description,
  schedule: validateFormVN().require,
  participants: validateFormVN().participants,
});

export const CreateRoom = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [typeRoom, setTypeRoom] = useState(2);
  const [mediaRoom, setMediaRoom] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [inviteAll, setInviteAll] = useState<boolean>(false);
  const goBack = () => {
    navigation.goBack();
  };

  useUXCam(ROUTE_NAME.CREATE_ROOM);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.CREATE_ROOM, {}, eventType.AFF_FLYER);
  }, []);

  const handleCreateRoom = async (values: IFormik) => {
    try {
      GlobalService.showLoading();
      const params = {
        title: values.roomName.trim(),
        description: values.roomDescription.trim(),
        start_time: moment(values.schedule).format('YYYY-MM-DD HH:mm:00'),
        type_room: user?.role === 2 || user?.role === 3 ? 1 : 2,
        type: values.roomType,
        user_ids: values.participants.map(item => item?.id),
        media_type: user?.role === 2 || user?.role === 3 ? mediaRoom : 1,
      };
      const paramsInviteAll = {
        title: values.roomName.trim(),
        description: values.roomDescription.trim(),
        start_time: moment(values.schedule).format('YYYY-MM-DD HH:mm:00'),
        type_room: user?.role === 2 || user?.role === 3 ? 1 : 2,
        type: values.roomType,
        invite_all: true,
        media_type: user?.role === 2 || user?.role === 3 ? mediaRoom : 1,
      };
      const res = await postCreateRoom(
        inviteAll === true ? paramsInviteAll : params,
      );
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
        color: '#FFFFFF',
      });
      trackingAppEvent(event.LIVE_ROOM.CLICK_CREATE_NEW_ROOM_SUCCESS, {}, eventType.AFF_FLYER);
      goBack();
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <Header
          title={t('talk.titleCreate')}
          IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreateRoom}
          validationSchema={lang === 2 ? validationVN : validation}>
          {({handleSubmit}) => (
            <View
              style={{
                backgroundColor: colors.white,
                flex: 1,
              }}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  paddingHorizontal: scaler(16),
                  paddingBottom: scaler(82),
                }}
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <RoomTypeCreate />
                {user?.role === 2 || user?.role === 3 ? (
                  <RoomType
                    value={typeRoom}
                    changeValue={(value: any) => {
                      setTypeRoom(value);
                      if (value === 2) {
                        setMediaRoom(1);
                      }
                    }}
                    valueMedia={mediaRoom}
                    changeValueMedia={(value: any) => setMediaRoom(value)}
                  />
                ) : null}
                <RoomNameCreate />
                <RoomScheduleCreate />
                {user?.role === 2 || user?.role === 3 ? (
                  <AppCheckBox
                    active={inviteAll}
                    onPress={() => setInviteAll(!inviteAll)}
                  />
                ) : null}

                {inviteAll === false ? <RoomParticipantsCreate /> : null}
                {inviteAll === false ? <MemberParticipant /> : null}
              </KeyboardAwareScrollView>
              <View
                style={{
                  marginBottom: scaler(40),
                  paddingHorizontal: scaler(16),
                  marginTop: scaler(16),
                }}>
                <AppButton
                  titleButton={t('talk.titleCreate')}
                  onClick={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};
