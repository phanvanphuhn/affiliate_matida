import React, {useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {DefaultTFuncReturn} from 'i18next';
import {useSelector} from 'react-redux';

import {colors, scaler, stylesCommon} from '@stylesCommon';

interface AppDatePickerProps {
  title?: string | DefaultTFuncReturn;
  onChange: any;
  minimumDate?: any;
  dataDate?: any;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  mode?: 'date' | 'time' | 'datetime';
  is24hourSource?: 'locale' | 'device';
}

export const AppDatePicker = ({
  title,
  onChange,
  minimumDate,
  dataDate,
  style,
  textColor,
  mode,
  is24hourSource,
}: AppDatePickerProps) => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [date, setDate] = useState(new Date());
  return (
    <View
      style={[
        styles.container,
        {paddingTop: title ? scaler(20) : scaler(32)},
        {
          height:
            Platform.OS === 'ios'
              ? title
                ? scaler(159)
                : scaler(139)
              : title
              ? scaler(179)
              : scaler(169),
        },
        style,
      ]}>
      {!!title && <Text style={styles.textTitle}>{title}</Text>}
      <View style={[styles.viewDatePicker]}>
        <DatePicker
          date={dataDate ? dataDate : date}
          onDateChange={date => {
            setDate(date);
            onChange(date);
          }}
          mode={mode ? mode : 'date'}
          textColor={textColor ? textColor : colors.white}
          maximumDate={new Date('2100-12-31')}
          minimumDate={minimumDate}
          androidVariant="iosClone"
          fadeToColor="none"
          dividerHeight={0}
          style={{
            height: Platform.OS === 'ios' ? scaler(127) : scaler(115),
            flex: 1,
          }}
          locale={lang === 1 ? 'en' : 'vi'}
          is24hourSource={is24hourSource}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pink50,
    borderRadius: scaler(8),
    paddingHorizontal: scaler(28),
    paddingBottom: Platform.OS === 'ios' ? 0 : scaler(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDatePicker: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  textTitle: {
    alignSelf: 'flex-start',
    ...stylesCommon.fontWeight500,
    fontSize: scaler(12),
    color: colors.white,
    marginBottom: Platform.OS === 'ios' ? 0 : scaler(20),
    lineHeight: 15,
  },
});
