import {AppDatePicker} from '@component';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {CalculationMethod} from '../../DueDate/Calculate/_type';
import PickerOption from './Picker';
import ImageOption from './ImageOption';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

export type TPickerOption = {
  id: number;
  title: string;
  value: string;
};

export type TState = {
  page: number;
  isShowTidaSuggestion: boolean;
  dmy: string;
  hour: string;
  name: string;
  sex: string;
  deliver: string;
  weight: string;
  height: string;
  avatar: [];
};

type TProps = {
  state: TState;
  setState: ({}) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onDone: () => void;
  sex: TPickerOption[];
  deliver: TPickerOption[];
  onValidate: () => boolean;
};

const Information = (props: TProps) => {
  const {
    state,
    setState,
    onNextPage,
    onPreviousPage,
    onDone,
    sex,
    deliver,
    onValidate,
  } = props;
  const {t} = useTranslation();

  const renderData = () => {
    switch (state.page) {
      case 1:
        return (
          <View style={styles.container}>
            <AppDatePicker
              onChange={(date: any) => setState({dmy: date})}
              dataDate={state.dmy}
              textColor={colors.black}
              style={{backgroundColor: colors.white}}
              maximumDate={new Date()}
              width={SCREEN_WIDTH}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <AppDatePicker
              onChange={(time: any) => setState({hour: time})}
              dataDate={state.hour}
              textColor={colors.black}
              mode={'time'}
              style={{backgroundColor: colors.white}}
              width={SCREEN_WIDTH}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.container}>
            <TextInput
              placeholder={t('newBorn.babyName')}
              value={state.name}
              style={styles.wrapInputContainer}
              autoFocus={true}
              onChangeText={text => {
                setState({name: text});
              }}
            />
            {onValidate() && (
              <Text style={styles.errorMsg}>
                {t('newBornErrorMsg.specialName')}
              </Text>
            )}
          </View>
        );
      case 4:
        return (
          <View style={styles.container}>
            <PickerOption
              data={sex}
              setState={setState}
              type={'sex'}
              state={state}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.container}>
            <PickerOption
              data={deliver}
              setState={setState}
              type={'deliver'}
              state={state}
            />
          </View>
        );
      case 6:
        return (
          <View style={[styles.container, {flexDirection: 'row'}]}>
            <TextInput
              value={state.weight}
              placeholder={t('newBorn.babyWeight')}
              style={styles.wrapInputContainer}
              autoFocus={true}
              onChangeText={text => {
                setState({weight: text});
              }}
              keyboardType="decimal-pad"
            />
            <Text>kg</Text>
          </View>
        );
      case 7:
        return (
          <View style={[styles.container, {flexDirection: 'row'}]}>
            <TextInput
              value={state.height}
              placeholder={t('newBorn.babyHeight')}
              style={styles.wrapInputContainer}
              autoFocus={true}
              onChangeText={text => {
                setState({height: text});
              }}
              keyboardType="decimal-pad"
            />
            <Text>cm</Text>
          </View>
        );
      case 8:
        return (
          <View style={styles.container}>
            <ImageOption setState={setState} state={state} />
          </View>
        );
      case 9:
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={onDone}
              style={styles.wrapNextButtonContainer}>
              <Text style={styles.nextButtonTitle}>{t('newBorn.done')}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={onNextPage}
              style={styles.wrapNextButtonContainer}>
              <Text style={styles.nextButtonTitle}>{t('newBorn.yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPreviousPage}
              style={styles.wrapPreviousButtonContainer}>
              <Text style={styles.previousButtonTitle}>{t('newBorn.no')}</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return <View style={styles.container}>{renderData()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: scaler(12),
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
  wrapNextButtonContainer: {
    width: '100%',
    backgroundColor: colors.primaryBackground,
    padding: scaler(16),
    alignItems: 'center',
    borderRadius: scaler(40),
    marginTop: scaler(62),
  },
  nextButtonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  previousButtonTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  wrapPreviousButtonContainer: {
    width: '100%',
    backgroundColor: colors.cancelBackground,
    padding: scaler(16),
    alignItems: 'center',
    borderRadius: scaler(40),
    marginTop: scaler(12),
  },
  wrapInputContainer: {
    padding: scaler(12),
    fontSize: 16,
    fontWeight: '400',
    height: '50%',
  },
  errorMsg: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: colors.red50,
  },
});

export default Information;
