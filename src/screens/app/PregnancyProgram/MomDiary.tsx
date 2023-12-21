import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Header} from '@component';
import {
  ic_back_arrow,
  ic_default_upload,
  ic_flower,
  ic_plus,
  iconAddImage,
  SvgLineWave,
} from '@images';
import {colors, heightScreen, scaler} from '@stylesCommon';
import {goBack} from '@navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface MomDiaryProps {}

const MomDiary = (props: MomDiaryProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <Header
        title={'Mom Diary'}
        IconLeft={
          <Image
            source={ic_back_arrow}
            style={{
              height: 30,
              width: 30,
              tintColor: colors.black10,
            }}
          />
        }
        onPressLeft={goBack}
      />

      <KeyboardAwareScrollView>
        <View
          style={{
            backgroundColor: colors.blue,
            paddingTop: 15,
            zIndex: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: scaler(14),
              fontWeight: '500',
              color: colors.white,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}>
            Make sure to fill out this diary every week. At the end of your
            pregnancy, Matida has a present for you.
          </Text>
          <View style={{bottom: -8}}>
            <SvgLineWave color={colors.pink250} />
          </View>
        </View>
        <View style={{flex: 1, paddingBottom: 40}}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: heightScreen / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}>
            <Image
              source={ic_default_upload}
              style={{
                height: '90%',
                resizeMode: 'contain',
                tintColor: 'rgba(0, 0, 0, 0.07)',
                bottom: 0,
                position: 'absolute',
              }}
            />
            <Image source={ic_plus} />
          </TouchableOpacity>
          <View style={{top: -8}}>
            <SvgLineWave color={colors.pink250} />
          </View>

          <View style={{padding: 15}}>
            <Text
              style={{
                fontSize: scaler(15),
                color: colors.labelColor,
                marginBottom: 30,
              }}>
              Upload a picture of your bump this week
            </Text>
            <Text
              style={{
                fontSize: scaler(15),
                fontWeight: '500',
                color: colors.labelColor,
                marginBottom: 5,
              }}>
              Week 5 message to your baby
            </Text>
            <Text
              style={{
                fontSize: scaler(22),
                fontWeight: '600',
              }}>
              Can you feel the changes happening inside?
            </Text>
            <TextInput
              placeholder={'Write something about this '}
              style={{
                minHeight: 60,
                paddingTop: 20,
              }}
              multiline={true}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 30,
              }}>
              <Image source={ic_flower} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MomDiary;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
});
