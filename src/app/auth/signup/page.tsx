'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createAccount } from '@/lib/dbActions';
import swal from 'sweetalert';
import GuestOnly from '@/components/GuestOnly';

type SignUpForm = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .transform((v) => (typeof v === 'string' ? v.toLowerCase() : v))
      .required('Username is required')
      .matches(/^[a-zA-Z0-9_@.]+$/, 'Username only allow alphabet letters, Arabic numerals, and _@.')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must not exceed 20 characters long'),

    email: Yup.string()
      .trim()
      .transform((v) => (typeof v === 'string' ? v.toLowerCase() : v))
      .required('A valid @hawaii.edu email address is required')
      .email('Enter a valid @hawaii.edu email address')
      .test(
        'hawaii-edu-domain',
        'Only @hawaii.edu email addresses are accepted',
        (value) => typeof value === 'string' && value.endsWith('@hawaii.edu'),
      ),

    firstName: Yup.string()
      .required('Legal first name is required')
      .matches(/^[A-Za-z]+$/, 'Only alphabet letters allowed')
      .max(150, 'Too long. Contact us if you do have a long first name'),

    lastName: Yup.string()
      .required('Legal last name is required')
      .matches(/^[A-Za-z]+$/, 'Only alphabet letters allowed')
      .max(150, 'Too long. Contact us if you do have a long last name'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),

    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // Create account.
    const result = await createAccount(data);

    // Check account creation status.
    if (!result.ok) {
      swal('Error', result.message || 'Failed to create account', 'error');
      return;
    }

    // Login with new account.
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      callbackUrl: '/listings-view',
    });
  };

  return (
    <GuestOnly>
      <main
        className="flex-grow-1 d-flex align-items-center bg-wonkes-7"
        style={{ minHeight: '70vh' }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={8}>
              <Card>
                <Card.Body>
                  <h1 className="text-center">Sign Up</h1>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      {/* Username */}
                      <Col md={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Username</Form.Label>
                          <input
                            type="text"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.username?.message}</div>
                        </Form.Group>

                        {/* First Name */}
                        <Form.Group className="form-group">
                          <Form.Label>First Name</Form.Label>
                          <input
                            type="text"
                            {...register('firstName')}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </Form.Group>

                        {/* Last Name */}
                        <Form.Group className="form-group">
                          <Form.Label>Last Name</Form.Label>
                          <input
                            type="text"
                            {...register('lastName')}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        {/* Email */}
                        <Form.Group className="form-group">
                          <Form.Label>Email Address</Form.Label>
                          <input
                            type="text"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.email?.message}</div>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="form-group">
                          <Form.Label>Password</Form.Label>
                          <input
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.password?.message}</div>
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="form-group">
                          <Form.Label>Confirm Password</Form.Label>
                          <input
                            type="password"
                            {...register('confirmPassword')}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Submit Button */}
                    <Form.Group className="form-group py-3">
                      <Row className="justify-content-center">
                        <Col>
                          <Button
                            type="submit"
                            className="w-100 fw-semibold bg-wonkes-1 border-0"
                          >
                            Register
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Body>

                <Card.Footer>
                  Already have an account?&nbsp;
                  <a id="login-link" className="link-wonkes" href="/auth/signin">Sign in</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </GuestOnly>
  );
};

export default SignUp;
