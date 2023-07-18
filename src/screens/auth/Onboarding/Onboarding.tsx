import {AppButton, Header} from '@component';
import {FeedBack} from '@constant';
import {colors, stylesCommon} from '@stylesCommon';
import {Formik} from 'formik';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {OnboardingHook} from './Onboarding.hook';
import {IFormikFeedback} from './Onboarding.props';
import {styles} from './Onboarding.style';

const initFormik: IFormikFeedback = {
  help: '',
  topic: [],
  other: '',
};

export const Onboarding = () => {
  const {
    t,
    handleArrowLeft,
    formRef,
    switchView,
    getDisable,
    handlePress,
    screen,
    data,
    loading,
    help,
    topics,
    getTitleOnboarding,
  } = OnboardingHook();

  return (
    <View style={styles.container}>
      <Header onPressLeft={handleArrowLeft} />
      {loading ? (
        <View style={styles.viewLoadmore}>
          <ActivityIndicator color={colors.primary} size="small" />
        </View>
      ) : (
        <Formik
          innerRef={formRef}
          initialValues={initFormik}
          onSubmit={() => {}}>
          {({values}) => (
            <>
              <KeyboardAwareScrollView
                bounces={false}
                keyboardDismissMode="on-drag">
                <View style={styles.body}>
                  <Text style={styles.textTitle}>{getTitleOnboarding()}</Text>
                  {screen === FeedBack.HELP ? (
                    <Text style={styles.textBody}>
                      {t('feedback.help.textBody')}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.viewItemFlatList}>{switchView()}</View>
                <AppButton
                  onClick={() => handlePress(values)}
                  titleButton={t('feedback.next')}
                  customStyleButton={styles.btnNext}
                  customStyleText={{
                    color: colors.red50,
                    ...stylesCommon.fontWeight600,
                  }}
                  disable={getDisable(values)}
                  customStyleDisable={{opacity: 0.5}}
                />
              </KeyboardAwareScrollView>
            </>
          )}
        </Formik>
      )}
    </View>
  );
};
