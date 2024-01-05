import {ic_back, ic_search, iconCrownWhite} from '@images';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, heightScreen, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import HeaderFeed from '../../../component/HeaderFeed';
import {IDataListFeed} from '../Feed/type';
import {SwiperFlatList} from './SwiperFlatlist/SwiperFlatList';
import Container, {useVideo, VideoContext} from './components/Container';
import DailyQuizFeed from './components/DailyQuizFeed';
import DrawerFeed from './components/DrawerFeed';
import FooterFeed from './components/FooterFeed';
import ItemArticle from './components/ItemArticle';
import ItemPurchase from './components/ItemPurchase';
import ItemVideo from './components/ItemVideo';
import PackageQuizFeed from './components/PackageQuizFeed';
import useDetailFeed from './useDetailFeed';
import Swiper from './SwiperFlatlist/Swiper';
import ListFeedDetail from './components/ListFeedDetail';
import {goBack} from '@navigation';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import useCheckPregnancy from '@util/hooks/useCheckPregnancy';

interface DetailFeedProps {
  route: any;
}

const DetailFeed = (props: DetailFeedProps) => {
  const {route} = props;
  const {params} = route;

  const {t} = useTranslation();
  const checkPlan = useCheckPregnancy();

  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation<any>();

  const renderDrawer = () => {
    return <DrawerFeed />;
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
        <ListFeedDetail open={open} />
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
    // height: Platform.select({
    //   ios: heightScreen - 65,
    //   android: heightScreen - 25,
    // }),
  },
});
