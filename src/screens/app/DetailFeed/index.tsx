import {ic_back, ic_search} from '@images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import PagerView from 'react-native-pager-view';
import HeaderFeed from '../../../component/HeaderFeed';
import {IDataListFeed} from '../Feed/type';
import Container from './components/Container';
import DailyQuizFeed from './components/DailyQuizFeed';
import DrawerFeed from './components/DrawerFeed';
import FooterFeed from './components/FooterFeed';
import ItemArticle from './components/ItemArticle';
import ItemPurchase from './components/ItemPurchase';
import ItemVideo from './components/ItemVideo';
import PackageQuizFeed from './components/PackageQuizFeed';
import {SwiperFlatList} from './SwiperFlatlist/SwiperFlatList';
import useDetailFeed from './useDetailFeed';
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
  const pagerViewRef = useRef<SwiperFlatList>();
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
      case 'article':
        return (
          <ItemArticle item={item} isFocused={state.currentIndex == index} />
        );
      default:
        return null;
    }
  };

  const onPageHandler = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    onPageSelected(currentPage);
  };
  const onPageHandlerFlatlist = (item: {index: number; prevIndex: number}) => {
    console.log('=>(index.tsx:81) item', item);
    onPageSelected(item.index);
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
  const _getItemLayout = (
    data: IDataListFeed[] | undefined | null,
    index: number,
  ) => {
    return {
      length:
        Platform.select({
          android: heightScreen - 27,
          ios: heightScreen - 65,
        }) || 0,
      offset:
        (Platform.select({
          android: heightScreen - 27,
          ios: heightScreen - 65,
        }) || 0) * index,
      index,
    };
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
        {/*{!!state?.data.length && (*/}
        {/*  <PagerView*/}
        {/*    initialPage={state.currentIndex}*/}
        {/*    orientation={'vertical'}*/}
        {/*    style={[styles.pagerView]}*/}
        {/*    onPageSelected={onPageHandler}*/}
        {/*    ref={pagerViewRef}>*/}
        {/*    {state?.data?.map((item, index) => (*/}
        {/*      <View*/}
        {/*        style={[styles.pagerView]}*/}
        {/*        key={item?.content_type + item?.contentid}>*/}
        {/*        {item.is_payment == '1' && item.content_type !== 'daily_quizz'*/}
        {/*          ? renderPurchase(item, index)*/}
        {/*          : renderItem(item, index)}*/}
        {/*      </View>*/}
        {/*    ))}*/}
        {/*  </PagerView>*/}
        {/*)}*/}
        <SwiperFlatList
          index={state.currentIndex}
          disableIntervalMomentum={true}
          decelerationRate={0}
          disableScrollViewPanResponder={true}
          data={state.data}
          onChangeIndex={onPageHandlerFlatlist}
          vertical={true}
          onEndReachedThreshold={1}
          onEndReached={handleLoadMore}
          getItemLayout={_getItemLayout}
          initialNumToRender={1}
          windowSize={10}
          removeClippedSubviews
          keyExtractor={item => item?.content_type + item?.contentid}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.pagerView]}>
                {item.is_payment == '1' && item.content_type !== 'daily_quizz'
                  ? renderPurchase(item, index)
                  : renderItem(item, index)}
              </View>
            );
          }}
          pagingEnabled={true}
        />

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
