import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import ItemFloatingComment from './ItemFloatingComment'

const ListFloatingComment = (props: any) => {
  const dataMessage = [
    {
      id: 1,
      user: 'Phu',
      content: 'Hello'
    },
    {
      id: 2,
      user: 'Phu',
      content: 'Hello2'
    },
    {
      id: 3,
      user: 'Phu',
      content: 'Hello3'
    }
  ]

  let index = useRef(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      index.current++;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return(
    <ItemFloatingComment data={dataMessage} index={index}/>
  )
}

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
})

export default ListFloatingComment;
