import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {itemType} from 'react-native-gifted-charts/src/BarChart/types';
import {yAxisSides} from 'react-native-gifted-charts/src/utils/constants';

interface BarchartProps {}
const data: itemType = [
  {
    value: 50,
    frontColor: colors.pink300,
    labelTextStyle: {color: colors.pink200, fontWeight: '600'},
  },
  {
    value: 80,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray550,
      fontWeight: '500',
      fontSize: scaler(13),
    },
  },
  {
    value: 90,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray550,
      fontWeight: '500',
      fontSize: scaler(13),
    },
  },
  {
    value: 150,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray550,
      fontWeight: '500',
      fontSize: scaler(13),
    },
  },
];
const BarchartOnboarding = (props: BarchartProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={widthScreen - 30}
        barBorderRadius={8}
        frontColor={'#177AD5'}
        barWidth={40}
        initialSpacing={30}
        spacing={widthScreen / 9}
        rulesType={'solid'}
        rulesColor={colors.pink250}
        isAnimated
        rulesConfigArray={[
          {},
          {},
          {
            rulesColor: colors.yellow200,
            rulesThickness: 2,
          },
        ]}
        noOfSections={4}
        disableScroll={true}
        hideYAxisText={true}
        xAxisColor={colors.pink200}
        yAxisColor={colors.pink200}
        xAxisTextNumberOfLines={2}
        endSpacing={0}
        xAxisLabelTexts={[
          'Pregnancy Core',
          'Baby\nCare',
          'Love & Money',
          'Fitness & Nutrition',
        ]}
      />
    </View>
  );
};

export default BarchartOnboarding;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
