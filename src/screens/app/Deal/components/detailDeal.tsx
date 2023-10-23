// import {LazyImage} from '@component';
import {LazyImage} from '@component';
import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IDataListFeed} from '../../Feed/type';
import {
  heightFullScreen,
  widthFullScreen,
} from '../../DetailFeed/useDetailFeed';
import {ic_back} from '@images';
import HeaderFeed from '@component/HeaderFeed';
import ContentDeal from './contentDeal';
import {colors} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailDeal = (props: any) => {
  const {route} = props;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderFeed
        IconLeft={<Image source={ic_back} style={styles.iconHeader} />}
      />
      <LazyImage
        source={{
          uri: route?.params.data.thumbnails['6x4'],
        }}
        fastImage={true}
        style={styles.fullScreen}
      />
      {/* <LinearGradient
        colors={['#00000000', '#00000090']}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      /> */}
      <ContentDeal data={route?.params?.data} />
    </SafeAreaView>
  );
};

export default React.memo(DetailDeal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fullScreen: {
    width: widthFullScreen,
    height: heightFullScreen / 5,
  },
  floatingContainer: {
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
  iconHeader: {height: 22, width: 22},
});
