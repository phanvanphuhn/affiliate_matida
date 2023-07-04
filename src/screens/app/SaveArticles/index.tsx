import {Header} from '@component';
import {SvgArrowLeft} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {getListSaveArticleOfWeek, GlobalService} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {Item} from './component/Item';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

const SaveArticles = () => {
  // const [weeks, setWeeks] = useState<number>(week);
  const [listSave, setListSave] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<any>(null);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

  const refList = useRef<FlatList>(null);

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.SAVED_ARTICLES, {});
      getListSaveArticle();
    }, []),
  );

  useUXCam(ROUTE_NAME.SAVED_ARTICLES);

  // useEffect(() => {
  //   if (week) {
  //     getListSaveArticle();
  //   }
  // }, [week]);

  useEffect(() => {
    if (isLoadMore === true) {
      getListSaveArticle();
    } else {
      null;
    }
  }, [isLoadMore]);
  const handleLoadMore = () => {
    if (listSave?.length >= total) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  const getListSaveArticle = async () => {
    try {
      GlobalService.showLoading();

      const res = await getListSaveArticleOfWeek(page);
      if (page === 1) {
        setListSave(res?.data?.items);
      } else {
        setListSave(listSave?.concat(res?.data?.items));
      }
      setTotal(res?.data?.meta?.itemCount);
      setIsLoadMore(false);
    } catch (error: any) {
    } finally {
      setTimeout(() => {
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      GlobalService.hideLoading();
    }
  };

  // const onSelectWeek = useCallback((value: any) => {
  //   setPage(1);
  //   getListSaveArticle();
  // }, []);

  const onRefresh = useCallback(async () => {
    await setPage(1);
    getListSaveArticle();
  }, []);

  const handlePressUnSave = (id: number) => {
    try {
      setListSave(listSave.filter((item: any) => item?.article.id !== id));
      Toast.show({
        type: 'customToast',
        props: {id: id, onPressUndo: handleUndo},
      });
    } catch (e) {}
  };

  const handleUndo = () => {
    try {
      onRefresh();
    } catch (e) {}
  };

  const renderItem = ({item}: any) => {
    return <Item item={item} onPressUnSave={handlePressUnSave} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('articles.saveArticles')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      {/* <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => onSelectWeek(value)}
      /> */}
      <View style={[styles.container]}>
        {/* <Text style={styles.txtTitle}>Popular articles</Text> */}
        <FlatList
          ref={refList}
          data={listSave}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>No data</Text>
              </View>
            );
          }}
          keyExtractor={(index: any) => index.id.toString()}
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    paddingTop: scaler(10),
  },
  paddingContainer: {
    paddingHorizontal: scaler(16),
  },
  containerPicker: {
    marginTop: scaler(25),
    marginBottom: scaler(20),
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(16),
    marginBottom: scaler(20),
    marginLeft: scaler(16),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});

export {SaveArticles};
