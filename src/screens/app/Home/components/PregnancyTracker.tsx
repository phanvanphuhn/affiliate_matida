import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PregnancyTracker = () => {
  const navigation = useNavigation<any>();

  const handleWeeklyTracker = () => {
    navigation.navigate(ROUTE_NAME.SIZE_COMPARISON, {
      // option: OptionComparison.EMBRYO,
      option: 1,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleWeeklyTracker}
        style={{
          width: ((screenWidth - 48) / 100) * 60,
          marginRight: scaler(16),
        }}>
        <Image
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709171308095776118.png',
          }}
          style={{
            height: scaler(((((screenWidth - 48) / 100) * 60) / 224) * 300),
            width: '100%',
          }}
          resizeMethod="scale"
          resizeMode="stretch"
        />
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <Image
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709171843348073460.png',
          }}
          style={{
            height: scaler(
              (((((screenWidth - 48) / 100) * 60) / 224) * 300) / 2 - 8,
            ),
            width: '100%',
            marginBottom: scaler(16),
          }}
          resizeMethod="scale"
          resizeMode="stretch"
        />
        <Image
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709172602584539987.png',
          }}
          style={{
            height: scaler(
              (((((screenWidth - 48) / 100) * 60) / 224) * 300) / 2 - 8,
            ),
            width: '100%',
          }}
          resizeMethod="scale"
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default PregnancyTracker;
