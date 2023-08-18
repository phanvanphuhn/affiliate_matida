import {Header} from '@component';
import {iconEdit, SvgArrowLeft} from '@images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MyNewFeed} from '../MyNewFeed';
import {AllPostComponent} from './component/AllPostComponent';
import {ViewButton} from './component/ViewButton';
import {styles} from './styles';

const Community = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {index} = route?.params ?? 1;
  const [indexButton, setIndexButton] = useState<number>(index || 1);
  const [statusRefresh, setRefrest] = useState(0);

  useUXCam(ROUTE_NAME.TAB_COMMUNITY);

  const handlePressButton = (value: number) => {
    setIndexButton(value);
  };

  const onRefresh = () => {
    setRefrest(statusRefresh + 1);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('newFeed.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        styleContainer={{backgroundColor: '#FFFFFF'}}
        styleContainerSafeArea={{backgroundColor: '#FFFFFF'}}
      />

      <View style={styles.container}>
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          renderItem={() =>
            indexButton === 1 ? (
              <AllPostComponent statusRefresh={statusRefresh} />
            ) : (
              <MyNewFeed statusRefresh={statusRefresh} />
            )
          }
          ListHeaderComponent={() => {
            return (
              <View style={styles.containerCreate}>
                <View style={styles.viewCreate}>
                  <TouchableOpacity
                    style={styles.viewRow}
                    onPress={() => {
                      trackingAppEvent(event.FORUM.CREATE_NEW_POST_BUTTON, {});
                      navigation.navigate(ROUTE_NAME.CREATE_NEWPOST);
                    }}>
                    <Image source={iconEdit} />
                    <Text style={styles.txtCreate}>{t('post.create_new')}</Text>
                  </TouchableOpacity>
                </View>
                <ViewButton
                  indexButton={indexButton}
                  onPressButton={handlePressButton}
                />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          keyExtractor={(item: any) => item?.id}
        />
      </View>
    </View>
  );
};

export {Community};
