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
import {AllPostComponent} from './component/AllPostComponent';
import {MyNewFeed} from '../MyNewFeed';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';

const NewFeed = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {index} = route?.params ?? 1;
  const [indexButton, setIndexButton] = useState<number>(index || 1);

  useUXCam(ROUTE_NAME.NEW_FEED);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.NEW_FEED, {}, eventType.AFF_FLYER);
  }, []);

  const listButton = [
    {
      id: 1,
      label: t('post.all_posts'),
      value: 1,
      amount: null,
    },
    {
      id: 2,
      label: t('post.my_post'),
      value: 2,
      amount: null,
    },
  ];

  const handlePressButton = (value: number) => {
    setIndexButton(value);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('newFeed.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />

      <View style={styles.container}>
        <FlatList
          data={[1]}
          renderItem={() =>
            indexButton === 1 ? <AllPostComponent /> : <MyNewFeed />
          }
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
                <ViewButtonChange
                  list={listButton}
                  indexButton={indexButton}
                  onPressButton={handlePressButton}
                  styleContainerFocus={{backgroundColor: colors.red50}}
                  styleTextFocus={{color: colors.white}}
                  styleContainer={{
                    borderWidth: scaler(1),
                    borderColor: colors.red50,
                  }}
                  styleText={{color: colors.red50}}
                  style={{marginTop: scaler(16), marginBottom: scaler(10)}}
                />
              </>
            );
          }}
          keyExtractor={(item: any) => item?.id}
        />
      </View>
    </View>
  );
};

export {NewFeed};
