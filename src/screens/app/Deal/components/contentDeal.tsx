import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Linking,
} from 'react-native';
import {colors, scaler} from '@stylesCommon';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html';
import {tagsStyles} from '../../DetailArticle/settingHTML';
import {useSelector} from 'react-redux';
import ModalGetDeal from './modalGetDeal';
import CustomImageRenderer from '../../DetailFeed/components/CustomImageRenderer';
import {event, eventType, trackingAppEvent} from '@util';

const ContentDeal = (props: any) => {
  const {data} = props;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onShowModal = () => {
    setIsShowModal(true);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_GET_DEAL,
      {params: data?.code},
      eventType.MIX_PANEL,
    );
  };

  const onCloseModal = () => {
    setIsShowModal(false);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_CANCEL,
      {params: data?.code},
      eventType.MIX_PANEL,
    );
  };

  const onPressGetDeal = () => {
    setIsShowModal(false);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_COPY_CODE,
      {params: data?.code},
      eventType.MIX_PANEL,
    );
    Clipboard.setString(data?.code);
    Linking.openURL(data?.link);
    showMessage({
      message: t('articles.successShare'),
      type: 'default',
      backgroundColor: colors.success_message,
      color: '#FFFFFF',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {lang == 2 ? data?.name_vi : data?.name_en}
      </Text>
      <View style={styles.wrapSubTitle}>
        <Image
          source={{
            uri: data?.provider.avatar,
          }}
          style={{
            width: scaler(16),
            height: scaler(16),
            borderRadius: 99,
            marginRight: scaler(4),
          }}
        />
        <Text style={{color: colors.textSmallColor}}>
          {t('deal.by')}{' '}
          <Text style={{color: colors.success_message}}>
            {data?.provider.name}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onShowModal}>
        <Text style={styles.buttonTitle}>{t('deal.getDeal')}</Text>
      </TouchableOpacity>
      <ScrollView
        style={{maxHeight: '100%', marginBottom: 16}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={true}>
        <TouchableWithoutFeedback>
          <View>
            <RenderHtml
              contentWidth={100}
              renderers={{
                img: CustomImageRenderer,
              }}
              source={{
                html: `<div>${data?.content_vi}</div>`,
              }}
              baseStyle={styles.description}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              tagsStyles={{...tagsStyles}}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <ModalGetDeal
        onCancel={onCloseModal}
        onConfirm={onPressGetDeal}
        visible={isShowModal}
        dealCode={data?.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginTop: scaler(16),
  },
  wrapSubTitle: {
    flexDirection: 'row',
    paddingTop: scaler(4),
    paddingBottom: scaler(4),
    marginTop: scaler(16),
  },
  wrapButtonContainer: {
    width: scaler(98),
    height: scaler(40),
    backgroundColor: colors.brandMainPinkRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
    marginTop: scaler(8),
    marginBottom: scaler(4),
  },
  buttonTitle: {
    fontSize: scaler(14),
    color: colors.white,
    fontWeight: '500',
  },
  description: {
    fontSize: scaler(14),
    color: colors.black,
    marginTop: scaler(8),
  },
});

export default ContentDeal;
