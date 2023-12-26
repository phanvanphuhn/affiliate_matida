import {scaler, widthScreen} from '@stylesCommon';
import React from 'react';
import {Animated, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {PaginationSlide} from './components';
import {SlideIntroHook} from './SlideIntro.hook';
import {styles} from './SlideIntro.style';

export const ITEM_WIDTH_SLIDE_INTRO = widthScreen;
export const SlideIntro = () => {
  const {
    refFlatList,
    scrollX,
    file,
    renderItem,
    handlePressSkip,
    opacityDashboard,
    heightDashboard,
    opacitySkip,
    heightSkip,
    t,
    // colorSkipText,
  } = SlideIntroHook();

  return (
    <View style={styles.container}>
      <FlatList
        ref={refFlatList}
        bounces={false}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH_SLIDE_INTRO,
          offset: ITEM_WIDTH_SLIDE_INTRO * index,
          index,
        })}
        // onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={[styles.scroll]}
        // contentContainerStyle={{flex: 1}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={file}
        pagingEnabled
        nestedScrollEnabled
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.viewPagination}>
        <PaginationSlide size={file.length} scrollX={scrollX} />
        <TouchableOpacity style={[styles.btnSkip]} onPress={handlePressSkip}>
          <Animated.View
            style={{
              position: 'absolute',
              top: scaler(10),
              right: scaler(30),
              opacity: opacitySkip,
              height: heightSkip,
            }}>
            <View>
              <Animated.Text style={[styles.textSkip]}>
                {t('slideIntro.skip')}
              </Animated.Text>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              opacity: opacityDashboard,
              height: heightDashboard,
            }}>
            <View>
              <Text style={[styles.textSkip]}>{t('slideIntro.dashboard')}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
