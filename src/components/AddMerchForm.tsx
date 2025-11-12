'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { LengthUnit, MassUnit, MerchCondition, MerchMaterial, MerchStockStatus } from '@prisma/client';
import { addMerch } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddMerchSchema } from '@/lib/validationSchemas';
import MerchGallery from '@/components/MerchGallery';

const onSubmit = async (data: {
  AccountID: number,
  StockStatus: string;
  Price: number;
  Name: string;
  Description: string;
  Image: (string | undefined)[] | undefined;
  Length: number;
  Width: number;
  Height: number;
  Mass: number;
  LUnit: string;
  WUnit: string;
  HUnit: string;
  MUnit: string;
  Material: string;
  Condition: string;
}) => {
  const cleanImages: string[] = (data.Image || []).filter(
    (img): img is string => typeof img === 'string' && img.trim() !== '',
  );
  await addMerch({
    AccountID: data.AccountID,
    StockStatus: data.StockStatus,
    Price: data.Price,
    Name: data.Name,
    Description: data.Description,
    Image: cleanImages,
    Length: data.Length,
    Width: data.Width,
    Height: data.Height,
    Mass: data.Mass,
    LUnit: data.LUnit,
    WUnit: data.WUnit,
    HUnit: data.HUnit,
    MUnit: data.MUnit,
    Material: data.Material,
    Condition: data.Condition,
  });
  swal('Success', 'Your merch has been added', 'success', {
    timer: 2000,
  });
};

const AddMerchForm = ({ id } : { id : number }) => {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Image: [],
      LUnit: 'CENTIMETER',
      WUnit: 'CENTIMETER',
      HUnit: 'CENTIMETER',
      MUnit: 'KILOGRAM',
      StockStatus: 'ON_STOCK',
      Material: 'PLASTIC',
      Condition: 'GOOD',
    },
    resolver: yupResolver(AddMerchSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center g-4">
        {/* LEFT COLUMN - image preview */}
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <MerchGallery photograph={[]} />
        </Col>

        {/* RIGHT COLUMN - form fields */}
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Add Merchandise</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('AccountID')} value={id} />
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('Name')}
                    className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Name?.message}</div>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('Description')}
                    rows={3}
                    className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Description?.message}</div>
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('Price')}
                    className={`form-control ${errors.Price ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Price?.message}</div>
                </Form.Group>

                {/* Stock Status */}
                <Form.Group className="mb-3">
                  <Form.Label>Stock Status</Form.Label>
                  <Form.Select
                    {...register('StockStatus')}
                    className={errors.StockStatus ? 'is-invalid' : ''}
                  >
                    {Object.keys(MerchStockStatus).map((key) => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.StockStatus?.message}</div>
                </Form.Group>

                {/* Dimensions and units */}
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Length</Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Length')}
                        className={`form-control ${errors.Length ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Length?.message}</div>
                    </Form.Group>
                    <Form.Select {...register('LUnit')} className="mb-3">
                      {Object.keys(LengthUnit).map((key) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Width</Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Width')}
                        className={`form-control ${errors.Width ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Width?.message}</div>
                    </Form.Group>
                    <Form.Select {...register('WUnit')} className="mb-3">
                      {Object.keys(LengthUnit).map((key) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Height</Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Height')}
                        className={`form-control ${errors.Height ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Height?.message}</div>
                    </Form.Group>
                    <Form.Select {...register('HUnit')} className="mb-3">
                      {Object.keys(LengthUnit).map((key) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Mass</Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Mass')}
                        className={`form-control ${errors.Mass ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Mass?.message}</div>
                    </Form.Group>
                    <Form.Select {...register('MUnit')} className="mb-3">
                      {Object.keys(MassUnit).map((key) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                {/* Material */}
                <Form.Group className="mb-3">
                  <Form.Label>Material</Form.Label>
                  <Form.Select
                    {...register('Material')}
                    className={errors.Material ? 'is-invalid' : ''}
                  >
                    {Object.keys(MerchMaterial).map((key) => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.Material?.message}</div>
                </Form.Group>

                {/* Condition */}
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select
                    {...register('Condition')}
                    className={errors.Condition ? 'is-invalid' : ''}
                  >
                    {Object.keys(MerchCondition).map((key) => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.Condition?.message}</div>
                </Form.Group>

                {/* Upload images */}
                <Form.Group className="mb-4">
                  <Form.Label>Upload Images</Form.Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register('Image')}
                    className="form-control"
                  />
                  <Form.Text muted>
                    You can upload multiple images (JPG, PNG).
                  </Form.Text>
                </Form.Group>

                {/* Buttons */}
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary" className="w-100">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => reset()}
                      variant="warning"
                      className="w-100"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMerchForm;
