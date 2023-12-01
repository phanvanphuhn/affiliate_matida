import {EChatOption} from '@constant';
import {SvgSearch, SvgIconDelete} from '@images';
import {changeOption, getSearch} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  // onSearch: (value: string) => void;
  // search: string;
};

export const ListHeaderComponent = ({}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const option = useSelector((state: any) => state?.listChat?.option);
  const search = useSelector((state: any) => state?.listChat?.search);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  console.log('user: ', user);
  const [value, setValue] = useState<string>('');
  const refFirst = useRef<boolean>(false);
  const refInput = useRef<TextInput>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (refFirst.current) {
        // onSearch(value);
        dispatch(getSearch(value));
      } else {
        refFirst.current = true;
      }
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  // useEffect(() => {
  //   if(search !== value) {
  //     setValue();
  //   }
  // }, [search]);

  const handleFocus = () => {
    dispatch(changeOption(EChatOption.USER));
  };

  const handleCancel = () => {
    dispatch(changeOption(EChatOption.CHAT));
    refInput.current?.blur();
    setValue('');
  };

  return (
    <View style={styles.container}>
      {user?.role !== 1 && (
        <View style={[styles.viewInput]}>
          <SvgSearch />
          <TextInput
            ref={refInput}
            onChangeText={setValue}
            value={value}
            style={styles.inputSearch}
            placeholder={t('chat.search') as string}
            onFocus={handleFocus}
          />
          {value.length > 0 && (
            <TouchableOpacity onPress={() => setValue('')}>
              <SvgIconDelete />
            </TouchableOpacity>
          )}
        </View>
      )}
      {option === EChatOption.USER ? (
        <TouchableOpacity
          onPress={handleCancel}
          activeOpacity={0.9}
          style={{
            paddingRight: scaler(16),
            height: scaler(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...stylesCommon.fontWeight700,
              color: colors.primary,
              fontSize: scaler(14),
            }}>
            {t('chat.cancel')}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: scaler(8),
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
    marginHorizontal: scaler(16),
    flex: 1,
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  container: {
    paddingBottom: scaler(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
