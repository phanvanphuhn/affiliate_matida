import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('screen').width;

const GetSupport = (props: any) => {
  const {showBottomSheetConsultant} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [activeSlide, setActiveSlide] = useState();

  const listImage = {
    en: [
      user?.baby_type == 'newborn'
        ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1710863175446774941.png'
        : 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859552934329521.png',
      'https://s3.ap-southeast-1.amazonaws.com/matida/1710862820062877442.png',
    ],
    vi: [
      user?.baby_type == 'newborn'
        ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1710863146950337762.png'
        : 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859420184627150.png',
      'https://s3.ap-southeast-1.amazonaws.com/matida/1710862789823619590.png',
    ],
  };

  const renderItemCarousel = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{marginVertical: scaler(16)}}
        onPress={showBottomSheetConsultant}>
        <Image
          source={{
            uri: item,
          }}
          style={{
            width: '100%',
            height: scaler(126),
            borderRadius: scaler(16),
          }}
          resizeMode="center"
        />
      </TouchableOpacity>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={lang == 1 ? listImage?.en?.length : listImage?.vi.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: -4,
          backgroundColor: colors.pink4,
        }}
        inactiveDotStyle={{
          backgroundColor: '#D0D1D9',
        }}
        inactiveDotScale={1}
        containerStyle={{paddingVertical: scaler(12)}}
      />
    );
  };

  return (
    <>
      <Text style={styles.title}>
        {user?.baby_type === 'newborn'
          ? t('home.getSupportNewBorn')
          : t('home.getSupport')}
      </Text>
      <TouchableOpacity style={{flex: 1}} onPress={showBottomSheetConsultant}>
        <Image
          source={{
            uri:
              lang == 1
                ? user?.baby_type === 'newborn'
                  ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1711074893898170872.png'
                  : 'https://s3.ap-southeast-1.amazonaws.com/matida/1711074791318887937.png'
                : user?.baby_type === 'newborn'
                ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1711074944898922804.png'
                : 'https://s3.ap-southeast-1.amazonaws.com/matida/1711074812391571920.png',
          }}
          style={{
            width: '100%',
            height: scaler(126),
            borderRadius: scaler(16),
          }}
          resizeMode="center"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{flex: 1, marginVertical: scaler(16)}}
        onPress={showBottomSheetConsultant}>
        <Image
          source={{
            uri:
              lang == 1
                ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859552934329521.png'
                : 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859420184627150.png',
          }}
          style={{
            width: '100%',
            height: scaler(126),
            borderRadius: scaler(16),
          }}
          resizeMode="center"
        />
      </TouchableOpacity> */}
      <View>
        <Carousel
          // ref={c => {
          //   carouselRef?.current = c;
          // }}
          data={lang == 1 ? listImage?.en : listImage?.vi}
          renderItem={renderItemCarousel}
          sliderWidth={screenWidth - 32}
          itemWidth={screenWidth - 32}
          layout={'default'}
          autoplay={true}
          autoplayInterval={4000}
          onSnapToItem={index => setActiveSlide(index)}
          loop={true}
        />
        {pagination()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    marginBottom: scaler(12),
    marginTop: scaler(16),
  },
});

export default GetSupport;
