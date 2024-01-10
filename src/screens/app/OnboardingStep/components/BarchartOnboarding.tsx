import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {itemType} from 'react-native-gifted-charts/src/BarChart/types';
import {useRoute} from '@react-navigation/native';
import useStateCustom from '../../../../util/hooks/useStateCustom';
import {ic_back_arrow} from '@images';
import {useSelector} from 'react-redux';

interface BarchartProps {
  score: any;
  metadata: any;
}

export let keyItem = [
  'love_and_money',
  'newborn_care',
  'nutrition_and_fitness',
];
const BarchartOnboarding = (props: BarchartProps) => {
  const [state, setState] = useStateCustom<any>({
    data: [],
    dataSos: [true, false, false, true],
  });
  const lang = useSelector((state: any) => state?.auth?.lang);
  const getLabel = (type: string) => {
    switch (type) {
      case 'love_and_money':
        return lang == 1 ? 'Love &\nMoney' : 'Tài chính & Gia đình';
      case 'newborn_care':
        return lang == 1 ? 'Baby\nCare' : 'Chăm sóc con yêu';
      case 'core':
        return lang == 1 ? 'Pregnancy\nBasics' : 'Kiến thức thai kỳ';
      case 'nutrition_and_fitness':
        return lang == 1 ? 'Fitness &\nNutrition' : 'Thể chất & Dinh dưỡng';
    }
  };
  const getOrder = (type: string) => {
    switch (type) {
      case 'love_and_money':
        return 1;
      case 'newborn_care':
        return 2;
      case 'core':
        return 3;
      case 'nutrition_and_fitness':
        return 4;
    }
  };
  useEffect(() => {
    let obj = props?.metadata;
    console.log('=>(BarchartOnboarding.tsx:72) obj', obj);
    if (obj) {
      let dataUrgent = [...state.dataSos];
      let pinkStyle = {
        color: colors.red,
        labelTextStyle: {
          color: colors.labelColor,
          fontSize: scaler(14),
          textAlign: 'center',
          width: '130%',
          left: -18,
          ...stylesCommon.fontWeight600,
        },
      };
      let grayStyle = {
        color: colors.blue100,

        labelTextStyle: {
          color: colors.gray550,
          fontSize: scaler(14),
          width: '130%',
          textAlign: 'center',
          left: -18,
          ...stylesCommon.fontWeight500,
        },
      };
      let arrayKey = Object.keys(obj).filter(key => keyItem?.includes(key));
      console.log('=>(BarchartOnboarding.tsx:76) arrayKey', arrayKey);
      let data: any[] = arrayKey.map((key, i) => {
        let value = obj[key];
        let data2 = arrayKey.map(k => obj[k]);

        function markMinValues(arr) {
          let minValue = Math.min(...arr);
          let markedArray = arr.map((num, index) => ({
            index: index,
            value: num === minValue ? true : false,
          }));

          return markedArray;
        }

        let markedResult = markMinValues(data2);
        if (markedResult.some(e => e.index == i && e.value)) {
          dataUrgent = [true, ...markedResult?.map(e => e.value)];
          return {
            label: getLabel(key),
            order: getOrder(key),
            ...pinkStyle,
            borderRadius: 8,
            stacks: [
              {
                value: value,
                color: colors.pink200,
              },
              {
                value: props?.score - value,
                color: colors.transparent,
                innerBarComponent: () => (
                  <View
                    style={{
                      backgroundColor: colors.transparent,
                      borderColor: colors.pink200,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderStyle: 'dashed',
                      zIndex: 0,
                      width: '100%',
                      height: '200%',
                    }}
                  />
                ),
              },
            ],
          };
        }
        return {
          label: getLabel(key),
          order: getOrder(key),
          ...grayStyle,
          stacks: [{value}],
        };
      });
      setState({
        dataSos: dataUrgent,
        data: [
          ...[
            {
              label: getLabel('core'),
              ...pinkStyle,
              borderRadius: 8,
              stacks: [
                {
                  value: props?.score / 2,
                  color: colors.pink200,
                },
                {
                  value: props?.score / 2,
                  color: colors.transparent,
                  innerBarComponent: () => (
                    <View
                      style={{
                        backgroundColor: colors.transparent,
                        borderColor: colors.pink200,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderStyle: 'dashed',
                        zIndex: 0,
                        width: '100%',
                        height: '200%',
                      }}
                    />
                  ),
                },
              ],
            },
          ],
          ...data,
        ],
      });
    }
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <BarChart
          stackData={state.data}
          barBorderRadius={8}
          barWidth={40}
          maxValue={props?.score}
          initialSpacing={31}
          endSpacing={31}
          spacing={40}
          hideRules={true}
          isAnimated
          autoShiftLabels={true}
          noOfSections={4}
          disableScroll={true}
          hideYAxisText={true}
          scrollToEnd={true}
          xAxisColor={colors.blue}
          yAxisColor={colors.blue}
          xAxisTextNumberOfLines={2}
        />
        <Image
          source={ic_back_arrow}
          style={{
            tintColor: colors.blue,
            transform: [{rotate: '90deg'}],
            position: 'absolute',
            top: -11,
            left: -2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -10,
            flexDirection: 'row',
          }}>
          {state.dataSos.map((e, i) => {
            if (!e) {
              return (
                <View
                  key={i}
                  style={[
                    {
                      width: 55,
                      marginLeft: i == 0 ? 34 : 25,
                    },
                  ]}
                />
              );
            }
            return (
              <View
                key={i}
                style={[
                  styles.containerUrgent,
                  {
                    width: 55,
                    marginLeft: i == 0 ? 34 : 25,
                  },
                ]}>
                <Text style={styles.textUrgent}>
                  {lang == 2 ? 'SOS' : 'Urgent'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default BarchartOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  containerUrgent: {
    backgroundColor: colors.yellow200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 20,
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  textUrgent: {
    textAlign: 'center',
    fontSize: scaler(11),
    ...stylesCommon.fontWeight600,
  },
});
