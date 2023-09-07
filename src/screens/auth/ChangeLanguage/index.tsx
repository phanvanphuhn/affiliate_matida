import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {colors} from '@stylesCommon';
import {iconFlagEn, iconFlagVn} from '@images';
import {AppButton} from '@component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initI18n} from '@i18n';
import {ROUTE_NAME} from '@routeName';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveLang} from '@redux';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';

const ChangeLanguage = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [lang, setLang] = useState<any>(null);

  useUXCam(ROUTE_NAME.CHANGE_LANGUAGE);

  if (route?.name === ROUTE_NAME.CHANGE_LANGUAGE) {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }

  const onChangeLang = useCallback(async () => {
    if (lang === 1) {
      setLang(2);
    } else {
      setLang(1);
    }
  }, [lang]);

  const getLang = async () => {
    let data = await AsyncStorage.getItem('LANGUAGE');
    if (data === 'en') {
      setLang(1);
    } else {
      setLang(2);
    }
  };

  const navigateToIntro = useCallback(async () => {
    if (lang === 1) {
      let data = await AsyncStorage.setItem('LANGUAGE', 'en');
      initI18n();
    } else {
      let data = await AsyncStorage.setItem('LANGUAGE', 'vi');
      initI18n();
    }
    dispatch(saveLang(lang));
  }, [lang]);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.CHANGE_LANGUAGE, {}, eventType.AFF_FLYER);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
    getLang();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewContnet}>
        <Text style={styles.txtTitle}>
          {lang === 2 ? 'Trò chuyện cùng Matida' : "Let's talk!"}
        </Text>
        <Text style={styles.txtContent}>
          {lang === 2
            ? 'Chọn ngôn ngữ'
            : 'Please choose your preferred language'}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                lang === 2 ? colors.backgroundOpacity : 'transparent',
            },
          ]}
          onPress={onChangeLang}>
          <Image source={iconFlagVn} />
          <Text style={styles.txtButton}>Tiếng Việt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                lang === 1 ? colors.backgroundOpacity : 'transparent',
            },
          ]}
          onPress={onChangeLang}>
          <Image source={iconFlagEn} />
          <Text style={styles.txtButton}>English</Text>
        </TouchableOpacity>
      </View>
      <AppButton
        titleButton={lang === 2 ? 'Tiếp tục' : 'Next'}
        customStyleButton={styles.buttonBottom}
        onClick={navigateToIntro}
      />
    </View>
  );
};

export {ChangeLanguage};
