import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../app/Forum/components/useDetailPost';
import ProcessBar from './components/ProcessBar';
import Title from './components/Title';
import Information from './components/Information';
import Button from './components/Button';
import {event, eventType, trackingAppEvent} from '@util';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {navigate} from '@navigation';
import {
  calculateDate,
  createBaby,
  selectBabyDate,
  selectDueDate,
  updateBaby,
  updateUserInfo,
} from '@services';
import {ROUTE_NAME} from '@routeName';
import Toast from 'react-native-toast-message';
import {
  SvgArrowCircleRight,
  SvgArrowRightContained,
  SvgArrowRightWithTail,
  iconCloudSuggestion,
  iconNewBornTida,
} from '@images';
import {getMethod} from '../DueDate/Calculate/handle';
import {saveDataUser} from '@redux';

const OnboardingV2 = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const dispatch = useDispatch();

  const listMethod = getMethod();

  const [state, setState] = useDetailPost({
    page: 0,
    isShowTidaSuggestion: false,
    dmy: new Date(),
    hour: new Date(),
    name: '',
    sex: 'male',
    deliver: 'natural_birth',
    weight: '',
    height: '',
    avatar: '',
    isKnowDueDate: true,
    method: listMethod[0].value,
    cycleLength: 'TWENTY_EIGHT',
    daysIVF: 'IVF3',
    isNewBorn: true,
  });

  const sex = [
    {
      id: 1,
      value: 'male',
      title: 'Boy',
    },
    {
      id: 2,
      value: 'female',
      title: 'Girl',
    },
  ];

  const deliver = [
    {
      id: 1,
      value: 'natural_birth',
      title: 'Natural birth',
    },
    {
      id: 2,
      value: 'c_section',
      title: 'C section',
    },
  ];

  const onNewBornTida = () => {
    setState({isShowTidaSuggestion: true});
    const tout = setTimeout(() => {
      clearTimeout(tout);
      setState({isShowTidaSuggestion: false});
    }, 5000);
  };

  const onNextPage = () => {
    switch (state.page) {
      case 0:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_HAS_YOUR_BABY_BORN,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 1:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BIRTH_DAY,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 2:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BIRTH_TIME,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 3:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BABY_NAME,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 4:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BABY_GENDER,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 5:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BIRTH_METHOD,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 6:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BIRTH_WEIGHT,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case 7:
        trackingAppEvent(
          event.NEW_BORN.REPORT_BIRTH_BIRTH_HEIGHT,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
    }
    setState({page: state.page + 1});
  };

  const onPreviousPage = () => {
    if (state.page == 10) {
      setState({page: 0});
    } else if (state.page > 0) {
      setState({page: state.page - 1});
    } else {
      setState({page: 10});
    }
  };

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const onValidate = () => {
    if (state.name.length && specialChars.test(state.name)) {
      return true;
    } else {
      return false;
    }
  };
  const onDone = async () => {
    trackingAppEvent(
      event.NEW_BORN.REPORT_BIRTH_DONE_TELL_ME_MORE,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    let params;
    if (state.isNewBorn) {
      params = {
        user_id: user?.id,
        name: state.name.toString(),
        gender: state.sex.toLowerCase(),
        birth_experience: state.deliver,
        date_of_birth:
          moment.utc(state.dmy).format('YYYY/MM/DD') +
          ' ' +
          moment.utc(state.hour).format('HH:mm:ss'),
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
    } else if (state.isKnowDueDate) {
      params = {
        user_id: user?.id,
        name: state.name.toString(),
        avatar: state.avatar,
        due_date: moment.utc(state.dmy).format('YYYY/MM/DD'),
      };
    } else {
      const body = {
        calc_method: 0,
        date: moment(state.dmy).format('MM/DD/YYYY'),
        cycle_length: state.cycleLength,
      };

      const body2 = {
        calc_method: 1,
        date: moment(state.dmy).format('MM/DD/YYYY'),
        ivf_day: state.daysIVF,
      };

      const res = await calculateDate(
        state.method === 'FIRST_DAY_OF_LAST_PERIOD' ? body : body2,
      );

      params = {
        user_id: user?.id,
        name: state.name.toString(),
        avatar: state.avatar,
        due_date: moment(
          res?.data?.resultPeriod?.dueDate
            ? res?.data?.resultPeriod?.dueDate
            : res?.data?.resultIVF?.dueDate,
          'MM/DD/YYYY',
        ).format('MM/DD/YYYY'),
      };
    }

    const paramsData = {
      id: user?.babies[0]?.id,
      body: params,
    };

    try {
      const response = await updateBaby(paramsData);
      const res = await selectBabyDate({
        id: response?.data?.id,
        date: moment
          .utc(
            state.isKnowDueDate ? state.dmy : response?.data?.due_date,
            state.isKnowDueDate ? 'MM/DD/YYYY' : 'YYYY/MM/DD',
          )
          .format('YYYY-MM-DD'),
      });
      if (state.page > 10) {
        const res1 = await selectDueDate({
          due_date: moment(
            state.isKnowDueDate ? state.dmy : response?.data?.due_date,
            state.isKnowDueDate ? 'MM/DD/YYYY' : 'YYYY/MM/DD',
          ).format('MM/DD/YYYY'),
        });
      }
      if (res.success && response.success) {
        navigate(ROUTE_NAME.AUTH_ADD_BABY_SUCCESS, {
          data: res.data,
          state: state,
        });
      } else {
        Toast.show({
          visibilityTime: 4000,
          text1: t('error.addNewBornFail') as string,
          text1NumberOfLines: 2,
          position: 'top',
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        visibilityTime: 4000,
        text1: t('error.addNewBornFail') as string,
        text1NumberOfLines: 2,
        position: 'top',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    setState({isShowTidaSuggestion: false});
  }, [state.page]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {state.page > 0 && state.page !== 9 ? (
        <ProcessBar page={state.page} />
      ) : null}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View
          style={[
            styles.wrapTitleContainer,
            (state.page > 0 && state.page < 9) || state.page == 12
              ? {marginTop: scaler(60)}
              : {marginTop: scaler(98)},
          ]}>
          <Title page={state.page} isKnowDueDate={state.isKnowDueDate} />
        </View>

        <View style={styles.wrapBodyContainer}>
          <Information
            state={state}
            setState={setState}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onDone={onDone}
            sex={sex}
            deliver={deliver}
            onValidate={onValidate}
          />
        </View>

        <View style={styles.wrapBottomContainer}>
          {state.page > 0 && state.page < 14 && state.page !== 9 && (
            <Button
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
              state={state}
              onValidate={onValidate}
              setState={setState}
              onDone={onDone}
            />
          )}

          <TouchableOpacity onPress={onNewBornTida} activeOpacity={0.9}>
            {state.isShowTidaSuggestion ? (
              <View style={styles.wrapSuggestion}>
                <Image source={iconCloudSuggestion} style={styles.suggestion} />
                <Text style={styles.suggestionTitle}>
                  {t('newBorn.tidaDesc')}
                </Text>
              </View>
            ) : null}
            <Image source={iconNewBornTida} style={styles.button} />
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
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  wrapTitleContainer: {
    alignItems: 'center',
  },
  wrapBottomContainer: {
    alignItems: 'center',
  },
  button: {
    height: scaler(232),
    width: scaler(232),
  },
  wrapSuggestion: {
    position: 'absolute',
    bottom: scaler(212),
    zIndex: 999,
    right: scaler(-6),
  },
  suggestion: {
    width: scaler(246),
    height: scaler(83),
  },
  suggestionTitle: {
    fontSize: 12,
    ...stylesCommon.fontWeight500,
    position: 'absolute',
    textAlign: 'center',
    padding: scaler(16),
  },
  wrapBodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 150,
  },
});

export default OnboardingV2;
