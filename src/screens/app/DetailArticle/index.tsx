/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  event,
  eventType,
  trackingAppEvent,
  useContentView,
  useUXCam,
} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {
  AppControlSound,
  HorizontalList,
  IModalShare,
  ModalShareComponent,
  NewArticles,
  TopicComponent,
  ViewPayment,
  ViewSmallQuiz,
} from '@component';
import {EContentType, EPaymentType, TypeDeepLink} from '@constant';
import {SvgIconApp} from '@images';
import {payArticleExplore, payArticleHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  getArticleDetail,
  getListArticlesRelated,
  GlobalService,
  postSaveArticles,
  postUnSaveArticles,
} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {t} from 'i18next';
import {useDispatch} from 'react-redux';
import {IArticles} from '../Home/types';
import {
  BannerDetailArticle,
  HeaderDetailArticle,
  MoodComponent,
  ViewUser,
} from './components';
import {systemFonts, tagsStyles} from './settingHTML';

export const DetailArticle = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const {article, idArticle} = route?.params;
  // const {id, isTimeline = false} = article;
  const id = article?.id ?? idArticle;
  const isTimeline = article?.isTimeline;
  const [listRelated, setListRelated] = useState<any[]>([]);
  const [articleDetail, setArticleDetail] = useState<any>(article);
  const [bookmark, setBookMark] = useState<boolean>(
    articleDetail?.is_saved === 1 ? true : false,
  );

  const [paused, setPaused] = useState(true);
  const source = {
    html: articleDetail?.content,
  };

  const isPayment = articleDetail?.is_payment && !articleDetail?.is_paid;

  const firstRef = useRef<boolean>(false);
  const refBookmark = useRef<boolean>(bookmark);
  const refShare = useRef<IModalShare>(null);

  useUXCam(ROUTE_NAME.DETAIL_ARTICLE);

  useContentView(id, EContentType.ARTICLE);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.DETAIL_ARTICLE, {}, eventType.AFF_FLYER);
    if (!isTimeline) {
      getArticlesDetail();
      getDataMoreArticles();
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onPressBookMark();
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [bookmark]);

  const onPressBookMark = () => {
    if (refBookmark.current !== bookmark) {
      bookmark ? handleSaveArticle() : handleUnSaveArticle();
    }
  };

  const getArticlesDetail = async () => {
    try {
      GlobalService.showLoading();
      const res = await getArticleDetail(id ? id : idArticle ?? 1);
      setArticleDetail(res?.data);
      setBookMark(res?.data?.is_saved === 1 ? true : false);
      refBookmark.current = res?.data?.is_saved === 1 ? true : false;
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
      firstRef.current = true;
    }
  };

  const handleSaveArticle = async () => {
    try {
      const res = await postSaveArticles(id);
      refBookmark.current = bookmark;
    } catch (error) {
      setBookMark(refBookmark.current);
    }
  };

  const handleUnSaveArticle = async () => {
    try {
      const res = await postUnSaveArticles(id);
      refBookmark.current = bookmark;
    } catch (error) {
      setBookMark(refBookmark.current);
    }
  };

  const getDataMoreArticles = async () => {
    try {
      GlobalService.showLoading();
      const res = await getListArticlesRelated(id ?? 1);
      setListRelated(res?.data?.data);
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handlePressItemArticle = (article: IArticles) => {
    navigation.push(ROUTE_NAME.DETAIL_ARTICLE, {article: article});
  };

  const scrollY = new Animated.Value(0);

  const onPay = async () => {
    dispatch(payArticleHome({id: +id ?? 1}));
    dispatch(payArticleExplore({id: +id ?? 1}));
    await getArticlesDetail();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          style={{
            paddingBottom: scaler(120),
          }}>
          <BannerDetailArticle
            image={articleDetail?.image}
            onPressBookMark={() => setBookMark(!bookmark)}
            onPressShare={() => refShare.current?.open()}
            bookmark={bookmark}
            isTimeline={isTimeline}
          />
          <View style={{paddingHorizontal: scaler(20)}}>
            <Text style={styles.textTitle}>{articleDetail?.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scaler(10),
              }}>
              <SvgIconApp />
              <Text style={styles.textTeam}>Matida Team</Text>
            </View>
            {!isTimeline && (
              <>
                <View style={styles.viewTopic}>
                  <Text style={styles.textTopic}>
                    {`${t('articles.topic')}:`}
                  </Text>
                  {articleDetail?.topic.map((item: number, index: number) => {
                    return <TopicComponent topic={item} key={index} />;
                  })}
                </View>

                <View style={styles.viewTopic}>
                  <Text style={styles.textTopic}>{`${t(
                    'articles.mood',
                  )}:`}</Text>
                  {articleDetail?.mood.map((item: number, index: number) => {
                    return <MoodComponent mood={item} key={index} />;
                  })}
                </View>
              </>
            )}

            {articleDetail?.is_show === true ? (
              <ViewUser data={articleDetail} />
            ) : null}

            {!isTimeline && !!articleDetail?.podcast && (
              <AppControlSound
                podcast={articleDetail?.podcast}
                paused={paused}
                setPaused={setPaused}
                title={`${t('articles.listen')}`}
                titleTracker={articleDetail?.title}
              />
            )}
            <RenderHtml
              contentWidth={widthScreen}
              systemFonts={systemFonts}
              tagsStyles={{...tagsStyles}}
              source={source}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
            />

            {!isTimeline && listRelated?.length !== 0 ? (
              <>
                <View style={styles.line} />

                <ViewSmallQuiz />

                <HorizontalList
                  title={t('articles.moreArticles')}
                  style={{marginBottom: scaler(30)}}
                  contentContainerStyle={{paddingLeft: 0}}
                  textSee={''}>
                  {listRelated.map(item => (
                    <NewArticles
                      article={item}
                      onPress={handlePressItemArticle}
                      key={item.id}
                    />
                  ))}
                </HorizontalList>
              </>
            ) : (
              <View style={{marginTop: scaler(30)}} />
            )}
          </View>
        </ScrollView>
        {isPayment ? (
          <ViewPayment
            isPay={isPayment}
            type={EPaymentType.ARTICLE}
            id={articleDetail?.id}
            onCallBack={onPay}
            flex
            price={articleDetail?.price_vn}
          />
        ) : (
          <HeaderDetailArticle
            scrollY={scrollY}
            bookmark={bookmark}
            onPressBookmark={() => setBookMark(!bookmark)}
            onPressShare={() => refShare.current?.open()}
            onPressPodcast={() => setPaused(!paused)}
            paused={paused}
            podcast={!!articleDetail?.podcast}
            isTimeline={isTimeline}
          />
        )}
      </View>
      <ModalShareComponent
        typeShare={TypeDeepLink.ARTICLE}
        ref={refShare}
        id={id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewLoading: {
    width: scaler(42),
    height: scaler(42),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textTitle: {
    marginTop: scaler(14),
    marginBottom: scaler(14),
    ...stylesCommon.fontWeight600,
    fontSize: scaler(24),
    color: colors.textColor,
  },
  textTeam: {
    marginLeft: scaler(8),
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.textColor,
  },
  viewTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  textTopic: {
    ...stylesCommon.fontWeight400,
    marginLeft: scaler(2),
    fontSize: scaler(12),
    color: colors.borderColor,
    marginRight: scaler(8),
  },

  line: {
    borderTopWidth: scaler(1),
    borderColor: '#D3D3D3',
    marginBottom: scaler(30),
    marginTop: scaler(30),
  },
});
