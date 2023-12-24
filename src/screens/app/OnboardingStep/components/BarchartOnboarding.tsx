import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {itemType} from 'react-native-gifted-charts/src/BarChart/types';
import {yAxisSides} from 'react-native-gifted-charts/src/utils/constants';

interface BarchartProps {}
const data: itemType = [
  {
    value: 50,
    frontColor: colors.pink300,
    labelTextStyle: {
      color: colors.labelColor,
      fontWeight: '600',
      fontSize: scaler(14),
      ...stylesCommon.fontWeight600,
    },
  },
  {
    value: 80,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray,
      fontWeight: '500',
      fontSize: scaler(12),
      ...stylesCommon.fontWeight500,
    },
  },
  {
    value: 90,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray,
      fontWeight: '500',
      fontSize: scaler(12),
      ...stylesCommon.fontWeight500,
    },
  },
  {
    value: 150,
    frontColor: colors.blue100,
    labelTextStyle: {
      color: colors.gray,
      fontWeight: '500',
      fontSize: scaler(12),
      ...stylesCommon.fontWeight500,
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
        barWidth={40}
        initialSpacing={30}
        spacing={widthScreen / 9}
        hideRules={true}
        isAnimated
        rulesConfigArray={[
          {},
          {},
          {
            rulesColor: colors.yellow200,
            rulesThickness: 2,
          },
        ]}
        yAxisLabelTextStyle={{}}
        noOfSections={4}
        disableScroll={true}
        hideYAxisText={true}
        xAxisColor={colors.blue}
        yAxisColor={colors.blue}
        xAxisTextNumberOfLines={2}
        endSpacing={0}
        xAxisLabelTexts={[
          'Pregnancy\nBasics',
          'Baby\nCare',
          'Love &\nMoney',
          'Fitness &\nNutrition',
        ]}
      />
    </View>
  );
};

export default BarchartOnboarding;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
