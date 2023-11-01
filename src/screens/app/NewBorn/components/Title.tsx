import {scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TProps = {
  page: Number;
};

const Title = (props: TProps) => {
  const {page} = props;

  const renderTitle = () => {
    switch (page) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>
              On which date was your baby born?
            </Text>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>
              What time was your baby born?
            </Text>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>What is your baby's name?</Text>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>What is your baby's gender?</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>How was you deliver?</Text>
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>What was your baby's weight?</Text>
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>What was your baby's height?</Text>
          </>
        );
      case 8:
        return (
          <>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.description}>
              Have you got any picture of the baby?
            </Text>
          </>
        );
      case 9:
        return (
          <>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.title}>the Newborn journey!</Text>
          </>
        );
      default:
        return (
          <>
            <Text style={styles.title}>Hi Mom,</Text>
            <Text style={styles.description}>Has your baby been born yet?</Text>
          </>
        );
    }
  };

  return <>{renderTitle()}</>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: scaler(12),
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Title;
