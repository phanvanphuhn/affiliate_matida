import {FeedBack} from '@constant';
import {useNavigation} from '@react-navigation/native';
import {changeStatusLogin} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  getQuestionOnboarding,
  GlobalService,
  postAnswerOnboarding,
} from '@services';
import {colors} from '@stylesCommon';
import {useUXCam} from '@util';
import {FormikProps} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {HelpComponent, TopicComponent} from './components';
import {IFormikFeedback} from './Onboarding.props';

export const OnboardingHook = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state?.auth?.lang);

  const [screen, setScreen] = useState<FeedBack>(FeedBack.HELP);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const formRef = useRef<FormikProps<IFormikFeedback>>(null);

  const help = data?.questions?.find(
    (element: any) => +element?.type === FeedBack.HELP,
  );

  const topics = data?.questions?.find(
    (element: any) => +element?.type === FeedBack.TOPIC,
  );

  useUXCam(ROUTE_NAME.ON_BOARDING);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getQuestionOnboarding();
      reactotron.log?.('OnboardingHook: ', res?.data);
      setData(res?.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const switchView = () => {
    switch (screen) {
      case FeedBack.HELP:
        return <HelpComponent data={help} />;
      case FeedBack.TOPIC:
        return <TopicComponent data={topics} />;
      default:
        return <></>;
    }
  };

  const getDisable = (values: IFormikFeedback) => {
    switch (screen) {
      case FeedBack.HELP:
        return values.help?.trim()?.length === 0;
      case FeedBack.TOPIC:
        return values.topic.length === 0 && values.other.trim().length === 0;
      default:
        return false;
    }
  };
  const handlePress = (values: IFormikFeedback) => {
    switch (screen) {
      case FeedBack.HELP:
        handleHelp();
        break;
      case FeedBack.TOPIC:
        handleTopic(values);
        break;
      default:
        break;
    }
  };

  const handleHelp = () => {
    setScreen(FeedBack.TOPIC);
  };

  const handleTopic = async (values: IFormikFeedback) => {
    try {
      GlobalService.showLoading();
      const dataTopic = values?.topic?.map(item => ({
        question_id: topics?.id,
        answer_id: item,
      }));

      const dataHaveOther = {
        data: [
          ...dataTopic,
          {
            question_id: topics?.id,
            answer_text: values.other,
          },
          {
            question_id: help?.id,
            answer_text: values?.help,
          },
        ],
      };

      const dataNotOther = {
        data: [
          ...dataTopic,
          {
            question_id: help?.id,
            answer_text: values?.help,
          },
        ],
      };

      const dataAPI =
        values?.other?.trim()?.length > 0 ? dataHaveOther : dataNotOther;
      await postAnswerOnboarding(data?.id, dataAPI);
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    } finally {
      dispatch(changeStatusLogin(true));
      GlobalService.hideLoading();
    }
  };

  const handleArrowLeft = () => {
    switch (screen) {
      case FeedBack.HELP:
        navigation.goBack();
        break;
      case FeedBack.TOPIC:
        setScreen(FeedBack.HELP);
        break;
      default:
        break;
    }
  };

  const getTitleOnboarding = () => {
    switch (screen) {
      case FeedBack.HELP:
        return lang === 2 ? help?.question_vi : help?.question_en;
      case FeedBack.TOPIC:
        return lang === 2 ? topics?.question_vi : topics?.question_en;
      default:
        return '';
    }
  };

  return {
    t,
    handleArrowLeft,
    formRef,
    switchView,
    getDisable,
    handlePress,
    screen,
    loading,
    data,
    help,
    topics,
    getTitleOnboarding,
  };
};
