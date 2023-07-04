import {fireworkOne, fireworkTwo} from '@images';
import {scaler} from '@stylesCommon';
import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';

type Props = {
  visible: boolean;
  children: React.ReactNode;
  hideModalPressViewOut?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  firework?: boolean;
};

export const ModalTestDetail = ({
  visible,
  children,
  hideModalPressViewOut = false,
  setVisible,
  firework = false,
}: Props) => {
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        {hideModalPressViewOut ? (
          <View
            style={styles.viewOut} //@ts-ignore
            onStartShouldSetResponder={() => setVisible(false)}
          />
        ) : (
          <View style={styles.viewOut} />
        )}
        {firework ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}>
            <Image
              source={fireworkOne}
              style={{position: 'absolute', top: 0, left: 0, right: 0}}
            />
            <Image
              source={fireworkTwo}
              style={{position: 'absolute', top: 0, left: 0, right: 0}}
            />
          </View>
        ) : null}

        <View style={[styles.container]}>{children}</View>
        {hideModalPressViewOut ? (
          <View
            style={styles.viewOut} //@ts-ignore
            onStartShouldSetResponder={() => setVisible(false)}
          />
        ) : (
          <View style={styles.viewOut} />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(43),
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(10),
    // alignItems: 'center',
    padding: scaler(16),
    paddingTop: scaler(32),
  },
});
