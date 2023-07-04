import {
  SvgArrowLeft,
  SvgCheckCircle,
  SvgCheckedCircle,
  SvgFunnelSimple,
  SvgIconCalm,
  SvgIconCurious,
  SvgIconDelete,
  SvgIconGrateful,
  SvgIconNervous,
  SvgIconSad,
  SvgSearch,
} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getUseField} from '@util';
import {Formik, FormikProps, useFormikContext} from 'formik';
import {t} from 'i18next';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton} from './AppButton';
import {Header} from './Header';

type IField = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined,
) => void;
interface ITtemFilter {
  label: string;
  value: any;
  icon: JSX.Element | undefined;
}
interface IList {
  title: string;
  label: string;
  data: ITtemFilter[];
}

interface IProps {
  onPressSave: (values: any) => void;
  flagClear?: boolean;
  onChangeText?: () => void;
  showFilter?: boolean;
}

export const TextInputFilter = ({
  onPressSave,
  flagClear = false,
  onChangeText,
  showFilter = true,
}: IProps) => {
  const initialValues = {
    Trimester: null,
    Mood: [],
    Topics: [],
  };
  const list: IList[] = [
    {
      title: t('articles.trimester'),
      label: 'Trimester',
      data: [
        {
          label: '1',
          value: 1,
          icon: undefined,
        },
        {
          label: '2',
          value: 2,
          icon: undefined,
        },
        {
          label: '3',
          value: 3,
          icon: undefined,
        },
      ],
    },
    {
      title: t('articles.mood'),
      label: 'Mood',
      data: [
        {
          label: t('articles.curious'),
          value: 1,
          icon: <SvgIconCurious />,
        },
        {
          label: t('articles.nervous'),
          value: 2,
          icon: <SvgIconSad />,
        },
        {
          label: t('articles.nauseous'),
          value: 3,
          icon: <SvgIconNervous />,
        },

        {
          label: t('articles.happy'),
          value: 4,
          icon: <SvgIconGrateful />,
        },
      ],
    },
    {
      title: t('articles.topic'),
      label: 'Topics',
      data: [
        {
          label: t('articles.pregnancy'),
          value: 1,
          icon: undefined,
        },
        {
          label: t('articles.medical'),
          value: 2,
          icon: undefined,
        },
        {
          label: t('articles.mentalHealth'),
          value: 3,
          icon: undefined,
        },
        {
          label: t('articles.fitnessWellness'),
          value: 4,
          icon: undefined,
        },
        {
          label: t('articles.nutrition'),
          value: 5,
          icon: undefined,
        },
        {
          label: t('articles.lifeCareer'),
          value: 6,
          icon: undefined,
        },
        {
          label: t('articles.labour'),
          value: 7,
          icon: undefined,
        },
        {
          label: t('articles.babyCare'),
          value: 8,
          icon: undefined,
        },
      ],
    },
  ];

  const refSearch = useRef(initialValues);
  const refFirst = useRef(false);
  const formRef = useRef<
    FormikProps<{
      Trimester: number | null;
      Mood: never[];
      Topics: never[];
    }>
  >();

  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filtered, setFiltered] = useState<boolean>(false);

  useEffect(() => {
    if (flagClear) {
      setSearch('');
      refSearch.current = initialValues;
    }
  }, [flagClear]);

  useEffect(() => {
    onChangeText && onChangeText();
    if (refFirst?.current) {
      handleDebounce(search);
    } else {
      refFirst.current = true;
    }
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      setSearch('');
      refSearch.current = initialValues;
    }, []),
  );

  const handleSearch = (value: string) => {
    const params = {
      search: value,
      ...formRef?.current?.values,
    };
    onPressSave(params);
  };

  const handleDebounce = useCallback(debounce(handleSearch, 1000), []);

  const handleSave = (values: any) => {
    refSearch.current = values;
    let valueSoft = values;
    valueSoft = {
      Trimester: valueSoft.Trimester,
      Mood: valueSoft.Mood.sort((a: number, b: number) => a - b),
      Topics: valueSoft.Topics.sort((a: number, b: number) => a - b),
    };
    onPressSave({...valueSoft, search: search});
    setVisible(!visible);
    if (isFiltered(values)) {
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  const handleClear = (setFieldValue: IField) => {
    setFieldValue('Trimester', null);
    setFieldValue('Mood', []);
    setFieldValue('Topics', []);
    setFiltered(false);
  };
  return (
    <Formik
      initialValues={refSearch.current}
      validateOnChange={false}
      //@ts-ignore
      innerRef={formRef}
      enableReinitialize
      onSubmit={handleSave}>
      {({values, setFieldValue}) => (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.viewInput, {backgroundColor: '#F6F6F6'}]}>
              <SvgSearch />
              <TextInput
                onChangeText={setSearch}
                value={search}
                style={styles.inputSearch}
                placeholder={t('explore.search') as string}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <SvgIconDelete />
                </TouchableOpacity>
              )}
            </View>
            {showFilter && (
              <TouchableOpacity onPress={() => setVisible(true)}>
                <SvgFunnelSimple
                  stroke={filtered ? colors.brandMainPinkRed : '#7C7C7C'}
                />
                <Text
                  style={[
                    styles.textFilter,
                    filtered && {color: colors.brandMainPinkRed},
                  ]}>
                  {t('articles.filter.filter')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
            animationType="fade">
            <View style={styles.containerModal}>
              <View
                style={styles.viewOut}
                //@ts-ignore
                onStartShouldSetResponder={() => setVisible(false)}
              />
              <View style={[styles.containerViewModal]}>
                <Header
                  onPressLeft={() => setVisible(false)}
                  IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
                  title={t('articles.filter.filter')}
                  ComponentRight={
                    <Text style={styles.textClear}>
                      {t('articles.filter.clearAll')}
                    </Text>
                  }
                  onPressRight={() => handleClear(setFieldValue)}
                  styleContainer={{paddingHorizontal: 0}}
                  routeName={'FILTER'}
                />
                <View
                  style={{
                    paddingHorizontal: scaler(20),
                    marginBottom: scaler(40),
                  }}>
                  <View>
                    <KeyboardAwareScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.keyboardAwareScrollView}
                      bounces={false}>
                      {list.map((item, index) => (
                        <RenderItem item={item} key={index} />
                      ))}
                    </KeyboardAwareScrollView>
                  </View>
                  <AppButton
                    titleButton={t('articles.filter.apply')}
                    customStyleButton={styles.buttonSave}
                    customStyleText={{
                      color: colors.white,
                    }}
                    onClick={() => handleSave(values)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </Formik>
  );
};

const RenderItem = ({item}: any) => {
  const {value, setValue} = getUseField(item.label);
  const isRadio = item.label === 'Trimester';

  const handleOnPress = (itemValue: number) => {
    if (isRadio) {
      handleRadio(itemValue);
    } else {
      if (value?.includes(itemValue)) {
        setValue(value.filter((x: number) => x !== itemValue));
      } else {
        setValue([...value, itemValue]);
      }
    }
  };
  const handleRadio = (itemValue: number) => {
    if (value === itemValue) {
      setValue(null);
    } else {
      setValue(itemValue);
    }
  };
  return (
    <View style={{marginBottom: scaler(16)}}>
      <Text style={styles.textTitleFilter}>{item.title}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {item.data.map((option: ITtemFilter, index: number) => {
          const isSelected = isRadio
            ? option.value === value
            : !!value?.includes(option.value);
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleOnPress(option.value)}
              style={[
                styles.itemFilter,
                {
                  backgroundColor: isSelected
                    ? colors.brandMainPinkRed
                    : colors.white,
                },
              ]}
              key={index}>
              {isSelected ? <SvgCheckedCircle /> : <SvgCheckCircle />}
              <View style={{marginLeft: scaler(8)}}>
                {!!option.icon && option.icon}
              </View>
              <Text
                style={[
                  styles.textItemFilter,
                  {
                    color: isSelected ? colors.white : colors.textColor,
                  },
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const isFiltered = (values: {
  Trimester: number | null;
  Mood: never[];
  Topics: never[];
}) => {
  return (
    values.Trimester !== null ||
    values.Mood.length !== 0 ||
    values.Topics.length !== 0
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'transparent',
    // flexDirection: 'row',
  },
  viewOut: {
    // flex: 1,
    backgroundColor: 'transparent',
  },
  containerViewModal: {
    backgroundColor: colors.white,
    paddingTop: scaler(50),
    paddingBottom: scaler(200),
    flex: 1,
  },
  containerItemModal: {
    paddingVertical: scaler(10),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: scaler(68),
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
    marginRight: scaler(12),
    marginBottom: scaler(12),
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
    // width: undefined,
    height: undefined,
    backgroundColor: colors.brandMainPinkRed,
    // backgroundColor: 'red',
    paddingVertical: scaler(14),
    paddingHorizontal: scaler(32),
    marginTop: scaler(20),
  },
});
