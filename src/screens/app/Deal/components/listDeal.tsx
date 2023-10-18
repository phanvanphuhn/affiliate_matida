import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
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

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onNavigateToDetailDeal}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
          }}
          style={{
            width: '100%',
            height: 220,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <View style={styles.bottomItemContainer}>
          <Text numberOfLines={2}>{item.title}</Text>

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

            <Text style={{color: colors.textSmallColor}}>
              {` by`}{' '}
              <Text style={{color: colors.success_message}}>{item.author}</Text>
            </Text>
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
