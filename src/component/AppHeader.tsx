import {imageNameApp, imageNameAppBlack, SvgSearch} from '@images';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SvgMenu, SvgMessage, SvgNotification} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {updateTotalUnread, updateTotalUnreadNotification} from '@redux';
import {getCheckMessageUnread, listNotReadNotification} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {AppImage} from './AppImage';

interface IProps {
  onPressMenu?: () => void;
  onPressAvatar: () => void;
  onPressNotification?: () => void;
  onPressMessage?: () => void;
  onPressLogo: () => void;
  onPressSearch?: () => void;
  IconNotification?: JSX.Element;
  IconMessage?: JSX.Element;
  bgc?: string;
}
export const AppHeader = ({
  onPressMenu,
  onPressAvatar,
  onPressNotification,
  onPressMessage,
  onPressLogo,
  onPressSearch,
  IconNotification = <SvgNotification />,
  IconMessage = <SvgMessage />,
  bgc,
}: IProps) => {
  const user = useSelector((state: any) => state.auth.userInfo);
  // const dataListChat = useSelector((state: any) => state?.listChat?.list);
  const totalUnread = useSelector((state: any) => state?.unread?.unread);
  const totalUnreadNotification = useSelector(
    (state: any) => state?.unread?.unread_notification,
  );

  const dot = +totalUnread > 0;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<any>(null);

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCheck();
      getIndexNotification();
    }, []),
  );

  const getCheck = async () => {
    try {
      const res = await getCheckMessageUnread();
      dispatch(updateTotalUnread(res?.data));
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  const getIndexNotification = async () => {
    try {
      const res = await listNotReadNotification(1);
      dispatch(
        updateTotalUnreadNotification(res?.data?.totalNotificationUnread),
      );
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, bgc ? {backgroundColor: colors.white} : {}]}>
      <View style={styles.row}>
        {onPressMenu && (
          <TouchableOpacity
            onPress={onPressMenu}
            style={{
              paddingLeft: scaler(16),
              paddingVertical: scaler(10),
            }}>
            <SvgMenu />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onPressAvatar}
          style={{marginLeft: scaler(20)}}>
          {/* {user?.avatar?.length > 0 ? (
            <>
              <FastImage
                style={styles.avatarImage}
                source={{
                  uri: `${user?.avatar}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode="cover"
                onLoadStart={() => onLoadStart()}
                onLoad={() => onLoad()}
              />
            </>
          ) : (
            <Image source={avatarDefault} style={styles.avatarImage} />
          )} */}
          <AppImage uri={user?.avatar} style={styles.avatarImage} user />
          {loading === true ? (
            <View style={styles.viewLoading}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPressLogo} activeOpacity={0.9}>
        {/* <Text style={styles.textLogo}>Matida</Text> */}
        <Image
          source={bgc ? imageNameAppBlack : imageNameApp}
          style={styles.imageNameApp}
        />
      </TouchableOpacity>
      <View style={styles.row}>
        {onPressNotification && (
          <TouchableOpacity
            onPress={onPressNotification}
            style={{
              paddingRight: scaler(20),
              paddingVertical: scaler(10),
            }}>
            {IconNotification}
            {!!totalUnreadNotification && (
              <View
                style={[
                  styles.viewIndexNoti,
                  +totalUnreadNotification < 10 && {
                    paddingHorizontal: scaler(5),
                  },
                ]}>
                <Text style={styles.textIndexNoti}>
                  {+totalUnreadNotification > 99 ? 99 : totalUnreadNotification}
                </Text>
                {+totalUnreadNotification > 99 && (
                  <Text
                    style={[
                      {
                        textAlignVertical: 'top',
                      },
                      styles.textIndexNoti,
                    ]}>
                    +
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
        {/* <View style={{paddingRight: scaler(20), paddingVertical: scaler(10)}} /> */}
        {onPressMessage && (
          <TouchableOpacity
            onPress={onPressMessage}
            style={{paddingVertical: scaler(10), paddingRight: scaler(16)}}>
            {IconMessage}
            {dot && <View style={styles.dotMessage} />}
          </TouchableOpacity>
        )}
        {onPressSearch && (
          <TouchableOpacity
            onPress={onPressSearch}
            style={{paddingVertical: scaler(10), paddingRight: scaler(16)}}>
            <SvgSearch color={bgc ? colors.black : colors.white} />
          </TouchableOpacity>
        )}
        {/* <View style={{paddingVertical: scaler(10)}}>
          <View style={{width: scaler(60)}} />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: scaler(25),
    backgroundColor: colors.brandMainPinkRed,
    paddingBottom: scaler(8),
    paddingTop: scaler(10),
    // paddingHorizontal: scaler(26),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: scaler(42),
    height: scaler(42),
    borderRadius: scaler(42),
  },
  viewLoading: {
    width: scaler(42),
    height: scaler(42),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    ...stylesCommon.fontWeightLOGO700,
    fontSize: scaler(24),
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: scaler(10),
  },
  imageNameApp: {
    width: scaler(93),
    height: scaler(24),
  },
  dotMessage: {
    width: scaler(8),
    height: scaler(8),
    borderRadius: scaler(4),
    backgroundColor: colors.white,
    position: 'absolute',
    right: scaler(16),
    top: scaler(8),
  },
  viewIndexNoti: {
    borderRadius: scaler(100),
    backgroundColor: colors.red100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scaler(14),
    top: scaler(6),
    padding: scaler(2),
    flexDirection: 'row',
  },
  textIndexNoti: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(10),
    color: colors.white,
  },
});
