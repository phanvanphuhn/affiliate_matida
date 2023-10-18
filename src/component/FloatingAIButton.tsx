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

  const [data, setData] = useState<String>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    setData('');

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const getData = async () => {
    try {
      const res = await getDailyQuestion();
      if (res?.success) {
        setData(res?.data);
        fadeIn();
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    const tout = setTimeout(() => {
      clearTimeout(tout);
      getData();
    }, 1000);

    const tout2 = setTimeout(() => {
      clearTimeout(tout2);
      // fadeOut();
    }, 75000);
  }, []);

  const onNnavigateChatAPI = () => {
    setData('');
    fadeOut();
    trackingAppEvent(event.TIDA.TIDA_OPEN, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT, {data: data});
  };

  const onCloseTidaQuestion = () => {
    setData('');
    fadeOut();
  };

  return (
    <View style={[styles.container, {zIndex: data ? 999 : 0}]}>
      {data && (
        <Animated.View
          style={[
            styles.contentContainer,
            {
              //Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onCloseTidaQuestion}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
          <DailyQuestionTidaAi
            data={data}
            onNnavigateChatAPI={onNnavigateChatAPI}
          />
        </Animated.View>
      )}
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
    bottom: scaler(50),
    alignItems: 'center',
    right: scaler(8),
    // flex: 1,
    // width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: scaler(8),
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.pink150,
    borderRadius: scaler(20),
    height: scaler(60),
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    flex: 1,
    marginLeft: scaler(16),
  },
  buttonContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.pink150,
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
  },
  wrapButtonContainer: {},
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
