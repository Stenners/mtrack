import React from "react";
import { Navbar, NavbarItem, NavbarMenu, NavbarStart, Container } from "bloomer";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar>
      <NavbarMenu>
        <Container>
          <NavbarStart>
            <NavbarItem>
              <Link to="/">Home</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/transactions">Transactions</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/upload">Upload</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/categories">Categories</Link>
            </NavbarItem>
          </NavbarStart>
        </Container>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
