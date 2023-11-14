import {AppDatePicker} from '@component';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {colors, scaler} from '@stylesCommon';
import moment from 'moment';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomSheetContent = (props: any) => {
  const {onPress, data, type, state, setState} = props;
  return type == 'dob' ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }}>
      <AppDatePicker
        onChange={(date: any) =>
          setState({dob: moment(date).format('DD/MM/YYYY')})
        }
        // dataDate={state.dob}
        textColor={colors.black}
        style={{backgroundColor: colors.white}}
        maximumDate={new Date()}
        width={SCREEN_WIDTH}
      />
      <TouchableOpacity style={styles.wrapSaveButton} onPress={onPress}>
        <Text style={{color: colors.white}}>Save</Text>
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
        onChange={(time: any) =>
          setState({tob: moment(time).format('DD/MM/YYYY')})
        }
        // dataDate={state.tob}
        textColor={colors.black}
        mode={'time'}
        style={{backgroundColor: colors.white}}
        width={SCREEN_WIDTH}
      />
      <TouchableOpacity style={styles.wrapSaveButton} onPress={onPress}>
        <Text style={{color: colors.white}}>Save</Text>
      </TouchableOpacity>
    </View>
  ) : (
    data?.map((item: any) => {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => onPress(item.label)}>
          <Text>{item.label}</Text>
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
