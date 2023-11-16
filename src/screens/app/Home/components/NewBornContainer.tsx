import {iconArrowRight, newBornBaby, tailArrowRight} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {tagsStyles} from '../../DetailArticle/settingHTML';
import {useSelector} from 'react-redux';
import moment from 'moment';

type TProps = {
  onPress: () => void;
  data: any;
  user: any;
  state: any;
};

const NewBornContainer = (props: TProps) => {
  const {onPress, data, user, state} = props;
  const {baby} = data;
  const lang = useSelector((state: any) => state?.auth?.lang);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        {user?.pregnantWeek?.weekPregnant && (
          <Text style={styles.title}>
            {user?.pregnantWeek?.weekPregnant.month > 0
              ? user?.pregnantWeek?.weekPregnant.month + ' month'
              : null}
            {user?.pregnantWeek?.weekPregnant.weeks > 0
              ? user?.pregnantWeek?.weekPregnant.weeks + ' weeks'
              : null}
          </Text>
        )}

        {(user?.due_date || user?.date_of_birth) && (
          <Text style={styles.title}>
            born on{' '}
            {moment(user?.due_date || user?.date_of_birth).format('DD/MM/YYYY')}
          </Text>
        )}
      </View>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <RenderHtml
              contentWidth={100}
              source={{
                html: `<div>${lang == 2 ? baby?.name_vn : baby?.name_en}</div>`,
              }}
              baseStyle={styles.description}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              tagsStyles={{...tagsStyles}}
            />
          </View>
        </View>

        <View>
          <Image
            source={baby?.image ? {uri: baby?.image[0]} : newBornBaby}
            style={{
              width: scaler(155),
              height: scaler(116),
            }}
            // resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.wrapContentContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={user?.avatar ? {uri: user?.avatar} : newBornBaby}
            style={{
              width: scaler(28),
              height: scaler(28),
              marginRight: scaler(8),
            }}
            // resizeMethod="resize"
            resizeMode="contain"
          />
          <View>
            <Text style={{fontSize: 11, fontWeight: '500'}}>
              {user?.baby_name}
            </Text>
            {/* <Text style={styles.title}>Libra girl</Text> */}
          </View>
        </View>

        <TouchableOpacity style={styles.wrapBtnContainer} onPress={onPress}>
          <Text style={styles.btnTitle}>View more</Text>
          <Image
            source={tailArrowRight}
            style={{
              height: scaler(16),
              width: scaler(16),
              marginLeft: scaler(4),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingVertical: scaler(16),
    borderRadius: scaler(16),
    backgroundColor: colors.white,
  },
  wrapContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaler(11),
    fontWeight: '500',
    color: '#82808A',
  },
  wrapBtnContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    backgroundColor: '#FFEBEB',
    borderRadius: scaler(40),
    flexDirection: 'row',
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primaryBackground,
  },
  description: {
    fontSize: scaler(14),
    color: colors.black,
    marginTop: scaler(8),
  },
});

export default NewBornContainer;
