import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getTrimester} from './PregnancyProgress';
import {getTimePregnancy} from '@util';
import {WEEK_MAX} from '@constant';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {AppImage} from '@component';

const screenWidth = Dimensions.get('window').width;

const PregnancyTracker = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const duaDate = useSelector((state: any) => state?.auth?.userInfo?.due_date);
  const trimester = getTrimester(weekPregnant?.weeks ?? week);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const data = useSelector((state: any) => state?.home?.data);
  const babyProgress = data?.babyProgress;
  const imageBaby = babyProgress?.baby?.image
    ? babyProgress?.baby?.image[0]
    : '';

  const cardWidth = () => {
    return ((screenWidth - 48) / 100) * 63;
  };

  const handleWeeklyTracker = () => {
    navigation.navigate(ROUTE_NAME.SIZE_COMPARISON, {
      // option: OptionComparison.EMBRYO,
      option: 1,
    });
  };

  const handleDatesTracker = () => {
    navigation.navigate(ROUTE_NAME.SIZE_COMPARISON, {
      // option: OptionComparison.EMBRYO,
      option: 2,
    });
  };

  const handleBodyMom = () => {
    navigation.navigate(ROUTE_NAME.SIZE_COMPARISON, {
      // option: OptionComparison.EMBRYO,
      option: 1,
      isBody: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleWeeklyTracker}
        style={{
          width: cardWidth(),
          marginRight: scaler(16),
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: scaler(40),
            paddingVertical: scaler(4),
            position: 'absolute',
            zIndex: 999,
            bottom: scaler(96),
            left: scaler(8),
            paddingLeft: scaler(2),
            paddingRight: scaler(4),
            width: scaler(73),
          }}>
          <Text
            style={{
              color: colors.pink300,
              ...stylesCommon.fontWeight600,
              fontSize: scaler(11),
              textAlign: 'center',
            }}>
            {t(`home.trimester.${trimester - 1}`)}
          </Text>
        </View>
        <AppImage
          uri={imageBaby}
          style={{
            height: scaler(224),
            width: '100%',
            borderTopLeftRadius: scaler(16),
            borderTopRightRadius: scaler(16),
          }}
          resizeMode="cover"
        />
        <View
          style={{
            padding: scaler(8),
            backgroundColor: colors.white,
            borderBottomLeftRadius: scaler(16),
            borderBottomRightRadius: scaler(16),
          }}>
          <Text
            style={{
              ...stylesCommon.fontSarabun500,
              fontSize: scaler(13),
            }}>
            {`${weekPregnant?.weeks} ${lang == 1 ? 'weeks' : 'tuần'}`}{' '}
            {Number(weekPregnant?.days) > 0
              ? `& ${weekPregnant?.days} ${lang == 1 ? 'days' : 'ngày'}`
              : null}
          </Text>
          <View
            style={{
              width: '100%',
              height: 4,
              borderRadius: 999,
              backgroundColor: colors.gray3,
              marginVertical: scaler(4),
            }}>
            <View
              style={{
                width: (week / WEEK_MAX) * cardWidth() - scaler(16),
                height: 4,
                borderRadius: 999,
                backgroundColor: colors.pink4,
              }}
            />
          </View>
          <Text
            style={{
              ...stylesCommon.fontSarabun400,
              fontSize: scaler(11),
              marginBottom: scaler(8),
            }}>
            {t('home.dueOn')} {getTimePregnancy(new Date(duaDate))}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                ...stylesCommon.fontWeight500,
                fontSize: scaler(14),
              }}>
              {t('home.weeklyTracker')}
            </Text>
            <Image
              source={{
                uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709233511816009607.png',
              }}
              style={{width: scaler(16), height: scaler(16)}}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={handleDatesTracker}
          style={{
            marginBottom: scaler(8),
            borderRadius: scaler(16),
          }}>
          <Image
            source={{
              uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709233709273009924.png',
            }}
            style={{
              height: scaler(118),
              width: '100%',
            }}
            resizeMode="cover"
          />
          <View
            style={{
              backgroundColor: colors.white,
              padding: scaler(8),
              borderBottomLeftRadius: scaler(16),
              borderBottomRightRadius: scaler(16),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...stylesCommon.fontWeight500,
                fontSize: scaler(14),
              }}>
              {t('home.dates')}
            </Text>
            <Image
              source={{
                uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709233511816009607.png',
              }}
              style={{width: scaler(16), height: scaler(16)}}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBodyMom}
          style={{borderRadius: scaler(16)}}>
          <Image
            source={{
              uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709234015192564618.png',
            }}
            style={{
              height: scaler(118),
              width: '100%',
              borderTopLeftRadius: scaler(16),
              borderTopRightRadius: scaler(16),
            }}
            resizeMode="cover"
          />
          <View
            style={{
              backgroundColor: colors.white,
              padding: scaler(8),
              borderBottomLeftRadius: scaler(16),
              borderBottomRightRadius: scaler(16),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...stylesCommon.fontWeight500,
                fontSize: scaler(14),
              }}>
              {t('home.body')}
            </Text>
            <Image
              source={{
                uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709233511816009607.png',
              }}
              style={{width: scaler(16), height: scaler(16)}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default PregnancyTracker;
