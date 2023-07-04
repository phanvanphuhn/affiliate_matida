import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import {styles} from '../styles';

type Props = {
  noti: boolean;
  changeStatusNoti: () => void;
};

export const ReminderTime = ({noti, changeStatusNoti}: Props) => {
  const {t} = useTranslation();
  return (
    <View
      style={[
        styles.viewRow,
        {
          backgroundColor: '#FFF5F4',
          paddingVertical: scaler(12),
          justifyContent: 'space-between',
        },
      ]}>
      <View style={styles.viewTxtToogle}>
        <Text style={styles.txtTitleToogle}>
          {t('allRoomMetting.reminderTime')}
        </Text>
        <Text style={styles.txtContentToogle}>
          {t('allRoomMetting.content_reminderTime')}
        </Text>
      </View>
      <SwitchToggle
        switchOn={noti}
        onPress={changeStatusNoti}
        containerStyle={styles.containerToogle}
        circleStyle={styles.cricle}
        circleColorOn="#FFFFFF"
        circleColorOff="#FFFFFF"
        backgroundColorOff="#CDCCD2"
        backgroundColorOn={colors.primary}
        duration={300}
      />
    </View>
  );
};
