import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDetailPost from '../../Forum/components/useDetailPost';
import ImageOption from './ImageOption';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {goBack, navigate} from '@navigation';
import {iconChevronDown} from '@images';
import {ROUTE_NAME} from '@routeName';

const EditNewBorn = () => {
  const [state, setState] = useDetailPost({
    name: '',
    gender: '',
    birth_experience: '',
    dob: '',
    tob: '',
    weight: '',
    height: '',
    image: [],
  });

  const onSave = () => {
    navigate(ROUTE_NAME.DETAIL_NEW_BORN);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.wrapContainer}>
        <View style={{alignItems: 'center', marginTop: scaler(56)}}>
          <Text style={styles.title}>Happy parenting!</Text>
          <Text style={[styles.content, {fontWeight: '400'}]}>
            Tell me more about your little one
          </Text>

          <View style={{marginTop: scaler(32), alignItems: 'center'}}>
            <ImageOption state={state} setState={setState} />
            <Text style={[styles.label, {marginTop: scaler(4)}]}>
              Baby's pictures
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.wrapContent}>
            <Text style={styles.label}>Name</Text>
            <Text style={[styles.content, {fontWeight: '500'}]}>Bear</Text>
          </View>

          <View style={styles.wrapContent}>
            <Text style={styles.label}>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.content, {fontWeight: '500'}]}>Female</Text>

              <Image
                source={iconChevronDown}
                style={{
                  height: scaler(24),
                  width: scaler(24),
                }}
              />
            </View>
          </View>

          <View style={styles.wrapContent}>
            <Text style={styles.label}>Birth experience</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.content, {fontWeight: '500'}]}>
                Natural birth
              </Text>

              <Image
                source={iconChevronDown}
                style={{
                  height: scaler(24),
                  width: scaler(24),
                }}
              />
            </View>
          </View>

          <View
            style={[
              styles.wrapContent,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Date of birth</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.content, {fontWeight: '500'}]}>
                  15/10/2023
                </Text>

                <Image
                  source={iconChevronDown}
                  style={{
                    height: scaler(24),
                    width: scaler(24),
                    marginRight: scaler(16),
                  }}
                />
              </View>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.label}>Time of birth</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.content, {fontWeight: '500'}]}>
                  10:10 am
                </Text>

                <Image
                  source={iconChevronDown}
                  style={{
                    height: scaler(24),
                    width: scaler(24),
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.wrapContent,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Birth weight</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.content, {fontWeight: '500'}]}>
                  3.0 kg
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.label}>Birth height</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.content, {fontWeight: '500'}]}>80 cm</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.wrapButtonContainer}>
        <TouchableOpacity
          style={styles.wrapCancelButton}
          onPress={() => goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapSaveButton} onPress={onSave}>
          <Text style={{color: colors.white}}>Save</Text>
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
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  content: {
    fontSize: scaler(14),
    color: colors.labelColor,
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#85828C',
  },
  wrapContent: {
    padding: scaler(16),
  },
  wrapButtonContainer: {
    flexDirection: 'row',
    padding: scaler(16),
    marginBottom: scaler(16),
    borderTopWidth: scaler(1),
    borderColor: colors.gray,
  },
  wrapCancelButton: {
    padding: scaler(16),
    backgroundColor: '#F6F6F9',
    width: '48%',
    marginRight: scaler(16),
    alignItems: 'center',
    borderRadius: scaler(40),
  },
  wrapSaveButton: {
    padding: scaler(16),
    backgroundColor: colors.primaryBackground,
    width: '48%',
    alignItems: 'center',
    borderRadius: scaler(40),
  },
});

export default EditNewBorn;
