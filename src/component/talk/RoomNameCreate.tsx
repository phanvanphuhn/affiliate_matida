import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getUseField} from '@util';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
type Props = {
  canEdit?: boolean;
};
export const RoomNameCreate = ({canEdit = true}: Props) => {
  const {t} = useTranslation();

  const {
    value: valueName,
    setValue: setValueName,
    error: errorName,
    touched: touchedName,
  } = getUseField('roomName');
  const {
    value: valueDescription,
    setValue: setValueDescription,
    error: errorDescription,
    touched: touchedDescription,
  } = getUseField('roomDescription');

  const isErrorName = !!errorName && !!touchedName;
  const isErrorDescription = !!errorDescription && !!touchedDescription;

  const refInput = useRef<TextInput>(null);
  return (
    <View>
      <Text style={s.textTitle}>
        {t('talk.roomName')}
        <Text style={{color: colors.brandMainPinkRed}}>*</Text>
      </Text>
      <View>
        <TextInput
          style={[
            s.input,
            s.viewInput,
            {
              height: undefined,
              paddingVertical: scaler(16),
            },
          ]}
          placeholder={t('talk.roomName') as string}
          maxLength={200}
          value={valueName}
          onChangeText={setValueName}
        />
        {isErrorName && <Text style={s.error}>{errorName}</Text>}
        <TouchableOpacity
          style={[
            s.viewInput,
            {
              paddingTop: Platform.OS === 'ios' ? scaler(16) : 0,
              paddingLeft: Platform.OS === 'ios' ? scaler(12) : scaler(8),
            },
          ]}
          activeOpacity={1}
          onPress={() => refInput.current?.focus()}>
          <View style={{}} />
          <TextInput
            ref={refInput}
            style={[
              s.input,
              {
                paddingVertical: Platform.OS === 'ios' ? 0 : scaler(16),
                marginBottom: Platform.OS === 'ios' ? scaler(4) : 0,
              },
            ]}
            placeholder={t('talk.roomDes') as string}
            maxLength={1000}
            multiline
            value={valueDescription}
            onChangeText={setValueDescription}
          />
        </TouchableOpacity>
        {isErrorDescription && <Text style={s.error}>{errorDescription}</Text>}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  viewInput: {
    backgroundColor: '#F6F6F6',
    height: Platform.OS === 'ios' ? scaler(120) : scaler(116),
    borderRadius: scaler(8),
    marginVertical: scaler(8),
    paddingLeft: scaler(12),
    paddingRight: scaler(12),
    //
  },
  input: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.textColor,
    textAlignVertical: 'top',
  },
  error: {
    marginBottom: scaler(4),
    color: colors.red,
    fontSize: scaler(12),
  },
});
