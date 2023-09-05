import {AppButton, AppImage} from '@component';
import {EPreRoute} from '@constant';
import {goBack, navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderComponent, YourResult} from '../../TestResult/components';
import {useRoute} from '@react-navigation/native';
type Props = {
  setVisibleResult: React.Dispatch<React.SetStateAction<boolean>>;
  onRedoTest: () => void;
  result: any;
  idQuiz: any;
};
export const ModalResult = ({
  setVisibleResult,
  onRedoTest,
  result,
  idQuiz,
}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);
  const [showReward, setShowReward] = useState<boolean>(false);
  const route = useRoute<any>();

  const isPerfect = result?.isPassed;

  const handlePressSeeAll = () => {
    setVisibleResult(false);
    navigate(ROUTE_NAME.TEST_RESULT, {
      id: idQuiz,
      redoTest: onRedoTest,
      preRoute: EPreRoute.TEST_DETAIL,
    });
  };

  const handlePressTop = () => {
    if (isPerfect) {
      setShowReward(true);
    } else {
      onRedoTest();
    }
  };

  if (showReward) {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textCongratulation}>
          {t('test.congratulation')}
        </Text>
        <Text style={styles.textReward}>
          {t('test.rewardCompleting')}
          <Text style={{color: colors.purple}}>
            {lang === 2
              ? result?.packageQuiz?.name_vi
              : result?.packageQuiz?.name_en}
          </Text>
        </Text>
        <View style={styles.viewReward}>
          <AppImage
            uri={result?.packageQuiz?.badge?.image}
            style={styles.imageReward}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.reward}>
          {lang === 2
            ? result?.packageQuiz?.badge?.name_vi
            : result?.packageQuiz?.badge?.name_en}
        </Text>
        <ViewButton
          titleTop={t('test.viewAllAnswer')}
          titleBottom={t('test.continueMatida')}
          onPressTop={handlePressSeeAll}
          onPressBottom={() => {
            route?.params?.onComplete &&
              route?.params?.onComplete({
                maxScore: result?.userScore,
              });
            goBack();
          }}
          // hideButtonBottom
        />
      </View>
    );
  }
  return (
    <View>
      <HeaderComponent perfect={isPerfect} />
      <YourResult
        onPressLink={handlePressSeeAll}
        style={{padding: 0, marginVertical: scaler(24)}}
        total={result?.packageQuiz?.total_questions}
        userScore={result?.userScore}
      />
      <ViewButton
        titleTop={isPerfect ? t('test.getReward') : t('test.redoTest')}
        titleBottom={t('test.maybeLater')}
        onPressTop={handlePressTop}
        onPressBottom={() => {
          goBack();
          route?.params?.onComplete &&
            route?.params?.onComplete({
              maxScore: result?.userScore,
            });
        }}
        hideButtonBottom={isPerfect}
      />
    </View>
  );
};

type PropButton = {
  titleTop: string;
  titleBottom: string;
  onPressTop: () => void;
  onPressBottom?: () => void;
  hideButtonBottom?: boolean;
};

const ViewButton = ({
  titleTop,
  titleBottom,
  onPressTop,
  onPressBottom,
  hideButtonBottom = false,
}: PropButton) => {
  return (
    <>
      <AppButton
        titleButton={titleTop}
        customStyleButton={{
          backgroundColor: colors.success_message,
          marginBottom: scaler(8),
        }}
        onClick={onPressTop}
      />
      {!hideButtonBottom ? (
        <AppButton
          titleButton={titleBottom}
          customStyleButton={{backgroundColor: colors.white}}
          customStyleText={{color: colors.textSmallColor}}
          onClick={onPressBottom}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  viewReward: {
    width: scaler(128),
    height: scaler(128),
    backgroundColor: colors.green50,
    borderRadius: scaler(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCongratulation: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(24),
    color: colors.textColor,
  },
  textReward: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.textColor,
    textAlign: 'center',
    marginTop: scaler(8),
    marginBottom: scaler(32),
  },
  reward: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    color: colors.purple,
    marginTop: scaler(16),
    marginBottom: scaler(32),
  },
  imageReward: {
    width: scaler(80),
    height: scaler(80),
  },
});
