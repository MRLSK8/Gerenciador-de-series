import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler
} from 'reactstrap';

function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Navbar color="light" light expand="md">
      <div className="container">
        <NavbarBrand tag={Link} to="/">
          Minhas series
        </NavbarBrand>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/series">
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/Generos">
                Genêros
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
