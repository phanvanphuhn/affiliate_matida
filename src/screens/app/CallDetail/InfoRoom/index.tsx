import {iconHand, imageLogOut, SvgArrowDown} from '@images';
import {getInfoInRoom} from '@redux';
import {kickUser} from '@services';
import {colors} from '@stylesCommon';
import {AppSocket} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ItemColumn} from './component/ItemColumn';
import {ViewDeleteUser} from './component/ViewDeleteUser';
import {ViewInfoHost} from './component/ViewInfoHost';
import {styles} from './styles';

const InfoRoom = React.memo((props: any) => {
  const {t} = useTranslation();
  const {onClose, onLeaveRoom, onPressRaiseHand, idRoom, showInfo} = props;
  const infoInRoom = useSelector((state: any) => state?.liveTalk?.infoInRoom);
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const [modalDelete, setModalDelete] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showButtonMore, setShowButtonMore] = useState(false);
  const [dataUserKick, setDataUserKick] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showInfo === true) {
      dispatch(getInfoInRoom(idRoom));
    }
  }, [showInfo]);

  const onKickUser = (user: any) => {
    setModalDelete(true);
    setDataUserKick(user);
  };

  const renderItemUserColumn = ({item}: any) => {
    return <ItemColumn item={item} onKickUser={onKickUser} />;
  };

  const onKick = async () => {
    try {
      setModalDelete(false);
      const body = {
        user_ids: [dataUserKick?.id],
      };
      const res = await kickUser(infoInRoom?.room?.id, body);
      dispatch(getInfoInRoom(idRoom));
    } catch (error) {}
  };

  const renderItem = () => {
    return (
      <View style={styles.viewItem}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.viewStatusLive}>
            <Image
              source={require('../../../../images/live.gif')}
              style={styles.iconLive}
            />
            <Text style={styles.txtDateTime}>{t('allRoomMetting.live')}</Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{infoInRoom?.room?.title}</Text>
          <View
            onLayout={event => {
              if (infoInRoom?.room?.description?.length > 50) {
                setShowButtonMore(true);
              }
            }}>
            <Text
              style={styles.txtContent}
              numberOfLines={showMore === true ? 0 : 1}>
              {infoInRoom?.room?.description}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            {showButtonMore === true ? (
              <TouchableOpacity
                onPress={() => {
                  setShowMore(!showMore);
                }}>
                <Text style={styles.txtViewMore}>
                  {showMore === true
                    ? t('allRoomMetting.compact')
                    : t('allRoomMetting.view_more')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <ViewInfoHost />
        <View style={styles.viewListUser}>
          {infoInRoom?.participants ? (
            <FlatList
              data={infoInRoom?.participants}
              renderItem={renderItemUserColumn}
              numColumns={3}
              keyExtractor={index => index.toString()}
            />
          ) : null}
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    dispatch(getInfoInRoom(idRoom));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={onClose}>
            <SvgArrowDown />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewRow} onPress={onLeaveRoom}>
            <Image source={imageLogOut} style={styles.iconLeave} />
            <Text style={styles.txtHeader}>{t('allRoomMetting.leave')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[1]}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
              tintColor={Platform.OS === 'ios' ? colors.primary : undefined}
            />
          }
          keyExtractor={index => index.toString()}
        />
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.buttonRaiseHand}
            onPress={onPressRaiseHand}>
            <Image source={iconHand} style={styles.iconHand} />
            <Text style={styles.txtRaiseHand}>
              {t('allRoomMetting.raise_hand')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {modalDelete === true ? (
        <ViewDeleteUser
          closeModal={() => setModalDelete(false)}
          dataUserKick={dataUserKick}
          onKick={onKick}
        />
      ) : null}
    </>
  );
});

export {InfoRoom};
