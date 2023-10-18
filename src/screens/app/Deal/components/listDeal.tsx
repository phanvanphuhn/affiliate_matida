import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

type TPros = {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  authorImage: string;
  data: Object;
};

const ListDeal = (props: TPros[]) => {
  const {data} = props;

  console.log('data: ', data);

  const renderItem = ({item, index}) => {
    console.log(item);
    <View>
      <Text>{item.title}</Text>
    </View>;
  };

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListDeal;
