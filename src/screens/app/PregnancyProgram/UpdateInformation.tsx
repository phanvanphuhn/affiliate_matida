import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import Container from '../DetailFeed/components/Container';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ic_background, iconClose, SvgPathBottom, SvgPathTop} from '@images';
import {colors, heightScreen, scaler} from '@stylesCommon';
import {goBack} from '@navigation';
import useStateCustom from '../../../util/hooks/useStateCustom';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

interface UpdateInformationProps {}

const UpdateInformation = (props: UpdateInformationProps) => {
  const [state, setState] = useStateCustom({
    yourName: 'Nguyễn Thị Mama',
    pregnancyWeek: '8',
    phoneNumber: '0123456789',
    address: '111 Road 123, Ben Nghe Ward, District 1, Ho Chi Minh City',
  });
  const onChangeText = (key: string) => (text: string) => {
    setState({[key]: text});
  };

  const navigation = useNavigation<any>();
  const onNext = () => {
    navigation.navigate(ROUTE_NAME.COMPLETE_PAYMENT);
  };
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
          <Image source={iconClose} />
        </TouchableOpacity>
        <ScrollView>
          <Text style={styles.textTitle}>Update information</Text>
          <Text style={styles.textSubTitle}>
            Please fill in this form so we can set up your plan.
          </Text>

          <ImageBackground source={ic_background}>
            <SvgPathBottom />
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Your name</Text>
              <TextInput
                value={state.yourName}
                onChangeText={onChangeText('yourName')}
                style={styles.input}
                placeholder={'Your name'}
              />
              <Text style={styles.textLabel}>Your pregnancy week</Text>
              <TextInput
                style={styles.input}
                value={state.pregnancyWeek}
                onChangeText={onChangeText('pregnancyWeek')}
                placeholder={'Your pregnancy week'}
                maxLength={2}
                keyboardType={'number-pad'}
              />
              <Text style={styles.textLabel}>Your phone number</Text>
              <TextInput
                maxLength={10}
                value={state.phoneNumber}
                onChangeText={onChangeText('phoneNumber')}
                keyboardType={'number-pad'}
                style={styles.input}
                placeholder={'Your phone number'}
              />
              {/*<Text style={styles.textLabel}>Your address</Text>*/}
              {/*<TextInput*/}
              {/*  value={state.address}*/}
              {/*  onChangeText={onChangeText('address')}*/}
              {/*  style={[styles.input, {maxHeight: 100}]}*/}
              {/*  placeholder={'Your address'}*/}
              {/*  multiline={true}*/}
              {/*/>*/}
            </View>
            <SvgPathTop />
          </ImageBackground>

          <View
            style={{
              paddingHorizontal: scaler(24),
            }}>
            <TouchableOpacity onPress={onNext} style={styles.buttonDone}>
              <Text style={styles.textDone}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInformation;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  buttonBack: {
    alignItems: 'flex-end',
    paddingHorizontal: scaler(15),
    paddingVertical: scaler(10),
  },
  textTitle: {
    fontSize: scaler(24),
    fontWeight: '600',
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: scaler(15),
    textAlign: 'center',
    padding: scaler(15),
    color: colors.textColor,
  },
  containerInput: {
    backgroundColor: colors.white,
    paddingVertical: scaler(20),
    paddingBottom: scaler(40),
    paddingHorizontal: scaler(30),
    marginHorizontal: scaler(20),
    marginVertical: scaler(25),
    borderRadius: scaler(16),
    alignItems: 'center',
    height: heightScreen / 2,
  },
  textLabel: {
    fontSize: scaler(13),
    fontWeight: '500',
    color: colors.gray50,
    marginTop: scaler(20),
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    fontWeight: '500',
    paddingTop: scaler(10),
  },
  buttonDone: {
    backgroundColor: colors.pink200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(15),
    marginTop: scaler(20),
    borderRadius: scaler(40),
  },
  textDone: {
    fontSize: scaler(15),
    fontWeight: '600',
    color: colors.white,
  },
  buttonCancel: {
    backgroundColor: colors.gray350,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(15),
    marginTop: scaler(12),
    borderRadius: scaler(40),
  },
  textCancel: {
    fontSize: scaler(14),
    fontWeight: '500',
    color: colors.textColor,
  },
});
