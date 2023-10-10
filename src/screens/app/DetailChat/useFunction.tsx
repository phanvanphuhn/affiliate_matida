import React, {useState, useMemo, useEffect, useCallback} from 'react';
import moment from 'moment';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListChat,
  addMessageToList,
  saveTopicID,
  clearDataChat,
} from '@redux';
import {
  GlobalService,
  uploadImage,
  sendMessageApi,
  getDetailUser,
} from '@services';
import {AppSocket, hasWhiteSpace} from '@util';
import {trackMessageShared} from '@services/webengageManager.tsx';

export const useFunction = (props: any) => {
  const {route} = props;
  const {topic_id, receiver_id} = route?.params;
  const dispatch = useDispatch();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const listChat = useSelector((state: any) => state.chat?.detailChat);
  const pagging = useSelector((state: any) => state.chat?.pagingDetail);
  const {getSocket} = AppSocket;
  const socket = getSocket();

  const [page, setPage] = useState<any>(1);
  const [showViewSelect, setShowViewSelect] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [urlImage, setUrlImage] = useState<any>(null);
  const [text, setText] = useState<any>('');
  const [dataUser, setDataUser] = useState(null);
  const [modalImage, setModalImage] = useState(false);
  const [urlImageView, setUrlImageView] = useState<any>(null);
  const [modalSetting, setModalSetting] = useState<any>(false);

  const viewImage = useCallback(() => {
    setModalImage(!modalImage);
  }, [modalImage]);

  const chatUser = useMemo(() => {
    return {
      _id: user_id,
    };
  }, []);

  const convertDataMessage = useCallback((message: any, index: any) => {
    //Hàm xử lý lại dữ liệu message khi nhận từ api trả về
    return {
      _id: message?.id,
      text: message?.content,
      createdAt: message?.created_at,
      user: {
        ...message?.user,
        _id: message?.user?.id,
      },
      images: message?.images,
      invite: message?.dataInvitations,
      request: message?.dataRequestRoomUser,
    };
  }, []);

  const getConvertedMessages = useCallback((msgs: any) => {
    return msgs?.map((item: any, index: any) => {
      return convertDataMessage(item, index);
    });
  }, []);

  const getData = useCallback(() => {
    dispatch(getListChat({id: topic_id, page: page}));
  }, [page]);

  const onLoadMore = useCallback(() => {
    if (page !== pagging?.last_page) {
      setPage((prevPage: any) => prevPage + 1);
    } else {
      null;
    }
  }, [page, pagging]);

  useEffect(() => {
    getData();
  }, [page]);

  const getDataUser = async () => {
    try {
      GlobalService.showLoading();
      const res = await getDetailUser(receiver_id);
      setDataUser(res?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    getDataUser();
    socket.emit('add-user', {
      userId: user_id,
    });
    dispatch(saveTopicID(topic_id));
    return () => {
      dispatch(clearDataChat());
    };
  }, []);

  const handleChangeAvatar = async (response: any) => {
    setVisible(false);
    try {
      GlobalService.showLoading();
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? response?.path.replace('file://', '')
            : response?.path,
        type: 'image/jpeg',
        name: response?.fileName ? response?.fileName : response?.path,
      };
      data.append('file', imageUpload);
      const res = await uploadImage(data);
      setUrlImage(res?.data?.url);
      setShowViewSelect(true);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const sendMessage = async () => {
    try {
      const body = {
        receiver_id: receiver_id,
        sender_id: user_id,
        topic_id: topic_id,
        content: text?.length > 0 && !hasWhiteSpace(text) ? text : null,
        images: urlImage?.length > 0 ? [urlImage] : null,
        type: 1,
      };
      setText('');
      setShowViewSelect(false);
      setUrlImage(null);
      const res = await sendMessageApi(body);
      dispatch(addMessageToList([{...res?.data}]));
      socket.emit('send-message', {
        senderId: user_id,
        receiverId: receiver_id,
        messageId: res?.data?.id,
      });
      trackMessageShared(dataUser.name, receiver_id, text?.length > 0 && !hasWhiteSpace(text) ? text : null);
    } catch (error) {}
  };

  return {
    chatUser,
    getConvertedMessages,
    listChat,
    pagging,
    onLoadMore,
    showViewSelect,
    setShowViewSelect,
    visible,
    setVisible,
    handleChangeAvatar,
    urlImage,
    setUrlImage,
    text,
    setText,
    sendMessage,
    dataUser,
    viewImage,
    modalImage,
    urlImageView,
    setUrlImageView,
    modalSetting,
    setModalSetting,
  };
};
