import {Header, PickerWeek} from '@component';
import {SvgArrowLeft} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getListVideoOfWeek, GlobalService} from '@services';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Item} from './Item';
import {styles} from './styles';

const VideoList = () => {
  useUXCam(ROUTE_NAME.VIDEO_LIST);
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const weekRedux =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const week = weekRedux < 0 || weekRedux === null ? 40 : weekRedux;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [dataVideo, setDataVideo] = useState([]);
  const [localWeek, setLocalWeek] = useState(null);
  const [total, setTotal] = useState<any>(null);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

  const refList = useRef<FlatList>(null);
  const refWeek = useRef<number>(week ?? 40);
  const refLoadMore = useRef<boolean>(true);
  const refPage = useRef<number>(1);

  useFocusEffect(
    React.useCallback(() => {
      refPage.current = 1;
      trackingAppEvent(event.SCREEN.VIDEO_LIST, {}, eventType.AFF_FLYER);
      getListVideo(refWeek.current);
    }, [week]),
  );

  const handleLoadMore = () => {
    if (dataVideo?.length < total && refLoadMore.current) {
      refPage.current++;
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
    refLoadMore.current = false;
    try {
      if (refPage.current === 1) {
        GlobalService.showLoading();
      }

      const res = await getListVideoOfWeek(value, refPage.current);
      if (refPage.current === 1) {
        setDataVideo(res?.data?.data);
      } else {
        setDataVideo(dataVideo?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      setIsLoadMore(false);
    } catch (error: any) {
    } finally {
      GlobalService.hideLoading();
      refLoadMore.current = true;
    }
  };

  const onSelectWeek = useCallback((value: any) => {
    refPage.current = 1;
    setTimeout(() => {
      refList?.current?.scrollToOffset({animated: true, offset: 0});
    }, 50);
    getListVideo(value);
  }, []);

  const onRefresh = () => {
    refPage.current = 1;
    getListVideo(localWeek);
  };

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
