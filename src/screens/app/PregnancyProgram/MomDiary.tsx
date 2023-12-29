import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Pressable,
} from 'react-native';
import {AppCameraModal, Header} from '@component';
import {
  ic_back_arrow,
  ic_default_upload,
  ic_flower,
  ic_plus,
  ic_trash,
  iconAddImage,
  SvgLineWave,
} from '@images';
import {colors, heightScreen, scaler, stylesCommon} from '@stylesCommon';
import {goBack} from '@navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {markAsCompleted} from '../../../services/pregnancyProgram';
import useStateCustom from '../../../util/hooks/useStateCustom';
import {GlobalService, uploadImage} from '@services';
import {useRoute} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

interface MomDiaryProps {}
interface IState {
  visible?: boolean;
  isSave?: boolean;
  isEdit?: boolean;
  image?: string;
  note?: string;
  imageTemp?: string;
}
const MomDiary = (props: MomDiaryProps) => {
  const route = useRoute<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();
  const [state, setState] = useStateCustom<IState>({
    visible: false,
    isSave: false,
    isEdit: route?.params?.type == 'review' ? false : true,
    image: route?.params?.item?.images?.[0] || '',
    note: route?.params?.item?.note || '',
    imageTemp: '',
  });

  const onSave = async () => {
    try {
      let data = {
        task_id: route?.params?.item?.id,
        images: [state.image],
        note: state.note,
      };
      let result = await markAsCompleted(data);
      if (result?.success) {
        setState({
          isEdit: false,
        });
      }
    } catch (err) {
      showMessage({
        message: err?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
    }
  };
  const handleUploadImage = async (response: any) => {
    GlobalService.showLoading();
    const data = new FormData();
    const imageUpload = {
      uri:
        Platform.OS === 'ios'
          ? response?.path.replace('file://', '')
          : response?.path,
      type: 'image/jpeg',
      name: response?.fileName ? response?.fileName : response?.path,
    };
    setState({imageTemp: response?.path});
    data.append('file', imageUpload);
    const res = await uploadImage(data);
    GlobalService.hideLoading();

    if (res?.success) {
      setState({
        isSave: true,
        image: res?.data?.url || '',
        visible: false,
      });
    } else {
      setState({
        visible: false,
      });
    }
  };

  const onEdit = () => {
    setState({isEdit: true, isSave: true});
  };

  const onRemove = () => {
    setState({image: '', imageTemp: '', isSave: true});
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('momDiary.momDiary')}
        IconLeft={
          <Image
            source={ic_back_arrow}
            style={{
              height: 30,
              width: 30,
              tintColor: colors.black10,
            }}
          />
        }
        ComponentRight={
          <TouchableOpacity
            disabled={state?.isEdit && !state?.isSave}
            onPress={!state?.isEdit ? onEdit : onSave}>
            <Text
              style={{
                fontSize: scaler(14),
                fontWeight: '500',
                color:
                  !state?.isEdit || state.isSave
                    ? colors.pink200
                    : colors.gray550,
              }}>
              {!state?.isEdit ? t('momDiary.edit') : t('momDiary.save')}
            </Text>
          </TouchableOpacity>
        }
        onPressLeft={goBack}
      />

      <KeyboardAwareScrollView>
        <View style={styles.container2}>
          <Text style={styles.textTitle}>{t('momDiary.momDesc')}</Text>
          <View style={{bottom: -8}}>
            <SvgLineWave color={colors.pink250} />
          </View>
        </View>
        <View style={{flex: 1, paddingBottom: 40}}>
          <Pressable
            disabled={!!state.image || !state?.isEdit}
            onPress={() => setState({visible: true})}
            style={styles.buttonImage}>
            {state?.image ? (
              <ImageBackground
                source={{
                  uri: state.image,
                }}
                style={styles.image2}>
                {state?.image && state?.isEdit && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      onPress={onRemove}
                      style={{
                        padding: 10,
                      }}>
                      <Image source={ic_trash} />
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>
            ) : (
              <Image source={ic_default_upload} style={styles.image} />
            )}

            {((route?.params?.type == 'review' &&
              state?.isEdit &&
              state?.isSave) ||
              (route?.params?.type == 'todo' && !state?.isSave)) &&
              !state?.image && <Image source={ic_plus} />}
          </Pressable>
          <View style={{top: -8}}>
            <SvgLineWave color={colors.pink250} />
          </View>

          <View style={{padding: 16}}>
            <Text style={styles.textUpload}>
              {route?.params?.type == 'review'
                ? `${t('momDiary.week')} ${route?.params?.item?.week || 1}`
                : t('momDiary.uploadPicture')}
            </Text>
            {route?.params?.type != 'review' && (
              <Text style={styles.textWeek}>
                {`${t('momDiary.week')} ${route?.params?.item?.week || 1} ${t(
                  'momDiary.messageBaby',
                )}`}
              </Text>
            )}
            <Text
              style={{
                fontSize: scaler(22),
                fontWeight: '600',
                zIndex: 999,
                ...stylesCommon.fontWeight600,
              }}>
              {lang == 1
                ? route?.params?.item?.task?.name_en
                : route?.params?.item?.task?.name_vi}
            </Text>
            <TextInput
              placeholder={t('momDiary.writeSomething') as string}
              style={{
                minHeight: 60,
                paddingTop: 20,
                color: colors.textColor,
                ...stylesCommon.fontSarabun400,
              }}
              editable={state?.isEdit}
              value={state.note || ''}
              onChangeText={text => setState({note: text, isSave: true})}
              multiline={true}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 30,
              }}>
              <Image source={ic_flower} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <AppCameraModal
        visible={state.visible || false}
        setVisible={visible => setState({visible: visible})}
        onPress={handleUploadImage}
      />
    </View>
  );
};

export default MomDiary;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  buttonImage: {
    width: '100%',
    height: heightScreen / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  image: {
    height: '90%',
    resizeMode: 'contain',
    tintColor: 'rgba(0, 0, 0, 0.07)',
    bottom: 0,
    position: 'absolute',
  },
  image2: {
    height: '100%',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  container2: {
    backgroundColor: colors.blue,
    paddingTop: 15,
    zIndex: 100,
  },
  textTitle: {
    textAlign: 'left',
    fontSize: scaler(14),
    fontWeight: '500',
    color: colors.white,
    marginBottom: 10,
    paddingHorizontal: scaler(16),
    ...stylesCommon.fontSarabun500,
  },
  textUpload: {
    fontSize: scaler(15),
    color: colors.labelColor,
    marginBottom: 30,
    ...stylesCommon.fontSarabun400,
  },
  textWeek: {
    fontSize: scaler(15),
    fontWeight: '500',
    color: colors.labelColor,
    marginBottom: 5,
    ...stylesCommon.fontSarabun500,
  },
});
