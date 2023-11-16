import {AppDatePicker} from '@component';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {colors, scaler} from '@stylesCommon';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const BottomSheetContent = (props: any) => {
  const {onPress, data, type, state, setState} = props;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  return type == 'dob' ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }}>
      <AppDatePicker
        onChange={(date: any) => {
          setDate(date);
          setState({dob: date});
        }}
        // dataDate={state.dob}
        maximumDate={new Date(new Date().setMonth(new Date().getMonth() + 9))}
        textColor={colors.black}
        style={{backgroundColor: colors.white}}
        width={SCREEN_WIDTH}
      />
      <TouchableOpacity
        style={styles.wrapSaveButton}
        onPress={() => onPress(date)}>
        <Text style={{color: colors.white}}>{t('newBorn.save')}</Text>
      </TouchableOpacity>
    </View>
  ) : type == 'tob' ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }}>
      <AppDatePicker
        onChange={(time: any) => {
          setTime(time);
          setState({tob: time});
        }}
        // dataDate={state.tob}
        textColor={colors.black}
        mode={'time'}
        style={{backgroundColor: colors.white}}
        width={SCREEN_WIDTH}
      />
      <TouchableOpacity
        style={styles.wrapSaveButton}
        onPress={() => onPress(time)}>
        <Text style={{color: colors.white}}>{t('newBorn.save')}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    data?.map((item: any) => {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => onPress(item.value)}>
          <Text>{lang == 1 ? item.label : item.labelVi}</Text>
        </TouchableOpacity>
      );
    })
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaler(16),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
  },
  wrapSaveButton: {
    padding: scaler(16),
    backgroundColor: colors.primaryBackground,
    width: '48%',
    alignItems: 'center',
    borderRadius: scaler(40),
  },
});

export default BottomSheetContent;
