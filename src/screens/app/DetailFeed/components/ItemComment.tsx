import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {AppImage} from '@component';
import {ic_comment, SvgHeart, SvgHearted} from '@images';
import {IDataComment} from '../types';
import {useTranslation} from 'react-i18next';
import {useVideo} from './Container';

interface ItemCommentProps {
  item: IDataComment;
  onLiked: (item: IDataComment) => void;
  onLikeReplies?: (index: number, reply: IDataComment) => void;
  isShowReplies?: boolean;
  index: number;
}

const ItemComment = (props: ItemCommentProps) => {
  const {t} = useTranslation();
  const {state, setState} = useVideo();

  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  return (
    <View>
      <View style={styles.container}>
        <AppImage uri={props?.item?.user?.avatar} style={styles.imgAvatar} />
        <View style={styles.container2}>
          <Text style={styles.txtUserName}>{props?.item?.user?.name}</Text>
          <Text style={styles.txtContent}>{props?.item.content}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => props?.onLiked && props.onLiked(props.item)}
              style={styles.btnLike}>
              {props?.item.is_liked ? <SvgHearted /> : <SvgHeart />}
              <Text style={styles.txtLike}>
                {props?.item.total_likes} {t('feed.like')}
              </Text>
            </TouchableOpacity>
            {!!props.isShowReplies && (
              <TouchableOpacity
                onPress={() => {
                  setState({comment: props.item});
                  setIsShowComment(isShow => !isShow);
                }}
                style={styles.btnLike}>
                <Image source={ic_comment} style={{tintColor: '#585858'}} />
                <Text style={styles.txtComment}>
                  {props?.item.total_reply_comment} {t('feed.comment')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {props.isShowReplies
        ? props.item?.reply_comments?.map(reply => {
            return (
              <View
                style={{
                  paddingLeft: 40,
                  flex: 1,
                }}>
                <ItemComment
                  item={reply}
                  onLiked={() =>
                    props?.onLikeReplies &&
                    props.onLikeReplies(props.index, reply)
                  }
                />
              </View>
            );
          })
        : null}
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  imgAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  container2: {paddingLeft: 10, flex: 1},
  txtUserName: {fontWeight: '700', paddingBottom: 10},
  txtContent: {fontWeight: '400', fontSize: 12},
  btnLike: {flexDirection: 'row', alignItems: 'center'},
  txtLike: {
    fontWeight: '400',
    fontSize: 12,
    color: '#585858',
    paddingRight: 25,
    paddingLeft: 5,
  },
  txtComment: {
    fontWeight: '400',
    fontSize: 12,
    color: '#585858',
    paddingLeft: 5,
  },
});
