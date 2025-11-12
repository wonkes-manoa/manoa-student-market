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
  Price: Yup.number().positive().required('Price shall be positive.').default(0),
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
  ]).required().default('INCH'),
  WUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required().default('INCH'),
  HUnit: Yup.string().oneOf([
    'MILLIMETER',
    'CENTIMETER',
    'DECIMETER',
    'INCH',
    'FEET',
    'YARD',
    'MILE',
  ]).required().default('INCH'),
  MUnit: Yup.string().oneOf([
    'MILLIGRAM',
    'GRAM',
    'KILOGRAM',
    'TON',
    'OUNCE',
    'POUND',
  ]).required().default('KILOGRAM'),
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
