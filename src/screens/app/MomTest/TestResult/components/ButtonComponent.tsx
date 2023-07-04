import {AppButton} from '@component';
import {EPreRoute} from '@constant';
import {NavigationUtils} from '@navigation';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type Props = {
  isPassed: boolean;
  redoTest: () => void;
  preRoute: string;
};

export const ButtonComponent = ({
  isPassed,
  redoTest = () => {},
  preRoute = EPreRoute.TEST_DETAIL,
}: Props) => {
  const {t} = useTranslation();
  const listButton = [
    {
      id: 1,
      label: isPassed ? t('test.doOtherTest') : t('test.redoTest'),
      backgroundColor: colors.success_message,
      color: colors.white,
      onClick: () => handlePressTopButton(),
    },
    {
      id: 2,
      label: t('test.maybeLater'),
      backgroundColor: colors.white,
      color: colors.textSmallColor,
      onClick: () => handlePressBottomButton(),
    },
  ];

  const handlePressBottomButton = () => {
    if (preRoute === EPreRoute.TEST_DETAIL) {
      NavigationUtils.pop(2);
    } else {
      NavigationUtils.goBack();
    }
  };

  const handlePressTopButton = () => {
    if (preRoute === EPreRoute.TEST_DETAIL) {
      if (isPassed) {
        NavigationUtils.pop(2);
      } else {
        redoTest();
        NavigationUtils.goBack();
      }
    } else {
      NavigationUtils.goBack();
    }
  };

  return (
    <View style={{padding: scaler(16), paddingBottom: scaler(30)}}>
      {/* {listButton.map(button => {
        return (
          <AppButton
            titleButton={button.label}
            onClick={button.onClick}
            key={button.id}
            customStyleButton={[
              {backgroundColor: button.backgroundColor},
              button.id === 1 && {marginBottom: scaler(8)},
            ]}
            customStyleText={{color: button.color}}
          />
        );
      })} */}
      {preRoute === EPreRoute.HISTORY ? null : (
        <AppButton
          titleButton={isPassed ? t('test.doOtherTest') : t('test.redoTest')}
          onClick={handlePressTopButton}
          customStyleButton={[
            {backgroundColor: colors.success_message, marginBottom: scaler(8)},
          ]}
          customStyleText={{color: colors.white}}
        />
      )}
      {/* {!!isPassed && preRoute !== EPreRoute.HISTORY ? null : (
        <AppButton
          titleButton={t('test.maybeLater')}
          onClick={handlePressBottomButton}
          customStyleButton={[{backgroundColor: colors.white}]}
          customStyleText={{color: colors.textSmallColor}}
        />
      )} */}
    </View>
  );
};
