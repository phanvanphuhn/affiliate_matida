import {SvgIconBaby, SvgIconMom, SvgIconPear} from '@images';
import {scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';
import {GlobalService} from '@services';

interface IProps {
  onChangeState: (value: any) => void;
  style?: StyleProp<ViewStyle>;
  data?: any;
  option: number | undefined;
}

const url =
  'https://baotramblog.com/wp-content/uploads/2022/03/hanh-trinh-mang-thai-hoc-lam-me.jpg?is-pending-load=1';
const WIDTH_ITEM = widthScreen / 3;
const HEIGHT_CAROUSEL = 120;

// const ViewButton = React.memo((props: IProps) => {
//   const {onChangeState, style, data, option} = props;
//   const [stateButton, setStateButton] = useState<any>(option || 2);
//   const pick = useRef(option || 2);

//   const {t} = useTranslation();
//   const refCarousel = useRef<Carousel<any>>(null);

//   const entries = [
//     {
//       title: t('home.sizeComparison.babySize'),
//       icon: <SvgIconPear size={72} />,
//       value: 1,
//     },
//     {
//       title: t('home.sizeComparison.embryo'),
//       icon: <SvgIconBaby size={72} />,
//       value: 2,
//     },
//     {
//       title: t('home.sizeComparison.mom'),
//       icon: <SvgIconMom size={72} />,
//       value: 3,
//     },
//   ];

//   const Button = (props: any) => {
//     const {title, customStyle, customStyleTxt, onClick, icon, style, value} =
//       props;
//     const animatedIsFocused = React.useRef(
//       new Animated.Value(stateButton !== value ? 1 : 0),
//     );

//     useEffect(() => {
//       Animated.timing(animatedIsFocused.current, {
//         toValue: stateButton !== value ? 1 : 0,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     }, [stateButton]);

//     const scalerView = animatedIsFocused.current.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 0.8],
//     });
//     const opacity = animatedIsFocused.current.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 0.5],
//     });

//     return (
//       <TouchableOpacity onPress={onClick} activeOpacity={1} style={{flex: 1}}>
//         <Animated.View
//           style={[
//             styles.button,
//             style,
//             {transform: [{scale: scalerView}], opacity: opacity},
//           ]}>
//           <View style={customStyle}>{icon}</View>
//           <Text style={customStyleTxt}>{title}</Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   // const onClick = (value: any) => {
//   //   if (value - stateButton === -1 || value - stateButton === 2) {
//   //     refCarousel?.current?.snapToPrev();
//   //   } else if (value - stateButton === 1 || value - stateButton === -2) {
//   //     refCarousel?.current?.snapToNext();
//   //   }
//   // };

//   const onScroll = (value: number) => {
//     setStateButton(value);
//     onChangeState(value);
//   };

//   const handlePanResponderRelease = (
//     event: GestureResponderEvent,
//     gestureState: PanResponderGestureState,
//   ) => {
//     const {dx} = gestureState;
//     if (dx > 100 && pick.current > 1) {
//       pick.current = pick.current - 1;
//       // setStateButton(pick.current);
//       onScroll(pick.current);
//     } else if (dx < -100 && pick.current < 3) {
//       pick.current = pick.current + 1;
//       // setStateButton(pick.current);
//       onScroll(pick.current);
//     }
//   };

//   const handlePanResponderMove = () => {};

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: handlePanResponderMove,
//       onPanResponderRelease: handlePanResponderRelease,
//     }),
//   ).current;

//   return (
//     <View
//       style={{height: HEIGHT_CAROUSEL, flexDirection: 'row'}}
//       {...panResponder.panHandlers}>
//       {/* <Carousel
//         ref={refCarousel}
//         data={entries}
//         renderItem={({item}) => (
//           <Button
//             title={item.title}
//             customStyle={{}}
//             customStyleTxt={styles.txtAT}
//             onClick={() => onClick(item.value)}
//             icon={item.icon}
//           />
//         )}
//         sliderWidth={widthScreen}
//         itemWidth={itemWidth}
//         inactiveSlideOpacity={0.5}
//         inactiveSlideScale={0.67}
//         loop
//         initialScrollIndex={stateButton - 1}
//         onSnapToItem={index => onScroll(index + 1)}
//         getItemLayout={(data, index) => ({
//           length: itemWidth,
//           offset: itemWidth * index,
//           index,
//         })}
//         firstItem={stateButton - 1}
//         itemHeight={HEIGHT_CAROUSEL}
//         sliderHeight={HEIGHT_CAROUSEL}
//         decelerationRate="fast"
//         // disableIntervalMomentum
//         pagingEnabled
//       /> */}
//       {entries.map((item, index) => {
//         return (
//           <Button
//             title={item.title}
//             customStyle={{}}
//             customStyleTxt={styles.txtAT}
//             onClick={() => onScroll(item.value)}
//             icon={item.icon}
//             style={{flex: 1}}
//             value={item.value}
//             key={index}
//           />
//         );
//       })}
//     </View>
//   );
// });

const ViewButton = React.memo((props: IProps) => {
  const {onChangeState, style, data, option} = props;
  const scrollIndex = (option ? option - 1 : 1) + 6 - 1;
  const [stateButton, setStateButton] = useState<any>(option ? option - 1 : 1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const {t} = useTranslation();
  const refAnimated = useRef(false);
  const entries = [
    {
      title: t('home.sizeComparison.babySize'),
      icon: <SvgIconPear size={72} />,
      value: 0,
    },
    {
      title: t('home.sizeComparison.embryo'),
      icon: <SvgIconBaby size={72} />,
      value: 1,
    },
    {
      title: t('home.sizeComparison.mom'),
      icon: <SvgIconMom size={72} />,
      value: 2,
    },
  ];

  const dataFlatList = [
    ...entries,
    ...entries,
    ...entries,
    ...entries,
    ...entries,
  ];

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: stateButton + 5,
        animated: false,
      });
      GlobalService.hideLoading();
    }, 500);
    onChangeState(stateButton + 1);
  }, [stateButton]);

  const Button = (props: any) => {
    const {
      title,
      customStyle,
      customStyleTxt,
      onClick,
      icon,
      style,
      value,
      index,
    } = props;
    const inputRange = [
      (index - 2) * WIDTH_ITEM,
      (index - 1) * WIDTH_ITEM,
      index * WIDTH_ITEM,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });

    const _scaler = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity onPress={onClick} activeOpacity={1}>
        <Animated.View
          style={[
            styles.button,
            style,
            {transform: [{scale: _scaler}], opacity: opacity},
          ]}>
          <View style={customStyle}>{icon}</View>
          <Text style={customStyleTxt}>{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const onScroll = (value: number, index: number) => {
    // GlobalService.showLoading();
    flatListRef.current?.scrollToIndex({
      index: index - 1,
      animated: true,
    });

    setStateButton(value);
    // onChangeState(value);
  };

  return (
    <View
      style={{
        height: HEIGHT_CAROUSEL,
        width: widthScreen,
      }}>
      <Animated.FlatList
        ref={flatListRef}
        data={dataFlatList}
        horizontal
        renderItem={({item, index}) => (
          <Button
            title={item.title}
            customStyle={{}}
            customStyleTxt={styles.txtAT}
            onClick={() => onScroll(item.value, index)}
            icon={item.icon}
            style={{width: WIDTH_ITEM}}
            value={item.value}
            index={index}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={WIDTH_ITEM}
        decelerationRate={0}
        snapToOffsets={dataFlatList.map(
          (_: any, index: number) => index * WIDTH_ITEM,
        )}
        snapToAlignment="center"
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={event => {
          const indexSelect = Math.round(
            event.nativeEvent.contentOffset.x / WIDTH_ITEM,
          );
          // GlobalService.showLoading();
          setStateButton((indexSelect + 1) % 3);
          // if (indexSelect > 7) {
          //   flatListRef.current?.scrollToIndex({
          //     index: ((indexSelect - 8) % 3) + 5,
          //     animated: false,
          //   });
          // } else if (indexSelect < 5) {
          //   flatListRef.current?.scrollToIndex({
          //     index: ((indexSelect + 1) % 3) + 5,
          //     animated: false,
          //   });
          // }
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: WIDTH_ITEM,
          offset: WIDTH_ITEM * index,
          index,
        })}
        initialScrollIndex={scrollIndex}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: scaler(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: scaler(39),
    // width: widthScreen,
  },
  image: {
    width: scaler(80),
    height: scaler(80),
    borderRadius: scaler(40),
    borderColor: '#ED8989',
    borderWidth: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT_CAROUSEL,
  },
  txtAT: {
    ...stylesCommon.fontWeight600,
    color: '#252525',
    fontSize: scaler(14),
    marginTop: 8,
    textAlign: 'center',
  },
  txtIAT: {
    ...stylesCommon.fontWeight600,
    color: '#A8A8A8',
    fontSize: scaler(14),
    marginTop: 8,
    textAlign: 'center',
  },
  viewLoading: {
    width: scaler(80),
    height: scaler(80),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {ViewButton};
