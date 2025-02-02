import {
  AppModal,
  HorizontalList,
  ModalConfirm,
  ModalConfirmBlock,
  ModalOption,
} from '@component';
import {SvgFlag, SvgProhibit} from '@images';
import {navigate} from '@navigation';
import {deleteListUserPost, getDataHomeByWeek} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, blockUserApi} from '@services';
import {colors, scaler, widthScreen} from '@stylesCommon';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, ViewStyle} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {DiscussionPost} from './components';
type Props = {
  posts: any[];
  // callBackData: () => void;
  loading: boolean;
  cardBorderStyle?: StyleProp<ViewStyle>;
};
export enum Option {
  REPORT,
  BLOCK,
}
export type IOption = {
  id: number;
  label: string;
  onPress: () => void;
  value: Option;
  icon: React.ReactNode;
};
export const ListPostComponent = ({posts, loading, cardBorderStyle}: Props) => {
  const dispatch = useDispatch();
  const week = useSelector((state: any) => state?.home?.week);
  const {t} = useTranslation();
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [idPostSelect, setIdPostSelect] = useState<number | string | null>(0);
  const [modalBlock, setModalBlock] = useState<any>(false);
  const [dataUser, setDataUser] = useState<any>(null);
  const refOption = useRef<any>(null);
  const listOption: IOption[] = [
    {
      id: 1,
      label: t('post.settings.report'),
      value: Option.REPORT,
      onPress: () => handleReportUser(),
      icon: <SvgFlag />,
    },
    {
      id: 2,
      label: t('post.settings.block'),
      value: Option.BLOCK,
      onPress: () => handleBlockUser(),
      icon: <SvgProhibit />,
    },
  ];
  const handleReportUser = () => {};
  const handleBlockUser = () => {
    refOption.current?.close();
    setTimeout(() => {
      setModalBlock(true);
    }, 500);
  };
  const deleteItem = (value: any) => {
    setIdDelete(value?.id);
    setModalDelete(true);
  };
  const handlePressOption = (idPost: any, dataUser: any) => {
    setIdPostSelect(idPost ?? 0);
    setDataUser(dataUser);
    refOption.current?.open();
  };
  const onConfirmDelete = async () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
    callBackData();
  };
  const blockUser = async () => {
    try {
      GlobalService.showLoading();
      const res = await blockUserApi(dataUser?.user_id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      callBackData();
      GlobalService.hideLoading();
    } catch (errro) {
      GlobalService.hideLoading();
    }
  };
  const callBackData = () => {
    dispatch(getDataHomeByWeek({week: week}));
  };
  return (
    <>
      <HorizontalList
        loading={loading}
        // IconSvg={<SvgMessages3 />}
        title={t('home.talkAbout')}
        length={posts?.length}
        textSee={t('home.viewAll')}
        styleHeader={{paddingHorizontal: scaler(20)}}
        onPressSeeMore={() => {
          navigate(ROUTE_NAME.TAB_COMMUNITY);
        }}
        styleScroll={{marginBottom: 12}}>
        {posts?.map((post: any) => (
          <DiscussionPost
            post={post}
            callBackData={callBackData}
            onDelete={() => deleteItem(post)}
            onPressOption={handlePressOption}
            cardBorderStyle={cardBorderStyle}
            key={post.id}
          />
        ))}
      </HorizontalList>
      <ModalConfirm
        visible={modalDelete}
        titleHeader={t('post.title_modal_delete')}
        onCancel={() => setModalDelete(false)}
        onConfirm={onConfirmDelete}
      />
      <AppModal
        position="bottom"
        ref={refOption}
        modalSize={{
          height: scaler(200),
          width: widthScreen,
        }}>
        <ModalOption
          onClose={() => refOption.current?.close()}
          listItem={listOption}
          idPost={idPostSelect}
        />
      </AppModal>
      <ModalConfirmBlock
        visible={modalBlock}
        onCancel={() => setModalBlock(false)}
        onConfirm={() => {
          setModalBlock(false);
          blockUser();
        }}
        useName={dataUser?.user?.name}
      />
    </>
  );
};
