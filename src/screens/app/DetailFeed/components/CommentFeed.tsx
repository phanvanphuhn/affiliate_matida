import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {colors, heightScreen} from '@stylesCommon';
import {IDataComment} from '../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ic_comment, ic_send, iconClose} from '@images';
import useDetailFeed from '../useDetailFeed';
import {useVideo} from './Container';

interface CommentProps {}

const CommentFeed = (props: CommentProps) => {
  const [dataComment, setDataComment] = useState<IDataComment[]>();
  const insets = useSafeAreaInsets();
  const {state, setState} = useVideo();
  useEffect(() => {
    setDataComment([
      {
        name: 'Vương quốc Anh',
        comment:
          'Vương quốc Anh và những điều thú vị bạn chưa biết\n' +
          'Vương quốc Anh ở đâu ? Vương quốc Anh bao gồm những nước nào ? Vương Quốc Anh có gì nổi tiếng là những câu hỏi mà rất nhiều khách hàng thường hỏi Dế Việt. Hãy cùng Dế Việt tìm hiểu những thông tin thú vị về Vương Quốc Anh qua bài viết sau đây nhé.',
        avatarUrl:
          'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
        likeCount: 2,
        commentCount: 5,
      },
      {
        name: 'Vương quốc Anh',
        comment:
          'Vương quốc Anh và những điều thú vị bạn chưa biết\n' +
          'Vương quốc Anh ở đâu ? Vương quốc Anh bao gồm những nước nào ? Vương Quốc Anh có gì nổi tiếng là những câu hỏi mà rất nhiều khách hàng thường hỏi Dế Việt. Hãy cùng Dế Việt tìm hiểu những thông tin thú vị về Vương Quốc Anh qua bài viết sau đây nhé.',
        avatarUrl:
          'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
        likeCount: 2,
        commentCount: 5,
      },
      {
        name: 'Vương quốc Anh',
        comment:
          'Vương quốc Anh và những điều thú vị bạn chưa biết\n' +
          'Vương quốc Anh ở đâu ? Vương quốc Anh bao gồm những nước nào ? Vương Quốc Anh có gì nổi tiếng là những câu hỏi mà rất nhiều khách hàng thường hỏi Dế Việt. Hãy cùng Dế Việt tìm hiểu những thông tin thú vị về Vương Quốc Anh qua bài viết sau đây nhé.',
        avatarUrl:
          'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
        likeCount: 2,
        commentCount: 5,
      },
    ]);
  }, []);

  const renderItem: ListRenderItem<IDataComment> = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingTop: 10,
          paddingBottom: 5,
        }}>
        <Image
          source={{uri: item.avatarUrl}}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
          }}
        />
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={{fontWeight: '700', paddingBottom: 10}}>
            {item.name}
          </Text>
          <Text style={{fontWeight: '400', fontSize: 12}}>{item.comment}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#585858',
                paddingRight: 20,
              }}>
              {item.likeCount} Like
            </Text>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#585858'}}>
              {item.commentCount} Comment
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const onCloseComment = () => {
    setState({
      isShowComment: false,
    });
  };
  const keyExtractor = (item: IDataComment, index: number) => index.toString();
  return (
    <KeyboardAvoidingView
      behavior={'position'}
      style={{
        zIndex: -10,
      }}>
      <View
        style={[
          styles.container,
          {paddingBottom: insets.bottom, paddingTop: 10},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}>
          <View style={{width: 50}} />
          <Text style={{fontWeight: '600'}}>111 Bình luận</Text>
          <TouchableOpacity
            onPress={onCloseComment}
            style={{paddingHorizontal: 15}}>
            <Image source={iconClose} style={{height: 24, width: 24}} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataComment}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingTop: 10,
          }}>
          <Image
            source={{
              uri: 'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 20,
            }}
          />
          <TextInput
            style={{
              backgroundColor: '#F5F5FF',
              flex: 1,
              borderRadius: 12,
              paddingVertical: 10,
              paddingLeft: 20,
              marginLeft: 12,
            }}
            placeholder={'Comment'}
          />
          <View style={{paddingHorizontal: 10}}>
            <Image source={ic_send} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: heightScreen / 1.5,
  },
});
