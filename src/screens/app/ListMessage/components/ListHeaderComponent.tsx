import {SvgSearch, SvgIconDelete} from '@images';
import {colors, scaler} from '@stylesCommon';
import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  onSearch: (value: string) => void;
  search: string;
};

export const ListHeaderComponent = ({onSearch, search}: Props) => {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const refFirst = useRef<boolean>(false);

  useEffect(() => {
    if (value !== search) {
      setValue(search);
    }
  }, [search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (refFirst.current) {
        onSearch(value);
      } else {
        refFirst.current = true;
      }
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={[styles.viewInput, {backgroundColor: '#F6F6F6'}]}>
        <SvgSearch />
        <TextInput
          onChangeText={setValue}
          value={value}
          style={styles.inputSearch}
          placeholder={t('chat.search') as string}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => setValue('')}>
            <SvgIconDelete />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    marginHorizontal: scaler(16),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  container: {
    paddingBottom: scaler(12),
  },
});
