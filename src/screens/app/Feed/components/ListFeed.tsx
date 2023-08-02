import {SvgEye, iconClock} from '@images';
import {colors} from '@stylesCommon';
import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from '../styles';
import {IDataListFeed} from '../type';

const ListFeed = (props: any) => {
  const {data} = props;

  const renderItem = ({item}: IDataListFeed) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.leftDescription}>
            <Image source={iconClock} />

            <Text style={styles.description} numberOfLines={1}>
              {item.duration} mins watch
            </Text>
          </View>
          <View style={styles.rightDescription}>
            <SvgEye stroke={colors.borderColor} />

            <Text style={styles.description} numberOfLines={1}>
              {item.view} views
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.wrapAvatarContainer}>
          <FastImage source={{uri: item.image}} style={styles.imageAvatar} />

          <Text style={styles.subTitle}>
            Coach by{' '}
            <Text style={{color: colors.success_message}}>{item.author}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListFeed;
