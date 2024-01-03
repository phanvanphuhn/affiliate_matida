import {Header} from '@component';
import {EPreRoute} from '@constant';
import {SvgArrowLeft} from '@images';
import {NavigationUtils} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getAllAnswerById} from '@services';
import {colors} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ViewLoading} from '../MomPrepTest/components';
import {
  AnswerList,
  ButtonComponent,
  HeaderComponent,
  YourResult,
  YourReward,
} from './components';
import {styles} from './style';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';

export const TestResult = () => {
  const route = useRoute<any>();
  const {id, redoTest, preRoute} = route?.params ?? {
    id: 0,
    redoTest: () => {},
    preRoute: EPreRoute.TEST_DETAIL,
  };

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useUXCam(ROUTE_NAME.TEST_RESULT);

  useEffect(() => {
    getData();
    trackingAppEvent(event.SCREEN.TEST_RESULT, {}, eventType.AFF_FLYER);
  }, []);

  const getData = async () => {
    try {
      const res = await getAllAnswerById(id);
      setData(res?.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <AnswerList data={data?.data} />;
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <HeaderComponent />
        <YourResult total={data?.totalQuestions} userScore={data?.userScore} />
        {data?.isPassed ? <YourReward badge={data?.badge} /> : null}
      </>
    );
  };

  const handlePressBottomButton = () => {
    if (preRoute === EPreRoute.TEST_DETAIL) {
      NavigationUtils.pop(2);
    } else {
      NavigationUtils.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        onPressLeft={handlePressBottomButton}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ViewLoading />
        </View>
      ) : (
        <FlatList
          data={[1]}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <ButtonComponent
        isPassed={!!data?.isPassed}
        redoTest={redoTest}
        preRoute={preRoute}
        id={id}
      />
    </View>
  );
};
