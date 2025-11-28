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
    .oneOf(
      Object.keys(MerchStockStatus) as (keyof typeof MerchStockStatus)[],
      'Should people see your merch right after you add it?',
    )
    .required('Should people see your merch right after you add it?'),
  Price: Yup.number()
    .typeError('Please enter a price')
    .positive('Price shall be positive')
    .required('Please enter a price'),
  Name: Yup.string()
    .required('Provide a merch name'),
  Description: Yup.string()
    .required('Describe your merch'),
  Image: Yup.mixed<FileList>()
    .test('minFiles', 'At least one photo is required', (value) => value && value.length >= 1)
    .test('maxFiles', 'You can upload at most 9 photos', (value) => value && value.length <= 9)
    .test('validFileTypes', 'Only JPG and PNG formats are allowed', (value) => {
      if (!value) {
        return false;
      }
      for (let i = 0; i < value.length; ++i) {
        const file = value[i];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          return false;
        }
      }

      return true;
    }),
  Length: Yup.number()
    .typeError('Please enter a length')
    .min(0, 'No negative length')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Width: Yup.number()
    .typeError('Please enter a width')
    .min(0, 'No negative width')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Height: Yup.number()
    .typeError('Please enter a height')
    .min(0, 'No negative height')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Mass: Yup.number()
    .typeError('Please enter a mass')
    .min(0, 'No negative mass')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  LUnit: Yup.string()
    .when('Length', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the length?',
      )
        .required('What is the unit for the length?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  WUnit: Yup.string()
    .when('Width', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the weight?',
      )
        .required('What is the unit for the weight?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  HUnit: Yup.string()
    .when('Height', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the height?',
      )
        .required('What is the unit for the height?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  MUnit: Yup.string()
    .when('Mass', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(MassUnit) as (keyof typeof MassUnit)[],
        'What is the unit for the mass?',
      )
        .required('What is the unit for the mass?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  Material: Yup.string()
    .oneOf(Object.keys(MerchMaterial) as (keyof typeof MerchMaterial)[], 'Specify the main material of your merch')
    .required(),
  Condition: Yup.string()
    .oneOf(Object.keys(MerchCondition) as (keyof typeof MerchCondition)[], 'Specify how is your merch now')
    .required(),
});

export const EditMerchSchema = Yup.object({
  MerchID: Yup.number()
    .required(),
  StockStatus: Yup.string()
    .oneOf(
      Object.keys(MerchStockStatus) as (keyof typeof MerchStockStatus)[],
      'Should people see your merch right after you add it?',
    )
    .required('Should people see your merch right after you add it?'),
  Price: Yup.number()
    .typeError('Please enter a price')
    .positive('Price shall be positive')
    .required('Please enter a price'),
  Name: Yup.string()
    .required('Provide a merch name'),
  Description: Yup.string()
    .required('Describe your merch'),
  Image: Yup.mixed<FileList>()
    .test('maxFiles', 'You can upload at most 9 photos', (value) => value && value.length <= 9)
    .test('validFileTypes', 'Only JPG and PNG formats are allowed', (value) => {
      if (!value) {
        return false;
      }
      for (let i = 0; i < value.length; ++i) {
        const file = value[i];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          return false;
        }
      }

      return true;
    }),
  Length: Yup.number()
    .typeError('Please enter a length')
    .min(0, 'No negative length')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Width: Yup.number()
    .typeError('Please enter a width')
    .min(0, 'No negative width')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Height: Yup.number()
    .typeError('Please enter a height')
    .min(0, 'No negative height')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  Mass: Yup.number()
    .typeError('Please enter a mass')
    .min(0, 'No negative mass')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  LUnit: Yup.string()
    .when('Length', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the length?',
      )
        .required('What is the unit for the length?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  WUnit: Yup.string()
    .when('Width', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the weight?',
      )
        .required('What is the unit for the weight?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  HUnit: Yup.string()
    .when('Height', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(LengthUnit) as (keyof typeof LengthUnit)[],
        'What is the unit for the height?',
      )
        .required('What is the unit for the height?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  MUnit: Yup.string()
    .when('Mass', {
      is: (val: any) => val !== undefined && val !== null && val !== '' && !Number.isNaN(val),
      then: (schema) => schema.oneOf(
        Object.keys(MassUnit) as (keyof typeof MassUnit)[],
        'What is the unit for the mass?',
      )
        .required('What is the unit for the mass?'),
      otherwise: (schema) => schema.notRequired().transform(() => null),
    })
    .nullable(),
  Material: Yup.string()
    .oneOf(Object.keys(MerchMaterial) as (keyof typeof MerchMaterial)[], 'Specify the main material of your merch')
    .required(),
  Condition: Yup.string()
    .oneOf(Object.keys(MerchCondition) as (keyof typeof MerchCondition)[], 'Specify how is your merch now')
    .required(),
});
