import {AppImage, ModalConfirm} from '@component';
import {ETypeUser} from '@constant';
import {
  avatarDefault,
  iconClose,
  SvgBlocked,
  SvgLanguage,
  SvgLogout,
  SvgPost,
  SvgPrivacy,
  SvgProfileUser,
} from '@images';
import {goBack} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {cleanHome, clearExplore, clearListChat, logOut} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {deleteUserDevice} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {
  VERSION_CODE_PUSH,
  event,
  eventType,
  logoutWebEngage,
  trackEventBranch,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import {showMessage} from 'react-native-flash-message';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';

interface Version {
  label: string | undefined;
  version: string | undefined;
}

const Setting = () => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [version, setVersion] = useState<Version>({
    label: '1.1.1',
    version: 'v1.1',
  });
  const {t} = useTranslation();

  useEffect(() => {
    CodePush.getUpdateMetadata().then(info => {
      setVersion({label: info?.label, version: info?.appVersion});
    });
  }, []);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.SETTING_SCREEN, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.SETTING_SCREEN);

  const onLogOut = async () => {
    try {
      await deleteUserDevice();
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    } finally {
      trackingAppEvent(event.SYSTEM.LOG_OUT, {}, eventType.MIX_PANEL);
      logoutWebEngage();
      trackEventBranch(event.BRANCH.SIGN_OUT, {});
      dispatch(logOut());
      dispatch(clearListChat());
      dispatch(cleanHome());
      dispatch(clearExplore());
    }
  };

  const data = [
    {
      id: 1,
      title: t('setting.profile'),
      svg: <SvgProfileUser />,
    },
    {
      id: 2,
      title: t('setting.lang'),
      svg: <SvgLanguage />,
    },
    {
      id: 3,
      title: t('setting.my_post'),
      svg: <SvgPost />,
    },
    {
      id: 4,
      title: t('setting.privacyPolicy'),
      svg: <SvgPrivacy />,
    },
    {
      id: 6,
      title: t('setting.block'),
      svg: <SvgBlocked />,
    },
    {
      id: 5,
      title: t('setting.logOut'),
      svg: <SvgLogout />,
    },
  ];

  const onSelect = (id: any) => {
    switch (id) {
      case 1:
        navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
        break;
      case 2:
        navigation.navigate(ROUTE_NAME.CHANGE_LANG_AUTH);
        break;
      case 3:
        navigation.navigate(ROUTE_NAME.MY_NEWFEED_SETTING);
        break;
      case 4:
        navigation.navigate(ROUTE_NAME.PRIVACY_POLICY);
        break;
      case 5:
        setShowModal(true);
        break;
      case 6:
        navigation.navigate(ROUTE_NAME.LIST_BLOCKED_USER);
        break;
      default:
        return;
    }
  };

  const getTypeUser = () => {
    switch (+user?.role) {
      case ETypeUser.USER:
        return t('profileSettings.typeUser.0');
      case ETypeUser.EXPERT:
        return t('profileSettings.typeUser.1');
      case ETypeUser.ADMIN:
        return t('profileSettings.typeUser.2');

      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewImageProfile}>
        <View style={styles.viewRow}>
          {user?.avatar !== null ? (
            <AppImage user style={styles.image} uri={user?.avatar} />
          ) : (
            <Image source={avatarDefault} style={styles.image} />
          )}
          <View style={styles.viewTxtName}>
            <Text style={styles.txtName} numberOfLines={2}>
              {user?.name}
            </Text>
            <Text style={styles.typeUser} numberOfLines={1}>
              {getTypeUser()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            // navigation.goBack();
            goBack();
          }}>
          <Image source={iconClose} />
        </TouchableOpacity>
      </View>
      {data?.map((item: any) => {
        return (
          <TouchableOpacity
            style={styles.viewItem}
            key={item?.id}
            onPress={() => onSelect(item?.id)}>
            {item.svg}
            <Text style={styles.txtTitle}>{item?.title}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.viewBottom}>
        <Text style={styles.txtBottom}>
          {`${t('setting.version')}${
            version.version ? version.version : DeviceInfo.getVersion()
          } - ${version.label ? version.label : VERSION_CODE_PUSH}`}
        </Text>
      </View>
      <ModalConfirm
        visible={showModal}
        titleHeader={t('setting.titleLogout')}
        onCancel={() => setShowModal(false)}
        onConfirm={onLogOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    paddingHorizontal: scaler(20),
  },
  viewImageProfile: {
    flexDirection: 'row',
    marginTop: scaler(60),
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: scaler(20),
    borderColor: '#EAEAEA',
  },
  viewRow: {
    flexDirection: 'row',
  },
  image: {
    width: scaler(52),
    height: scaler(52),
    borderRadius: scaler(8),
  },
  viewTxtName: {
    marginLeft: scaler(12),
    width: '75%',
    justifyContent: 'center',
  },
  txtName: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight700,
    marginBottom: scaler(2),

    // flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(12),
    marginVertical: scaler(10),
    alignItems: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.textColor,
    marginLeft: scaler(10),
  },
  viewBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: getBottomSpace() + scaler(20),
  },
  txtBottom: {
    color: colors.gray300,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
  },
  typeUser: {
    color: colors.borderColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
});

export {Setting};
