import {changeTabForum} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {ItemPostHorizontal} from './ItemPostHorizontal';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, trackingAppEvent} from '@util';

type Props = {
  data: any;
  index: number;
};

export const ListPostHorizontal = (props: Props) => {
  const dispatch = useDispatch();
  const {data, index} = props;

  const lang = useSelector((state: any) => state?.auth?.lang);
  const listTab = useSelector((state: RootState) => state?.forum?.listTab);
  const itemTab = listTab.find(val => val?.short_code === data?.short_code);

  const renderItem = ({item}: {item: any; index: number}) => {
    return (
      <ItemPostHorizontal
        item={item}
        key={item?.id}
        index={index}
        isListPost={true}
      />
    );
  };

  const onPressSeeMore = () => {
    const params = {
      data: data,
      index: index,
    };
    trackingAppEvent(
      event.FORUM.CLICK_SEE_MORE,
      {data: data.short_code},
      eventType.MIX_PANEL,
    );
    navigate(ROUTE_NAME.LIST_DETAIL_POST, params);
  };

  return (
    <View style={{backgroundColor: colors.white}}>
      {data?.posts.length > 0 ? (
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>
            {lang === 2 ? data?.name_vi : data?.name_en}
          </Text>
          <TouchableOpacity onPress={onPressSeeMore}>
            <Text style={styles.txtSeemore}>{t('home.seeMore')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{marginBottom: scaler(-32)}} />
      )}
      <FlatList
        data={data?.posts ?? [1, 1, 1, 1, 1, 1]}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  txtTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.black,
    fontSize: scaler(16),
    marginTop: scaler(8),
  },
  txtSeemore: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.pink4,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: scaler(16),
  },
  list: {
    flexGrow: 0,
    marginVertical: scaler(16),
  },
  listContentContainer: {
    paddingLeft: scaler(16),
  },
});
