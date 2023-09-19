import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import ItemFloatingComment from './ItemFloatingComment';

const ListFloatingComment = (props: any) => {
  const [arr, setArr] = useState([]);
  const scrollRef = useRef<ScrollView>(null);
  const intervalRef = useRef<number>();
  const dataMessage = useRef([
    {
      id: 1,
      user: 'Phu',
      content: 'Hello',
    },
    {
      id: 2,
      user: 'Phu',
      content: 'Hello2',
    },
    {
      id: 3,
      user: 'Phu',
      content: 'Hello3',
    },
    {
      id: 4,
      user: 'Phu',
      content: 'Hello4',
    },
    {
      id: 5,
      user: 'Phu',
      content: 'Hello5',
    },
  ]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('interval: ', intervalRef.current);
      if (arr.filter(item => !item.id).length === 3) {
        console.log('here');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }
      if (dataMessage.current.length === 0) {
        let newArr = [...arr];
        newArr.push({});
        setArr(newArr);
      } else {
        let newArr = [...arr];
        newArr.push(dataMessage.current.shift());
        setArr(newArr);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [arr]);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        bottom: '30%',
        justifyContent: 'flex-end',
        maxHeight: 250,
      }}>
      <ScrollView
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
        ref={scrollRef}
        scrollEnabled={false}>
        {arr.map(item => {
          return item.id ? (
            <ItemFloatingComment item={item} />
          ) : (
            <View style={{height: 50}}></View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
});

export default ListFloatingComment;
