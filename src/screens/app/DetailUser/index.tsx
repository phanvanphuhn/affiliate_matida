import {Header, ModalConfirmBlock} from '@component';
import {SvgArrowLeft, SvgProhibit} from '@images';
import {colors, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';

import {
  blockUserApi,
  createTopic,
  getDetailUser,
  getListReward,
  getRoomUser,
  GlobalService,
} from '@services';
import {showMessage} from 'react-native-flash-message';
import {ModalOption} from './component/ModalOption';
import {ViewBadge} from './component/ViewBadge';
import {ViewContent} from './component/ViewContent';
import {ViewInfo} from './component/ViewInfo';
import {ViewRoomCall} from './component/ViewRoomCall';

import {useNavigation} from '@react-navigation/native';
import {getDetailPost, getListCommentAction} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {event, trackingAppEvent, useUXCam} from '@util';
import {useDispatch, useSelector} from 'react-redux';

const DetaiUser = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const {route} = props;
  const {id} = route?.params;
  const {t} = useTranslation();
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataLiveTalk, setDataLikeTalk] = useState([]);
  const [dataLiveExpert, setDataExpert] = useState([]);
  const [dataReward, setDataReward] = useState([]);
  const [modalOption, setModalOption] = useState<any>(false);
  const [modalBlock, setModalBlock] = useState<any>(false);

  const idPost = useSelector((state: any) => state?.post?.detailPost?.id);

  useUXCam(ROUTE_NAME.DETAIL_USER);

  const listOption: any = [
    {
      id: 2,
      label: t('post.settings.block'),
      value: 'BLOCK',
      onPress: () => handleBlockUser(),
      icon: <SvgProhibit />,
    },
  ];

  const handleBlockUser = async () => {
    setModalOption(false);
    setTimeout(() => {
      setModalBlock(true);
    }, 500);
  };

  const blockUser = async () => {
    try {
      GlobalService.showLoading();
      const res = await blockUserApi(dataUser?.id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      dispatch(getDetailPost(idPost));
      dispatch(getListCommentAction({id: idPost, page: 1}));
      navigation.goBack();
      GlobalService.hideLoading();
    } catch (errro) {
      GlobalService.hideLoading();
    }
  };

  const getData = async () => {
    try {
      GlobalService.showLoading();
      const res = await getDetailUser(id);
      setDataUser(res?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const getLiveTalk = async () => {
    try {
      const res = await getRoomUser(id, 2);
      setDataLikeTalk(res?.data?.data);
    } catch (error) {}
  };

  const getLiveExpert = async () => {
    try {
      const res = await getRoomUser(id, 1);
      setDataExpert(res?.data?.data);
    } catch (error) {}
  };

  const getDataReward = async () => {
    try {
      const res = await getListReward(id);
      setDataReward(res?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    trackingAppEvent(event.SCREEN.DETAIL_USER, {});
    getData();
    getLiveTalk();
    getLiveExpert();
    getDataReward();
  }, []);

  const sendMessage = async () => {
    try {
      GlobalService.showLoading();
      const res = await createTopic(dataUser?.id);
      navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {
        topic_id: res?.data?.topic_id,
        receiver_id: dataUser?.id,
      });
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={dataUser?.name}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <View style={styles.viewContent}>
        <ScrollView>
          <ViewInfo
            data={dataUser}
            onOpenModal={() => setModalOption(true)}
            sendMessage={sendMessage}
            dataReward={dataReward}
          />
          <ViewContent data={dataUser} />
          {dataLiveTalk?.length > 0 ? (
            <ViewRoomCall
              data={dataLiveTalk}
              reloadData={getLiveTalk}
              title={t('talk.community')}
            />
          ) : null}
          {(dataUser?.role === 2 || dataUser?.role === 3) &&
          dataLiveExpert?.length > 0 ? (
            <ViewRoomCall
              data={dataLiveExpert}
              reloadData={getLiveExpert}
              title={t('talk.liveRoom')}
            />
          ) : null}
          {dataReward?.length > 0 ? (
            <ViewBadge title={t('profileSettings.reward')} data={dataReward} />
          ) : null}
        </ScrollView>
      </View>
      <ModalOption
        visible={modalOption}
        setVisible={setModalOption}
        listItem={listOption}
        title={t('block_user.setting')}
      />
      <ModalConfirmBlock
        visible={modalBlock}
        onCancel={() => setModalBlock(false)}
        onConfirm={() => {
          setModalBlock(false);
          blockUser();
        }}
        useName={dataUser?.name}
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
    backgroundColor: '#F6F6F6',
  },
});

export {DetaiUser};
