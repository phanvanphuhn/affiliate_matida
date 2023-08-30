import {EPreRoute} from '@constant';
import {IconBackgroundImageHome, imageNameAppPink} from '@images';
import {navigate} from '@navigation';
import {updateDataHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, answerDailyQuiz} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {event, trackingAppEvent} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  IAnswers,
  IAnswersPackage,
  IDataListFeed,
  IPackageQuizzList,
} from '../../Feed/type';
import {useVideo} from './Container';
import ResultPackageQuiz from './ResultPackageQuiz';

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
    if (!props?.item?.is_active) {
      return;
    }
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
      });
    }
  };
  const renderViewResult = (item: IPackageQuizzList) => {
    return (
      <View style={styles.containerResult}>
        <View style={styles.viewResult}>
          <Text style={styles.txtQuestion}>{item?.question}</Text>
          <View style={{marginBottom: '7%'}}>
            <FastImage
              source={
                props?.item?.image
                  ? {uri: props?.item?.image}
                  : imageNameAppPink
              }
              style={styles.imageAvatar}
            />
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
  txtQuestion: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(20),
    color: colors.textColor,
    marginBottom: scaler(10),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: scaler(24),
    backgroundColor: colors.green50,
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
  buttonSelected: {
    backgroundColor: colors.red50,
    borderWidth: 0,
  },
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
    backgroundColor: colors.green,
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
    color: colors.white,
    ...stylesCommon.fontWeight500,
  },
  imageAvatar: {
    marginTop: scaler(6),
    width: '100%',
    height: widthScreen - scaler(150),
    borderRadius: scaler(32),
  },
});
