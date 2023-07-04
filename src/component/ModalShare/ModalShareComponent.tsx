import {OPTION_SHARE} from '@constant';
import {SvgCancel, SvgIconCopy, SvgIconShareUser, SvgIconSocial} from '@images';
import Clipboard from '@react-native-clipboard/clipboard';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {buildDeepLink} from '@util';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppModal} from '../AppModal';
import {ItemOptionShare} from './ItemOptionShare';
import {ModalShareUserMatida} from './ModalShareUserMatida';
import {IItemShare, IModalShare, Props} from './type';

export const ModalShareComponent = forwardRef<IModalShare, Props>(
  ({typeShare, id}, ref) => {
    const {t} = useTranslation();

    const [link, setLink] = useState<string>('');

    const refShare = useRef<any>(undefined);
    const refUser = useRef<IModalShare>(null);
    useImperativeHandle(
      ref,
      () => ({
        open() {
          refShare.current?.open();
        },
        close() {
          refShare.current?.close();
        },
      }),
      [],
    );

    useEffect(() => {
      getLink();
    }, []);

    const getLink = async () => {
      try {
        const linkBuild: any = await buildDeepLink(typeShare, id);
        setLink(linkBuild);
      } catch (e) {}
    };

    const listItem: IItemShare[] = [
      {
        id: 1,
        label: t('articles.copyLink'),
        icon: <SvgIconCopy />,
        value: OPTION_SHARE.COPY,
        onPress: () => handleCopyLink(),
      },
      {
        id: 2,
        label: t('articles.shareSocial'),
        icon: <SvgIconSocial />,
        value: OPTION_SHARE.NET_WORK,
        onPress: () => handleShareSocial(),
      },
      {
        id: 3,
        label: t('articles.shareUser'),
        icon: <SvgIconShareUser />,
        value: OPTION_SHARE.USER,
        onPress: () => handleShareUser(),
      },
    ];

    const handleCopyLink = () => {
      try {
        if (!link) {
          throw new Error('Error');
        }
        Clipboard.setString(link);
        showMessage({
          message: t('articles.successShare'),
          type: 'default',
          backgroundColor: colors.success_message,
          color: '#FFFFFF',
        });
        refShare.current?.close();
      } catch (e) {
        handleErrorDeepLink();
      }
    };

    const handleShareSocial = async () => {
      try {
        if (link) {
          const res = await Share.share({
            message: link,
          });
          if (res?.action !== 'dismissedAction') {
            refShare.current?.close();
          }
        } else {
          handleErrorDeepLink();
        }
      } catch (e) {}
    };

    const handleShareUser = async () => {
      if (link) {
        refUser.current?.open();
      } else {
        handleErrorDeepLink();
      }
    };

    const handleErrorDeepLink = () => {
      showMessage({
        message: t('articles.errorShare'),
        type: 'default',
        backgroundColor: colors.error_message,
        color: '#FFFFFF',
      });
      getLink();
      refShare.current?.close();
    };

    return (
      <AppModal
        position="bottom"
        ref={refShare}
        modalSize={{
          height: scaler(300),
          width: widthScreen,
        }}>
        <View style={[styles.containerViewModal]}>
          <View style={styles.viewHeaderModal}>
            <Text style={styles.textTitle}>{t('articles.titleShare')}</Text>
            <TouchableOpacity
              style={{padding: scaler(16), paddingRight: 0}}
              onPress={() => refShare.current?.close()}
              activeOpacity={0.9}>
              <SvgCancel />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.keyboardAwareScrollView}
            bounces={false}>
            {listItem.map((item, index) => (
              <ItemOptionShare item={item} key={index} />
            ))}
          </KeyboardAwareScrollView>
        </View>
        <ModalShareUserMatida ref={refUser} link={link} />
      </AppModal>
    );
  },
);

const styles = StyleSheet.create({
  containerViewModal: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    paddingHorizontal: scaler(16),
  },
  viewHeaderModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(16),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
});
