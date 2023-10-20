import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, scaler} from '@stylesCommon';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';

const ContentDeal = props => {
  const {data} = props;
  const {t} = useTranslation();

  const onPressGetDeal = () => {
    Clipboard.setString('123');
    showMessage({
      message: t('articles.successShare'),
      type: 'default',
      backgroundColor: colors.success_message,
      color: '#FFFFFF',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.wrapSubTitle}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVSkmNOQ6abMCc5e6R2r7VwRZDkBHFTyzAg&usqp=CAU',
          }}
          style={{
            width: scaler(16),
            height: scaler(16),
            borderRadius: 99,
            marginRight: scaler(4),
          }}
        />
        <Text style={{color: colors.textSmallColor}}>
          {t('deal.by')}{' '}
          <Text style={{color: colors.success_message}}>{data.author}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onPressGetDeal}>
        <Text style={styles.buttonTitle}>Get deal</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam alias
        consectetur reprehenderit quo quae accusamus voluptatibus maiores
        laborum dicta. Quis, consequuntur. Eaque error neque, facere
        reprehenderit ullam dolores iusto repudiandae!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginTop: scaler(16),
  },
  wrapSubTitle: {
    flexDirection: 'row',
    paddingTop: scaler(4),
    paddingBottom: scaler(4),
    marginTop: scaler(16),
  },
  wrapButtonContainer: {
    width: scaler(98),
    height: scaler(40),
    backgroundColor: colors.brandMainPinkRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
    marginTop: scaler(8),
    marginBottom: scaler(4),
  },
  buttonTitle: {
    fontSize: scaler(14),
    color: colors.white,
    fontWeight: '500',
  },
  description: {
    fontSize: scaler(14),
    color: colors.black,
    marginTop: scaler(8),
  },
});

export default ContentDeal;
