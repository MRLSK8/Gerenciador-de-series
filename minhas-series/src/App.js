import React from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler
} from "reactstrap";

function App() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Minhas series</NavbarBrand>
        <NavbarToggler></NavbarToggler>
        <Collapse isOpen={true} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Genêros</NavLink>
              <NavLink href="/">Idiomas</NavLink>
              <NavLink href="/">Autores</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default App;
