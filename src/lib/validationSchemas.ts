import { LengthUnit, MassUnit, MerchCondition, MerchMaterial, MerchStockStatus } from '@prisma/client';
import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddMerchSchema = Yup.object({
  AccountID: Yup.number()
    .required(),
  StockStatus: Yup.string()
    .oneOf(Object.keys(MerchStockStatus) as (keyof typeof MerchStockStatus)[])
    .required(),
  Price: Yup.number()
    .typeError('Please enter a price.')
    .positive('Price shall be positive.')
    .required('Please enter a price.'),
  Name: Yup.string()
    .required('Provide a merch name.'),
  Description: Yup.string()
    .required('Describe your merch.'),
  Image: Yup.mixed<FileList>()
    .test('fileType', 'Invalid file type', (value) => {
      if (!value || value.length === 0) return true; // allow empty (optional)
      for (let i = 0; i < value.length; i++) {
        const file = value[i];
        if (!file.type.startsWith('image/')) return false;
      }
      return true;
    })
    .notRequired(),
  Length: Yup.number()
    .typeError('Please enter a length.')
    .min(0, 'No negative length.')
    .required(),
  Width: Yup.number()
    .typeError('Please enter a width.')
    .min(0, 'No negative width.')
    .required(),
  Height: Yup.number()
    .typeError('Please enter a height.')
    .min(0, 'No negative height.')
    .required(),
  Mass: Yup.number()
    .typeError('Please enter a length.')
    .min(0, 'No negative mass.')
    .required(),
  LUnit: Yup.string()
    .oneOf(Object.keys(LengthUnit) as (keyof typeof LengthUnit)[])
    .required(),
  WUnit: Yup.string()
    .oneOf(Object.keys(LengthUnit) as (keyof typeof LengthUnit)[])
    .required(),
  HUnit: Yup.string()
    .oneOf(Object.keys(LengthUnit) as (keyof typeof LengthUnit)[])
    .required(),
  MUnit: Yup.string()
    .oneOf(Object.keys(MassUnit) as (keyof typeof MassUnit)[])
    .required(),
  Material: Yup.string()
    .oneOf(Object.keys(MerchMaterial) as (keyof typeof MerchMaterial)[])
    .required(),
  Condition: Yup.string()
    .oneOf(Object.keys(MerchCondition) as (keyof typeof MerchCondition)[])
    .required(),
});
