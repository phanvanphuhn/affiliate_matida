import {goBack, navigate} from '@navigation';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
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
  selectDueDate,
} from '@services';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {trackBirthdateEvent} from '@services/webengageManager';
import {showMessage} from 'react-native-flash-message';

const AddNewBaby = (props: any) => {
  const {route} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {t} = useTranslation();

  const [state, setState] = useDetailPost({
    name: '',
    due_date: '',
    avatar: '',
    pregnant_type: 'singleton',
  });

  const onChooseDueDate = () => {
    const params = {
      isAddNewBaby: true,
      setState: setState,
    };
    navigate(ROUTE_NAME.CHOOSE_DUE_DATE_APP, params);
  };

  const onCancel = () => {
    navigate(ROUTE_NAME.TAB_HOME);
  };

  const onSave = async () => {
    GlobalService.showLoading();
    const params = {
      user_id: user?.id,
      name: state.name,
      due_date: moment(state.due_date).format('YYYY/MM/DD'),
      avatar: state.avatar,
      pregnant_type: 'singleton',
    };
    try {
      const response = await createBaby(params);
      let res;
      if (route?.params?.type == 'Caculate') {
        res = await calculateDate(state?.body);
      } else {
        res = await selectDueDate({
          due_date: moment(state.due_date).format('MM/DD/YYYY'),
        });
      }
      trackBirthdateEvent(moment(state.due_date).format('MM/DD/YYYY'), false);
      if (res.success && response.success) {
        showMessage({
          message: res?.data?.message,
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
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
      }
      GlobalService.hideLoading();
    } catch (error) {
      showMessage({
        message: 'Upload failed',
        type: 'default',
        backgroundColor: colors.error_message,
      });
      GlobalService.hideLoading();
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.wrapContainer}>
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
            {t('newBorn.babyName')}
          </Text>
          <TextInput
            placeholder={t('newBorn.babyName')}
            value={state.name}
            onChangeText={text => setState({name: text})}
          />
        </View>
        <View style={styles.wrapContent}>
          <Text style={[styles.label, {marginBottom: scaler(8)}]}>
            {t('profileSettings.dueDate')}
          </Text>
          <TouchableOpacity
            style={styles.wrapContentContainer}
            onPress={onChooseDueDate}>
            <Text
              style={[
                styles.label,
                state.due_date.length > 0
                  ? {
                      fontSize: scaler(14),
                      fontWeight: '400',
                      color: colors.black,
                    }
                  : {fontSize: scaler(14), fontWeight: '400', color: '#A3A1AB'},
              ]}>
              {state.due_date.length > 0
                ? moment(state.due_date).format('DD/MM/YYYY')
                : t('newBorn.whichDate')}
            </Text>
            <Image
              source={iconCalendarGrey}
              style={{height: scaler(24), width: scaler(24)}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.wrapContentContainer,
          {
            paddingTop: scaler(16),
            paddingHorizontal: scaler(16),
            paddingBottom: scaler(32),
            borderTopWidth: 0.5,
            borderColor: colors.borderColor,
          },
        ]}>
        <TouchableOpacity style={styles.wrapButtonContainer} onPress={onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.wrapButtonContainer,
            {backgroundColor: colors.primary},
          ]}
          onPress={onSave}
          disabled={!state.name || !state.due_date}>
          <Text style={{color: colors.white, fontWeight: '500'}}>Save</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: '600',
  },
  desc: {
    fontSize: scaler(14),
    fontWeight: '400',
    color: colors.labelColor,
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '500',
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
});

export default AddNewBaby;
