/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useCallback} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {LikeView} from './LikeView';

const itemWidth = (widthScreen - scaler(48)) / 2;
const itemHeight = (itemWidth * 242) / 171;

const contextWidth = (155 * itemWidth) / 171;
const contextHeight = (129 * contextWidth) / 155;

type Props = {
  item: any;
  isImage?: boolean;
};

export const ItemPostHorizontal = (props: Props) => {
  const {item, isImage} = props;
  const navigation = useNavigation<any>();

  const onNavigate = () => {
    navigation.navigate(
      ROUTE_NAME.DETAIL_NEWFEED,
      // {id: item?.id}
    );
  };

  const image =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oat_milk_glass_and_bottles.jpg/640px-Oat_milk_glass_and_bottles.jpg';

  const Content = useCallback(({isImageView}: {isImageView?: boolean}) => {
    return (
      <>
        <Text
          style={[
            styles.txtContent,
            isImageView && {
              color: '#9699B3',
              fontSize: scaler(12),
            },
          ]}>
          {
            'Ba họ Trần, mẹ họ Nguyễn thì nên đặt tên con là gì nhỉ các mẹ? Bé em là bé gái. Có mẹ nào đặt tên con theo thần số học không'
          }
        </Text>
        <LikeView onNavigate={onNavigate} color={!isImageView} />
      </>
    );
  }, []);

  return isImage ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'transparent',
        },
      ]}>
      <ImageBackground
        source={{uri: image}}
        style={[styles.imageBackground, styles.content]}
        imageStyle={{borderRadius: scaler(8)}}
        resizeMode={'cover'}>
        <View style={styles.context}>
          <Content isImageView />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View style={[styles.container, styles.content]}>
      <Content />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: scaler(8),
    marginRight: scaler(16),
    backgroundColor: 'blue',
  },
  txtContent: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: 'white',
    marginBottom: scaler(7),
    flexGrow: 1,
    flexShrink: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingBottom: scaler(12),
    paddingHorizontal: scaler(10),
    borderRadius: scaler(8),
    paddingTop: scaler(25),
  },
  context: {
    width: contextWidth,
    height: contextHeight,
    borderRadius: scaler(16),
    backgroundColor: '#FDFAF8',
    paddingHorizontal: scaler(9),
    paddingVertical: scaler(12),
    opacity: 0.9,
  },
});
