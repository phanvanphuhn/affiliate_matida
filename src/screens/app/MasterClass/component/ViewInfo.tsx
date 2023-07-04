import {
  AppImage,
  ModalConfirmPay,
  ModalConfirmPayment,
  ViewExpert,
  ViewLock,
  ViewPrice,
} from '@component';
import {EPaymentType} from '@constant';
import {SvgCrown, SvgHeart, SvgHearted} from '@images';
import {getDataHomeByWeek} from '@redux';
import {postCourseMasterClass} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {convertTime, getConvertViewer} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {systemFonts, tagsStyles} from '../settingHTML';
type Props = {
  data: any;
  onCallBack: () => void;
};
const ViewInfo = React.memo(({data, onCallBack}: Props) => {
  const dispatch = useDispatch<any>();

  const lang = useSelector((state: any) => state?.auth?.lang);
  const week = useSelector((state: any) => state?.home?.week);

  const {t} = useTranslation();

  const totalPay = data?.total_price_vn;
  const eachPay = data?.each_price_vn;
  const isPayment = !data?.is_paid;
  const refPay = useRef<ModalConfirmPayment>(null);

  const source = {
    html: lang === 2 ? data?.description_vn : data?.description_en,
  };

  const [isLike, setIsLike] = useState<boolean>(data?.is_liked ?? false);
  const [totalLike, setTotalLike] = useState<number>(+data?.totalLike ?? 0);

  const refFirst = useRef<boolean>(false);
  const refLike = useRef<boolean>(isLike);
  const refTotal = useRef<number>(totalLike);

  useEffect(() => {
    refLike.current = data?.is_liked ?? false;
    setIsLike(data?.is_liked ?? false);
    refTotal.current = +data?.totalLike ?? 0;
    setTotalLike(+data?.totalLike ?? 0);
  }, [data]);

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
  }, [isLike]);

  const handlePressLike = () => {
    isLike ? setTotalLike(totalLike - 1) : setTotalLike(totalLike + 1);
    setIsLike(!isLike);
  };

  const handleEventLike = async () => {
    if (isLike !== refLike.current) {
      try {
        const res = await postCourseMasterClass(data?.id);
        refLike.current = isLike;
        refTotal.current = totalLike;
        dispatch(getDataHomeByWeek({week: week}));
      } catch (e) {
        setIsLike(refLike.current);
        setTotalLike(refTotal.current);
      }
    }
  };

  return (
    <>
      <View style={styles.viewImage}>
        <AppImage uri={data?.image} style={styles.image} />
        {isPayment ? (
          <ViewLock
            icon={<SvgCrown />}
            style={styles.viewOpacity}
            showText
            opacity="ba"
          />
        ) : null}
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.txtTitleInfo}>
          {lang === 2 ? data?.title_vn : data?.title_en}
        </Text>
        {isPayment ? (
          <View style={[styles.viewRow]}>
            <ViewPrice
              endingText={t('masterClass.video')}
              price={eachPay}
              style={{marginRight: scaler(16), marginBottom: scaler(4)}}
            />
            <ViewPrice
              button
              endingText={t('masterClass.course')}
              price={totalPay}
              onPress={() => refPay.current?.open()}
            />
          </View>
        ) : null}

        <View style={[styles.viewRow, {marginTop: scaler(4)}]}>
          <Text style={[styles.txtDate, {marginRight: scaler(8)}]}>
            <Text style={[styles.date]}>
              {data?.created_at ? convertTime(data?.created_at) : ''}
            </Text>
          </Text>

          <View
            style={{
              maxWidth: widthScreen - scaler(80),
              marginBottom: scaler(12),
            }}>
            <ViewExpert
              name={data?.expert_name}
              avatar={data?.expert_image}
              numberOfLine={2}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewLike}
          activeOpacity={0.9}
          onPress={handlePressLike}>
          {isLike ? <SvgHearted /> : <SvgHeart />}

          <Text
            style={{
              fontSize: scaler(12),
              ...stylesCommon.fontWeight400,
              color: colors.borderColor,
              marginLeft: scaler(6),
            }}>
            <Text
              style={{color: colors.textColor, ...stylesCommon.fontWeight600}}>
              {getConvertViewer(+totalLike)}
            </Text>
            {t(+totalLike < 2 ? 'masterClass.like' : 'masterClass.likes', {
              like: '',
            })}
          </Text>
        </TouchableOpacity>
        <RenderHTML
          contentWidth={widthScreen}
          systemFonts={systemFonts}
          tagsStyles={{...tagsStyles}}
          source={source}
          enableExperimentalMarginCollapsing={true}
          enableExperimentalBRCollapsing={true}
          enableExperimentalGhostLinesPrevention={true}
        />
      </View>
      {data?.is_paid ? null : (
        <ModalConfirmPay
          ref={refPay}
          isPay={!data?.is_paid}
          price={totalPay}
          type={EPaymentType.COURSE_MASTER_CLASS}
          id={data?.id}
          onCallBack={onCallBack}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  viewImage: {
    width: '100%',
    height: scaler(289),
    borderRadius: scaler(12),
  },
  viewOpacity: {
    width: '100%',
    height: scaler(289),
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: scaler(12),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: scaler(289),
    borderRadius: scaler(12),
  },
  txtPremium: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    color: '#FFFFFF',
    marginTop: scaler(6),
  },
  viewInfo: {
    paddingHorizontal: scaler(4),
    paddingTop: scaler(16),
    borderBottomWidth: 1,
    borderColor: '#F6F4F6',
    paddingBottom: scaler(4),
  },
  txtTitleInfo: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(18),
    lineHeight: scaler(25),
  },
  viewPrice: {
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(8),
    borderRadius: scaler(16),
    borderWidth: scaler(2),
    borderColor: colors.primary,
    marginTop: scaler(19),
    marginBottom: scaler(10),
    marginRight: scaler(16),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(12),
    marginBottom: scaler(6),
    flexWrap: 'wrap',
  },
  txtPrice: {
    fontSize: scaler(10),
    color: colors.primary,
    ...stylesCommon.fontWeight800,
    lineHeight: scaler(13),
  },
  txtDate: {
    marginVertical: scaler(8),
    lineHeight: scaler(18),
  },
  date: {
    color: '#7C7C7C',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
  },
  name: {
    color: '#28B4AE',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
  },
  viewLike: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    alignSelf: 'flex-start',
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    borderRadius: scaler(16),
    marginBottom: scaler(2),
  },
});

export {ViewInfo};
