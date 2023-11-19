import {colors, scaler} from '@stylesCommon';
import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../Forum/components/useDetailPost';
import ImageOption from './ImageOption';
import BottomSheet, {
  BottomSheetModalProvider,
  SCREEN_WIDTH,
} from '@gorhom/bottom-sheet';
import {goBack, navigate} from '@navigation';
import {iconCalendarGrey, iconChevronDown, iconClockGrey} from '@images';
import {ROUTE_NAME} from '@routeName';
import {TBaby} from '../../Home/components/BottomSheetNewBorn';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {createBaby, updateBaby} from '@services';
import BottomSheetContent from './BottomSheetContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal from '@component/BottomSheetModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {useSelector} from 'react-redux';

export const birth_experience = [
  {
    label: 'Natural birth',
    labelVi: 'Sinh thường',
    value: 'natural_birth',
  },
  {
    label: 'C section',
    labelVi: 'Sinh mổ',
    value: 'c_section',
  },
];

export const gender = [
  {
    label: 'Female',
    labelVi: 'Bé gái',
    value: 'female',
  },
  {
    label: 'Male',
    labelVi: 'Bé trai',
    value: 'male',
  },
];

const EditNewBorn = (props: any) => {
  const {route} = props;

  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [state, setState] = useDetailPost({
    name: route?.params?.name ? route?.params?.name : '',
    gender: route?.params?.gender ? route?.params?.gender : 'male',
    birth_experience: route?.params?.birth_experience
      ? route?.params?.birth_experience
      : 'c_section',
    dob: route?.params?.date_of_birth ? route?.params?.date_of_birth : '',
    tob: route?.params?.date_of_birth
      ? moment.utc(route?.params?.date_of_birth).format('HH:mm')
      : '',
    weight: route?.params?.weight
      ? (route?.params?.weight / 1000).toString()
      : '',
    height: route?.params?.height ? route?.params?.height.toString() : '',
    avatar: route?.params?.avatar ? route?.params?.avatar : '',
    typeBottomSheet: '',
    error: {},
  });

  const handleScheduleOrderSheetChanges = useCallback((index?: number) => {
    bottomSheetRef.current?.collapse();
  }, []);

  const handleCloseScheduleOrderBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const onOpenBottomSheet = (value: string) => {
    setState({typeBottomSheet: value});
    handleScheduleOrderSheetChanges();
  };

  const onSelectDataBottomSheet = (value: string) => {
    handleCloseScheduleOrderBottomSheet();
    switch (state.typeBottomSheet) {
      case 'gender':
        setState({gender: value});
        break;
      case 'birth_experience':
        setState({birth_experience: value});
        break;
      case 'dob':
        setState({dob: value});
        break;
      case 'tob':
        setState({tob: value});
        break;
    }
  };

  const dataBottomSheet = () => {
    switch (state.typeBottomSheet) {
      case 'gender':
        return gender;
      case 'birth_experience':
        return birth_experience;
      case 'dob':
      case 'tob':
        return [];
    }
  };

  const onValidateForm = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const formErrors: any = {};
    let formIsValid = true;

    if (state.name.length < 1) {
      formIsValid = false;
      formErrors['name'] = t('newBornErrorMsg.requireName');
    }

    if (state.name.length && specialChars.test(state.name)) {
      formIsValid = false;
      formErrors['name'] = t('newBornErrorMsg.specialName');
    }

    if (state.dob.length < 1) {
      formIsValid = false;
      formErrors['dob'] = t('newBornErrorMsg.requireDob');
    }

    if (state.tob.length < 1) {
      formIsValid = false;
      formErrors['tob'] = t('newBornErrorMsg.requireTob');
    }

    if (state.weight.length < 1) {
      formIsValid = false;
      formErrors['weight'] = t('newBornErrorMsg.requireWeight');
    }

    if (state.height.length < 1) {
      formIsValid = false;
      formErrors['height'] = t('newBornErrorMsg.requireHeight');
    }

    setState({error: formErrors});
    return formIsValid;
  };

  const onSave = async () => {
    const params = {
      id: route?.params.id,
      body: {
        name: state.name,
        gender: state.gender.toLowerCase(),
        birth_experience: state.birth_experience,
        date_of_birth:
          moment(state.dob).format('YYYY/MM/DD') +
          ' ' +
          moment(state.tob, 'HH:mm').format('HH:mm:ss'),
        weight: Number(
          state.weight.includes(',')
            ? state.weight.replace(',', '.') * 1000
            : state.weight * 1000,
        ),
        height: Number(
          state.height.includes(',')
            ? state.height.replace(',', '.')
            : state.height,
        ),
        avatar: state.avatar,
      },
    };
    const paramsAddBaby = {
      user_id: user?.id,
      name: state.name.toString(),
      gender: state.gender.toLowerCase(),
      birth_experience: state.birth_experience,
      date_of_birth:
        moment(state.dob).format('YYYY/MM/DD') +
        ' ' +
        moment(state.tob).format('HH:mm:ss'),
      weight: Number(
        state.weight.includes(',')
          ? state.weight.replace(',', '.') * 1000
          : state.weight * 1000,
      ),
      height: Number(
        state.height.includes(',')
          ? state.height.replace(',', '.')
          : state.height,
      ),
      avatar: state.avatar,
    };
    if (onValidateForm()) {
      try {
        if (route?.params?.isAddNewBaby) {
          const res = await createBaby(paramsAddBaby);
          if (res.success) {
            navigate(ROUTE_NAME.TAB_HOME);
          }
        } else {
          const res = await updateBaby(params);
          if (res.success) {
            navigate(ROUTE_NAME.TAB_HOME);
          }
        }
      } catch (error) {
        Toast.show({
          visibilityTime: 4000,
          text1: t('error.addNewBornFail'),
          text1NumberOfLines: 2,
          position: 'top',
          type: 'ERROR',
        });
      }
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1, backgroundColor: colors.white}}>
          <ScrollView
            style={styles.wrapContainer}
            showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center', marginTop: scaler(56)}}>
              <Text style={[styles.title, {marginBottom: scaler(8)}]}>
                {t('newBorn.happyParenting')}
              </Text>
              <Text style={[styles.content, {fontWeight: '400'}]}>
                {t('newBorn.tellMeMore')}
              </Text>

              <View style={{marginTop: scaler(32), alignItems: 'center'}}>
                <ImageOption state={state} setState={setState} />
                <Text style={[styles.label, {marginTop: scaler(16)}]}>
                  {t('newBorn.babyPicture')}
                </Text>
              </View>
            </View>

            <View>
              <View style={styles.wrapContent}>
                <Text style={[styles.label, state.error.name ? {} : {}]}>
                  {t('newBorn.name')}
                </Text>
                <TextInput
                  style={[styles.content, {fontWeight: '500'}]}
                  placeholder={t('newBorn.babyName')}
                  value={state.name}
                  onChangeText={text => {
                    setState({name: text});
                  }}
                />
                {state?.error?.name?.length > 0 && (
                  <Text style={styles.errorMsg}>{state.error.name}</Text>
                )}
              </View>

              <View style={styles.wrapContent}>
                <Text style={styles.label}>{t('newBorn.gender')}</Text>
                <TouchableOpacity
                  onPress={() => onOpenBottomSheet('gender')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.content, {fontWeight: '500'}]}>
                    {lang == 1
                      ? gender.filter(item => item.value == state.gender)[0]
                          ?.label
                      : gender.filter(item => item.value == state.gender)[0]
                          ?.labelVi}
                  </Text>

                  <Image
                    source={iconChevronDown}
                    style={{
                      height: scaler(24),
                      width: scaler(24),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.wrapContent,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View style={{flex: 1}}>
                  <Text style={[styles.label, state.error.dob ? {} : {}]}>
                    {t('newBorn.dob')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => onOpenBottomSheet('dob')}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.content,
                        {fontWeight: '500'},
                        state.dob
                          ? {
                              color: colors.black,
                            }
                          : {color: colors.borderColor},
                      ]}>
                      {state.dob
                        ? moment(state.dob).format('DD/MM/YYYY')
                        : t('newBorn.selectDate')}
                    </Text>

                    <Image
                      source={iconCalendarGrey}
                      style={{
                        height: scaler(24),
                        width: scaler(24),
                        marginRight: scaler(16),
                      }}
                    />
                  </TouchableOpacity>
                  {state?.error?.dob?.length > 0 && (
                    <Text style={styles.errorMsg}>{state.error.dob}</Text>
                  )}
                </View>

                <View style={{flex: 1}}>
                  <Text style={[styles.label, state.error.tob ? {} : {}]}>
                    {t('newBorn.tob')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => onOpenBottomSheet('tob')}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.content,
                        {fontWeight: '500'},
                        state.tob
                          ? {
                              color: colors.labelColor,
                            }
                          : {color: colors.borderColor},
                      ]}>
                      {state.tob
                        ? moment(state.tob, 'HH:mm').format('HH:mm')
                        : t('newBorn.selectTime')}
                    </Text>

                    <Image
                      source={iconClockGrey}
                      style={{
                        height: scaler(24),
                        width: scaler(24),
                      }}
                    />
                  </TouchableOpacity>
                  {state?.error?.tob?.length > 0 && (
                    <Text style={styles.errorMsg}>{state.error.tob}</Text>
                  )}
                </View>
              </View>

              <View
                style={[
                  styles.wrapContent,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View style={{flex: 1}}>
                  <Text style={[styles.label, state.error.weight ? {} : {}]}>
                    {t('newBorn.babyWeight')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={[styles.content, {fontWeight: '500', flex: 1}]}
                      placeholder="3.0"
                      value={state.weight}
                      onChangeText={text => {
                        setState({weight: text});
                      }}
                      keyboardType="numeric"
                    />
                    <Text
                      style={[
                        styles.label,
                        {marginRight: scaler(20), fontSize: scaler(14)},
                      ]}>
                      kg
                    </Text>
                  </View>
                  {state?.error?.weight?.length > 0 && (
                    <Text style={styles.errorMsg}>{state.error.weight}</Text>
                  )}
                </View>

                <View style={{flex: 1}}>
                  <Text style={[styles.label, state.error.height ? {} : {}]}>
                    {t('newBorn.babyHeight')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={[styles.content, {fontWeight: '500', flex: 1}]}
                      placeholder="80"
                      value={state.height}
                      onChangeText={text => {
                        setState({height: text});
                      }}
                      keyboardType="number-pad"
                    />
                    <Text style={[styles.label, {fontSize: scaler(14)}]}>
                      cm
                    </Text>
                  </View>
                  {state?.error?.height?.length > 0 && (
                    <Text style={styles.errorMsg}>{state.error.height}</Text>
                  )}
                </View>
              </View>

              <View style={styles.wrapContent}>
                <Text style={styles.label}>{t('newBorn.birthExperience')}</Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => onOpenBottomSheet('birth_experience')}>
                  <Text style={[styles.content, {fontWeight: '500'}]}>
                    {lang == 1
                      ? birth_experience.filter(
                          item => item.value == state.birth_experience,
                        )[0]?.label
                      : birth_experience.filter(
                          item => item.value == state.birth_experience,
                        )[0]?.labelVi}
                  </Text>

                  <Image
                    source={iconChevronDown}
                    style={{
                      height: scaler(24),
                      width: scaler(24),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapButtonContainer}>
              <TouchableOpacity
                style={styles.wrapCancelButton}
                onPress={() => goBack()}>
                <Text>{t('newBorn.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wrapSaveButton} onPress={onSave}>
                <Text style={{color: colors.white}}>{t('newBorn.save')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              onChange={handleScheduleOrderSheetChanges}
              animateOnMount={false}
              onClose={handleCloseScheduleOrderBottomSheet}
              enablePanDownToClose={true}>
              <BottomSheetContent
                data={dataBottomSheet()}
                onPress={onSelectDataBottomSheet}
                type={state.typeBottomSheet}
                state={state}
                setState={setState}
              />
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapContainer: {
    flex: 1,
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  content: {
    fontSize: scaler(14),
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#85828C',
    marginBottom: scaler(8),
  },
  wrapContent: {
    padding: scaler(16),
  },
  wrapButtonContainer: {
    flexDirection: 'row',
    padding: scaler(16),
    marginBottom: scaler(16),
    borderTopWidth: scaler(1),
    borderColor: colors.gray,
  },
  wrapCancelButton: {
    padding: scaler(16),
    backgroundColor: '#F6F6F9',
    width: '48%',
    marginRight: scaler(16),
    alignItems: 'center',
    borderRadius: scaler(40),
  },
  wrapSaveButton: {
    padding: scaler(16),
    backgroundColor: colors.primaryBackground,
    width: '48%',
    alignItems: 'center',
    borderRadius: scaler(40),
  },
  errorMsg: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: colors.red50,
    marginTop: scaler(8),
  },
});

export default EditNewBorn;
