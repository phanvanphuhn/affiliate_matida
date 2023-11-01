import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {iconNewBornTida, iconCloudSuggestion} from '@images';
import useDetailPost from '../Forum/components/useDetailPost';
import ProcessBar from './components/ProcessBar';
import {useNavigation} from '@react-navigation/native';
import Information from './components/Information';
import Button from './components/Button';
import Title from './components/Title';
import {ROUTE_NAME} from '@routeName';
import KeyboardShift from '../DetailFeed/components/KeyboardShift';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const screenWidth = Dimensions.get('screen').width;

const NewBornScreen = () => {
  const navigation = useNavigation<any>();

  const [state, setState] = useDetailPost({
    page: 0,
    isShowTidaSuggestion: false,
    dmy: new Date(),
    hour: new Date(),
    name: '',
    sex: 'male',
    deliver: 'naturalBirth',
    weight: '',
    height: '',
    image: [],
  });

  const sex = [
    {
      id: 1,
      value: 'male',
      title: 'Male',
    },
    {
      id: 2,
      value: 'female',
      title: 'Female',
    },
    {
      id: 3,
      value: 'notToSay',
      title: 'Prefer not to say',
    },
  ];

  const deliver = [
    {
      id: 1,
      value: 'naturalBirth',
      title: 'Natural birth',
    },
    {
      id: 2,
      value: 'cSection',
      title: 'C section',
    },
  ];

  const onNewBornTida = () => {
    setState({isShowTidaSuggestion: !state.isShowTidaSuggestion});
  };

  const onNextPage = () => {
    setState({page: state.page + 1});
  };

  const onPreviousPage = () => {
    if (state.page > 0) {
      setState({page: state.page - 1});
    } else {
      navigation.goBack();
    }
  };

  const onDone = () => {
    navigation.navigate(ROUTE_NAME.SCREEN_TAB);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {state.page > 0 && state.page < 9 ? (
        <ProcessBar page={state.page} />
      ) : null}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View
          style={[
            styles.wrapTitleContainer,
            state.page > 0 && state.page < 9
              ? {marginTop: scaler(60)}
              : {marginTop: scaler(98)},
          ]}>
          <Title page={state.page} />
        </View>

        <View style={styles.wrapBodyContainer}>
          <Information
            state={state}
            setState={setState}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onDone={onDone}
            sex={sex}
            deliver={deliver}
          />
        </View>

        <View style={styles.wrapBottomContainer}>
          {state.page > 0 && state.page < 9 && (
            <Button onNextPage={onNextPage} onPreviousPage={onPreviousPage} />
          )}

          <TouchableOpacity onPress={onNewBornTida} activeOpacity={0.9}>
            {state.isShowTidaSuggestion ? (
              <View style={styles.wrapSuggestion}>
                <Image source={iconCloudSuggestion} style={styles.suggestion} />
                <Text style={styles.suggestionTitle}>
                  Tida will be your personal assistant. Feel free to reach me
                  out anytime if you have any question.
                </Text>
              </View>
            ) : null}
            <Image source={iconNewBornTida} style={styles.button} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  wrapTitleContainer: {
    alignItems: 'center',
  },
  wrapBottomContainer: {
    alignItems: 'center',
  },
  button: {
    height: scaler(232),
    width: scaler(232),
  },
  wrapSuggestion: {
    position: 'absolute',
    bottom: scaler(212),
    zIndex: 999,
    right: scaler(-6),
  },
  suggestion: {
    width: scaler(246),
    height: scaler(83),
  },
  suggestionTitle: {
    fontSize: 12,
    fontWeight: '500',
    position: 'absolute',
    textAlign: 'center',
    padding: scaler(16),
  },
  wrapBodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 150,
  },
});

export default NewBornScreen;
