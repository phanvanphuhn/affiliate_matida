import {floating_button} from '@images';
import {BaseNavigationContainer, useNavigation} from '@react-navigation/native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getTrimester} from '../screens/app/Home/components';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, trackingAppEvent} from '@util';

export const FLoatingAIButton = () => {
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const week = useSelector((state: any) => state?.home?.week);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const trimester = getTrimester(weekPregnant?.weeks ?? week) || 1;

  const content = [
    {
      trimester: 1,
      contentVi:
        'Mẹ xinh iu ơi, đừng quên uống vitamin bầu để đảm bảo sức khỏe cho mẹ và con nhé! 💊 Nếu chưa biết bổ sung gì, mẹ hãy tham khảo ngay các loại vitamin bầu tốt nhất được chuyên gia Matida khuyến nghị tại đây nhé! 🌟',
      contentEn:
        "Hi Mom, friendly reminder to keep up with your pregnancy vitamins for you and your little one's health! 💊 We've got a list of the best ones if you need recommendations. Take a look here! 🌟",
      link: 'https://admin.matida.app/editorial-management/220',
    },
    {
      trimester: 2,
      contentVi:
        'Mẹ ơi, trong tam cá nguyệt thứ 2 này, mẹ chú ý sử dụng mỹ phẩm lành tính để đảm bảo an toàn cho con mà mẹ vẫn tự tin tỏa sáng nhé! 💄 Tham khảo ngay danh sách những mỹ phẩm an toàn nhất cho mẹ trong thai kỳ được Matida tuyển chọn! ✨',
      contentEn:
        "Hi Mom, attention in trimester 2! Don't forget about using pregnancy-safe cosmetics to keep you and your baby healthy and happy! 💄 We've curated a list of the safest options for you. Let's glow together! ✨",
      link: 'https://admin.matida.app/editorial-management/212',
    },
    {
      trimester: 3,
      contentVi:
        'Mẹ ơi, 👶 Mẹ có háo hức được gặp con không? Đừng quên đóng gói sẵn túi đồ đi sinh mẹ nhé! 🧳 Matida chuẩn bị giúp mẹ một danh sách bao gồm tất tần tật những món đồ mẹ cần chuẩn bị rồi đây! Mẹ yên tâm nha! 💪',
      contentEn:
        "Hi Mom, 👶 It's crunch time! Remember to pack your hospital bag essentials for a smooth delivery! 🧳 Need a checklist? We've got you covered with everything you'll need. You've got this! 💪",
      link: 'https://admin.matida.app/editorial-management/585',
    },
  ];

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
    fadeIn();
  };

  useEffect(() => {
    const tout = setTimeout(() => {
      clearTimeout(tout);
      getData();
    }, 60000);

    const tout2 = setTimeout(() => {
      clearTimeout(tout2);
      fadeOut();
    }, 120000);
  }, []);

  const onNnavigateChatAPI = () => {
    // setData('');
    fadeOut();
    trackingAppEvent(event.TIDA.TIDA_OPEN, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT, {data: data});
  };

  const onCloseTidaQuestion = () => {
    // setData('');
    fadeOut();
  };

  const contentTrimester = () => {
    if (lang === 1) {
      return content.filter(item => item.trimester === trimester)[0].contentEn;
    } else {
      return content.filter(item => item.trimester === trimester)[0].contentVi;
    }
  };

  const onNavigateFeed = () => {
    const id = content
      .filter(item => item.trimester === trimester)[0]
      .link.slice(-3);
    navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
      id: id,
      content_type: 'article',
    });
  };

  return (
    <View style={[styles.container, {zIndex: data ? 999 : 0}]}>
      <Animated.View
        style={[
          {
            //Bind opacity to animated value
            opacity: fadeAnim,
            flex: 1,
          },
        ]}>
        <TouchableOpacity
          style={styles.wrapContentContainer}
          onPress={onNavigateFeed}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: scaler(12),
            }}>
            <Text style={{...stylesCommon.fontWeight600, fontSize: scaler(13)}}>
              Tida AI
            </Text>
            <TouchableOpacity
              style={{
                height: scaler(16),
                width: scaler(16),
                borderRadius: 99,
                backgroundColor: colors.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onCloseTidaQuestion}>
              <Text style={{color: colors.white}}>X</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...stylesCommon.fontSarabun400,
              fontSize: scaler(13),
              marginBottom: scaler(12),
            }}>
            {contentTrimester()}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View />
            <View
              style={{
                backgroundColor: colors.blue,
                paddingVertical: scaler(4),
                paddingHorizontal: scaler(12),
                borderRadius: scaler(16),
              }}>
              <Text
                style={{
                  ...stylesCommon.fontSarabun600,
                  fontSize: scaler(11),
                  color: colors.white,
                }}>
                Xem ngay
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
    bottom: scaler(50),
    alignItems: 'flex-end',
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
  wrapContentContainer: {
    flex: 1,
    backgroundColor: colors.pink400,
    borderWidth: 1,
    borderColor: colors.pink300,
    borderRadius: scaler(16),
    padding: scaler(16),
  },
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
