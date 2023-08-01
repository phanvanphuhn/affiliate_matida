import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IDataListFeed } from '../type'
import { colors } from '@stylesCommon'
import {styles} from '../styles'
import {iconClock, SvgEye} from '@images';

const ListFeed = (props: any) => {
  const {data} = props

  const renderItem = ({item}: IDataListFeed) =>{
    return(
      <TouchableOpacity style={styles.itemContainer}>
        <View>
          <Image
            source={{uri: item.image}}
            style={styles.image}
          /> 
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
        <Text style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.wrapAvatarContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.imageAvatar}
          /> 

          <Text style={styles.subTitle}>
            Coach by <Text style={{color: colors.success_message}}>{item.author}</Text> 
         </Text>  
        </View>        
      </TouchableOpacity>
    )
  }

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
  )
}

export default ListFeed;
