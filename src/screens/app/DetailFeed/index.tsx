import {ic_back, ic_search} from '@images';
import React, {useRef, useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {heightScreen, widthScreen} from '@stylesCommon';
import SliderFeed from './components/SliderFeed';
import Container from './components/Container';
import ItemPurchase from './components/ItemPurchase';
interface DetailFeedProps {}
const DetailFeed = (props: DetailFeedProps) => {
  const {state, onPageSelected, handleLoadMore, handleLoadLess} =
    useDetailFeed();
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation<any>();
  const pagerViewRef = useRef<PagerView>();
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
      default:
        return (
          <ItemArticle item={item} isFocused={state.currentIndex == index} />
        );
    }
  };

  const onPageHandler = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    console.log('=>(index.tsx:54) currentPage', currentPage);
    const reachedFakeLastSlide = currentPage === 0;
    const reachedFakeFirstSlide = currentPage === state.data.length - 1;

    if (reachedFakeFirstSlide) {
      pagerViewRef.current?.setPageWithoutAnimation(1);
    } else if (reachedFakeLastSlide) {
      pagerViewRef.current?.setPageWithoutAnimation(state.data.length - 2);
    } else {
      onPageSelected(event);
    }
    console.log(
      '=>(index.tsx:52) event.nativeEvent.position',
      event.nativeEvent.position,
    );
    console.log('=>(index.tsx:53) state?.data.length', state?.data.length);
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
            initialPage={state.currentIndex}
            orientation={'vertical'}
            style={styles.pagerView}
            onPageSelected={onPageHandler}
            ref={pagerViewRef}>
            {state?.data?.map((item, index) => (
              <View style={styles.pagerView} key={item.id}>
                {!item.isPurchase
                  ? renderItem(item, index)
                  : renderPurchase(item, index)}
              </View>
            ))}
          </PagerView>
        )}
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
  },
});
