import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import '../styles/nav.scss';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
//import Search from "./SearchBar.jsx"

//import profilephoto from '../Images/profilephoto.png';
=======
import navbarbrand from '../assets/navbarbrand.png';
import defaultprofile from '../assets/defaultprofile.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import { motion } from "framer-motion";

const LoginButton = styled(motion.button)`
width: auto;
padding: 4px 22px 4px 22px;
font-weight: 500;
border-radius: 25px;
border: solid 1px #0A2540;
background-color: #0A2540;
font-size: 23;
color: white;
`;

const ProfileContainer = (
    <div className="profile">
    <img
    alt="ISDN Logo"
    src={defaultprofile}
    width="30"
    height="30"
    className="d-inline-block align-top"
    style={{ marginRight: 10 }}
    />
    <p style={{marginTop: 5}}>{localStorage.getItem("username")}</p>
    </div>
)
>>>>>>> parent of eeced29 (styling for login and navbar)

const TopBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }
<<<<<<< HEAD
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
=======

    return (
        <Navbar variant="light" expand="lg" className="shadow-sm">
          <Container fluid>
            <Navbar.Brand className="brand" href="/"><img
              alt="ISDN Logo"
              src={navbarbrand}
              width="130"
              height="40"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            /></Navbar.Brand>
>>>>>>> parent of eeced29 (styling for login and navbar)
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 navlinks"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
<<<<<<< HEAD
                <Nav.Link style={{ color: "white" }} href="/requests">Requests</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/users">Friends</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/conversations">Messages</Nav.Link>
                <NavDropdown style={{ color: "white", textTransform: "capitalize" }} title={localStorage.getItem("username")} id="navbarScrollingDropdown">
=======
                {localStorage.getItem("token") == null ? 
                <>
                <Nav.Link href="/login"><LoginButton whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>Login</LoginButton></Nav.Link>
                </>:
                <>
                <Nav.Link href="/"><NotificationsIcon /></Nav.Link>
                <NavDropdown style={{ textTransform: "capitalize"}} title={ProfileContainer} id="navbarProfileDropdown">
>>>>>>> parent of eeced29 (styling for login and navbar)
                  <NavDropdown.Item
                    onClick={() => {
                      if (localStorage.getItem("user_id") != null) {
                        navigate(`/profile/${localStorage.getItem("user_id")}`)
                      }
<<<<<<< HEAD
                    }}

                  >Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
=======
                    }}>
                    <AccountCircleIcon/>  Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate('/settings')}>
                    <SettingsIcon/>  Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    <LogoutIcon/>  Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
                }
>>>>>>> parent of eeced29 (styling for login and navbar)
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
<<<<<<< HEAD


      </>
    )

  }
=======
    )
>>>>>>> parent of eeced29 (styling for login and navbar)
}
export default TopBar;