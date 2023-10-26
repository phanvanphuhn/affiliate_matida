import {SvgArrowBackLogin} from '@images';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

import {event, eventType, trackingAppEvent} from '@util';
import {Step1} from './Component/Step1';
import {Step2} from './Component/Step2';
import {Step3} from './Component/Step3';

const SignUp = (props: any) => {
  const {visible, closeModal, onOpenSignIn, onSuccess, loginSocial} = props;

  const [step, setStep] = useState(1);
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState(null);
  const [codePhone, setCodePhone] = useState(null);

  useEffect(() => {
    if (visible === false) {
    } else {
      trackingAppEvent(event.SCREEN.SIGN_UP, {}, eventType.AFF_FLYER);
    }
  }, [visible]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onOpenSignIn={onOpenSignIn}
            onChangeStep={() => setStep(2)}
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
            onOpenSignIn={() => {
              onOpenSignIn();
              setStep(1);
            }}
          />
        );
      case 3:
        return (
          <Step3
            onChangeStep={(value: any) => {
              closeModal();
              onSuccess(value);
            }}
            token={token}
            phone={phone}
            codePhone={codePhone}
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

export {SignUp};
