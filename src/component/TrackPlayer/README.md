// Register registerPlaybackService in index.tsx with service
// initPlayer in App.tsx with params
const initPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
      stoppingAppPausesPlayback: true,
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  };