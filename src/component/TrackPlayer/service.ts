import TrackPlayer, {Event} from 'react-native-track-player';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    let post = await TrackPlayer.getPosition();
    let dur = await TrackPlayer.getDuration();
    if (post === dur) {
      TrackPlayer.seekTo(0);
    }

    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    let post = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(post + 15);
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    let post = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(post - 15);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    let post = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(post + event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    let post = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(post - event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
  });
}
