import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {heightFullScreen} from '../../DetailFeed/useDetailFeed';
import {colors, scaler} from '@stylesCommon';

const ContentDeal = props => {
  const {data} = props;

  const onPressGetDeal = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.wrapSubTitle}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
          }}
          style={{
            width: 16,
            height: 16,
            borderRadius: 99,
          }}
        />
        <Text style={{color: colors.textSmallColor}}>
          {` by`}{' '}
          <Text style={{color: colors.success_message}}>{data.author}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onPressGetDeal}>
        <Text style={styles.buttonTitle}>Get deal</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam alias
        consectetur reprehenderit quo quae accusamus voluptatibus maiores
        laborum dicta. Quis, consequuntur. Eaque error neque, facere
        reprehenderit ullam dolores iusto repudiandae!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    maxHeight: heightFullScreen,
    justifyContent: 'flex-end',
    zIndex: 9999,
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  wrapSubTitle: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
  },
  wrapButtonContainer: {
    width: scaler(98),
    height: scaler(40),
    backgroundColor: colors.brandMainPinkRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
    marginTop: scaler(4),
    marginBottom: scaler(4),
  },
  buttonTitle: {
    fontSize: scaler(14),
    color: colors.white,
    fontWeight: '500',
  },
  description: {
    fontSize: scaler(14),
    color: colors.white,
  },
});

export default ContentDeal;
