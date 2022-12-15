import { Component } from "react";
import { Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from "reactstrap";
import logo from './Logo.png';


function App(){
    const token = getToken();
    function getToken() {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
    function logout(){
        sessionStorage.clear();
        //if(token)
          //alert("Logged out!");
    }

    return(
      <div>
    <Navbar
    color="success"
    dark
    expand="md"
    light
    >
    <NavbarBrand href="/">
    <img src={logo} alt="Logo" height={'60px'}/>
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
        </NavItem>
      </Nav>
      <NavItem>
          <Button href='/' color="dark" onClick={logout}>
            Logout
          </Button>
        </NavItem>
    </Collapse>
  </Navbar>
</div>
        )
    }
    export default App;