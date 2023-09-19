import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ItemPostHorizontal} from './ItemPostHorizontal';

type Props = {};

const exampleList = new Array(10);

export const ListPostHorizontal = (props: Props) => {
  const {} = props;

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <ItemPostHorizontal item={item} key={index} isImage={index < 3} />;
  };

  return (
    <View>
      <View style={styles.viewTitle}>
        <Text style={styles.txtTitle}>{'Title'}</Text>
        <Text style={styles.txtSeemore}>{'Xem them'}</Text>
      </View>
      <FlatList
        data={exampleList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  txtTitle: {
    ...stylesCommon.fontWeight700,
    color: '#252525',
    fontSize: scaler(20),
  },
  txtSeemore: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.red50,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: scaler(16),
  },
  list: {
    flexGrow: 0,
    marginVertical: scaler(16),
  },
  listContentContainer: {
    paddingLeft: scaler(16),
  },
});
