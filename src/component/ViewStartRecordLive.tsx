import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {scaler, colors} from '@stylesCommon';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {iconPlay} from '@images';
import {useTranslation} from 'react-i18next';
import {endRecordApi, startRecordApi} from '@services';

const ViewStartRecordLive = React.memo((props: any) => {
  const {idRoom, stt} = props;
  const {t} = useTranslation();
  const [status, setStatus] = useState('start');

  useEffect(() => {
    if (stt) {
      setStatus(stt);
    }
  }, [stt]);

  const callApiStart = useCallback(async () => {
    try {
      const body = {
        roomId: idRoom,
      };
      setStatus('loading');
      const res = await startRecordApi(body);
      setStatus('started');
    } catch (error) {
      setStatus(stt);
    }
  }, []);

  const callApiEnd = useCallback(async () => {
    try {
      const body = {
        roomId: idRoom,
      };
      setStatus('loading');
      const res = await endRecordApi(body);
      setStatus('start');
    } catch (error) {
      setStatus(stt);
    }
  }, []);

  const onChangeSTT = useCallback(async () => {
    if (status === 'start') {
      // setStatus('loading');
      // setTimeout(() => {
      //   setStatus('started');
      // }, 2000);
      Alert.alert(`${t('liveStream.noti')}`, `${t('liveStream.titleStart')}`, [
        {
          text: `${t('liveStream.no')}`,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: `${t('liveStream.yes')}`,
          onPress: () => callApiStart(),
        },
      ]);
    } else {
      // setStatus('start');
      Alert.alert(`${t('liveStream.noti')}`, `${t('liveStream.titleEnd')}`, [
        {
          text: `${t('liveStream.no')}`,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: `${t('liveStream.yes')}`,
          onPress: () => callApiEnd(),
        },
      ]);
    }
  }, [status]);

  return (
    <TouchableOpacity style={styles.container} onPress={onChangeSTT}>
      {status === 'loading' ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          {status === 'start' ? (
            <Image source={iconPlay} style={styles.iconPlay} />
          ) : (
            <View style={styles.iconStop} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: scaler(35),
    height: scaler(35),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 20,
    borderRadius: scaler(40) / 2,
    top: getStatusBarHeight() + 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlay: {
    width: scaler(25),
    height: scaler(25),
    tintColor: colors.primary,
  },
  iconStop: {
    width: scaler(15),
    height: scaler(15),
    backgroundColor: colors.primary,
    borderRadius: scaler(2),
  },
});

export {ViewStartRecordLive};
