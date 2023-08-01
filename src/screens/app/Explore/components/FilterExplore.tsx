import {AppButton} from '@component';
import {
  SvgBabyCare,
  SvgBox,
  SvgCaretDown,
  SvgCheckBox,
  SvgFitness,
  SvgLabour,
  SvgLife,
  SvgMedical,
  SvgMental,
  SvgNutrition,
  SvgPregnancyExplore,
  SvgTrimester1,
  SvgTrimester2,
  SvgTrimester3,
} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {changePageExplore} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Page} from '../type';
import {HeaderFilter} from './HeaderFilter';

type ITtemFilter = {
  label: string;
  value: any;
  icon: JSX.Element | undefined;
};

type IList = {
  label: string;
  data: ITtemFilter[];
};

type Props = {
  onCallback: () => void;
  pageExplore: Page;
};

export const FilterExplore = ({onCallback, pageExplore}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const filter = useSelector((state: any) => state?.explore?.filter);

  const [visible, setVisible] = useState<boolean>(false);
  const [trimesters, setTrimesters] = useState<number[]>([]);
  const [topics, setTopics] = useState<number[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setTrimesters(filter?.filterTopic?.trimesters);
      setTopics(filter?.filterTopic?.topics);
    }, [filter]),
  );

  const filtered =
    filter?.filterTopic?.trimesters?.length !== 0 ||
    filter?.filterTopic?.topics?.length !== 0;

  const list: IList[] = [
    {
      label: 'trimesters',
      data: [
        {
          label: t('podcast.trimester', {index: 1}),
          value: 1,
          icon: <SvgTrimester1 />,
        },
        {
          label: t('podcast.trimester', {index: 2}),
          value: 2,
          icon: <SvgTrimester2 />,
        },
        {
          label: t('podcast.trimester', {index: 3}),
          value: 3,
          icon: <SvgTrimester3 />,
        },
      ],
    },
    {
      label: 'topics',
      data: [
        {
          label: t('articles.pregnancy'),
          value: 1,
          icon: <SvgPregnancyExplore />,
        },
        {
          label: t('articles.medical'),
          value: 2,
          icon: <SvgMedical />,
        },
        {
          label: t('articles.mentalHealth'),
          value: 3,
          icon: <SvgMental />,
        },
        {
          label: t('articles.fitnessWellness'),
          value: 4,
          icon: <SvgFitness />,
        },
        {
          label: t('articles.nutrition'),
          value: 5,
          icon: <SvgNutrition />,
        },
        {
          label: t('articles.lifeCareer'),
          value: 6,
          icon: <SvgLife />,
        },
        {
          label: t('articles.labour'),
          value: 7,
          icon: <SvgLabour />,
        },
        {
          label: t('articles.babyCare'),
          value: 8,
          icon: <SvgBabyCare />,
        },
      ],
    },
  ];

  const handleSave = () => {
    const valueSoft = {
      trimesters:
        trimesters.length > 1
          ? trimesters.sort((a: number, b: number) => a - b)
          : trimesters,
      topics:
        topics.length > 1
          ? topics.sort((a: number, b: number) => a - b)
          : topics,
    };
    dispatch(
      changePageExplore({
        page: 1,
        pageExplore: pageExplore,
        expert: '',
        option: filter?.option,
        trimesters: valueSoft?.trimesters,
        topics: valueSoft?.topics,
      }),
    );
    onCallback();
    setVisible(false);
  };

  const handleClear = () => {
    setTrimesters([]);
    setTopics([]);
  };

  const handleCancel = () => {
    setVisible(false);
    setTrimesters(filter?.filterTopic?.trimesters || []);
    setTopics(filter?.filterTopic?.topics || []);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.9}
        style={[
          styles.btnOption,
          {
            marginLeft: scaler(5),
            marginRight: 0,
            backgroundColor: filtered ? colors.brandMainPinkRed : '#F7F7F7',
            opacity: 1,
          },
        ]}>
        <Text
          style={{
            ...stylesCommon.fontWeight400,
            fontSize: scaler(14),
            textAlign: 'center',
            color: filtered ? colors.white : colors.gray200,
          }}>
          {t('explore.filter')}
        </Text>
        <SvgCaretDown stroke={filtered ? colors.white : colors.gray200} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
        animationType="fade">
        <View style={styles.containerModal}>
          <View
            style={styles.viewOut}
            //@ts-ignore
            onStartShouldSetResponder={handleCancel}
          />
          <View style={[styles.containerViewModal]}>
            <HeaderFilter
              onPress={handleCancel}
              title={t('explore.titleFilterTopic')}
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.keyboardAwareScrollView}
              bounces={false}>
              <RenderItem
                item={list[0]}
                value={trimesters}
                setValue={setTrimesters}
              />
              <RenderItem item={list[1]} value={topics} setValue={setTopics} />
            </KeyboardAwareScrollView>

            <View style={{paddingHorizontal: scaler(16)}}>
              <AppButton
                titleButton={t('articles.filter.apply')}
                customStyleButton={styles.buttonSave}
                customStyleText={{
                  color: colors.white,
                }}
                onClick={handleSave}
              />
              <AppButton
                titleButton={t('articles.filter.clearAll')}
                customStyleButton={[
                  styles.buttonSave,
                  {
                    marginBottom: scaler(30),
                    backgroundColor: colors.white,
                    marginTop: scaler(4),
                  },
                ]}
                customStyleText={{
                  color: colors.brandMainPinkRed,
                }}
                onClick={handleClear}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

type PropsITem = {
  item: any;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
};

const RenderItem = ({item, value, setValue}: PropsITem) => {
  const handleOnPress = (itemValue: number) => {
    if (value?.includes(itemValue)) {
      setValue(value.filter((x: number) => x !== itemValue));
    } else {
      setValue([...value, itemValue]);
    }
  };
  return (
    <>
      {item.data.map((option: ITtemFilter, index: number) => {
        const isSelected = !!value?.includes(option.value);
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleOnPress(option.value)}
            style={[
              styles.itemFilter,
              {
                borderTopWidth: index === 0 ? scaler(1) : scaler(0.5),
                borderBottomWidth:
                  index === item?.data?.length - 1 ? scaler(1) : scaler(0.5),
              },
            ]}
            key={index}>
            {isSelected ? <SvgCheckBox /> : <SvgBox />}
            <View style={{marginLeft: scaler(16), marginRight: scaler(8)}}>
              {!!option.icon && option.icon}
            </View>
            <Text style={[styles.textItemFilter]}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  btnOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(12),
    borderRadius: scaler(40),
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray250,
    borderRadius: scaler(8),
    flex: 1,
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  textFilter: {
    ...stylesCommon.fontWeight400,
    color: colors.textSmallColor,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    height: '80%',
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  viewHeaderModal: {
    paddingVertical: scaler(10),
  },
  placeholder: {
    color: colors.borderColor,
    fontSize: scaler(14),
    lineHeight: scaler(17),
    ...stylesCommon.fontWeight500,
  },
  itemFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
  },
  textItemFilter: {
    marginLeft: scaler(8),
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    lineHeight: 21,
  },
  textTitleFilter: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    lineHeight: 19,
    marginBottom: scaler(16),
  },
  textClear: {
    color: colors.brandMainPinkRed,
    fontSize: scaler(14),
    textAlign: 'right',
  },
  buttonSave: {
    alignSelf: 'center',
    height: undefined,
    backgroundColor: colors.brandMainPinkRed,
    paddingVertical: scaler(14),
    paddingHorizontal: scaler(32),
    marginTop: scaler(20),
  },
});
