import {
  AppImage,
  AppModal,
  Header,
  IOption,
  ModalConfirm,
  ModalConfirmBlock,
  ModalOption,
  Option,
} from '@component';
import {
  avatarDefault,
  buttonSend,
  iconClose,
  iconReplyArr,
  SvgArrowLeft,
  SvgFlag,
  SvgProhibit,
} from '@images';
import {
  addCommentApi,
  blockUserApi,
  createReplyComment,
  GlobalService,
} from '@services';
import {colors, scaler, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardEvent,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import {Item} from './component/Item';
import {ItemListComment} from './component/ItemListComment';
import {styles} from './styles';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  addCommentToList,
  addReplyCommentToList,
  clearDataDetailPost,
  deleteListUserPost,
  getDetailPost,
  getListCommentAction,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {AppSocket, event, trackingAppEvent, useUXCam} from '@util';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const DetailNewFeed = (props: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const listComment = useSelector((state: any) => state?.post?.listComment);
  const total = useSelector((state: any) => state?.post?.total);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const detail = useSelector((state: any) => state?.post?.detailPost);
  const loading = useSelector((state: any) => state?.post?.loading);
  const week = useSelector((state: any) => state?.home?.week);

  const textInput = useRef<any>();
  const {route} = props;
  const {id} = route?.params;
  const {t} = useTranslation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [active, setActive] = useState(true);
  const [text, setText] = useState('');
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [idPostSelect, setIdPostSelect] = useState<number | string | null>(0);
  const [modalBlock, setModalBlock] = useState<any>(false);
  const [dataUser, setDataUser] = useState<any>(null);
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);

  const [dataReply, setDataRepLy] = useState<any>(null);

  const refOption = useRef<any>(null);

  useUXCam(ROUTE_NAME.DETAIL_NEWFEED);

  const listOption: IOption[] = [
    {
      id: 1,
      label: t('post.settings.report'),
      value: Option.REPORT,
      onPress: () => handleReportUser(),
      icon: <SvgFlag />,
    },
    {
      id: 2,
      label: t('post.settings.block'),
      value: Option.BLOCK,
      onPress: () => handleBlockUser(),
      icon: <SvgProhibit />,
    },
  ];

  const handleReportUser = () => {};
  const handleBlockUser = () => {
    refOption.current?.close();
    setTimeout(() => {
      setModalBlock(true);
    }, 500);
  };

  const getDataInfoPost = async () => {
    dispatch(getDetailPost(id));
  };

  const getListComment = async () => {
    dispatch(getListCommentAction({id: id, page: page}));
    setIsLoadMore(false);
  };

  const handleLoadMore = () => {
    if (listComment?.length >= total) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  useEffect(() => {
    if (listComment?.length <= total && isLoadMore === true) {
      getListComment();
    } else {
      null;
    }
  }, [page]);

  const getData = () => {
    getDataInfoPost();
    getListComment();
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {
    trackingAppEvent(event.SCREEN.DETAIL_NEWFEED, {});
    socket.emit('joinPost', {
      postId: id,
      userId: user?.id,
    });
    function onKeyboardDidHide() {
      setKeyboardHeight(0);
      setActive(true);
    }

    function onKeyboardWillHide() {
      setKeyboardHeight(0);
    }

    function onKeyboardWillShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
      setActive(false);
    }

    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    const willHideSub = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardWillHide,
    );

    const willShowSub = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardWillShow,
    );

    return () => {
      socket.emit('leavePost', {
        postId: id,
        userId: user?.id,
      });
      hideSubscription.remove();
      willHideSub.remove();
      willShowSub.remove();
    };
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <ItemListComment
        item={item}
        index={index}
        callBackSocket={callBackData}
        onReply={() => onReply(item)}
      />
    );
  };

  const onReply = (value: any) => {
    setDataRepLy(value);
    textInput?.current?.focus();
  };

  const addComment = async () => {
    try {
      setDataRepLy(null);
      setText('');
      setKeyboardHeight(0);
      Keyboard.dismiss();
      if (dataReply) {
        const body = {
          comment_id: dataReply?.id,
          content: text,
        };
        const res = await createReplyComment(body);
        dispatch(
          addReplyCommentToList({data: [{...res?.data}], idCmt: dataReply?.id}),
        );
        socket.emit('commentPost', {
          postId: id,
          userId: user?.id,
          content: res?.data?.content,
          commentId: res?.data?.comment_id,
          replyCommentId: res?.data?.id,
        });
      } else {
        const body = {post_id: id, content: text};
        const res = await addCommentApi(body);
        dispatch(addCommentToList([{...res?.data}]));
        socket.emit('commentPost', {
          postId: id,
          userId: user?.id,
          content: res?.data?.content,
          commentId: res?.data?.id,
        });
      }
    } catch (error) {}
  };

  const callBackData = (value: any) => {
    socket.emit('likeComment', {...value, postId: id});
  };

  const onRefresh = () => {
    setPage(1);
    getData();
  };

  const handlePressOption = (idPost: any, dataUser: any) => {
    setIdPostSelect(idPost ?? 0);
    setDataUser(dataUser);
    refOption.current?.open();
  };

  const deleteItem = (value: any) => {
    setIdDelete(value?.id);
    setModalDelete(true);
  };

  const blockUser = async () => {
    try {
      GlobalService.showLoading();
      const res = await blockUserApi(dataUser?.user_id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      // callBackData();
      goBack();
      GlobalService.hideLoading();
    } catch (errro) {
      GlobalService.hideLoading();
    }
  };

  const onConfirmDelete = async () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
    goBack();
  };

  const goBack = () => {
    navigation.goBack();
    dispatch(clearDataDetailPost());
  };

  return (
    <>
      <View
        style={styles.container}
        //@ts-ignore
        onStartShouldSetResponder={() => {
          setKeyboardHeight(0);
          Keyboard.dismiss();
        }}>
        <Header
          title={t('newFeed.titleHeader')}
          IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
          onPressLeft={goBack}
        />
        {loading ? (
          <View style={[styles.viewLoadmore, {marginTop: scaler(20)}]}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : (
          <>
            {detail ? (
              <>
                <View style={styles.viewContent}>
                  <View
                    style={[
                      styles.viewListComment,
                      {
                        paddingBottom:
                          keyboardHeight === 0
                            ? scaler(56) + getBottomSpace()
                            : keyboardHeight + scaler(56) + getBottomSpace(),
                      },
                    ]}>
                    <FlatList
                      data={[1]}
                      renderItem={() => {
                        return (
                          <>
                            <Item
                              onPressOption={handlePressOption}
                              onDelete={deleteItem}
                            />
                            <FlatList
                              data={listComment}
                              renderItem={renderItem}
                              showsVerticalScrollIndicator={false}
                              scrollEnabled={false}
                              //@ts-ignore
                              listKey={(item, index) => 'B' + index.toString()}
                            />
                          </>
                        );
                      }}
                      refreshControl={
                        <RefreshControl
                          refreshing={false}
                          onRefresh={onRefresh}
                        />
                      }
                      onEndReachedThreshold={0.01}
                      onEndReached={handleLoadMore}
                      ListFooterComponent={
                        <>
                          {isLoadMore === true ? (
                            <View style={styles.viewLoadmore}>
                              <ActivityIndicator
                                color={colors.primary}
                                size="small"
                              />
                            </View>
                          ) : null}
                        </>
                      }
                      showsVerticalScrollIndicator={false}
                      //@ts-ignore
                      listKey={(item, index) => 'A' + index.toString()}
                      contentContainerStyle={{
                        paddingBottom:
                          Platform.OS === 'ios' ? scaler(64) : scaler(128),
                      }}
                      // style={{flexGrow: 1}}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.viewInput,
                    {
                      bottom:
                        Platform.OS === 'ios' ? keyboardHeight : -scaler(20),
                    },
                    {
                      paddingBottom:
                        keyboardHeight === 0 ? scaler(30) : scaler(8),
                    },
                  ]}>
                  {dataReply ? (
                    <View
                      style={[
                        styles.viewRepLy,
                        {
                          paddingHorizontal: scaler(20),
                        },
                      ]}>
                      <View style={styles.viewRow}>
                        <Image source={iconReplyArr} style={styles.iconReply} />
                        <Text style={styles.txtTitleReply}>
                          {t('post.titleReply')}
                        </Text>
                        <Text style={styles.txtNameReply} numberOfLines={1}>
                          {' '}
                          {dataReply?.user?.name}{' '}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setDataRepLy(null);
                        }}>
                        <Image source={iconClose} style={styles.iconClose} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View style={styles.viewInputReply}>
                    {user?.avatar?.length > 0 ? (
                      <AppImage user uri={user?.avatar} style={styles.avatar} />
                    ) : (
                      <Image source={avatarDefault} style={styles.avatar} />
                    )}
                    <View style={styles.viewInputBottom}>
                      <TextInput
                        ref={textInput}
                        style={styles.input}
                        onChangeText={(value: any) => {
                          setText(value);
                        }}
                        value={text}
                        placeholder={`${t('post.write_a_comment')}`}
                        placeholderTextColor={colors.textSmallColor}
                        maxLength={225}
                        textAlignVertical="center"
                        multiline
                      />
                    </View>
                    <TouchableOpacity
                      onPress={addComment}
                      disabled={text?.length === 0}>
                      <Image
                        source={buttonSend}
                        style={[
                          styles.buttonSend,
                          {
                            tintColor:
                              text?.length === 0 ? colors.gray : colors.primary,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.textNotData}>{t('post.notData')}</Text>
            )}
          </>
        )}
      </View>
      <ModalConfirm
        visible={modalDelete}
        titleHeader={t('post.title_modal_delete')}
        onCancel={() => setModalDelete(false)}
        onConfirm={onConfirmDelete}
      />
      <AppModal
        position="bottom"
        ref={refOption}
        modalSize={{
          height: scaler(200),
          width: widthScreen,
        }}>
        <ModalOption
          onClose={() => refOption.current?.close()}
          listItem={listOption}
          idPost={idPostSelect}
        />
      </AppModal>
      <ModalConfirmBlock
        visible={modalBlock}
        onCancel={() => setModalBlock(false)}
        onConfirm={() => {
          setModalBlock(false);
          blockUser();
        }}
        useName={dataUser?.name}
      />
    </>
  );
};

export {DetailNewFeed};
