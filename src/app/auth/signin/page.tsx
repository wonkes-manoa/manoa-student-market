'use client';

import { getCsrfToken, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');

  // MUST USE useEffect, not useState
  useEffect(() => {
    getCsrfToken().then(token => {
      if (token) setCsrfToken(token);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value.trim();
    const password = target.password.value.trim();

    if (!username || !password) {
      setLoading(false);
      swal('Missing information', 'Please enter both username and password', 'warning');
      return;
    }

    const result = await signIn('credentials', {
      redirect: false, // must disable redirect
      username,
      password,
    });

    setLoading(false);

    if (result?.ok) {
      swal('Welcome back!', 'You are now logged in', 'success', { timer: 2000 })
        .then(() => window.location.href = '/list');
    } else {
      swal('Login failed', 'Invalid login credential', 'error');
    }
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center bg-wonkes-7" style={{ minHeight: '70vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Login</h1>
                <Form method="post" onSubmit={handleSubmit}>

                  {/* CSRF token MUST be inside the form */}
                  <input type="hidden" name="csrfToken" value={csrfToken} />

                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <input name="username" type="text" className="form-control" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>

                  <Button type="submit" disabled={loading} className="w-100 fw-semibold bg-wonkes-1 border-0 mt-3">
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>

              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?
                {' '}
                <a className="link-wonkes" href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
