import {colors, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Linking, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {getTrimester} from './PregnancyProgress';
import {useSelector} from 'react-redux';
import {event, eventType, trackingAppEvent} from '@util';
import FastImage from 'react-native-fast-image';
import {getBannerProduct} from '../../../../services/pregnancyProgram';

const screenWidth = Dimensions.get('screen').width;

const ProductCarousel = (props: any) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const week = useSelector((state: any) => state?.home?.week);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const trimester = getTrimester(weekPregnant?.weeks ?? week) || 1;

  const [activeSlide, setActiveSlide] = useState();
  const [listBannerProduct, setListBannerProduct] = useState();
  const getListBannerProduct = async () => {
    const data = await getBannerProduct(trimester);
    setListBannerProduct(data?.data);
  };

  useEffect(() => {
    getListBannerProduct();
  }, []);

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
                productLink: item?.link,
                productName: item?.images[0]?.url,
              },
              eventType.MIX_PANEL,
            );
          } else {
            trackingAppEvent(
              event.BANNER.ecom_banner_tracker,
              {
                userId: user?.id,
                productLink: item?.link,
                productName: item?.images[0]?.url,
              },
              eventType.MIX_PANEL,
            );
          }
          if (item?.link) {
            Linking.canOpenURL(item?.link).then(supported => {
              console.log('supported: ', supported);
              if (supported) {
                Linking.openURL(item?.link);
              } else {
                return;
              }
            });
          } else {
            return;
          }
        }}>
        <Image
          source={{uri: item?.images[0]?.url}}
          style={{height: scaler(264), width: '100%', borderRadius: scaler(16)}}
          resizeMode="center"
        />
      </TouchableOpacity>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={listBannerProduct?.data?.length}
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
        data={listBannerProduct?.data}
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
