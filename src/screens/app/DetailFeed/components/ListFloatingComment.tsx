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
import {getListCommentFeedApi} from '@services';

const ListFloatingComment = (props: any) => {
  const [arr, setArr] = useState<Array<{}>>([]);
  const scrollRef = useRef<ScrollView>(null);
  const intervalRef = useRef<number>();
  const floatingCommentRef = useRef([]);

  const getFloatingComment = async () => {
    try {
      const res = await getListCommentFeedApi(
        props?.item?.content_type,
        props?.item?.contentid,
        1,
        5,
      );
      if (res.success) {
        let data = res?.data?.comments;
        floatingCommentRef.current = data;
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    getFloatingComment();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (arr.filter(item => !item?.id).length === 3) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }
      if (floatingCommentRef.current.length === 0) {
        let newArr = [...arr];
        newArr.push({});
        setArr(newArr);
      } else {
        let newArr = [...arr];
        newArr.push(floatingCommentRef.current?.shift());
        setArr(newArr);
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [arr]);

  return (
    <View
      style={[
        {
          position: 'absolute',
          width: '100%',
          bottom: '30%',
          justifyContent: 'flex-end',
          height: 200,
        },
      ]}>
      <ScrollView
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
        ref={scrollRef}
        scrollEnabled={false}>
        {arr.map((item, i) => {
          return item?.id ? (
            <ItemFloatingComment key={i} item={item} />
          ) : (
            <View style={{height: 50}} key={i} />
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

export default React.memo(ListFloatingComment);
