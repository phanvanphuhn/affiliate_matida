import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailNewBorn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Detail New Born</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailNewBorn;
