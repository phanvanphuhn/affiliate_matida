import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Touchable,
  ScrollView,
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

type TData = {
  index: number;
  label: String;
  content: String;
};

const NewBornTracker = () => {
  const [state, setState] = useDetailPost({
    filter: 'w1',
    isShowContent: [],
  });

  const data: TData[] = [
    {
      index: 1,
      label: 'Sleep',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
    {
      index: 2,
      label: 'Eat',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
    {
      index: 3,
      label: 'Drink',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
    {
      index: 4,
      label: 'Activities',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
  ];

  const data1: TData[] = [
    {
      index: 1,
      label: 'Baby tips',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
    {
      index: 2,
      label: 'Postpartum tips',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, pariatur incidunt blanditiis tempore veritatis reiciendis doloribus est quos laborum harum repellendus, adipisci impedit quibusdam ratione nesciunt id animi maiores atque!',
    },
  ];

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
    navigate(ROUTE_NAME.DETAIL_NEW_BORN);
  };

  const setShowContent = (item: TData) => {
    let isShowContent = state.isShowContent;
    if (state.isShowContent?.includes(item.label)) {
      isShowContent.splice(state.isShowContent.indexOf(item.label), 1);
    } else {
      isShowContent.push(item.label);
    }
    setState({isShowContent: isShowContent});
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width: '15%'}} onPress={() => goBack()}>
            <SvgArrowLeft stroke={colors.black} size={24} />
          </TouchableOpacity>
          <View>
            <Text>Newborn tracker</Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', width: '15%'}}
            onPress={openNewBorn}>
            <Text style={{marginRight: scaler(4)}}>Bear</Text>
            <SvgCaretDown stroke={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: scaler(16)}}>
          <ListMonth state={state} setState={setState} />
        </View>

        <ScrollView style={styles.bodyContainer}>
          <Image
            source={newBornBaby}
            style={{
              width: '100%',
              height: scaler(293),
            }}
            resizeMode="center"
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
            {data.map((item: TData) => {
              return (
                <View
                  style={[
                    {
                      marginBottom: scaler(16),
                    },
                    item.index == data.length
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
                    <Text style={styles.label}>{item.label}</Text>

                    <Image
                      source={iconChevronDown}
                      style={{
                        height: scaler(24),
                        width: scaler(24),
                      }}
                    />
                  </TouchableOpacity>

                  {state.isShowContent?.includes(item.label) && (
                    <Text style={styles.content}>{item.content}</Text>
                  )}
                </View>
              );
            })}
          </View>
          <View style={{paddingHorizontal: scaler(16)}}>
            {data1.map((item: TData) => {
              return (
                <View
                  style={[
                    styles.wrapTipContainer,
                    item.index == data1.length
                      ? {marginBottom: scaler(32)}
                      : {
                          borderBottomColor: colors.borderColor,
                          borderBottomWidth: 0.5,
                          paddingBottom: scaler(16),
                        },
                  ]}>
                  <Text style={styles.label}>{item.label}</Text>

                  <Text style={styles.content}>{item.content}</Text>
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
  },
  content: {
    fontSize: scaler(14),
    fontWeight: '400',
  },
  wrapTipContainer: {
    paddingVertical: scaler(16),
  },
});

export default NewBornTracker;
