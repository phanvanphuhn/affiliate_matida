import {Header} from '@component';
import {SvgArrowLeft, SvgSearch} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const SearchFeed = () => {
  const {t} = useTranslation();

  const [searchValue, setSearchValue] = useState<string>('');

  const dataRecent = [
    {
      id: 1,
      avatar:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      name: 'abc',
    },
    {
      id: 2,
      avatar:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      name: 'def',
    },
  ];

  const dataHotTopic = [
    {
      id: 1,
      avatar:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      name: 'abc',
    },
    {
      id: 2,
      avatar:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      name: 'def',
    },
    {
      id: 3,
      avatar:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      name: 'xyz',
    },
  ];

  const renderDataRecent = ({item}: any) => {
    return (
      <View style={styles.wrapRecentItem}>
        <FastImage
          source={{uri: item.avatar}}
          style={styles.imageRecentAvatar}
        />

        <Text style={styles.recentItemTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    );
  };

  const renderDataHotTopic = ({item}: any) => {
    return (
      <View style={styles.wrapHotTopicItem}>
        <FastImage
          source={{uri: item.avatar}}
          style={styles.imageHotTopicAvatar}
        />

        <Text style={styles.recentItemTitle}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('feed.search')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        styleContainer={{backgroundColor: colors.white}}
        styleContainerSafeArea={{backgroundColor: colors.white}}
      />

      <View style={styles.wrapTextInputContainer}>
        <View style={styles.wrapIconTextInput}>
          <SvgSearch color={'#CCD2E3'} />
        </View>
        <TextInput
          onChangeText={text => setSearchValue(text)}
          placeholder={t('feed.search') || ''}
          numberOfLines={1}
          selectionColor={colors.black}
          style={{width: '80%'}}
        />
      </View>

      <View style={styles.wrapContainer}>
        <Text style={[styles.title, {marginBottom: scaler(12)}]}>Recent</Text>

        <FlatList data={dataRecent} renderItem={renderDataRecent} />
      </View>

      <View style={styles.wrapContainer}>
        <Text style={[styles.title, {marginBottom: scaler(8)}]}>Hot Topic</Text>

        <FlatList data={dataHotTopic} renderItem={renderDataHotTopic} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapTextInputContainer: {
    marginHorizontal: scaler(16),
    height: scaler(50),
    backgroundColor: '#F5F5FF',
    borderRadius: scaler(16),
    paddingHorizontal: scaler(16),
    flexDirection: 'row',
    width: '91%',
    marginBottom: scaler(24),
  },
  wrapIconTextInput: {
    justifyContent: 'center',
    marginRight: scaler(16),
  },
  wrapContainer: {
    paddingHorizontal: scaler(16),
    marginBottom: scaler(16),
  },
  title: {
    color: colors.black,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
  wrapRecentItem: {
    flexDirection: 'row',
    marginBottom: scaler(8),
    alignItems: 'center',
  },
  imageRecentAvatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: 99,
    marginRight: scaler(8),
  },
  recentItemTitle: {
    color: colors.black,
    fontSize: scaler(12),
    width: '90%',
    ...stylesCommon.fontWeight400,
  },
  wrapHotTopicItem: {
    flexDirection: 'row',
    marginBottom: scaler(4),
    alignItems: 'center',
  },
  imageHotTopicAvatar: {
    width: scaler(24),
    height: scaler(24),
    borderRadius: 99,
    marginRight: scaler(8),
  },
});

export default SearchFeed;
