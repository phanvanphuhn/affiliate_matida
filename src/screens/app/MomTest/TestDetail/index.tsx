import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, getTestDetailById, postSubmitTest} from '@services';
import {widthScreen} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import {Formik, FormikProps} from 'formik';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ViewLoading} from '../MomPrepTest/components';
import {
  HeaderTestDetail,
  IAnswer,
  ModalConfirmTestDetail,
  ModalResult,
  ModalTestDetail,
  PageTest,
  ViewButtonTest,
} from './components';

type IFormik = {
  answer: IAnswer[];
  current: number;
};

const initFormik: IFormik = {
  answer: [],
  current: 0,
};

export const TestDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const {quiz, next_question, answer} = route?.params ?? {};

  const lang = useSelector((state: any) => state.auth.lang);

  const [visibleResult, setVisibleResult] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const flatRef = useRef<FlatList>(null);
  const formRef = useRef<FormikProps<IFormik>>(null);
  const totalQuestion = useRef<number>(0);

  useUXCam(ROUTE_NAME.TEST_DETAIL);

  useEffect(() => {
    getData();
    trackingAppEvent(event.SCREEN.TEST_DETAIL, {}, eventType.AFF_FLYER);
  }, []);
  const nextQuestion = useCallback(() => {
    if (!!next_question || next_question == 0) {
      flatRef.current?.scrollToIndex({index: next_question, animated: true});
      formRef.current?.setValues({
        answer: [answer],
        current: next_question,
      });
    }
  }, [next_question, answer, flatRef.current]);

  const getData = async () => {
    try {
      const res = await getTestDetailById(quiz?.id);
      totalQuestion.current = res?.data?.packageQuiz?.total_questions;
      setData(res?.data?.packageQuiz?.questions);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmitAnswers = async () => {
    try {
      GlobalService.showLoading();
      const listAnswers = formRef.current?.values?.answer;
      trackingAppEvent(event.MOM_TEST.DO, {content: listAnswers}, eventType.MIX_PANEL);
      const res = await postSubmitTest(quiz?.id, {data: listAnswers});
      setResult(res?.data);
      setVisibleResult(true);
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handlePressButton = async (index: number) => {
    if (index >= 0 && index <= totalQuestion.current - 1) {
      flatRef.current?.scrollToIndex({index: index, animated: true});
    }
  };

  const handleRedoTest = () => {
    formRef.current?.resetForm();
    setVisibleResult(false);
    setTimeout(() => {
      flatRef.current?.scrollToIndex({index: 0, animated: true});
    }, 50);
  };
  const handleGoBack = () => {
    if (formRef.current?.values?.answer?.length) {
      setVisibleConfirm(true);
    } else {
      navigation.goBack();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <PageTest item={item} total={totalQuestion.current} />;
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Formik
          innerRef={formRef}
          initialValues={initFormik}
          onSubmit={() => {}}>
          {() => (
            <>
              <HeaderTestDetail
                onPressLeft={handleGoBack}
                total={totalQuestion.current}
                title={lang === 2 ? quiz?.name_vi : quiz?.name_en}
              />
              {loading ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <ViewLoading />
                </View>
              ) : (
                <FlatList
                  ref={flatRef}
                  data={data}
                  onLayout={nextQuestion}
                  renderItem={renderItem}
                  contentContainerStyle={{flexGrow: 1}}
                  horizontal
                  scrollEnabled={false}
                  initialScrollIndex={0}
                  onScrollToIndexFailed={info => {
                    const wait = new Promise((resolve: any) =>
                      setTimeout(resolve, 500),
                    );
                    wait.then(() => {
                      flatRef.current?.scrollToIndex({
                        index: info.index,
                        animated: true,
                      });
                    });
                  }}
                  getItemLayout={(_, index) => ({
                    length: widthScreen,
                    offset: widthScreen * index,
                    index,
                  })}
                  keyExtractor={(item: any) => item.id}
                />
              )}

              <ViewButtonTest
                onPress={handlePressButton}
                total={totalQuestion.current}
                onSubmit={onSubmitAnswers}
              />
            </>
          )}
        </Formik>
      </View>
      <ModalTestDetail
        visible={visibleResult}
        setVisible={setVisibleResult}
        firework={result?.isPassed}>
        <ModalResult
          setVisibleResult={setVisibleResult}
          onRedoTest={handleRedoTest}
          result={result}
          idQuiz={quiz?.id}
        />
      </ModalTestDetail>
      <ModalTestDetail
        visible={visibleConfirm}
        hideModalPressViewOut
        setVisible={setVisibleConfirm}>
        <ModalConfirmTestDetail setVisible={setVisibleConfirm} />
      </ModalTestDetail>
    </>
  );
};
