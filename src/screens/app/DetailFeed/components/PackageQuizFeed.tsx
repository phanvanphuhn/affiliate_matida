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
import {IAnswers, IDataListFeed} from '../../Feed/type';
import {useVideo} from './Container';

interface PackageQuizFeedProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const PackageQuizFeed = (props: PackageQuizFeedProps) => {
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
  const onDoMomPrepTest = (item: IDataListFeed) => {
    if (!item?.is_active) {
      return;
    }
    if (+item?.maxScore === +item?.total_questions) {
      trackingAppEvent(event.MOM_TEST.START, {content: item?.id});
      navigate(ROUTE_NAME.TEST_RESULT, {
        id: item?.id,
        redoTest: () => {},
        preRoute: EPreRoute.PERIODIC,
      });
    } else {
      trackingAppEvent(event.MOM_TEST.START, {content: item});
      navigate(ROUTE_NAME.TEST_DETAIL, {quiz: item});
    }
  };
  const renderViewResult = () => {
    return (
      <View style={styles.viewResult}>
        <Text
          style={{
            ...stylesCommon.fontPlus600,
            fontSize: scaler(24),
            color: colors.textColor,
            marginBottom: scaler(24),
          }}>
          {lang === 1 ? props?.item?.name_en : props?.item?.name_vi}
        </Text>
        <View>
          <FastImage
            source={
              props?.item?.image ? {uri: props?.item?.image} : imageNameAppPink
            }
            style={styles.imageAvatar}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onDoMomPrepTest(props?.item)}>
          <Text style={styles.txtBottom}>{t('feed.enterTest')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemAnswer = (item: IAnswers, index: number) => {
    return (
      <TouchableOpacity
        key={item?.id?.toString()}
        activeOpacity={0.9}
        style={[
          // styles.buttonAnswer,
          {
            backgroundColor: colors.backgroundDefault,
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
    <View
      style={{
        backgroundColor: colors.backgroundDefault,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {data ? (
        <ImageBackground
          source={IconBackgroundImageHome}
          style={styles.viewContent}>
          {renderViewResult()}
        </ImageBackground>
      ) : null}
    </View>
  );
};

export default React.memo(PackageQuizFeed);

const styles = StyleSheet.create({
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(16),
    paddingVertical: scaler(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
  },
  viewResult: {
    paddingHorizontal: scaler(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundPackage,
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
    color: colors.textColor,
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
  imageAvatar: {
    marginTop: scaler(6),
    width: widthScreen - scaler(128),
    height: scaler(150),
  },
});
