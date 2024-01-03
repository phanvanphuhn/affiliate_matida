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
import useDetailPost from '../../Forum/components/useDetailPost';
import {submitDeal} from '@services';
import {LogoApp} from '@images';

const ContentDeal = (props: any) => {
  const {data} = props;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [state, setState] = useDetailPost({
    name: '',
    email: '',
    address: '',
    phone_number: '',
  });

  const onChangeText = (value: String, item: String) => {
    switch (item) {
      case 'name':
        setState({name: value});
        break;
      case 'email':
        setState({email: value});
        break;
      case 'address':
        setState({address: value});
        break;
      case 'phone_number':
        setState({phone_number: value});
        break;
    }
  };

  const onSubmit = async () => {
    setIsShowModal(false);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_COPY_CODE,
      {
        params: {
          userId: user.id,
          dealName: data.name_vi,
          dealCode: data.code,
          providerName: data.provider.name,
          dealDetail: state,
        },
      },
      eventType.MIX_PANEL,
    );
    const params = {
      state,
      id: data?.id,
    };
    try {
      const res = await submitDeal(params);
      if (res?.success) {
        showMessage({
          message: t('deal.submitSuccess'),
          type: 'default',
          backgroundColor: colors.success_message,
          color: '#FFFFFF',
        });
      } else {
        showMessage({
          message: t('deal.submitFailed'),
          type: 'default',
          backgroundColor: colors.error_message,
          color: '#FFFFFF',
        });
      }
    } catch (error) {
      showMessage({
        message: t('deal.submitFailed'),
        type: 'default',
        backgroundColor: colors.error_message,
        color: '#FFFFFF',
      });
    }
  };

  const onShowModal = () => {
    setIsShowModal(true);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_GET_DEAL,
      {
        params: {
          userId: user.id,
          dealName: data.name_vi,
          dealCode: data.code,
          // providerName: data.provider.name,
        },
      },
      eventType.MIX_PANEL,
    );
  };

  const onCloseModal = () => {
    setIsShowModal(false);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_CANCEL,
      {
        params: {
          userId: user.id,
          dealName: data.name_vi,
          dealCode: data.code,
          // providerName: data.provider.name,
        },
      },
      eventType.MIX_PANEL,
    );
  };

  const onPressGetDeal = () => {
    setIsShowModal(false);
    trackingAppEvent(
      event.DEAL.CLICK_BUTTON_COPY_CODE,
      {
        params: {
          userId: user.id,
          dealName: data.name_vi,
          dealCode: data.code,
          providerName: data.provider.name,
        },
      },
      eventType.MIX_PANEL,
    );
    Clipboard.setString(data?.code);
    if (data?.link) {
      Linking.openURL(data?.link);
      showMessage({
        message: t('deal.getCodeSuccess'),
        type: 'default',
        backgroundColor: colors.success_message,
        color: '#FFFFFF',
      });
    } else {
      showMessage({
        message: t('deal.getCodeFailed'),
        type: 'default',
        backgroundColor: colors.error_message,
        color: '#FFFFFF',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {lang == 2 ? data?.name_vi : data?.name_en}
      </Text>
      <View style={styles.wrapSubTitle}>
        <Image
          source={
            data?.provider
              ? {
                  uri: data?.provider.avatar,
                }
              : LogoApp
          }
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
            {data?.provider ? data?.provider.name : 'Matida'}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onShowModal}>
        <Text style={styles.buttonTitle}>
          {data?.required_data && data?.required_data.length > 0
            ? t('deal.contactForm')
            : t('deal.getDeal')}
        </Text>
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
                html: `<div>${
                  lang == 2 ? data?.content_vi : data?.content_en
                }</div>`,
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
        onConfirm={
          data?.required_data && data?.required_data.length > 0
            ? onSubmit
            : onPressGetDeal
        }
        visible={isShowModal}
        dealCode={data?.code}
        requiredData={data?.required_data}
        onChangeText={onChangeText}
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
