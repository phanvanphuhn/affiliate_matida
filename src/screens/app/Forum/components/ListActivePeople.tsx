/* eslint-disable @typescript-eslint/no-unused-vars */
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const exampleList = new Array(10);

export const ListActivePeople = () => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.item}>
        <View style={styles.active} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Who's Online? You can start chatting with people now
      </Text>
      <FlatList
        data={exampleList}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        horizontal
        style={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaler(12),
    // marginBottom: scaler(16),
    // paddingHorizontal: scaler(16),
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    // paddingVertical: scaler(6),
  },
  listContainer: {
    flexGrow: 0,
  },
  contentContainer: {
    alignItems: 'center',
    height: scaler(60),
    paddingLeft: scaler(16),
  },
  item: {
    height: scaler(40),
    width: scaler(40),
    borderRadius: scaler(25),
    marginRight: scaler(12),
    backgroundColor: 'blue',
  },
  active: {
    height: scaler(8),
    width: scaler(8),
    borderRadius: scaler(6),
    borderWidth: scaler(1),
    borderColor: 'white',
    position: 'absolute',
    bottom: scaler(1),
    right: scaler(3),
    backgroundColor: '#63D761',
  },
  text: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(10),
    color: colors.textColor,
    marginBottom: scaler(9),
    paddingHorizontal: scaler(12),
    marginLeft: scaler(16),
  },
});
