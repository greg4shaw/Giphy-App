import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { ProvideAuth, useAuth } from './ProvideAuth';


function Navi() {
  let history = useHistory();
  let auth = useAuth();

  // return(
  //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //     <div className="container-fluid">
  //       <a
  //         className="navbar-brand"
  //         href="/"
  //         data-toggle="tooltip"
  //         data-placement="bottom"
  //         title="Home Sweet Home"
  //       >
  //        Fat Pig Bank
  //       </a>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarSupportedContent"
  //         aria-controls="navbarSupportedContent"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //           <li className="nav-item">
  //             <a
  //               className="btn btn-outline-primary"
  //               type="button"
  //               aria-current="page"
  //               href="/signup/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="Want to join us? Here is where you can create a new account."
  //             >
  //               Create Account
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             {/* <a
  //               className="btn btn-outline-secondary"
  //               type="button"
  //               aria-current="page"
  //               href="/login/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="This is where you log in if you are an existing customer. Easy Peasy." */}
  //             {/* >           */}
  //             {auth.user ? 
  //               <a onClick={() => {
  //                 auth.signout(() => history.push('/'))
  //               }}
  //               className="btn btn-outline-secondary"
  //               type="button"
  //               aria-current="page"
  //               href="/login/"
  //               data-toggle="tooltip"
  //               data-placement="bottom">Log Out</a> :
  //               <a className="btn btn-outline-secondary"
  //               type="button"
  //               aria-current="page"
  //               href="/login/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="This is where you log in if you are an existing customer. Easy Peasy.">Log In</a>
  //             }
              
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="btn btn-outline-success"
  //               type="button"
  //               aria-current="page"
  //               href="/deposit/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="Want to add $ to your account? Click here."
  //             >
  //               Deposit
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="btn btn-outline-danger"
  //               type="button"
  //               aria-current="page"
  //               href="/withdraw/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="Need $ from your account? Click here."
  //             >
  //               Withdraw
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="btn btn-outline-info"
  //               type="button"
  //               aria-current="page"
  //               href="/delete/"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //               title="Check out all the Bank Bank's customer details, but please don't tell anyone..."
  //             >
  //               Delete Account
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="btn btn-outline-info"
  //               type="button"
  //               aria-current="page"
  //               data-toggle="tooltip"
  //               data-placement="bottom"
  //             >
  //               {(!auth.displayName) ? '' : `CURRENT USER: ${auth.displayName}`}
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  // );

  return(
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to='/'>Bad Bank</NavbarBrand>
        <Collapse isOpen={true} navbar>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to='/search'>Search</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to='/saved'>Saved</NavLink>
        </NavItem>
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
          {auth.user ? 
            <NavLink onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Log Out</NavLink> :
            <NavLink tag={Link} to='/login'>Log In</NavLink>
          }
        </NavItem>
        <NavItem>
          <NavLink>{(!auth.displayName) ? '' : `CURRENT USER: ${auth.displayName}`} </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  )
}


export default Navi;