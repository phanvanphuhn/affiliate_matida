import React, {createContext, useContext, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface BoostProviderProps<S> {
  children: React.ReactNode;
  state: S;
  setState: (value: S) => void;
}

interface IContextContainer<S> {
  state: S;
  setState: (value: S) => void;
}
export const ContainerContext = createContext<IContextContainer<any>>({
  state: {
    filter: null,
    isShowNewBorn: null,
    data: null,
    isShowContent: null,
  },
  setState: (value: any) => value,
});
export function useContainerContext<S>() {
  return useContext<IContextContainer<S>>(ContainerContext);
}
function ContainerProvider<S>(props: BoostProviderProps<S>) {
  return (
    <ContainerContext.Provider value={{...props}}>
      {props.children}
    </ContainerContext.Provider>
  );
}

export default ContainerProvider;

const styles = StyleSheet.create({
  container: {},
});
