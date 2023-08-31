import {EContentType} from '@constant';
import {postContentViews} from '@services';
import {colors} from '@stylesCommon';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';

const getTimeNow = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

export const useContentViewFeed = (
  id: any,
  type: EContentType,
  isFocused: boolean,
) => {
  const start = useRef<string>(null);

  const handleContentView = async () => {
    try {
      await postContentViews({
        content_id: id,
        content_type: type,
        start_time: start.current,
        end_time: getTimeNow(),
      });
      start.current = null;
    } catch (e) {
      start.current = null;
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      start.current = getTimeNow();
    }
    return () => {
      if (isFocused) {
        handleContentView();
      }
    };
  }, [isFocused]);
};
