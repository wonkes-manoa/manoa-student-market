'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import GuestOnly from '@/components/GuestOnly';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { changePasswordByPasscode } from '@/lib/dbActions';
import { useState } from 'react';

export type ChangePasswordByPasscodeForm = {
  passcode : string;
  password : string;
  confirmPassword : string;
};

const schema = Yup.object({
  passcode: Yup.string()
    .required('Provide the passcode you received by email')
    .matches(/^[0-9]+$/, 'Each digit of the passcode is 0-9')
    .min(6, 'Passcode is 6 digits long')
    .max(6, 'Passcode is 6 digits long'),
  password: Yup.string()
    .required('Provide a new password for your account')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm your new password')
    .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
});

export default function ChangePasswordByPasscodePage() {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordByPasscodeForm>({ resolver: yupResolver(schema) });
  const [active, setActive] = useState(true);

  const onSubmit = async (data : ChangePasswordByPasscodeForm) => {
    setActive(false);
    // Send password reset passcode.
    const result = await changePasswordByPasscode({
      passcode: data.passcode,
      password: data.password,
    });

    // Check change password status.
    if (!result.ok) {
      swal('Error', result.message || 'Failed to change password', 'error');
      setActive(true);
      return;
    }

    // Congratulations to the user.
    await swal('Password activated', 'You may sign in with your new password', 'success', {
      timer: 2000,
    });
    reset();
    window.location.href = '/auth/signin';
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
                    <i className="bi bi-2-circle-fill me-2" />
                    Create New Password
                  </h1>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Passcode</Form.Label>
                      <input
                        type="text"
                        {...register('passcode')}
                        className={`form-control ${errors.passcode ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.passcode?.message}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </Form.Group>

                    <Button type="submit" className="w-100 bg-wonkes-1 border-0 fw-semibold" disabled={!active}>
                      Activate New Password
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Have problem with last step?
                  {' '}
                  <a className="link-wonkes" href="/auth/forgot-password">Step Back</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </GuestOnly>
  );
}
