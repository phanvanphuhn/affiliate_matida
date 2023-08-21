import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {iconClose} from '@images';
import {useKeyboard} from '@react-native-community/hooks';
import {colors} from '@stylesCommon';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IDataComment} from '../types';
import {useVideo} from './Container';
import useCommentFeed from '../useCommentFeed';
import KeyboardShift from './KeyboardShift';
import {AppImage} from '@component';
interface CommentProps {}

const CommentFeed = (props: CommentProps) => {
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();
  const {state, setState} = useVideo();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      setState({isShowComment: false});
    }
  }, []);
  const {
    state: stateComment,
    handleLoadMore,
    actionComment,
    setState: setStateComment,
    flatlitRef,
  } = useCommentFeed();
  useEffect(() => {
    if (state.isShowComment) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.close();
      setStateComment({page: 1});
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
          paddingHorizontal: 10,
        }}>
        <AppImage
          uri={item?.user?.avatar}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
          }}
        />
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={{fontWeight: '700', paddingBottom: 10}}>
            {item?.user?.name}
          </Text>
          <Text style={{fontWeight: '400', fontSize: 12}}>{item.content}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#585858',
                paddingRight: 20,
              }}>
              {item.total_likes} {t('feed.like')}
            </Text>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#585858'}}>
              {item.total_reply_comment} {t('feed.comment')}
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
    <>
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
            <Text style={{fontWeight: '600'}}>
              {stateComment.total ? stateComment.total : ''} {t('feed.comment')}
            </Text>
            <TouchableOpacity
              onPress={onCloseComment}
              style={{paddingHorizontal: 15}}>
              <Image source={iconClose} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          <BottomSheetFlatList
            data={stateComment.data}
            renderItem={renderItem}
            ref={flatlitRef}
            onEndReached={handleLoadMore}
            ListFooterComponent={
              stateComment.isLoadMore ? (
                <ActivityIndicator style={{marginTop: 10}} />
              ) : null
            }
            onEndReachedThreshold={0.7}
            ListEmptyComponent={
              !stateComment.isLoading ? (
                <View
                  style={{flex: 1, alignItems: 'center', paddingTop: '50%'}}>
                  <Text>Không có bình luận nào</Text>
                </View>
              ) : null
            }
            contentContainerStyle={{
              paddingBottom: insets.bottom + 65,
            }}
            keyExtractor={keyExtractor}
          />
        </View>
      </BottomSheet>
      {!!state.isShowComment && (
        <KeyboardShift
          onComment={actionComment}
          value={stateComment.content}
          onChangeText={content => setStateComment({content})}
        />
      )}
    </>
  );
};

export default CommentFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
