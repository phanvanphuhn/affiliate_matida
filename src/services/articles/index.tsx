/* eslint-disable @typescript-eslint/no-unused-vars */
import {EContentType} from '@constant';
import api from '../api';

const GET_ARTICLES_POPULAR = 'articles/popular';
const ARTICLES_RELATED = 'articles/related';
const SAVE_ARTICLES = 'user/save-article';
const UN_SAVE_ARTICLES = 'user/unsave-article';
const ARTICLES = 'articles';
const CHECKUPS = 'checkups';
const ARTICLES_MOST_POPULAR = 'articles/most-popular';
const CONTENT_VIEWS = 'content-views';
const GET_ARTICLE_BY_WEEK = 'articles/week';

export const getListArticles: any = async (data: any) => {
  const {page, size, search, sort, topic = [], mood = [], week = 'null'} = data;
  const response = await api.get(
    `${ARTICLES}?size=${size}&page=${page}&keyword=${search}`,
  );
  return response;
};

export const getListArticlesFilter: any = async (data: any) => {
  const {
    page,
    size,
    search,
    sort,
    topic = [],
    mood = [],
    trimester = null,
  } = data;
  const url = !trimester
    ? `${ARTICLES}?size=${size}&page=${page}&payload={"topic":[${topic}],"mood":[${mood}]}&keyword=${search}`
    : `${ARTICLES}?size=${size}&page=${page}&payload={"topic":[${topic}],"mood":[${mood}],"trimester":${trimester}}&keyword=${search}`;
  const response = await api.get(url);
  return response;
};

export const getListArticlesOfWeek: any = async (data: any) => {
  const response = await api.get(
    `${ARTICLES}?size=10&page=1&payload={"week":${data}}`,
  );
  return response;
};

export const getListArticlesRelated: any = async (data: any) => {
  const response = await api.get(
    `${ARTICLES_RELATED}?size=10&page=1&articleId=${data}`,
  );
  return response;
};

export const getListArticlesPopular: any = async (data: any) => {
  const response = await api.get(
    `${GET_ARTICLES_POPULAR}?size=${data.size}&week=${data.week}`,
  );
  return response;
};

export const getListSaveArticleOfWeek: any = async (page: any) => {
  const response = await api.get(`${SAVE_ARTICLES}?page=${page}&limit=10`);
  return response;
};

export const postSaveArticles: any = async (id: number) => {
  const response = await api.post(`${SAVE_ARTICLES}/${id}`);
  return response;
};

export const postUnSaveArticles: any = async (id: number) => {
  const response = await api.post(`${UN_SAVE_ARTICLES}/${id}`);
  return response;
};

export const getArticleDetail: any = async (id: number) => {
  const response = await api.get(`${ARTICLES}/${id}`);
  return response;
};

export const getCheckupsDetail: any = async (id: number) => {
  const response = await api.get(`${CHECKUPS}/${id}`);
  return response;
};

export const getArticleByWeek: any = async (week: number) => {
  const response = await api.get(`${GET_ARTICLE_BY_WEEK}/${week}`);
  return response;
};

export const getArticleMost: any = async (
  page: number,
  trimester: number[],
  topic: number[],
  recent: boolean = false,
) => {
  const link = recent
    ? `${ARTICLES}?size=10&page=${page}&sort=1&payload={"trimester":[${trimester}],"topic":[${topic}]}`
    : `${ARTICLES_MOST_POPULAR}?page=${page}&size=10&trimester=[${trimester}]&topic=[${topic}]`;
  const response = await api.get(link);
  return response;
};

export const postContentViews: any = async (data: {
  content_id: any;
  content_type: EContentType;
  start_time: string;
  end_time: string;
}) => {
  const response = await api.post(CONTENT_VIEWS, data);
  return response;
};
