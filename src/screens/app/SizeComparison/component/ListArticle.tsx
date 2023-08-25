/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';

import {HorizontalList, NewArticles} from '@component';
import {scaler} from '@stylesCommon';
import {IArticles} from '../../Home/types';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {getArticleByWeek, GlobalService} from '@services';

type Props = {
  // callBackData: () => void;
  week: number;
  cardBorderStyle?: any;
};

export const ListArticle = ({week}: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataArticle();
  }, [week]);

  const handlePressItemArticle = (article: IArticles) => {
    navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: article});
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
      title={t('home.weeklyArticles')}
      length={data?.length}
      styleHeader={{paddingHorizontal: scaler(20)}}
      contentContainerStyle={{marginBottom: 0}}
      onPressSeeMore={() => navigate(ROUTE_NAME.WEEKLY_ARTICLES)}>
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
