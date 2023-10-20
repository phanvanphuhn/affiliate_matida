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

const DetailDeal = props => {
  const {route} = props;

  return (
    <View style={{flex: 1}}>
      <HeaderFeed
        IconLeft={<Image source={ic_back} style={styles.iconHeader} />}
      />
      <LazyImage
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
        }}
        resizeMode={'cover'}
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
    </View>
  );
};

export default React.memo(DetailDeal);

const styles = StyleSheet.create({
  container: {},
  fullScreen: {
    width: widthFullScreen,
    height: heightFullScreen / 2.5,
  },
  floatingContainer: {
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
  iconHeader: {height: 22, width: 22},
});
