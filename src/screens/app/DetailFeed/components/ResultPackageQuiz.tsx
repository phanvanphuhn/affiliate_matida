import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {IAnswersPackage, IDataListFeed} from '../../Feed/type';
import {ic_gemstone, SvgReward, SvgTrimester1, SvgVerify} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {ViewLoading} from '../../MomTest/MomPrepTest/components';
import {
  AnswerList,
  ButtonComponent,
  HeaderComponent,
  YourResult,
  YourReward,
} from '../../MomTest/TestResult/components';
import {event, trackingAppEvent} from '@util';
import {getAllAnswerById} from '@services';
import {EPreRoute} from '@constant';
import {navigate, NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {useTranslation} from 'react-i18next';

interface ResultPackageQuizProps {
  item: IDataListFeed;
}

const ResultPackageQuiz = (props: ResultPackageQuizProps) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const {t} = useTranslation();

  useEffect(() => {
    getData();
    trackingAppEvent(event.SCREEN.TEST_RESULT, {});
  }, []);

  const getData = async () => {
    try {
      const res = await getAllAnswerById(props?.item?.contentid);
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

  const onReTest = () => {
    trackingAppEvent(event.MOM_TEST.START, {content: props.item});
    navigate(ROUTE_NAME.TEST_DETAIL, {
      quiz: props.item,
    });
  };
  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={onReTest} style={styles.buttonReDoTest}>
        <Text style={styles.textReDoTest}>{t('test.redoTest')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultPackageQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.white,
    width: widthScreen,
  },
  contentContainerStyle: {
    // paddingHorizontal: scaler(16),
    backgroundColor: colors.white,
  },
  buttonReDoTest: {
    backgroundColor: colors.red50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(15),
    borderRadius: scaler(8),
    marginVertical: scaler(10),
    marginHorizontal: scaler(20),
  },
  textReDoTest: {
    fontSize: scaler(14),
    fontWeight: '600',
    color: colors.white,
  },
});
