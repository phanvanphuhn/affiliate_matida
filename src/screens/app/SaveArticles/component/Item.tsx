import {stylesCommon, scaler, colors} from '@stylesCommon';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {AppImage} from '@component';
import {iconSave} from '@images';
import {useSelector} from 'react-redux';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, postSaveArticles, postUnSaveArticles} from '@services';

const Item = React.memo((props: any) => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {item, onPressUnSave} = props;
  // const {image, title_en, title_vi, id} = props?.article;

  const handlePress = () => {
    navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: item?.article});
  };

  const handlePressUnSave = async () => {
    try {
      GlobalService.showLoading();
      // await postUnSaveArticles(item?.article?.id);
      await postUnSaveArticles(item?.article?.id);
      onPressUnSave(item?.article?.id);
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handlePress}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <AppImage uri={item?.article?.image} style={styles.viewImage} />
          <TouchableOpacity
            style={styles.iconSave}
            activeOpacity={0.8}
            onPress={handlePressUnSave}>
            <Image source={iconSave} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTxt}>
          <Text style={styles.txtTitle}>{item?.article?.title || ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    marginBottom: scaler(20),
    paddingHorizontal: scaler(16),
  },
  viewContent: {
    flexDirection: 'row',
  },
  viewImage: {
    width: scaler(128),
    height: scaler(88),
    borderRadius: scaler(8),
  },
  viewTxt: {
    flex: 1,
    marginLeft: scaler(12),
  },
  txtTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight700,
    fontSize: scaler(14),
  },
  iconSave: {
    position: 'absolute',
    top: scaler(4),
    left: scaler(4),
  },
});

export {Item};
