import {colors} from '@stylesCommon';
import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {AppHeader} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import ListDeal from './components/listDeal';

type TMockData = {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  authorImage: string;
  data: Object;
};

const Deal = () => {
  const mockData: TMockData[] = [
    {
      id: 1,
      thumbnail: '',
      title: 'deal 1',
      author: 'Phu',
      authorImage: '',
      data: {},
    },
    {
      id: 1,
      thumbnail: '',
      title: 'deal 1',
      author: 'Phu',
      authorImage: '',
      data: {},
    },
    {
      id: 1,
      thumbnail: '',
      title: 'deal 1',
      author: 'Phu',
      authorImage: '',
      data: {},
    },
    {
      id: 1,
      thumbnail: '',
      title: 'deal 1',
      author: 'Phu',
      authorImage: '',
      data: {},
    },
    {
      id: 1,
      thumbnail: '',
      title: 'deal 1',
      author: 'Phu',
      authorImage: '',
      data: {},
    },
  ];

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
      <View style={{flex: 1}}>
        <ListDeal data={mockData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Deal;
