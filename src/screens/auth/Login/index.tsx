import {SvgArrowBackLogin} from '@images';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

import {ROUTE_NAME} from '@routeName';
import {
  event,
  eventType,
  trackEventBranch,
  trackingAppEvent,
  useUXCam,
} from '@util';
import {Step1} from './Component/Step1';
import {Step2} from './Component/Step2';
import {Step3} from './Component/Step3';

const Login = (props: any) => {
  const {visible, closeModal, onOpenSignUp, onSuccess, loginSocial} = props;

  const [step, setStep] = useState(1);
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState(null);
  const [codePhone, setCodePhone] = useState(null);

  useUXCam(ROUTE_NAME.LOGIN);

  useEffect(() => {
    if (visible === false) {
      setStep(1);
    } else {
      trackingAppEvent(event.SCREEN.LOGIN, {}, eventType.AFF_FLYER);
      trackEventBranch(event.BRANCH.LOGIN, {});
    }
  }, [visible]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onOpenSignUp={onOpenSignUp}
            onChangeStep={() => {
              trackingAppEvent(event.LOGIN.PHONE_NUMBER, {}, eventType.MIX_PANEL);
              setStep(2)
            }}
            loginSocial={(value: any) => {
              closeModal();
              loginSocial(value);
            }}
          />
        );
      case 2:
        return (
          <Step2
            onChangeStep={(token: any, phone: any, codePhone: any) => {
              setPhone(phone);
              setToken(token);
              setCodePhone(codePhone);
              setStep(3);
            }}
          />
        );
      case 3:
        return (
          <Step3
            token={token}
            phone={phone}
            codePhone={codePhone}
            onChangeStep={(value: any) => {
              closeModal();
              onSuccess(value);
            }}
          />
        );
    }
  };

  const handleBackAction = () => {
    switch (step) {
      case 1:
        closeModal();
        break;
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(2);
        break;
    }
  };

  return (
    <View style={styles.containerModal}>
      <View
        style={styles.viewOut}
        //@ts-ignore
        // onStartShouldSetResponder={closeModal}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBackAction}
          style={{alignSelf: 'flex-start'}}>
          <SvgArrowBackLogin style={styles.iconBack} />
        </TouchableOpacity>
        <>{renderStep()}</>
      </View>
    </View>
  );
};

export {Login};
