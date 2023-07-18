import {Header} from '@component';
import {EChatOption} from '@constant';
import {SvgArrowLeft} from '@images';
import {changeOption, getListUserChat} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {getListUserApi} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListHeaderComponent} from './components';
import {ListMessageChat} from './ListMessageChat';
import {ListMessageUser} from './ListMessageUser';

export const ListMessage = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const option = useSelector((state: any) => state?.listChat?.option);

  useUXCam(ROUTE_NAME.LIST_MESSAGE);

  useEffect(() => {
    dispatch(changeOption(EChatOption.CHAT));
    trackingAppEvent(event.SCREEN.LIST_MESSAGE, {});
    getDataUser();
    return () => {
      dispatch(changeOption(EChatOption.CHAT));
    };
  }, []);

  const getDataUser = async () => {
    try {
      const res = await getListUserApi('', 1);
      dispatch(getListUserChat({page: 1, data: res?.data?.data}));
    } catch (e) {
    } finally {
    }
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header
        title={t('chat.title')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <ListHeaderComponent />
      {option === EChatOption.CHAT ? <ListMessageChat /> : <ListMessageUser />}
      {/* <View style={{flexGrow: 1}}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray250,
    borderRadius: scaler(8),
    flex: 1,
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
    marginHorizontal: scaler(16),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
    flex: 1,
    flexGrow: 1,
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadMore: {
    alignItems: 'center',
    marginBottom: scaler(8),
    marginTop: scaler(16),
    // backgroundColor: colors.backgroundDefault,
  },
});
