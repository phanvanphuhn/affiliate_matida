import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
  Platform,
} from 'react-native';
import {colors, heightScreen} from '@stylesCommon';
import {IDataComment} from '../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ic_comment, ic_send, iconClose} from '@images';
import useDetailFeed from '../useDetailFeed';
import {useVideo} from './Container';
import KeyboardShift from './KeyboardShift';
import {useKeyboard} from '@react-native-community/hooks';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
interface CommentProps {}

const CommentFeed = (props: CommentProps) => {
  const [dataComment, setDataComment] = useState<IDataComment[]>();
  const insets = useSafeAreaInsets();
  const {state, setState} = useVideo();
  const keyboard = useKeyboard();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index == -1) {
      setState({isShowComment: false});
    }
  }, []);
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
  useEffect(() => {
    if (state.isShowComment) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [state.isShowComment]);

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
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={[styles.container, {paddingTop: 10}]}>
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
        <BottomSheetFlatList
          data={dataComment}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 65,
          }}
          keyExtractor={keyExtractor}
        />
      </View>
    </BottomSheet>
  );
};

export default CommentFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
