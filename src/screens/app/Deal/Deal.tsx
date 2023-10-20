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
import {GlobalService} from '@services';

type TMockData = {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  authorImage: string;
  data: Object;
};

const Deal = () => {
  const [data, setData] = useState<any>();

  const getListDealFromApi = async () => {
    GlobalService.showLoading();
    try {
      const res = await getListDeal();
      if (res?.success) {
        GlobalService.hideLoading();
        setData(res?.data);
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
  }, []);

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
        onPressAvatar={navigateUser}
        onPressNotification={navigateNotification}
        onPressMessage={navigationMessage}
        onPressLogo={handlePressLogo}
        bgc="white"
      />
      <View style={styles.wrapContainer}>
        <ListDeal data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
