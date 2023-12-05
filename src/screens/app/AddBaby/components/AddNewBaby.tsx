import {goBack, navigate} from '@navigation';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../Forum/components/useDetailPost';
import ImageOption from '../../NewBorn/components/ImageOption';
import {iconCalendar, iconCalendarGrey} from '@images';
import {ROUTE_NAME} from '@routeName';
import moment from 'moment';
import {
  GlobalService,
  calculateDate,
  createBaby,
  selectBabyDate,
  selectDueDate,
  updateBaby,
} from '@services';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {trackBirthdateEvent} from '@services/webengageManager';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddNewBaby = (props: any) => {
  const {route} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {t} = useTranslation();

  const [state, setState] = useDetailPost({
    id: route?.params?.name ? route?.params?.id : '',
    name: route?.params?.name ? route?.params?.name : '',
    due_date: route?.params?.due_date
      ? moment.utc(route?.params?.due_date).format('MM/DD/YYYY')
      : '',
    avatar: route?.params?.avatar ? route?.params?.avatar : '',
    pregnant_type: 'singleton',
    isEdit: route?.params?.name ? true : false,
    error: {},
  });

  const onChooseDueDate = () => {
    const params = {
      isAddNewBaby: true,
      state: state,
      setState: setState,
    };
    navigate(ROUTE_NAME.CHOOSE_DUE_DATE_APP, params);
  };

  const onCancel = () => {
    navigate(ROUTE_NAME.TAB_HOME);
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

    if (state.due_date.length < 1) {
      formIsValid = false;
      formErrors['due_date'] = t('newBornErrorMsg.requireDueDate');
    }

    setState({error: formErrors});
    return formIsValid;
  };

  const onSave = async () => {
    const params = {
      user_id: user?.id,
      name: state.name,
      due_date: moment.utc(state.due_date, 'MM/DD/YYYY').format('YYYY/MM/DD'),
      avatar: state.avatar,
      pregnant_type: 'singleton',
    };
    const updateParams = {
      id: state.id,
      body: {
        user_id: user?.id,
        name: state.name,
        due_date: moment.utc(state.due_date, 'MM/DD/YYYY').format('YYYY/MM/DD'),
        avatar: state.avatar,
        pregnant_type: 'singleton',
      },
    };
    if (onValidateForm()) {
      try {
        GlobalService.showLoading();
        let response;
        if (state?.isEdit) {
          response = await updateBaby(updateParams);
        } else {
          response = await createBaby(params);
        }
        let res;
        if (route?.params?.type == 'Caculate') {
          res = state?.body;
        } else {
          res = await selectBabyDate({
            id: response?.data?.id,
            date: moment.utc(state.due_date, 'MM/DD/YYYY').format('MM/DD/YYYY'),
          });
        }
        trackBirthdateEvent(moment(state.due_date).format('MM/DD/YYYY'), false);
        if (res.success && response?.success) {
          showMessage({
            message: t('newBorn.happyPreggy'),
            type: 'default',
            backgroundColor: colors.success_message,
          });
          navigate(ROUTE_NAME.RESULT_DUE_DATE_APP, {
            data: res?.data,
            type: route?.params?.type ? route?.params?.type : 'Choose',
            isAddNewBaby: true,
          });
        } else {
          showMessage({
            message: t('error.addNewBornFail'),
            type: 'default',
            backgroundColor: colors.success_message,
          });
        }
        GlobalService.hideLoading();
      } catch (error) {
        showMessage({
          message: t('error.addNewBornFail'),
          type: 'default',
          backgroundColor: colors.error_message,
        });
        GlobalService.hideLoading();
      }
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.wrapContainer]}>
          <Text
            style={[
              styles.title,
              {marginTop: scaler(48), marginBottom: scaler(16)},
            ]}>
            {t('newBorn.happyPreggy')}
          </Text>
          <Text style={[styles.desc, {marginBottom: scaler(32)}]}>
            {t('newBorn.tellMeMore')}
          </Text>
          <ImageOption state={state} setState={setState} />
          <Text
            style={[
              styles.label,
              {marginBottom: scaler(24), marginTop: scaler(16)},
            ]}>
            {t('newBorn.babyPicture')}
          </Text>

          <View style={[styles.wrapContent, {marginBottom: scaler(24)}]}>
            <Text style={[styles.label, {marginBottom: scaler(8)}]}>
              {t('newBorn.name')}
            </Text>
            <TextInput
              placeholder={t('newBorn.babyName')}
              value={state.name}
              onChangeText={text => setState({name: text})}
              placeholderTextColor={'lightgray'}
            />
            {state?.error?.name?.length > 0 && (
              <Text style={styles.errorMsg}>{state.error.name}</Text>
            )}
          </View>

          <View style={styles.wrapContent}>
            <Text style={[styles.label, {marginBottom: scaler(8)}]}>
              {t('newBorn.dueDate')}
            </Text>
            <TouchableOpacity
              style={styles.wrapContentContainer}
              onPress={onChooseDueDate}>
              <TextInput
                editable={false}
                placeholder={t('newBorn.addDueDate')}
                value={
                  state.due_date
                    ? moment
                        .utc(state.due_date, 'MM/DD/YYYY')
                        .format('DD/MM/YYYY')
                    : ''
                }
                placeholderTextColor={'lightgray'}
              />
              <Image
                source={iconCalendarGrey}
                style={{height: scaler(24), width: scaler(24)}}
              />
            </TouchableOpacity>
            {state?.error?.due_date?.length > 0 && (
              <Text style={styles.errorMsg}>{state.error.due_date}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.wrapContentContainer,
            {
              paddingTop: scaler(16),
              paddingHorizontal: scaler(16),
              paddingBottom: scaler(32),
              borderTopWidth: 0.25,
              borderColor: colors.borderColor,
            },
          ]}>
          <TouchableOpacity
            style={styles.wrapButtonContainer}
            onPress={onCancel}>
            <Text>{t('newBorn.cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.wrapButtonContainer,
              {backgroundColor: colors.primary},
            ]}
            onPress={onSave}
            // disabled={!state.name || !state.due_date}
          >
            <Text style={{color: colors.white, ...stylesCommon.fontWeight500}}>
              {t('newBorn.save')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapContainer: {
    flex: 1,
    alignItems: 'center',
    padding: scaler(16),
  },
  title: {
    fontSize: scaler(24),
    ...stylesCommon.fontWeight600,
  },
  desc: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.labelColor,
  },
  label: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    color: '#85828C',
  },
  wrapContent: {
    width: '100%',
  },
  wrapContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapButtonContainer: {
    width: '48%',
    padding: scaler(16),
    justifyContent: 'center',
    backgroundColor: colors.gray350,
    alignItems: 'center',
    borderRadius: scaler(40),
  },
  errorMsg: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    color: colors.red50,
    marginTop: scaler(8),
  },
});

export default AddNewBaby;
