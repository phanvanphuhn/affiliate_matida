import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '@stylesCommon';
import {IDataListFeed} from '../../Feed/type';

interface TitleFeedProps {
  item: IDataListFeed;
}

const TitleFeed = (props: TitleFeedProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.item.title}</Text>
      <Text style={styles.description}>{props.item.description}</Text>
    </View>
  );
};

export default TitleFeed;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 16,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
    paddingBottom: 10,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    padding: 16,
  },
});
