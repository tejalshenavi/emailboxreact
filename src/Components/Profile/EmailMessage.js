import React from "react";

import classes from "./EmailMessage.module.css";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";

const EmailMessage = () => {
  const messageOpen = useSelector((state) => state.inbox.messageOpen);
  console.log(messageOpen);

  return (
    <section className={classes.messageCon}>
      <h1>{messageOpen.emailSub}</h1>
      <section className={classes.msgMain}>
        <div className={classes.msgContent}>
          <span className={classes.info}>
            <BsPersonCircle className={classes.infopic} />
            <p> {messageOpen.from}</p>
          </span>
          <span>{messageOpen.date}</span>
        </div>
        <div
          className={classes.messageBox}
          dangerouslySetInnerHTML={{ __html: messageOpen.emailContent }}
        />
      </section>
    </section>
  );
};

export default EmailMessage;
