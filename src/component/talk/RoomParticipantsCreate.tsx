import {
  avatarDefault,
  LogoApp,
  SvgBox,
  SvgCalendar,
  SvgCheckBox,
  SvgSearch,
} from '@images';
import {getListUserApi} from '@services';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {getUseField} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {AppButton} from '../AppButton';
import {AppImage} from '../AppImage';
import {AppModal} from '../AppModal';
import {RoomButtonSelect} from './RoomButtonSelect';

export const RoomParticipantsCreate = () => {
  const {t} = useTranslation();

  const {value, setValue} = getUseField('participants');
  const [data, setData] = useState<any[]>(value);
  const [list, setList] = useState<any[]>([]);
  const [text, onChangeText] = useState<string>('');

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const modal = useRef<any>(null);

  const pageRef = useRef<number>(1);
  const totalRef = useRef<number>(0);
  const refLoadMore = useRef<boolean>(true);

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

  const handleOnPress = (itemValue: any) => {
    //value?.some(item => item?.id === user?.id)
    if (data?.some(item => item?.id === itemValue?.id)) {
      setData(data.filter((item: any) => item?.id !== itemValue?.id));
    } else {
      setData([...data, itemValue]);
    }
  };

  const handleInvite = () => {
    setValue([...data]);
    setTimeout(() => {
      modal.current?.close();
    }, 50);
  };

  const handleClosed = () => {
    setData([...value]);
  };

  const handleLoadMore = () => {
    if (list?.length < totalRef.current && refLoadMore.current) {
      setLoadMore(true);
      getListUser();
    }
  };

  const onRefresh = () => {
    pageRef.current = 1;
    onChangeText('');
    // getData();
  };

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    [],
  );

  const handlePressCancel = () => {
    onChangeText('');
    setData([]);
    Keyboard.dismiss();
  };

  return (
    <View style={s.container}>
      <Text style={s.textTitle}>{t('talk.participants')}</Text>
      <RoomButtonSelect
        icon={<SvgSearch />}
        label={t('talk.inviteParticipants')}
        onPress={() => modal.current?.open()}
      />
      <AppModal
        position="bottom"
        ref={modal}
        onClosed={handleClosed}
        modalSize={{
          height: heightScreen - scaler(100),
          width: widthScreen,
        }}>
        <View style={{paddingVertical: scaler(16), flex: 1}}>
          <View
            style={[
              s.row,
              {
                borderBottomColor: colors.gray,
                borderBottomWidth: scaler(1),
                paddingBottom: scaler(16),
              },
            ]}>
            <TextInput
              style={s.input}
              placeholder={t('talk.searchUser') as string}
              maxLength={200}
              value={text}
              onChangeText={onChangeText}
            />
            <TouchableOpacity style={s.cancelView} onPress={handlePressCancel}>
              <Text style={s.textCancel}>{t('talk.cancel')}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: scaler(16),
              flex: 1,
              paddingBottom: scaler(30),
            }}>
            <Text style={s.textSelected}>
              {t('talk.usersSelected', {index: data?.length})}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              data={list}
              renderItem={({item, index}) => (
                <UserItemParticipant
                  user={item}
                  value={data}
                  onPress={handleOnPress}
                  index={index}
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
                    <View style={s.viewLoadmore}>
                      <ActivityIndicator color={colors.primary} size="small" />
                    </View>
                  ) : null}
                </>
              }
            />
            <AppButton
              titleButton={t('talk.invite')}
              customStyleButton={{marginTop: scaler(16)}}
              onClick={handleInvite}
            />
          </View>
        </View>
      </AppModal>
    </View>
  );
};

type PropsItem = {
  user: any;
  index: number;
  value: any[];
  onPress: (value: any) => void;
};

const UserItemParticipant = ({index, onPress, value, user}: PropsItem) => {
  //participants

  // const isSelected = !!value?.includes(index);
  const isSelected = value?.some(item => item?.id === user?.id);
  return (
    <TouchableOpacity
      style={s.viewItem}
      activeOpacity={0.9}
      onPress={() => onPress(user)}>
      <View style={s.row}>
        {user?.avatar ? (
          <AppImage user uri={user?.avatar} style={s.image} />
        ) : (
          <Image source={avatarDefault} style={s.image} />
        )}
        <Text numberOfLines={1} style={s.textName}>
          {user?.name ?? 'User'}
        </Text>
      </View>
      {isSelected ? <SvgCheckBox /> : <SvgBox />}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    paddingTop: scaler(4),
    paddingBottom: scaler(20),
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: scaler(8),
    fontSize: scaler(14),
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(16),
    ...stylesCommon.fontWeight400,
    flex: 1,
    marginLeft: scaler(16),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelView: {
    padding: scaler(16),
  },
  textCancel: {
    color: colors.textSmallColor,
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
  },
  image: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(20),
  },
  viewItem: {
    paddingVertical: scaler(8),
    // paddingHorizontal: scaler(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSelected: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.brandMainPinkRed,
    marginBottom: scaler(8),
    marginTop: scaler(20),
  },
  textName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.gray300,
    marginLeft: scaler(12),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});
