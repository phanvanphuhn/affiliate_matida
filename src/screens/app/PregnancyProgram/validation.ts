import React, {useState} from 'react';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  phone: Yup.string().required('Please enter your phone number'),
  pregnant_week: Yup.string().required('Please enter your pregnancy week'),
});

export default validation;
