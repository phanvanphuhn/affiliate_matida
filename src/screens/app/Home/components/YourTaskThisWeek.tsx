import {scaler} from '@stylesCommon';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import useCheckPregnancy from '@util/hooks/useCheckPregnancy';
import {useSelector} from 'react-redux';

const YourTaskThisWeek = () => {
  const lang = useSelector((state: any) => state?.auth?.lang);

  const data =
    lang == 1
      ? [
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709135950499310876.png',
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709136060963582295.png',
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709136090467609196.png',
        ]
      : [
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709230482431101347.png',
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709230554570855420.png',
          'https://s3.ap-southeast-1.amazonaws.com/matida/1709230578880421783.png',
        ];

  const checkPlan = useCheckPregnancy();

  return (
    <View style={{flexDirection: 'row'}}>
      {data.map(item => {
        return (
          <TouchableOpacity
            onPress={checkPlan}
            style={{width: '30%', marginRight: scaler(16)}}>
            <Image
              source={{uri: item}}
              style={{
                width: '100%',
                height: scaler(184),
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default YourTaskThisWeek;
