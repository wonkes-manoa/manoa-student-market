'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { LengthUnit, MassUnit, Merch, MerchCondition, MerchMaterial, MerchStockStatus } from '@prisma/client';
import { editMerch } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditMerchSchema } from '@/lib/validationSchemas';
import MerchGallery from '@/components/MerchGallery';
import { Maybe } from 'yup';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import { getMerchImagesByMerchID, MerchImage } from '@/lib/merchImage';

const onSubmit = async (data: {
  MerchID: number,
  StockStatus: string;
  Price: number;
  Name: string;
  Description: string;
  Image?: Maybe<FileList | undefined>;
  Length?: number | null;
  Width?: number | null;
  Height?: number | null;
  Mass?: number | null;
  LUnit?: string | null;
  WUnit?: string | null;
  HUnit?: string | null;
  MUnit?: string | null;
  Material: string;
  Condition: string;
}, router: AppRouterInstance) => {
  console.log('A');
  const editedMerch = await editMerch({
    MerchID: data.MerchID,
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
    uploadData.append('MerchID', String(editedMerch.MerchID));

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
  swal('Success', 'Your merch has been edited', 'success', {
    timer: 2000,
  }).then(() => {
    router.push(`/merch-detail/${editedMerch.MerchID}`);
  });
};

const EditMerchForm = ({ merch } : { merch : Merch }) => {
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<MerchImage[]>([]);
  useEffect(() => {
    async function fetchImages() : Promise<void> {
      setPreviewImages(await getMerchImagesByMerchID(merch.MerchID, true));
    }
    fetchImages();
  }, [merch.MerchID]);
  const initialImages = previewImages;
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = session?.user?.email || '';
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      setPreviewImages([]);
      return;
    }
    const previews : MerchImage[] = [];
    let index : number = 0;
    for (const file of files) {
      const url = URL.createObjectURL(file); // temporary preview URL
      previews.push({
        id: ++index,
        mimeType: '',
        base64: '',
        url,
      });
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
      Name: merch.Name,
      Description: merch.Description,
      Price: merch.Price,
      StockStatus: merch.StockStatus,
      Length: merch.Length,
      Width: merch.Width,
      Height: merch.Height,
      Mass: merch.Mass,
      LUnit: merch.LUnit,
      WUnit: merch.WUnit,
      HUnit: merch.HUnit,
      MUnit: merch.MUnit,
      Material: merch.Material,
      Condition: merch.Condition,
    },
    resolver: yupResolver(EditMerchSchema),
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
          <MerchGallery photograph={previewImages} />
        </Col>

        {/* RIGHT COLUMN - form fields */}
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Edit Merchandise</h2>
              <Form onSubmit={handleSubmit((data) => onSubmit(data, router))}>
                <input type="hidden" {...register('MerchID')} value={merch.MerchID} />
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
                    <option key="--" value="--">
                      --
                    </option>
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
                      <Form.Label>
                        Length
                        <span className="text-primary">*</span>
                      </Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Length')}
                        className={`form-control ${errors.Length ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Length?.message}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select
                        {...register('LUnit')}
                        className={errors.LUnit ? 'is-invalid' : ''}
                      >
                        <option key="--" value="--">
                          --
                        </option>
                        {Object.keys(LengthUnit).map((key) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                          </option>
                        ))}
                      </Form.Select>
                      <div className="invalid-feedback">{errors.LUnit?.message}</div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Width
                        <span className="text-primary">*</span>
                      </Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Width')}
                        className={`form-control ${errors.Width ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Width?.message}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select
                        {...register('WUnit')}
                        className={errors.WUnit ? 'is-invalid' : ''}
                      >
                        <option key="--" value="--">
                          --
                        </option>
                        {Object.keys(LengthUnit).map((key) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                          </option>
                        ))}
                      </Form.Select>
                      <div className="invalid-feedback">{errors.WUnit?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Height
                        <span className="text-primary">*</span>
                      </Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Height')}
                        className={`form-control ${errors.Height ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Height?.message}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select
                        {...register('HUnit')}
                        className={errors.HUnit ? 'is-invalid' : ''}
                      >
                        <option key="--" value="--">
                          --
                        </option>
                        {Object.keys(LengthUnit).map((key) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                          </option>
                        ))}
                      </Form.Select>
                      <div className="invalid-feedback">{errors.HUnit?.message}</div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Mass
                        <span className="text-primary">*</span>
                      </Form.Label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('Mass')}
                        className={`form-control ${errors.Mass ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.Mass?.message}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select
                        {...register('MUnit')}
                        className={errors.MUnit ? 'is-invalid' : ''}
                      >
                        <option key="--" value="--">
                          --
                        </option>
                        {Object.keys(MassUnit).map((key) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase().replaceAll('_', ' ')}
                          </option>
                        ))}
                      </Form.Select>
                      <div className="invalid-feedback">{errors.MUnit?.message}</div>
                    </Form.Group>
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
                    <option key="--" value="--">
                      --
                    </option>
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
                    <option key="--" value="--">
                      --
                    </option>
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
                    accept="image/jpeg, image/png"
                    {...register('Image')}
                    className={`form-control ${errors.Image ? 'is-invalid' : ''}`}
                    onChange={handleImageChange}
                  />
                  <div className="invalid-feedback">{errors.Image?.message}</div>
                  <Form.Text muted>
                    Upload 1-9 photos. You can upload multiple photos at once. Square photos fits better.
                    <br />
                    Accepted formats: JPG (JPEG), PNG.
                  </Form.Text>
                </Form.Group>

                <Form.Text muted>
                  <span className="text-danger">*</span>
                  &nbsp;
                  are required fields.
                  <br />
                  <span className="text-primary">*</span>
                  &nbsp;
                  are required fields if you filled out the numeric field.
                </Form.Text>

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
                      onClick={() => {
                        reset();
                        setPreviewImages(initialImages);
                      }}
                      variant="danger"
                      className="w-100"
                    >
                      Recover
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

export default EditMerchForm;
