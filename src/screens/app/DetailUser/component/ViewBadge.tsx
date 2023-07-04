import {AppImage} from '@component';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const ViewBadge = React.memo((props: any) => {
  const {data, title} = props;
  const {t} = useTranslation();

  const lang = useSelector((state: any) => state.auth.lang);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.txtHeader}>
          {title} ({data?.length})
        </Text>
      </View>
      <>
        {data?.length > 0 ? (
          <>
            {data?.map((item: any) => {
              return (
                <View style={styles.viewItem} key={item?.id}>
                  <AppImage uri={item?.badge?.image} style={styles.icon} />
                  <View style={styles.viewContentItem}>
                    <Text style={styles.txtTitleItem}>
                      {lang === 1 ? item?.badge?.name_en : item?.badge?.name_vi}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <>
            <View style={styles.viewTxtCenter}>
              <Text style={styles.txtSeeMore}>{t('videoList.noData')}</Text>
            </View>
          </>
        )}
      </>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaler(17),
    marginTop: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaler(17),
    alignItems: 'center',
  },
  txtHeader: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
  },
  txtSeeMore: {
    color: colors.primary,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  viewHorizontal: {
    width: '100%',
  },
  viewTxtCenter: {
    width: '100%',
    alignItems: 'center',
  },
  viewItem: {
    width: '100%',
    padding: scaler(16),
    marginBottom: scaler(16),
    backgroundColor: '#F3F1FD',
    borderRadius: scaler(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scaler(40),
    height: scaler(40),
  },
  viewContentItem: {
    flex: 1,
    marginLeft: scaler(16),
  },
  txtTitleItem: {
    color: '#654AC9',
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
  },
  txtContentItem: {
    color: '#515151',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginTop: scaler(4),
  },
});

export {ViewBadge};
