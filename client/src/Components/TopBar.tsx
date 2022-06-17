import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import '../styles/nav.scss';
import { useNavigate } from "react-router-dom";
//import Search from "./SearchBar.jsx"

//import profilephoto from '../Images/profilephoto.png';

const TopBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }
  if (localStorage.getItem("token") == null) {
    return (
      <>
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#0A2540" }}>
          <Container fluid>
            <Navbar.Brand className="brand" href="/"><img
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />{' '}Facebook</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0 navitems"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} href="/login">Login</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </>
    )
  } else {
    return (
      <>

        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#4267B2" }}>
          <Container fluid>
            <Navbar.Brand className="brand" href="/userhome"><img
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />{' '}Facebook</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 navlinks"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} href="/requests">Requests</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/users">Friends</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/conversations">Messages</Nav.Link>
                <NavDropdown style={{ color: "white", textTransform: "capitalize" }} title={localStorage.getItem("username")} id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      if (localStorage.getItem("user_id") != null) {
                        navigate(`/profile/${localStorage.getItem("user_id")}`)
                      }
                    }}

                  >Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </>
    )

  }
}
export default TopBar;