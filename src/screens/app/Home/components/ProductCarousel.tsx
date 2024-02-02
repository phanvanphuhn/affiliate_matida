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
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706718622209122726.png',
    productLink: 'https://shope.ee/5pjWDmJEMk',
  },
  {
    index: 2,
    trimester: 1,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720137078661856.png',
    productLink: 'https://shope.ee/5V6hZoVjaE',
  },
  {
    index: 3,
    trimester: 1,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720187351737354.png',
    productLink: 'https://shope.ee/3pyLS03YWV',
  },
  {
    index: 4,
    trimester: 2,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720216110933262.png',
    productLink: 'https://shope.ee/9ewEsk5qFS',
  },
  {
    index: 5,
    trimester: 2,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720242457352242.png',
    productLink: 'https://shope.ee/9pFf9eQTPo',
  },
  {
    index: 6,
    trimester: 3,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720266280160666.png',
    productLink: 'https://shope.ee/8UkB2oie0W',
  },
  {
    index: 7,
    trimester: 3,
    productImage:
      'https://s3.ap-southeast-1.amazonaws.com/matida/1706720291261198074.png',
    productLink: 'https://shope.ee/6Kfmw6ydF8',
  },
];

const ProductCarousel = () => {
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
          trackingAppEvent(
            event.BANNER.ecom_banner_1,
            {
              userId: user?.id,
              productLink: item?.productLink,
              productName: item?.productImage,
            },
            eventType.MIX_PANEL,
          );
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
