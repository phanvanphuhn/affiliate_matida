import {ic_back, ic_search} from '@images';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HeaderFeed from '../../../component/HeaderFeed';
import {IDataListFeed} from '../Feed/type';
import FooterFeed from './components/FooterFeed';
import ItemArticle from './components/ItemArticle';
import ItemVideo from './components/ItemVideo';
import PagerView from 'react-native-pager-view';
import useDetailFeed from './useDetailFeed';
import {Drawer} from 'react-native-drawer-layout';
import DrawerFeed from './components/DrawerFeed';
import {ROUTE_NAME} from '@routeName';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {heightScreen, widthScreen} from '@stylesCommon';
interface DetailFeedProps {}
const DetailFeed = (props: DetailFeedProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {state} = useDetailFeed();
  const [open, setOpen] = React.useState(false);
  const refDrawer = useRef<Drawer>();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const renderItem = (item: IDataListFeed, index: number) => {
    switch (item.type) {
      case 'video':
      case 'podcast':
        return (
          <ItemVideo
            item={item}
            isPause={(open && currentIndex == index) || !isFocused}
            isFocused={currentIndex == index}
            isAudio={item.type == 'podcast'}
          />
        );
      default:
        return <ItemArticle item={item} isFocused={currentIndex == index} />;
    }
  };

  const renderDrawer = () => {
    return <DrawerFeed />;
  };
  const onPressSearch = () => {
    navigation.navigate(ROUTE_NAME.SEARCH_FEED);
  };
  return (
    <Drawer
      drawerType={'front'}
      drawerPosition={'right'}
      open={open}
      drawerStyle={{
        backgroundColor: '#00000000',
        width: '50%',
      }}
      swipeEdgeWidth={100}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={renderDrawer}>
      <View style={styles.container}>
        <HeaderFeed
          IconLeft={<Image source={ic_back} style={styles.iconHeader} />}
          onPressRight={onPressSearch}
          ComponentRight={
            <Image source={ic_search} style={styles.iconHeader} />
          }
        />
        <PagerView
          orientation={'vertical'}
          style={styles.pagerView}
          onPageSelected={e => setCurrentIndex(e.nativeEvent.position)}
          initialPage={0}>
          {state?.data?.map((item, index) => (
            <View style={styles.pagerView} key={index.toString()}>
              {renderItem(item, index)}
            </View>
          ))}
        </PagerView>
        <View style={{height: 65, zIndex: -1}}>
          <FooterFeed />
        </View>
      </View>
    </Drawer>
  );
};

export default DetailFeed;

const styles = StyleSheet.create({
  iconHeader: {height: 22, width: 22},
  container: {
    backgroundColor: '#141414',
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
});
