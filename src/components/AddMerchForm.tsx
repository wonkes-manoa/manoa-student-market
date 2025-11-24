'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { LengthUnit, MassUnit, MerchCondition, MerchMaterial, MerchStockStatus } from '@prisma/client';
import { addMerch } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddMerchSchema } from '@/lib/validationSchemas';
import MerchGallery from '@/components/MerchGallery';
import { Maybe } from 'yup';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';

const onSubmit = async (data: {
  AccountID: number,
  StockStatus: string;
  Price: number;
  Name: string;
  Description: string;
  Image?: Maybe<FileList | undefined>;
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
}, router: AppRouterInstance) => {
  const newMerch = await addMerch({
    AccountID: data.AccountID,
    StockStatus: data.StockStatus,
    Price: data.Price,
    Name: data.Name,
    Description: data.Description,
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
  const images = data.Image;
  if (images && images.length > 0) {
    const uploadData = new FormData();
    uploadData.append('MerchID', String(newMerch.MerchID));

    for (const image of images) {
      uploadData.append('Image', image);
    }

    const result = await fetch('/api/upload/merch-images', {
      method: 'POST',
      body: uploadData,
    });

    if (!result.ok) {
      console.error('Image upload failed');
    }
  }
  swal('Success', 'Your merch has been added', 'success', {
    timer: 2000,
  }).then(() => {
    router.push(`/merch-detail/${newMerch.MerchID}`);
  });
};

const AddMerchForm = ({ id } : { id : number }) => {
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = session?.user?.email || '';
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      setPreviewImages([]);
      return;
    }
    const previews: string[] = [];
    for (const file of files) {
      const url = URL.createObjectURL(file); // temporary preview URL
      previews.push(url);
    }
    setPreviewImages(previews);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
          <MerchGallery photograph={previewImages.map((url, index) => ({
            id: index,
            mimeType: '',
            base64: '',
            url,
          }))}
          />
        </Col>

        {/* RIGHT COLUMN - form fields */}
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Add Merchandise</h2>
              <Form onSubmit={handleSubmit((data) => onSubmit(data, router))}>
                <input type="hidden" {...register('AccountID')} value={id} />
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Name
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <input
                    type="text"
                    {...register('Name')}
                    className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Name?.message}</div>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Description
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <textarea
                    {...register('Description')}
                    rows={3}
                    className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Description?.message}</div>
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Price
                    <span className="text-danger">*</span>
                  </Form.Label>
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
                  <Form.Label>
                    Stock Status
                    <span className="text-danger">*</span>
                  </Form.Label>
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
                  <Form.Label>
                    Material
                    <span className="text-danger">*</span>
                  </Form.Label>
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
                  <Form.Label>
                    Condition
                    <span className="text-danger">*</span>
                  </Form.Label>
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
                  <Form.Label>
                    Upload Images
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register('Image')}
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  <Form.Text muted>
                    You can upload multiple photos at once; suggested 5-7 square photos.
                    <br />
                    Accepted formats: JPG, JPEG, PNG, WEBP, GIF, BMP, SVG, TIFF.
                  </Form.Text>
                </Form.Group>

                {/* Buttons */}
                <Row className="pt-3">
                  <Col>
                    <Button
                      type="submit"
                      className="w-100 bg-wonkes-1 border-0"
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => reset()}
                      variant="danger"
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
