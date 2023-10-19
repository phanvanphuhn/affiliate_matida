import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

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
  const navigation = useNavigation();

  const renderItem = ({item, index}: any) => {
    const onNavigateToDetailDeal = () => {
      navigation.navigate(ROUTE_NAME.DETAIL_DEAL, {data: item});
    };

    let imageUrl;

    switch (item.author) {
      case 'Vinaquick':
        imageUrl = require('../../../../images/image/vinaQuick.jpeg');
        break;
      case 'Happy Parent':
        imageUrl = require('../../../../images/image/happyParenting.jpeg');
        break;
      case 'Spa Vuông Tròn':
        imageUrl = require('../../../../images/image/happyParenting.jpeg');
        break;
      case 'Piny Studio':
        imageUrl = require('../../../../images/image/pinyStudio.jpg');
        break;
      case 'The Idyl':
        imageUrl = require('../../../../images/image/idyl.jpeg');
        break;
      default:
        imageUrl = {
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
        };
        break;
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onNavigateToDetailDeal}>
        <Image
          source={imageUrl}
          style={{
            width: '100%',
            height: 220,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <View style={styles.bottomItemContainer}>
          <Text numberOfLines={2} style={{fontSize: 12}}>
            {item.title}
          </Text>

          <View style={styles.wrapBottomItemContainer}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
              }}
              style={{
                width: 16,
                height: 16,
                borderRadius: 99,
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{color: colors.textSmallColor, fontSize: scaler(10)}}>
                {` by`}{' '}
                <Text style={{color: colors.success_message}}>
                  {item.author}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '47%',
    marginBottom: 16,
    marginRight: 16,
    height: 290,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  bottomItemContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapBottomItemContainer: {
    flexDirection: 'row',
  },
});

export default ListDeal;
