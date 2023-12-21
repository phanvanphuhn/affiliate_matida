import React, {useState} from 'react';

interface Props {}

const usePayment = (props: Props) => {
  const [state, setState] = useState();
  return {state};
};

export default usePayment;
