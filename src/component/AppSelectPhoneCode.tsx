import {scaler, colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const AppSelectPhoneCode = React.memo((props: any) => {
  const {onChangeFlag, defaultCode, disable, value} = props;
  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    onChangeFlag('84');
  }, []);

  const onSelectFlag = (country: any) => {
    setCountryCode(country?.cca2);
    onChangeFlag(country?.callingCode[0] || '84', country?.cca2);
  };

  useEffect(() => {
    setCountryCode(defaultCode);
  }, [defaultCode]);

  return (
    <View style={styles.container}>
      {disable === true ? (
        <Text style={styles.txtValue}>+{value}</Text>
      ) : (
        <CountryPicker
          theme={{
            fontSize: scaler(14),
            ...stylesCommon.fontWeight500,
          }}
          withCallingCode={true}
          withCallingCodeButton={true}
          //@ts-ignore
          countryCode={countryCode || 'AU'}
          withFlagButton={false}
          onSelect={onSelectFlag}
          withFilter={true}
          containerButtonStyle={styles.viewPicker}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: scaler(76),
    height: scaler(54),
    borderRadius: scaler(8),
    backgroundColor: colors.gray100,
    marginRight: scaler(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPicker: {
    width: scaler(76),
    height: scaler(54),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtValue: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
  },
});

export {AppSelectPhoneCode};
