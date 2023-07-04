import {io, Socket} from 'socket.io-client';
import {
  updateCommentPostSocket,
  updateReplyCommentSocket,
  updateLikePostSocket,
  updateLikeCommentSocket,
  updateLikeReplyCommentSocket,
  getDetailMessage,
  leaveRoomMeeting,
  getInfoRoom,
} from '@redux';
import {store} from '../redux/store';
import {showMessage} from 'react-native-flash-message';
import {colors} from '@stylesCommon';
import {NavigationUtils} from '@navigation';
import {t} from 'i18next';
import {socketURL} from '@env';

let socket = io('', {
  autoConnect: false,
});

function createAppSocket() {
  const init = (token?: string) => {
    let SOCKET_CONFIG = {
      autoConnect: false,
      extraHeaders: {
        Authorization: token || store.getState()?.auth?.token,
      },
    };
    socket = io(socketURL, SOCKET_CONFIG);
    socket.connect();
    onHanleEvent(socket);
  };

  const onHanleEvent = (socket: any) => {
    socket.on('connect', () => {});

    socket.on('joinPost', (data: any) => {});

    socket.on('commentPost', (data: any) => {
      const state = store.getState();
      const userId = state?.auth?.userInfo?.id;
      if (!data?.replyCommentId) {
        if (data?.userId === userId) {
        } else {
          store?.dispatch(updateCommentPostSocket(data?.commentId));
        }
      } else {
        if (data?.userId === userId) {
        } else {
          store?.dispatch(
            updateReplyCommentSocket({
              replyCommentId: data?.replyCommentId,
              commentId: data?.commentId,
            }),
          );
        }
      }
    });

    socket.on('likeComment', (data: any) => {
      const state = store.getState();
      const userId = state?.auth?.userInfo?.id;
      if (data?.userId === userId) {
      } else {
        if (data?.commentId && data?.postId && !data?.replyCommentId) {
          store.dispatch(updateLikeCommentSocket(data?.commentId));
        } else if (data?.replyCommentId && data?.postId && data?.commentId) {
          store.dispatch(
            updateLikeReplyCommentSocket({
              commentId: data?.commentId,
              replyCommentId: data?.replyCommentId,
            }),
          );
        } else if (data?.postId && !data?.commentId && !data?.replyCommentId) {
          store.dispatch(updateLikePostSocket(data?.postId));
        }
      }
    });

    socket.on('get-message', (data: any) => {
      const state = store.getState();
      const userId = state?.auth?.userInfo?.id;
      if (userId === data?.receiverId) {
        store.dispatch(getDetailMessage(data?.messageId));
      }
    });

    socket.on('raiseHand', (data: any) => {
      const state = store.getState();
      const userId = state?.auth?.userInfo?.id;
      if (userId !== data?.userId) {
        showMessage({
          message: `${data?.userName} ${t('allRoomMetting.raise_hand_alert')}`,
          type: 'success',
        });
      } else {
        showMessage({
          message: t('allRoomMetting.you_raise_hand_alert'),
          type: 'success',
        });
      }
    });

    socket.on('kick-user', (data: any) => {
      const state = store.getState();
      const infoRoom = state?.liveTalk?.info?.room?.id;
      const userId = state?.auth?.userInfo?.id;
      if (infoRoom) {
        if (data?.userId === userId) {
          NavigationUtils.goBack();
          showMessage({
            message: t('allRoomMetting.kick_alert'),
            type: 'danger',
          });
        }
      }
    });

    socket.on('comingEndRoom', (data: any) => {
      const state = store.getState();
      const infoRoom = state?.liveTalk?.info?.room?.id;
      if (infoRoom === data?.roomId) {
        showMessage({
          message: t('allRoomMetting.coming_end'),
          type: 'default',
          backgroundColor: colors.success_message,
        });
      }
    });

    socket.on('endRoom', (data: any) => {
      const state = store.getState();
      const infoRoom = state?.liveTalk?.info?.room?.id;
      const user = state?.auth?.userInfo;
      if (infoRoom === data?.roomId) {
        showMessage({
          message: t('allRoomMetting.end_room'),
          type: 'default',
          backgroundColor: colors.success_message,
        });
        if (user?.role === 3) {
          NavigationUtils.goBack();
        } else {
          NavigationUtils.goBack();
          store.dispatch(leaveRoomMeeting(infoRoom));
        }
      }
    });

    socket.on('reload-page', (data: any) => {
      const state = store.getState();
      const infoRoom = state?.liveTalk?.info?.room?.id;
      if (infoRoom) {
        store.dispatch(getInfoRoom(infoRoom));
      }
    });

    socket.on('disconnect', () => {});
  };
  const endConnect = () => {
    socket.disconnect();
  };

  const getSocket = () => {
    return socket;
  };

  return {
    init,
    endConnect,
    getSocket,
    onHanleEvent,
  };
}

export const AppSocket = createAppSocket();
