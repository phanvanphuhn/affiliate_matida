/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ViewBackgroundText} from './ViewBackgroundText';

const url =
  'https://baotramblog.com/wp-content/uploads/2022/03/hanh-trinh-mang-thai-hoc-lam-me.jpg?is-pending-load=1';

const Size = React.memo((props: any) => {
  const {data, week} = props;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const navigation = useNavigation();

  return (
    <FlatList
      data={[1]}
      scrollEnabled={false}
      renderItem={() => {
        return (
          <View style={styles.container}>
            <View style={styles.viewRow}>
              <Text style={styles.txtHeader}>
                {`${data?.title} `}
                <Text style={styles.txtHeader2}>
                  {lang === 2 ? data?.name_vn : data?.name_en}
                </Text>
              </Text>
            </View>
            <ViewBackgroundText title={data?.baby_size} />
            {/* <Text style={styles.txtContent}>{data?.content}</Text> */}
            <View style={{marginTop: scaler(12)}}>
              {/* <RenderHtml
                contentWidth={widthScreen}
                systemFonts={systemFonts}
                tagsStyles={{...tagsStyles}}
                source={{html: data?.content}}
                enableExperimentalMarginCollapsing={true}
                enableExperimentalBRCollapsing={true}
                enableExperimentalGhostLinesPrevention={true}
              /> */}
              <Text style={styles.txtContent}>{data?.content}</Text>
            </View>
            {/* <ViewProgress
              title={data?.remaining_week}
              content={t('sizeComparison.titleProgress')}
              width={(week / (data?.remaining_week + week)) * 100}
            /> */}
            {/* <Footer week={week} title={data?.remaining_week} /> */}
          </View>
        );
      }}
      // ListHeaderComponent={() => {
      //   return (
      //     <View style={styles.containerSwipe}>
      //       <Swiper dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      //         {data?.image?.length > 0 &&
      //           data?.image?.map((item: any, index: any) => {
      //             return (
      //               <AppImage uri={item} style={styles.image} key={index} />
      //             );
      //           })}
      //       </Swiper>
      //     </View>
      //   );
      // }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(20),
    paddingBottom: scaler(30),
  },
  containerSwipe: {
    height: widthScreen - scaler(20),
    paddingHorizontal: scaler(20),
  },
  image: {
    width: widthScreen - scaler(40),
    height: widthScreen - scaler(40),
    borderRadius: scaler(32),
  },
  viewImage: {
    width: widthScreen - scaler(40),
    height: widthScreen - scaler(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  txtHeader: {
    fontSize: scaler(22),
    ...stylesCommon.fontWeight600,
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    lineHeight: scaler(21),
    color: '#515151',
    marginTop: scaler(12),
  },
  txtHeader2: {
    fontSize: scaler(22),
    ...stylesCommon.fontWeight600,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  viewLoading: {
    width: scaler(80),
    height: scaler(80),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: scaler(6),
    height: scaler(6),
    borderRadius: scaler(6) / 2,
    backgroundColor: '#F6C4C4',
  },
  activeDot: {
    width: scaler(32),
    height: scaler(6),
    borderRadius: scaler(20),
    backgroundColor: colors.primary,
  },
});

export {Size};
