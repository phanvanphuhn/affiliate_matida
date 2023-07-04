import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles';
import {Header, ModalConfirm, ViewButtonChange} from '@component';
import {iconEdit, SvgArrowLeft} from '@images';
import {colors, scaler} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {MyNewFeed} from '../MyNewFeed';
import {trackingAppEvent, event, useUXCam} from '@util';

const MyNewFeedSetting = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  useUXCam(ROUTE_NAME.MY_NEWFEED_SETTING);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.MY_NEWFEED_SETTING, {});
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={t('setting.my_post')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />

      <View style={styles.viewContent}>
        <FlatList
          data={[1]}
          renderItem={() => (
            <View
              style={{
                paddingTop: scaler(16),
                backgroundColor: '#F6F6F6',
                flex: 1,
              }}>
              <MyNewFeed />
            </View>
          )}
          ListHeaderComponent={() => {
            return (
              <>
                <View style={styles.viewCreate}>
                  <TouchableOpacity
                    style={styles.viewRow}
                    onPress={() =>
                      navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)
                    }>
                    <Image source={iconEdit} />
                    <Text style={styles.txtCreate}>{t('post.create_new')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
          keyExtractor={(item: any) => item?.id}
        />
      </View>
    </View>
  );
};

export {MyNewFeedSetting};
