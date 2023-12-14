import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ic_gift, ic_strawberry} from '@images';
import LinearGradient from 'react-native-linear-gradient';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {goBack} from '@navigation';

interface WeeklyChallengeCompleteProps {}

const WeeklyChallengeComplete = (props: WeeklyChallengeCompleteProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: colors.backgroundOpacity,
          padding: 30,
          borderRadius: widthScreen / 2,
        }}>
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 30,
            borderRadius: widthScreen / 2,
          }}>
          <LinearGradient
            start={{x: 0.0, y: 0.5}}
            end={{x: 0.5, y: 1.0}}
            colors={['#8665FF', '#EE6566']}
            style={[
              {
                backgroundColor: colors.primaryBackground,
                height: widthScreen / 3,
                width: widthScreen / 3,
                borderRadius: widthScreen / 2 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          />
          <Image
            source={ic_strawberry}
            style={{
              resizeMode: 'contain',
              height: '140%',
              width: '140%',
              position: 'absolute',
              alignSelf: 'center',
              top: '0%',
            }}
          />
        </View>
      </View>
      <View
        style={{
          padding: scaler(20),
          alignSelf: 'center',
          justifyContent: 'center',
          paddingTop: scaler(40),
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scaler(24),
            fontWeight: '600',
          }}>
          Good job, Mom!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: colors.labelColor,
            marginTop: scaler(10),
            marginBottom: scaler(30),
          }}>
          You’ve finished all tasks for this week! Now let's reward yourself
          with a little snack!
        </Text>
        <TouchableOpacity
          onPress={goBack}
          style={{
            backgroundColor: colors.primaryBackground,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
            borderRadius: scaler(40),
          }}>
          <Text style={{color: colors.white, fontWeight: '500'}}>Yesssss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeeklyChallengeComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
