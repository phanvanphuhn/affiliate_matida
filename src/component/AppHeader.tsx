import {SvgCaretDown, SvgSearch, imageNameApp, imageNameAppPink} from '@images';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
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
import {RootState} from '@redux/rootReducer';

interface IProps {
  onPressMenu?: () => void;
  onPressAvatar?: () => void;
  onPressNotification?: () => void;
  onPressMessage?: () => void;
  onPressLogo: () => void;
  onPressSearch?: () => void;
  IconNotification?: JSX.Element;
  IconMessage?: JSX.Element;
  bgc?: string;
  isFeed?: boolean;
  rightNoti?: () => void;
  openNewBorn?: () => void;
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
  isFeed,
  rightNoti,
  openNewBorn,
}: IProps) => {
  const user = useSelector((state: any) => state.auth.userInfo);
  // const dataListChat = useSelector((state: any) => state?.listChat?.list);
  const totalUnread = useSelector((state: any) => state?.unread?.unread);
  const newBorn = useSelector((state: RootState) => state.newBorn.list);
  const totalUnreadNotification = useSelector(
    (state: any) => state?.unread?.unread_notification,
  );
  const selectedNewBorn = newBorn.filter(item => item.selected == true);

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
            <SvgMenu color={bgc ? 'black' : 'white'} />
          </TouchableOpacity>
        )}
        {rightNoti ? (
          <TouchableOpacity
            onPress={onPressNotification}
            style={{
              paddingVertical: scaler(10),
              marginLeft: scaler(18),
              marginRight: scaler(2),
            }}>
            {<SvgNotification color={bgc ? 'black' : 'white'} />}
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
        ) : (
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
        )}
      </View>
      <TouchableOpacity onPress={onPressLogo} activeOpacity={0.9}>
        {/* <Text style={styles.textLogo}>Matida</Text> */}
        <Image
          source={bgc ? imageNameAppPink : imageNameApp}
          style={styles.imageNameApp}
        />
      </TouchableOpacity>
      <View style={[styles.row]}>
        {openNewBorn && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: scaler(48),
              marginRight: scaler(32),
              justifyContent: 'flex-end',
            }}
            onPress={openNewBorn}>
            <View
              style={{
                marginRight: scaler(4),
              }}>
              <Text numberOfLines={1} style={{color: colors.black}}>
                {selectedNewBorn[0]?.name || 'Baby 1'}
              </Text>
            </View>
            <View>
              <SvgCaretDown stroke={bgc ? colors.black : 'white'} />
            </View>
          </TouchableOpacity>
        )}
        {onPressNotification && !rightNoti && (
          <TouchableOpacity
            onPress={onPressNotification}
            style={{
              paddingRight: scaler(20),
              paddingVertical: scaler(10),
            }}>
            {<SvgNotification color={bgc ? 'black' : 'white'} />}
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
            {<SvgMessage color={bgc ? 'black' : 'white'} />}
            {dot && (
              <View
                style={[
                  styles.dotMessage,
                  bgc ? {backgroundColor: 'black'} : {},
                ]}
              />
            )}
          </TouchableOpacity>
        )}
        {onPressSearch ? (
          <TouchableOpacity
            onPress={onPressSearch}
            style={{
              paddingVertical: scaler(10),
              paddingRight: scaler(16),
              marginLeft: scaler(44),
            }}>
            <SvgSearch color={bgc ? colors.black : colors.white} />
          </TouchableOpacity>
        ) : isFeed ? (
          <View style={{width: scaler(48)}} />
        ) : null}
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
    left: scaler(12),
    top: scaler(4),
    padding: scaler(2),
    flexDirection: 'row',
  },
  textIndexNoti: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(10),
    color: colors.white,
  },
});
