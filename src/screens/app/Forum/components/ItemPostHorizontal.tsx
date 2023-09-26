/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {colorRoom} from '@constant';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useCallback} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LikeView} from './LikeView';

const itemWidth = (widthScreen - scaler(48)) / 2;
const itemHeight = (itemWidth * 242) / 171;

const contextWidth = (155 * itemWidth) / 171;
const contextHeight = (129 * contextWidth) / 155;

type Props = {
  item: any;
  index: number;
};

export const ItemPostHorizontal = (props: Props) => {
  const {item, index} = props;
  const navigation = useNavigation<any>();

  const image = item?.image;
  const onNavigate = () => {
    navigation.navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: item?.id});
  };

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
          {item?.content}
        </Text>
        <LikeView onNavigate={onNavigate} data={item} color={!isImageView} />
      </>
    );
  }, []);

  return image ? (
    <TouchableOpacity
      onPress={onNavigate}
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
        resizeMode={'stretch'}>
        <View style={styles.context}>
          <Content isImageView />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onNavigate}
      style={[
        styles.container,
        styles.content,
        {
          backgroundColor: colorRoom[index],
        },
      ]}>
      <Content />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: scaler(8),
    marginRight: scaler(16),
    backgroundColor: '#29B4AF',
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
