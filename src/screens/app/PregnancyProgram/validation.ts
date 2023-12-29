import React, {useState} from 'react';
import * as Yup from 'yup';
const nameRegExp = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]+$/;

const validation = Yup.object().shape({
  name: Yup.string()
    .required('error.pleaseEnterName')
    .matches(nameRegExp, 'error.pleaseEnterValidName'),
  phone: Yup.string()
    .required('error.pleaseEnterPhone')
    .min(10, 'error.pleaseEnterValidPhone'),
  pregnant_week: Yup.number()
    .required('error.pleaseEnterPregnancyWeek')
    .integer('error.pleaseEnterValidPregnancyWeek')
    .max(40, 'error.pregnancyWeekCannot')
    .min(1, 'error.pregnancyWeekCannotLower'),
});

export default validation;
