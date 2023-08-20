import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Compose.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputGroup from "react-bootstrap/InputGroup";
import { EditorState } from "draft-js";

import { useSelector } from "react-redux";
import { convertToHTML } from "draft-convert";

const Compose = () => {
  const sendToEmailInputRef = useRef();
  const subInputRef = useRef();
  const formRef = useRef();
  const auth = useSelector((state) => state.auth);
  const [emptyEmail, setEmptyEmail] = useState();
  const [successFullySentMail, updateSuccessFullySentMail] = useState(false);

  const [editorState, updateEditorState] = useState(EditorState.createEmpty());

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    // console.log(sendToEmailInputRef.current.value, subInputRef.current.value);
    // console.log(convertToRaw(editorState.getCurrentContent()).blocks);
    if (sendToEmailInputRef.current.value === "") {
      // alert('Please fill recipient email')
      setEmptyEmail("*Please enter recipient email");
      setTimeout(() => {
        setEmptyEmail(null);
      }, 10000);
      return;
    }

    const emailObj = {
      id: Math.random().toString(),
      to: sendToEmailInputRef.current.value,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date(),
      unread: true,
    };

    // console.log(emailObj)

    try {
      const senderEmail = auth.email.replace(/[.@]/g, "");
      const res = fetch(
        `https://email-c485e-default-rtdb.firebaseio.com/${senderEmail}/sentEmails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // if(res.ok){
      updateSuccessFullySentMail(true);
      // }
      if(res.ok){
        console.log('sent')
      }
    } catch (error) {
      alert(error);
    }
    console.log(auth.email);
    const emailObj2 = {
      id: Math.random().toString(),
      from: auth.email,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date(),
      unread: true,
    };
    try {
      const recieverEmail = sendToEmailInputRef.current.value.replace(
        /[.@]/g,
        ""
      );
      const res = fetch(
        `https://email-c485e-default-rtdb.firebaseio.com/${recieverEmail}/recievedEmails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj2,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      
      );
      if(res.ok){
        console.log('sent')
      }
    } catch (error) {
      alert(error);
    }

    formRef.current.reset();
    updateEditorState("");
    setTimeout(() => {
      updateSuccessFullySentMail(false);
    }, 5000);
  };

  return (
    <section className={classes.form}>
      {successFullySentMail && (
        <p style={{ color: "green" }}>SuccessFully sent mail.</p>
      )}
      <Form ref={formRef}>
        <p style={{ color: "red" }}>{emptyEmail}</p>
        <InputGroup className={classes.mail}>
          <InputGroup.Text id="btnGroupAddon">To</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter recipient email"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={sendToEmailInputRef}
            className={emptyEmail ? classes.invalid : ""}
          />
          <InputGroup.Text id="btnGroupAddon">
            <button className={classes.ccBtn}>CC/BCC</button>
          </InputGroup.Text>
        </InputGroup>
        <InputGroup className={classes.subject}>
          <InputGroup.Text id="btnGroupAddon">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter email subject"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={subInputRef}
          />
        </InputGroup>
        <Form.Group controlId="composeEmailMessage" className={classes.editor}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={updateEditorState}
            // ref={contentInputRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={sendEmailHandler}>
          Send Email
        </Button>
      </Form>
    </section>
  );
};

export default Compose;
