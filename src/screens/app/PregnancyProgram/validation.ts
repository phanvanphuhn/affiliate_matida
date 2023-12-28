import React, {useState} from 'react';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  name: Yup.string()
    .required('error.pleaseEnterName')
    .matches(/^[a-zA-Z\s]+$/, 'error.pleaseEnterValidName'),
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
