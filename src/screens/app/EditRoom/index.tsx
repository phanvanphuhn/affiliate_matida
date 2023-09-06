import {
  AppButton,
  Header,
  HeaderModalPost,
  MemberParticipant,
  RoomNameCreate,
  RoomParticipantsCreate,
  RoomScheduleCreate,
  RoomTypeCreate,
  RoomType,
  AppCheckBox,
} from '@component';
import {TypeRoom} from '@constant';
import {SvgArrowLeft} from '@images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GlobalService, putUpdateRoom} from '@services';
import {colors, heightScreen, scaler} from '@stylesCommon';
import {eventType, useUXCam, validateForm, validateFormVN} from '@util';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {trackingAppEvent, event} from '@util';
import {ROUTE_NAME} from '@routeName';

type IFormik = {
  roomType: TypeRoom;
  roomName: string;
  roomDescription: string;
  schedule: string;
  participants: any[];
};

export const EditRoom = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<any>();

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {data} = route.params;

  useUXCam(ROUTE_NAME.EDIT_ROOM);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.EDIT_ROOM, {}, eventType.AFF_FLYER);
  }, []);

  const [typeRoom, setTypeRoom] = useState<any>(
    data?.room?.type_room ? data?.room?.type_room : 2,
  );
  const [typeMedia, setTypeMedia] = useState<any>(
    data?.room?.media_type ? data?.room?.media_type : 1,
  );

  const isCanEdit = data?.not_edit === false;

  const initialValues: IFormik = {
    roomType: data?.room?.type ?? TypeRoom.PUBLIC,
    roomName: data?.room?.title ?? '',
    roomDescription: data?.room?.description ?? '',
    schedule:
      moment(data?.room?.start_time, 'YYYY-MM-DDTHH:mm:ss.SSS').format() ?? '',
    participants:
      data?.participants.filter(
        (participant: any) => participant?.user_id !== user?.id,
      ) ?? [],
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

  const goBack = () => {
    navigation.goBack();
  };

  const handleEditRoom = async (values: IFormik) => {
    try {
      GlobalService.showLoading();
      const params = {
        title: values.roomName.trim(),
        description: values.roomDescription.trim(),
        start_time: moment(values.schedule).format('YYYY-MM-DD HH:mm:00'),
        type_room: typeRoom,
        type: values.roomType,
        user_ids: values.participants.map(item => item?.user_id ?? item?.id),
        media_type: typeMedia,
      };
      const res = await putUpdateRoom(data?.room?.id, params);
      goBack();
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <Header
        title={t('talk.titleEdit')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleEditRoom}
        // onSubmit={() => {}}
        validationSchema={lang === 2 ? validationVN : validation}>
        {({handleSubmit}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
            }}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingHorizontal: scaler(16),
                paddingBottom: scaler(82),
              }}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <RoomTypeCreate canEdit={isCanEdit} />
              {user?.role === 2 || user?.role === 3 ? (
                <RoomType
                  value={typeRoom}
                  disable={true}
                  valueMedia={typeMedia}
                />
              ) : null}
              <RoomNameCreate canEdit={isCanEdit} />
              <RoomScheduleCreate canEdit={isCanEdit} />
              {data?.room?.invite_all === true ? (
                <AppCheckBox active={data?.room?.invite_all} disable={true} />
              ) : null}
              {data?.room?.invite_all === false ? (
                <RoomParticipantsCreate />
              ) : null}
              {data?.room?.invite_all === false ? <MemberParticipant /> : null}
            </KeyboardAwareScrollView>
            <View
              style={{
                marginBottom: scaler(40),
                paddingHorizontal: scaler(16),
                marginTop: scaler(16),
              }}>
              <AppButton
                titleButton={t('talk.saveRoom')}
                onClick={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
