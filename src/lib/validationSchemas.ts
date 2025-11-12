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
  Price: Yup.number().positive().required('Price shall be positive.'),
  Name: Yup.string().required('Provide a merch name.'),
  Description: Yup.string().required('Describe your merch.'),
  Image: Yup.array().of(Yup.string()).min(0).required(),
  Length: Yup.number().min(0).required(),
  Width: Yup.number().min(0).required(),
  Height: Yup.number().min(0).required(),
  Mass: Yup.number().min(0).required(),
  LUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required(),
  WUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required(),
  HUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
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
  Material: Yup.string().oneOf([
    'ALUMINUM',
    'INTANGIBLE',
    'IRON',
    'TITANIUM',
    'PAPER',
    'PLASTIC',
    'WOOD',
    'OTHER',
  ]).required(),
  Condition: Yup.string().oneOf(['NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR']).required(),
});
