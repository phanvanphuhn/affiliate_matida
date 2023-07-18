import {
  Header,
  HeaderMasterClass,
  ModalConfirmPay,
  ModalConfirmPayment,
} from '@component';
import {EPaymentType} from '@constant';
import {SvgArrowLeft} from '@images';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {payMasterClassHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {getMasterClassDetail, GlobalService} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ViewDescription} from './component/ViewDescription';
import {ViewInfo} from './component/ViewInfo';
import {ViewList} from './component/ViewList';

const MasterClass = () => {
  const route = useRoute<any>();
  const {id} = route?.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state.auth.lang);

  const [data, setData] = useState<any>({});
  const [itemSelected, setItemSelected] = useState<any>();

  const refPay = useRef<ModalConfirmPayment>(null);

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.MASTER_CLASS, {});
    }, []),
  );

  useUXCam(ROUTE_NAME.MASTER_CLASS);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      GlobalService.showLoading();
      const res = await getMasterClassDetail(id);
      setData(res?.data);
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handlePay = (item: any) => {
    setItemSelected(item);
    setTimeout(() => {
      refPay.current?.open();
    }, 100);
  };

  const onPayAll = async () => {
    dispatch(payMasterClassHome({id: data?.id}));
    await getData();
  };

  return (
    <View style={styles.container}>
      {/* <Header
        title={t('home.masterClass')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        // ComponentRight={<Image source={iconSave} />}
      /> */}
      <HeaderMasterClass />
      <ScrollView>
        <View style={styles.viewContent}>
          <ViewInfo data={data} onCallBack={onPayAll} />
          <ViewDescription data={data} />
          <ViewList onPay={handlePay} data={data} />
        </View>
      </ScrollView>
      <ModalConfirmPay
        ref={refPay}
        isPay={!itemSelected?.is_paid}
        price={data?.each_price_vn}
        type={EPaymentType.VIDEO_MASTER_CLASS}
        id={itemSelected?.id}
        onCallBack={getData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: scaler(16),
  },
});

export {MasterClass};
