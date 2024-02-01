import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {colors, scaler} from '@stylesCommon';
import {ic_like, ic_warning} from '@images';

interface LineChartProps {
  max: number;
  value: number;
  isWarning?: boolean;
}

const LineChart = (props: LineChartProps) => {
  const [state, setState] = useState();
  const getPercent = () => {
    if (props.value >= props.max) {
      return 100;
    } else {
      return (props.value / props.max) * 100;
    }
  };
  return (
    <View
      style={[
        styles.container,
        !props?.isWarning && {
          backgroundColor: colors.white2,
          borderWidth: 0,
        },
      ]}>
      <View
        style={[
          styles.line,
          !props?.isWarning && {backgroundColor: colors.blue},
          {width: `${getPercent()}%`},
        ]}
      />
      <Image
        source={props?.isWarning ? ic_warning : ic_like}
        style={styles.img}
      />
    </View>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 21,
    width: '100%',
    borderRadius: 20,
    borderColor: colors.primaryBackground,
    borderWidth: 1,
    backgroundColor: colors.pink400,
    padding: 2,
    alignItems: 'center',
    marginBottom: scaler(24),
  },
  line: {
    height: '100%',
    width: '50%',
    borderRadius: 20,
    backgroundColor: colors.primaryBackground,
  },
  img: {marginLeft: 5, height: 15, width: 15, resizeMode: 'contain'},
});
