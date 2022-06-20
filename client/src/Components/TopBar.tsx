import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import '../styles/nav.scss';
import { useNavigate } from "react-router-dom";
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

const TopBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }

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
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 navlinks"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                {localStorage.getItem("token") == null ? 
                <>
                <Nav.Link href="/login"><LoginButton whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>Login</LoginButton></Nav.Link>
                </>:
                <>
                <Nav.Link href="/"><NotificationsIcon /></Nav.Link>
                <NavDropdown style={{ textTransform: "capitalize"}} title={ProfileContainer} id="navbarProfileDropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      if (localStorage.getItem("user_id") != null) {
                        navigate(`/profile/${localStorage.getItem("user_id")}`)
                      }
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}
export default TopBar;