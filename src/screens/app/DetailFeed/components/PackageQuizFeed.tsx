import {EPreRoute} from '@constant';
import {SvgLogoDailyAffirmation} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {event, trackingAppEvent} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  IAnswersPackage,
  IDataListFeed,
  IPackageQuizzList,
} from '../../Feed/type';
import {ListPackage, useVideo} from './Container';
import ResultPackageQuiz from './ResultPackageQuiz';
import {produce} from 'immer';

interface PackageQuizFeedProps {
  item: IDataListFeed;
  isFocused: boolean;
}

const ListChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const PackageQuizFeed = (props: PackageQuizFeedProps) => {
  const {state, setState} = useVideo();
  const [answer, setAnswer] = useState<IAnswersPackage>();
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const lang = useSelector((_state: any) => _state.auth.lang);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    if (props.isFocused) {
      setState({feed: props.item});
    } else {
    }
    return () => {};
  }, [props.isFocused]);
  const onDoMomPrepTest = (question: IPackageQuizzList) => {
    if (+props.item?.maxScore === +props.item?.total_questions) {
      trackingAppEvent(event.MOM_TEST.START, {content: props.item?.id});
      navigate(ROUTE_NAME.TEST_RESULT, {
        id: props.item?.id,
        redoTest: () => {},
        preRoute: EPreRoute.PERIODIC,
      });
    } else {
      trackingAppEvent(event.MOM_TEST.START, {content: props.item});
      navigate(ROUTE_NAME.TEST_DETAIL, {
        quiz: props.item,
        next_question: 1,
        answer: {
          question_id: +question?.id,
          answer_id: +(answer?.id || ''),
        },
        onComplete: (result: any) => {
          if (result.maxScore <= props.item.maxScore) {
            return;
          }
          const newItem = produce(state.data, (draft: IDataListFeed[]) => {
            draft[state.currentIndex] = {
              ...props.item,
              maxScore: result.maxScore,
            };
          });
          const newPackage = produce(
            state?.listPackage,
            (draft: ListPackage[]) => {
              const todo = draft.find(
                el =>
                  el.id === props.item?.id &&
                  props.item?.content_type == el.content_type,
              );
              if (todo) {
                todo.maxScore = result.maxScore;
              } else {
                draft.push({
                  id: props.item?.contentid,
                  content_type: props.item?.content_type,
                  maxScore: result.maxScore,
                });
              }
            },
          );
          setState({data: newItem, listPackage: newPackage});
        },
      });
    }
  };
  const renderViewResult = (item: IPackageQuizzList) => {
    return (
      <View style={styles.containerResult}>
        <View style={styles.viewResult}>
          <View style={styles.viewQuestion}>
            <SvgLogoDailyAffirmation
              color={colors.white}
              style={{
                position: 'absolute',
                top: scaler(15),
                right: -scaler(60),
              }}
            />
            <View style={styles.viewIndexQuestion}>
              {props?.item?.total_questions ? (
                <Text style={styles.textIndexQuestion}>
                  {1}/{props?.item?.total_questions}
                </Text>
              ) : null}
            </View>
            <Text style={styles.textQuestion}>{item?.question}</Text>
          </View>
          {item.answers?.map((e, i) => {
            return renderItemAnswer(e, i);
          })}
        </View>
        {!!answer && (
          <TouchableOpacity
            style={styles.buttonTest}
            onPress={() => onDoMomPrepTest(item)}>
            <Text style={styles.txtBottom}>{t('feed.enterTest')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItemAnswer = (item: IAnswersPackage, index: number) => {
    return (
      <TouchableOpacity
        key={item?.id?.toString()}
        activeOpacity={0.9}
        style={[
          styles.buttonAnswer,
          item.id == answer?.id ? styles.buttonSelected : null,
        ]}
        onPress={() => {
          setAnswer(item);
        }}>
        <Text
          style={[
            styles.txtTrueFalse,
            item.id == answer?.id ? styles.txtSelected : null,
          ]}>
          {ListChar[index]}. {item?.answer}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!props.isFocused) {
    return <View style={{flex: 1, backgroundColor: colors.white}} />;
  }
  return (
    <View style={styles.container}>
      {+props.item?.maxScore != +props.item?.total_questions ? (
        !!state?.questions?.length && (
          <View style={styles.viewContent}>
            {renderViewResult(state?.questions?.[0])}
          </View>
        )
      ) : (
        <ResultPackageQuiz item={props.item} />
      )}
    </View>
  );
};

export default React.memo(PackageQuizFeed);

const styles = StyleSheet.create({
  viewQuestion: {
    padding: scaler(24),
    backgroundColor: colors.purple,
    borderRadius: scaler(16),
    alignItems: 'flex-start',
    marginBottom: scaler(25),
  },
  viewIndexQuestion: {
    borderRadius: scaler(200),
    backgroundColor: colors.purple100,
    // width: scaler(46),
    height: scaler(46),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(6),
  },
  textIndexQuestion: {
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
  textQuestion: {
    fontSize: scaler(24),
    ...stylesCommon.fontPlus600,
    color: colors.white,
    marginTop: scaler(32),
  },
  txtQuestion: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(20),
    color: colors.textColor,
    marginBottom: scaler(10),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray250,
  },
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: scaler(20),
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
  },
  containerResult: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: scaler(10),
    paddingTop: '18%',
  },
  viewResult: {
    borderRadius: scaler(16),
    paddingTop: scaler(16),
    paddingBottom: scaler(16),
  },
  viewTitle: {
    padding: scaler(16),
    backgroundColor: 'rgba(85, 60, 180, 0.8)',
    borderRadius: scaler(8),
    alignItems: 'center',
    marginBottom: scaler(40),
  },
  txtTitleContent: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(18),
    lineHeight: scaler(33),
    color: colors.textColor,
    textAlign: 'center',
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRowStatus: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaler(16),
    height: scaler(45),
  },
  buttonAnswer: {
    backgroundColor: colors.white,
    borderRadius: scaler(8),
    padding: scaler(12),
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: scaler(10),
  },
  buttonSelected: {borderColor: colors.purple},
  iconIconResult: {
    width: scaler(64),
    height: scaler(64),
    marginBottom: scaler(20),
  },
  viewCorrect: {
    height: scaler(45),
    borderTopLeftRadius: scaler(8),
    borderBottomLeftRadius: scaler(8),
    backgroundColor: '#28B4AE',
    // backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(10),
  },
  viewFalse: {
    height: scaler(45),
    borderTopRightRadius: scaler(8),
    borderBottomRightRadius: scaler(8),
    backgroundColor: colors.brandMainPinkRed,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(10),
  },
  txtResult: {
    color: '#FFFFFF',
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  txtBottom: {
    fontSize: scaler(14),
    color: colors.white,
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
  },
  buttonTest: {
    backgroundColor: colors.red50,
    borderRadius: scaler(8),
    paddingVertical: scaler(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaler(10),
  },
  txtTrueFalse: {
    fontSize: scaler(16),
    color: colors.textColor,
    lineHeight: scaler(24),
  },
  txtSelected: {
    color: colors.purple,
  },
  imageAvatar: {
    marginTop: scaler(6),
    width: '100%',
    height: widthScreen - scaler(150),
    borderRadius: scaler(32),
  },
});
