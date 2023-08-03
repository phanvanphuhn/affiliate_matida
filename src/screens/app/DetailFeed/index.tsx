import {ic_back, ic_search} from '@images';
import {heightScreen} from '@stylesCommon';
import React, {useRef, useState} from 'react';
import {Image, ListRenderItem, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderFeed from '../../../component/HeaderFeed';
import {IDataListFeed} from '../Feed/type';
import FooterFeed from './components/FooterFeed';
import ItemArticle from './components/ItemArticle';
import ItemVideo from './components/ItemVideo';
interface DetailFeedProps {}
const dataListFeed: IDataListFeed[] = [
  {
    id: 2,
    image:
      'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
    view: '230',
    duration: '2',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    type: 'article',
    title: 'Yoga for mom',
    author: 'pregnancy Podcast',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 3,
    image:
      'https://thuthuatnhanh.com/wp-content/uploads/2021/11/hinh-anh-chill-dep.jpg',
    view: '230',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    duration: '2',
    title: 'Yoga for mom',
    type: 'podcast',
    author: 'pregnancy Podcast',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 4,
    image:
      'https://img5.thuthuatphanmem.vn/uploads/2021/12/08/hinh-nen-yen-tinh-2k_101058962.jpg',
    view: '230',
    duration: '2',
    title: 'Yoga for mom',
    author: 'pregnancy Podcast',
    type: 'article',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 5,
    image:
      'https://thuthuatnhanh.com/wp-content/uploads/2021/11/hinh-anh-chill-dep.jpg',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    view: '230',
    duration: '2',
    title: 'Yoga for mom',
    type: 'video',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    author: 'pregnancy Podcast',
  },
  {
    id: 5,
    image:
      'https://thuthuatnhanh.com/wp-content/uploads/2021/11/hinh-anh-chill-dep.jpg',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4',
    view: '230',
    duration: '2',
    title: 'Yoga for mom',
    type: 'video',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    author: 'pregnancy Podcast',
  },
];
const DetailFeed = (props: DetailFeedProps) => {
  const [state, setState] = useState<IDataListFeed[]>(dataListFeed);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const _carousel = useRef<Carousel<IDataListFeed>>();

  const onNext = () => {
    _carousel.current?.snapToNext(true);
  };
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    switch (item.type) {
      case 'video':
      case 'podcast':
        return (
          <ItemVideo
            item={item}
            isFocused={currentIndex == index}
            onNext={onNext}
            isAudio={item.type == 'podcast'}
          />
        );
      default:
        return (
          <ItemArticle
            item={item}
            isFocused={currentIndex == index}
            onNext={onNext}
          />
        );
    }
  };
  const keyExtractor = (item: IDataListFeed, index: number) => index.toString();
  return (
    <View style={styles.container}>
      <HeaderFeed
        IconLeft={<Image source={ic_back} style={styles.iconHeader} />}
        ComponentRight={<Image source={ic_search} style={styles.iconHeader} />}
      />
      <Carousel
        ref={_carousel}
        data={state}
        renderItem={renderItem}
        sliderHeight={heightScreen - 65}
        keyExtractor={keyExtractor}
        itemHeight={heightScreen - 65}
        decelerationRate={'fast'}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={1}
        inactiveSlideShift={0}
        removeClippedSubviews={false}
        enableMomentum={false}
        disableIntervalMomentum
        enableSnap
        vertical={true}
        firstItem={0}
        onSnapToItem={setCurrentIndex}
      />
      <View style={{height: 65}}>
        <FooterFeed />
      </View>
    </View>
  );
};

export default DetailFeed;

const styles = StyleSheet.create({
  iconHeader: {height: 22, width: 22},
  container: {
    backgroundColor: '#141414',
    flex: 1,
  },
});
