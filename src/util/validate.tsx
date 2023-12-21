//Đây là nơi chứa tất cả các validate của formik
import * as yup from 'yup';
const nameRegExp = /^[^\d`~!@#$%^&*()_+=[\]{}|\\;:'",<.>/?]+$/;
export const validateForm = () => {
  return {
    name: yup
      .string()
      .test(
        'no-leading-trailing-space',
        'Cannot contain spaces at the beginning or end',
        value => {
          if (value && value.trim() !== value) {
            return false;
          }
          return true;
        },
      )
      .matches(nameRegExp, 'Please enter a valid name')
      .required('This is a field required')
      .max(50, 'Your name may not be greater than 50 characters'),
    username: yup
      .string()
      .required('This is a field required')
      .min(3, 'User name must be at least 3 characters')
      .matches(/^[^\s]+$/, 'Cannot contain space')
      .matches(
        /^[^ !"`'#%&,:;<>={}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
        'Nick name is not special characters',
      )
      .max(50, 'User name may not be greater than 50 characters'),
    babyName: yup
      .string()
      .nullable(true)
      // .required('This is a field required')
      .test(
        'no-leading-trailing-space',
        'Cannot contain spaces at the beginning or end',
        value => {
          if (value && value.trim() !== value) {
            return false;
          }
          return true;
        },
      )
      .max(50, 'Nick name may not be greater than 50 characters'),
    phone: yup
      .string()
      // .required('This is a field required')
      .matches(
        /^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
        'Phone number is not special characters',
      )
      .matches(/^[0-9]+$/, 'Phone number is not invalid')
      .min(8, 'Phone must be at least 8 characters')
      .max(20, 'Phone may not be greater than 20 characters'),
    email: yup
      .string()
      .matches(/^[^\s]+$/, 'Cannot contain space')
      .email('Email is not valid'),
    callingCode: yup.string(),
    require: yup.string().required('This is a field required'),
    participants: yup.array().of(yup.object()).min(0),
    description: yup
      .string()
      .required('This is a field required')
      .min(50, 'Description cannot be shorter than 50 characters'),
  };
};
