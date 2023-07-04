import {useNavigation} from '@react-navigation/native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Item} from './Item';

const ViewRoomCall = React.memo((props: any) => {
  const navigation = useNavigation<any>();
  const {data, reloadData, title} = props;

  const [seeMore, setSeeMore] = useState<any>(false);
  const {t} = useTranslation();

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
            {seeMore === true ? (
              <View style={styles.viewHorizontal}>
                {data?.map((item: any, index: any) => {
                  return (
                    <Item
                      item={item}
                      key={item?.id}
                      index={index}
                      callBackDataSave={reloadData}
                      data={data}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={styles.viewHorizontal}>
                {[{...data[0]}]?.map((item: any, index: any) => {
                  return (
                    <Item
                      item={item}
                      key={item?.id}
                      index={index}
                      callBackDataSave={reloadData}
                      data={data}
                    />
                  );
                })}
              </View>
            )}
            {data?.length > 1 ? (
              <View style={styles.viewTxtCenter}>
                <Text
                  style={styles.txtSeeMore}
                  onPress={() => {
                    setSeeMore(!seeMore);
                  }}>
                  {seeMore === true
                    ? t('allRoomMetting.compact')
                    : t('home.seeMore')}
                </Text>
              </View>
            ) : null}
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
});

export {ViewRoomCall};
