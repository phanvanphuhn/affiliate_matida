import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {IAnswers, IDataListFeed} from '../../Feed/type';
import {useDispatch, useSelector} from 'react-redux';
import {useVideo} from './Container';
import {answerDailyQuiz, GlobalService} from '@services';
import {updateDataHome} from '@redux';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {IconBackgroundImageHome} from '@images';
import {ViewTextSeeMore} from '@component';
import ResultQuizFeed from './ResultQuizFeed';

interface DailyQuizFeedProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const DailyQuizFeed = (props: DailyQuizFeedProps) => {
  const {setState} = useVideo();
  const [answer, setAnswer] = useState<IAnswers>();
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const lang = useSelector((state: any) => state.auth.lang);
  const data = useSelector((state: any) => state?.home?.data?.dailyQuizz);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    if (props.isFocused) {
      setState({feed: props.item});
    } else {
    }
    return () => {};
  }, [props.isFocused]);
  const onAnswerQuiz = async (e: IAnswers) => {
    try {
      setAnswer(e);
      let params = {
        question_id: props.item.id,
        answer_id: e.id,
      };
      GlobalService.showLoading();
      const res = await answerDailyQuiz(params);
      setIsvisible(true);
      dispatch(
        updateDataHome({
          ...data,
          dailyQuizz: {
            ...data?.dailyQuizz,
            ...res.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      showMessage({message: error?.response?.data?.message, type: 'danger'});
      GlobalService.hideLoading();
    }
  };

  const renderViewResult = () => {
    if (data?.percent_diff_answer || data?.percent_same_answer) {
      return <ResultQuizFeed />;
    } else {
      return (
        <View style={styles.viewResult}>
          <Text
            style={{
              ...stylesCommon.fontPlus600,
              fontSize: scaler(24),
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: scaler(24),
            }}>
            {t('home.testKnowledge')}
          </Text>
          <View style={styles.viewTitle}>
            <ViewTextSeeMore
              heightMax={110}
              text={
                lang === 1 ? props.item?.question_en : props.item?.question_vi
              }
              style={styles.txtTitleContent}
              numberOfLines={3}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {props.item?.answers?.map((answer, i) => {
              return renderItemAnswer(answer, i);
            })}
          </View>
        </View>
      );
    }
  };

  const renderItemAnswer = (item: IAnswers, index: number) => {
    return (
      <TouchableOpacity
        key={item?.id?.toString()}
        activeOpacity={0.9}
        style={[
          // styles.buttonAnswer,
          {
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scaler(8),
            padding: scaler(12),
            width: (widthScreen - scaler(24) * 4) / 2 - scaler(8),
          },
          {
            marginRight: index === 0 ? scaler(8) : 0,
            marginLeft: index === 0 ? 0 : scaler(8),
          },
        ]}
        onPress={() => {
          onAnswerQuiz(item);
        }}>
        <Text style={styles.txtTrueFalse}>
          {lang === 1 ? item?.answer_en : item?.answer_vi}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.group}>
      {data ? (
        <View style={styles.container}>
          <ImageBackground
            source={IconBackgroundImageHome}
            style={styles.viewContent}>
            {renderViewResult()}
          </ImageBackground>
        </View>
      ) : null}
    </View>
  );
};

export default DailyQuizFeed;

const styles = StyleSheet.create({
  group: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: scaler(24),
    marginBottom: scaler(40),
  },
  viewContent: {
    // height: scaler(319),
    backgroundColor: '#654AC9',
    borderRadius: scaler(16),
    paddingVertical: scaler(24),
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
  },
  viewResult: {
    paddingHorizontal: scaler(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    width: '100%',
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
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
    flex: 1,
    padding: scaler(12),
    // height: '100%',
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
    color: '#FFFFFF',
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
    marginTop: scaler(43),
    textDecorationLine: 'underline',
  },
  txtTrueFalse: {
    fontSize: scaler(14),
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
  },
});
