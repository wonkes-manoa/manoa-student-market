'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BoxArrowRight,
  Lock,
  PersonFill,
  PersonPlusFill,
} from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const username = session?.user?.username;
  const role = session?.user?.randomKey; // ADMINISTRATOR or USER

  return (
    <Navbar
      expand="lg"
      className="bg-wonkes-4 border-bottom border-wonkes-7 shadow-sm"
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          href="/listings-view"
          className="fw-bold text-light"
          style={{ letterSpacing: '0.5px' }}
        >
          Wonkes Market
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="wonkes-navbar" />

        <Navbar.Collapse id="wonkes-navbar">
          <Nav className="me-auto">

            <Nav.Link
              href="/support"
              active={pathname === '/support'}
              className="text-light"
            >
              Support
            </Nav.Link>

            {username && (
              <>
                <Nav.Link
                  id="my-store-nav"
                  href="/my-store"
                  key="my-store"
                  active={pathname === '/my-store'}
                  className="text-light"
                >
                  My Store
                </Nav.Link>
                <Nav.Link
                  id="listings-view-nav"
                  href="/listings-view"
                  key="listings-view"
                  active={pathname === '/listings-view'}
                  className="text-light"
                >
                  View Listings
                </Nav.Link>

                <Nav.Link
                  href="/listings-add"
                  active={pathname === '/listings-add'}
                  className="text-light"
                >
                  Add Listing
                </Nav.Link>
              </>
            )}

            {username && role === 'ADMINISTRATOR' && (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                key="admin"
                active={pathname === '/admin'}
                className="text-light"
              >
                Admin Home
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {username ? (
              <NavDropdown
                id="login-dropdown"
                title={<span className="text-light">{username}</span>}
                menuVariant="light"
                className="text-light"
              >
                <NavDropdown.Item
                  href="/auth/change-password"
                  className="bg-wonkes-4 text-light"
                >
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="/auth/signout"
                  className="bg-wonkes-4 text-light"
                >
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                id="login-dropdown"
                title={<span className="text-light">Log in</span>}
              >
                <NavDropdown.Item
                  id="login-dropdown-sign-in"
                  href="/auth/signin"
                  className="bg-wonkes-4 text-light"
                >
                  <PersonFill />
                  {' '}
                  Log in
                </NavDropdown.Item>

                <NavDropdown.Item
                  id="login-dropdown-sign-up"
                  href="/auth/signup"
                  className="bg-wonkes-4 text-light"
                >
                  <PersonPlusFill />
                  {' '}
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
