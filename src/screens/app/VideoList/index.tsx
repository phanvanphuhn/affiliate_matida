import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {Header, PickerWeek} from '@component';
import {SvgArrowLeft, iconClock, iconPlay} from '@images';
import {useTranslation} from 'react-i18next';
import {colors} from '@stylesCommon';
import {useSelector} from 'react-redux';
import {GlobalService, getListVideoOfWeek} from '@services';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import Video from 'react-native-video';
import {Item} from './Item';
import {trackingAppEvent, event, useUXCam} from '@util';

const VideoList = () => {
  useUXCam(ROUTE_NAME.VIDEO_LIST);
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [dataVideo, setDataVideo] = useState([]);
  const [localWeek, setLocalWeek] = useState(null);
  const [total, setTotal] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

  const refList = useRef<FlatList>(null);
  const refWeek = useRef<number>(week ?? 40);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.VIDEO_LIST, {});
    if (week) {
      getListVideo(week);
    }
  }, [week]);

  useFocusEffect(
    React.useCallback(() => {
      getListVideo(refWeek.current);
    }, [week]),
  );

  const handleLoadMore = () => {
    if (dataVideo?.length >= total) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  useEffect(() => {
    if (isLoadMore === true) {
      getListVideo(localWeek);
    } else {
      null;
    }
  }, [isLoadMore]);

  const getListVideo = async (value: any) => {
    setLocalWeek(value);
    refWeek.current = value;
    try {
      GlobalService.showLoading();

      const res = await getListVideoOfWeek(value, page);
      if (page === 1) {
        setDataVideo(res?.data?.data);
      } else {
        setDataVideo(dataVideo?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      setIsLoadMore(false);
    } catch (error: any) {
    } finally {
      setTimeout(() => {
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      GlobalService.hideLoading();
    }
  };

  const onSelectWeek = useCallback((value: any) => {
    setPage(1);
    getListVideo(value);
  }, []);

  const onRefresh = useCallback(async () => {
    await setPage(1);
    getListVideo(localWeek);
  }, [localWeek]);

  const renderItem = ({item}: any) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('videoList.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => onSelectWeek(value)}
      />
      <View style={styles.container}>
        <FlatList
          data={dataVideo}
          ref={refList}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('videoList.noData')}</Text>
              </View>
            );
          }}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <>
              {isLoadMore === true ? (
                <View style={styles.viewLoadmore}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              ) : null}
            </>
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
};

export {VideoList};
