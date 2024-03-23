import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

type TPros = {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  authorImage: string;
  data: Object;
};

const ListDeal = (props: any) => {
  const {data} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const renderItem = ({item, index}: any) => {
    const onNavigateToDetailDeal = () => {
      trackingAppEvent(
        event.DEAL.CLICK_DEAL,
        {
          params: {
            userId: user.id,
            dealName: item.name_vi,
            dealCode: item.code,
            providerName: item.provider.name,
          },
        },
        eventType.MIX_PANEL,
      );
      navigation.navigate(ROUTE_NAME.DETAIL_DEAL, {data: item});
    };

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onNavigateToDetailDeal}>
        <Image
          source={{
            uri: item.thumbnails['3x4'],
          }}
          style={{
            width: '100%',
            height: scaler(220),
            borderTopLeftRadius: scaler(16),
            borderTopRightRadius: scaler(16),
          }}
        />
        <View style={styles.bottomItemContainer}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 12,
              ...stylesCommon.fontWeight500,
              color: colors.black,
            }}>
            {lang == 2 ? item.name_vi : item.name_en}
          </Text>

          <View style={styles.wrapBottomItemContainer}>
            <Image
              source={{
                uri: item.provider.avatar,
              }}
              style={{
                width: scaler(16),
                height: scaler(16),
                borderRadius: 99,
                marginRight: scaler(4),
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{color: colors.textSmallColor, fontSize: scaler(10)}}>
                {t('deal.by')}{' '}
                <Text style={{color: colors.success_message}}>
                  {item.provider.name}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '47%',
    marginBottom: scaler(16),
    marginRight: scaler(16),
    height: scaler(290),
    borderRadius: scaler(16),
    backgroundColor: colors.white,
  },
  bottomItemContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapBottomItemContainer: {
    flexDirection: 'row',
  },
});

export default ListDeal;
