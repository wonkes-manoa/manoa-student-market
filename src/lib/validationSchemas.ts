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
  Name: Yup.string()
    .required('Name is required.')
    .max(255, 'Name must be less than 255 characters.'),

  Description: Yup.string()
    .required('Description is required.')
    .max(1000, 'Description must be less than 1000 characters.'),

  Price: Yup.number()
    .typeError('Price must be a number.')
    .positive('Price must be greater than zero.')
    .required('Price is required.'),

  StockStatus: Yup.string()
    .oneOf(['ON_STOCK', 'SOLD', 'RECALLED'], 'Invalid stock status.')
    .required('Stock status is required.'),

  Image: Yup.array()
    .of(Yup.string().url('Each image must be a valid URL.'))
    .min(0),

  Length: Yup.number()
    .typeError('Length must be a number.')
    .min(0)
    .required('Length is required.'),

  Width: Yup.number()
    .typeError('Width must be a number.')
    .min(0)
    .required('Width is required.'),

  Height: Yup.number()
    .typeError('Height must be a number.')
    .min(0)
    .required('Height is required.'),

  Mass: Yup.number()
    .typeError('Mass must be a number.')
    .min(0)
    .required('Mass is required.'),

  LUnit: Yup.string()
    .oneOf(['MILLIMETER',
      'CENTIMETER',
      'DECIMETER',
      'METER',
      'INCH',
      'FEET',
      'YARD',
      'MILE'], 'Invalid length unit.')
    .required('Length unit is required.'),

  WUnit: Yup.string()
    .oneOf(['MILLIMETER',
      'CENTIMETER',
      'DECIMETER',
      'METER',
      'INCH',
      'FEET',
      'YARD',
      'MILE'], 'Invalid width unit.')
    .required('Width unit is required.'),

  HUnit: Yup.string()
    .oneOf(['MILLIMETER',
      'CENTIMETER',
      'DECIMETER',
      'METER',
      'INCH',
      'FEET',
      'YARD',
      'MILE'], 'Invalid height unit.')
    .required('Height unit is required.'),

  MUnit: Yup.string()
    .oneOf(['MILLIGRAM',
      'GRAM',
      'KILOGRAM',
      'TON',
      'OUNCE',
      'POUND'], 'Invalid mass unit.')
    .required('Mass unit is required.'),

  Material: Yup.string()
    .oneOf(
      ['ALUMINUM', 'INTANGIBLE', 'IRON', 'TITANIUM', 'PAPER', 'PLASTIC', 'WOOD', 'OTHER'],
      'Invalid material type.',
    )
    .required('Material is required.'),

  Condition: Yup.string()
    .oneOf(['NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR'], 'Invalid condition.')
    .required('Condition is required.'),
});
