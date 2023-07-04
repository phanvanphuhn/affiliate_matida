import {Animated, ViewStyle} from 'react-native';

export interface ModalSize {
  width?: number;
  height?: number;
}

export interface IProps {
  // modal's width and height
  modalSize?: ModalSize;
  isOpen?: boolean;
  isDisabled?: boolean;
  // click backdrop to close Modal
  backdropPressToClose?: boolean;
  // swipe to close modal
  swipeToClose?: boolean;
  // threshold of swipe to close modal
  swipeThreshold?: number;
  swipeArea?: number;
  position?: 'top' | 'center' | 'bottom';
  // animation appears entrance
  entry?: 'top' | 'bottom';
  // show backdrop
  backdrop?: boolean;
  backdropOpacity?: number;
  backdropContent?: React.ReactNode;
  animationDuration?: number;
  // android backButton can close modal
  backButtonClose?: boolean;
  // show modal immediately
  startOpen?: boolean;
  keyboardTopOffset?: number;
  style?: ViewStyle;
  useNativeDriver?: boolean;
  onClosed?: (status: boolean) => void;
  onOpened?: (status: boolean) => void;
  onClosingState?(state: boolean): void;
  easing?: (val: number) => number;
  darkShadow?: string;
  lightShadow?: string;
  modalBorderRadius?: number;
  modalBackgroundColor?: string;
  children?: React.ReactNode;
}

export interface IState {
  dy: number;
  customY: number;
  positionDest: number;
  animClose: any;
  animOpen: any;
  isAnimateBackdrop: boolean;
  animBackdrop: any;
  isOpen: boolean;
  position: Animated.Value;
  backdropOpacity: any;
  isAnimateClose: boolean;
  isAnimateOpen: boolean;
  swipeToClose: boolean;
  height: number;
  width: number;
  containerHeight: number;
  containerWidth: number;
  isInitialized: boolean;
  keyboardOffset: number;
  pan: any;
}
