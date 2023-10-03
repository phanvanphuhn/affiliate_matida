/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {ListPostHorizontal} from './ListPostHorizontal';

export const TabAll = () => {
  const forum = useSelector((state: any) => state?.forum?.forum) ?? [];
  reactotron.log?.('FORUM ALL', forum);
  return (
    <View style={styles.container}>
      {forum?.map((val: any) => {
        return <ListPostHorizontal data={val} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
