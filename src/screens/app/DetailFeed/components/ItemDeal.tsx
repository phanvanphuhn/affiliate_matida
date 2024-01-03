import {LogoApp} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ItemDeal = (props: any) => {
  const {index, item, onDetailClick} = props;

  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onDetailClick(index, item)}>
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
        <Text numberOfLines={2} style={{fontSize: 12}}>
          {lang == 2 ? item.name_vi : item.name_en}
        </Text>

        <View style={styles.wrapBottomItemContainer}>
          <Image
            source={
              item.provider
                ? {
                    uri: item.provider.avatar,
                  }
                : LogoApp
            }
            style={{
              width: scaler(10),
              height: scaler(10),
              borderRadius: 99,
              marginRight: scaler(4),
            }}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: colors.textSmallColor, fontSize: scaler(10)}}>
              {t('deal.by')}{' '}
              <Text style={{color: colors.success_message}}>
                {item.provider ? item.provider.name : 'Matida'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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

export default ItemDeal;
