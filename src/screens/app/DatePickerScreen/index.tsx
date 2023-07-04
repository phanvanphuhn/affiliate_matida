import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import {useUXCam} from '@util';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
export const DatePickerScreen = () => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [date, setDate] = useState<Date>(new Date());

  useUXCam(ROUTE_NAME.DATE_PICKER_SCREEN);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.transparent,
        justifyContent: 'flex-end',
      }}>
      <View style={{height: '50%', backgroundColor: colors.white}}>
        <DatePicker
          date={date}
          onDateChange={date => {
            setDate(date);
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
          }}
          locale={lang === 1 ? 'en' : 'vi'}
        />
      </View>
    </View>
  );
};
