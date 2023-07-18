import {EContentType} from '@constant';
import {postContentViews} from '@services';
import {colors} from '@stylesCommon';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';

const getTimeNow = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

export const useContentView = (id: any, type: EContentType) => {
  const start = useRef<string>(getTimeNow());

  const handleContentView = async () => {
    try {
      await postContentViews({
        content_id: id,
        content_type: type,
        start_time: start.current,
        end_time: getTimeNow(),
      });
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  useEffect(() => {
    start.current = getTimeNow();
    return () => {
      handleContentView();
    };
  }, []);
};
