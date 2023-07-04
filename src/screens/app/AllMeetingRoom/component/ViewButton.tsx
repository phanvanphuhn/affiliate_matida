import {scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const ViewButton = React.memo((props: any) => {
  const {statusButton, onChange} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.viewRoot}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={
              statusButton === 1 ? styles.buttonActive : styles.buttonInActive
            }
            onPress={() => onChange(1)}>
            <Text
              style={
                statusButton === 1
                  ? styles.txtButtonActive
                  : styles.txtButtonInActive
              }>
              {t('allRoomMetting.all')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              statusButton === 2 ? styles.buttonActive : styles.buttonInActive
            }
            onPress={() => onChange(2)}>
            <Text
              style={
                statusButton === 2
                  ? styles.txtButtonActive
                  : styles.txtButtonInActive
              }>
              {t('allRoomMetting.my_room')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              statusButton === 3 ? styles.buttonActive : styles.buttonInActive
            }
            onPress={() => onChange(3)}>
            <Text
              style={
                statusButton === 3
                  ? styles.txtButtonActive
                  : styles.txtButtonInActive
              }>
              {t('allRoomMetting.save_room')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  viewRoot: {
    width: '100%',
    height: scaler(60),
  },
  container: {
    width: '100%',
    paddingTop: scaler(8),
    paddingHorizontal: scaler(16),
    paddingBottom: scaler(16),
    // padding: scaler(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonInActive: {
    height: scaler(40),
    borderRadius: scaler(40),
    backgroundColor: '#F6F6F6',
    marginRight: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    height: scaler(40),
    borderRadius: scaler(40),
    backgroundColor: '#28B4AE',
    marginRight: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButtonInActive: {
    color: '#515151',
    fontSize: scaler(14),
    marginHorizontal: scaler(16),
    ...stylesCommon.fontWeight400,
  },
  txtButtonActive: {
    color: '#FFFFFF',
    fontSize: scaler(14),
    marginHorizontal: scaler(16),
    ...stylesCommon.fontWeight400,
  },
});

export {ViewButton};
