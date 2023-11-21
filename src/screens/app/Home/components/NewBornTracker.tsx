import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Touchable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheetNewBorn from './BottomSheetNewBorn';
import {goBack, navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import BottomSheetModal from '@component/BottomSheetModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {colors, scaler} from '@stylesCommon';
import {
  SvgArrowBackLogin,
  SvgArrowLeft,
  SvgCaretDown,
  iconArrowLeft,
  iconChevronDown,
  newBornBaby,
} from '@images';
import ListMonth from './ListMonth';
import useDetailPost from '../../Forum/components/useDetailPost';
import _ from 'lodash';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {tagsStyles} from '../../DetailArticle/settingHTML';
import {RootState} from 'src/redux/rootReducer';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

type TData = {
  index: number;
  label: String;
  content: String;
};

type TProps = {
  route: any;
};

const NewBornTracker = (props: TProps) => {
  const {route} = props;
  const {params} = route;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const newBorn = useSelector((state: RootState) => state.newBorn.list);

  const selectedNewBorn = newBorn.filter(item => item.selected == true);
  const filter = params?.state?.filter;
  const dataFilter = _.get(params?.state.data, filter);
  const dataFull = dataFilter?.contents?.filter(
    (item: any) => item.style == 'full',
  );
  const dataCollapsible = dataFilter?.contents?.filter(
    (item: any) => item.style == 'collapsible',
  );

  const [expandContent, setExpandContent] = useState([]);

  const bottomSheetRef = useRef<BottomSheet>();

  const snapPoints = useMemo(() => ['20%', '50%'], []);

  const handleScheduleOrderSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.collapse();
  }, []);

  const openNewBorn = useCallback(() => {
    handleScheduleOrderSheetChanges(0);
  }, []);

  const handleCloseScheduleOrderBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const onNavigateAddBaby = () => {
    handleCloseScheduleOrderBottomSheet();
    navigate(ROUTE_NAME.ADD_BABY);
  };

  const onNavigateDetailNewBorn = () => {
    handleCloseScheduleOrderBottomSheet();
    // navigate(ROUTE_NAME.DETAIL_NEW_BORN);
  };

  const setShowContent = (item: any) => {
    let isShowContent = [expandContent];
    if (expandContent?.includes(item.title)) {
      isShowContent.splice(expandContent.indexOf(item.title), 1);
    } else {
      isShowContent.push(item.title);
    }
    setExpandContent(isShowContent);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width: '20%'}} onPress={() => goBack()}>
            <SvgArrowLeft stroke={colors.black} size={24} />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: scaler(16), fontWeight: '500'}}>
              {t('newBorn.tracker')}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{flexDirection: 'row', width: '20%'}}
            onPress={openNewBorn}>
            <Text style={{marginRight: scaler(4)}} numberOfLines={1}>
              {selectedNewBorn[0]?.name || 'Baby 1'}
            </Text>
            <SvgCaretDown stroke={colors.black} />
          </TouchableOpacity> */}
          <View style={{width: '20%'}} />
        </View>
        <View style={{paddingHorizontal: scaler(16)}}>
          <ListMonth state={params?.state} setState={params?.setState} />
        </View>

        <ScrollView style={styles.bodyContainer}>
          <FastImage
            source={newBornBaby}
            style={{
              width: '100%',
              height: scaler(293),
            }}
            resizeMode="contain"
          />
          <View style={styles.wrapHighlightContainer}>
            <Text
              style={{
                fontSize: scaler(16),
                fontWeight: '600',
                color: colors.white,
              }}>
              Highlights of the month
            </Text>
          </View>
          <View style={styles.wrapContentContainer}>
            {dataCollapsible?.map((item: any) => {
              return (
                <View
                  style={[
                    {
                      marginBottom: scaler(16),
                    },
                    item.index == dataCollapsible.length
                      ? {}
                      : {
                          borderBottomColor: colors.borderColor,
                          borderBottomWidth: 0.5,
                          paddingBottom: scaler(16),
                        },
                  ]}>
                  <TouchableOpacity
                    onPress={() => setShowContent(item)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.label}>{item.title}</Text>

                    <Image
                      source={iconChevronDown}
                      style={{
                        height: scaler(24),
                        width: scaler(24),
                      }}
                    />
                  </TouchableOpacity>

                  {expandContent?.includes(item.title) && (
                    <TouchableWithoutFeedback>
                      <View>
                        <RenderHtml
                          contentWidth={100}
                          source={{
                            html: `<div>${item.description}</div>`,
                          }}
                          // baseStyle={styles.description}
                          enableExperimentalMarginCollapsing={true}
                          enableExperimentalBRCollapsing={true}
                          enableExperimentalGhostLinesPrevention={true}
                          tagsStyles={{...tagsStyles}}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
              );
            })}
          </View>
          <View style={{paddingHorizontal: scaler(16)}}>
            {dataFull?.map((item: any) => {
              return (
                <View
                  style={[
                    styles.wrapTipContainer,
                    item.index == dataFull.length
                      ? {marginBottom: scaler(32)}
                      : {
                          borderBottomColor: colors.borderColor,
                          borderBottomWidth: 0.5,
                          paddingBottom: scaler(16),
                        },
                  ]}>
                  <Text style={styles.label}>{item.title}</Text>

                  <TouchableWithoutFeedback>
                    <View>
                      <RenderHtml
                        contentWidth={100}
                        source={{
                          html: `<div>${item.description}</div>`,
                        }}
                        // baseStyle={styles.description}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalBRCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        tagsStyles={{...tagsStyles}}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleScheduleOrderSheetChanges}
          animateOnMount={false}
          onClose={handleCloseScheduleOrderBottomSheet}
          enablePanDownToClose={true}>
          <BottomSheetNewBorn
            onPress={onNavigateAddBaby}
            onNavigateDetailNewBorn={onNavigateDetailNewBorn}
          />
        </BottomSheetModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaler(8),
    padding: scaler(16),
  },
  bodyContainer: {
    flex: 1,
    borderTopColor: colors.borderColor,
    borderTopWidth: 0.25,
    marginTop: scaler(16),
  },
  wrapHighlightContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    width: '100%',
    backgroundColor: colors.primary,
  },
  wrapContentContainer: {
    paddingHorizontal: scaler(16),
    paddingTop: scaler(16),
    backgroundColor: colors.gray350,
  },
  label: {
    fontSize: scaler(16),
    fontWeight: '600',
    color: colors.black,
    flex: 1,
  },
  content: {
    fontSize: scaler(14),
    fontWeight: '400',
  },
  wrapTipContainer: {
    paddingBottom: scaler(16),
    paddingTop: scaler(24),
  },
});

export default NewBornTracker;
