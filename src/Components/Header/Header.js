import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { inboxActions } from "../../store/inbox-slice";
import { sentboxActions } from "../../store/sentbox-slice";
import classes from "./Header.module.css";

function Header() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickLogoutHandler = () => {
    dispatch(inboxActions.onLogoutInboxNull());
    dispatch(sentboxActions.onLogoutSentboxNull());
    navigate('/', {replace: true})
    dispatch(authActions.logout());
    
    console.log(auth)
  }

  return (
      <Navbar className={classes["bg-body-tertiary"]}>
        <Container className={classes.navcon}>
          <Navbar.Brand href="#home" className={classes.brand}>
            Metro Mail
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {auth.isLoggedIn && <Navbar.Text>
              Signed in as: <a href="/Profile">{auth.email.split('@')[0]}</a>
            </Navbar.Text>}
          </Navbar.Collapse>
          </Container> 
          {auth.isLoggedIn && <Button variant="warning" style={{marginLeft: '1rem'}} onClick={clickLogoutHandler}>Logout</Button>}
        
      </Navbar>
      
  );
}

export default Header;
