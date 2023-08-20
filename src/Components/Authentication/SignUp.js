import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import classes from './SignUp.module.css';

function SignUp() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const conPassInputRef = useRef();
  const formRef = useRef();
  const [passMatch, setPassMatch] = useState(false);
  const [inputRequire, setInputRequire] = useState(false);

  

  const signUpHandler = async (e) => {
    e.preventDefault();
    // console.log('clicked')
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredConPass = conPassInputRef.current.value;
    if (enteredEmail === "" || enteredPass === "" || enteredConPass === "") {
      setInputRequire(true);
      return;
    }
    const extension = enteredEmail.split('@');
    
    if(extension[1] !== 'metro.com'){
      alert('Your email extension should be metro.com. e.g. name@metro.com')
      return;
    }
    setInputRequire(false);
    if (enteredPass !== enteredConPass) {
      setPassMatch(true);
      return;
    }
    setPassMatch(false);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZwnRPs812ivpHogl048wXBfkjHdqDag4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSequreToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Athentication Failed");
      } else {
        console.log("User successfully signed up.");
      }
    } catch (error) {
      alert(error);
    }
    formRef.current.reset();
  };

  return (
    <Form ref={formRef}>
      {inputRequire && (
        <p style={{ color: "red" }}>*Please fill all the inputs.</p>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email (name@metro.com)"
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
          placeholder="Password minimum length 6"
          ref={passInputRef}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          ref={conPassInputRef}
          required
        />
      </Form.Group>
      {passMatch && (
        <p style={{ color: "red" }}>
          *Password not Matched. Try again enter correct.
        </p>
      )}
      <Button variant="primary" type="submit" onClick={signUpHandler} >
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUp;
