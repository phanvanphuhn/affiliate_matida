import {EStatusShareArticleUser} from '@constant';
import {avatarDefault, SvgCheckedCircle, SvgPaperPlaneRight} from '@images';
import {postShareLinkUser} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppImage} from '../AppImage';

interface RenderItemProps {
  user: any;
  link: string;
  listIdUserSelected: string[];
  setListUserSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ItemShareUser = ({
  user,
  link,
  listIdUserSelected,
  setListUserSelected,
}: RenderItemProps) => {
  const {t} = useTranslation();
  const user_id = useSelector((state: any) => state.auth?.userInfo?.id);
  const [status, setStatus] = useState<EStatusShareArticleUser>(
    EStatusShareArticleUser.PENDING,
  );

  useEffect(() => {
    const isSelect = listIdUserSelected.some(
      itemIdUserSelected =>
        itemIdUserSelected.toString() === user?.id?.toString(),
    );
    if (isSelect) {
      setStatus(EStatusShareArticleUser.DONE);
    }
  }, [listIdUserSelected]);

  const handPressShareUser = async () => {
    try {
      setStatus(EStatusShareArticleUser.SENDING);
      const data = {
        receiver_ids: [user?.id],
        sender_id: user_id,
        content: link,
        message_type: 6,
        type: 1,
      };
      const res = await postShareLinkUser(data);
      setStatus(EStatusShareArticleUser.DONE);
      setListUserSelected([...listIdUserSelected, user?.id?.toString()]);
    } catch (e) {
      setStatus(EStatusShareArticleUser.PENDING);
    } finally {
    }
  };

  const renderStatusShare = () => {
    switch (status) {
      case EStatusShareArticleUser.PENDING:
        return <SvgPaperPlaneRight />;
      case EStatusShareArticleUser.SENDING:
        return <ActivityIndicator color={colors.primary} size="small" />;
      case EStatusShareArticleUser.DONE:
        return <SvgCheckedCircle color={colors.primary} />;
      default:
        return <></>;
    }
  };

  return (
    <TouchableOpacity
      onPress={handPressShareUser}
      activeOpacity={0.8}
      disabled={status !== EStatusShareArticleUser.PENDING}
      style={[styles.containerItemModal]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {user?.avatar ? (
          <AppImage user uri={user?.avatar} style={styles.avatar} />
        ) : (
          <Image source={avatarDefault} style={styles.avatar} />
        )}
        <Text style={[styles.textLabel]}>{user?.name ?? 'User'}</Text>
      </View>
      {renderStatusShare()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItemModal: {
    paddingVertical: scaler(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(16),
  },
  avatar: {
    height: scaler(44),
    width: scaler(44),
    borderRadius: scaler(22),
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
});
