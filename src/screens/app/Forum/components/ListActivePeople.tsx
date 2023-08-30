import {scaler} from '@stylesCommon';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

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
    <FlatList
      data={exampleList}
      renderItem={renderItem}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(10),
    marginTop: scaler(12),
    marginBottom: scaler(16),
    flexGrow: 0,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: scaler(60),
    paddingHorizontal: scaler(12),
    borderRadius: 40,
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
});
