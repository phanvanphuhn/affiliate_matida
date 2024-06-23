/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {t} from 'i18next';
import React, {useEffect, useMemo, useState} from 'react';

import {HorizontalList, NewArticles} from '@component';
import {scaler} from '@stylesCommon';
import {IArticles} from '../../Home/types';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {getArticleByWeek, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import useCheckPregnancy from '../../../../util/hooks/useCheckPregnancy';
import {StyleProp, TextStyle} from 'react-native';
import {event, eventType, trackingAppEvent} from '@util';

type Props = {
  // callBackData: () => void;
  week: number;
  cardBorderStyle?: any;
  title?: string;
  styleTextTitle?: StyleProp<TextStyle>;
  mb?: number;
  styleTextSee?: StyleProp<TextStyle>;
};

export const ListArticle = ({
  week,
  title,
  styleTextTitle,
  mb,
  styleTextSee,
}: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const checkPlan = useCheckPregnancy();

  const isCheckPayment = useMemo(
    () => user?.user_subscriptions?.some(e => e.code == 'PP'),
    [user],
  );
  useEffect(() => {
    getDataArticle();
  }, [week]);

  const handlePressItemArticle = (article: IArticles) => {
    if (!isCheckPayment && article?.is_payment && !article?.is_paid) {
      checkPlan();
    } else {
      // navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: article});
      navigate(ROUTE_NAME.DETAIL_FEED, {
        id: article.id,
        content_type: 'article',
      });
    }
  };

  const getDataArticle = async () => {
    try {
      setLoading(true);
      GlobalService.showLoading();
      const res: any = await getArticleByWeek(week);
      setData(res?.data ?? []);
    } catch (error) {
    } finally {
      setLoading(false);
      GlobalService.hideLoading();
    }
  };

  return (
    <HorizontalList
      loading={loading}
      title={title ? title : t('home.weeklyArticles')}
      length={data?.length}
      styleHeader={{paddingHorizontal: scaler(20)}}
      contentContainerStyle={{marginBottom: 0}}
      styleTextTitle={styleTextTitle}
      styleTextSee={styleTextSee}
      mb={mb}
      onPressSeeMore={() => {
        trackingAppEvent(
          event.NEW_HOMEPAGE.content_widget_view_more,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        navigate(ROUTE_NAME.TAB_FEED);
      }}>
      {data?.map((article: IArticles) => (
        <NewArticles
          article={article}
          onPress={handlePressItemArticle}
          key={article.id}
        />
      ))}
    </HorizontalList>
  );
};
