/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Dimensions,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {heightScreen} from '@stylesCommon';

/**
 * Default styles
 * @type {StyleSheetPropType}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    flex: 1,
  },

  wrapperIOS: {
    backgroundColor: 'transparent',
  },

  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1,
  },

  slide: {
    backgroundColor: 'transparent',
  },

  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent',
  },

  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
  },
});

interface IProps extends ScrollViewProps {
  horizontal?: boolean;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  scrollViewStyle?: StyleProp<ViewStyle>;
  pagingEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
  scrollsToTop?: boolean;
  removeClippedSubviews?: boolean;
  automaticallyAdjustContentInsets?: boolean;
  loadMinimal?: boolean;
  loadMinimalSize?: number;
  loadMinimalLoader?: React.ReactNode;
  loop?: boolean;
  autoplay?: boolean;
  autoplayTimeout: number;
  autoplayDirection?: boolean;
  lockScrollTimeoutDuration?: number;
  lockScrollWhileSnapping?: boolean;
  index: number;
  /**
   * Called when the index has changed because the user swiped.
   */
  onIndexChanged: (index: number) => void;
  width?: number;
  height?: number;
}
interface IOffset {
  x: number;
  y: number;
}
interface IState {
  autoplayEnd: boolean;
  isScroll: boolean;
  children?: React.ReactNode[];
  loopJump?: boolean;
  offset: IOffset | object;
  index: number;
  total: number;
  dir?: keyof IOffset;
  width: number;
  height: number;
}
export default class Swiper extends PureComponent<IProps, IState> {
  /**
   * Props Validation
   * @type {Object}
   */
  static propTypes = {
    horizontal: PropTypes.bool,
    children: PropTypes.node.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    scrollViewStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    pagingEnabled: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    bounces: PropTypes.bool,
    scrollsToTop: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    showsPagination: PropTypes.bool,
    showsButtons: PropTypes.bool,
    disableNextButton: PropTypes.bool,
    disablePrevButton: PropTypes.bool,
    loadMinimal: PropTypes.bool,
    loadMinimalSize: PropTypes.number,
    loadMinimalLoader: PropTypes.element,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    autoplayDirection: PropTypes.bool,
    index: PropTypes.number,
    renderPagination: PropTypes.func,
    dotStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    activeDotStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    dotColor: PropTypes.string,
    activeDotColor: PropTypes.string,
    /**
     * Called when the index has changed because the user swiped.
     */
    onIndexChanged: PropTypes.func,
  };

  /**
   * Default props
   * @return {object} props
   * @see http://facebook.github.io/react-native/docs/scrollview.html
   */
  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    showsButtons: false,
    disableNextButton: false,
    disablePrevButton: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    lockScrollWhileSnapping: true,
    lockScrollTimeoutDuration: 1000,
    index: 0,
    onIndexChanged: () => null,
  };

  /**
   * Init states
   * @return {object} states
   */
  state = this.initState(this.props);

  /**
   * Initial render flag
   * @type {bool}
   */
  initialRender: boolean = true;
  contentChange: boolean = false;

  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer: any = null;
  loopJumpTimer: any = null;
  scrollView?: ScrollView;
  internals: any = {};
  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    if (!nextProps.autoplay && this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
    if (nextProps.index === this.props.index) {
      return;
    }
    this.setState(
      this.initState(nextProps, this.props.index !== nextProps.index),
    );
  }

  componentDidMount() {
    this.autoplay();
  }

  componentWillUnmount() {
    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
  }

  UNSAFE_componentWillUpdate(nextProps: IProps, nextState: IState) {
    // If the index has changed, we notify the parent via the onIndexChanged callback
    if (this.state.index !== nextState.index) {
      this.props.onIndexChanged(nextState.index);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    // If autoplay props updated to true, autoplay immediately
    if (this.props.autoplay && !prevProps.autoplay) {
      this.autoplay();
    }
    if (this.props.children !== prevProps.children) {
      if (this.props.loadMinimal && Platform.OS === 'ios') {
        this.setState({...this.props, index: this.state.index});
      } else {
        this.setState({...this.props, index: this.state.index});
        // this.setState(
        //   this.initState({...this.props, index: this.state.index}, true),
        // );
      }
    }
  }

  initState(props: IProps, updateIndex = false) {
    // set the current state
    const state = this.state || {width: 0, height: 0, offset: {x: 0, y: 0}};

    const initState: any = {
      autoplayEnd: false,
      children: null,
      loopJump: false,
      offset: {},
      isScroll: true,
    };

    // Support Optional render page
    initState.children = Array.isArray(props.children)
      ? props.children.filter(child => child)
      : props.children;

    initState.total = initState.children ? initState.children.length || 1 : 0;

    if (state.total === initState.total && !updateIndex) {
      // retain the index
      initState.index = state.index;
    } else {
      initState.index =
        initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
    }

    // Default: horizontal
    const {width, height} = Dimensions.get('window');

    initState.dir = props.horizontal === false ? 'y' : 'x';

    if (props.width) {
      initState.width = props.width;
    } else if (this.state && this.state.width) {
      initState.width = this.state.width;
    } else {
      initState.width = width;
    }

    if (props.height) {
      initState.height = props.height;
    } else if (this.state && this.state.height) {
      initState.height = this.state.height;
    } else {
      initState.height = height;
    }

    initState.offset[initState.dir] =
      initState.dir === 'y'
        ? initState.height * props.index
        : initState.width * props.index;

    this.internals = {
      ...this.internals,
      isScrolling: false,
    };
    return initState;
  }

  // include internals with state
  fullState() {
    return Object.assign({}, this.state, this.internals);
  }

  onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    const offset: any = (this.internals.offset = {});
    const state: any = {width, height};

    if (this.state.total > 1) {
      let setup = this.state.index;
      if (this.props.loop) {
        setup++;
      }
      offset[this.state.dir] =
        this.state.dir === 'y' ? height * setup : width * setup;
    }

    // only update the offset in state if needed, updating offset while swiping
    // causes some bad jumping / stuttering
    if (!this.state.offset) {
      state.offset = offset;
    }

    // related to https://github.com/leecade/react-native-swiper/issues/570
    // contentOffset is not working in react 0.48.x so we need to use scrollTo
    // to emulate offset.
    if (this.state.total > 1) {
      this.scrollView?.scrollTo({...offset, animated: false});
    }

    if (this.initialRender) {
      this.initialRender = false;
    }

    this.setState(state);
  };

  loopJump = () => {
    if (!this.state.loopJump) {
      return;
    }
    const scrollView = this.scrollView;
    this.loopJumpTimer = setTimeout(() => {
      if (this.state.index === 0) {
        scrollView?.scrollTo(
          this.props.horizontal === false
            ? {x: 0, y: this.state.height, animated: false}
            : {x: this.state.width, y: 0, animated: false},
        );
      } else if (this.state.index === this.state.total - 1) {
        this.props.horizontal === false
          ? this.scrollView?.scrollTo({
              x: 0,
              y: this.state.height * this.state.total,
              animated: false,
            })
          : this.scrollView?.scrollTo({
              x: this.state.width * this.state.total,
              y: 0,
              animated: false,
            });
      }
    }, 300);
  };

  /**
   * Automatic rolling
   */
  autoplay = () => {
    if (
      !Array.isArray(this.state.children) ||
      !this.props.autoplay ||
      this.internals.isScrolling ||
      this.state.autoplayEnd
    ) {
      return;
    }

    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.autoplayTimer = setTimeout(() => {
      if (
        !this.props.loop &&
        (this.props.autoplayDirection
          ? this.state.index === this.state.total - 1
          : this.state.index === 0)
      ) {
        return this.setState({autoplayEnd: true});
      }

      this.scrollBy(this.props.autoplayDirection ? 1 : -1);
    }, this.props.autoplayTimeout * 1000);
  };

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin = (e: any) => {
    // update scroll state
    this.internals.isScrolling = true;
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
  };

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd = (e: any) => {
    // update scroll state
    this.setState({isScroll: true});

    this.internals.isScrolling = false;
    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {
          x: e.nativeEvent.position * this.state.width,
        };
      } else {
        e.nativeEvent.contentOffset = {
          y: e.nativeEvent.position * this.state.height,
        };
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
      this.autoplay();
      this.loopJump();
    });
    // if `onMomentumScrollEnd` registered will be called here
    this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
  };

  /*
   * Drag end handle
   * @param {object} e native event
   */
  onScrollEndDrag = (e: any) => {
    const {contentOffset} = e.nativeEvent;
    const {horizontal} = this.props;
    const {children, index} = this.state;
    const {offset} = this.internals;
    const previousOffset = horizontal ? offset.x : offset.y;
    const newOffset = horizontal ? contentOffset.x : contentOffset.y;

    if (
      previousOffset === newOffset &&
      (index === 0 || index === children.length - 1)
    ) {
      this.internals.isScrolling = false;
    }
    if (
      this.props.lockScrollTimeoutDuration &&
      this.props.lockScrollWhileSnapping
    ) {
      this.setState({isScroll: false});
      setTimeout(() => {
        this.setState({isScroll: true});
      }, this.props.lockScrollTimeoutDuration);
    }
  };

  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex = (offset: IOffset, dir: keyof IOffset, cb: () => void) => {
    const state = this.state;
    // Android ScrollView will not scrollTo certain offset when props change
    let index = state.index;
    if (!this.internals.offset) {
      // Android not setting this onLayout first? https://github.com/leecade/react-native-swiper/issues/582
      this.internals.offset = {};
    }
    const diff = offset[dir] - (this.internals.offset[dir] || 0);
    const step = dir === 'x' ? state.width : state.height;
    let loopJump = false;

    // Do nothing if offset no change.
    if (!diff) {
      return;
    }

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    // parseInt() ensures it's always an integer
    index = parseInt(index + Math.round(diff / step));

    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1;
        offset[dir] = step * state.total;
        loopJump = true;
      } else if (index >= state.total) {
        index = 0;
        offset[dir] = step;
        loopJump = true;
      }
    }

    const newState: any = {};
    newState.index = index;
    newState.loopJump = loopJump;

    this.internals.offset = offset;

    // only update offset in state if loopJump is true
    if (loopJump) {
      // when swiping to the beginning of a looping set for the third time,
      // the new offset will be the same as the last one set in state.
      // Setting the offset to the same thing will not do anything,
      // so we increment it by 1 then immediately set it to what it should be,
      // after render.
      if (offset[dir] === this.internals.offset[dir]) {
        newState.offset = {x: 0, y: 0};
        newState.offset[dir] = offset[dir] + 1;
        this.setState(newState, () => {
          this.setState({offset: offset}, cb);
        });
      } else {
        newState.offset = offset;
        this.setState(newState, cb);
      }
    } else {
      this.setState(newState, cb);
    }
  };

  /**
   * Scroll by index
   * @param  {number} index offset index
   * @param  {bool} animated
   */

  scrollBy = (index: number, animated = true) => {
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }
    const state = this.state;
    const diff = (this.props.loop ? 1 : 0) + index + this.state.index;
    let x = 0;
    let y = 0;
    if (state.dir === 'x') {
      x = diff * state.width;
    }
    if (state.dir === 'y') {
      y = diff * state.height;
    }

    this.scrollView && this.scrollView.scrollTo({x, y, animated});

    // update scroll state
    this.internals.isScrolling = true;
    this.setState({
      autoplayEnd: false,
    });

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS !== 'ios') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      });
    }
  };

  /**
   * Scroll to index
   * @param  {number} index page
   * @param  {bool} animated
   */

  scrollTo = (index: number, animated = true) => {
    if (
      this.internals.isScrolling ||
      this.state.total < 2 ||
      index == this.state.index
    ) {
      return;
    }

    const state = this.state;
    const diff = this.state.index + (index - this.state.index);

    let x = 0;
    let y = 0;
    if (state.dir === 'x') {
      x = diff * state.width;
    }
    if (state.dir === 'y') {
      y = diff * state.height;
    }

    this.scrollView && this.scrollView.scrollTo({x, y, animated});

    // update scroll state
    this.internals.isScrolling = true;
    this.setState({
      autoplayEnd: false,
    });

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS !== 'ios') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      });
    }
  };

  scrollViewPropOverrides = () => {
    const props: any = this.props;
    let overrides: any = {};

    /*
        const scrollResponders = [
          'onMomentumScrollBegin',
          'onTouchStartCapture',
          'onTouchStart',
          'onTouchEnd',
          'onResponderRelease',
        ]
        */

    for (let prop in props) {
      // if(~scrollResponders.indexOf(prop)
      if (
        typeof props[prop] === 'function' &&
        prop !== 'onMomentumScrollEnd' &&
        prop !== 'renderPagination' &&
        prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop];
        overrides[prop] = (e: any) =>
          originResponder(e, this.fullState(), this);
      }
    }

    return overrides;
  };

  refScrollView = (view: ScrollView) => {
    this.scrollView = view;
  };

  renderScrollView = (pages: React.ReactNode[]) => {
    return (
      <ScrollView
        ref={this.refScrollView}
        {...this.props}
        {...this.scrollViewPropOverrides()}
        contentContainerStyle={[styles.wrapperIOS, this.props.style]}
        contentOffset={this.state.offset}
        onContentSizeChange={() => {
          if (!this.contentChange) {
            this.props.onIndexChanged(this.state.index);
            this.contentChange = true;
          }
        }}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
        scrollEnabled={this.state.isScroll}
        style={this.props.scrollViewStyle}>
        {pages}
      </ScrollView>
    );
  };

  /**
   * Default render
   * @return {object} react-dom
   */
  render() {
    const {index, total, width, height, children} = this.state;
    const {
      containerStyle,
      loop,
      loadMinimal,
      loadMinimalSize,
      loadMinimalLoader,
    } = this.props;
    // let dir = state.dir
    // let key = 0
    const loopVal = loop ? 1 : 0;
    let pages: any = [];

    const pageStyle = [{width: width, height: height}, styles.slide];
    const pageStyleLoading: StyleProp<ViewStyle> = {
      width,
      height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };

    // For make infinite at least total > 1
    if (total > 1) {
      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children);
      if (loop) {
        pages.unshift(total - 1 + '');
        pages.push('0');
      }

      pages = pages.map((page: any, i: number) => {
        if (loadMinimal) {
          if (
            (i >= index + loopVal - (loadMinimalSize || 1) &&
              i <= index + loopVal + (loadMinimalSize || 1)) ||
            // The real first swiper should be keep
            (loop && i === 1) ||
            // The real last swiper should be keep
            (loop && i === total - 1)
          ) {
            return (
              <View style={pageStyle} key={i}>
                {children[page]}
              </View>
            );
          } else {
            return (
              <View style={pageStyleLoading} key={i}>
                {loadMinimalLoader ? loadMinimalLoader : <ActivityIndicator />}
              </View>
            );
          }
        } else {
          return (
            <View style={pageStyle} key={i}>
              {children[page]}
            </View>
          );
        }
      });
    } else {
      pages = (
        <View style={pageStyle} key={0}>
          {children}
        </View>
      );
    }

    return (
      <View style={[styles.container, containerStyle]} onLayout={this.onLayout}>
        {this.renderScrollView(pages)}
      </View>
    );
  }
}
