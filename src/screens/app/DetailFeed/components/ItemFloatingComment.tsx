import React from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

const ItemFloatingComment = React.forwardRef((props: any, ref) => {
  const {data} = props
  console.log('index: ',ref)
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(()=>{
    fadeIn();

    const tout = setTimeout(() => {
      clearTimeout(tout);
      fadeOut();
    }, 2000);
  },[])

  return(
        <Animated.View
         style={[
           styles.fadingContainer,
           {
              //Bind opacity to animated value
             opacity: fadeAnim,
           },
         ]}>
          {data.map(item => {
          return <Text style={styles.fadingText}>{item.user}:{item.content}</Text>
          })}
       </Animated.View>
  )
})

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
})

export default ItemFloatingComment;
