import * as yup from 'yup';

export function initialValues() {
  return {
    expenseName: '',
    amount: 0,
    category: '',
  }
}

export function validationSchema() {
  return yup.object({
    expenseName: yup.string().required('Name is required'),
    amount: yup.number().required('Amount is required').min(1, 'Minimum amount is 1'),
  });
}