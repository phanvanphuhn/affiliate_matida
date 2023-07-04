import React from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Keyboard,
  Modal,
  PanResponder,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IProps, IState} from './AppModal.props';
import {styles} from './styles';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

export class AppModal extends React.PureComponent<IProps, IState> {
  static propTypes = {};

  static defaultProps = {
    modalSize: {
      height: 200,
      width: SCREEN_WIDTH,
    },
    startOpen: false,
    backdropPressToClose: true,
    swipeToClose: false,
    swipeThreshold: 50,
    position: 'center',
    backdrop: true,
    backdropOpacity: 0.5,
    backdropContent: null,
    animationDuration: 300,
    backButtonClose: false,
    easing: Easing.elastic(0.8),
    keyboardTopOffset: Platform.OS === 'ios' ? 24 : 0,
    useNativeDriver: true,
    modalBorderRadius: 10,
  };

  subscriptions: any;
  onViewLayoutCalculated: (() => void | null) | undefined | null;
  theme: any;

  constructor(props: any) {
    super(props);
    const position = props.startOpen
      ? new Animated.Value(0)
      : new Animated.Value(
          props.entry === 'top' ? -SCREEN_HEIGHT : SCREEN_HEIGHT,
        );
    // @ts-ignore
    this.state = {
      position: position,
      backdropOpacity: new Animated.Value(0),
      isOpen: this.props.startOpen as boolean,
      isAnimateClose: false,
      isAnimateOpen: false,
      swipeToClose: false,
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      containerHeight: SCREEN_HEIGHT,
      containerWidth: SCREEN_WIDTH,
      isInitialized: false,
      keyboardOffset: 0,
      pan: this.createPanResponder(position),
    };

    // Needed for iOS because the keyboard covers the screen
    if (Platform.OS === 'ios') {
      this.subscriptions = [
        Keyboard.addListener('keyboardWillChangeFrame', this.onKeyboardChange),
        Keyboard.addListener('keyboardDidHide', this.onKeyboardHide),
      ];
    }
  }

  componentDidMount() {
    this.handleOpening();
    this.theme = this.context;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleOpening();
    }
    // if (this.theme.mode !== this.context.mode) {
    //   this.theme = this.context;
    // }
  }

  componentWillUnmount() {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub: any) => sub.remove());
    }
    if (this.props.backButtonClose && Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  }

  onBackPress = () => {
    this.close();
    return true;
  };

  handleOpening = () => {
    if (typeof this.props.isOpen === 'undefined') {
      return;
    }
    if (this.props.isOpen) {
      this.open();
    } else {
      this.close();
    }
  };

  onKeyboardHide = () => {
    this.setState({keyboardOffset: 0});
  };

  onKeyboardChange = (evt: any) => {
    if (!evt) {
      return;
    }
    if (!this.state.isOpen) {
      return;
    }
    const keyboardFrame = evt.endCoordinates;
    const keyboardHeight = this.state.containerHeight - keyboardFrame.screenY;

    this.setState({keyboardOffset: keyboardHeight}, () => {
      this.animateOpen();
    });
  };

  // Open animation for the backdrop, will fade in
  animateBackdropOpen = () => {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({isAnimateBackdrop: true});

    let animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 1,
      duration: this.props.animationDuration,
      easing: this.props.easing,
      useNativeDriver: this.props.useNativeDriver as boolean,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  };

  animateBackdropClose = () => {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({isAnimateBackdrop: true});

    let animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 0,
      duration: this.props.animationDuration,
      easing: this.props.easing,
      useNativeDriver: this.props.useNativeDriver as boolean,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  };

  // Stop opening animation
  stopAnimateOpen = () => {
    if (this.state.isAnimateOpen) {
      if (this.state.animOpen) {
        this.state.animOpen.stop();
      }
      this.setState({isAnimateOpen: false});
    }
  };

  // Open animation for the modal, will move up
  animateOpen = () => {
    const {
      backdrop,
      keyboardTopOffset,
      animationDuration,
      easing,
      useNativeDriver,
      onOpened,
    } = this.props;
    this.stopAnimateClose();
    // Backdrop fadeIn
    if (backdrop) {
      this.animateBackdropOpen();
    }
    this.setState(
      {
        isAnimateOpen: true,
        isOpen: true,
      },
      () => {
        requestAnimationFrame(() => {
          // Detecting modal position
          let positionDest = this.calculateModalPosition(
            this.state.containerHeight - this.state.keyboardOffset,
          );
          if (
            this.state.keyboardOffset &&
            positionDest < (keyboardTopOffset as number)
          ) {
            positionDest = keyboardTopOffset as number;
          }
          let animOpen = Animated.timing(this.state.position, {
            toValue: positionDest,
            duration: animationDuration,
            easing: easing,
            useNativeDriver: useNativeDriver as boolean,
          }).start(() => {
            this.setState({
              isAnimateOpen: false,
              animOpen,
              positionDest,
            });
            if (onOpened) {
              onOpened(true);
            }
          });
        });
      },
    );
  };

  // Stop closing animation
  stopAnimateClose = () => {
    if (this.state.isAnimateClose) {
      if (this.state.animClose) {
        this.state.animClose.stop();
      }
      this.setState({isAnimateClose: false});
    }
  };

  // Close animation for the modal, will move down
  animateClose = () => {
    const {
      backdrop,
      position,
      animationDuration,
      easing,
      useNativeDriver,
      onClosed,
    } = this.props;
    this.stopAnimateOpen();
    // Backdrop fadeout
    if (backdrop) {
      this.animateBackdropClose();
    }
    this.setState(
      {
        isAnimateClose: true,
        isOpen: false,
      },
      () => {
        let animClose = Animated.timing(this.state.position, {
          toValue:
            this.props.entry === 'top'
              ? -this.state.containerHeight
              : this.state.containerHeight,
          duration: position === 'center' ? 100 : animationDuration,
          easing: easing,
          useNativeDriver: useNativeDriver as boolean,
        }).start(() => {
          // Keyboard.dismiss(); // make this optional. Easily user defined in .onClosed() callback
          this.setState(
            {
              isAnimateClose: false,
              animClose,
            },
            () => {
              this.state.position.setValue(
                this.props.entry === 'top'
                  ? -this.state.containerHeight
                  : this.state.containerHeight,
              );
            },
          );
          if (onClosed) {
            onClosed(false);
          }
        });
      },
    );
  };

  // Calculate when should be placed the modal
  calculateModalPosition = (containerHeight: number) => {
    let position = 0;

    if (this.props.position === 'bottom') {
      position = containerHeight - this.state.height;
    } else if (this.props.position === 'center') {
      position = containerHeight / 2 - this.state.height / 2;
    }
    // Checking if the position >= 0
    if (position < 0) {
      position = 0;
    }
    return position;
  };

  //  Create the pan responder to detect gesture Only used if swipeToClose is enabled
  createPanResponder = (position: Animated.Value) => {
    const {
      swipeToClose,
      isDisabled,
      swipeArea,
      swipeThreshold,
      entry,
      onClosingState,
    } = this.props;
    let closingState = false;
    let inSwipeArea = false;

    const onPanStart = (evt: {nativeEvent: {pageY: number}}) => {
      if (
        !swipeToClose ||
        isDisabled ||
        (swipeArea &&
          evt.nativeEvent.pageY - this.state.positionDest > swipeArea)
      ) {
        inSwipeArea = false;
        return false;
      }
      inSwipeArea = true;
      return true;
    };

    const animEvt = Animated.event([null, {customY: position}], {
      useNativeDriver: false,
    });

    const onPanMove = (evt: any, state: {dy: number; customY: any}) => {
      const newClosingState =
        this.props.entry === 'top'
          ? -state.dy > (swipeThreshold as number)
          : state.dy > (swipeThreshold as number);
      if (entry === 'top' ? state.dy > 0 : state.dy < 0) {
        return;
      }
      if (newClosingState !== closingState && onClosingState) {
        onClosingState(newClosingState);
      }
      closingState = newClosingState;
      state.customY = state.dy + this.state.positionDest;

      animEvt(evt, state);
    };

    const onPanRelease = (evt: any, state: {dy: number}) => {
      if (!inSwipeArea) {
        return;
      }
      inSwipeArea = false;
      if (
        entry === 'top'
          ? -state.dy > (swipeThreshold as number)
          : state.dy > (swipeThreshold as number)
      ) {
        this.close();
      } else if (!this.state.isOpen) {
        this.animateOpen();
      }
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onPanResponderMove: onPanMove as any,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  };

  //  Event called when the modal view layout is calculated
  onViewLayout = (evt: {
    nativeEvent: {layout: {height: number; width: number}};
  }) => {
    const height = evt.nativeEvent.layout.height;
    const width = evt.nativeEvent.layout.width;

    // If the dimensions are still the same we're done
    let newState: any = {};
    if (height !== this.state.height) {
      newState.height = height;
    }
    if (width !== this.state.width) {
      newState.width = width;
    }
    this.setState(newState);

    if (this.onViewLayoutCalculated) {
      this.onViewLayoutCalculated();
    }
  };

  // Event called when the container view layout is calculated
  onContainerLayout = (evt: {
    nativeEvent: {layout: {height: number; width: number}};
  }) => {
    const height = evt.nativeEvent.layout.height;
    const width = evt.nativeEvent.layout.width;

    // If the container size is still the same we're done
    if (
      height === this.state.containerHeight &&
      width === this.state.containerWidth
    ) {
      this.setState({isInitialized: true});
      return;
    }

    if (this.state.isOpen || this.state.isAnimateOpen) {
      this.animateOpen();
    }

    this.setState({
      isInitialized: true,
      containerHeight: height,
      containerWidth: width,
    });
  };

  renderBackdrop = () => {
    let backdrop;

    if (this.props.backdrop) {
      backdrop = (
        // <BlurView
        //     blurType={this.theme.mode === 'Dark' ? 'dark' : 'light'}
        //     blurAmount={3}
        //     blurRadius={3}
        //     style={[StyleSheet.absoluteFill]}
        // >
        <TouchableWithoutFeedback
          onPress={this.props.backdropPressToClose ? this.close : undefined}
          style={{backgroundColor: 'red'}}>
          <Animated.View
            importantForAccessibility="no"
            style={[
              styles.absolute,
              {opacity: 1, backgroundColor: 'rgba(0,0,0,0.53)'},
            ]}>
            {this.props.backdropContent || []}
          </Animated.View>
        </TouchableWithoutFeedback>
        // </BlurView>
      );
    }

    return backdrop;
  };

  renderContent = () => {
    const {
      modalSize,
      style,
      position,
      darkShadow,
      children,
      lightShadow,
      modalBorderRadius,
      modalBackgroundColor,
    } = this.props;
    const {width: modalWidth, height: modalHeight} = modalSize as {
      width: number;
      height: number;
    };
    const medium = position === 'center';
    const offsetX = (this.state.containerWidth - modalWidth) / 2;
    let mediumHeight = SCREEN_HEIGHT / 2 - modalHeight / 2;
    let mediumWidth = SCREEN_WIDTH - modalWidth;
    return (
      <Animated.View
        onLayout={this.onViewLayout}
        style={[
          modalSize,
          style,
          {
            transform: [
              {
                translateY: medium ? mediumHeight : this.state.position,
              },
              {
                translateX: medium ? mediumWidth / 2 : offsetX,
              },
            ],
          },
        ]}
        {...this.state.pan.panHandlers}>
        <View
          style={{
            borderBottomRightRadius:
              position === 'center' ? (modalBorderRadius as number) : 0,
            borderBottomLeftRadius:
              position === 'center' ? (modalBorderRadius as number) : 0,
            borderTopLeftRadius: modalBorderRadius as number,
            borderTopRightRadius: modalBorderRadius as number,

            backgroundColor: modalBackgroundColor || '#fafafa',
            width: modalWidth,
            height: modalHeight,
          }}>
          {children}
        </View>
      </Animated.View>
    );
  };

  render() {
    const visible =
      this.state.isOpen ||
      this.state.isAnimateOpen ||
      this.state.isAnimateClose;

    if (!visible) {
      return <View />;
    }

    const content = (
      <View
        importantForAccessibility="yes"
        accessibilityViewIsModal={true}
        style={styles.absolute}
        pointerEvents={'box-none'}>
        <View
          style={{flex: 1}}
          pointerEvents={'box-none'}
          onLayout={this.onContainerLayout}>
          {visible && this.renderBackdrop()}
          {visible && this.renderContent()}
        </View>
      </View>
    );

    return (
      <Modal
        onRequestClose={() => {
          if (this.props.backButtonClose) {
            this.close();
          }
        }}
        supportedOrientations={[
          'landscape',
          'portrait',
          'portrait-upside-down',
        ]}
        statusBarTranslucent={true}
        transparent
        visible={visible}
        hardwareAccelerated={true}>
        {content}
      </Modal>
    );
  }

  // PUBLIC METHODS
  open = () => {
    if (this.props.isDisabled) {
      return;
    }
    if (
      !this.state.isAnimateOpen &&
      (!this.state.isOpen || this.state.isAnimateClose)
    ) {
      this.onViewLayoutCalculated = () => {
        this.animateOpen();
        if (this.props.backButtonClose && Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
        this.onViewLayoutCalculated = null;
      };
      this.setState({isAnimateOpen: true});
    }
  };

  close = () => {
    if (this.props.isDisabled) {
      return;
    }
    if (
      !this.state.isAnimateClose &&
      (this.state.isOpen || this.state.isAnimateOpen)
    ) {
      this.animateClose();
      if (this.props.backButtonClose && Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    }
  };
}
