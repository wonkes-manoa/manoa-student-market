'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import GuestOnly from '@/components/GuestOnly';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { sendPasswordResetPasscode } from '@/lib/dbActions';
import { useState } from 'react';

export type ForgotPasswordForm = {
  username : string;
  email : string;
};

const schema = Yup.object({
  username: Yup.string()
    .required('Provide the username of your account')
    .matches(/^[a-zA-Z0-9_@.]+$/, 'Username only allow alphabet letters, Arabic numerals, and _@.')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters long'),
  email: Yup.string()
    .trim()
    .transform((v) => (typeof v === 'string' ? v.toLowerCase() : v))
    .required('Provide the email address of your account')
    .email('Enter a valid @hawaii.edu email address')
    .test(
      'hawaii-edu-domain',
      'Hint: the correct email address is an @hawaii.edu email address',
      (value) => typeof value === 'string' && value.endsWith('@hawaii.edu'),
    ),
});

export default function ForgotPasswordPage() {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ resolver: yupResolver(schema) });
  const [active, setActive] = useState(true);

  const onSubmit = async (data : ForgotPasswordForm) => {
    setActive(false);
    // Send password reset passcode.
    const result = await sendPasswordResetPasscode({
      username: data.username,
      email: data.email,
    });

    // Check passcode sending status.
    if (!result.ok) {
      swal('Error', result.message || 'Something went wrong', 'error');
      return;
    }

    // Notify the user to check their inbox.
    await swal('Passcode Sent', `Sent to ${data.email}, check your inbox`, 'success', {
      timer: 8000,
    });
    reset();
    setActive(true);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <GuestOnly>
      <main className="flex-grow-1 d-flex align-items-center bg-wonkes-7" style={{ minHeight: '70vh' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={5}>
              <Card>
                <Card.Body>
                  <h1 className="text-center">
                    <i className="bi bi-1-circle-fill me-2" />
                    Get Passcode
                  </h1>

                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      {...register('username')}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </Form.Group>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </Form.Group>

                    <Button type="submit" className="w-100 bg-wonkes-1 border-0" disabled={!active}>
                      Get Passcode
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Have passcode ready?
                  {' '}
                  <a className="link-wonkes" href="/auth/change-password-by-passcode">Step 2</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </GuestOnly>
  );
}
