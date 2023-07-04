import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {scaler, stylesCommon, widthScreen, colors} from '@stylesCommon';
import {
  IconBackgroundImageHome,
  iconSuccessQuiz,
  iconFalseQuiz,
  SvgVerify,
  SvgFailed,
  SvgLikeQuiz,
  SvgUnLikeQuiz,
} from '@images';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {EDailyQuiz} from '@constant';
import {ViewTextSeeMore} from '@component';

export const ViewQuiz = React.memo((props: any) => {
  const {onAnswer} = props;
  const data = useSelector((state: any) => state?.home?.data?.dailyQuizz);
  const lang = useSelector((state: any) => state.auth.lang);
  const {t} = useTranslation();

  const getTextPercent = (type: EDailyQuiz) => {
    const percentAnswer =
      type === EDailyQuiz.CORRECT
        ? data?.percent_same_answer
        : data?.percent_diff_answer;

    const textEnding =
      type === EDailyQuiz.CORRECT ? t('home.correct') : t('home.false');

    const iconAnswer =
      type === EDailyQuiz.CORRECT ? <SvgLikeQuiz /> : <SvgUnLikeQuiz />;

    if (!percentAnswer || +percentAnswer < 24) {
      return <></>;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={styles.txtResult}>{`${percentAnswer}% `}</Text>
        {iconAnswer}
      </View>
    );
  };

  const renderViewResult = () => {
    if (data?.percent_diff_answer || data?.percent_same_answer) {
      return (
        <View style={styles.viewResult}>
          {/* <Image
            source={data?.is_correct === true ? iconSuccessQuiz : iconFalseQuiz}
            style={[styles.iconIconResult, {}]}
          /> */}
          <View style={{marginBottom: scaler(20)}}>
            {data?.is_correct === true ? <SvgVerify /> : <SvgFailed />}
          </View>
          <Text style={styles.txtTitleContent}>
            {data?.is_correct === true ? t('home.yay') : t('home.try_again')}
          </Text>
          <View style={styles.viewRowStatus}>
            {data?.percent_diff_answer == 100 ? null : (
              <View
                style={[
                  styles.viewCorrect,
                  {
                    width: `${
                      data?.percent_same_answer ? data?.percent_same_answer : 0
                    }%`,
                    borderTopRightRadius:
                      data?.percent_same_answer === 100 ? scaler(8) : 0,
                    borderBottomRightRadius:
                      data?.percent_same_answer === 100 ? scaler(8) : 0,
                  },
                ]}>
                <Text numberOfLines={1} style={styles.txtResult}>
                  {getTextPercent(EDailyQuiz.CORRECT)}
                </Text>
              </View>
            )}
            {data?.percent_same_answer == 100 ? null : (
              <View
                style={[
                  styles.viewFalse,
                  {
                    width: `${
                      data?.percent_diff_answer ? data?.percent_diff_answer : 0
                    }%`,
                    borderTopLeftRadius:
                      data?.percent_diff_answer === 100 ? scaler(8) : 0,
                    borderBottomLeftRadius:
                      data?.percent_diff_answer === 100 ? scaler(8) : 0,
                  },
                ]}>
                {getTextPercent(EDailyQuiz.FALSE)}
              </View>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigate(ROUTE_NAME.MOM_PREP_TEST)}>
            <Text style={styles.txtBottom}>{t('test.tryMoreTest')}</Text>
          </TouchableOpacity>
        </View>
      );
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
              text={lang === 1 ? data?.question_en : data?.question_vi}
              style={styles.txtTitleContent}
              numberOfLines={3}
            />
          </View>
          {/* <View style={styles.viewRow}>
            {data?.answers?.length > 0
              ? data?.answers?.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={item?.id}
                      style={[
                        styles.buttonAnswer,
                        {
                          marginRight: index === 0 ? scaler(8) : 0,
                          marginLeft: index === 0 ? 0 : scaler(8),
                        },
                      ]}
                      onPress={() => {
                        const body = {
                          question_id: data?.id,
                          answer_id: item?.id,
                        };
                        onAnswer(body);
                      }}>
                      <Text style={styles.txtTrueFalse}>
                        {lang === 1 ? item?.answer_en : item?.answer_vi}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View> */}
          <FlatList
            data={data?.answers}
            horizontal
            bounces={false}
            scrollEnabled={false}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItemAnswer}
          />
        </View>
      );
    }
  };

  const renderItemAnswer = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        // key={item?.id}
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
          const body = {
            question_id: data?.id,
            answer_id: item?.id,
          };
          onAnswer(body);
        }}>
        <Text style={styles.txtTrueFalse}>
          {lang === 1 ? item?.answer_en : item?.answer_vi}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <View style={styles.viewContent}>
            <Image
              source={IconBackgroundImageHome}
              style={styles.imageBackground}
            />
            {renderViewResult()}
          </View>
        </View>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(24),
    marginBottom: scaler(40),
  },
  viewContent: {
    width: '100%',
    // height: scaler(319),
    backgroundColor: '#654AC9',
    borderRadius: scaler(16),
    paddingVertical: scaler(24),
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
    position: 'absolute',
    right: 0,
    bottom: scaler(8),
  },
  viewResult: {
    flex: 1,
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
