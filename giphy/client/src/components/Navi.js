import React from "react";
import { NavbarText, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from './ProvideAuth';

function Navi() {
  let history = useHistory();
  let auth = useAuth();

  return(
    <Navbar color="secondary" container dark expand fixed="" light>
      <NavbarBrand tag={Link} to='/'>The Fat Piggy Bank</NavbarBrand>
        <Collapse isOpen={true} navbar>
      <Nav className="me-auto" navbar>
        {/* <NavItem>
          <NavLink tag={Link} to='/saved'>Saved</NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink tag={Link} to='/deposit'>Deposit</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/withdraw'>Withdraw</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/signup'>Create Account</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/delete'>Delete Account</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/search'>Wall-Street-Bets</NavLink>
        </NavItem>
        <NavItem>
          {auth.user ? 
            <NavLink onClick={() => { auth.signout(() => history.push('/'))}}>Log Out</NavLink> :
            <NavLink tag={Link} to='/login'>Log In</NavLink>}
        </NavItem>
      </Nav>
         <NavbarText> {(!auth.displayName) ? '' : ` | CURRENT USER: ${auth.displayName} |`}
           </NavbarText>
    </Collapse>
  </Navbar>
  )
}

export default Navi;