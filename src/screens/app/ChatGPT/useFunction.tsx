import {
  addMessageToListChatGPT,
  getListChatGPT,
  saveSuggestMessageId,
} from '@redux';
import {GlobalService, sendMessageGPTApi, uploadImage} from '@services';
import {event, eventType, hasWhiteSpace, trackingAppEvent} from '@util';
import moment from 'moment';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {trackChatBotClickedEvent} from '@services/webengageManager.tsx';

export const useFunction = (props: any) => {
  const {route} = props;
  const dispatch = useDispatch();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const listChat = useSelector((state: any) => state.chatGPT?.detailChat);
  const pagging = useSelector((state: any) => state.chatGPT?.pagingDetail);

  const [page, setPage] = useState<any>(1);
  const [showViewSelect, setShowViewSelect] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [urlImage, setUrlImage] = useState<any>(null);
  const [text, setText] = useState<any>('');
  const [modalSuggest, setModalSuggest] = useState(false);
  const [isSendMessageSuggest, setIsSendMessageSuggest] = useState(false);

  const chatUser = useMemo(() => {
    return {
      _id: 2,
    };
  }, []);

  const convertDataMessage = useCallback((message: any, index: any) => {
    //Hàm xử lý lại dữ liệu message khi nhận từ api trả về
    return {
      _id: message?.id,
      text: message?.content,
      createdAt: message?.created_at,
      user: {
        _id: message?.sender,
      },
      index: index,
    };
  }, []);

  const getConvertedMessages = useCallback((msgs: any) => {
    return msgs?.map((item: any, index: any) => {
      return convertDataMessage(item, index);
    });
  }, []);

  useEffect(() => {
    if (listChat?.length === 1) {
      setModalSuggest(true);
    }
  }, [listChat]);

  const getData = useCallback(() => {
    dispatch(getListChatGPT({page: page}));
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

  const renderRandomID = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };

  const sendMessage = async () => {
    const dataAdd = {
      content: text?.length > 0 && !hasWhiteSpace(text) ? text : null,
      created_at: moment(),
      id: renderRandomID(),
      sender: 2,
      updated_at: moment(),
      user_id: user_id,
    };
    trackingAppEvent(event.TIDA.TIDA_ASK, {content: dataAdd}, eventType.MIX_PANEL);
    dispatch(addMessageToListChatGPT([{...dataAdd}]));
    try {
      setShowViewSelect(true);
      const body = {
        prompt: text?.length > 0 && !hasWhiteSpace(text) ? text : null,
      };
      trackChatBotClickedEvent(text?.length > 0 && !hasWhiteSpace(text) ? text : null);
      const res = await sendMessageGPTApi(body);
      setText('');
      setShowViewSelect(false);
      setUrlImage(null);
      dispatch(addMessageToListChatGPT([{...res?.data}]));
    } catch (error) {
      setShowViewSelect(false);
    }
  };

  const onClickSuggest = async (value: any) => {
    const idChat = renderRandomID();
    dispatch(saveSuggestMessageId(idChat));
    const dataAdd = {
      content: value,
      created_at: moment(),
      id: idChat,
      sender: 2,
      updated_at: moment(),
      user_id: user_id,
    };
    dispatch(addMessageToListChatGPT([{...dataAdd}]));
    try {
      setShowViewSelect(true);
      const body = {
        prompt: value,
      };
      const res = await sendMessageGPTApi(body);
      trackChatBotClickedEvent(value);
      setIsSendMessageSuggest(true);
      setText('');
      setShowViewSelect(false);
      setUrlImage(null);
      dispatch(addMessageToListChatGPT([{...res?.data}]));
    } catch (error) {
      setShowViewSelect(false);
    }
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
    modalSuggest,
    setModalSuggest,
    onClickSuggest,
    isSendMessageSuggest,
  };
};
