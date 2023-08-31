import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors, scaler} from '@stylesCommon';
import {getVersionApp} from '@services';
import DeviceInfo from 'react-native-device-info';

/**
 *
 * @param a
 * @param b
 * Return 1 if a > b
 * Return -1 if a < b
 * Return 0 if a == b
 */
function compareVersion(a: string, b: string) {
  if (a === b) {
    return 0;
  }

  var a_components = a.split('.');
  var b_components = b.split('.');

  var len = Math.min(a_components.length, b_components.length);

  // loop while the components are equal
  for (var i = 0; i < len; i++) {
    // A bigger than B
    if (parseInt(a_components[i]) > parseInt(b_components[i])) {
      return 1;
    }

    // B bigger than A
    if (parseInt(a_components[i]) < parseInt(b_components[i])) {
      return -1;
    }
  }

  // If one's a prefix of the other, the longer one is greater.
  if (a_components.length > b_components.length) {
    return 1;
  }

  if (a_components.length < b_components.length) {
    return -1;
  }

  // Otherwise they are the same.
  return 0;
}
interface CheckAppVersionProps {}

export const CheckAppVersion = (props: CheckAppVersionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const getVersion = async () => {
    const res = await getVersionApp();
    if (res.success) {
      let ver = DeviceInfo.getVersion();
      let versions = ver.split('.');
      let versionsRemote = res?.data[Platform.OS].split('.');
      versions.pop();
      versionsRemote.pop();
      let compare = compareVersion(
        versionsRemote.join('.'),
        versions.join('.'),
      );
      if (compare == 1) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    getVersion();
  }, []);

  const onUpdate = async () => {
    try {
      let packageName = 'com.growth.levers.matida';
      let id = '1671957732';

      let url =
        Platform.OS == 'android'
          ? `market://details?id=${packageName}`
          : `itms-apps://itunes.apple.com/us/app/id${id}?mt=8`;
      let response = await Linking.canOpenURL(url);
      if (response) {
        Linking.openURL(url);
        setIsVisible(false);
      }
    } catch (err) {}
  };
  return (
    <Modal
      animationInTiming={400}
      animationOutTiming={300}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      backdropOpacity={0.7}
      // onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}>
      <View style={styles.viewContent}>
        <Text
          style={{
            fontSize: scaler(16),
            fontWeight: '600',
            marginBottom: scaler(15),
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: scaler(14),
          }}>
          Please update the app to continue
        </Text>
        <TouchableOpacity onPress={onUpdate} style={styles.buttonUpdate}>
          <Text style={styles.textUpdate}>Update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(24),
    marginBottom: scaler(40),
  },
  viewContent: {
    backgroundColor: colors.white,
    borderRadius: scaler(16),
    paddingVertical: scaler(24),
    paddingHorizontal: scaler(20),
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonUpdate: {
    backgroundColor: colors.green150,
    borderRadius: scaler(8),
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(10),
    marginTop: scaler(30),
  },
  textUpdate: {
    fontSize: scaler(15),
    fontWeight: '500',
    color: colors.white,
  },
});
