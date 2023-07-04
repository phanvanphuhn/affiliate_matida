import {SvgCalendar} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {getUseField} from '@util';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {AppButton} from '../AppButton';
import {AppModal} from '../AppModal';
import {RoomButtonSelect} from './RoomButtonSelect';

type Props = {
  canEdit?: boolean;
};

export const RoomScheduleCreate = ({canEdit = true}: Props) => {
  const {t} = useTranslation();

  const {value, setValue, error, touched} = getUseField('schedule');
  const lang = useSelector((state: any) => state?.auth?.lang);
  const modal = useRef<any>(null);
  const showError = !!error && !!touched;

  const [date, setDate] = useState<Date>(
    !!value ? new Date(value) : new Date(),
  );

  const [visible, setVisible] = useState<boolean>(false);

  const handleSave = (dateConfirm: Date) => {
    setValue(moment(dateConfirm).format());
    setDate(dateConfirm);
    // modal.current?.close();
    setVisible(false);
  };

  const heightModal = scaler(300);

  return (
    <>
      <View style={s.container}>
        <Text style={s.textTitle}>
          {t('talk.schedule')}
          <Text style={{color: colors.brandMainPinkRed}}>*</Text>
        </Text>
        <RoomButtonSelect
          icon={<SvgCalendar color={colors.brandMainPinkRed} size={24} />}
          label={
            !!value
              ? moment(value).format('LT - DD/MM/YYYY')
              : t('talk.selectTime')
          }
          // onPress={() => modal.current?.open()}
          onPress={() => canEdit && setVisible(true)}
          // onPress={() => navigate(ROUTE_NAME.DATE_PICKER_SCREEN)}
        />
        {showError && <Text style={s.error}>{error}</Text>}
        {/* <AppModal
        position="bottom"
        ref={modal}
        modalSize={{
          height: scaler(300),
          width: widthScreen,
        }}>
        <View style={{padding: scaler(16)}}>
          <View style={{}}>
            <Text
              style={{
                fontSize: scaler(16),
                textAlign: 'center',
                color: colors.primary,
                ...stylesCommon.fontWeight700,
              }}>
              {moment(date).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
          <View style={[s.viewDatePicker]}>
            <DatePicker
              date={date}
              onDateChange={date => {
                setDate(date);
                // onChange(date);
              }}
              mode="datetime"
              textColor={colors.black}
              maximumDate={new Date('2100-12-31')}
              minimumDate={new Date()}
              androidVariant="iosClone"
              fadeToColor="none"
              dividerHeight={0}
              style={{
                height: Platform.OS === 'ios' ? scaler(150) : scaler(142),
                flex: 1,
                // backgroundColor: 'red',
              }}
              locale={lang === 1 ? 'en' : 'vi'}
            />
          </View>
          <AppButton titleButton={t('talk.select')} onClick={handleSave} />
        </View>
      </AppModal> */}
        <DatePicker
          modal
          date={date}
          onDateChange={date => {
            setDate(date);
            // onChange(date);
          }}
          mode="datetime"
          textColor={colors.black}
          // maximumDate={new Date('2100-12-31')}
          minimumDate={new Date()}
          androidVariant="iosClone"
          dividerHeight={0}
          style={{
            height: Platform.OS === 'ios' ? scaler(150) : scaler(142),
            flex: 1,
            // backgroundColor: 'red',
          }}
          locale={lang === 1 ? 'en' : 'vi'}
          // minuteInterval={10}
          open={visible}
          onConfirm={handleSave}
          onCancel={() => setVisible(false)}
          is24hourSource="device"
          // fadeToColor={'red'}
          theme="light"
        />

        {/* <Modal
          transparent={true}
          visible={visible}
          onRequestClose={() => {}}
          animationType="fade">
          <View style={s.containerModal}>
            <View
              style={s.viewOut}
              //@ts-ignore
              onStartShouldSetResponder={() => setVisible(false)}
            />
            <View style={[s.containerViewModal, {height: heightModal}]}>
              <View style={{padding: scaler(16)}}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: scaler(16),
                      textAlign: 'center',
                      color: colors.primary,
                      ...stylesCommon.fontWeight700,
                    }}>
                    {moment(date).format('HH:mm - DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={[s.viewDatePicker]}>
                  <DatePicker
                    date={date}
                    onDateChange={date => {
                      setDate(date);
                      // onChange(date);
                    }}
                    mode="datetime"
                    textColor={colors.black}
                    maximumDate={new Date('2100-12-31')}
                    minimumDate={new Date()}
                    androidVariant="iosClone"
                    fadeToColor="none"
                    dividerHeight={0}
                    minuteInterval={5}
                    style={{
                      height: Platform.OS === 'ios' ? scaler(150) : scaler(142),
                      flex: 1,
                      // backgroundColor: 'red',
                    }}
                    locale={lang === 1 ? 'en' : 'vi'}
                    is24hourSource="device"
                  />
                </View>
                <AppButton
                  titleButton={t('talk.select')}
                  onClick={handleSave}
                />
              </View>
            </View>
          </View>
        </Modal> */}
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    paddingTop: scaler(4),
    paddingBottom: scaler(20),
    marginBottom: scaler(20),
    borderBottomColor: colors.gray,
    borderBottomWidth: scaler(1),
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  viewDatePicker: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    // flex: 1,
    paddingVertical: scaler(16),
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    paddingHorizontal: scaler(16),
  },
  error: {
    marginTop: scaler(4),
    color: colors.red,
    fontSize: scaler(12),
  },
});
