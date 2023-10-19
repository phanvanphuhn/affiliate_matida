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
      title: '10% discount on bills from 2,000,000 VND',
      author: 'Vinaquick',
      authorImage: '',
      data: {},
    },
    {
      id: 2,
      thumbnail: '',
      title: '10% discount on bills from 500,000 VND',
      author: 'The Idyl',
      authorImage: '',
      data: {},
    },
    {
      id: 3,
      thumbnail: '',
      title: '500,000 VND discount for photo packages from 2,500,000 VND',
      author: 'Piny Studio',
      authorImage: '',
      data: {},
    },
    {
      id: 4,
      thumbnail: '',
      title: '15% discount',
      author: 'Spa Vuông Tròn',
      authorImage: '',
      data: {},
    },
    {
      id: 5,
      thumbnail: '',
      title: '20% discount for online course',
      author: 'Happy Parent',
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
      <View style={styles.wrapContainer}>
        <ListDeal data={mockData} />
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
    backgroundColor: colors.gray,
  },
});

export default Deal;
