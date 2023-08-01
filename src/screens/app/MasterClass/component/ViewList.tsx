import {AppImage, ViewLock, ViewPrice} from '@component';
import {EVideoType} from '@constant';
import {SvgHeart, SvgHearted} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {postVideoMasterClass} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {
  data: any;
  onPay: (item: any) => void;
};

const ViewList = React.memo(({data, onPay}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>{t('masterClass.exclusiveContent')}</Text>
      {data?.videoMasterClasses?.map((item: any) => {
        return (
          <ItemMasterClass
            data={data}
            item={item}
            key={item?.id}
            onPay={onPay}
          />
        );
      })}
    </View>
  );
});

type PropsItem = {
  item: any;
} & Props;

const ItemMasterClass = ({data, item, onPay}: PropsItem) => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();

  const [like, setLike] = useState<boolean>(item?.is_liked ?? false);

  const refFirst = useRef<boolean>(false);
  const refLike = useRef<boolean>(like);

  useEffect(() => {
    const debounceLike = setTimeout(() => {
      if (refFirst.current) {
        handleEventLike();
      } else {
        refFirst.current = true;
      }
    }, 500);
    return () => {
      clearTimeout(debounceLike);
    };
  }, [like]);

  const handleEventLike = async () => {
    if (like !== refLike.current) {
      try {
        const res = await postVideoMasterClass(item?.id);
        refLike.current = like;
      } catch (e) {
        setLike(refLike.current);
      }
    }
  };

  const handlePressHeart = () => setLike(!like);

  const isPaymentCourse = !data?.is_paid;
  const isPayment = !item?.is_paid;

  const handlePress = () => {
    if (data?.is_paid || item?.is_paid) {
      navigate(ROUTE_NAME.DETAIL_VIDEO, {
        type: EVideoType.MASTER_CLASS,
        id: item?.id,
        // url: lang === 2 ? item?.url_vn : item?.url_en,
        // item: item,
      });
    } else {
      onPay(item);
    }
  };

  return (
    <TouchableOpacity
      style={styles.viewItem}
      activeOpacity={0.9}
      onPress={handlePress}>
      <View style={styles.viewImage}>
        <AppImage uri={item?.thumbnail} style={styles.viewImage} />
        {isPaymentCourse && isPayment ? (
          <ViewLock absolute opacity="ba" />
        ) : null}
      </View>
      <View style={{flex: 1, marginLeft: scaler(14)}}>
        <Text style={styles.txtTitleItem} numberOfLines={2}>
          {lang === 2 ? item?.title_vn : item?.title_en}
        </Text>
        <Text style={styles.txtContentItem} numberOfLines={1}>
          <Text style={styles.txtSmall}>{t('podcast.by')} </Text>
          <Text style={styles.txtMedium}>{data?.expert_name}</Text>
        </Text>
        {isPaymentCourse && isPayment ? (
          <ViewPrice
            endingText={t('masterClass.video')}
            price={data?.each_price_vn}
          />
        ) : null}
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePressHeart}
        style={{
          paddingVertical: scaler(10),
          paddingLeft: scaler(10),
          alignSelf: 'flex-start',
        }}>
        {like ? <SvgHearted /> : <SvgHeart />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtHeader: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    color: colors.textColor,
  },
  container: {
    marginTop: scaler(22),
    paddingHorizontal: scaler(4),
    paddingBottom: scaler(20),
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: scaler(20),
    alignItems: 'center',
  },
  viewImage: {
    width: scaler(76),
    height: scaler(76),
    borderRadius: scaler(12),
  },
  viewLock: {
    width: scaler(76),
    height: scaler(76),
    borderRadius: scaler(12),
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleItem: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    lineHeight: scaler(16),
    marginTop: scaler(5),
  },
  txtContentItem: {
    marginVertical: scaler(4),
    lineHeight: scaler(18),
  },
  txtSmall: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    color: '#7C7C7C',
  },
  txtMedium: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    color: '#28B4AE',
  },
  viewPrice: {
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(8),
    borderRadius: scaler(16),
    borderWidth: scaler(2),
    borderColor: colors.primary,
    marginTop: scaler(4),
    marginRight: scaler(16),
  },
  txtPrice: {
    fontSize: scaler(10),
    color: colors.primary,
    ...stylesCommon.fontWeight800,
    lineHeight: scaler(13),
  },
  viewRow: {
    flexDirection: 'row',
  },
});

export {ViewList};
