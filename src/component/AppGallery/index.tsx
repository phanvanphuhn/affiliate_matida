import {iconCrownWhite, imageIntro} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {getFirstTextElementHTML} from '@util';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ViewLock, ViewPrice} from '../Payment';
import {Pagination} from './Pagination';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
interface HeaderPropsType {
  onPress: (item: any) => void;
  file: any[];
  weeks: number;
}

export const AppGallery = (props: HeaderPropsType) => {
  const {file = [], onPress} = props;

  const scaleAnimation = useMemo(() => new Animated.Value(0), []);
  const scrollX = new Animated.Value(0);
  const refFlatList = useRef<FlatList>(null);

  useEffect(() => {
    onScrollStart();
  }, [props?.weeks]);

  const onScrollStart = () => {
    setTimeout(() => {
      refFlatList.current?.scrollToOffset({offset: 0, animated: true});
    }, 50);
  };

  const startScaleView = useCallback(() => {
    Animated.sequence([
      Animated.spring(scaleAnimation, {
        toValue: 1,
        bounciness: 15,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnimation]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageNumber = Math.min(
      Math.max(
        Math.round(e.nativeEvent.contentOffset.x / (widthScreen - scaler(40))) +
          1,
        0,
      ),
      file?.length,
    );
  };

  return (
    <View>
      <FlatList
        ref={refFlatList}
        onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={styles.scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={file}
        scrollEnabled={file?.length > 1}
        pagingEnabled
        nestedScrollEnabled
        renderItem={({item}) => {
          return (
            <View style={styles.button}>
              <TouchableOpacity onPress={() => onPress(item)} activeOpacity={1}>
                <NewsWeek news={item} />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      {file?.length > 1 && (
        <View style={{alignSelf: 'center', marginTop: scaler(24)}}>
          <Pagination
            size={file?.length}
            //@ts-ignore
            scrollX={scrollX}
            windowWidth={widthScreen - scaler(40)}
          />
        </View>
      )}
    </View>
  );
};

const NewsWeek = ({news}: {news: any}) => {
  const {content = '', image, title = ''} = news;
  const {t} = useTranslation();
  const isPayment = news?.is_payment && !news?.is_paid;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const isCheckPayment = useMemo(
    () =>
      !user?.user_subscriptions?.some(e => e.code == 'PP') ||
      user.payments.some(e => e.status == 'processing'),
    [user],
  );
  return (
    <View>
      <View>
        <FastImage
          source={image ? {uri: image} : imageIntro}
          style={{
            width: widthScreen - scaler(40),
            height: scaler(289),
            borderRadius: scaler(16),
          }}
        />
        {isPayment && isCheckPayment ? (
          <LinearGradient
            colors={['#0006', '#00000090']}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: scaler(8),
              borderTopRightRadius: scaler(8),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: scaler(8),
                paddingHorizontal: scaler(12),
                backgroundColor: colors.pink4,
                borderRadius: scaler(24),
              }}>
              <Image
                source={iconCrownWhite}
                style={{
                  height: scaler(24),
                  width: scaler(24),
                  marginRight: scaler(8),
                }}
              />
              <Text
                style={{
                  ...stylesCommon.fontSarabun600,
                  fontSize: scaler(13),
                  color: colors.white,
                }}>
                {t('myPurchases.signUpNow')}
              </Text>
            </View>
          </LinearGradient>
        ) : null}
      </View>
      <Text
        numberOfLines={2}
        style={{
          ...stylesCommon.fontWeight600,
          fontSize: scaler(18),
          lineHeight: 27,
          color: colors.textColor,
          marginBottom: scaler(12),
          marginTop: scaler(8),
        }}>
        {title}
      </Text>
      <Text
        numberOfLines={3}
        style={{
          ...stylesCommon.fontWeight400,
          fontSize: scaler(14),
          lineHeight: 21,
          color: colors.textSmallColor,
        }}>
        {getFirstTextElementHTML(content)}
      </Text>
    </View>
  );
};
