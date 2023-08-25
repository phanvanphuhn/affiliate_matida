import {ETopicFeedBack} from '@constant';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {TopicComponentProps} from '../Onboarding.props';

export const TopicComponent = ({data}: TopicComponentProps) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {value: valueTopic, setValue: setValueTopic} = getUseField('topic');
  const {value: valueOther, setValue: setValueOther} = getUseField('other');

  const handleOnPress = (itemValue: ETopicFeedBack) => {
    // if (valueTopic?.includes(itemValue)) {
    //   setValueTopic(valueTopic.filter((x: number) => +x !== +itemValue));
    // } else {
    //   setValueTopic([...valueTopic, itemValue]);
    // }
    setValueTopic([itemValue]);
  };

  return (
    <View>
      <View style={styles.container}>
        {data?.answers?.length > 0
          ? data?.answers?.map((item: any, index: number) => {
              const isSelected = !!valueTopic?.includes(item?.id);
              return (
                <View
                  key={item.id}
                  style={[
                    styles.viewButton,
                    {
                      paddingLeft: index % 2 === 0 ? 0 : scaler(8),
                      paddingRight: index % 2 === 0 ? scaler(8) : 0,
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.button,
                      isSelected && {
                        backgroundColor: colors.white,
                      },
                    ]}
                    onPress={() => handleOnPress(item?.id)}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.label,
                        isSelected && {color: colors.red150},
                      ]}>
                      {lang === 2 ? item?.answer_vi : item?.answer_en}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </View>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          multiline
          maxLength={1000}
          value={valueOther}
          placeholder={t('feedback.topic.placeholder') as string}
          onChangeText={(text: string) => setValueOther(text)}
          placeholderTextColor={`${colors.white}80`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewButton: {
    width: '50%',
    marginBottom: scaler(16),
  },
  button: {
    minHeight: scaler(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red150,
    borderRadius: scaler(8),
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(9),
  },
  label: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    textAlign: 'center',
    lineHeight: scaler(17),
  },
  viewInput: {
    paddingVertical: Platform.OS == 'ios' ? scaler(12) : 0,
    paddingHorizontal: scaler(9),
    borderRadius: scaler(8),
    backgroundColor: colors.red150,
    minHeight: scaler(50),
    maxHeight: scaler(120),
  },
  input: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.white,
    minHeight: scaler(26),
  },
});
