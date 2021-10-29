import { Collapse,Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from './ProvideAuth';

function Navi() {
  let history = useHistory();
  let auth = useAuth();


  return(
    <Navbar color="light" light expand="md">
    <NavbarBrand tag={Link} to='/'>Giphy</NavbarBrand>
    <Collapse isOpen={true} navbar>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to='/search'>Search</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/saved'>Saved</NavLink>
        </NavItem>
        <NavItem>
          {auth.user ? 
            <NavLink onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Log Out</NavLink> :
            <NavLink tag={Link} to='/login'>Log In</NavLink>
          }
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  )
}


export default Navi;