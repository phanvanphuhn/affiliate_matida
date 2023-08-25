import {
  AppModal,
  ModalConfirm,
  ModalConfirmBlock,
  ModalOption,
} from '@component';
import {SvgFlag, SvgProhibit} from '@images';
import {deleteListUserPost} from '@redux';
import {blockUserApi, GlobalService} from '@services';
import {colors, scaler, widthScreen} from '@stylesCommon';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {ItemPost} from '../../Forum/components/ItemPost';

type Props = {
  data?: any[];
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

export const ListPost = (props: Props) => {
  const {data, setReset} = props;

  const dispatch = useDispatch();
  // const week = useSelector((state: any) => state?.home?.week);
  const {t} = useTranslation();
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [idPostSelect, setIdPostSelect] = useState<number | string | null>(0);
  const [modalBlock, setModalBlock] = useState<any>(false);
  const [dataUser, setDataUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
  const handlePressOption = (idPost: any, dataU: any) => {
    setIdPostSelect(idPost ?? 0);
    setDataUser(dataU);
    refOption.current?.open();
  };
  const onConfirmDelete = async () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
    // callBackData();
    // getDataPost();
    setReset((r: boolean) => !r);
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
      // callBackData();
      // getDataPost();
      setReset((r: boolean) => !r);
    } catch (errro) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  const callBackData = () => {
    // dispatch(getDataHomeByWeek({week: week}));
  };

  const rendetItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ItemPost
        item={item}
        onDelete={() => deleteItem(item)}
        onPressOption={handlePressOption}
        navigateType={'push'}
      />
    );
  };
  return (
    <View>
      {!!data?.length && <FlatList data={data} renderItem={rendetItem} />}
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
    </View>
  );
};
