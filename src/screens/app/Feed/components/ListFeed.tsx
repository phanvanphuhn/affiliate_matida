import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IDataListFeed } from '../type'
import { colors, scaler, stylesCommon } from '@stylesCommon'

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
            <Text style={styles.description}>
              {item.duration} mins watch
            </Text>
          </View>
          <View style={styles.rightDescription}>
            <Text style={styles.description}>
              {item.view} views
            </Text>
          </View>
        </View>
        <Text style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.subTitle}>
          Coach by <Text style={{color: colors.success_message}}>{item.author}</Text> 
        </Text>
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

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    paddingBottom: 250,
    padding: 8
  },
  itemContainer:{
    flex: 0.5,
    padding: 8
  },
  image:{
    height: 220,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  leftDescription:{
    position: 'absolute',
    bottom: 16,
    left: 8,
  },
  rightDescription:{
    position: 'absolute',
    right: 24,
    bottom: 16
  },
  description:{
    color: colors.gray,
    fontSize: scaler(9),
    ...stylesCommon.fontWeight400,
  },
  title:{
    color: colors.black,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    marginTop: 8
  },
  subTitle:{
    color: colors.textSmallColor,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight400,
    marginTop: 8
  }
})

export default ListFeed;
