import api from '../api';

const PAYMENT = 'payment/create-payment-intent';
const PAY_INVOICE = 'payment/pay-invoice';
const PAYMENT_SHEET = 'payment/create-payment-sheet';
const PAYMENT_CHECKING = 'payment/check-payment';

export const postPaymentIntent: any = async (modelId: any, type: number) => {
  const response = await api.post(PAYMENT, {modelId, type});
  return response;
};

export const postPaymentSheet: any = async (modelId: any, type: number) => {
  const response = await api.post(PAYMENT_SHEET, {modelId, type});
  return response;
};

export const postPaymentInvoice: any = async (
  modelId: any,
  type: number,
  status: number,
  errorMessage: string,
) => {
  const response = await api.post(PAY_INVOICE, {
    modelId,
    type,
    status,
    errorMessage,
  });
  return response;
};

export const getCheckingPayment: any = async () => {
  const response = await api.get(PAYMENT_CHECKING);
  return response;
};
