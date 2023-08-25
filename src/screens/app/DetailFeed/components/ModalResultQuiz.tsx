import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {SvgFailed, SvgLikeQuiz, SvgUnLikeQuiz, SvgVerify} from '@images';
import {EDailyQuiz} from '@constant';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

interface ModalResultQuizProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const ModalResultQuiz = (props: ModalResultQuizProps) => {
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
  return (
    <Modal
      animationInTiming={400}
      animationOutTiming={300}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      backdropOpacity={0.7}
      onBackdropPress={() => props.setIsVisible(false)}
      isVisible={props?.isVisible}>
      <View style={styles.viewContent}>
        <View style={styles.viewResult}>
          {/* <Image
            source={data?.is_correct === true ? iconSuccessQuiz : iconFalseQuiz}
            style={[styles.iconIconResult, {}]}
          /> */}
          <View style={{marginBottom: scaler(20)}}>
            {data?.is_correct === true ? (
              <SvgVerify color={'#B1D39D'} />
            ) : (
              <SvgFailed color={'#EE999A'} />
            )}
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
                {getTextPercent(EDailyQuiz.CORRECT)}
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
        </View>
      </View>
    </Modal>
  );
};

export default ModalResultQuiz;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(24),
    marginBottom: scaler(40),
  },
  viewContent: {
    backgroundColor: colors.white,
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
    color: '#654AC9',
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
