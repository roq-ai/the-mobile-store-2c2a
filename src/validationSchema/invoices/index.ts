import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  payment_method: yup.string().nullable(),
  discount_amount: yup.number().nullable(),
  invoice_status: yup.string().nullable(),
});
