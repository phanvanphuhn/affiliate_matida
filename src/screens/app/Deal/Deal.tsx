import {colors} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {AppHeader} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import ListDeal from './components/listDeal';
import useDetailPost from '../Forum/components/useDetailPost';
import {getListDeal} from '@services/deal';
import {useSelector} from 'react-redux';
import {DEEP_LINK, GlobalService} from '@services';
import {event, eventType, isShowForReviewer, trackingAppEvent} from '@util';
import {FLoatingAIButton} from '@component';
import dynamicLinks from '@react-native-firebase/dynamic-links';

type TMockData = {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  authorImage: string;
  data: Object;
};

const Deal = (props: any) => {
  const {route} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state.auth.lang);

  const [data, setData] = useState<any>();

  // const onShare = async () => {
  //   let link;
  //   data?.map(async item => {
  //     link = await dynamicLinks().buildShortLink(
  //       {
  //         link: `${DEEP_LINK}/deal/${item.id}`,
  //         domainUriPrefix: DEEP_LINK,
  //         android: {
  //           packageName: 'com.growth.levers.matida',
  //           fallbackUrl:
  //             'https://play.google.com/store/apps/details?id=com.growth.levers.matida',
  //         },
  //         ios: {
  //           bundleId: 'com.growth.levers.matida',
  //           appStoreId: '1671957732',
  //           fallbackUrl:
  //             'https://apps.apple.com/vn/app/matida-app-theo-d%C3%B5i-thai-k%E1%BB%B3/id1671957732?l=vi',
  //         },
  //         otherPlatform: {
  //           fallbackUrl: 'https://www.matida.app/',
  //         },
  //         social: {
  //           title: lang == 2 ? item.name_vi : item.name_en,
  //           descriptionText: 'Matida - Ứng dụng đồng hành cùng Mẹ bầu hiện đại',
  //           imageUrl: item.thumbnails['6x4'],
  //         },
  //       },
  //       dynamicLinks.ShortLinkType.UNGUESSABLE,
  //     );
  //     console.log('data link: ', link, item.name_vi);
  //   });
  // };

  // useEffect(() => {
  //   onShare();
  // }, []);

  const getListDealFromApi = async () => {
    GlobalService.showLoading();
    try {
      const res = await getListDeal();
      if (res?.success) {
        GlobalService.hideLoading();
        setData(res?.data);
        if (route?.params?.id) {
          const item = res?.data?.filter(item => item.id == route?.params?.id);
          navigation.navigate(ROUTE_NAME.DETAIL_DEAL, {data: item[0]});
        }
      } else {
        GlobalService.hideLoading();
        console.log('Cannot get list deal');
      }
    } catch (error) {
      GlobalService.hideLoading();
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getListDealFromApi();
  }, [route?.params?.id]);

  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();

  const navigateSetting = () => {
    navigation.navigate(ROUTE_NAME.SETTING_SCREEN);
  };
  const navigateUser = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };
  const navigateNotification = () => {
    navigation.navigate(ROUTE_NAME.NOTIFICATION_LIST);
  };
  const navigationMessage = () => {
    navigation.navigate(ROUTE_NAME.LIST_MESSAGE);
  };
  const handlePressLogo = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }, 0);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        onPressMenu={navigateSetting}
        onPressNotification={navigateNotification}
        onPressLogo={handlePressLogo}
        bgc={colors.white}
        rightNoti={navigateNotification}
        // openNewBorn={openNewBorn}
        onPressMessage={navigationMessage}
      />
      <View style={styles.wrapContainer}>
        <ListDeal data={data} />
        {isShowForReviewer(user) && <FLoatingAIButton />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  wrapContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    backgroundColor: colors.backgroundDefault,
  },
});

export default Deal;
