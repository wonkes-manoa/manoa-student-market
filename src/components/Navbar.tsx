'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BoxArrowRight,
  Lock,
  PersonFill,
  PersonPlusFill,
  Trash,
} from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const username = session?.user?.username;
  const role = session?.user?.randomKey; // ADMIN or USER

  return (
    <Navbar
      expand="lg"
      className="bg-wonkes-4 border-bottom border-wonkes-7 shadow-sm"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-bold text-white"
          style={{ letterSpacing: '0.5px' }}
        >
          Wonkes Market
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="wonkes-navbar" />

        <Navbar.Collapse id="wonkes-navbar">
          <Nav className="me-auto text-white">
            {username && (
              <>
                <NavDropdown title={<span className="text-white">My Listings</span>} className="text-white">
                  <NavDropdown.Item
                    id="listings-favorite-nav"
                    href="/listings-favorite"
                    key="listings-favorite"
                    active={pathname === '/listings-favorite'}
                    className="bg-wonkes-4 text-white"
                  >
                    Favorited Listings
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="my-store-nav"
                    href="/my-store"
                    key="my-store"
                    active={pathname === '/my-store'}
                    className="bg-wonkes-4 text-white"
                  >
                    Added Listings
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  id="listings-view-nav"
                  href="/listings-view"
                  key="listings-view"
                  active={pathname === '/listings-view'}
                  className="text-white"
                >
                  View Listings
                </Nav.Link>

                <Nav.Link
                  href="/listings-add"
                  active={pathname === '/listings-add'}
                  className="text-white"
                >
                  Add Listing
                </Nav.Link>
              </>
            )}

            {username && role === 'ADMIN' && (
              <NavDropdown title={<span className="text-white">Admin Panel</span>}>
                <NavDropdown.Item
                  id="admin-user-management"
                  href="/admin/user-management"
                  key="admin-user-management"
                  active={pathname === '/admin/user-management'}
                  className="bg-wonkes-4 text-white"
                >
                  User Management
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-merch-management"
                  href="/admin/merch-management"
                  key="admin-merch-management"
                  active={pathname === '/admin/merch-management'}
                  className="bg-wonkes-4 text-white"
                >
                  Merch Management
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link
              href="/support"
              active={pathname === '/support'}
              className="text-white"
            >
              Support
            </Nav.Link>
          </Nav>

          <Nav>
            {username ? (
              <NavDropdown
                id="login-dropdown"
                title={<span className="text-white">{username}</span>}
                className="text-white"
              >
                <NavDropdown.Item
                  href="/auth/signout"
                  className="bg-wonkes-4 text-white"
                >
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="/auth/change-password"
                  className="bg-wonkes-4 text-white"
                >
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="/auth/delete-account"
                  className="bg-wonkes-4 text-white text-danger"
                >
                  <Trash />
                  {' '}
                  Delete Account
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                id="login-dropdown"
                title={<span className="text-white">Sign in</span>}
              >
                <NavDropdown.Item
                  id="login-dropdown-sign-in"
                  href="/auth/signin"
                  className="bg-wonkes-4 text-white"
                >
                  <PersonFill />
                  {' '}
                  Sign in
                </NavDropdown.Item>

                <NavDropdown.Item
                  id="login-dropdown-sign-up"
                  href="/auth/signup"
                  className="bg-wonkes-4 text-white"
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
