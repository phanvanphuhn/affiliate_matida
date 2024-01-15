import {
  iconArrowRight,
  iconArrowRightGrey,
  iconKid,
  iconPlusCircle,
  iconPregnant,
  iconSend,
} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/rootReducer';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

type TProps = {
  onPress: () => void;
  onSwitchBaby: ({}) => void;
};

export type TBaby = {
  avatar: string;
  created_at: string;
  date_of_birth: string | null;
  due_date: string | null;
  gender: string | null;
  id: number;
  name: string | null;
  pregnant_type: string;
  selected: boolean;
  type: string;
  updated_at: string;
  user_id: number;
};

const BottomSheetNewBorn = (props: TProps) => {
  const {onPress, onSwitchBaby} = props;
  const newBorn = useSelector((state: RootState) => state.newBorn.list);
  const {t} = useTranslation();
  return (
    <>
      {newBorn?.map((item: TBaby, i: number) => {
        return (
          <View key={i} style={styles.container}>
            <TouchableOpacity
              onPress={() => onSwitchBaby(item)}
              style={[
                styles.wrapContainer,
                {
                  justifyContent: 'space-between',
                  borderBottomColor: colors.gray,
                  borderBottomWidth: 1,
                  paddingBottom: scaler(16),
                },
              ]}>
              <View style={[styles.wrapContainer, {flex: 1}]}>
                <Image
                  source={
                    item?.avatar
                      ? {uri: item?.avatar}
                      : item?.type !== 'pregnant' &&
                        item?.type !== 'pregnant-overdue' &&
                        item?.type !== 'unknown'
                      ? iconKid
                      : iconPregnant
                  }
                  style={{
                    height: scaler(24),
                    width: scaler(24),
                    marginRight: scaler(8),
                    borderRadius: scaler(99),
                  }}
                  resizeMode="contain"
                />
                <Text style={[styles.title, {flex: 1}]} numberOfLines={1}>
                  {item?.name
                    ? item?.name
                    : `Baby ${newBorn.indexOf(item) + 1}`}
                </Text>
              </View>
              <View style={styles.wrapContainer}>
                <Text style={styles.desc}>
                  {moment
                    .utc(item.date_of_birth || item.due_date)
                    .format('DD/MM/YYYY')}
                </Text>
                {/* <Image
                  source={iconArrowRightGrey}
                  style={{
                    height: scaler(24),
                    width: scaler(24),
                    marginLeft: scaler(8),
                  }}
                  resizeMode="contain"
                /> */}
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      {/* {newBorn?.length < 10 && (
        <TouchableOpacity
          style={[
            styles.wrapContainer,
            {paddingHorizontal: scaler(16), marginBottom: scaler(16)},
          ]}
          onPress={onPress}>
          <Image
            source={iconPlusCircle}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginRight: scaler(8),
            }}
            resizeMode="contain"
          />
          <Text style={[styles.title, {color: '#A3A1AB'}]}>
            {t('newBorn.addBaby')}
          </Text>
        </TouchableOpacity>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaler(16),
  },
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scaler(14),
    fontWeight: '500',
  },
  desc: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#82808A',
  },
});

export default BottomSheetNewBorn;
