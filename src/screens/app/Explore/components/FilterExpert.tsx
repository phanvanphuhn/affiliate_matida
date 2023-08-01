import {AppButton, AppImage} from '@component';
import {SvgCaretDown, SvgIconDelete, SvgSearch} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {changePageExplore} from '@redux';
import {getListExpertVideo} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Page} from '../type';
import {HeaderFilter} from './HeaderFilter';

type Props = {
  onCallback: () => void;
  pageExplore: Page;
};

export const FilterExpert = ({pageExplore, onCallback}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const filter = useSelector((state: any) => state?.explore?.filter);

  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const refList = useRef<FlatList>(null);
  const pageRef = useRef<number>(1);
  const loadMoreRef = useRef<boolean>(false);

  const filtered = filter?.expert?.length > 0;

  useFocusEffect(
    React.useCallback(() => {
      setTotal(0);
      setSearch('');
    }, []),
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      pageRef.current = 1;
      setTimeout(() => {
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      getData();
    }, 400);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const getData = async () => {
    try {
      loadMoreRef.current = false;
      if (pageRef.current === 1) {
        setLoading(true);
      }
      const res = await getListExpertVideo(pageRef.current, search);
      if (pageRef.current === 1) {
        setData(res?.data?.data);
      } else {
        setData(data?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
    } catch (e) {
    } finally {
      loadMoreRef.current = true;
      setLoadMore(false);
      setLoading(false);
    }
  };

  const handlePressExpert = (item: any) => {
    dispatch(
      changePageExplore({
        page: 1,
        pageExplore: pageExplore,
        expert: item?.expert_name ?? '',
        option: filter?.option,
        trimesters: [],
        topics: [],
      }),
    );
    onCallback();
    handleCancel();
  };

  const handleDelete = () => {
    dispatch(
      changePageExplore({
        page: 1,
        pageExplore: pageExplore,
        expert: '',
        option: filter?.option,
        trimesters: [],
        topics: [],
      }),
    );
    onCallback();
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
    setSearch('');
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressExpert(item)}
        activeOpacity={0.9}
        style={[
          styles.viewItem,
          {
            backgroundColor:
              filter?.expert === item?.expert_name
                ? colors.pink150
                : colors.white,
          },
        ]}>
        <AppImage uri={item?.expert_image} user style={styles.avatarExpert} />
        <View style={{flex: 1}}>
          <Text numberOfLines={2}>
            {item?.expert_name ?? t('profileSettings.typeUser.1')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    pageRef.current = 1;
    getData();
  };

  const loadMoreData = () => {
    if (data?.length < total && loadMoreRef.current) {
      setLoadMore(true);
      getData();
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.9}
        style={[
          styles.btnOption,
          {
            marginLeft: scaler(5),
            marginRight: 0,
            backgroundColor: filtered ? colors.brandMainPinkRed : '#F7F7F7',
            opacity: 1,
          },
        ]}>
        <Text
          style={{
            ...stylesCommon.fontWeight400,
            fontSize: scaler(14),
            textAlign: 'center',
            color: filtered ? colors.white : colors.gray200,
          }}>
          {t('profileSettings.typeUser.1')}
        </Text>
        <SvgCaretDown stroke={filtered ? colors.white : colors.gray200} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
        animationType="fade">
        <View style={styles.containerModal}>
          <View
            style={styles.viewOut}
            //@ts-ignore
            onStartShouldSetResponder={handleCancel}
          />
          <View style={[styles.containerViewModal]}>
            <HeaderFilter
              onPress={handleCancel}
              title={t('explore.filterExpert')}
            />
            <View
              style={{
                paddingHorizontal: scaler(16),
                paddingBottom: scaler(12),
              }}>
              <View style={[styles.viewInput, {backgroundColor: '#F6F6F6'}]}>
                <SvgSearch />
                <TextInput
                  onChangeText={setSearch}
                  value={search}
                  style={styles.inputSearch}
                  placeholder={t('explore.searchExpert') as string}
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <SvgIconDelete />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {loading ? (
              <View
                style={[
                  {flex: 1, alignItems: 'center', paddingTop: scaler(30)},
                ]}>
                <ActivityIndicator color={colors.primary} size="small" />
              </View>
            ) : (
              <FlatList
                ref={refList}
                data={data}
                keyboardDismissMode="on-drag"
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.1}
                renderItem={renderItem}
                onEndReached={loadMoreData}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={handleRefresh}
                  />
                }
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.viewEmpty}>
                      <Text style={styles.textNoData}>
                        {t('explore.noDataExpert')}
                      </Text>
                    </View>
                  );
                }}
                ListFooterComponent={
                  <>
                    {loadMore === true ? (
                      <View style={styles.viewLoadmore}>
                        <ActivityIndicator
                          color={colors.primary}
                          size="small"
                        />
                      </View>
                    ) : null}
                  </>
                }
              />
            )}
            <View style={{paddingHorizontal: scaler(16)}}>
              <AppButton
                titleButton={t('articles.filter.clearAll')}
                customStyleButton={[
                  styles.buttonSave,
                  {
                    marginBottom: scaler(30),
                    backgroundColor: colors.white,
                    marginTop: scaler(4),
                  },
                ]}
                customStyleText={{
                  color: colors.brandMainPinkRed,
                }}
                onClick={handleDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  btnOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(12),
    borderRadius: scaler(40),
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: scaler(8),
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  textFilter: {
    ...stylesCommon.fontWeight400,
    color: colors.textSmallColor,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    height: '95%',
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  viewHeaderModal: {
    paddingVertical: scaler(10),
  },
  placeholder: {
    color: colors.borderColor,
    fontSize: scaler(14),
    lineHeight: scaler(17),
    ...stylesCommon.fontWeight500,
  },
  itemFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
  },
  textItemFilter: {
    marginLeft: scaler(8),
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    lineHeight: 21,
  },
  textTitleFilter: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    lineHeight: 19,
    marginBottom: scaler(16),
  },
  textClear: {
    color: colors.brandMainPinkRed,
    fontSize: scaler(14),
    textAlign: 'right',
  },
  buttonSave: {
    alignSelf: 'center',
    height: undefined,
    backgroundColor: colors.brandMainPinkRed,
    paddingVertical: scaler(14),
    paddingHorizontal: scaler(32),
    marginTop: scaler(20),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(40),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
  viewItem: {
    paddingVertical: scaler(16),
    borderBottomWidth: scaler(1),
    borderBottomColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(12),
  },
  avatarExpert: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(16),
    marginRight: scaler(16),
  },
});
