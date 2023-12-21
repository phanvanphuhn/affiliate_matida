import React from 'react';
import PropTypes from 'prop-types';
import {Animated, StyleProp, View, ViewStyle} from 'react-native';
import {Svg, Path, G} from 'react-native-svg';
export interface CircularProgressProps {
  /**
   * Style of the entire progress container
   *
   * @type {StyleProp<ViewStyle>}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Width and height of circle
   *
   * @type {number | Animated.Value}
   */
  size: number | Animated.Value;

  /**
   * Thickness of the progress line
   *
   * @type {number}
   */
  width: number;

  /**
   * Current progress / fill
   *
   * @type {number}
   */
  fill: number;

  /**
   * Thickness of background circle
   *
   * @type {number}
   * @default width
   */
  backgroundWidth?: number;

  /**
   * Color of the progress line
   *
   * @type {string}
   * @default 'black'
   */
  tintColor?: string;

  /**
   * Current progress / tint transparency
   *
   * @type {boolean}
   * @default true
   */
  tintTransparency?: boolean;

  /**
   * If unspecified, no background line will be rendered
   *
   * @type {string}
   */
  backgroundColor?: string;

  /**
   * Angle from which the progress starts from
   *
   * @type {number}
   * @default 90
   */
  rotation?: number;

  /**
   * Shape used at ends of progress line.
   *
   * @type {('butt' | 'round' | 'square')}
   * @default 'butt'
   */
  lineCap?: 'butt' | 'round' | 'square';

  /**
   * Shape used at ends of progress line.
   *
   * @type {('butt' | 'round' | 'square')}
   * @default lineCap - which is 'butt'
   */
  fillLineCap?: 'butt' | 'round' | 'square';

  /**
   * If you don't want a full circle, specify the arc angle
   *
   * @type {number}
   * @default 360
   */
  arcSweepAngle?: number;

  /**
   * Pass a function as a child. It receiveds the current fill-value as an argument
   *
   * @type {Function}
   * @param {number} fill current fill-value
   * @return {JSX.Element} the element inside the circle
   */
  children?: ((fill: number) => JSX.Element) | React.ReactChild;

  /**
   * Style of the children container
   *
   * @type {StyleProp<ViewStyle>}
   */
  childrenContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Padding applied around the circle to allow for a cap that bleeds outside its boundary
   *
   * @type {number}
   * @default 0
   */
  padding?: number;

  /**
   * Function that's invoked during rendering to draw at the tip of the progress circle
   *
   */
  renderCap?: (payload: {center: {x: number; y: number}}) => React.ReactNode;

  /**
   * Use dashed type for tint/progress line
   *
   * @type { width: number; gap: number }
   * @default '{ width: 0, gap: 0 }'
   */
  dashedTint?: {width: number; gap: number};

  /**
   * Use dashed type for background
   *
   * @type { width: number; gap: number }
   * @default '{ width: 0, gap: 0 }'
   */
  dashedBackground?: {width: number; gap: number};
}
export default class CircularProgress extends React.PureComponent<CircularProgressProps> {
  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ];
    return d.join(' ');
  }

  clampFill = (fill: number) => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      tintTransparency,
      backgroundColor,
      style,
      rotation,
      lineCap,
      fillLineCap = lineCap,
      arcSweepAngle,
      fill,
      children,
      childrenContainerStyle,
      padding,
      renderCap,
      dashedBackground,
      dashedTint,
    } = this.props;

    const maxWidthCircle = backgroundWidth
      ? Math.max(width, backgroundWidth)
      : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;

    const currentFillAngle = (arcSweepAngle * this.clampFill(fill)) / 100;
    const backgroundPath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      tintTransparency ? 0 : currentFillAngle,
      arcSweepAngle,
    );
    const circlePath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      currentFillAngle,
    );
    const coordinate = this.polarToCartesian(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      currentFillAngle,
    );
    const cap = this.props.renderCap
      ? this.props.renderCap({center: coordinate})
      : null;

    const offset = size - maxWidthCircle * 2;

    const localChildrenContainerStyle = {
      ...{
        position: 'absolute',
        left: maxWidthCircle + padding / 2,
        top: maxWidthCircle + padding / 2,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      ...childrenContainerStyle,
    };

    const strokeDasharrayTint =
      dashedTint.gap > 0
        ? Object.values(dashedTint).map(value => parseInt(value))
        : null;

    const strokeDasharrayBackground =
      dashedBackground.gap > 0
        ? Object.values(dashedBackground).map(value => parseInt(value))
        : null;

    return (
      <View style={style}>
        <Svg width={size + padding} height={size + padding}>
          <G
            rotation={rotation}
            originX={(size + padding) / 2}
            originY={(size + padding) / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                strokeDasharray={strokeDasharrayBackground}
                fill="transparent"
              />
            )}
            {fill > 0 && (
              <Path
                d={circlePath}
                stroke={tintColor}
                strokeWidth={width}
                strokeLinecap={fillLineCap}
                strokeDasharray={strokeDasharrayTint}
                fill="transparent"
              />
            )}
            {cap}
          </G>
        </Svg>
        {children && (
          <View style={localChildrenContainerStyle}>{children(fill)}</View>
        )}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Animated.Value),
  ]).isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  tintTransparency: PropTypes.bool,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
  childrenContainerStyle: PropTypes.object,
  padding: PropTypes.number,
  renderCap: PropTypes.func,
  dashedBackground: PropTypes.object,
  dashedTint: PropTypes.object,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  tintTransparency: true,
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
  padding: 0,
  dashedBackground: {width: 0, gap: 0},
  dashedTint: {width: 0, gap: 0},
};
