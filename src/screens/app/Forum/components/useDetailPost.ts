import React, {useReducer} from 'react';

const useDetailPost = (initialState: any) => {
  const [state, setState] = useReducer(
    (preState: any, newState: any) => ({
      ...preState,
      ...newState,
    }),
    {...initialState},
    preState => ({
      ...preState,
    }),
  );
  return [state, setState];
};

export default useDetailPost;
