import {AppHeader} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import React, {useRef} from 'react';
import {FlatList, View} from 'react-native';
import ListFeed from './components/ListFeed';

const Feed = () => {
  const navigation = useNavigation<any>();
  const refFlatList = useRef<FlatList>(null);

  const navigateUser = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };

  const navigateSetting = () => {
    navigation.navigate(ROUTE_NAME.SETTING_SCREEN);
  };

  const handlePressLogo = () => {
    setTimeout(() => {
      refFlatList?.current?.scrollToOffset({animated: true, offset: 0});
    }, 0);
  };

  const onPressSearch = () => {
    navigation.navigate(ROUTE_NAME.SEARCH_FEED);
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <AppHeader
        onPressMenu={navigateSetting}
        onPressAvatar={navigateUser}
        onPressLogo={handlePressLogo}
        onPressSearch={onPressSearch}
        bgc={colors.white}
        isFeed={true}
      />
      <ListFeed />
    </View>
  );
};

export default Feed;
