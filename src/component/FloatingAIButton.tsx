import {floating_button} from '@images';
import {BaseNavigationContainer, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import ThreeDotLoading from './ThreeDotLoading';
import DailyQuestionTidaAi from './DailyQuestionTidaAi';
import {getDailyQuestion} from '@services';

export const FLoatingAIButton = () => {
  const navigation = useNavigation<any>();

  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [data, setData] = useState<String>();
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const isShowTidaQuestion = () => {
    const tout = setTimeout(() => {
      clearTimeout(tout);
      setShowQuestion(true);
    }, 700);
  };

  const getData = async () => {
    try {
      const res = await getDailyQuestion();
      setData(res?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  React.useEffect(() => {
    getData();
    isShowTidaQuestion();

    const tout = setTimeout(() => {
      clearTimeout(tout);
      fadeOut();
    }, 10000);
  }, []);

  const onNnavigateChatAPI = () => {
    trackingAppEvent(event.TIDA.TIDA_OPEN, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT, {data: data});
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            //Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
        {showQuestion ? (
          <DailyQuestionTidaAi data={data} />
        ) : (
          <ThreeDotLoading />
        )}
      </Animated.View>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onNnavigateChatAPI}>
        <Image source={floating_button} style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scaler(15),
    zIndex: 1000,
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: scaler(8),
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.brandMainPinkRed,
    borderRadius: scaler(20),
    height: scaler(60),
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    flex: 1,
  },
  wrapButtonContainer: {},
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
