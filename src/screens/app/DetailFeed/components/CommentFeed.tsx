import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import {iconClose} from '@images';
import {colors} from '@stylesCommon';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
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
import useCommentFeed from '../useCommentFeed';
import {useVideo} from './Container';
import ItemComment from './ItemComment';
import KeyboardShift from './KeyboardShift';

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
    actionLikeComment,
    actionReliesComment,
    actionLikeRepliesComment,
  } = useCommentFeed();
  useEffect(() => {
    if (state.isShowComment) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.close();
      setStateComment({page: 1});
      setState({comment: undefined});
    }
  }, [state.isShowComment]);

  const renderItem: ListRenderItem<IDataComment> = ({item, index}) => {
    return (
      <ItemComment
        item={item}
        onLiked={actionLikeComment}
        onLikeReplies={actionLikeRepliesComment}
        isShowReplies={true}
        index={index}
      />
    );
  };
  const onCloseComment = () => {
    setState({
      isShowComment: false,
    });
  };
  const keyExtractor = (item: IDataComment, index: number) => index.toString();

  const onComment = () => {
    state?.comment ? actionReliesComment(state.comment.id) : actionComment();
  };
  const renderBackdrop = useCallback(
    (props2: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props2}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={onCloseComment}
        pressBehavior={'close'}
      />
    ),
    [],
  );
  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
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
              {state.totalComment ? state.totalComment : ''} {t('feed.comment')}
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
                  <Text>{t('feed.noComment')}</Text>
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
          onComment={onComment}
          value={stateComment.content}
          onChangeText={content => setStateComment({content})}
        />
      )}
    </>
  );
};

export default React.memo(CommentFeed);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
