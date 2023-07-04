import {Header} from '@component';
import {TYPE_LIST_TEST} from '@constant';
import {SvgArrowLeft} from '@images';
import {colors} from '@stylesCommon';
import React, {useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {HistoryRef, ListHistoryTest, ListPeriodicTest} from './components';
import {styles} from './style';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

export const MomPrepTest = () => {
  const {t} = useTranslation();

  const historyRef = useRef<HistoryRef>(null);

  const handleLoadMore = () => {
    historyRef.current?.onLoadMore();
  };

  const renderItem = ({item}: {item: TYPE_LIST_TEST}) => {
    switch (item) {
      case TYPE_LIST_TEST.PERIODIC:
        return <ListPeriodicTest />;
      case TYPE_LIST_TEST.HISTORY:
        return <ListHistoryTest ref={historyRef} />;
      default:
        return <></>;
    }
  };

  useUXCam(ROUTE_NAME.MOM_PREP_TEST);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.MOM_PREP_TEST, {});
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={t('test.momPrepTest')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <View style={styles.body}>
        <FlatList
          data={[TYPE_LIST_TEST.PERIODIC, TYPE_LIST_TEST.HISTORY]}
          renderItem={renderItem}
          keyExtractor={(_: any, index: number) => index.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
};
