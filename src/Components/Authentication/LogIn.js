import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { inboxItemFill } from "../../store/inbox-slice";

function LogIn() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [inputRequire, setInputRequire] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const inboxItemFill = async () => {
  //   // Fill Inbox ----------------
  //   let email;
  //   if(auth.email === null){
  //     email = emailInputRef.current.value.replace(/[\.@]/g, "");
  //   } else {
  //     email = localStorage.getItem('userEmail').replace(/[\.@]/g, "");
  //   }
  //   try {
  //     const resInbox = await fetch(
  //       `https://mail-box-myreact-default-rtdb.firebaseio.com/${email}/recievedEmails.json`
  //     );

  //     const data = await resInbox.json();
  //     // console.log(Object.values(data));

  //     if (resInbox.ok) {
  //       dispatch(inboxActions.addItems(Object.values(data)));
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    if (enteredEmail === "" || enteredPass === "") {
      setInputRequire(true);
      return;
    }
    setInputRequire(false);

    try {
      const resLogin = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZwnRPs812ivpHogl048wXBfkjHdqDag4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await resLogin.json();

      if (resLogin.ok) {
        // console.log("Logged IN");
        dispatch(
          authActions.login({ tokenId: data.idToken, email: enteredEmail })
        );
        dispatch(inboxItemFill(enteredEmail));
        navigate("/profile", { replace: true });
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      alert(error);
    }
  };
 
  
  return (
    <Form>
      {inputRequire && <p style={{ color: "red" }}>*Please fill all inputs.</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          ref={emailInputRef}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passInputRef}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Link>Forgot password?</Link>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginSubmitHandler}>
        Log In
      </Button>
    </Form>
  );
}

export default LogIn;
