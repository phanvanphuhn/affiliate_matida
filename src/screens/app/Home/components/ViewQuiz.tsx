import {ViewTextSeeMore} from '@component';
import {EDailyQuiz} from '@constant';
import {
  IconBackgroundImageHome,
  SvgFailed,
  SvgLikeQuiz,
  SvgUnLikeQuiz,
  SvgVerify,
  iconCrownWhite,
} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {event, eventType, handleDeepLink, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {trackTestYourKnowledgeClicked} from '@services/webengageManager.tsx';
import LinearGradient from 'react-native-linear-gradient';
import useCheckPregnancy from '../../../../util/hooks/useCheckPregnancy';
import {systemFonts, tagsStyles} from '../../DetailArticle/settingHTML';
import RenderHtml from 'react-native-render-html';
import clip from '../../DetailFeed/components/clip';

export const ViewQuiz = React.memo((props: any) => {
  const {onAnswer} = props;
  const data = useSelector((state: any) => state?.home?.data?.dailyQuizz);
  console.log('data: ', data);
  const lang = useSelector((state: any) => state.auth.lang);
  const {t} = useTranslation();
  const checkPlan = useCheckPregnancy();

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

  const getDescription = (data: string, length: number) => {
    return clip(data, length, {
      html: true,
    });
  };

  const renderViewResult = () => {
    if (data?.percent_diff_answer || data?.percent_same_answer) {
      return (
        <View style={[styles.viewResult]}>
          {/* <Image
            source={data?.is_correct === true ? iconSuccessQuiz : iconFalseQuiz}
            style={[styles.iconIconResult, {}]}
          /> */}
          {/* <View style={{marginBottom: scaler(20)}}>
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
          </TouchableOpacity> */}
          <View style={styles.viewTitle}>
            <ViewTextSeeMore
              heightMax={110}
              text={
                lang === 1
                  ? data?.question?.question_en || data?.question_en
                  : data?.question?.question_vi || data?.question_vi
              }
              style={{
                ...stylesCommon.fontSarabun500,
                fontSize: scaler(15),
              }}
              numberOfLines={10}
            />
          </View>
          <Text style={[styles.txtTitleContent, {marginBottom: scaler(8)}]}>
            {t('home.theCorrectAnswer')}
          </Text>
          <FlatList
            data={
              data?.question?.answers
                ? data?.question?.answers?.filter(
                    item => item.is_correct == true,
                  )
                : data?.answers?.filter(item => item.is_correct == true)
            }
            bounces={false}
            scrollEnabled={false}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItemAnswer}
          />
          {/* <View style={{height: 200, backgroundColor: colors.white}}></View> */}
        </View>
      );
    } else {
      return (
        <View style={styles.viewResult}>
          <Text
            style={{
              ...stylesCommon.fontWeight500,
              fontSize: scaler(11),
            }}>
            {t('home.testKnowledge')}
          </Text>
          <View style={styles.viewTitle}>
            <ViewTextSeeMore
              heightMax={110}
              text={lang === 1 ? data?.question_en : data?.question_vi}
              style={styles.txtTitleContent}
              numberOfLines={10}
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
            borderRadius: scaler(8),
            padding: scaler(12),
            width: '100%',
            marginBottom: scaler(12),
          },
        ]}
        onPress={() => {
          const body = {
            question_id: data?.id,
            answer_id: item?.id,
          };
          trackingAppEvent(
            event.BABY_TRACKER.DAILY_QUIZ,
            {content: body},
            eventType.MIX_PANEL,
          );
          onAnswer(body);
          trackTestYourKnowledgeClicked(data?.question_en, item?.answer_en);
        }}>
        <Text style={styles.txtTrueFalse}>
          {index == 0 ? 'A. ' : 'B. '}{' '}
          {lang === 1 ? item?.answer_en : item?.answer_vi}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <View
            style={[
              data?.question
                ? {
                    // height: scaler(319),
                    backgroundColor: colors.blue50,
                    paddingVertical: scaler(24),
                    overflow: 'hidden',
                    borderTopRightRadius: scaler(16),
                    borderTopLeftRadius: scaler(16),
                  }
                : {
                    width: '100%',
                    // height: scaler(319),
                    backgroundColor: colors.blue50,
                    paddingVertical: scaler(24),
                    overflow: 'hidden',
                    borderRadius: scaler(16),
                    // borderTopLeftRadius: scaler(16),
                  },
            ]}>
            <View
              style={{
                height: '190%',
                aspectRatio: 1,
                borderRadius: widthScreen / 1.5,
                backgroundColor: colors.yellow200,
                position: 'absolute',
                bottom: 0,
                left: '-50%',
              }}
            />
            <View
              style={{
                height: '60%',
                aspectRatio: 1,
                borderRadius: widthScreen / 1.5,
                backgroundColor: colors.transparent,
                borderColor: colors.white,
                borderWidth: 6,
                position: 'absolute',
                top: '-50%',
                right: '-25%',
                transform: [{scaleX: 1.5}, {scaleY: 2}],
              }}
            />
            {renderViewResult()}
          </View>
          {(data?.percent_diff_answer || data?.percent_same_answer) && (
            <View
              style={{
                backgroundColor: colors.white,
                paddingVertical: scaler(16),
                borderBottomRightRadius: scaler(16),
                borderBottomLeftRadius: scaler(16),
              }}>
              <View
                style={{
                  borderBottomWidth: scaler(1),
                  borderBottomColor: '#F0F1F5',
                }}>
                {lang == 1
                  ? (data?.explain_en || data?.question?.explain_en) && (
                      <View style={{paddingHorizontal: scaler(16)}}>
                        <RenderHtml
                          baseStyle={{
                            ...stylesCommon.fontWeight400,
                            fontSize: scaler(14),
                          }}
                          contentWidth={widthScreen}
                          systemFonts={systemFonts}
                          tagsStyles={{...tagsStyles}}
                          source={{
                            html: `<div>${getDescription(
                              data?.explain_en || data?.question?.explain_en,
                              90,
                            )}</div>`,
                          }}
                          enableExperimentalMarginCollapsing={true}
                          enableExperimentalBRCollapsing={true}
                          enableExperimentalGhostLinesPrevention={true}
                        />
                      </View>
                    )
                  : (data?.explain_vi || data?.question?.explain_vi) && (
                      <View
                        style={{
                          paddingHorizontal: scaler(16),
                        }}>
                        <RenderHtml
                          baseStyle={{
                            ...stylesCommon.fontSarabun500,
                            fontSize: scaler(14),
                            color: 'black',
                          }}
                          contentWidth={widthScreen}
                          systemFonts={systemFonts}
                          tagsStyles={{...tagsStyles}}
                          source={{
                            html: `<div>${getDescription(
                              data?.explain_vi || data?.question?.explain_vi,
                              90,
                            )}</div>`,
                          }}
                          enableExperimentalMarginCollapsing={true}
                          enableExperimentalBRCollapsing={true}
                          enableExperimentalGhostLinesPrevention={true}
                        />
                      </View>

                      // <Text
                      //   numberOfLines={2}
                      //   style={{
                      //     paddingHorizontal: scaler(16),
                      //     fontSize: scaler(15),
                      //     ...stylesCommon.fontSarabun500,
                      //   }}>
                      //   {data?.question?.explain_vi}
                      // </Text>
                    )}
                {(data?.question?.link_en ||
                  data?.question?.link_vi ||
                  data?.link_en ||
                  data?.link_vi) && (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: scaler(16),
                      paddingBottom: scaler(12),
                    }}
                    onPress={() =>
                      handleDeepLink(
                        lang == 1
                          ? data?.question?.link_en || data?.link_en
                          : data?.question?.link_vi || data?.link_vi,
                      )
                    }>
                    <Text
                      style={{
                        fontSize: scaler(15),
                        ...stylesCommon.fontSarabun500,
                        color: colors.pink300,
                      }}>
                      {t('common.readMore')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{paddingHorizontal: scaler(16), paddingTop: scaler(16)}}>
                <Text
                  style={{
                    fontSize: scaler(15),
                    ...stylesCommon.fontSarabun500,
                    color: '#38393D',
                  }}>
                  {t('home.wantToBe')}
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: scaler(12),
                    flex: 1,
                    backgroundColor: colors.pink4,
                    paddingVertical: scaler(8),
                    borderRadius: scaler(16),
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={checkPlan}>
                  <Image
                    source={iconCrownWhite}
                    style={{
                      height: scaler(16),
                      width: scaler(16),
                      marginRight: scaler(8),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scaler(13),
                      ...stylesCommon.fontSarabun600,
                      color: colors.white,
                    }}>
                    {t('home.checkMasterclass')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(16),
    marginBottom: scaler(16),
  },
  viewContent: {
    width: '100%',
    // height: scaler(319),
    backgroundColor: colors.blue50,
    paddingVertical: scaler(24),
    overflow: 'hidden',
    borderRadius: scaler(16),
    // borderTopLeftRadius: scaler(16),
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
    position: 'absolute',
    right: 0,
    top: scaler(-100),
  },
  viewResult: {
    flex: 1,
    paddingHorizontal: scaler(16),
  },
  viewTitle: {
    width: '100%',
    borderRadius: scaler(8),
    marginBottom: scaler(24),
  },
  txtTitleContent: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(16),
    lineHeight: scaler(20),
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
  },
});
