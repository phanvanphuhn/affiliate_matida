import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {
  bg1,
  ic_back,
  ic_back_arrow,
  ic_flower,
  ic_wave_line_top,
  SvgLineWave,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getContentUserTask,
  markAsCompleted,
} from '../../../services/pregnancyProgram';
import RenderHtml from 'react-native-render-html';
import CustomImageRenderer from '../DetailFeed/components/CustomImageRenderer';
import {tagsStyles} from '../DetailFeed/components/settingsHtml';
import {showMessage} from 'react-native-flash-message';
import {GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {getSubTitlePregnancy} from '@util';
import {useTranslation} from 'react-i18next';

interface DetailTaskProgramProps {}

const DetailTaskProgram = (props: DetailTaskProgramProps) => {
  const [content, setContent] = useState<string>('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();

  const getData = async () => {
    try {
      GlobalService.showLoading();
      let result = await getContentUserTask(route?.params?.item?.id);
      if (result?.success) {
        setContent(result?.data?.content?.content);
      }
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const onSave = async () => {
    try {
      if (route?.params?.item?.status == 'success') {
        goBack();
      } else {
        let data = {
          task_id: route?.params?.item?.id,
        };
        let result = await markAsCompleted(data);
        if (result?.success) {
          goBack();
        }
      }
    } catch (err) {
      showMessage({
        message: err?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderersProps = {
    a: {
      onPress(event, url, htmlAttribs, target) {
        Linking.openURL(url);
      },
    },
  };
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={
              route?.params?.item?.task?.thumbnail
                ? {uri: route?.params?.item?.task?.thumbnail}
                : bg1
            }
            style={styles.imgBg}>
            <View style={{top: 8.49}}>
              <Image
                source={ic_wave_line_top}
                style={{width: '100%', height: 17, tintColor: colors.pink350}}
              />
            </View>
            <TouchableOpacity
              onPress={goBack}
              style={{
                padding: 20,
                position: 'absolute',
                top: 40,
              }}>
              <Image
                source={ic_back_arrow}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{flex: 1}}>
            <Image source={ic_flower} style={styles.flower} />
            <View style={styles.container2}>
              <Text style={styles.textLearn}>
                {getSubTitlePregnancy(
                  route?.params?.item?.task?.categories?.[0],
                )}
              </Text>
              <Text style={styles.textAbout}>
                {lang == 1
                  ? route?.params?.item?.task?.name_en
                  : route?.params?.item?.task?.name_vi}
              </Text>
              <View>
                {!!content && (
                  <RenderHtml
                    contentWidth={100}
                    renderers={{
                      img: CustomImageRenderer,
                    }}
                    renderersProps={renderersProps}
                    source={{
                      html: `<div>${content}</div>`,
                    }}
                    baseStyle={styles.description}
                    enableExperimentalMarginCollapsing={true}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                    defaultTextProps={{
                      style: {
                        ...styles.description,
                      },
                    }}
                    tagsStyles={{...tagsStyles}}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            borderTopColor: colors.borderColor2,
            borderTopWidth: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={onSave}
            style={{
              backgroundColor: colors.pink200,
              padding: scaler(15),
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: scaler(15),
                ...stylesCommon.fontWeight600,
              }}>
              {t('common.done')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTaskProgram;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  imgBg: {width: '100%', aspectRatio: 1, justifyContent: 'flex-end'},
  flower: {
    position: 'absolute',
    right: 0,
    top: scaler(50),
  },
  container2: {padding: scaler(20), paddingTop: scaler(40)},
  textLearn: {
    fontSize: scaler(15),
    color: colors.borderColor,
    textTransform: 'capitalize',
    ...stylesCommon.fontSarabun500,
  },
  textAbout: {
    fontSize: scaler(24),
    marginTop: scaler(10),
    marginBottom: scaler(24),
    ...stylesCommon.fontWeight600,
  },
  text1: {
    fontSize: scaler(15),
    color: colors.labelColor,
    marginBottom: scaler(30),
    ...stylesCommon.fontSarabun400,
  },
  description: {
    fontSize: scaler(15),
    color: colors.labelColor,
    lineHeight: 24,
    ...stylesCommon.fontSarabun400,
  },
});
