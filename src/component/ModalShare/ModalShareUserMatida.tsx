import {SvgArrowLeft, SvgCancel, SvgIconDelete, SvgSearch} from '@images';
import {getListUserApi} from '@services';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppModal} from '../AppModal';
import {ItemShareUser} from './ItemShareUser';
import {IModalShare} from './type';

interface IItem {
  id: number;
  label: string;
  icon: Element;
  onPress: () => void;
}

interface PropsUser {
  link: string;
}

export const ModalShareUserMatida = forwardRef<IModalShare, PropsUser>(
  ({link}, ref) => {
    const [text, onChangeText] = useState<string>('');
    const [list, setList] = useState<any[]>([]);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [listIdUserSelected, setListUserSelected] = useState<string[]>([]);

    const refFirst = useRef(false);

    const pageRef = useRef<number>(1);
    const totalRef = useRef<number>(0);
    const refLoadMore = useRef<boolean>(true);

    const {t} = useTranslation();
    const refUser = useRef<any>(undefined);

    useImperativeHandle(
      ref,
      () => ({
        open() {
          refUser.current?.open();
        },
        close() {
          refUser.current?.close();
        },
      }),
      [],
    );

    useEffect(() => {
      const debounce = setTimeout(() => {
        pageRef.current = 1;
        getListUser();
      }, 500);
      return () => {
        clearTimeout(debounce);
      };
    }, [text]);

    const getListUser = async () => {
      try {
        refLoadMore.current = false;
        const res = await getListUserApi(text, pageRef.current);
        if (pageRef.current === 1) {
          setList(res?.data?.data);
        } else {
          setList(list?.concat(res?.data?.data));
        }
        totalRef.current = res?.data?.total;
        res?.data?.data.length > 0 && pageRef.current++;
      } catch (e) {
      } finally {
        setLoadMore(false);
        setLoading(false);
        refLoadMore.current = true;
      }
    };

    const handleLoadMore = () => {
      if (list?.length < totalRef.current && refLoadMore.current) {
        setLoadMore(true);
        getListUser();
      }
    };

    const onRefresh = () => {
      pageRef.current = 1;
      //   onChangeText('');
      getListUser();
    };

    const handleClose = () => {
      refUser.current?.close();
    };

    const keyExtractor = useCallback(
      (_: any, index: number) => _?.id.toString(),
      [],
    );

    return (
      <>
        <AppModal
          position="bottom"
          ref={refUser}
          modalSize={{
            height: heightScreen - scaler(50),
            width: widthScreen,
          }}>
          <View style={[styles.containerViewModal]}>
            <View style={styles.viewHeaderModal}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{padding: scaler(16)}}
                  onPress={handleClose}>
                  <SvgArrowLeft stroke={colors.textColor} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>{t('articles.shareUser')}</Text>
              </View>
              <TouchableOpacity
                style={{padding: scaler(16)}}
                onPress={handleClose}
                activeOpacity={0.9}>
                <SvgCancel />
              </TouchableOpacity>
            </View>
            <View style={styles.viewInput}>
              <SvgSearch />
              <TextInput
                onChangeText={onChangeText}
                value={text}
                style={styles.inputSearch}
                placeholder={t('articles.inputShareUser') as string}
              />
              {text.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                  <SvgIconDelete />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              contentContainerStyle={{flexGrow: 1}}
              data={list}
              renderItem={({item, index}) => (
                <ItemShareUser
                  user={item}
                  link={link}
                  listIdUserSelected={listIdUserSelected}
                  setListUserSelected={setListUserSelected}
                />
              )}
              keyExtractor={keyExtractor}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                  tintColor={Platform.OS === 'ios' ? colors.primary : undefined}
                />
              }
              ListFooterComponent={
                <>
                  {loadMore === true ? (
                    <View style={styles.viewLoadmore}>
                      <ActivityIndicator color={colors.primary} size="small" />
                    </View>
                  ) : null}
                </>
              }
            />
          </View>
        </AppModal>
      </>
    );
  },
);

const styles = StyleSheet.create({
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(16),
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
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
  },

  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  viewHeaderModal: {
    // paddingVertical: scaler(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scaler(1),
    borderColor: colors.gray,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray250,
    borderRadius: scaler(8),
    height: scaler(50),
    paddingHorizontal: scaler(12),
    marginVertical: scaler(12),
    marginHorizontal: scaler(16),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  avatar: {
    height: scaler(44),
    width: scaler(44),
    borderRadius: scaler(22),
  },
});
