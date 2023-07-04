import {AppImage} from '@component';
import {isStockPhoto, SvgBookMark, SvgShare} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

interface PropsBannerDetailArticle {
  image: string | null;
  onPressBookMark: () => void;
  onPressShare: () => void;
  bookmark: boolean;
  isTimeline: boolean;
}

export const BannerDetailArticle = ({
  image,
  onPressBookMark,
  onPressShare,
  bookmark,
  isTimeline,
}: PropsBannerDetailArticle) => {
  const data = [
    {
      id: 1,
      label: t('articles.buttonSave'),
      icon: (
        <SvgBookMark
          fill={bookmark ? colors.white : 'none'}
          stroke={colors.white}
        />
      ),
      onPress: onPressBookMark,
    },
    {
      id: 2,
      label: t('articles.share'),
      icon: <SvgShare stroke={colors.white} />,
      onPress: onPressShare,
    },
  ];
  return (
    <View>
      {!!image ? (
        <AppImage style={styles.banner} uri={image} />
      ) : (
        <Image style={styles.banner} source={isStockPhoto} />
      )}
      {!isTimeline && (
        <View style={styles.viewOption}>
          {data.map(item => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={item.onPress}
              key={item.id}>
              {item.icon}
              <Text style={styles.textButton}>{item?.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: scaler(316),
    width: '100%',
    borderBottomLeftRadius: scaler(16),
    borderBottomRightRadius: scaler(16),
  },
  viewOption: {
    position: 'absolute',
    right: scaler(16),
    bottom: scaler(16),
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    borderRadius: scaler(4),
    alignItems: 'center',
    backgroundColor: '#00000050',
    marginLeft: scaler(8),
    padding: scaler(8),
  },
  textButton: {
    color: colors.white,
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
  },
});
