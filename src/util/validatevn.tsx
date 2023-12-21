//Đây là nơi chứa tất cả các validate của formik
import * as yup from 'yup';
const nameRegExp = /^[\u0000-\u007F\u0080-\u00FF\u0100-\u024F0-9\s]*$/u;
export const validateFormVN = () => {
  return {
    name: yup
      .string()
      // .matches(/^[a-zA-Z ]*$/, 'Xin vui lòng nhập vào một tên hợp lệ')
      .test(
        'no-leading-trailing-space',
        'Không thể chứa dấu cách ở đầu hoặc cuối',
        value => {
          if (value && value.trim() !== value) {
            return false;
          }
          return true;
        },
      )
      .matches(nameRegExp, 'Xin vui lòng nhập vào một tên hợp lệ')
      .required('Đây là một trường bắt buộc')
      .max(50, 'Tên của bạn không được lớn hơn 50 ký tự'),
    username: yup
      .string()
      .required('Đây là một trường bắt buộc')
      .min(3, 'Tên tài khoản không được nhỏ hơn 3 ký tự')
      .max(50, 'Tên tài khoản của bạn không được lớn hơn 50 ký tự')
      .matches(/^[^\s]+$/, 'Không được chứa dấu cách')
      .matches(
        /^[^ !"`'#%&,:;<>={}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
        'Tên tài khoản không được chứa ký tự đặc biệt',
      ),
    babyName: yup
      .string()
      .nullable(true)
      // .required('Đây là trường bắt buộc')
      .test(
        'no-leading-trailing-space',
        'Không thể chứa dấu cách ở đầu hoặc cuối',
        value => {
          if (value && value.trim() !== value) {
            return false;
          }
          return true;
        },
      )
      .max(50, 'Nickname không được lớn hơn 50 ký tự'),

    phone: yup
      .string()
      // .required('Đây là trường bắt buộc')
      .matches(
        /^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\-\/\\\?\[\]\^\|]+$/,
        'Số điện thoại không hợp lệ',
      )
      .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
      .min(8, 'Số điện thoại không được nhỏ hơn 8 ký tự')
      .max(20, 'Số điện thoại không được lớn hơn 20 ký tự'),
    email: yup
      .string()
      .matches(/^[^\s]+$/, 'Không được chứa dấu cách')
      .email('Email không hợp lệ'),
    callingCode: yup.string(),
    require: yup.string().required('Đây là trường bắt buộc'),
    participants: yup.array().of(yup.object()).min(0),
    description: yup
      .string()
      .required('Đây là trường bắt buộc')
      .min(50, 'Mô tả không được ngắn hơn 50 ký tự'),
  };
};
