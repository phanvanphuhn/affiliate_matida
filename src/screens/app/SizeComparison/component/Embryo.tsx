/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppImage} from '@component';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';
const Embryo = React.memo((props: {data: any; week: any; listImage: any[]}) => {
  const {data, week, listImage} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();

  return (
    <FlatList
      data={[1]}
      renderItem={() => {
        return (
          <View style={styles.container}>
            <View style={styles.viewRow}>
              <Text style={styles.txtHeader}>{data?.title}</Text>
              {/* <Text style={styles.txtHeader2}>
                {lang === 2 ? data?.name_vn : data?.name_en}
              </Text> */}
              {/* <ViewBackgroundText title="0,5 inch" /> */}
            </View>
            {/* <Text style={styles.txtContent}>{data?.content}</Text> */}
            {/* <ViewProgress
              title={data?.remaining_week}
              content={t('sizeComparison.titleProgress')}
              width={(week / (data?.remaining_week + week)) * 100}
            /> */}
            {/* <Footer week={week} title={data?.remaining_week} /> */}
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
          </View>
        );
      }}
      ListHeaderComponent={() => {
        return (
          <View style={styles.containerSwipe}>
            <Swiper dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
              {listImage.length > 0 &&
                listImage.map((item: any, index: any) => {
                  return (
                    <AppImage uri={item} style={styles.image} key={index} />
                  );
                })}
            </Swiper>
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
  },
  txtHeader: {
    fontSize: scaler(24),
    ...stylesCommon.fontWeight500,
    color: '#AE5151',
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    lineHeight: scaler(21),
    color: '#515151',
    marginTop: scaler(12),
  },
  txtHeader2: {
    fontSize: scaler(24),
    ...stylesCommon.fontWeight500,
    color: '#AE5151',
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

export {Embryo};
