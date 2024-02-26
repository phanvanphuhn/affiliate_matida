import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {Dimensions, Image, Linking, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {getTrimester} from './PregnancyProgress';
import {useSelector} from 'react-redux';
import {event, eventType, trackingAppEvent} from '@util';

const screenWidth = Dimensions.get('screen').width;

const productList = [
  {
    index: 1,
    trimester: 1,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962155659047038.png',
    productLink: 'https://shope.ee/6KfdQmNsn2',
  },
  {
    index: 2,
    trimester: 1,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962208607632187.png',
    productLink: 'https://shope.ee/4AbJxAGx4S',
  },
  {
    index: 3,
    trimester: 1,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962294346604004.png',
    productLink: 'https://shope.ee/mLQtj0rY',
  },
  {
    index: 4,
    trimester: 2,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962395056228879.png',
    productLink: 'https://shope.ee/5pk8NzV78e',
  },
  {
    index: 5,
    trimester: 2,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962432286157306.png',
    productLink: 'https://shope.ee/Vhzv7QlCf',
  },
  {
    index: 6,
    trimester: 2,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962466375072409.png',
    productLink: 'https://shope.ee/3VLV8HEQ7A',
  },
  {
    index: 7,
    trimester: 3,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962534775391636.png',
    productLink: 'https://shope.ee/9A0Tzm8VXj',
  },
  {
    index: 8,
    trimester: 3,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962578027081380.png',
    productLink: 'https://shope.ee/LP5UZksIM',
  },
  {
    index: 9,
    trimester: 3,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1708962614350501892.png',
    productLink: 'https://shope.ee/6AMsSn9Izh',
  },
];

const ProductCarousel = (props: any) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const week = useSelector((state: any) => state?.home?.week);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const trimester = getTrimester(weekPregnant?.weeks ?? week);
  const productListByTrimester = productList?.filter(
    item => item.trimester == trimester,
  );

  const [activeSlide, setActiveSlide] = useState();

  const renderItemCarousel = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: scaler(16),
          borderRadius: scaler(16),
        }}
        onPress={() => {
          if (props?.isHome) {
            trackingAppEvent(
              event.BANNER.ecom_banner_home,
              {
                userId: user?.id,
                productLink: item?.productLink,
                productName: item?.productImage,
              },
              eventType.MIX_PANEL,
            );
          } else {
            trackingAppEvent(
              event.BANNER.ecom_banner_tracker,
              {
                userId: user?.id,
                productLink: item?.productLink,
                productName: item?.productImage,
              },
              eventType.MIX_PANEL,
            );
          }

          Linking.canOpenURL(item?.productLink).then(supported => {
            if (supported) {
              Linking.openURL(item?.productLink);
            } else {
              return;
            }
          });
        }}>
        <Image
          source={{uri: item?.productImage}}
          style={{height: scaler(264), width: '100%', borderRadius: scaler(16)}}
          resizeMode="center"
        />
      </TouchableOpacity>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={productListByTrimester?.length}
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
    <View>
      <Carousel
        // ref={c => {
        //   carouselRef?.current = c;
        // }}
        data={productListByTrimester}
        renderItem={renderItemCarousel}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'default'}
        autoplay={true}
        autoplayInterval={4000}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
      />
      {pagination()}
    </View>
  );
};

export default ProductCarousel;
