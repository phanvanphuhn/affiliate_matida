import {
  slideIntro1,
  slideIntro2,
  slideIntro3,
  slideIntro4,
  slideIntro5,
  slideIntro5en,
  sliderIntroV21,
  sliderIntroV22,
  sliderIntroV23,
  sliderIntroV24,
  sliderIntroV25,
  sliderIntroV26,
  sliderIntroV27,
} from '@images';
import {changeStatusLogin} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import {useUXCam} from '@util';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ItemSlideIntro} from './components';
import {ITEM_WIDTH_SLIDE_INTRO} from './SlideIntro';
import {IFile} from './SlideIntro.props';

export const SlideIntroHook = () => {
  const scrollX = new Animated.Value(0);
  //   const [page, setPage] = useState<number>(1);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state?.auth?.lang);

  const refFlatList = useRef<FlatList>(null);

  useUXCam(ROUTE_NAME.SLIDE_INTRO);
  //   const indexRef = useRef<number>(1);
  const file: IFile[] = [
    {
      id: 1,
      source: sliderIntroV21,
      title: t('slideIntro.title.0'),
      textBody: t('slideIntro.textBody.0'),
    },
    {
      id: 2,
      source: sliderIntroV22,
      title: t('slideIntro.title.1'),
      textBody: t('slideIntro.textBody.1'),
    },
    {
      id: 3,
      source: sliderIntroV23,
      title: t('slideIntro.title.2'),
      textBody: t('slideIntro.textBody.2'),
    },
    {
      id: 4,
      source: sliderIntroV24,
      title: t('slideIntro.title.3'),
      textBody: t('slideIntro.textBody.3'),
    },
    {
      id: 5,
      source: sliderIntroV25,
      title: t('slideIntro.title.4'),
      textBody: t('slideIntro.textBody.4'),
    },
    {
      id: 6,
      source: sliderIntroV26,
      title: t('slideIntro.title.5'),
      textBody: t('slideIntro.textBody.5'),
    },
    {
      id: 7,
      source: sliderIntroV27,
      title: t('slideIntro.title.6'),
      textBody: t('slideIntro.textBody.6'),
    },
  ];

  //   const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //     const pageNumber = Math.min(
  //       Math.max(
  //         Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH_SLIDE_INTRO) + 1,
  //         0,
  //       ),
  //       file?.length,
  //     );
  //     setPage(pageNumber);
  //     indexRef.current = pageNumber;
  //   };

  const renderItem = ({item}: {item: IFile}) => {
    return <ItemSlideIntro item={item} />;
  };

  const opacityDashboard = scrollX.interpolate({
    inputRange: [
      ITEM_WIDTH_SLIDE_INTRO * 5,
      ITEM_WIDTH_SLIDE_INTRO * 6,
      ITEM_WIDTH_SLIDE_INTRO * 7,
    ],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const opacitySkip = scrollX.interpolate({
    inputRange: [
      ITEM_WIDTH_SLIDE_INTRO * 5,
      ITEM_WIDTH_SLIDE_INTRO * 6,
      ITEM_WIDTH_SLIDE_INTRO * 7,
    ],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  const heightDashboard = scrollX.interpolate({
    inputRange: [
      ITEM_WIDTH_SLIDE_INTRO * 5,
      ITEM_WIDTH_SLIDE_INTRO * 6,
      ITEM_WIDTH_SLIDE_INTRO * 7,
    ],
    outputRange: [0, scaler(28), 0],
    extrapolate: 'clamp',
  });
  const heightSkip = scrollX.interpolate({
    inputRange: [
      ITEM_WIDTH_SLIDE_INTRO * 5,
      ITEM_WIDTH_SLIDE_INTRO * 6,
      ITEM_WIDTH_SLIDE_INTRO * 7,
    ],
    outputRange: [scaler(28), 0, scaler(28)],
    extrapolate: 'clamp',
  });

  const colorSkipText = scrollX.interpolate({
    inputRange: [
      ITEM_WIDTH_SLIDE_INTRO * 2,
      ITEM_WIDTH_SLIDE_INTRO * 3,
      ITEM_WIDTH_SLIDE_INTRO * 4,
    ],
    outputRange: [colors.black, colors.white, colors.black],
    extrapolate: 'clamp',
  });

  const handlePressSkip = () => {
    dispatch(changeStatusLogin(true));
  };
  return {
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
  };
};
