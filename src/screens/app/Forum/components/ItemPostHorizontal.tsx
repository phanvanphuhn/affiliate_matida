/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {AppImage} from '@component';
import {colorRoom} from '@constant';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LikeView} from './LikeView';

const itemWidth = (widthScreen - scaler(48)) / 2;
const itemHeight = (itemWidth * 242) / 171;

const contextWidth = (155 * itemWidth) / 171;
const contextHeight = (129 * contextWidth) / 155;

type Props = {
  item: any;
  index: number;
  mgb?: number;
  isListPost?: boolean;
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
          justifyContent: 'flex-end',
        },
        styles.content,
      ]}>
      {/* <ImageBackground
        source={{uri: image}}
        style={[styles.imageBackground, styles.content]}
        imageStyle={{borderRadius: scaler(8)}}
        resizeMode={'stretch'}>
        <View style={styles.context}>
          <Content isImageView />
        </View>
      </ImageBackground> */}
      <AppImage
        uri={image}
        style={{
          width: itemWidth,
          height: itemHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1000,
        }}
        log={item}
        resizeMode={'stretch'}
      />
      <View style={styles.context}>
        <Content isImageView />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onNavigate}
      style={[
        styles.container,
        styles.content,
        {
          backgroundColor: '#F6F6F9',
          marginBottom: props?.mgb ? props?.mgb : 0,
          width: props?.isListPost ? itemWidth * 0.9 : itemWidth,
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
    color: colors.black,
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
