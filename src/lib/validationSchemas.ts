import { MerchMaterial } from '@prisma/client';
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
  AccountID: Yup.number().required(),
  StockStatus: Yup.string().oneOf(['ON_STOCK', 'SOLD', 'RECALLED']).required(),
  Price: Yup.number()
    .typeError('Please enter a price.')
    .positive('Price shall be positive.')
    .required('Please enter a price.'),
  Name: Yup.string().required('Provide a merch name.'),
  Description: Yup.string().required('Describe your merch.'),
  Image: Yup.array().of(Yup.string()).default([]),
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
  LUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'METER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required(),
  WUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'METER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required(),
  HUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'METER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required(),
  MUnit: Yup.string().oneOf([
    'MILLIGRAM',
    'GRAM',
    'KILOGRAM',
    'TON',
    'OUNCE',
    'POUND',
  ]).required(),
  Material: Yup.string()
    .oneOf(Object.keys(MerchMaterial) as (keyof typeof MerchMaterial)[])
    .required(),
  Condition: Yup.string().oneOf(['NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR']).required(),
});
