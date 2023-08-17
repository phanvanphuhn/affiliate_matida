import {ic_back, ic_search} from '@images';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {heightScreen, widthScreen} from '@stylesCommon';
import SliderFeed from './components/SliderFeed';
import Container from './components/Container';
import ItemPurchase from './components/ItemPurchase';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DailyQuizFeed from './components/DailyQuizFeed';
import PackageQuizFeed from './components/PackageQuizFeed';
interface DetailFeedProps {}
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = heightScreen / (previewCount + 0.5);
//to center items you start from 3/4 firstItemWidth
const startScroll = (itemWidth * 3) / 4;

const DetailFeed = (props: DetailFeedProps) => {
  const {state, onPageSelected, handleLoadMore, handleLoadLess} =
    useDetailFeed();
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation<any>();
  const pagerViewRef = useRef<FlatList>();
  const isFocused = useIsFocused();
  const renderItem = (item: IDataListFeed, index: number) => {
    switch (item.content_type) {
      case 'video':
      case 'podcast':
        return (
          <ItemVideo
            item={item}
            isPause={(open && state.currentIndex == index) || !isFocused}
            isFocused={state.currentIndex == index}
            isAudio={item.content_type == 'podcast'}
          />
        );
      case 'daily_quizz':
        return (
          <DailyQuizFeed item={item} isFocused={state.currentIndex == index} />
        );
      case 'package_quizz':
        return (
          <PackageQuizFeed
            item={item}
            isFocused={state.currentIndex == index}
          />
        );
      default:
        return (
          <ItemArticle item={item} isFocused={state.currentIndex == index} />
        );
    }
  };

  const onPageHandler = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    onPageSelected(currentPage);
  };
  const renderDrawer = () => {
    return <DrawerFeed />;
  };
  const renderPurchase = (item: IDataListFeed, index: number) => {
    return <ItemPurchase item={item} />;
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
      <Container>
        <HeaderFeed
          IconLeft={<Image source={ic_back} style={styles.iconHeader} />}
          onPressRight={onPressSearch}
          ComponentRight={
            <Image source={ic_search} style={styles.iconHeader} />
          }
        />
        {!!state?.data.length && (
          <PagerView
            key={state?.data.length}
            initialPage={state.currentIndex}
            orientation={'vertical'}
            style={[styles.pagerView]}
            onPageSelected={onPageHandler}
            ref={pagerViewRef}>
            {state?.data?.map((item, index) => (
              <View
                style={[styles.pagerView]}
                key={item?.content_type + item?.id}>
                {!item.is_payment
                  ? renderItem(item, index)
                  : renderPurchase(item, index)}
              </View>
            ))}
          </PagerView>
        )}
        <View style={{height: 65, zIndex: 999}}>{<FooterFeed />}</View>
      </Container>
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
    position: 'relative',

    height: Platform.select({
      ios: heightScreen - 65,
      android: heightScreen - 25,
    }),
  },
});
