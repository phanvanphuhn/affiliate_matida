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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../Forum/components/useDetailPost';
import ImageOption from './ImageOption';
import BottomSheet, {
  BottomSheetModalProvider,
  SCREEN_WIDTH,
} from '@gorhom/bottom-sheet';
import {goBack, navigate} from '@navigation';
import {iconChevronDown} from '@images';
import {ROUTE_NAME} from '@routeName';
import {TBaby} from '../../Home/components/BottomSheetNewBorn';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {updateBaby} from '@services';
import BottomSheetContent from './BottomSheetContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal from '@component/BottomSheetModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const birth_experience = [
  {
    label: 'Natural birth',
    value: 'natural_birth',
  },
  {
    label: 'C section',
    value: 'c_section',
  },
];

export const gender = [
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Male',
    value: 'male',
  },
];

const EditNewBorn = (props: any) => {
  const {route} = props;
  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [state, setState] = useDetailPost({
    name: route?.params?.name ? route?.params?.name : '',
    gender: route?.params?.gender ? route?.params?.gender : 'male',
    birth_experience: route?.params?.pregnant_type
      ? route?.params?.pregnant_type
      : 'c_section',
    dob: route?.params?.date_of_birth ? route?.params?.date_of_birth : '',
    tob: route?.params?.time_of_birth ? route?.params?.time_of_birth : '',
    weight: route?.params?.weight
      ? (route?.params?.weight / 1000).toString()
      : '',
    height: route?.params?.height ? route?.params?.height.toString() : '',
    avatar: route?.params?.avatar ? route?.params?.avatar : '',
    typeBottomSheet: '',
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

  const onSave = async () => {
    const params = {
      id: route?.params.id,
      body: {
        name: state.name,
        gender: state.gender.toLowerCase(),
        birth_experience: state.birth_experience,
        date_of_birth: state.dob,
        tob: state.tob,
        weight: Number(state.weight * 1000),
        height: Number(state.height),
        avatar: state.avatar,
      },
    };
    try {
      const res = await updateBaby(params);
      console.log('res: ', res);
    } catch (error) {
      Toast.show({
        visibilityTime: 4000,
        text1: t('error.uploadImageFail'),
        text1NumberOfLines: 2,
        position: 'top',
      });
    }
    // navigate(ROUTE_NAME.DETAIL_NEW_BORN);
  };

  console.log(
    'gender.filter(item => item.value == state.gender): ',
    gender.filter(item => item.value == state.gender)[0],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1, backgroundColor: colors.white}}>
          <View style={styles.wrapContainer}>
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
                <Text style={styles.label}>{t('newBorn.babyName')}</Text>
                <TextInput
                  style={[styles.content, {fontWeight: '500'}]}
                  placeholder="Bear"
                  value={state.name}
                  onChangeText={text => {
                    setState({name: text});
                  }}
                />
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
                    {gender.filter(item => item.value == state.gender)[0]
                      ?.label || 'Female'}
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
                  <Text style={styles.label}>{t('newBorn.dob')}</Text>
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
                        state.dob?.length > 0
                          ? {
                              color: colors.labelColor,
                            }
                          : {color: colors.borderColor},
                      ]}>
                      {state.dob ? state.dob : t('newBorn.selectDate')}
                    </Text>

                    <Image
                      source={iconChevronDown}
                      style={{
                        height: scaler(24),
                        width: scaler(24),
                        marginRight: scaler(16),
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.label}>{t('newBorn.tob')}</Text>
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
                        state.tob?.length > 0
                          ? {
                              color: colors.labelColor,
                            }
                          : {color: colors.borderColor},
                      ]}>
                      {state.tob ? state.tob : t('newBorn.selectTime')}
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

              <View
                style={[
                  styles.wrapContent,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>{t('newBorn.babyWeight')}</Text>
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
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.label}>{t('newBorn.babyHeight')}</Text>
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
                      keyboardType="numeric"
                    />
                    <Text style={[styles.label, {fontSize: scaler(14)}]}>
                      cm
                    </Text>
                  </View>
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
                    {birth_experience.filter(
                      item => item == state.birth_experience,
                    )[0]?.label || 'Natural birth'}
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
});

export default EditNewBorn;
