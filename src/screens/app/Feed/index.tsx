import {AppHeader} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import React, {useRef} from 'react';
import {FlatList, View} from 'react-native';
import ListFeed from './components/ListFeed';
import {IDataListFeed} from './type';

const Feed = () => {
  const dataListFeed: IDataListFeed[] = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      view: '230',
      duration: '2',
      title: 'Yoga for mom',
      author: 'pregnancy Podcast',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      view: '230',
      duration: '2',
      title: 'Yoga for mom',
      author: 'pregnancy Podcast',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      view: '230',
      duration: '2',
      title: 'Yoga for mom',
      author: 'pregnancy Podcast',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      view: '230',
      duration: '2',
      title: 'Yoga for mom',
      author: 'pregnancy Podcast',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      view: '230',
      duration: '2',
      title: 'Yoga for mom',
      author: 'pregnancy Podcast',
    },
  ];

  const navigation = useNavigation<any>();
  const refFlatList = useRef<FlatList>(null);

  const navigateUser = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
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
    <View style={{backgroundColor: colors.white}}>
      <AppHeader
        onPressAvatar={navigateUser}
        onPressLogo={handlePressLogo}
        onPressSearch={onPressSearch}
        bgc={colors.white}
      />
      <ListFeed data={dataListFeed} />
    </View>
  );
};

export default Feed;
