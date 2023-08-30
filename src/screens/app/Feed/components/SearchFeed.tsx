import {Header} from '@component';
import {SvgArrowLeft, SvgClose, SvgSearch} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useEvent,
  useHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {IStateSearchFeed} from '../type';
import useSearchFeed from '../useSearchFeed';
import ListSearchFeed from './ListSearchFeed';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
function usePageScrollHandler(handlers: any, dependencies: any[]) {
  const {context, doDependenciesDiffer} = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent(
    (event: any) => {
      'worklet';
      const {onPageScroll} = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

const SearchFeed = () => {
  const {t} = useTranslation();
  const pagerViewRef = useRef<PagerView>();
  const offset = useSharedValue(0);
  const {state, setState} = useSearchFeed();

  const onPageHandler = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    setState({currentIndex: currentPage});
  };
  const handleNextTab = (index: number) => () => {
    pagerViewRef.current?.setPage(index);
  };
  const pageScrollHandler = usePageScrollHandler(
    {
      onPageScroll: (e: any) => {
        'worklet';
        offset.value = e.position;
        console.log(e.offset, e.position);
      },
    },
    [],
  );
  const colorStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        offset.value,
        [0, 1, 2, 3],
        [colors.textColor, colors.red50, colors.red50, colors.red50],
      ),
    };
  }, []);
  const onRemoveText = () => {
    setState({keyword: ''});
  };
  return (
    <View style={styles.container}>
      <Header
        title={t('feed.search')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        styleContainer={{backgroundColor: colors.white}}
        styleContainerSafeArea={{backgroundColor: colors.white}}
      />

      <View style={styles.wrapTextInputContainer}>
        <View style={styles.wrapIconTextInput}>
          <SvgSearch color={'#CCD2E3'} />
        </View>
        <TextInput
          onChangeText={text => setState({keyword: text})}
          placeholder={t('feed.search') || ''}
          numberOfLines={1}
          value={state.keyword}
          selectionColor={colors.black}
          style={{width: '80%'}}
          autoFocus={true}
        />
        {!!state.keyword && (
          <TouchableOpacity
            onPress={onRemoveText}
            style={styles.wrapIconTextInput}>
            <SvgClose width={18} height={18} />
          </TouchableOpacity>
        )}
      </View>
      {/* <View style={styles.containerButtonTab}>
        <TouchableOpacity onPress={handleNextTab(0)} style={styles.buttonTab}>
          <Text
            style={
              state.currentIndex == 0 ? styles.focused : styles.notFocused
            }>
            All {state.dataAll.length ? `(${state.dataAll.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextTab(1)} style={styles.buttonTab}>
          <Text
            style={
              state.currentIndex == 1 ? styles.focused : styles.notFocused
            }>
            Video {state.dataVideo.length ? `(${state.dataVideo.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextTab(2)} style={styles.buttonTab}>
          <Text
            style={
              state.currentIndex == 2 ? styles.focused : styles.notFocused
            }>
            Podcast{' '}
            {state.dataPodcast.length ? `(${state.dataPodcast.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextTab(3)} style={styles.buttonTab}>
          <Text
            style={
              state.currentIndex == 3 ? styles.focused : styles.notFocused
            }>
            Articles{' '}
            {state.dataArticle.length ? `(${state.dataArticle.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View> */}
      <AnimatedPagerView
        initialPage={state.currentIndex}
        orientation={'horizontal'}
        style={[styles.container]}
        onPageSelected={onPageHandler}
        onPageScroll={pageScrollHandler}
        ref={pagerViewRef}>
        {['dataAll', 'dataVideo', 'dataPodcast', 'dataArticle']?.map(
          (item, index) => (
            <View style={styles.wrapContainer}>
              <ListSearchFeed
                data={state[item as keyof IStateSearchFeed]}
                refreshing={state.refreshing}
                onRefresh={() => {}}
              />
            </View>
          ),
        )}
      </AnimatedPagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  focused: {
    color: colors.red50,
    fontWeight: '600',
    fontSize: scaler(15),
  },
  notFocused: {
    color: colors.textColor,
    fontWeight: '400',
    fontSize: scaler(15),
  },
  containerButtonTab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  buttonTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: scaler(10),
    paddingHorizontal: scaler(15),
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapTextInputContainer: {
    marginHorizontal: scaler(16),
    height: scaler(50),
    backgroundColor: '#F5F5FF',
    borderRadius: scaler(16),
    paddingHorizontal: scaler(16),
    flexDirection: 'row',
    width: '91%',
    marginBottom: scaler(24),
  },
  wrapIconTextInput: {
    justifyContent: 'center',
    marginRight: scaler(16),
  },
  wrapContainer: {
    paddingHorizontal: scaler(16),
    marginBottom: scaler(16),
    marginTop: scaler(16),
    flex: 1,
  },
  title: {
    color: colors.black,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
  wrapRecentItem: {
    flexDirection: 'row',
    marginBottom: scaler(8),
    alignItems: 'center',
  },
  imageRecentAvatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: 99,
    marginRight: scaler(8),
  },
  recentItemTitle: {
    color: colors.black,
    fontSize: scaler(12),
    width: '90%',
    ...stylesCommon.fontWeight400,
  },
  wrapHotTopicItem: {
    flexDirection: 'row',
    marginBottom: scaler(4),
    alignItems: 'center',
  },
  imageHotTopicAvatar: {
    width: scaler(24),
    height: scaler(24),
    borderRadius: 99,
    marginRight: scaler(8),
  },
});

export default SearchFeed;
