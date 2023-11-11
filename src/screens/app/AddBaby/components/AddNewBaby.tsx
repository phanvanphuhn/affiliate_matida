import {goBack, navigate} from '@navigation';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../Forum/components/useDetailPost';
import ImageOption from '../../NewBorn/components/ImageOption';
import {iconCalendar, iconCalendarGrey} from '@images';
import {ROUTE_NAME} from '@routeName';

const AddNewBaby = () => {
  const [state, setState] = useDetailPost({
    name: '',
    dueDate: '',
    image: [],
  });

  const onChooseDueDate = () => {
    navigate(ROUTE_NAME.CHOOSE_DUE_DATE_APP);
  };

  const onCancel = () => {
    navigate(ROUTE_NAME.TAB_HOME);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.wrapContainer}>
        <Text
          style={[
            styles.title,
            {marginTop: scaler(48), marginBottom: scaler(16)},
          ]}>
          Happy Preggy!
        </Text>
        <Text style={[styles.desc, {marginBottom: scaler(32)}]}>
          Tell me more about your little one
        </Text>
        <ImageOption state={state} setState={setState} />
        <Text style={[styles.label, {marginBottom: scaler(24)}]}>
          Baby's pictures
        </Text>

        <View style={[styles.wrapContent, {marginBottom: scaler(24)}]}>
          <Text style={[styles.label, {marginBottom: scaler(8)}]}>Name</Text>
          <TextInput placeholder="Baby's name" />
        </View>
        <View style={styles.wrapContent}>
          <Text style={[styles.label, {marginBottom: scaler(8)}]}>
            Due date
          </Text>
          <TouchableOpacity
            style={styles.wrapContentContainer}
            onPress={onChooseDueDate}>
            <Text
              style={[
                styles.label,
                {fontSize: scaler(14), fontWeight: '400', color: '#A3A1AB'},
              ]}>
              Add due date
            </Text>
            <Image
              source={iconCalendarGrey}
              style={{height: scaler(24), width: scaler(24)}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.wrapContentContainer,
          {
            paddingTop: scaler(16),
            paddingHorizontal: scaler(16),
            paddingBottom: scaler(32),
            borderTopWidth: 0.5,
            borderColor: colors.borderColor,
          },
        ]}>
        <TouchableOpacity style={styles.wrapButtonContainer} onPress={onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.wrapButtonContainer,
            {backgroundColor: colors.primary},
          ]}>
          <Text style={{color: colors.white, fontWeight: '500'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapContainer: {
    flex: 1,
    alignItems: 'center',
    padding: scaler(16),
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  desc: {
    fontSize: scaler(14),
    fontWeight: '400',
    color: colors.labelColor,
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '500',
    color: '#85828C',
  },
  wrapContent: {
    width: '100%',
  },
  wrapContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapButtonContainer: {
    width: '48%',
    padding: scaler(16),
    justifyContent: 'center',
    backgroundColor: colors.gray350,
    alignItems: 'center',
    borderRadius: scaler(40),
  },
});

export default AddNewBaby;
