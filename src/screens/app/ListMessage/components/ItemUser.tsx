import {AppImage} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {createTopic, GlobalService} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import reactotron from 'reactotron-react-native';

type Props = {
  item: any;
};
export const ItemUser = ({item}: Props) => {
  const navigation = useNavigation<any>();

  const handlePress = async () => {
    try {
      GlobalService.showLoading();
      reactotron.log?.('ITEM', item);
      const res = await createTopic(item?.id);
      navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {
        topic_id: res?.data?.topic_id,
        receiver_id: item?.id,
      });
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    } finally {
      GlobalService.hideLoading();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.viewUser}
      onPress={handlePress}>
      <AppImage user uri={item?.avatar} style={styles.image} />

      <View style={{marginLeft: scaler(12), marginRight: scaler(4), flex: 1}}>
        <Text
          style={{
            color: colors.gray300,
            fontSize: scaler(14),
            ...stylesCommon.fontWeight600,
          }}>
          {item?.name ?? 'User'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(16),
  },
  viewUser: {
    height: scaler(74),
    padding: scaler(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E9EAEA',
    borderBottomWidth: scaler(1),
    backgroundColor: colors.white,
  },
});

const getMemberChat = (chat: any, id: number) => {
  const arrayMember = chat?.topic?.topicMembers;
  return arrayMember?.length > 0
    ? arrayMember.find((member: any) => +member?.user_id !== +id)
    : {};
};
