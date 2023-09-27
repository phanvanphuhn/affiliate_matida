/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppImage} from '@component';
import {createTopic, getListUserOnline} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//@ts-ignore
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {debounce} from 'lodash';
import {showMessage} from 'react-native-flash-message';

const exampleList = new Array(10);

export const ListActivePeople = () => {
  const [data, setData] = useState<any[]>([]);
  const reload = useRef(true);

  const getData = async () => {
    try {
      const res = await getListUserOnline();
      setDebounce(res?.data?.userOnlines ?? []);
      if (reload.current) {
        setTimeout(() => {
          getData();
        }, 5000);
      }
    } catch (error) {}
  };

  const setDebounce = useMemo(
    () =>
      debounce((value: any) => {
        setData(value);
      }, 500),
    [],
  );

  useEffect(() => {
    getData();
    // setInterval(() => {
    //   getData();
    // }, 5000);
    return () => {
      reload.current = false;
    };
  }, []);

  const handlePress = async (item: any) => {
    try {
      const res = await createTopic(item?.id);
      navigate(ROUTE_NAME.DETAIL_CHAT, {
        topic_id: res?.data?.topic_id,
        receiver_id: item?.id,
      });
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    } finally {
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePress(item)}
        style={styles.item}>
        <AppImage user uri={item?.avatar} style={styles.image} />
        <View style={styles.active} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Who's Online? You can start chatting with people now
      </Text>
      <FlatList
        data={data}
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
  },
  image: {
    height: scaler(40),
    width: scaler(40),
    borderRadius: scaler(25),
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
