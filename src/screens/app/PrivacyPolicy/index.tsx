import {Header} from '@component';
import {SvgArrowLeft} from '@images';
import {colors} from '@stylesCommon';
import {t} from 'i18next';
import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';
import {ROUTE_NAME} from '@routeName';

export const PrivacyPolicy = () => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const ending = lang === 1 ? '' : '-vi';
  const uri = `https://admin.matida.app/privacy-policy${ending}`;

  useEffect(() => {
    trackingAppEvent(event.SCREEN.PRIVACY_POLICY, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.PRIVACY_POLICY);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={t('setting.privacyPolicy')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <WebView
        renderLoading={() => {
          return <ActivityIndicator color="black" size="small" />;
        }}
        startInLoadingState={true}
        source={{uri}}
        renderError={error => {
          return (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}>
              <Text>404 ...</Text>
            </View>
          );
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        originWhitelist={['*']} // ['https://*']
        style={{}}
      />
    </View>
  );
};
