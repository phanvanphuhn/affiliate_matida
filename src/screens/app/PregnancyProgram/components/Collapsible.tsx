import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {ic_back_arrow} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import Hyperlink from 'react-native-hyperlink';

interface ColapsibleProps {
  title: string;
  content: string;
  color: string;
}

const Collapsible = (props: ColapsibleProps) => {
  const [isShowContent, setIsShowContent] = useState(false);
  const showContent = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIsShowContent(!isShowContent);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showContent}
        style={[
          styles.button,
          {backgroundColor: props.color},
          isShowContent
            ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
            : {},
        ]}>
        <Text style={styles.textTitle}>{props.title}</Text>
        <Image
          source={ic_back_arrow}
          style={{
            tintColor: colors.textColor,
            transform: [{rotate: isShowContent ? '90deg' : '-90deg'}],
          }}
        />
      </TouchableOpacity>
      {!!isShowContent && (
        <View style={styles.containerContent}>
          <Text style={styles.textContent}>{props.content}</Text>
        </View>
      )}
    </View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: colors.pink250,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaler(12),
    paddingHorizontal: scaler(15),
  },
  textTitle: {
    flex: 1,
    paddingRight: scaler(15),
    paddingVertical: scaler(15),
    fontSize: scaler(15),
    ...stylesCommon.fontSarabun600,
  },
  containerContent: {
    borderBottomLeftRadius: scaler(12),
    borderBottomRightRadius: scaler(12),
    borderColor: '#F0F1F5',
    borderWidth: 1,
    padding: scaler(15),
  },
  textContent: {
    fontSize: scaler(15),
    color: colors.labelColor,
    lineHeight: scaler(24),
    ...stylesCommon.fontSarabun400,
  },
});
